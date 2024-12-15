# Advanced Social Media Backend APIs

## Auth APIs

### 1. Register API
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
    ```json
    {
        "userName": "kp",
        "fullName": "kp",
        "email": "kp@gmail.com",
        "password": "123",
        "bio": "kp bio"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "userName": "kp",
        "fullName": "kp",
        "email": "kp@gmail.com",
        "password": "123",
        "bio": "kp bio"
    }'
    ```

### 2. Login API
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
    ```json
    {
        "email": "kp@gmail.com",
        "password": "123"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "kp@gmail.com",
        "password": "123"
    }'
    ```

### 3. Logout API
- **Endpoint:** `GET /api/auth/logout`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/auth/logout'
    ```

### 4. Current Profile
- **Endpoint:** `GET /api/auth/current-user`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/auth/current-user'
    ```

---

## User APIs

### 1. Get Single User
- **Endpoint:** `GET /api/user/get/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/get/65f6d4add88915a761b331a2'
    ```

### 2. Update User
- **Endpoint:** `PUT /api/user/update`
- **Request Body:**
    ```json
    {
        "bio": "shaikh bio"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/user/update' \
    --header 'Content-Type: application/json' \
    --data '{
        "bio": "shaikh bio"
    }'
    ```

### 3. Follow User
- **Endpoint:** `POST /api/user/follow/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/follow/65f6d4add88915a761b331a2'
    ```

### 4. Unfollow User
- **Endpoint:** `POST /api/user/unfollow/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/unfollow/65f6d4add88915a761b331a2'
    ```

### 5. Get Followers List
- **Endpoint:** `GET /api/user/get-followers-lists`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/get-followers-lists'
    ```

### 6. Get Following List
- **Endpoint:** `GET /api/user/get-following-lists`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/get-following-lists'
    ```

### 7. Block User
- **Endpoint:** `POST /api/user/block/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/block/65f6d4add88915a761b331a2'
    ```

### 8. Unblock User
- **Endpoint:** `POST /api/user/unblock/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/unblock/65f6d4add88915a761b331a2'
    ```

### 9. Get Blocked User Lists
- **Endpoint:** `GET /api/user/blocked-lists`
- **CURL Example



# Post APIs

This section provides details about the Post APIs for the Advanced Social Media application. Below are the available endpoints for post management.

### 1. Create Post
- **Endpoint:** `POST /api/post/create`
- **Request Body:**
    ```json
    {
        "caption": "This is sf caption"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/create' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: token=YOUR_TOKEN_HERE' \
    --data '{
        "caption": "This is sf caption"
    }'
    ```

### 2. Create Post with Images
- **Endpoint:** `POST /api/post/create-with-image`
- **Request Body:**
    - **caption:** "This is sf caption"
    - **images:** select images
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/create-with-image' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --form 'caption="sf cap with images"' \
    --form 'images=@"/G:/Desktop Wallpaper/baby.jpg"' \
    --form 'images=@"/G:/Desktop Wallpaper/car.jpg"'
    ```

### 3. Update Post Caption
- **Endpoint:** `PUT /api/post/update/{postId}`
- **Request Body:**
    ```json
    {
        "caption": "This is sf caption"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/post/update/65fc6e6dcf3e04e86fbbfceb' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "caption": "This is sf caption"
    }'
    ```

### 4. Get All Posts
- **Endpoint:** `GET /api/post/get-all/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-all/65f6d4add88915a761b331a2' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 5. Get User Posts
- **Endpoint:** `GET /api/post/get-user-posts`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-user-posts' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 6. Get Posts of Following
- **Endpoint:** `GET /api/post/get-post-of-following`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-post-of-following' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 7. Get Posts of Followers
- **Endpoint:** `GET /api/post/get-post-of-followers`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-post-of-followers' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 8. Delete a Post
- **Endpoint:** `DELETE /api/post/delete/{postId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/post/delete/65fc93a4a7d9800167081fc5' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 9. Like Post
- **Endpoint:** `POST /api/post/like/{postId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/post/like/65fd3dc59724eb14a07c14db' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 10. Un-Like Post
- **Endpoint:** `POST /api/post/un-like/{postId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/post/un-like/65fd3dc59724eb14a07c14db' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

## Notes
- Replace `YOUR_TOKEN_HERE` with the actual token obtained during login.
- Ensure that the server is running




# Comments APIs

This section provides details about the Comments APIs for the Advanced Social Media application. Below are the available endpoints for comment management.

### 1. Add Comment to Post
- **Endpoint:** `POST /api/comment/add`
- **Request Body:**
    ```json
    {
        "postId": "65fd3dc59724eb14a07c14db",
        "text": "comment on the post"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/comment/add' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "postId": "65fd3dc59724eb14a07c14db",
        "text": "comment on the post"
    }'
    ```

### 2. Reply on Comment
- **Endpoint:** `POST /api/comment/add/reply/{commentId}`
- **Request Body:**
    ```json
    {
        "text": "reply on comment"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/comment/add/reply/65fdbee5285d6e7af0da7f86' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "text": "reply on comment"
    }'
    ```

### 3. Update Comment
- **Endpoint:** `PUT /api/comment/update/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/comment/update/65fdbee5285d6e7af0da7f86' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "text": "mk comment"
    }'
    ```

### 4. Update Reply Comment
- **Endpoint:** `PUT /api/comment/update/{commentId}/replies/{replyId}`
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/comment/update/65fdbee5285d6e7af0da7f86/replies/65fdc6fcce0afb51aa2bbfb5' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "text": "updated reply"
    }'
    ```

