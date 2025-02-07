import json

import requests

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

headers = {"Authorization": f"Token #{BUTTONDOWN_API_KEY}"}
base_url = "https://api.buttondown.email"
endpoint = "/v1/emails/"
data = {
    "subject": "My fantastic draft idea!",
    "body": "Here's my amazing email draft!",
    "status": "draft",
}
response = requests.post(
    base_url + endpoint, headers=headers, data=json.dumps(data)
).json()
print(response)
