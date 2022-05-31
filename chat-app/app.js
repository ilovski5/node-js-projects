// Server

const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/chat', (req, res) => {
    const { username } = req.body;
    uName = username;
    res.render('chat', { username });
});

let uName;
const users = [];
const messages = [];

/**
 * Methods
 */

const time = () => new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

const handleConnect = (socket) => {
    const user = {
        username: uName,
        id: socket.id,
        profile: `https://robohash.org/${uName}.png?set=set1`,
    };

    users.push(user);
    // get old messages when user connects later
    messages.map((message) => { socket.emit('userMessage', message); });
};

const handleDisconnect = (socket) => {
    const user = users.find((current) => current.id === socket.id);
    if (!user) return;

    users.splice(users.findIndex((current) => current.id === user.id), 1);
};

const handleMessage = (socket, message) => {
    const user = users.find((current) => current.id === socket.id);
    if (!user) return;

    const msg = {
        text: message,
        time: time(),
        sender: user,
    };

    messages.push(msg);
    io.emit('userMessage', msg);
};

/**
 * Socket events
 */

io.on('connection', (socket) => {
    socket.on('joinRoom', () => handleConnect(socket));
    socket.on('disconnect', () => handleDisconnect(socket));
    socket.on('userMessage', (message) => handleMessage(socket, message));
});

server.listen(port, () => { console.log(`Listening on port ${port}...`) });
