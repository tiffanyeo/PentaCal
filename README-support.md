

<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->
<!-- FRIENDSHIPS -->

### /friendships?userId=id
#### GET
- Used to: Get all users friendship from database
- Expected request-body: none
- Possible response statuses: 200
- Example response:
> 200 OK
```json
{
    "id": "",
    "userId1": "",
    "userId2": ""
}
```
#### POST
- Used to: Create a new friendship
- Expected request-body:
```js
{
    "userId1": "id",
    "userId2": "id"
}
```
- Possible response statuses: 200, 404, 409
- Response-body: created friendship-object or error-object
- Example response:
> 201 Created | Event was created
```json
{
    "id": "id",
    "userId1": "id",
    "userId2": "id"
}
```
> 400 Bad Request | Any required attributes are missing
```js
{
    error: "Missing attributes"
}
```
> 404 Not Found | User could not be found
```js
{
    error: "User not found"
}
```
> 409 Not Found | Users are already friends
```js
{
    error: "Friend invitation already sent"
}
```
#### DELETE
- Used to: Delete a friendship
- Expected request-body:
```js
{
    "userId1": "id",
    "userId2": "id"
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
### /friendships?userId1=id§userId2=id
#### GET
- Used to: Get all users friendship from database
- Expected request-body: none
- Possible response statuses: 200, 400, 404
- Example response:
> 200 OK
```json
{
    "id": "",
    "userId1": "",
    "userId2": ""
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
```js
{
    "userId1": "id",
    "userId2": "id"
}
```
- Possible response statuses: 200, 404, 409
- Response-body: created friendship-object or error-object
- Example response:
> 201 Created | Event was created
```json
{
    "id": "id",
    "userId1": "id",
    "userId2": "id"
}
```
> 400 Bad Request | Any required attributes are missing
```js
{
    error: "Missing attributes"
}
```
> 404 Not Found | User could not be found
```js
{
    error: "User not found"
}
```
> 409 Not Found | Users are already friends
```js
{
    error: "Friend invitation already sent"
}
```
#### DELETE
- Used to: Delete a friendship
- Expected request-body:
```js
{
    "userId1": "id",
    "userId2": "id"
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
#### GET
- Used to: Get all private messages from database
- Expected request-body: none
- Possible response statuses: 200
- Reponse-body: array of private_msg-objects
- Example response:
> 200 OK | Atleast one message was found and the array was returned
```json
[{
    "id": "",
    "senderId": "",
    "receiverId": "",
    "date": "2026-03-01",
    "time": "18:00:00",
    "content": "",
    "hasChange": true
}]
```

#### POST
- Used to: Send a private message to another user
- Expected request-body:
```js
{
    userId: string,
    receiverId: string,
    content: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Message was sent
```js
{
    message: "Message is send to receiver"
}
```

> 400 Bad Request | Attributes missing in request-body
```js
{
    error: "Bad request"
}
```

> 404 Not Found | Receiver does not exist
```js
{
    error: "The receiver doesn't exist"
}
```

#### PATCH
- Used to: Edit an existing private message
- Expected request-body:
```js
{
    privMsgId: string,
    content: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Message was successfully updated
```js
{
    message: "Successfully update message"
}
```

> 400 Bad Request | Required attributes missing
```js
{
    error: "Bad request"
}
```

> 404 Not Found | No message with provided id was found
```js
{
    error: "The message couldn't be found"
}
```

#### DELETE
- Used to: Delete a private message from database
- Expected request-body:
```js
{
    privMsgId: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Message was successfully deleted
```js
{
    message: "The message successfully deleted"
}
```

> 400 Bad Request | If privMsgId attribute is missing
```js
{
    error: "Bad request"
}
```

> 404 Not Found | No message with provided id was found
```js
{
    error: "The message couldn't be found"
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
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | No messages found for specified calendar
```js
{
    error: "Messages not found"
}
```

#### POST
- Used to: Create a new calendar message
- Expected request-body:
```js
{
    senderId: string,
    calId: string,
    content: string
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
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | Calendar does not exist
```js
{
    error: "Invalid calendar"
}
```

#### PATCH
- Used to: Edit an existing calendar message
- Expected request-body:
```js
{
    id: string,
    content: string
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
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | Message not found
```js
{
    error: "Message not found"
}
```

#### DELETE
- Used to: Delete a calendar message
- Expected request-body:
```js
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
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | Message not found
```js
{
    error: "Message not found"
}
```