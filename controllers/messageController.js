const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

async function getAllMessages(req, res) {
	const messages = await db.getAllMessages();
	res.render('index', { title: 'Mini-message Board', messages: messages });
}

// Insert a new message with validation protocol
const { body, validationResult, matchedData } = require('express-validator');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 255 characters.';
const bioErr = 'must not be more than 200 characters';
const emptyErr = 'can not be empty';

const validateUser = [body('userName').trim().notEmpty().withMessage(`Username ${emptyErr}`).isAlpha().withMessage(`Username ${alphaErr}`).isLength({ min: 1, max: 255 }).withMessage(`Username ${lengthErr}`), body('userMessage').trim().notEmpty().withMessage(`Your message ${emptyErr}`).isLength({ min: 1, max: 255 }).withMessage(`Your message ${lengthErr}`)];

const insertNewMessage = [
	validateUser,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).render('form', {
				errors: errors.array(),
			});
		}

		const { userName, userMessage } = matchedData(req);

		await db.insertNewMessage(userName, userMessage);

		res.redirect('/');
	},
];

async function getMessageById(req, res) {
	const { messageId } = req.params;
	const { rows } = await db.getMessageById(messageId);
	if (rows.length === 0) {
		throw new CustomNotFoundError('Message not found');
	}
	res.render('message', { message: rows[0] });
}

module.exports = { getAllMessages, insertNewMessage, getMessageById };
