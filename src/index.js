
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

const getInitials = (person) => {

  if (!person) {
    return 'Invalid fullname';
  }

  if (/[\d_/]/.test(person)) {
    return 'Invalid fullname';
  }

  var parts = person.split(' ');
  if (parts.length < 1 || parts.length > 3) {
    return 'Invalid fullname';
  }

  var initials = [parts.pop()];
  parts.forEach(function (item, i) {
    parts[i] = item[0] + '.';
  });

  return initials.concat(parts).join(' ');
};

app.get('/task2b', (req, res) => {
  const result = getInitials(req.query.fullname.toString());
  res.send(result);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
