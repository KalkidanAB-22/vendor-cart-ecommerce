# 🛒 Vendor-Cart

## Full-Stack E-Commerce Platform

<p align="center">
  A modern full-stack e-commerce platform built with React, Express.js, PostgreSQL, Stripe, and Cloudinary.
</p>

<p align="center">
  <img src="./screenshots/vendor-cart-logo.png" width="180" alt="Vendor-Cart Logo"/>
</p>

---

## 🌐 Live Demo

### Frontend

**https://vendor-cart-app.vercel.app**

### Backend API

**https://vendor-cart-ecommerce-d12v.vercel.app**

> Vendor-Cart is deployed with a Vercel frontend communicating with a production Express REST API.

---

## 📸 Project Preview

### Homepage

<img src="./screenshots/HomePage.png" width="900" alt="Vendor-Cart Homepage"/>

### Product Details

<img src="./screenshots/ProductDetails.png" width="900" alt="Product Details"/>

### Product Search

<img src="./screenshots/Search.png" width="900" alt="Product Search"/>

### Shopping Cart

<img src="./screenshots/Cart.png" width="900" alt="Shopping Cart"/>

### Checkout Page

<img src="./screenshots/Checkout.png" width="900" alt="Checkout Page"/>

### Payment Selection

<img src="./screenshots/Payment.png" width="900" alt="Payment Selection"/>

### Stripe Checkout

<img src="./screenshots/StripeCheckout.png" width="900" alt="Stripe Checkout"/>

### User Profile

<img src="./screenshots/Profile.png" width="900" alt="User Profile"/>

### Admin Dashboard

<img src="./screenshots/AdminDashboard.png" width="900" alt="Admin Dashboard"/>

### Inventory Management

<img src="./screenshots/InventoryManagement.png" width="900" alt="Inventory Management"/>

### Order Management

<img src="./screenshots/OrdersManagement.png" width="900" alt="Order Management"/>

### Database

<img src="./screenshots/Database.png" width="900" alt="Database"/>

### API Testing

<img src="./screenshots/APITesting.png" width="900" alt="API Testing"/>

---

## 📌 Overview

Vendor-Cart is a full-stack e-commerce application designed to demonstrate a complete production-style shopping experience.

The platform connects a React frontend with an Express REST API, PostgreSQL database, Cloudinary image storage, and Stripe payment processing.

The project focuses on real-world full-stack development concepts including authentication, authorization, database relationships, shopping cart management, order processing, payment integration, image uploads, API validation, and production deployment.

### Application Architecture

```text
                    React Frontend
                          │
                          ▼
                   Express REST API
                          │
                          ▼
                  PostgreSQL Database
                    │             │
                    ▼             ▼
                Cloudinary      Stripe
```

### Customers Can

- Browse products
- Search products
- Filter products by category
- Create accounts
- Log in securely
- Manage their profiles
- Add products to their cart
- Update cart quantities
- Place orders
- Complete checkout
- Make payments through Stripe
- View order history
- Continue payment for pending orders

### Administrators Can

- Access the admin dashboard
- Manage products
- Upload product images
- Update product information
- Delete products
- Manage inventory
- Manage customer orders
- Monitor sales

---

## ✨ Features

### 👤 Customer Features

- User registration
- User login
- JWT authentication
- Protected routes
- User profile management
- Product browsing
- Product searching
- Category filtering
- Cloudinary product images
- Shopping cart management
- Cart quantity updates
- Order creation
- Checkout workflow
- Stripe payment integration
- Order history
- Pay Now functionality for pending orders
- Responsive interface

### 🛠️ Admin Features

- Admin authentication
- Role-based authorization
- Admin dashboard
- Product creation
- Product updating
- Product deletion
- Inventory management
- Product image upload
- Order management
- Sales monitoring

---

## 💳 Payment System

Vendor-Cart currently supports **Stripe Checkout** for online payments.

The payment workflow is designed to separate order creation from payment processing while allowing customers to continue payment for pending orders.

### New Checkout Flow

```text
Customer Checkout
       │
       ▼
Select Stripe
       │
       ▼
Create Order
       │
       ▼
Create Stripe Checkout Session
       │
       ▼
Stripe Checkout
       │
       ▼
Payment
       │
       ▼
Payment Success
```

### Existing Pending Orders

Customers can also continue payment for an existing pending order.

```text
Orders
   │
   ▼
Pay Now
   │
   ▼
Existing Pending Order
   │
   ▼
Create Stripe Checkout Session
   │
   ▼
Stripe Checkout
   │
   ▼
Payment
```

### Future Payment Integrations

Planned payment options include:

- Telebirr
- CBE Birr
- Additional local payment gateways

---

## 🔐 Authentication & Authorization

Vendor-Cart uses **JWT-based authentication** combined with **role-based authorization**.

### Authentication Flow

```text
User Login
     │
     ▼
Backend Verifies Credentials
     │
     ▼
JWT Token Generated
     │
     ▼
Token Stored in Frontend
     │
     ▼
Protected API Requests
     │
     ▼
Authorized Application Access
```

### User Roles

| Role     | Permissions                                               |
| -------- | --------------------------------------------------------- |
| Customer | Browse products, manage cart, checkout, and manage orders |
| Admin    | Manage products, inventory, orders, and sales             |

---

## 🖼️ Image Management

Product images are managed using **Cloudinary**.

### Image Upload Flow

```text
Admin Uploads Image
        │
        ▼
Cloudinary Stores Image
        │
        ▼
Image URL Saved in Database
        │
        ▼
Frontend Retrieves Image URL
        │
        ▼
Product Image Displayed
```

