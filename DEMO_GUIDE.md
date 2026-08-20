# LIBRANOVA — 5–7 Minute Viva Demonstration Guide

**Candidate Name**: Roll No: 24DCS074 | Batch: 5CSE1-C | Exam Set: Set B  
**Project**: LIBRANOVA — Library Book Management System

---

## ⏱️ Demonstration Timeline (Total: 6 Mins)

### Minute 1: Introduction & Classical UI Design (Task 1)
1. **Open Browser** at `http://localhost:5173`.
2. **Highlight the Brand & Theme**:
   - Point out the tagline: *"Your Books. Your Knowledge. Your Library."*
   - Show the classical Academia aesthetic: Dark Mahogany background, Parchment elements, Gold/Brass metallic highlights, and Roman numeral `VOLUME I: THE LIBRARY` hero header.
3. **Show Component Architecture**:
   - Point to `Navigation.jsx` header containing student details (24DCS074 | 5CSE1-C).

---

### Minute 2: React Router Navigation & Controlled State (Task 2)
1. **Demonstrate Client-Side Routing**:
   - Click **"BOOKS"** (`/books`) and **"BORROW"** (`/borrow`) in the Navigation header.
   - Explain to the examiner that pages switch instantly using React Router `<Link>` components **without reloading the browser window**.
2. **Demonstrate Controlled Components (`BorrowPage.jsx`)**:
   - Navigate to `/borrow`.
   - Start typing a Member Name or Book Title into the form.
   - Show the examiner the **Live Borrowing Summary** card on the right side updating in real-time as you type, driven by React `useState`.

---

### Minute 3: React API Consumption & Interactive Features (Task 4 & UX)
1. **Navigate to `/books`**:
   - Explain how `BooksPage.jsx` uses `useEffect()` on component mount to execute `fetch('http://localhost:5000/api/v1/books')`.
   - Show how the component manages `data`, `loading`, and `error` states.
2. **Demonstrate BookCard Component (Task 1)**:
   - Point out how each book is rendered inside `BookCard.jsx` displaying `title`, `author`, `category`, and visual availability badges (**Available** in Emerald vs **Not Available** in Crimson).
3. **Interactive Features**:
   - **Available Only Filter**: Click the `"Show Available Only"` toggle button to filter books instantly in memory using `useState`.
   - **Quick Book Preview Modal**: Click the `"PREVIEW"` button on any book card to open the classical modal displaying full book details and summary.

---

### Minute 4: Express REST API & Global Middleware (Task 3)
1. **Show Express Terminal / Server Code (`backend/server.js`)**:
   - Point out the `requestLogger` middleware outputting: `[METHOD] [PATH] [TIMESTAMP]` in the terminal for every request.
2. **Demonstrate REST Endpoints**:
   - Show `GET /api/v1/books` returning JSON data with status `200 OK`.
   - Demonstrate `POST /api/v1/borrowings` receiving JSON body and returning `201 Created`.
3. **Show Global Error Handler**:
   - Point out that the error handling middleware is defined as the **very last middleware** in `server.js`, returning clean JSON without stack traces.

---

### Minute 5: MongoDB, Mongoose & Schema Validation (Task 5)
1. **Explain Database Models**:
   - Show Mongoose schemas in `backend/models/`:
     - `Book.js`: `title`, `author`, `category`, `isbn` (unique), `available`.
     - `Member.js`: `name`, `email` (unique), `phone`, `department`.
     - `Borrowing.js`: `memberId`, `bookId`, `borrowDate`, `returnDate`, `status` (enum: `['borrowed', 'returned', 'overdue']`).
2. **Demonstrate Mongoose Validation Failure**:
   - Send a `POST` request to `/api/v1/db/borrowings` via Postman with an invalid status enum (e.g. `"status": "stolen"`).
   - Show the server returning a structured `400 Bad Request` validation failure:
     ```json
     {
       "success": false,
       "error": "Mongoose Validation Failure",
       "details": ["stolen is not a valid status enum value"]
     }
     ```

---

### Minute 6: Viva Q&A & Wrap Up
1. Reiterate the clean separation between **Task 3 in-memory API** and **Task 5 MongoDB Mongoose API**.
2. Offer to explain any code snippet or concept in detail.
