curl -X POST "https://api.buttondown.email/v1/emails" \
-H "Authorization: Token {API_KEY}" \
-H "Content-Type: application/json" \
-d '{
    "subject": "Scheduled for the future",
    "body": "Welcome to my time-traveling email!",
    "status": "scheduled",
    "publish_date": "2027-08-24T14:15:22Z"
}'