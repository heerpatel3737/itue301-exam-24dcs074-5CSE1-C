const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const requestLogger = require('./middleware/requestLogger');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/libranova';

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// TASK 3: Global Request Logger Middleware
app.use(requestLogger);

// ==========================================
// TASK 3: IN-MEMORY API DATA (Flow for Task 3 & 4)
// ==========================================
const inMemoryBooks = [
  {
    id: 1,
    title: 'The Iliad & The Odyssey',
    author: 'Homer',
    category: 'Classical Epic Literature',
    available: true,
    description: 'Ancient Greek epic poems detailing the Trojan War and Odysseus ten-year journey home across perilous seas.'
  },
  {
    id: 2,
    title: 'Principles of Natural Philosophy',
    author: 'Isaac Newton',
    category: 'Natural Philosophy & Physics',
    available: true,
    description: 'Foundational text setting forth classical mechanics, mathematical physics, and the universal law of gravitation.'
  },
  {
    id: 3,
    title: 'The Republic & Dialogues',
    author: 'Plato',
    category: 'Classical Philosophy',
    available: false,
    description: 'Socratic dialogue concerning justice, the order and character of the just city-state, and the philosopher-king.'
  },
  {
    id: 4,
    title: 'Elements of Geometry',
    author: 'Euclid of Alexandria',
    category: 'Mathematical Treatises',
    available: true,
    description: 'Comprehensive collection of definitions, postulates, propositions, and mathematical proofs of geometry.'
  },
  {
    id: 5,
    title: 'The Divine Comedy',
    author: 'Dante Alighieri',
    category: 'Medieval Epic Poetry',
    available: true,
    description: 'Narrative poem describing Dantes journey through Hell, Purgatory, and Paradise under the guidance of Virgil.'
  },
  {
    id: 6,
    title: 'Meditations on First Philosophy',
    author: 'René Descartes',
    category: 'Metaphysical Philosophy',
    available: false,
    description: 'Philosophical treatise investigating truth, the existence of God, and the distinction between body and soul.'
  }
];

const inMemoryBorrowings = [
  {
    id: 101,
    memberName: 'Heer Patel',
    bookTitle: 'The Republic & Dialogues',
    borrowDate: '2026-08-01',
    returnDate: '2026-08-25'
  }
];

// TASK 3 & 5 - GET /api/v1/books (MongoDB primary with in-memory fallback)
app.get('/api/v1/books', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let dbBooks = await Book.find({}).lean();
      if (dbBooks.length === 0) {
        dbBooks = await Book.insertMany(inMemoryBooks);
      }
      const formatted = dbBooks.map((b) => ({
        id: b._id.toString(),
        title: b.title,
        author: b.author,
        category: b.category,
        available: b.available,
        description: b.description || 'Classical masterwork stored in LIBRANOVA MongoDB database.'
      }));
      return res.status(200).json({
        success: true,
        count: formatted.length,
        data: formatted
      });
    }

    res.status(200).json({
      success: true,
      count: inMemoryBooks.length,
      data: inMemoryBooks
    });
  } catch (error) {
    next(error);
  }
});

// TASK 3 & 5 - GET /api/v1/borrowings (ONLY MongoDB when connected)
app.get('/api/v1/borrowings', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let dbDocs = await Borrowing.find({}).sort({ createdAt: -1 }).lean();
      
      // Auto-seed initial sample borrowing in MongoDB if collection is brand new
      if (dbDocs.length === 0) {
        const initialDoc = await Borrowing.create({
          memberName: 'Heer Patel',
          bookTitle: 'The Republic & Dialogues',
          borrowDate: new Date('2026-08-01'),
          returnDate: new Date('2026-08-25'),
          status: 'borrowed'
        });
        dbDocs = [initialDoc.toObject()];
      }

      const formatted = dbDocs.map((doc) => ({
        id: doc._id.toString(),
        memberName: doc.memberName || 'Scholar Member',
        bookTitle: doc.bookTitle || 'Archival Masterwork',
        borrowDate: doc.borrowDate ? new Date(doc.borrowDate).toISOString().split('T')[0] : 'N/A',
        returnDate: doc.returnDate ? new Date(doc.returnDate).toISOString().split('T')[0] : 'N/A',
        status: doc.status || 'borrowed'
      }));

      return res.status(200).json({
        success: true,
        count: formatted.length,
        data: formatted
      });
    }

    // In-memory fallback if MongoDB is offline
    const formattedInMemory = inMemoryBorrowings.map((b) => ({
      ...b,
      status: b.status || 'borrowed'
    }));

    res.status(200).json({
      success: true,
      count: formattedInMemory.length,
      data: formattedInMemory
    });
  } catch (error) {
    next(error);
  }
});

