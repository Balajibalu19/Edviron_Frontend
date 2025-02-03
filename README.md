## Transaction Management Application

This is a Transaction Management Application that provides an overview of transactions, details by school, and transaction status checks. The project is built with a MERN (MongoDB, Express, React, Node.js) stack.

🚀 Features

1. Transaction Overview: View a summary of all transactions.

2. Details by School: Check transactions filtered by specific schools.

3. Status Check: Verify the status of transactions.

4. Responsive UI: Optimized for both desktop and mobile devices.

🛠️ Technologies Used

1. Frontend: React, React Router DOM, Tailwind CSS

2. Backend: Node.js, Express.js

3. Database: MongoDB

4. Middleware: CORS, Body-Parser

5. Environment: dotenv

⚙️ Prerequisites

1. Node.js (v14+)

2. MongoDB (Ensure MongoDB is running locally or provide a cloud database URI)

3. npm or yarn



## Backend Setup

1. Clone Repository:

       git clone https://github.com/Balajibalu19/Edviron_Backend.git
       cd .\edviron\

2. Install Dependencies:

       npm install

3. Run Backend Server:

       node index.js

## Frontend Setup

1. Clone Repository:

       git clone 
       cd frontend

2. Install Dependencies:

       npm install

3. Run Frontend:

       npm start



📸 Screenshots

1. Transaction Overview

![Image](https://github.com/user-attachments/assets/39b2582d-d70f-4e14-98b4-7e8bc8118118)

2. Details by School


![Image](https://github.com/user-attachments/assets/87b901f6-2f22-4086-8129-a1ce351546d4)


4. Status Check


![Image](https://github.com/user-attachments/assets/54b952b0-eb6b-4cde-85f0-9e4e24654e1f)


# 📡 API Endpoints

GET / — Health check: Returns "Server is up and running!"

/api/transactions — Handles transaction-related operations (CRUD)



# API Documentation

## 1. Fetch All Transactions

Endpoint: GET /api/transactions

Response Example:

[
  {
    "collect_id": "001",
    "school_id": "S123",
    "gateway": "Stripe",
    "order_amount": 1000,
    "transaction_amount": 950,
    "status": "Success",
    "custom_order_id": "TXN001"
  }
]

## 2. Fetch Transactions by School

Endpoint: GET /api/transactions/school/:school_id

Response Example:

[
  {
    "collect_id": "002",
    "school_id": "S456",
    "gateway": "PayPal",
    "order_amount": 1200,
    "transaction_amount": 1180,
    "status": "Pending",
    "custom_order_id": "TXN002"
  }
]

## 3. Transaction Status Check

Endpoint: GET /api/transactions/status/:custom_order_id

Response Example:

{
  "custom_order_id": "TXN001",
  "status": "Success"
}

## 4. Webhook for Status Updates

Endpoint: POST /api/webhook

Request Body:

{
  "custom_order_id": "TXN003",
  "status": "Failed"
}

Response:

{
  "message": "Status updated successfully"
}
