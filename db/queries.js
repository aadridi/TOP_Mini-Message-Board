const pool = require('./pool');

async function getAllMessages() {
	const { rows } = await pool.query('SELECT * FROM messages');
	return rows;
}

async function insertNewMessage(userName, userMessage) {
	await pool.query('INSERT INTO messages (username, text) VALUES ($1, $2)', [userName, userMessage]);
}

/* async function searchUsername(search) {
	const { rows } = await pool.query('SELECT * FROM usernames WHERE username LIKE $1', [`%${search}%`]);
	return rows;
} */

async function getMessageById(messageId) {
	const message = await pool.query('SELECT * FROM messages WHERE id = $1', [messageId]);
	return message;
}

async function deleteAllMessages() {
	await pool.query('DELETE FROM messages');
}

module.exports = {
	getAllMessages,
	insertNewMessage,
	getMessageById,
	deleteAllMessages,
};
