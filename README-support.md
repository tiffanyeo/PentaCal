

<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->

### /friendships?userId=string
#### GET
- Used to: Get all users friendship from database
- Expected request-body: none
- Possible response statuses: 200
- Example response:
> 200 OK
```json
{
    "id": "string",
    "userId1": "string",
    "userId2": "string"
}
```
#### POST
- Used to: Create a new friendship
- Expected request-body:
```json
{
    "userId1": "string",
    "userId2": "string"
}
```
- Possible response statuses: 200, 404, 409
- Response-body: created friendship-object or error-object
- Example response:
> 201 Created | Event was created
```json
{
    "id": "string",
    "userId1": "string",
    "userId2": "string"
}
```
> 400 Bad Request | Any required attributes are missing
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | User could not be found
```json
{
    error: "User not found"
}
```
> 409 Not Found | Users are already friends
```json
{
    error: "Friend invitation already sent"
}
```
#### DELETE
- Used to: Delete a friendship
- Expected request-body:
```json
{
    "userId1": "string",
    "userId2": "string"
}
- Possible response statuses: 200, 400, 404
- Response-body: message-object
- Example response:
> 200 Deleted | Friendship was deleted
```json
{
    message: "Deleted successfully!"
}
```
> 400 Missing attributes | Friendship was not deleted
```json
{
    message: "Missing attributes"
}
```
> 404 Not deleted | Friendship was not deleted
```json
{
    message: "User not found"
}
```
### /friendships?userId1=string&userId2=string
#### GET
- Used to: Get all users friendship from database
- Expected request-body: none
- Possible response statuses: 200, 400, 404
- Example response:
> 200 OK
```json
{
    "id": "string",
    "userId1": "string",
    "userId2": "string"
}
```
> 400 Missing parameters | userId1 or userId2 is missing
```json
{
    "message": "Missing parameters"
}
```
> 404 Not found | No friendship exist
```json
{
    "message": "Friendship not found"
}
```
#### POST
- Used to: Create a new friendship
- Expected request-body:
```json
{
    "userId1": "string",
    "userId2": "string"
}
```
- Possible response statuses: 200, 404, 409
- Response-body: created friendship-object or error-object
- Example response:
> 201 Created | Event was created
```json
{
    "id": "string",
    "userId1": "string",
    "userId2": "string"
}
```
> 400 Bad Request | Any required attributes are missing
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | User could not be found
```json
{
    error: "User not found"
}
```
> 409 Not Found | Users are already friends
```json
{
    error: "Friend invitation already sent"
}
```
#### DELETE
- Used to: Delete a friendship
- Expected request-body:
```json
{
    "userId1": "string",
    "userId2": "string"
}
- Possible response statuses: 200, 400, 404
- Response-body: message-object
- Example response:
> 200 Deleted | Friendship was deleted
```json
{
    message: "Deleted successfully!"
}
```
> 400 Missing attributes | Friendship was not deleted
```json
{
    message: "Missing attributes"
}
```
> 404 Not deleted | Friendship was not deleted
```json
{
    message: "User not found"
}
```


<!-- PRIV MSG -->
<!-- PRIV MSG -->
<!-- PRIV MSG -->
<!-- PRIV MSG -->
<!-- PRIV MSG -->
<!-- PRIV MSG -->
<!-- PRIV MSG -->
<!-- PRIV MSG -->


