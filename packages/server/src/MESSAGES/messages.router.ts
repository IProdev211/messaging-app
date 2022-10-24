import { Router } from 'express';
import { authenticate, validateInput } from '../common/middleware';
import { userIdsValidationSchema } from '../USERS/users.validation';
import {
	createMessage,
	getMessagesByConversationMembers,
} from './messages.controllers';
import { createMessageValidationSchema } from './messages.validation';

const messagesRouter = Router();

messagesRouter.post(
	'/',
	authenticate,
	validateInput(createMessageValidationSchema, 'messageInput'),
	createMessage
);

messagesRouter.post(
	'/conversation',
	authenticate,
	validateInput(userIdsValidationSchema, 'userIds'),
	getMessagesByConversationMembers
);

export default messagesRouter;
