import express from 'express';
import entriesController from '../controllers/entriesController';
import verify from '../middlewares/authenticator';

const { verifyToken } = verify;

const {
  getAllEntries, getADiaryEntry, postEntry, modifyEntry
} = entriesController;

const entriesRouter = express.Router();

entriesRouter.get('/entries', verifyToken, getAllEntries);
entriesRouter.get('/entries/:entryId', verifyToken, getADiaryEntry);
entriesRouter.post('/entries', verifyToken, postEntry);
entriesRouter.put('/entries/:entryId', verifyToken, modifyEntry);

export default entriesRouter;
