# Lifecycle Email Engagement Tracking Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Track opens and clicks on lifecycle emails via a standalone, ESP-agnostic system.

**Architecture:** New `LifecycleEmailEvent` model stores open/click events keyed by `account_id` + `email_type`. Two new lightweight endpoints (`/lo/` and `/lc/`) handle the tracking pixel and click redirect. The open pixel and click-wrapped URLs are injected during `LifecycleEmail.render()` before send. No dependency on `Email`, `Subscriber`, or any ESP tracking features.

**Tech Stack:** Django, BeautifulSoup (already a dependency), base64 encoding for compressed IDs.

---

### Task 1: Add `LifecycleEmailEvent` model

**Files:**
- Modify: `app/mailgun_events/models.py`

**Step 1: Add the model**

Add after the `EmailEvent` class at the bottom of the file:

```python
class LifecycleEmailEvent(BaseModel):
    type_id_prefix = "le_evt"

    class EventType(models.TextChoices):
        CLICKED = "clicked"
        OPENED = "opened"

    account = models.ForeignKey(
        "emails.Account",
        on_delete=models.CASCADE,
        related_name="lifecycle_email_events",
    )
    email_type = models.CharField(max_length=200)
    event_type = models.CharField(max_length=50, choices=EventType.choices)
    url = models.TextField(blank=True, default="")
    timestamp = models.DateTimeField()
    metadata = JSONField(default=dict)

    class Meta:
        indexes = [
            models.Index(fields=["account"]),
            models.Index(fields=["email_type"]),
            models.Index(fields=["event_type"]),
        ]
```

**Step 2: Generate migration**

Run: `MISE_EXPERIMENTAL=true mise run //app:manage -- makemigrations mailgun_events`

**Step 3: Verify migration was created**

Check that a new migration file `0020_*.py` exists in `app/mailgun_events/migrations/`.

**Step 4: Commit**

```bash
git add app/mailgun_events/models.py app/mailgun_events/migrations/
git commit -m "Add LifecycleEmailEvent model"
```

---

### Task 2: Add tracking view endpoints

**Files:**
- Create: `app/emails/views/lifecycle_tracking.py`
- Modify: `app/emails/urls/base.py`

**Step 1: Create the tracking views**

Create `app/emails/views/lifecycle_tracking.py`:

```python
import base64
from binascii import Error as Base64Error

from django.http import HttpResponse, HttpResponseNotFound
from django.http.request import HttpRequest
from django.shortcuts import redirect
from django.utils import timezone
from ipware import get_client_ip

from mailgun_events.models import LifecycleEmailEvent


def _decode_open_payload(compressed_id: str) -> tuple[str, str]:
    """Decode base64 payload into (account_id, email_type)."""
    decoded = base64.b64decode(compressed_id + "==").decode("utf-8")
    account_id, email_type = decoded.split("|", 1)
    return account_id, email_type


def _decode_click_payload(compressed_id: str) -> tuple[str, str, str]:
    """Decode base64 payload into (account_id, email_type, url)."""
    decoded = base64.b64decode(compressed_id + "==").decode("utf-8")
    parts = decoded.split("|", 2)
    return parts[0], parts[1], parts[2]


def _build_metadata(request: HttpRequest) -> dict:
    ip_address = get_client_ip(request)[0]
    user_agent = request.META.get("HTTP_USER_AGENT", "")
    return {"ip_address": ip_address, "user_agent": user_agent}


TRANSPARENT_GIF = (
    b"\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00"
    b"\xff\xff\xff\x00\x00\x00\x21\xf9\x04\x00\x00\x00\x00"
    b"\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02"
    b"\x44\x01\x00\x3b"
)


def track_open(request: HttpRequest, compressed_id: str) -> HttpResponse:
    try:
        account_id, email_type = _decode_open_payload(compressed_id)
    except (UnicodeDecodeError, Base64Error, ValueError):
        return HttpResponse(TRANSPARENT_GIF, content_type="image/gif")

    LifecycleEmailEvent.objects.create(
        account_id=account_id,
        email_type=email_type,
        event_type=LifecycleEmailEvent.EventType.OPENED,
        timestamp=timezone.now(),
        metadata=_build_metadata(request),
    )
    return HttpResponse(TRANSPARENT_GIF, content_type="image/gif")


def track_click(request: HttpRequest, compressed_id: str) -> HttpResponse:
    try:
        account_id, email_type, url = _decode_click_payload(compressed_id)
    except (UnicodeDecodeError, Base64Error, ValueError):
        return HttpResponseNotFound()

    if ":" not in url:
        return HttpResponseNotFound()

    LifecycleEmailEvent.objects.create(
        account_id=account_id,
        email_type=email_type,
        event_type=LifecycleEmailEvent.EventType.CLICKED,
        url=url,
        timestamp=timezone.now(),
        metadata=_build_metadata(request),
    )
    return redirect(url)
```

