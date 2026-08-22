const { Router } = require('express');
const messageController = require('../controllers/messageController');

const messageDetailsRouter = Router();

messageDetailsRouter.get('/:messageId', messageController.getMessageById);

module.exports = messageDetailsRouter;
