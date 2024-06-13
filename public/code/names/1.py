import requests
import json

url = "https://api.buttondown.email/v1/subscribers/{SUBSCRIBER_ID}"
headers = {"Authorization": "Token {API_KEY}"}
data = {"metadata": {"first_name": "Pikachu"}}
response = requests.patch(url, headers=headers, data=json.dumps(data))
print(response.status_code)
print(response.json())
