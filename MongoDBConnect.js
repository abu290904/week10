let mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/BooksData';

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', (err) => console.log('Error occurred:', err));
db.once('connected', () => {
    console.log("Connected to MongoDB at", MONGO_URI);
    console.log("Mongoose Version:", mongoose.version);
});

module.exports = db;
