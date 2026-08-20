# LIBRANOVA — Viva Cheat Sheet (Practicals 1–5)

**Student Info**: Roll No: 24DCS074 | Batch: 5CSE1-C | Exam Set: Set B  

---

## 💡 Practical 1 & 2: React Fundamentals, Routing & State

### 1. Components
- **Definition**: Reusable, self-contained UI building blocks written in JSX that return HTML-like markup.
- **In LIBRANOVA**: `BookCard.jsx` is a functional component reused for every book in the collection, and `Navigation.jsx` is the header component reused across all pages.

### 2. Props (Properties)
- **Definition**: Read-only inputs passed from a parent component to a child component to customize its rendering.
- **In LIBRANOVA**: `BookCard` receives `title`, `author`, `category`, and `available` as props from `BooksPage`.

### 3. Client-Side Routing & `<Link>`
- **Definition**: Navigation handled inside the browser without requesting a new HTML page from the server.
- **`<Link>` vs `<a>`**: Standard `<a href="...">` triggers a full browser reload, destroying React state. `<Link to="...">` intercepts the click, updates the URL history, and renders the target page component without page reload.

### 4. `useState` Hook
- **Definition**: A React Hook that allows functional components to manage local state data and trigger re-renders when data changes.
- **Syntax**: `const [value, setValue] = useState(initialValue);`

### 5. Controlled Components
- **Definition**: Form input elements whose values are bound to React state via `value={state}` and updated using `onChange={(e) => setState(e.target.value)}`.
- **In LIBRANOVA**: `BorrowPage.jsx` binds input fields (Member Name, Book Title, Borrow Date, Return Date) to `formData` state, displaying live updates in the Parchment Preview card as the user types.

---

## ⚡ Practical 3 & 4: Express REST APIs & Fetch Consumption

### 6. Express.js REST API
- **Definition**: A lightweight web server framework for Node.js that routes HTTP requests to handler functions returning JSON resources.
- **REST Principles**: Statistically mapping HTTP verbs (`GET` for reading, `POST` for creating) to resource URIs (`/api/v1/books`).

### 7. Middleware
- **Definition**: Functions in Express that have access to the request (`req`), response (`res`), and `next()` function in the request-response cycle.
- **Logger Middleware**: Global `requestLogger.js` logs `[METHOD] [PATH] [TIMESTAMP]` for every incoming request.

### 8. Global Error-Handling Middleware
- **Definition**: Middleware with 4 parameters `(err, req, res, next)` placed at the very END of the Express stack.
- **In LIBRANOVA**: Catches unhandled errors and Mongoose validation errors, returning structured JSON (`{ success: false, error: ... }`) with status `500` or `400` without exposing raw stack traces.

### 9. HTTP Status Codes
- **`200 OK`**: Standard response for successful `GET` requests.
- **`201 Created`**: Response for successful `POST` resource creation.
- **`400 Bad Request`**: Response when client sends invalid or missing request body data (validation failure).
- **`500 Internal Server Error`**: Unexpected error on the server.

### 10. `useEffect` & `fetch()` API
- **`useEffect`**: React Hook that executes side effects (such as fetching data) after the component renders. Passed `[]` as dependency array so it runs once when component mounts.
- **`fetch()`**: Native browser API for making asynchronous HTTP requests returning Promises.
- **In LIBRANOVA**: `BooksPage.jsx` fetches `GET /api/v1/books`, managing `data`, `loading`, and `error` states.

---

## 🗄️ Practical 5: MongoDB & Mongoose Integration

### 11. MongoDB
- **Definition**: A NoSQL document-oriented database that stores data in flexible JSON-like BSON (Binary JSON) documents.

### 12. Mongoose
- **Definition**: An Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation, type casting, and query building.

### 13. Schema vs Model
- **Schema**: Defines the structural blueprint of the document (field names, data types, required constraints, default values, enums).
- **Model**: A wrapper class compiled from a Schema that provides methods to create, read, update, and delete database documents (`Book.create()`, `Book.find()`).

### 14. Schema Validation & Enum
- **Validation**: Rules enforced by Mongoose before saving documents (e.g. `required: true`, `unique: true`).
- **Enum**: Restricts a String field's value to a fixed set of allowed options.
- **In Borrowing.js**: `status` field enum is restricted to `['borrowed', 'returned', 'overdue']`. Passing any other string triggers a Mongoose `ValidationError`.

### 15. ObjectId & References (`ref`)
- **`mongoose.Schema.Types.ObjectId`**: A 12-byte unique identifier automatically created by MongoDB for every document (`_id`).
- **`ref`**: Creates a relational reference between documents across collections (e.g. `Borrowing.js` references `Member` model via `memberId` and `Book` model via `bookId`).

### 16. `dotenv` & `.env.example`
- **`dotenv`**: Module that loads environment variables from a `.env` file into `process.env`.
- **`.env.example`**: A safe template committed to git showing required variable names without exposing passwords or database credentials.

### 17. CORS (Cross-Origin Resource Sharing)
- **Definition**: A security feature implemented by browsers that restricts web pages from making API requests to a domain/port different from the one that served the page.
- **In LIBRANOVA**: Backend uses `cors()` middleware so the React frontend on `http://localhost:5173` can freely call Express APIs on `http://localhost:5000`.
