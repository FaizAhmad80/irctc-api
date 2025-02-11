# IRCTC API - Railway Management System 🚆

This is a simple API for a railway management system where users can check train availability, book seats, and manage bookings.

---

## **Features**
✅ User Registration & Login (JWT Authentication)  
✅ Train Management (Admin Only - Protected with API Key)  
✅ Seat Availability Check  
✅ Secure Seat Booking with Concurrency Handling  
✅ Fetch User Booking Details  

---

## **Tech Stack**
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Security**: JWT Authentication, API Key for Admin  

---

## **Installation & Setup**

### **1️ Clone the repository**
<!-- ```sh -->
git clone https://github.com/FaizAhmad80/irctc-api.git
cd irctc-api

### **2 install dependencies**

npm init -y
npm install express mysql2 jsonwebtoken bcrypt dotenv sequelize

### **3 Set up the MySQL database**

#### **1 Open MySQL and create a new database:**
CREATE DATABASE irctc;

#### **2 Run the following script to create tables:**
USE irctc;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    train_name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    train_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);

### **4 Configure Environment Variables**

#### **1 Create a .env file in the project root and add the following:**
DB_HOST=your_host
DB_USER=your_user
DB_PASS=your_password
DB_NAME=irctc
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_key
PORT=3000

### **5 Start the Server**

npm start

### **6 Use Postman to Test API**


## **Postman Usage Guide**

### 🛠️ **1. Register a User**
- **Method:** `POST`
- **Endpoint:** `http://localhost:3000/api/users/register`
- **Headers:**
  ```json
  { "Content-Type": "application/json" }
- **Body:**
  ```json
    {
    "username": "testuser",
    "password": "password123",
    "role": "user"
    }
- **Response:**
  ```json
    {
    "message": "User registered successfully"
    }

### 🛠️ **2. Login User**
- **Method:** `POST`
- **Endpoint:** `http://localhost:3000/api/users/login`
- **Headers:**
  ```json
  { "Content-Type": "application/json" }
- **Body:**
    ```json
    {
    "username": "testuser",
    "password": "password123"
    }
- **Response:**
    ```json
    {
    "token": "your_jwt_token_here"
    }

### 🛠️ **3. Add a New Train (Admin Only)**
- **Method:** `POST`
- **Endpoint:** `http://localhost:3000/api/trains`
- **Headers:**
  ```json
  { "x-api-key": "your_admin_key_here", "Content-Type": "application/json" }
- **Body:**
    ```json
    {
    "train_name": "Express 123",
    "source": "Mumbai",
    "destination": "Delhi",
    "total_seats": 100
    }
- **Response:**
    ```json
    {
    "message": "Train added successfully"
    }

### 🛠️ **4. Get Available Trains**
- **Method:** `GET`
- **Endpoint:** `http://localhost:3000/api/trains?source=Mumbai&destination=Delhi`
- **Headers:**
  ```json
  { "x-api-key": "your_admin_key_here", "Content-Type": "application/json" }
- **Response:**
    ```json
    [
    {
        "id": 1,
        "train_name": "Express 123",
        "source": "Mumbai",
        "destination": "Delhi",
        "total_seats": 100,
        "available_seats": 100
    }
    ]

### 🛠️ **5. Book a Seat**
- **Method:** `POST`
- **Endpoint:** `http://localhost:3000/api/bookings`
- **Headers:**
  ```json
  { "Authorization": "Bearer your_jwt_token_here", "Content-Type": "application/json"}
- **Body:**
    ```json
    {
    "train_id": 1
    }
- **Response:**
    ```json
    {
    "message": "Seat booked successfully", "booking_id": 123
    }

### 🛠️ **4. Get Available Trains**
- **Method:** `GET`
- **Endpoint:** `http://localhost:3000/api/bookings/123`
- **Headers:**
  ```json
  { "Authorization": "your_jwt_token_here" }
- **Response:**
    ```json
    {
    "id": 123,
    "user_id": 1,
    "train_id": 1,
    "booking_date": "2025-02-11T10:00:00.000Z"
    }