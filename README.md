
# Cloud Storage Application

## Project Overview

This is a **minimal backend cloud storage solution** built with Node.js microservices. The system supports user authentication, file upload and download, and email notifications. It follows a **microservices architecture** where each service runs independently and communicates via REST APIs. The core features include:

- **Authentication Service**: Handles user registration and JWT authentication.
- **User Management Service**: Manages user profile data.
- **File Management Service**: Handles file upload and download functionality.
- **Email Notification Service**: Sends email notifications upon user registration and file upload.

### Technologies Used

- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Web framework to create the REST APIs.
- **MongoDB** - NoSQL database to store user and file metadata.
- **JWT (JSON Web Token)** - For secure authentication.
- **Multer** - For handling file uploads.
- **Nodemailer** - For sending email notifications.
- **Postman** - For API testing and documentation.

## Microservices Overview

The application is divided into the following services:

1. **Authentication Service**
   - Registers users.
   - Logs users in and provides JWT tokens for secure access.

2. **User Management Service**
   - Allows users to view and update their profile information.

3. **File Management Service**
   - Allows users to upload and download their files.

4. **Email Notification Service**
   - Sends email notifications for events like registration and file uploads.

---

## Setup Instructions

### Prerequisites

Before you can run the application, ensure that the following tools are installed:

- **Node.js** (v14 or higher) - You can download it from [here](https://nodejs.org/).
- **MongoDB** - Ensure MongoDB is running locally or using a cloud instance like MongoDB Atlas.
- **Postman** - For testing APIs (optional but recommended).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Madhan03012002/Madhan-SRS-dev.git
   cd cloud-storage-app
   ```

2. **Install the dependencies for all microservices:**

   From the root of the project directory, run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following variables (ensure MongoDB and other configurations are set correctly):

   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/cloud_storage_db
   AUTH_PORT=3001
   USER_PORT=3002
   FILE_PORT=3003
   EMAIL_PORT=3004
   EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   ```

4. **Run the microservices**:

   You can start each microservice independently, or run them all simultaneously.

   - To start an individual service, use:
     ```bash
     npm run start:auth    # Starts Authentication Service
     npm run start:user    # Starts User Management Service
     npm run start:file    # Starts File Management Service
     npm run start:email   # Starts Email Notification Service
     ```

   - To start all services at once, use:
     ```bash
     npm run start:all
     ```

---

## API Endpoints

### Authentication Service

- **POST** `/auth/register`
  - Registers a new user.
  - **Request body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**: Sends a confirmation email after successful registration.

- **POST** `/auth/login`
  - Logs in an existing user.
  - **Request body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**: Returns a JWT token upon successful login:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

### User Management Service

- **GET** `/user/profile`
  - Fetches the logged-in user's profile.
  - **Response**:
    ```json
    {
      "userId": "12345",
      "email": "user@example.com",
      "name": "John Doe"
    }
    ```

- **PUT** `/user/profile`
  - Updates the user's profile.
  - **Request body**:
    ```json
    {
      "name": "John Doe Updated"
    }
    ```

### File Management Service

- **POST** `/files/upload`
  - Uploads a file (authenticated user only).
  - **Request**: Use Postman or CURL to send the file in the form-data with the key `file`.
  - **Response**:
    ```json
    {
      "message": "File uploaded",
      "fileId": "file_id_here"
    }
    ```

- **GET** `/files/download/{fileId}`
  - Downloads a file by its `fileId`.
  - **Response**: Returns the file to the user, provided it belongs to the authenticated user.

### Email Notification Service

- **POST** `/email/send`
  - Sends an email notification.
  - **Request body**:
    ```json
    {
      "to": "user@example.com",
      "subject": "Welcome to Cloud Storage",
      "text": "Thank you for registering with Cloud Storage!"
    }
    ```
  - **Response**: Sends an email to the user.

---

## Testing the API

You can test all API endpoints using **Postman**. The collection is available [here](#) (provide the link to your Postman collection).

---

- **services/auth-service**: Handles user authentication and JWT generation.
- **services/user-service**: Manages user profiles and updates.
- **services/file-service**: Uploads and serves user files.
- **services/email-service**: Sends email notifications.

---

## Deployment Notes

- Ensure MongoDB is up and running (you can use **MongoDB Atlas** if preferred).
- Set environment variables in the `.env` file with the appropriate values (including database URI and JWT secret).
- If using AWS S3, make sure to configure the AWS SDK and update the file management service to store files in S3 instead of locally.

