const { Router } = require('express');
const messageController = require('../controllers/messageController');

const messageRouter = Router();

messageRouter.get('/', (req, res) => {
	res.render('form');
});

messageRouter.post('/', messageController.insertNewMessage);

module.exports = messageRouter;
