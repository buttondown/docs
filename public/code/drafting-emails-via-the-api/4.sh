curl -X PATCH "https://api.buttondown.email/v1/emails/{EMAIL_ID}" \
-H "Authorization: Token {API_KEY}" \
-d '{"status": "about_to_send"}'