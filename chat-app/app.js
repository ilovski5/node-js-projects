const express = require('express');
const { engine } = require('express-handlebars');

const port = process.env.PORT || 3000;
const app = express();

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => { console.log(`Listening on port ${port}...`)});
