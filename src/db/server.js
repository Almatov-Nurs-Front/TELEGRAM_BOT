import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Message from './models/message.js';


const app = express();
const jsonParser = express.json();
app.use(cors());

const PORT = 3001;
const db = 'mongodb+srv://nursfrontend:1606042004@cluster0.khee9fg.mongodb.net/tg_bot?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT);
    console.log('Connect to DB, in port:', PORT);
  })
  .catch((err) => console.log(err));

app.get('/api/v1/messages', (req, res) => {
  Message.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
});

app.post('/api/v1/add-message', jsonParser, (req, res) => {
  const { role, content } = req?.body;
  const message = new Message({ role, content });
  message
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete('/api/v1/remove-messages', async (req, res) => {
  await Message.deleteMany({});
  res.send('Success');
});
