var path = require('path')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
    }));
app.use(bodyParser.json());


app.post('/contact', function(req, res){
    var transporter = nodemailer.createTransport({
        host: 'smtp.mxhichina.com',
        port: 25,
        secureConnect:true,
        auth: {
            user:'auto-sender@boostfield.com',
            pass:'FiqXMoFM7yYT4CxpFmcCGw'

        }

    });

    var constructMailBody = function(req) {
        return "联系人:"+req.body.name + "\n"
            + "联系人邮箱:" + req.body.email
            + "需求类型:" + req.body.type
            + "信息描述" + req.body.message;
    }

    var mailOptions = {
        from: "contact-reporter <auto-sender@boostfield.com>", // sender address
        to: 'qky1412@boostfield.com,qingpengchen@boostfield.com,business@boostfield.com,admin@boostfield.com', // list of receivers
        subject: 'Contact Report', // Subject line
        text: constructMailBody(req) // plaintext body
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('send failed:', error);
        }
    });

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.type);
    console.log(req.body.message);
    return res.send("ok")

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


