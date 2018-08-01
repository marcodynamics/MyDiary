import express from 'express';
import reminderscontroller from '../controllers/remindersController';
import verify from '../middlewares/authenticator';
import validator from '../middlewares/remindersValidator';

const { postReminderValidator } = validator;

const { verifyToken } = verify;

const { setReminder, deleteReminder } = reminderscontroller;

const reminderRouter = express.Router();

reminderRouter.post('/entries/reminders', postReminderValidator, verifyToken, setReminder);
reminderRouter.delete('/entries/reminders/:reminderId', verifyToken, deleteReminder);

export default reminderRouter;
