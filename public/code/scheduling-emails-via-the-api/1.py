import json

import requests

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

headers = {"Authorization": f"Token #{BUTTONDOWN_API_KEY}"}
base_url = "https://api.buttondown.email"
endpoint = "/v1/emails"
data = {
    "subject": "Scheduled for the future",
    "body": "Welcome to my time-traveling email!",
    "status": "scheduled",
    "publish_date": "2027-08-24T14:15:22Z",
}
response = requests.post(
    base_url + endpoint, headers=headers, data=json.dumps(data)
).json()
print(response)
