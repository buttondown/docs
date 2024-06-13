curl -X POST 'https://api.buttondown.email/v1/emails'
 -H 'Authorization: Token {API_KEY}'
 -H 'Content-Type: application/json'
 -d '{
    'subject': 'My fantastic draft idea!',
    'body': 'Here is my amazing email draft!',
    'status': 'draft'
    }