### /private_msg
#### POST
- Used to: Send a private message to another user
- Expected request-body:
```json
{
    userId: "string",
    receiverId: "string",
    content: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Message was sent
```json
{
    message: "Message is send to receiver"
}
```
> 400 Bad Request | Attributes missing in request-body
```json
{
    error: "Bad request"
}
```
> 404 Not Found | Receiver does not exist
```json
{
    error: "The receiver doesn't exist"
}
```
#### PATCH
- Used to: Edit an existing private message
- Expected request-body:
```json
{
    privMsgId: "string",
    content: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Message was successfully updated
```json
{
    message: "Successfully update message"
}
```
> 400 Bad Request | Required attributes missing
```json
{
    error: "Bad request"
}
```
> 404 Not Found | No message with provided id was found
```json
{
    error: "The message couldn't be found"
}
```
#### DELETE
- Used to: Delete a private message from database
- Expected request-body:
```json
{
    privMsgId: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Message was successfully deleted
```json
{
    message: "The message successfully deleted"
}
```
> 400 Bad Request | If privMsgId attribute is missing
```json
{
    error: "Bad request"
}
```
> 404 Not Found | No message with provided id was found
```json
{
    error: "The message couldn't be found"
}
```
#### private_msg?senderId=string&receiverId=string
### GET
- Used to: Get conversation between two users
- Expected request-body: none
- Possible response statuses: 200, 404
> 200 OK
```json
[{
    "id": "string",
    "senderId": "string",
    "receiverId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS",
    "content": "string",
    "hasChanged": true
}]
```
> 404 Not Found
```json
{
    error: "No messages found"
}
```


<!-- CAL MSGS -->
<!-- CAL MSGS -->
<!-- CAL MSGS -->
<!-- CAL MSGS -->
<!-- CAL MSGS -->
<!-- CAL MSGS -->
<!-- CAL MSGS -->


### /calendar_msg
#### GET
- Used to: Get all messages for a specific calendar
- Expected request-body: none, but request-params "senderId" and "calId" expected
- Possible response statuses: 200, 400, 404
- Response-body: array of calendar_msg-objects or error-object
- Example response:
> 200 OK | Messages were found and returned
```json
[{
    "id": "string",
    "senderId": "string",
    "calId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS",
    "content": "string",
    "hasChanged": true
}]
```
> 400 Bad Request | Missing required query parameters
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | No messages found for specified calendar
```json
{
    error: "Messages not found"
}
```
#### POST
- Used to: Create a new calendar message
- Expected request-body:
```json
{
    senderId: "string",
    calId: "string",
    content: "string"
}
```
- Possible response statuses: 201, 400, 404
- Response-body: created calendar_msg-object or error-object
- Example response:
> 201 Created | Message was created
```json
{
    "id": "string",
    "senderId": "string",
    "calId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS",
    "content": "string",
    "hasChanged": false
}
```
> 400 Bad Request | Missing required attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | Calendar does not exist
```json
{
    error: "Invalid calendar"
}
```
#### PATCH
- Used to: Edit an existing calendar message
- Expected request-body:
```json
{
    id: "string",
    content: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: updated calendar_msg-object or error-object
- Example response:
> 200 OK | Message was updated
```json
{
    "id": "string",
    "senderId": "string",
    "calId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS",
    "content": "string",
    "hasChanged": true
}
```
> 400 Bad Request | Missing required attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | Message not found
```json
{
    error: "Message not found"
}
```

#### DELETE
- Used to: Delete a calendar message
- Expected request-body:
```json
{
    id: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: deleted calendar_msg-object or error-object
- Example response:
> 200 OK | Message was deleted
```json
{
    "id": "string",
    "senderId": "string",
    "calId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS",
    "content": "string",
    "hasChanged": true
}
```

> 400 Bad Request | Missing required attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | Message not found
```json
{
    error: "Message not found"
}
```
### /calendar_msg?calId=string&senderId=string
#### GET
- Used to: Get messages for a calendar (optionally filtered by sender)
- Expected request-body: none
- Possible response statuses: 200, 400, 404
> 200 OK
```json
[{
    "id": "string",
    "senderId": "string",
    "calId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS",
    "content": "string",
    "hasChanged": true
}]
```
> 400 Bad Request
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found
```json
{
    error: "Messages not found"
}
```

<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->
<!-- EVENTS_RSVP -->



### /events_rsvp
#### GET
- Used to: Get a specific TSSVP based on eventId and userId
- Expected request-body: none, but query params required
```json
{
    eventId: "string",
    userId: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: RSVP-object or error-object
- Example response:
> 200 OK | RSVP found
```json
{
    "id": "string",
    "eventId": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isGoing": "string",
    "reminder": true
}
```
> 400 Bad Request | Missing required query params
```json
{
    error: "Missing attributes"
}
```
>  404 Not Found | RSVP not found
```json

{
    error: "RSVP not found"
}
```
#### POST
- Used to: Create a new RSVP
- Expected request-body:
```json
{
    eventId: "string",
    userId: "string",
    isGoing: "string",
    reminder: "bool"
}
```
- Possible response statuses: 201, 400, 409
- Response-body: created RSVP-object or error-object
- Example response:
> 201 Created | RSVP created
```json
{
    "id": "string",
    "eventId": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isGoing": "string",
    "reminder": true
}
```
> 400 Bad Request | Missing required attributes
```json
{
    error: "Missing attributes"
}
```
> 409 Conflict | RSVP already exists
```json
{
    error: "RSVP already exists"
}
```
#### PATCH
- Used to: Update an existing RSVP
- Expected request-body:
```json
{
    eventId: "string",
    userId: "string",
    isGoing: "string",
    reminder: "bool"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: updated RSVP-object or error-object
- Example response:
> 200 OK | RSVP updated
```json
{
    "id": "string",
    "eventId": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isGoing": "string",
    "reminder": "bool"
}
```
> 400 Bad Request | Missing required attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | RSVP not found
```json
{
    error: "RSVP not found"
}
```
#### DELETE
- Used to: Delete an RSVP
- Expected request-body:
```json
{
    eventId: "string",
    userId: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: deleted RSVP-object or error-object
- Example response:
> 200 OK | RSVP deleted
```json
{
    "id": "string",
    "eventId": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isGoing": "string",
    "reminder": "bool"
}
```
> 400 Bad Request | Missing required attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | RSVP not found
```json
{
    error: "RSVP not found"
}
```


<!-- USER AVAILS -->
<!-- USER AVAILS -->
<!-- USER AVAILS -->
<!-- USER AVAILS -->
<!-- USER AVAILS -->
<!-- USER AVAILS -->
<!-- USER AVAILS -->
<!-- USER AVAILS -->


### /users_availabilities
#### POST
- Used to: Create a new availability entry
- Expected request-body:
```json
{
    userId: "string",
    date: "string",
    isAvailable: "bool",
    calId: "string"
}
```
- Possible response statuses: 201, 400, 404, 409
- Response-body: created availability-object or error-object
- Example response:

> 201 Created | Availability created
```json
{
    "id": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isAvailable": "bool",
    "calId": "string"
}
```
> 400 Bad Request | Missing attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | User or calendar not found
```json
{
    error: "User or calendar not found"
}
```
> 409 Conflict | Availability already exists
```json
{
    error: "Availability already exists"
}
```
#### PATCH
- Used to: Update an existing availability entry
- Expected request-body:
```json
{
    userId: "string",
    date: "string",
    isAvailable: "bool",
    calId: "string"
}
```
- Possible response statuses: 200, 400, 404, 409
- Response-body: updated availability-object or error-object
- Example response:
> 200 OK | Availability updated
```json
{
    "id": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isAvailable": "bool",
    "calId": "string"
}
```
> 400 Bad Request | Missing attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | Availability not found
```json
{
    error: "Availability not found"
}
```
> 409 Conflict | No changes made
```json
{
    message: "No changes made"
}
```
#### DELETE
- Used to: Delete an availability entry
- Expected request-body:
```json
{
    userId: "string",
    date: "string",
    calId: "string"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: deleted availability-object or error-object
- Example response:
> 200 OK | Availability deleted
```json
{
    "id": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isAvailable": "bool",
    "calId": "string"
}
```
> 400 Bad Request | Missing attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | Availability not found
```json
{
    error: "Availability not found"
}
```
### /users_availabilities?userId=string&date=string
#### GET
- Used to: Get a user's availability for a specific date
- Expected request-body: none
- Possible response statuses: 200, 400, 404
- Response-body: array of availability-objects or error-object
- Example response:
> 200 OK | Availability found 
```json
[{
    "id": "string",
    "userId": "string",
    "date": "YYYY-MM-DD",
    "isAvailable": "bool",
    "calId": "string"
}]
```
> 400 Bad Request | Missing attributes
```json
{
    error: "Missing attributes"
}
```
> 404 Not Found | Availability not found
```json
{
    error: "Availability not found"
}
```















<!-- AEXEMPEL -->
<!-- AEXEMPEL -->
<!-- AEXEMPEL -->
<!-- AEXEMPEL -->
<!-- AEXEMPEL -->
<!-- AEXEMPEL -->
<!-- AEXEMPEL -->
<!-- AEXEMPEL -->



### /friendships?userId=id
#### GET
- Used to: Get all users friendship from database
- Expected request-body: none
- Possible response statuses: 200
- Example response:
> 200 OK
```json
{
    "id": "string",
    "userId1": "string",
    "userId2": "string"
}
```