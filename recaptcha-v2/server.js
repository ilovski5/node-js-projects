const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('isomorphic-fetch');

const app = express();
const port = process.env.PORT || 3000;
const { SITE_KEY, SECRET_KEY } = process.env;
const comments = [];

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', { SITE_KEY });
});

app.get('/comments', (req, res) => {
  res.json(comments.reverse());
});

app.post('/add', async (req, res) => {
  const recaptchaResponse = req.body['g-recaptcha-response'];
  const comment = req.body['comment'];

  if (!recaptchaResponse || !comment) {
    return res.status(400).end();
  }

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaResponse}`;
  const options = { method: 'POST' };

  const result = await fetch(url, options);
  const { success } = await result.json();

  if (!success) return res.status(400).end();

  comments.push(comment);
  return res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
