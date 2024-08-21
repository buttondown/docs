import json

import requests

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"
EMAIL_ID = "your-email-id-here"

headers = {"Authorization": f"Token #{BUTTONDOWN_API_KEY}"}
data = {"body": "These are my edits!"}
base_url = "https://api.buttondown.email"
endpoint = f"/v1/emails/{EMAIL_ID}"
response = requests.patch(base_url + endpoint, headers=headers, data=json.dumps(data))
print(response)
