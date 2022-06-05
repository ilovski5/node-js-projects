const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const { SITE_KEY, SECRET_KEY } = process.env;
const comments = ['comment 1', 'comment 2'];

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Static directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', { SITE_KEY });
});

app.get('/comments', (req, res) => {
  res.json(comments.reverse());
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
