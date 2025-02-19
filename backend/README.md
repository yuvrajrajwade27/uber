# User Registration Endpoint

## Endpoint Details
- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Creates a new user account in the system.

## Request Body
```json
{
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

# User Login Endpoint

## Endpoint Details
- **URL**: `/users/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.

## Request Body
```json
{
    "email": "string",       // Required: valid email format
    "password": "string"     // Required: min 8 characters
}
```

## Response Codes
- **200 OK**: Login successful
- **401 Unauthorized**: Invalid login credentials
- **500 Internal Server Error**: Server-side error

## Success Response
```json
{
    "status": "success",
    "message": "Login successful",
    "user": {
        "id": "uuid",
        "email": "string",
        "firstName": "string",
        "lastName": "string"
    },
    "token": "jwt_token"
}
```

## Error Response
```json
{
    "status": "error",
    "message": "Invalid login credentials"
}
```

## Example
```bash
curl -X POST http://your-domain.com/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john@example.com",
    "password": "securepass123"
}'
```

### Example Response

- `user` (object):
    - `id` (string): user's unique identifier.
    - `email` (string): user's email address.
    - `firstName` (string): user's first name.
    - `lastName` (string): user's last name.
- `token` (string): JWT token

# User Profile Endpoint

## Endpoint Details
- **URL**: `/users/profile`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's profile information
- **Authentication**: Required (JWT token in header or cookie)

## Headers
```
Authorization: Bearer <jwt_token>
```

## Response Codes
- **200 OK**: Profile retrieved successfully
- **401 Unauthorized**: Invalid or missing token
- **500 Internal Server Error**: Server-side error

## Success Response
```json
{
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "_id": "uuid",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

## Error Response
```json
{
    "message": "Unauthorized"
}
```

## Example
```bash
curl -X GET http://your-domain.com/users/profile \
-H "Authorization: Bearer <your_jwt_token>"
```

# User Logout Endpoint

## Endpoint Details
- **URL**: `/users/logout`
- **Method**: `GET`
- **Description**: Logs out the current user and invalidates their token
- **Authentication**: Required (JWT token in header or cookie)

## Headers
```
Authorization: Bearer <jwt_token>
```

## Response Codes
- **200 OK**: Logout successful
- **401 Unauthorized**: Invalid or missing token
- **500 Internal Server Error**: Server-side error

## Success Response
```json
{
    "message": "Logout successful"
}
```

## Error Response
```json
{
    "message": "Unauthorized"
}
```

## Example
```bash
curl -X GET http://your-domain.com/users/logout \
-H "Authorization: Bearer <your_jwt_token>"
```

# Captain Registration Endpoint

## Endpoint Details
- **URL**: `/captains/register`
- **Method**: `POST`
- **Description**: Creates a new captain account with vehicle information.

## Request Body
```json
{
    "firstname": "string",    // Required: 3-50 characters
    "lastname": "string",     // Optional: 3-50 characters
    "email": "string",       // Required: valid email format
    "password": "string",    // Required: min 6 characters
    "vehicle": {
        "color": "string",   // Required: min 3 characters
        "plate": "string",   // Required: min 3 characters
        "capacity": "number", // Required: min 1
        "vehicleType": "string" // Required: "car"|"motercycle"|"auto"|"van"
    }
}
```

## Response Codes
- **201 Created**: Registration successful
- **400 Bad Request**: Invalid input data or captain already exists
- **500 Internal Server Error**: Server-side error

## Success Response
```json
{
    "captain": {
        "firstname": "string",
        "lastname": "string",
        "email": "string",
        "status": "inactive",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "vehicleType": "string"
        },
        "_id": "uuid",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    },
    "token": "jwt_token"
}
```

## Error Response
```json
{
    "message": "Error message"
}
```

## Example
```bash
curl -X POST http://your-domain.com/captains/register \
-H "Content-Type: application/json" \
-d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "securepass123",
    "vehicle": {
        "color": "black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}'
```

# Captain Login Endpoint

## Endpoint Details
- **URL**: `/captains/login`
- **Method**: `POST`
- **Description**: Authenticates a captain and returns a JWT token.

## Request Body
```json
{
    "email": "string",       // Required: valid email format
    "password": "string"     // Required: min 6 characters
}
```

## Response Codes
- **200 OK**: Login successful
- **401 Unauthorized**: Invalid login credentials
- **500 Internal Server Error**: Server-side error

## Success Response
```json
{
    "captain": {
        "firstname": "string",
        "lastname": "string",
        "email": "string",
        "status": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "vehicleType": "string"
        },
        "_id": "uuid",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    },
    "token": "jwt_token"
}
```

## Error Response
```json
{
    "message": "Invalid login credentials"
}
```

## Example
```bash
curl -X POST http://your-domain.com/captains/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john@example.com",
    "password": "securepass123"
}'
```

### Captain Endpoints

#### GET /captains/profile
Get the profile information of the authenticated captain.

**Authorization**: using Bearer Token or cookie token

**Response**
- Status: 200 OK
```json
{
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
    }
}
```

#### GET /captains/logout
Log out the currently authenticated captain and invalidate their token.

**Authorization**: using Bearer Token or cookie token

**Response**
- Status: 200 OK
```json
{
    "message": "Logged out successfully"
}
```

**Error Response**
- Status: 401 Unauthorized
```json
{
    "message": "Unauthorized"
}
```

**Example**
```bash
curl -X GET http://your-domain.com/captains/logout \
-H "Authorization: Bearer <your_jwt_token>"
```

