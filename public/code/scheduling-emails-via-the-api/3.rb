require "HTTParty"
require "json"

# You can find this key in your API requests page:
# https://buttondown.email/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

response = HTTParty.patch(
  "https://api.buttondown.email/v1/emails/#{EMAIL_ID}",
  body: {
    status: "draft"
  }.to_json,
  headers: {
    "Authorization" => "Token #{BUTTONDOWN_API_KEY}",
    "Content-Type" => "application/json"
  }
)
puts(JSON.parse(response.body))