**Step 2: Add URL routes**

In `app/emails/urls/base.py`, add the import at the top:

```python
from emails.views import lifecycle_tracking
```

Add two entries to `mutable_configurations` (near the existing `track/open` and `track/click` entries):

```python
MutableURLConfiguration(
    "lo/<path:compressed_id>/",
    lifecycle_tracking.track_open,
    name="lifecycle-track-open",
),
MutableURLConfiguration(
    "lc/<path:compressed_id>/",
    lifecycle_tracking.track_click,
    name="lifecycle-track-click",
),
```

**Step 3: Lint**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-lint --force`

**Step 4: Commit**

```bash
git add app/emails/views/lifecycle_tracking.py app/emails/urls/base.py
git commit -m "Add lifecycle email tracking endpoints"
```

---

### Task 3: Inject tracking into lifecycle email rendering

**Files:**
- Modify: `app/emails/lifecycle_emails/email_types/lifecycle_email.py`

**Step 1: Add tracking injection to `render()`**

Add imports at the top:

```python
import base64

from bs4 import BeautifulSoup
```

Replace the `render` method body to inject tracking after HTML is built. The key change is wrapping links and appending an open pixel to the HTML before returning the `RenderedEmail`:

```python
def render(self, account: Account) -> RenderedEmail | None:
    body = render_to_string(
        self.email_template,
        {
            "unsubscribe_url": f"{settings.SITE_URL}/settings/notifications",
            "account": account,
        },
    )

    html = render_to_string(
        "transactional_emails/base/lightweight/index--configurable.html",
        {
            "h1": self.email_subject,
            "content": markdown.markdown(body),
        },
    )

    module_name = self.__class__.__module__.split(".")[-1]

    # Inject tracking pixel and click-wrapped URLs.
    html = _inject_tracking(html, str(account.pk), module_name)

    return RenderedEmail(
        self.email_subject,
        body,
        [account.email_address],
        html=html,
        sender_email="justin@buttondown.com",
        delivery_provider=Newsletter.DeliveryProvider.default(),
        reply_to="support@buttondown.com",
        tags=[f"{LIFECYCLE_EMAIL_TAG}:{module_name}:{account.pk}"],
    )
```

Add the helper function above the class:

```python
def _encode_payload(*parts: str) -> str:
    return base64.b64encode("|".join(parts).encode()).decode().rstrip("=")


def _inject_tracking(html: str, account_id: str, email_type: str) -> str:
    # Wrap click URLs.
    soup = BeautifulSoup(html, "html.parser")
    for a in soup.find_all("a"):
        href = a.get("href")
        if not href or not href.startswith("http"):
            continue
        compressed = _encode_payload(account_id, email_type, href)
        a["href"] = f"{settings.SITE_URL}/lc/{compressed}/"

    # Append open tracking pixel.
    open_compressed = _encode_payload(account_id, email_type)
    pixel = soup.new_tag(
        "img",
        src=f"{settings.SITE_URL}/lo/{open_compressed}/",
        width="1",
        height="1",
        style="display:none;",
    )
    if soup.body:
        soup.body.append(pixel)
    else:
        soup.append(pixel)

    return str(soup)
```

**Step 2: Lint**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-lint --force`

**Step 3: Commit**

```bash
git add app/emails/lifecycle_emails/email_types/lifecycle_email.py
git commit -m "Inject open/click tracking into lifecycle emails"
```

---

### Task 4: Add tests

**Files:**
- Create: `app/emails/views/lifecycle_tracking--test.py`

**Step 1: Write tests for the tracking endpoints**

