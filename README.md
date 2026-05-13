# ExpenseIQ API

A RESTful API built with Node.js and Express for tracking personal expenses and budgets.

## 🚀 Live API
https://your-render-url.onrender.com

## 🛠 Tech Stack
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- ES Modules

## ✨ Features
- User registration and login with JWT
- Protected routes with middleware
- Full CRUD for expenses with filtering and sorting
- Monthly budget management per category
- Stats engine with MongoDB aggregation pipelines
- Budget vs actual spending calculations

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get token |
| GET | /api/auth/me | Get current user |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/expenses | Get all expenses (supports ?category= ?sortBy=) |
| POST | /api/expenses | Create a new expense |
| GET | /api/expenses/:id | Get a single expense |
| PUT | /api/expenses/:id | Update an expense |
| DELETE | /api/expenses/:id | Delete an expense |

### Budgets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/budgets | Get all budgets (supports ?month= ?year=) |
| POST | /api/budgets | Create a new budget |
| PUT | /api/budgets/:id | Update a budget |
| DELETE | /api/budgets/:id | Delete a budget |

### Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stats | Get spending stats (supports ?month= ?year=) |

## 🏃 Run Locally

1. Clone the repo
   git clone https://github.com/your-username/expense-tracker-api

2. Install dependencies
   npm install

3. Create a .env file
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   PORT=5000

4. Start the server
   npm run dev