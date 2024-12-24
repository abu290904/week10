const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
let Books = require('./BooksSchema');
require('./MongoDBConnect');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// REST API Endpoints

// 1. Get all books
app.get('/allbooks', async (req, res) => {
    const books = await Books.find();
    res.json(books);
});

// 2. Get a single book by ID
app.get('/getbook/:id', (req, res) => {
    Books.findById(req.params.id, (err, book) => {
        if (err) res.status(400).send(err);
        res.json(book);
    });
});

// 3. Add a new book
app.post('/addbooks', (req, res) => {
    let newBook = new Books(req.body);
    newBook.save()
        .then(() => res.status(200).json({ message: 'Book added successfully' }))
        .catch(err => res.status(400).send('Error adding book:', err));
});

// 4. Update a book by ID
app.post('/updatebook/:id', (req, res) => {
    Books.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) res.status(400).send(err);
        res.json({ message: 'Book updated successfully' });
    });
});

// 5. Delete a book by ID
app.post('/deleteBook/:id', (req, res) => {
    Books.findByIdAndDelete(req.params.id, (err) => {
        if (err) res.status(400).send(err);
        res.status(200).send('Book deleted successfully');
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
