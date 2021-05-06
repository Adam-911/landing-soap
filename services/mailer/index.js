require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

///////////////// SMTP-connection /////////////////
const transporter = nodemailer.createTransport({
    // service: 'gmail',
    type: "Email",
    host : "fullpowersoap.kz",              // smtp server hostname
    port : "25",   
    secure: false,              // smtp server port
    // ssl: true,						// for SSL support - REQUIRES NODE v0.3.x OR HIGHER
    // domain : "fullpowersoap.kz",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    // internalOnly: false,
    // productionOnly: false,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})

///////////////// GMAIL /////////////////
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_TEST,
//         pass: process.env.PASSWORD_TEST
//     }
// })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use(bodyParser());
// middleware для использования CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ДО ЛУЧШИХ ВРЕМЕН!
// app.post('/sendmail', (req, res) => {
    
//     const body = req.body;
//     console.log("BODY: " + JSON.stringify(req.body));

//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: 'pak_stanislav@mail.ru',
//         subject: 'Письмо отправленное через NodeJS',
//         text: body.text
//     }

//     transporter.sendMail(mailOptions, (e) => {
//         console.log(e);
//         res.sendStatus(400);
//     });
//     res.sendStatus(200);
// })

app.get('/sendmail/:name/:contact', (req, res) => {
    const {params} = req;
    console.log(params);
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'pak_stanislav@mail.ru',
        subject: 'Новая заявка',
        text:`Имя: ${params.name}, Контакты: ${params.contact}`
    }

    transporter.sendMail(mailOptions, (e) => {
        console.log(e);
        res.sendStatus(400);
    });
    res.sendStatus(200);
    console.log("Done!");

})


app.listen(9002, () => {console.log('Listening on port: 9002')})