### Benefits

- Cloud-based image storage
- Fast image delivery
- No dependency on local image files
- Production-oriented asset management
- Easier image management for administrators

---

## 🏗️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Context API
- JavaScript

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- Express Middleware
- Express Validator

### Database

- PostgreSQL
- Supabase

### Cloud & External Services

- Vercel
- Cloudinary
- Stripe
- Supabase

---

## 📂 Project Structure

```text
Vendor-Cart/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── validators/
│   ├── api/
│   ├── db.js
│   ├── index.js
│   ├── vercel.json
│   └── package.json
│
├── vendor-cart-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── assets/
│   │
│   ├── vite.config.js
│   └── package.json
│
├── screenshots/
│   ├── HomePage.png
│   ├── ProductDetails.png
│   ├── Search.png
│   ├── Cart.png
│   ├── Checkout.png
│   ├── Payment.png
│   ├── StripeCheckout.png
│   ├── Profile.png
│   ├── AdminDashboard.png
│   ├── InventoryManagement.png
│   ├── OrdersManagement.png
│   ├── Database.png
│   ├── APITesting.png
│   └── vendor-cart-logo.png
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/KalkidanAB-22/vendor-cart.git
cd Vendor-Cart
```

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd vendor-cart-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🖥️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

Backend:

```text
http://localhost:10000
```

---

## 🔑 Environment Variables

### Backend `.env`

Create a `.env` file inside the `server` directory.

```env
DATABASE_URL=your_postgresql_connection_string

PORT=10000

CLIENT_URL=http://localhost:5173

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

> Never commit your `.env` file or real API keys, database credentials, JWT secrets, Cloudinary credentials, or Stripe secrets to GitHub.

### Frontend `.env`

Create a `.env` file inside `vendor-cart-frontend`.

#### Development

```env
VITE_API_URL=http://localhost:10000
```

#### Production

```env
VITE_API_URL=https://vendor-cart-ecommerce-d12v.vercel.app
```

The production frontend must use the deployed backend API instead of `localhost`.

---

## 🚀 Deployment

### Frontend

**Platform:** Vercel

**Live Application:**

https://vendor-cart-app.vercel.app

### Backend

**Platform:** Vercel

**Production API:**

https://vendor-cart-ecommerce-d12v.vercel.app

### Database

**Platform:** Supabase PostgreSQL

### Product Images

**Service:** Cloudinary

### Payments

**Service:** Stripe

---

## 🧩 Deployment Challenges

Deploying Vendor-Cart introduced several real-world deployment problems that required debugging beyond simply building the application.

### 1. Frontend-to-Backend Configuration

During development, the frontend communicated with the local backend:

```text
http://localhost:10000
```

This worked locally because the Express server was running on the development machine.

However, the production frontend could not communicate with `localhost` on the developer's computer.

The API client was therefore configured to use the deployed production backend.

#### Development

```text
React Frontend
      │
      ▼
localhost:10000
      │
      ▼
Local Express Server
```

#### Production

```text
Vercel Frontend
      │
      ▼
Production API URL
      │
      ▼
Vercel Express Backend
```

---

### 2. CORS Configuration

The backend required CORS configuration to allow requests from the deployed frontend.

The API was configured to support both:

- Local development
- Production frontend requests

This helped resolve cross-origin request problems between the deployed frontend and backend.

---

### 3. Vercel Backend Deployment

The Express backend required additional configuration to work correctly with Vercel's serverless environment.

The deployment required:

- An `api/index.js` entry point
- A `vercel.json` configuration
- Correct route handling
- Production environment variables
- Proper database configuration

---

### 4. Production Environment Variables

The deployment required environment variables to be configured separately from local development.

Sensitive values included:

- PostgreSQL connection strings
- JWT secrets
- Cloudinary credentials
- Stripe secret keys

These values must be configured through the deployment platform instead of being committed to the repository.

---

### 5. Debugging Production API Failures

One of the most important deployment issues was discovering that the production frontend was still attempting to make requests to:

```text
http://localhost:10000
```

This resulted in errors such as:

```text
ERR_CONNECTION_REFUSED
```

and:

```text
Failed to fetch
```

The issue was traced to the frontend API configuration and corrected so that production requests use the deployed backend.

This experience reinforced the difference between **local development** and **production deployment** and the importance of environment-specific configuration.

---

## 🧠 What I Learned

Building Vendor-Cart helped strengthen my understanding of:

- Full-stack application architecture
- React component design
- REST API development
- JWT authentication
- Role-based authorization
- Protected routes
- Database relationships
- PostgreSQL integration
- Express middleware architecture
- Request validation
- Cloud image storage
- Shopping cart architecture
- Order management
- Payment integration
- Stripe Checkout integration
- Responsive UI development
- Layout and navigation design
- Environment configuration
- Production API configuration
- CORS configuration
- Vercel deployment
- Serverless backend deployment
- Debugging production issues
- Separating development and production environments

---

## 🚧 Future Improvements

Planned upgrades include:

- Telebirr integration
- CBE Birr integration
- Product reviews
- Wishlist system
- Email notifications
- Advanced analytics dashboard
- Product recommendation system
- Real-time order tracking
- Mobile application

---

## 👨‍💻 Author

### Kalkidan Abebe

GitHub:

https://github.com/KalkidanAB-22

---

## ⭐ Project Status

**🚀 Active Development**

Vendor-Cart is continuously improving toward a more production-ready e-commerce platform.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this software with proper attribution.
