import requests

# You can find this key in your API requests page:
# https://buttondown.email/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

headers = {
    "Authorization": f"Token {BUTTONDOWN_API_KEY}",
}

BASE_URL = "https://api.buttondown.email"
ENDPOINT = "/emails"
METHOD = "GET"

response = requests.request(METHOD, f"{BASE_URL}/v1{ENDPOINT}", headers=headers)
