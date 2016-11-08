
var express = require('express');
var cors =  require( 'cors');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a', (req, res) => {
  const sum = (+req.query.a||0) +(+req.query.b||0);
  res.send(sum.toString());
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
