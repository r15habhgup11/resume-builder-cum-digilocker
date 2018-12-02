/**
 * Created by rishabh on 18/11/18.
 */
var nodemailer=require('nodemailer');
var express=require('express');
var mysql=require('mysql');
var upload = require('express-fileupload');
const http = require('http');
var session = require('express-session');
var app=express();
var bodyParser=require('body-parser');

app.use(session({secret: 'SE-Project'}));


var indexcontroller=require('./controllers/indexcontroller');

app.use(bodyParser.urlencoded({extended:true}));

var connection=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'qwerty123',
    database:'dbname'
    }
);
 connection.connect(function (error) {
     if(error)
     {
          console.log('errorrrr');

     }
     else
     {
         console.log('connected_db');
     }

 });

 app.set('view engine','ejs');
 app.use(express.static('./public'));
app.use(upload());
 indexcontroller(app,connection);

 app.listen(3000,function () {
    console.log('connected') ;
 });
