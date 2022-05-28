const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => { console.log(`Listening on port ${port}...`)});
