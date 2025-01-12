# Frontend Application
# Project Overview
This is a React-based frontend application designed to provide a user-friendly interface for transaction management. It includes features such as filtering, searching, and paginated displays, with enhanced functionalities like copying IDs.

# Features
Dynamic Routing: Implemented using HashRouter for compatibility with static hosting.
Transaction Overview: Displays transaction details with filtering, searching, and pagination.
Interactive UI: Copy school IDs and intuitive hover effects.
Responsive Design: Optimized for various screen sizes.
Modern Tech Stack: React, Axios, TailwindCSS.
# Tech Stack
Frontend Framework: React.js (TypeScript)
Styling: Tailwind CSS
Routing: React Router (HashRouter)
HTTP Requests: Axios
Getting Started
Follow the instructions below to set up and run the application locally.

# Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash
Copy code
npm install
 or
yarn install
# Create a .env file in the root directory and add the following environment variables:

 REACT_APP_API_URL=<your-api-url>
# Running the Application
# Start the development server:

npm start
 or
yarn start
# The application will be available at http://localhost:3000 



# Backend

# Clone the backend Repo in VS Code 



# Transaction Management Backend
This backend application is designed to manage schools and transactions, providing APIs to fetch and manage transaction and school data.

# Features
RESTful APIs to manage and fetch transactions and school details.
Supports CRUD operations for transactions and school entities.
Filters transactions by school_id, custom_order_id, or general transaction listing.
MongoDB for persistent data storage.
# Prerequisites
# Before running this application, ensure you have the following installed:

Node.js (v14 or later recommended)
MongoDB (local or cloud instance)
Installation
Clone the repository:

    git clone <repository-url>
    cd <repository-folder>
# Install dependencies:

    npm install

Configure environment variables:

Create a .env file in the project root and configure the following variables:

PORT=5002
MONGO_URI=mongodb://localhost:27017/<your-database-name>
Replace <your-database-name> with your desired MongoDB database name.

# Start the MongoDB server (if using a local instance):

mongod
# Running the Application
 # Start the server:
    nodemon index.js
 # Access the application in your browser or API testing tool (e.g., Postman) at:

http://localhost:5002
 # API Endpoints
    General Routes
    GET /
    Returns a confirmation that the server is running.
    Transactions API
    GET /api/transactions
    Fetches all transactions with associated school details.
    
    GET /api/transactions/school/:school_id
    Fetches all transactions for a specific school by school_id.
    
    GET /api/transactions/check-status
    Fetches the status of a transaction using custom_order_id.
    
    Query Parameters:
    
    custom_order_id (required): The custom order ID to check the transaction status. 
