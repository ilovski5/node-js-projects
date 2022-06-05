const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
