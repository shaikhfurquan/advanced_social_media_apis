# Advanced Social Media Backend API Documentation

## Available APIs
- [Auth APIs](#auth-apis)
  - [1. Register API](#1-register-api)
  - [2. Login API](#2-login-api)
  - [3. Logout API](#3-logout-api)
  - [4. Current Profile](#4-current-profile)
- [User  APIs](#user-apis)
  - [1. Get Single User](#1-get-single-user)
  - [2. Update User](#2-update-user)
  - [3. Follow User](#3-follow-user)
  - [4. Unfollow User](#4-unfollow-user)
  - [5. Get Followers List](#5-get-followers-list)
  - [6. Get Following List](#6-get-following-list)
  - [7. Block User](#7-block-user)
  - [8. Unblock User](#8-unblock-user)
  - [9. Block User Lists](#9-block-user-lists)
  - [10. Delete User](#10-delete-user)
  - [11. Search User](#11-search-user)
  - [12. Update Profile Picture](#12-update-profile-picture)
  - [13. Update Cover Picture](#13-update-cover-picture)
- [Post APIs](#post-apis)
  - [1. Create Post](#1-create-post)
  - [2. Create Post with Images](#2-create-post-with-images)
  - [3. Update Post Caption](#3-update-post-caption)
  - [4. Get All Posts](#4-get-all-posts)
  - [5. Get User Posts](#5-get-user-posts)
  - [6. Get Posts of Following](#6-get-posts-of-following)
  - [7. Get Posts of Followers](#7-get-posts-of-followers)
  - [8. Delete a Post](#8-delete-a-post)
  - [9. Like Post](#9-like-post)
  - [10. Unlike Post](#10-unlike-post)
- [Comment APIs](#comment-apis)
  - [1. Add Comment to Post](#1-add-comment-to-post)
  - [2. Reply on Comment](#2-reply-on-comment)
  - [3. Update Comment](#3-update-comment)
  - [4. Update Reply Comment](#4-update-reply-comment)
  - [5. Get Comment on Post](#5-get-comment-on-post)
  - [6. Delete Comment](#6-delete-comment)
  - [7. Delete Reply Comment](#7-delete-reply-comment)
  - [8. Like Comment](#8-like-comment)
  - [9. Unlike Comment](#9-unlike-comment)
  - [10. Like Reply Comment](#10-like-reply-comment)
  - [11. Unlike Reply Comment](#11-unlike-reply-comment)
- [Story APIs](#story-apis)
  - [1. Create Story](#1-create-story)
  - [2. Get Current User Story](#2-get-current-user-story)
  - [3. Get User Story](#3-get-user-story)
  - [4. Delete Story](#4-delete-story)
  - [5. Delete All Stories](#5-delete-all-stories)
- [Message APIs](#message-apis)
  - [1. Create Message](#1-create-message)
  - [2. Get Message](#2-get-message)

---

## Auth APIs

### 1. Register API
- **Endpoint:** `POST http://localhost:5757/api/auth/register`
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
- **Endpoint:** `POST http://localhost:5757/api/auth/login`
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
- **Endpoint:** `GET http://localhost:5757/api/auth/logout`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/auth/logout'
    ```

### 4. Current Profile
- **Endpoint:** `GET http://localhost:5757/api/auth/current-user`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/auth/current-user'
    ```

---

## User APIs

### 1. Get Single User
- **Endpoint:** `GET http://localhost:5757/api/user/get/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/get/65f6d4add88915a761b331a2'
    ```

### 2. Update User
- **Endpoint:** `PUT http://localhost:5757/api/user/update`
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
- **Endpoint:** `POST http://localhost:5757/api/user/follow/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/follow/65f6d4add88915a761b331a2'
    ```

### 4. Unfollow User
- **Endpoint:** `POST http://localhost:5757/api/user/unfollow/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/unfollow/65f6d4add88915a761b331a2'
    ```

### 5. Get Followers List
- **Endpoint:** `GET http://localhost:5757/api/user/get-followers-lists`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/get-followers-lists'
    ```

### 6. Get Following List
- **Endpoint:** `GET http://localhost:5757/api/user/get-following-lists`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/get-following-lists'
    ```

### 7. Block User
- **Endpoint:** `POST http://localhost:5757/api/user/block/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/block/65f6d4add88915a761b331a2'
    ```

### 8. Unblock User
- **Endpoint:** `POST http://localhost:5757/api/user/unblock/{userId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/user/unblock/65f6d4add88915a761b331a2'
    ```

### 9. Block User Lists
- **Endpoint:** `GET http://localhost:5757/api/user/blocked-lists`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/blocked-lists'
    ```

### 10. Delete User
- **Endpoint:** `DELETE http://localhost:5757/api/user/delete`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/user/delete'
    ```

### 11. Search User
- **Endpoint:** `GET http://localhost:5757/api/user/search/{query}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/user/search/kP'
    ```

### 12. Update Profile Picture
- **Endpoint:** `PUT http://localhost:5757/api/user/update-profile-picture`
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/user/update -profile-picture' \
    --form 'profilePicture=@"/G:/Desktop Wallpaper/∆LE_._ZkJmRmZdcg.jpg"'
    ```

### 13. Update Cover Picture
- **Endpoint:** `PUT http://localhost:5757/api/user/update-cover-picture`
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/user/update-cover-picture' \
    --form 'coverPicture=@"/C:/Users/intel/Downloads/laptop-png.jpg"'
    ```

---

## Post APIs

### 1. Create Post
- **Endpoint:** `POST http://localhost:5757/api/post/create`
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
    --data '{
        "caption": "This is sf caption"
    }'
    ```

### 2. Create Post with Images
- **Endpoint:** `POST http://localhost:5757/api/post/create-with-image`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/create-with-image' \
    --form 'caption="sf cap with images"' \
    --form 'images=@"/G:/Desktop Wallpaper/baby.jpg"' \
    --form 'images=@"/G:/Desktop Wallpaper/car.jpg"'
    ```

### 3. Update Post Caption
- **Endpoint:** `PUT http://localhost:5757/api/post/update/{postId}`
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
    --data '{
        "caption": "This is sf caption"
    }'
    ```

### 4. Get All Posts
- **Endpoint:** `GET http://localhost:5757/api/post/get-all/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-all/65f6d4add88915a761b331a2'
    ```

### 5. Get User Posts
- **Endpoint:** `GET http://localhost:5757/api/post/get-user-posts`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-user-posts'
    ```

### 6. Get Posts of Following
- **Endpoint:** `GET http://localhost:5757/api/post/get-post-of-following`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-post-of-following'
    ```

### 7. Get Posts of Followers
- **Endpoint:** `GET http://localhost:5757/api/post/get-post-of-followers`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/post/get-post-of-followers'
    ```

### 8. Delete a Post
- **Endpoint:** `DELETE http://localhost:5757/api/post/delete/{postId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/post/delete/65fc93a4a7d9800167081fc5'
    ```

### 9. Like Post
- **Endpoint:** `POST http://localhost:5757/api/post/like/{postId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/post/like/65fd3dc59724eb14a07c14db'
    ```

### 10. Unlike Post
- **Endpoint:** `POST http://localhost:5757/api/post/un-like/{postId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/post/un-like/65fd3dc59724eb14a07c14db'
    ```

---

## Comment APIs

### 1. Add Comment to Post
- **Endpoint:** `POST http://localhost:5757/api/comment/add`
- **Request Body:**
    ```json
    {
        "postId": "65fd3dc59724eb14a 07c14db",
        "text": "comment on the post"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/comment/add' \
    --header 'Content-Type: application/json' \
    --data '{
        "postId": "65fd3dc59724eb14a07c14db",
        "text": "comment on the post"
    }'
    ```

### 2. Reply on Comment
- **Endpoint:** `POST http://localhost:5757/api/comment/add/reply/{commentId}`
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
    --data '{
        "text": "reply on comment"
    }'
    ```

### 3. Update Comment
- **Endpoint:** `PUT http://localhost:5757/api/comment/update/{commentId}`
- **Request Body:**
    ```json
    {
        "text": "mk comment"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/comment/update/65fdbee5285d6e7af0da7f86' \
    --header 'Content-Type: application/json' \
    --data '{
        "text": "mk comment"
    }'
    ```

### 4. Update Reply Comment
- **Endpoint:** `PUT http://localhost:5757/api/comment/update/{commentId}/replies/{replyId}`
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5757/api/comment/update/65fdbee5285d6e7af0da7f86/replies/65fdc6fcce0afb51aa2bbfb5'
    ```

### 5. Get Comment on Post
- **Endpoint:** `GET http://localhost:5757/api/comment/post/{postId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/comment/post/65fd3dc59724eb14a07c14db'
    ```

### 6. Delete Comment
- **Endpoint:** `DELETE http://localhost:5757/api/comment/delete/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/comment/delete/65fdd40fb0ebc6ad8d6bb4b4'
    ```

### 7. Delete Reply Comment
- **Endpoint:** `DELETE http://localhost:5757/api/comment/delete/{commentId}/reply/{replyId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/comment/delete/65ff235f42a6275f9fc4f1bf/reply/65ff239642a6275f9fc4f1c4'
    ```

### 8. Like Comment
- **Endpoint:** `POST http://localhost:5757/api/comment/like/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/comment/like/65ff235f42a6275f9fc4f1bf'
    ```

### 9. Unlike Comment
- **Endpoint:** `POST http://localhost:5757/api/comment/un-like/{commentId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/comment/un-like/65ff235f42a6275f9fc4f1bf'
    ```

### 10. Like Reply Comment
- **Endpoint:** `POST http://localhost:5757/api/comment/{commentId}/reply/like/{replyId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost:5757/api/comment/65ff235f42a6275f9fc4f1bf/reply/like/65ff36beaf412713420b820e'
    ```

### 11. Unlike Reply Comment
- **Endpoint:** `POST http://localhost:5757/api/comment/{commentId}/reply/un-like/{replyId}`
- **CURL Example:**
    ```bash
    curl --location --request POST 'http://localhost :5757/api/comment/65ff235f42a6275f9fc4f1bf/reply/un-like/65ff36beaf412713420b820e'
    ```

---

## Story APIs

### 1. Create Story
- **Endpoint:** `POST http://localhost:5757/api/story/create`
- **Request Body:**
    ```json
    {
        "text": "Hello",
        "image": "select image"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/story/create' \
    --header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZkM2RmNDk3MjRlYjE0YTA3YzE0ZTMiLCJpYXQiOjE3MTEyMjYxNzgsImV4cCI6MTcxMTgzMDk3OH0.S19BKOp0DbgNJOGTSTOrKK2AOqPTVpHTAfYbUP9uLs8' \
    --form 'text="my first story text"' \
    --form 'image=@"/G:/Desktop Wallpaper/359695.jpg"'
    ```

### 2. Get Current User Story
- **Endpoint:** `GET http://localhost:5757/api/story/get/all`
- **CURL Example:**
    ```bash
    curl --location --request GET 'http://localhost:5757/api/story/get/all'
    ```

### 3. Get User Story
- **Endpoint:** `GET http://localhost:5757/api/story/get/user-story/{userId}`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5757/api/story/get/user-story/65fd3d093ab5dfaa5fb5d683'
    ```

### 4. Delete Story
- **Endpoint:** `DELETE http://localhost:5757/api/story/delete/{storyId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/story/delete/66000f4155a51d086a73ab5f'
    ```

### 5. Delete All Stories
- **Endpoint:** `DELETE http://localhost:5757/api/story/delete/all-stories`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:5757/api/story/delete/all-stories'
    ```

---

## Message APIs

### 1. Create Message
- **Endpoint:** `POST http://localhost:5757/api/message/create`
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
    --data '{
        "conversationId": "660130cb20cad9dec2c87b32",
        "sender": "65fd3d093ab5dfaa5fb5d683",
        "text": "Hi.."
    }'
    ```

### 2. Get Message
- **Endpoint:** `GET http://localhost:5757/api/message/get/{conversationId}`
- **CURL Example:**
    ```bash
    curl --location --request GET 'http://localhost:5757/api/message/get/660130cb20cad9dec2c87b32'
    ```