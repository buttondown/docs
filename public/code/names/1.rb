require "net/http"
require "json"

url = URI.parse("https://api.buttondown.email/v1/subscribers/{SUBSCRIBER_ID}")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
headers = {
  "Authorization" => "Token {API_KEY}",
  "Content-Type" => "application/json"
}
data = {"metadata" => {"first_name" => "Pikachu"}}
request = Net::HTTP::Patch.new(url.request_uri, headers)
request.body = data.to_json
response = http.request(request)
puts(response.code)
puts(response.body)
