const express = require('express');
const app = express();
const path = require('node:path');
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const messageRouter = require('./routes/messageRouter');
const messageDetailsRouter = require('./routes/messageDetailsRouter');

// Index
const messageController = require('./controllers/messageController');
app.get('/', messageController.getAllMessages);

app.use('/new', messageRouter);
app.use('/messages', messageDetailsRouter);

// Lancement du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Listening requests on port ${PORT}!`);
});

// Generic Error Handler
app.use((err, req, res, next) => {
	console.error(err);
	// We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
	res.status(err.statusCode || 500).send(err.message);
});
