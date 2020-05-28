var nodemailer = require('nodemailer');
var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youruser@gmail.com',
    pass: 'Password'
  }
});
var app = express();
app.use(express.static('./'));
app.use(bodyParser());

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});

app.post('/sendmail',function(req,res){
  var mailOptions = {
    from: 'toshk12345@gmail.com',
    to: JSON.stringify(req.body.email),
    subject: JSON.stringify(req.body.subject),
    text: JSON.stringify(req.body.message)
  
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.end("Mail Send successfully");
});


app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});
