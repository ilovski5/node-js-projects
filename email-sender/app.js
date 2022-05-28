const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;
    res.status(200).send('Email has been sent.');
});

app.listen(port, () => { console.log(`Listening on port ${port}...`)});
