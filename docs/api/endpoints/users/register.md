# User Registration Endpoint

## Endpoint Details
- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Creates a new user account in the system.

## Request Body
```json
{
    "username": "string",     // Required: 3-30 characters
    "email": "string",       // Required: valid email format
    "password": "string",    // Required: min 8 characters
    "firstName": "string",   // Required: 2-50 characters
    "lastName": "string"     // optional: 2-50 characters
}
```

## Response Codes
- **200 OK**: Registration successful
- **400 Bad Request**: Invalid input data
- **409 Conflict**: Username or email already exists
- **500 Internal Server Error**: Server-side error

## Success Response
```json
{
    "status": "success",
    "message": "User registered successfully",
    "userId": "uuid"
}
```

## Error Response
```json
{
    "status": "error",
    "message": "Error description",
    "errors": [
        {
            "field": "field_name",
            "message": "error_description"
        }
    ]
}
```

## Example
```bash
curl -X POST http://your-domain.com/users/register \
-H "Content-Type: application/json" \
-d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123",
    "firstName": "John",
    "lastName": "Doe"
}'
```

### Example Response

- `user` (object):
    - `firstname` (string, required): user's first name (minimum e characters).
    - `lastname` (string, optional): user's last name (minimum 3 characters).
    - `email` (string, reauired): users email address (must be a valid email).
    - `password` (string, reauired): users password (minimum 6 characters).
-`token` (string): jwt token

