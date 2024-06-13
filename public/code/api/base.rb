require "net/http"
require "json"

headers = {"Authorization" => "Token #{BUTTONDOWN_API_KEY}"}
base_url = "https://api.buttondown.email"

endpoint = "/emails"

response = Net::HTTP.get_response(URI("#{base_url}/v1#{endpoint}"), headers)
JSON.parse(response.body)
