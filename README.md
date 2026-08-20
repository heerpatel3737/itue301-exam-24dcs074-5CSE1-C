# LIBRANOVA — Practical Examination Project

**Tagline**: *"Your Books. Your Knowledge. Your Library."*  
**Roll No**: 24DCS074  
**Batch**: 5CSE1-C  
**Exam Set**: Set B  
**Repository**: `itue301-exam-24dcs074-5CSE1-C`  

---

## 📜 Project Overview

**LIBRANOVA** is a complete, full-stack Library Book Management System developed specifically for the Practical Examination. It features a prestigious classical Academia aesthetic (dark mahogany, parchment paper, brass/gold highlights, and Roman volume banners) while adhering to strict academic clarity and clean code standards.

The application allows users to browse classical masterworks, view live book availability, perform instant book previews, filter available volumes, submit borrowing requisitions with live state updates, and interact with RESTful API endpoints and MongoDB databases.

---

## 🛠️ Technology Stack

- **Frontend**: React, React Router v6, JavaScript (ES6+), Vanilla CSS (Academia Classical Theme), Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Utilities**: dotenv, cors, fetch API

---

## 📂 Project Structure

```
itue301-exam-24dcs074-5CSE1-C/
├── backend/
│   ├── middleware/
│   │   └── requestLogger.js     # Task 3: Global request logging middleware
│   ├── models/
│   │   ├── Book.js              # Task 5: Mongoose Book Schema & Model
│   │   ├── Member.js            # Task 5: Mongoose Member Schema & Model
│   │   └── Borrowing.js         # Task 5: Mongoose Borrowing Schema & Model
│   ├── package.json             # Backend dependencies & start scripts
│   └── server.js                # Express app, REST APIs, MongoDB connection & error handler
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx   # Task 1 & 2: Header navigation with React Router Links
│   │   │   └── BookCard.jsx     # Task 1: Reusable BookCard component with availability styles
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Task 1: Classical Hero banner & volume introduction
│   │   │   ├── BooksPage.jsx    # Task 4 & UX: API consumption, states & Quick Preview Modal
│   │   │   └── BorrowPage.jsx   # Task 2: Controlled form inputs & live preview summary
│   │   ├── App.jsx              # React Router v6 route configuration
│   │   ├── main.jsx             # React DOM root renderer
│   │   └── index.css            # Classical Academia theme design system
│   ├── index.html               # Main HTML template with Google Fonts
│   ├── package.json             # Frontend dependencies & Vite scripts
│   └── vite.config.js           # Vite development server configuration
├── .env.example                 # Template for environment variables (never commit .env)
├── .gitignore                   # Excludes node_modules, .env, and build artifacts
├── DEMO_GUIDE.md                # 5-7 minute viva demonstration script
├── VIVA_CHEAT_SHEET.md          # Comprehensive Practical 1-5 concept guide for viva
└── 24dcs074_SetB_Report.pdf     # Formatted PDF examination report with screenshot frames
```

---

## 🗺️ Exam Task 1–5 Mapping

| Task | Requirement | Location in Codebase |
| :--- | :--- | :--- |
| **Task 1** | React Components (`HomePage`, `BooksPage`, `BorrowPage`, `BookCard`, `Navigation`) | [`frontend/src/components/`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/components), [`frontend/src/pages/`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/pages) |
| **Task 1** | `BookCard` receives `title`, `author`, `category`, `available` with visual styles | [`frontend/src/components/BookCard.jsx`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/components/BookCard.jsx) |
| **Task 2** | React Router `<Link>` for `/`, `/books`, `/borrow` without page reload | [`frontend/src/App.jsx`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/App.jsx), [`Navigation.jsx`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/components/Navigation.jsx) |
| **Task 2** | Controlled form inputs (`useState`) with live entered data preview | [`frontend/src/pages/BorrowPage.jsx`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/pages/BorrowPage.jsx) |
| **Task 3** | Express REST API in-memory endpoints (`GET /books`, `GET /borrowings`, `POST /borrowings`) | [`backend/server.js`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/backend/server.js) |
| **Task 3** | Global `requestLogger` middleware `[METHOD] [PATH] [TIMESTAMP]` | [`backend/middleware/requestLogger.js`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/backend/middleware/requestLogger.js) |
| **Task 3** | Global Error Handler middleware (LAST middleware, clean JSON, status codes 200, 201, 500) | [`backend/server.js`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/backend/server.js#L180-L210) |
| **Task 4** | `BooksPage` API consumption using `fetch()` and `useEffect()` with loading/error/data states | [`frontend/src/pages/BooksPage.jsx`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/pages/BooksPage.jsx) |
| **Task 5** | Mongoose Models (`Book.js`, `Member.js`, `Borrowing.js`) with validations & enums | [`backend/models/`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/backend/models) |
| **Task 5** | MongoDB connection via `MONGO_URI` in `.env` | [`backend/server.js`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/backend/server.js), [`.env.example`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/.env.example) |
| **UX Feature**| **Quick Book Preview Modal** & **Available Only Filter** (`useState`) | [`frontend/src/pages/BooksPage.jsx`](file:///c:/Users/Heer/OneDrive/Desktop/itue301-exam-24dcs074-5CSE1-C/frontend/src/pages/BooksPage.jsx) |

---

## ⚡ Quick Start & Run Commands

### 1. Environment Setup
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example backend/.env
```
Default `.env` contents:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/libranova
```

### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```
*Backend will run on `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run on `http://localhost:5173`*

---

## 🔌 API Endpoints Summary

### In-Memory REST APIs (Task 3 & 4)
- `GET /api/v1/books` — Fetch all books (200 OK)
- `GET /api/v1/borrowings` — Fetch all borrowing records (200 OK)
- `POST /api/v1/borrowings` — Create a borrowing record in memory (201 Created)

### MongoDB Mongoose APIs (Task 5)
- `GET /api/v1/db/books` — Read books from MongoDB database (200 OK)
- `POST /api/v1/db/books` — Create book in MongoDB with Mongoose validation (201 Created)
- `POST /api/v1/db/members` — Create member in MongoDB with unique email validation (201 Created)
- `POST /api/v1/db/borrowings` — Create borrowing record with enum validation (`borrowed`, `returned`, `overdue`) (201 Created)
