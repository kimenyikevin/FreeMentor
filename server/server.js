// server.js
import express from 'express';
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

const port = process.env.PORT || 3000;
app.listen(port)
console.log('app running on port ', port);
