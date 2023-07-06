// index.js

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');


const htmlTemplate = `
<h1>Welcome to Shoppy</h1>
<p>Ram</p>
`;

app.use(express.json());
app.use(express.static('public'));


app.post('/send-emails', (req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'keenonlineudr@gmail.com',
            pass: 'dinlmeijbuemhzvr',
        },
    });
    const attachments = [
        {
            filename: 'image.jpg',
            path: path.join(__dirname, 'image', '123.png'),
        },
        {
            filename: 'document.pdf',
            path: path.join(__dirname, 'pdf', 'django.pdf'),
        },
    ];
    transporter.sendMail({
        from: 'KEEN <keenonlineudr@gmail.com>',
        to: email,
        subject: 'Testing',
        html: htmlTemplate,
        attachments: attachments,
    })
        .then(function (info) {
            console.log('Message sent: ' + info.messageId);
            res.send('Email sent successfully!');
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send('Error sending email.');
        });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
