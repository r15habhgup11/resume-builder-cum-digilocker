/**
 * Created by rishabh on 18/11/18.
 */
var express=require('express');
var mysql=require('mysql');
var app=express();
var bodyParser=require('body-parser');

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
 indexcontroller(app,connection);

 app.listen(3000,function () {
    console.log('connected') ;
 });