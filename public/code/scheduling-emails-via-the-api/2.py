import json

import requests

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

headers = {"Authorization": f"Token #{BUTTONDOWN_API_KEY}"}
data = {
    "publish_date": "#{NEW_PUBLISH_DATE}",
}
base_url = "https://api.buttondown.email"
endpoint = "/v1/emails/#{EMAIL_ID}"
response = requests.patch(base_url + endpoint, headers=headers, data=json.dumps(data))
print(response)
