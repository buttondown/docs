require "HTTParty"
require "json"

# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"

response = HTTParty.patch(
  "https://api.buttondown.email/v1/emails/#{EMAIL_ID}",
  body: {
    status: "scheduled",
    publish_date: "2027-08-24T14:15:22Z"
  }.to_json,
  headers: {
    "Authorization" => "Token #{BUTTONDOWN_API_KEY}",
    "Content-Type" => "application/json"
  }
)
puts(JSON.parse(response.body))
print(response)