// TASK 3 & 5 - POST /api/v1/borrowings (Saves directly to MongoDB)
app.post('/api/v1/borrowings', async (req, res, next) => {
  const { memberName, bookTitle, borrowDate, returnDate } = req.body;
  if (!memberName || !bookTitle || !borrowDate || !returnDate) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: memberName, bookTitle, borrowDate, and returnDate are required.'
    });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Borrowing.create({
        memberName,
        bookTitle,
        borrowDate: new Date(borrowDate),
        returnDate: new Date(returnDate),
        status: 'borrowed'
      });
      console.log(`[MongoDB] Created borrowing document in Compass for "${bookTitle}" by "${memberName}"`);
      
      return res.status(201).json({
        success: true,
        message: 'Borrowing record saved to MongoDB successfully!',
        data: {
          id: created._id.toString(),
          memberName: created.memberName,
          bookTitle: created.bookTitle,
          borrowDate: borrowDate,
          returnDate: returnDate,
          status: created.status
        }
      });
    }

    // In-memory fallback
    const newBorrowing = {
      id: Date.now(),
      memberName,
      bookTitle,
      borrowDate,
      returnDate,
      status: 'borrowed'
    };
    inMemoryBorrowings.push(newBorrowing);

    res.status(201).json({
      success: true,
      message: 'Borrowing record created in memory fallback',
      data: newBorrowing
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// TASK 5: MONGODB & MONGOOSE API ENDPOINTS
// ==========================================

// Task 5 - MongoDB READ: GET /api/v1/db/books
app.get('/api/v1/db/books', async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// Task 5 - MongoDB CREATE: POST /api/v1/db/books
app.post('/api/v1/db/books', async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book saved to MongoDB successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// Task 5 - MongoDB CREATE: POST /api/v1/db/members
app.post('/api/v1/db/members', async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Member saved to MongoDB successfully',
      data: member
    });
  } catch (error) {
    next(error);
  }
});

// Task 5 - MongoDB CREATE & VALIDATION: POST /api/v1/db/borrowings
app.post('/api/v1/db/borrowings', async (req, res, next) => {
  try {
    const borrowing = await Borrowing.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Borrowing record created in MongoDB',
      data: borrowing
    });
  } catch (error) {
    next(error);
  }
});

// Seed endpoint for MongoDB (Convenience for testing)
app.post('/api/v1/db/seed', async (req, res, next) => {
  try {
    await Book.deleteMany({});
    const seeded = await Book.insertMany(inMemoryBooks);
    res.status(201).json({
      success: true,
      message: 'Database seeded with classical collection',
      data: seeded
    });
  } catch (error) {
    next(error);
  }
});

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'LIBRANOVA Library Book Management System - Express Backend active',
    rollNo: '24DCS074',
    batch: '5CSE1-C'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found on LIBRANOVA server.`
  });
});

// ==========================================
// TASK 3: GLOBAL ERROR-HANDLING MIDDLEWARE (LAST)
// ==========================================
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught error:', err.message);

  // Mongoose Validation Error handling
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: 'Mongoose Validation Failure',
      details: messages
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    return res.status(400).json({
      success: false,
      error: `Duplicate field value entered for [${field}]. Must be unique.`
    });
  }

  // General Server Error (500) without exposing stack trace
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Connect MongoDB and Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`[MongoDB] Connected successfully to ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`[LIBRANOVA Express Server] Listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn(`[MongoDB Warning] Direct connection to ${MONGO_URI} failed or pending: ${err.message}`);
    console.log(`[LIBRANOVA Server] Starting server with in-memory API fallback...`);
    app.listen(PORT, () => {
      console.log(`[LIBRANOVA Express Server] Listening on http://localhost:${PORT}`);
    });
  });