### 5. Get Comments on Post
- **Endpoint:** `GET /api/comment/post/{postId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/comment/post/65fd3dc59724eb14a07c14db' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 6. Delete Comment
- **Endpoint:** `DELETE /api/comment/delete/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/comment/delete/65fdd40fb0ebc6ad8d6bb4b4' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 7. Delete Reply Comment
- **Endpoint:** `DELETE /api/comment/delete/{commentId}/reply/{replyId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/comment/delete/65ff235f42a6275f9fc4f1bf/reply/65ff239642a6275f9fc4f1c4' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 8. Like Comment
- **Endpoint:** `POST /api/comment/like/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/comment/like/65ff235f42a6275f9fc4f1bf' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 9. Un-Like Comment
- **Endpoint:** `POST /api/comment/un-like/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/comment/un-like/65ff235f42a



# Story APIs

This section provides details about the Story APIs for the Advanced Social Media application. Below are the available endpoints for story management.

### 1. Create Story
- **Endpoint:** `POST /api/story/create`
- **Request Body:**
    - **text:** "Hello"
    - **image:** select image
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/story/create' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --form 'text="my first story text"' \
    --form 'image=@"/G:/Desktop Wallpaper/359695.jpg"'
    ```

### 2. Get Current User Stories
- **Endpoint:** `GET /api/story/get/all`
- **CURL Example:**
    ```bash
    curl --location --request GET 'http://localhost:5757/api/story/get/all' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 3. Get User's Story
- **Endpoint:** `GET /api/story/get/user-story/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/story/get/user-story/65fd3d093ab5dfaa5fb5d683' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 4. Delete Story
- **Endpoint:** `DELETE /api/story/delete/{storyId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/story/delete/66000f4155a51d086a73ab5f' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 5. Delete All Stories
- **Endpoint:** `DELETE /api/story/delete/all-stories`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/story/delete/all-stories' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

## Notes
- Replace `YOUR_TOKEN_HERE` with the actual token obtained during login.
- Ensure that the server is running on `localhost:5757` or adjust the URL accordingly if hosted elsewhere.

Feel free to reach out for any questions or further clarifications regarding the API usage!




# Conversation APIs

This section provides details about the Conversation APIs for the Advanced Social Media application. Below are the available endpoints for conversation management.

### 1. Create Conversation
- **Endpoint:** `POST /api/conversation/create`
- **Request Body:**
    ```json
    {
        "firstUser ": "65fd3d093ab5dfaa5fb5d683", // LOGIN USER
        "secondUser ": "65fd3df49724eb14a07c14e3"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/conversation/create' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "firstUser ": "65fd3d093ab5dfaa5fb5d683",
        "secondUser ": "65fd3df49724eb14a07c14e3"
    }'
    ```

### 2. Get Conversation
- **Endpoint:** `GET /api/conversation/get/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/conversation/get/65fd3d093ab5dfaa5fb5d683' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 3. Get Two Users Conversations
- **Endpoint:** `GET /api/conversation/get/{firstUser Id}/{secondUser Id}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/conversation/get/65fd3d093ab5dfaa5fb5d683/65fd3df49724eb14a07c14e3' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### 4. Delete Conversation
- **Endpoint:** `DELETE /api/conversation/delete/{conversationId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/conversation/delete/66012e44ac565cdd1503ab36' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

## Notes
- Replace `YOUR_TOKEN_HERE` with the actual token obtained during login.
- Ensure that the server is running on `localhost:5757` or adjust the URL accordingly if hosted elsewhere.

Feel free to reach out for any questions or further clarifications regarding the API usage!




# Messages APIs

This section provides details about the Messages APIs for the Advanced Social Media application. Below are the available endpoints for message management.

### 1. Create Message
- **Endpoint:** `POST /api/message/create`
- **Request Body:**
    ```json
    {
        "conversationId": "660130cb20cad9dec2c87b32",
        "sender": "65fd3d093ab5dfaa5fb5d683",
        "text": "Hi.."
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/message/create' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data '{
        "conversationId": "660130cb20cad9dec2c87b32",
        "sender": "65fd3d093ab5dfaa5fb5d683",
        "text": "Hi.."
    }'
    ```

### 2. Get Messages
- **Endpoint:** `GET /api/message/get/{conversationId}`
- **CURL Example:**
    ```bash
    curl --location --request GET 'http://localhost:5757/api/message/get/660130cb20cad9dec2c87b32' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

## Notes
- Replace `YOUR_TOKEN_HERE` with the actual token obtained during login.
- Ensure that the server is running on `localhost:5757` or adjust the URL accordingly if hosted elsewhere.

Feel free to reach out for any questions or further clarifications regarding the API usage!