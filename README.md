# LIBRANOVA — Practical Examination Project

**Tagline**: *"Your Books. Your Knowledge. Your Library."*  
**Roll No**: 24DCS074  
**Batch**: 5CSE1-C  
**Exam Set**: Set B  
**Course Code**: ITUE301 Web Application Development  
**Repository**: `itue301-exam-24dcs074-5CSE1-C`  

---

## 📜 Project Overview

**LIBRANOVA** is a complete, full-stack Library Book Management System built from scratch for the Set B Practical Examination.
The application presents a prestigious classical Academia aesthetic (dark mahogany background, parchment containers, gold border flourishes, and Roman volume headers) while enforcing strict academic clarity, modularity, and clean code standards.

The application enables users to browse classical masterworks, view live availability status, open quick book preview modals, filter available volumes, submit borrowing requisitions with real-time state updates, view persistent borrowing records from MongoDB, and interact with RESTful API endpoints.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6, JavaScript (ES6+), Vanilla CSS (Academia Theme), Lucide Icons
- **Backend**: Node.js, Express.js
- **Database & ODM**: MongoDB, Mongoose ODM
- **Utilities**: dotenv, cors, native Fetch API

---

## 🗺️ Tasks 1–5 Implementation Mapping

### Task 1 — React Components
Created five modular React components:
- `Navigation.jsx`: Header bar featuring brand logo, tagline, student metadata badge, and React Router navigation links.
- `BookCard.jsx`: Reusable component receiving `title`, `author`, `category`, `available`, and `description` props, rendering visually distinct badges for Available (Emerald green) vs Not Available (Crimson red).
- `HomePage.jsx`: Volume I classical hero section.
- `BooksPage.jsx`: Volume III catalog display.
- `BorrowPage.jsx`: Volume IV requisition form and Volume V borrowing records log.

### Task 2 — Routing & State Management
- Integrated React Router v6 (`<BrowserRouter>`, `<Routes>`, `<Route>`) using `<Link>` components to navigate between `/`, `/books`, and `/borrow` without full page reloads.
- `BorrowPage` utilizes controlled inputs (`useState`) bound to form fields, updating a real-time **Live Borrowing Summary** parchment card as the user types.

### Task 3 — Express REST API & Global Middleware
- Configured RESTful API routes:
  - `GET /api/v1/books`: Returns catalog books with status `200 OK`.
  - `GET /api/v1/borrowings`: Returns stored borrowing records with status `200 OK`.
  - `POST /api/v1/borrowings`: Accepts borrowing requisition payload and saves record returning status `201 Created`.
- Global `requestLogger` middleware logs `[METHOD] [PATH] [TIMESTAMP]` for every incoming request.
- Global error-handling middleware placed last catches unhandled errors and returns structured JSON (`{ success: false, error: ... }`) without exposing raw stack traces.

### Task 4 — React API Consumption
- `BooksPage.jsx` fetches catalog data using `useEffect()` and native `fetch('http://localhost:5000/api/v1/books')`.
- Manages `data`, `loading`, and `error` state hooks with dedicated UI components for loading indicators, connection retry alerts, and rendered `BookCard` grids.

### Task 5 — MongoDB & Mongoose Integration
- Defined three Mongoose models in `backend/models/`:
  - `Book.js`: `title` (req String), `author` (req String), `category` (req String), `isbn` (unique String), `available` (Boolean, default true).
  - `Member.js`: `name` (req String), `email` (req + unique String), `phone` (String), `department` (req String).
  - `Borrowing.js`: `memberName` (String), `bookTitle` (String), `memberId` (ref Member), `bookId` (ref Book), `borrowDate` (req Date), `returnDate` (req Date), `status` (enum: `['borrowed', 'returned', 'overdue']`, default `'borrowed'`).
- Connected via `MONGO_URI` from `.env`. Endpoints query directly from MongoDB (`Borrowing.find({})`), returning structured JSON `400 Bad Request` responses on Mongoose validation failures.

---

## 🌟 Interactive UX Features

1. **Quick Book Preview Modal**: Clicking any `BookCard` opens a classical modal showing full book details, category, availability, and description.
2. **Available Only Filter**: Toggle button on `BooksPage` filters available volumes instantly in memory using `useState`.
3. **Unified Borrowing Records List**: Displays all stored borrowing records from MongoDB in a clean list with a **REFRESH RECORDS** button and status badges (`BORROWED`, `RETURNED`, `OVERDUE`).

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
│   ├── package.json             # Backend dependencies & scripts
│   └── server.js                # Express app, REST APIs, MongoDB connection & error handler
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx   # Task 1 & 2: Header navigation bar with React Router Links
│   │   │   └── BookCard.jsx     # Task 1: Reusable BookCard with visual availability badges
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Task 1: Classical Hero banner
│   │   │   ├── BooksPage.jsx    # Task 4 & UX: API consumption, states & Quick Preview Modal
│   │   │   └── BorrowPage.jsx   # Task 2 & UX: Controlled form, Live Summary & Borrowing Records
│   │   ├── App.jsx              # React Router v6 route configuration
│   │   ├── main.jsx             # React DOM root entrypoint
│   │   └── index.css            # Classical Academia theme design system
│   ├── index.html               # Main HTML template with Google Fonts
│   ├── package.json             # Frontend dependencies & Vite scripts
│   └── vite.config.js           # Vite dev server configuration
├── .env.example                 # Template for environment variables (never commit .env)
├── .gitignore                   # Excludes node_modules, .env, and local report files
└── README.md                    # Detailed documentation and setup guide
```

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

### 2. Run Backend
```bash
cd backend
npm install
node server.js
```
*Backend will run on `http://localhost:5000`*

### 3. Run Frontend
In a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run on `http://localhost:5173`*

---

## 🔌 REST API Endpoints Summary

- `GET /api/v1/books` — Fetch all books from MongoDB (200 OK)
- `GET /api/v1/borrowings` — Fetch all borrowing records from MongoDB (200 OK)
- `POST /api/v1/borrowings` — Create a borrowing record in MongoDB (201 Created)
- `POST /api/v1/db/members` — Create a member document with unique email validation (201 Created / 400 Error)
- `POST /api/v1/db/borrowings` — Create borrowing with enum validation (`borrowed`, `returned`, `overdue`) (201 Created / 400 Error)