```python
import base64

from django.test import RequestFactory

from emails.views.lifecycle_tracking import (
    _decode_click_payload,
    _decode_open_payload,
    track_click,
    track_open,
)
from mailgun_events.models import LifecycleEmailEvent


def _encode(*parts):
    return base64.b64encode("|".join(parts).encode()).decode().rstrip("=")


def test_decode_open_payload():
    encoded = _encode("abc-123", "unconfirmed")
    account_id, email_type = _decode_open_payload(encoded)
    assert account_id == "abc-123"
    assert email_type == "unconfirmed"


def test_decode_click_payload():
    encoded = _encode("abc-123", "unconfirmed", "https://example.com")
    account_id, email_type, url = _decode_click_payload(encoded)
    assert account_id == "abc-123"
    assert email_type == "unconfirmed"
    assert url == "https://example.com"


def test_track_open_creates_event(account):
    encoded = _encode(str(account.pk), "unconfirmed")
    request = RequestFactory().get(f"/lo/{encoded}/")
    response = track_open(request, encoded)
    assert response.status_code == 200
    assert response["Content-Type"] == "image/gif"
    event = LifecycleEmailEvent.objects.get(account=account)
    assert event.event_type == LifecycleEmailEvent.EventType.OPENED
    assert event.email_type == "unconfirmed"


def test_track_click_creates_event_and_redirects(account):
    url = "https://buttondown.com/pricing"
    encoded = _encode(str(account.pk), "unconfirmed", url)
    request = RequestFactory().get(f"/lc/{encoded}/")
    response = track_click(request, encoded)
    assert response.status_code == 302
    assert response.url == url
    event = LifecycleEmailEvent.objects.get(account=account)
    assert event.event_type == LifecycleEmailEvent.EventType.CLICKED
    assert event.url == url


def test_track_open_handles_invalid_payload():
    request = RequestFactory().get("/lo/garbage/")
    response = track_open(request, "garbage")
    assert response.status_code == 200  # Still returns pixel


def test_track_click_handles_invalid_payload():
    request = RequestFactory().get("/lc/garbage/")
    response = track_click(request, "garbage")
    assert response.status_code == 404
```

**Step 2: Run tests**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-test -- -k lifecycle_tracking`

**Step 3: Fix any failures, then commit**

```bash
git add app/emails/views/lifecycle_tracking--test.py
git commit -m "Add tests for lifecycle email tracking"
```

---

### Task 5: Test tracking injection in lifecycle email rendering

**Files:**
- Modify: `app/emails/lifecycle_emails/lifecycle_emails--test.py`

**Step 1: Add a test for tracking injection**

Add to the existing test file:

```python
def test_lifecycle_email_render_includes_tracking(account):
    from emails.lifecycle_emails.email_types.unconfirmed import LifecycleEmail

    email = LifecycleEmail()
    rendered = email.render(account)
    assert rendered is not None
    assert "/lo/" in rendered.html  # Open tracking pixel
    assert "/lc/" in rendered.html  # Click-wrapped URLs (if any links exist in template)
```

**Step 2: Run tests**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-test -- -k lifecycle_emails`

**Step 3: Commit**

```bash
git add app/emails/lifecycle_emails/lifecycle_emails--test.py
git commit -m "Add test for tracking injection in lifecycle email rendering"
```

---

### Task 6: Register model in admin

**Files:**
- Modify: `app/mailgun_events/admin.py` (or wherever `EmailEvent` is registered)

**Step 1: Find and update admin registration**

Register `LifecycleEmailEvent` in admin so events are queryable internally:

```python
@admin.register(LifecycleEmailEvent)
class LifecycleEmailEventAdmin(admin.ModelAdmin):
    list_display = ["account", "email_type", "event_type", "timestamp"]
    list_filter = ["email_type", "event_type"]
    readonly_fields = ["account", "email_type", "event_type", "url", "timestamp", "metadata"]
```

**Step 2: Lint**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-lint --force`

**Step 3: Commit**

```bash
git add app/mailgun_events/admin.py
git commit -m "Register LifecycleEmailEvent in admin"
```

---

### Task 7: Final lint and verify

**Step 1: Full backend lint**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-lint --force`

**Step 2: Run all related tests**

Run: `MISE_EXPERIMENTAL=true mise run //app:backend-test -- -k "lifecycle"`

**Step 3: Verify no migration issues**

Run: `MISE_EXPERIMENTAL=true mise run //app:manage -- showmigrations mailgun_events`
