curl -X PATCH https://api.buttondown.email/v1/subscribers/{SUBSCRIBER_ID} \\
\t-H 'Authorization: Token {API_KEY}' \\
\t-d '{"metadata": {"first_name": "Pikachu"}}'