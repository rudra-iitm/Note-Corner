import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import chatRouter from './chatRoute.js';
import noteRouter from './noteRoute.js';

app.use('/api/v1/chat',chatRouter);
app.use('/api/v1/noteCreate',noteRouter);

export {app};