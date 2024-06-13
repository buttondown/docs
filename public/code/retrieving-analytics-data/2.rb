require "net/http"
require "json"

# You can find this key in your API requests page:
# https://buttondown.email/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

headers = {"Authorization" => "Token #{BUTTONDOWN_API_KEY}"}
base_url = "https://api.buttondown.email"
endpoint = "/v1/emails/{id}/events?event_type=delivered"

response = Net::HTTP.get_response(URI("\#{base_url}\#{endpoint}"), headers)
JSON.parse(response.body)
