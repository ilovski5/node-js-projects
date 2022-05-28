const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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

app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;
    const emailMessage = {
        from: `"${name}" <${email}>`,
        to: 'bar@example.com, baz@example.com',
        subject: subject,
        text: message,
    };

    try {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const info = await transporter.sendMail(emailMessage);

        console.log('Message sent:', info.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.log(error.message);
        res.status(400).send(`Error: ${error.message}`);
    }
});

app.listen(port, () => { console.log(`Listening on port ${port}...`)});
