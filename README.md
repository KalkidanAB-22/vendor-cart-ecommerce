# 🛒 Vendor-Cart

## Full Stack E-Commerce Platform

<p align="center">
  A modern full-stack e-commerce application built with React, Express.js, PostgreSQL, Stripe, and Cloudinary.
</p>

<p align="center">
  <img src="./screenshots/vendor-cart-logo.png" width="180" alt="Vendor-Cart Logo"/>
</p>

---

# 📸 Project Preview

## Homepage

<img src="./screenshots/Homepage.png" width="900" />

## Product Details

<img src="./screenshots/ProductDetails.png" width="900" />

## Product Search

<img src="./screenshots/Search.png" width="900" />

## Shopping Cart

<img src="./screenshots/Cart.png" width="900" />

## Checkout Page

<img src="./screenshots/Checkout.png" width="900" />

## Payment Selection

<img src="./screenshots/Payment.png" width="900" />

## Stripe Checkout

<img src="./screenshots/StripeCheckout.png" width="900" />

## User Profile

<img src="./screenshots/Profile.png" width="900" />

## Admin Dashboard

<img src="./screenshots/AdminDashboard.png" width="900" />

## Inventory Management

<img src="./screenshots/InventoryManagement.png" width="900" />

## Order Management

<img src="./screenshots/OrdersManagement.png" width="900" />

## Database

<img src="./screenshots/Database.png" width="900" />

## API Testing

<img src="./screenshots/APITesting.png" width="900" />

---

# 📌 Overview

Vendor-Cart is a full-stack e-commerce platform designed to demonstrate a complete production-style shopping experience.

The application provides a complete flow between:

```
React Frontend
        |
        ↓
Express REST API
        |
        ↓
PostgreSQL Database
        |
        ↓
Cloud Services
        |
        ↓
Payment Gateway
```

Users can:

- Browse products
- Search products
- Filter by categories
- Create accounts
- Manage shopping carts
- Place orders
- Complete payments

Administrators can:

- Manage products
- Upload product images
- Control inventory
- Manage customer orders
- Monitor sales

---

# 🌐 Live Demo

## Frontend

```
https://vendor-cart-app.vercel.app
```

## Backend API

```
https://vendor-cart-api.vercel.app
```

---

# ✨ Features

## 👤 Customer Features

✅ User registration

✅ User login

✅ JWT authentication

✅ Protected routes

✅ User profile

✅ Product browsing

✅ Product searching

✅ Category filtering

✅ Cloudinary product images

✅ Shopping cart

✅ Cart quantity updates

✅ Order creation

✅ Checkout system

✅ Stripe payment integration

✅ Order history

---

# 🛠️ Admin Features

✅ Admin authentication

✅ Role-based authorization

✅ Admin dashboard

✅ Create products

✅ Update products

✅ Delete products

✅ Inventory management

✅ Product image upload

✅ Order management

✅ Sales monitoring

---

# 💳 Payment System

Vendor-Cart currently supports:

## Stripe Payment

Payment flow:

```
Customer Checkout

        ↓

Select Payment Method

        ↓

Create Payment Session

        ↓

Stripe Checkout

        ↓

Payment Confirmation

        ↓

Order Completion
```

Future payment integrations:

- Telebirr
- CBE Birr
- Additional local payment gateways

---

# 🔐 Authentication System

Vendor-Cart uses JWT authentication.

Authentication flow:

```
User Login

      ↓

Backend verifies credentials

      ↓

JWT Token Generated

      ↓

Token Stored In Frontend

      ↓

Protected Routes Become Available
```

User roles:

| Role     | Permissions                             |
| -------- | --------------------------------------- |
| Customer | Browse products, cart, checkout, orders |
| Admin    | Manage products, inventory, orders      |

---

# 🖼️ Image Management

Product images are managed using Cloudinary.

Flow:

```
Admin uploads image

        ↓

Cloudinary stores image

        ↓

Image URL saved in database

        ↓

Frontend displays image
```

Benefits:

- Fast image delivery
- Cloud storage
- No local image dependency
- Production-ready asset handling

---

# 🏗️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Context API
- JavaScript

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- Middleware Architecture

## Database

- PostgreSQL
- Supabase

## Cloud Services

- Cloudinary
- Stripe
- Railway
- Vercel

---

# 📂 Project Structure

```
Vendor-Cart


│
├── server
│
│   ├── controllers
│   │
│   ├── routes
│   │
│   ├── middleware
│   │
│   ├── validators
│   │
│   ├── db.js
│   │
│   ├── index.js
│   │
│   └── package.json
│
│
├── vendor-cart-frontend
│
│   ├── src
│   │
│   │   ├── components
│   │   │
│   │   ├── pages
│   │   │
│   │   ├── context
│   │   │
│   │   ├── api
│   │   │
│   │   └── assets
│   │
│   ├── vite.config.js
│   │
│   └── package.json
│
│
├── screenshots
│
├── .gitignore
│
└── README.md

```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/KalkidanAB-22/vendor-cart.git

cd Vendor-Cart
```

---

# Frontend Setup

Navigate:

```bash
cd vendor-cart-frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# Backend Setup

Navigate:

```bash
cd server
```

Install:

```bash
npm install
```

Run:

```bash
npm start
```

Backend:

```
http://localhost:10000
```

---

# 🔑 Environment Variables

## Backend `.env`

```env
DATABASE_URL=postgresql://postgres.hfumovsqsduvobchtvri:[YOUR-PASSWORD]@aws-1-eu-west-2.pooler.supabase.com:6543/postgres

PORT=10000

CLIENT_URL=http://localhost:5173

JWT_SECRET=your_secret


CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret


STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:10000
```

Production:

```env
VITE_API_URL=https://vendor-cart-api.vercel.app
```

---

# 🚀 Deployment

## Frontend

Hosted on:

```
Vercel
```

## Backend

Hosted on:

```
Railway
```

## Database

Hosted on:

```
Supabase PostgreSQL
```

## Images

Hosted on:

```
Cloudinary
```

## Payments

Powered by:

```
Stripe
```

---

# 🧠 What I Learned

Building Vendor-Cart helped me improve:

- Full-stack application architecture
- React component design
- REST API development
- JWT authentication
- Role-based authorization
- Database relationships
- PostgreSQL integration
- Cloud image storage
- Payment integration
- Deployment workflows
- Environment configuration
- Debugging production issues

---

# 🚧 Future Improvements

Planned upgrades:

- Telebirr integration
- CBE payment integration
- Product reviews
- Wishlist system
- Email notifications
- Advanced analytics dashboard
- Recommendation system
- Real-time order tracking
- Mobile application

---

# 👨‍💻 Author

## Kalkidan Abebe

GitHub:

```
https://github.com/KalkidanAB-22
```

---

# ⭐ Project Status

🚀 Active Development

Vendor-Cart is continuously improving toward a production-ready e-commerce platform.
