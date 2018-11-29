const express = require('express')
const path = require('path')
const app = express
const bodyParser = ('body-parser')
const nodemailer = ('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), function () {
    const port = server.address().port;
    console.log('Magic happens on port ' + port);
});

const smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: 'fajreyy.bh@gmail.com',
        pass: '####'
    }
}));

app.post('/send-email', function (req, res) {
    const mailOptions = {
        from: '"Felipe" <fajreyy.bh@hotmail.com>', // sender address
        to: "fajreyy.bh@gmail.com", // list of receivers
        subject: 'Request ', // Subject line
        text: req.body.to // plaintext body

    };
    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.redirect("/index.html");
});

app.listen(3000, ()=> {
    console.log(`Servidor está executando na porta ${port}.`)
})