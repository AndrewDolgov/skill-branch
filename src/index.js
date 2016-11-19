
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

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
  person = person.replace(/\s+/g, ' ').trim();

  //console.log(new Buffer(person));
  if (!person) {
    return 'Invalid fullname';
  }

  if (/[\d_/]/.test(person)) {
    return 'Invalid fullname';
  }

  const parts = person.split(' ');
  if (parts.length < 1 || parts.length > 3) {
    return 'Invalid fullname';
  }

  let initials = [parts.pop()];
  initials = [initials[0][0].toUpperCase() + initials.toString().substr(1).toLowerCase()];
  parts.forEach(function (item, i) {
    parts[i] = item[0].toUpperCase() + '.';
  });

  return initials.concat(parts).join(' ');
};

app.get('/task2b', (req, res) => {
  const result = getInitials(req.query.fullname.toString());
  res.send(result);
});

app.get('/task3a/volumes', (req, res) => {
  const result = {};
  pc.hdd.forEach((el) => {
    result[el.volume] = (result[el.volume] || 0) + el.size;
  });
  Object.keys(result).forEach((el) => {
    result[el] = `${result[el]}B`;
  });
  res.json(result);
});
// https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
const toType = obj =>
  ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
app.get('/task3a(/*)?', (req, res) => {
  const path = req.path.split('/').slice(2);
  if (path.slice(-1)[0] === '') path.pop();
  const parts = path.reduce((prev, curr) => {
    if (toType(prev) === 'object') {
      if ({}.hasOwnProperty.call(prev, curr)) {
        return prev[curr];
      }
    } else if (toType(prev) === 'array') {
      if (!isNaN(curr)) {
        return prev[curr];
      }
    }
    return undefined;
  }, pc);
  if (parts === undefined) {
    res.status(404).send('Not Found');
  }
  res.json(parts);
});

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc;
fetch(pcUrl)
  .then(response => response.json())
  .then((pcData) => {
    pc = pcData;
    app.listen(3000, () => {
      console.log('On http://localhost:3000/');
    });
  })
  .catch(e => console.log('Что то пошло не так:', e));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.listen(3000, () => {
//   console.log('Your app listening on port 3000!');
// });
