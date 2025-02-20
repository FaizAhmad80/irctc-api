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
```bash
git clone https://github.com/FaizAhmad80/irctc-api.git

cd irctc-api
```

### **2 install dependencies**

```bash
npm init -y
npm install express mysql2 jsonwebtoken bcrypt dotenv sequelize
```

### **3 Set up the MySQL database**

#### **1 Open MySQL and create a new database:**
```sql
CREATE DATABASE irctc;
```

#### **2 Run the following script to create tables:**
```sql
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
```

### **4 Configure Environment Variables**

#### **1 Create a .env file in the project root and add the following:**
```
DB_HOST=localhost
DB_USER=irctc_user
DB_PASS=J!4d!G2r@kP1yX7mN%q
DB_NAME=irctc_db
JWT_SECRET=6b2a1d5f8e3c4a9b0d7e6f1c2a5b8d3f
ADMIN_API_KEY=9a8b7c6d5e4f3g2h1i0jklmnopqrstuvwxyz
```

### **5 Start the Server**
```sh
npm start
```

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
  { "x-api-key": "9a8b7c6d5e4f3g2h1i0jklmnopqrstuvwxyz", "Content-Type": "application/json" }
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
  { "Content-Type": "application/json" }
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
  { "Authorization": "your_jwt_token_here", "Content-Type": "application/json"}
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

### 🛠️ **6. Get Booking Details**
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
