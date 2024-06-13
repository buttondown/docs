curl -X PATCH "https://api.buttondown.email/v1/emails/{EMAIL_ID}" \
-H "Authorization: Token {API_KEY}" \
-d '{"status": "scheduled", "publish_date": "2027-08-24T14:15:22Z"}'