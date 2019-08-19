// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Person from './src/controllers/Person';

dotenv.config();
const app = express()

app.use(express.json())

// app.get('/', (req, res) => {
//   return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
// })

app.post('/', Person.create);
app.get('/', Person.getAll);
app.get(':id', Person.getOne);
app.put(':id', Person.update);

app.listen(3000)
console.log('app running on port ', 3000);