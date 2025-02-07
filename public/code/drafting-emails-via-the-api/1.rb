require "HTTParty"
require "json"

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

response = HTTParty.post(
  "https://api.buttondown.email/v1/emails",
  body: {
    subject: "My fantastic draft idea!",
    body: "Here's my amazing email draft!",
    status: "draft"
  }.to_json,
  headers: {
    "Authorization" => "Token #{BUTTONDOWN_API_KEY}",
    "Content-Type" => "application/json"
  }
)
puts(JSON.parse(response.body))
print(response)
