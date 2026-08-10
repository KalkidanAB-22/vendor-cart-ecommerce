# 🛒 Vendor-Cart

## Full Stack E-Commerce Platform

---

# 📸 Project Preview

## Homepage

## Product Details

## Product Search

## Shopping Cart

## Checkout Page

## Payment Selection

## Stripe Checkout

## User Profile

## Orders & Payment

## Admin Dashboard

## Inventory Management

## Order Management

## Database

## API Testing

---

# 📌 Overview

Vendor-Cart is a full-stack e-commerce platform designed to demonstrate a complete production-style shopping experience.

The application provides a complete flow between:

```text
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
Stripe Payment Gateway
```

Customers can:

- Browse products
- Search products
- Filter products by category
- Create accounts
- Authenticate securely using JWT
- Manage shopping carts
- Update cart quantities
- Place orders
- View order history
- Return to pending orders
- Continue payment for existing orders
- Complete payments through Stripe
- Manage their profiles

Administrators can:

- Manage products
- Upload product images
- Control inventory
- Manage customer orders
- Monitor sales

---

# 🌐 Live Demo

## Frontend

```text
https://vendor-cart-app.vercel.app
```

## Backend API

```text
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

✅ Order history

✅ Pending order management

✅ Continue payment for pending orders

✅ Centralized checkout flow

✅ Stripe payment integration

✅ Payment success and cancellation handling

---

# 🛒 Shopping & Checkout

Vendor-Cart separates the shopping experience from the payment experience to provide a cleaner checkout flow.

### Shopping Flow

```text
Browse Products
      ↓
Add To Cart
      ↓
Shopping Cart
      ↓
Checkout
      ↓
Place Order
      ↓
Stripe Checkout
```

### Existing Order Payment Flow

Customers can also continue payment for an existing pending order:

```text
Orders
   ↓
Pending Order
   ↓
Pay Now
   ↓
Checkout
   ↓
Stripe Checkout
```

This allows customers to return to an unpaid order instead of having to create another order.

### Checkout Features

- Payment method selection
- Order creation from the cart
- Existing pending order payment
- Server-side order total calculation
- Stripe Checkout session creation
- Payment success handling
- Payment cancellation handling
- Protected payment endpoints

---

# 💳 Payment System

Vendor-Cart currently supports:

## Stripe Payment

The application uses Stripe Checkout for secure card payments.

Payment flow:

```text
Customer Checkout
        ↓
Select Stripe
        ↓
Create Order
        ↓
Create Stripe Checkout Session
        ↓
Stripe Checkout
        ↓
Payment
        ↓
Payment Success
```

For existing pending orders:

```text
Orders
        ↓
Pay Now
        ↓
Existing Order
        ↓
Create Stripe Session
        ↓
Stripe Checkout
```

Future payment integrations:

- Telebirr
- CBE Birr
- Additional local payment gateways

---

# 📦 Order Management

Customers can:

- Create orders from their shopping cart
- View their order history
- View order status
- View order totals
- Remove orders
- Continue payment for pending orders

Orders use server-side cart data and pricing to calculate totals rather than trusting totals submitted by the frontend.

Order lifecycle:

```text
Cart
 ↓
Pending Order
 ↓
Payment
 ↓
Completed Order
```

---

# 🔐 Authentication System

Vendor-Cart uses JWT authentication.

Authentication flow:

```text
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

| Role     | Permissions                               |
| -------- | ----------------------------------------- |
| Customer | Browse products, cart, checkout, orders   |
| Admin    | Manage products, inventory, orders, sales |

---

# 🖼️ Image Management

Product images are managed using Cloudinary.

Flow:

```text
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

# 🎨 User Interface

Vendor-Cart uses a modern glassmorphism-inspired interface designed around a consistent shopping experience.

UI features include:

- Responsive layouts
- Glass-style cards
- Consistent buttons and forms
- Responsive navigation
- Sticky navigation while browsing
- Dedicated checkout layout
- Responsive order management
- Customer-focused checkout experience
- Dedicated footer for the main shopping experience

### Layout Strategy

Main shopping pages use:

```text
Navbar
   ↓
Page Content
   ↓
Footer
```

Checkout uses a simplified layout:

```text
Minimal Navbar
      ↓
Checkout
```

Stripe Checkout is handled externally by Stripe.

---

# 🛠️ Admin Features

## 🔑 Admin Authentication

✅ Admin authentication

✅ Role-based authorization

## 📦 Product Management

✅ Create products

✅ Update products

✅ Delete products

✅ Product image upload

## 📊 Inventory Management

✅ Inventory management

✅ Stock monitoring

## 🧾 Order Management

✅ View customer orders

✅ Manage order status

## 📈 Sales Monitoring

✅ Sales overview

✅ Sales monitoring

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
- Express Validator
- Middleware Architecture

## Database

- PostgreSQL
- Supabase

## Cloud Services

- Cloudinary
- Stripe
- Vercel
- Railway

---

# 📂 Project Structure

```text
Vendor-Cart
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── validators
│   ├── db.js
│   ├── index.js
│   └── package.json
│
├── vendor-cart-frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── api
│   │   └── assets
│   │
│   ├── vite.config.js
│   └── package.json
│
├── screenshots
│
├── .gitignore
│
├── LICENSE
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

Navigate to the frontend:

```bash
cd vendor-cart-frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Run the backend:

```bash
npm start
```

Backend:

```text
http://localhost:10000
```

---

# 🔑 Environment Variables

## Backend `.env`

```env
DATABASE_URL=your_postgresql_connection_string

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

```text
Vercel
```

## Backend

Hosted on:

```text
Vercel / Railway
```

## Database

Hosted on:

```text
Supabase PostgreSQL
```

## Images

Hosted on:

```text
Cloudinary
```

## Payments

Powered by:

```text
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
- Deployment workflows
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

```text
https://github.com/KalkidanAB-22
```

---

# ⭐ Project Status

🚀 Active Development

Vendor-Cart is continuously improving toward a production-ready e-commerce platform.

---

# 📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software with proper attribution.
