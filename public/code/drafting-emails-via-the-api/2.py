import requests

# You can find this key in your API requests page:
# https://buttondown.email/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

EMAIL_ID = "your-email-id-here"

headers = {"Authorization": f"Token #{BUTTONDOWN_API_KEY}"}
BASE_URL = "https://api.buttondown.email"
ENDPOINT = f"/v1/emails/{EMAIL_ID}"
response = requests.get(f"{BASE_URL}{ENDPOINT}", headers=headers)
print(response.json())
