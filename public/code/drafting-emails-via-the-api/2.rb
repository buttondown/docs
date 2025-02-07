require "HTTParty"
require "json"

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

response = HTTParty.get(
  "https://api.buttondown.email/v1/emails/#{EMAIL_ID}",
  headers: {
    "Authorization" => "Token #{BUTTONDOWN_API_KEY}",
    "Content-Type" => "application/json"
  }
)
JSON.parse(response.body)
print(response)
