# 💸 Expense Tracker

A full-stack **MERN** (MongoDB, Express, React, Node.js) expense tracking application that lets you manage your personal finances with ease — add, edit, delete, and visualize expenses by category and month.

---

## 🚀 Features

- **Add & Manage Expenses** — Track expenses with product name, amount, category, payment method, location, date, notes, and payment status
- **Payment Methods** — Supports Cash, UPI, Card, and Net Banking
- **Monthly View** — Browse expenses grouped and summarized by month
- **Category Breakdown** — Visual charts showing spending by category
- **Expense Details** — Dedicated detail page for each expense
- **Toast Notifications** — Real-time feedback on create, update, and delete actions
- **Responsive UI** — Built with Tailwind CSS + DaisyUI for a clean, mobile-friendly design

---

## 🛠️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, React Router DOM, Axios, Chart.js, DaisyUI, Tailwind CSS |
| Backend   | Node.js, Express 5, Mongoose                    |
| Database  | MongoDB Atlas                                   |
| Dev Tools | Vite, Nodemon, ESLint                           |

---

## 📁 Project Structure

```
ExpenseTracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── controllers/
│   │   │   └── expenseController.js
│   │   ├── models/
│   │   │   └── expenseModel.js
│   │   ├── routes/
│   │   │   └── expenseRoutes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ExpenseCard.jsx
    │   │   ├── MonthlySummary.jsx
    │   │   ├── CategoryChart.jsx
    │   │   └── ExpenseNotFound.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── AddExpensePage.jsx
    │   │   ├── ExpenseDetailsPage.jsx
    │   │   ├── MonthlyExpensesPage.jsx
    │   │   └── CategoryWisePage.jsx
    │   ├── lib/
    │   │   ├── axios.js
    │   │   └── utils.js
    │   └── App.jsx
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

The server will run at `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`

---

## 🔌 API Endpoints

Base URL: `http://localhost:3000/expenses`

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/`                   | Get all expenses                   |
| GET    | `/:id`                | Get a single expense by ID         |
| POST   | `/`                   | Create a new expense               |
| PUT    | `/:id`                | Update an expense                  |
| DELETE | `/:id`                | Delete an expense                  |
| GET    | `/monthly`            | Get expenses grouped by month      |
| GET    | `/category-summary`   | Get category-wise spending summary |

---

## 📊 Expense Schema

```js
{
  productName: String,       // required
  amount: Number,            // required
  category: String,          // required
  date: Date,                // required
  paymentMethod: String,     // "cash" | "upi" | "card" | "netbanking"
  location: String,
  notes: String,
  status: String,            // "Paid" (default) | "Pending"
  timestamps: true
}
```

---

## 📸 Pages Overview

- **Home** — Grid view of all expenses with delete/edit options
- **Add Expense** — Form to log a new expense
- **Expense Details** — Full info view for a single expense
- **Monthly Expenses** — Expenses filtered and summarized by month
- **Category Wise** — Donut/bar chart breakdown by spending category

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
