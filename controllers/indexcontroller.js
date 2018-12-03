/**
 * Created by rishabh on 18/11/18.
 */
var fs=require('fs');

module.exports=function (app,connection) {
    var nodemailer=require('nodemailer');
    function on9(req) {
    //    fetch session
        if (req.session.online){
            return true;
        }
        else{
           return false;
        }
    }

    app.get('/error',function (req,res) {
        res.render('error');

    });

    app.get('/mydoc',function (req,res) {
        if(!on9(req)){
            res.render('error');
        }
        else {
            var email = req.session.email;

            var username = email.slice(0, email.length - 10);

            connection.query("SELECT * FROM upload WHERE username = ? ", [username], function (err, result, fields) {

                console.log(result);
                console.log(result.length);
                console.log(result[0].path);

                res.render('mydoc', {data: result, username: username});
            });
        }

    });

    app.get('/up',function (req,res) {
        if(!on9(req)){
            res.render('error');
        }

        else {
        res.render('upload');}
    });

    app.post('/upload',function (req,res) {




            var email = req.session.email;

            username = email.slice(0, email.length - 10);

            var newdir = __dirname + '/../public/uploads/' + username;
            console.log(newdir);

            if (!fs.existsSync(newdir)) {
                fs.mkdirSync(newdir);
            }

            console.log(newdir);

            console.log(req.files);
            if (req.files.upfile) {
                var file = req.files.upfile,
                    name = file.name,
                    type = file.mimetype;
                var uploadpath = newdir + '/' + name;
                file.mv(uploadpath, function (err) {
                    if (err) {
                        console.log("File Upload Failed", name, err);

                    }
                    else {
                        console.log("File Uploaded", name);

                    }
                });

                var values = 'insert into upload(username,path) values(' + "'" + username + "'" + ',' + "'" + name + "'" + ');';
                connection.query(values);
            }
            else {
                res.end();
            }
            ;


            var sess = req.session;
            console.log(sess);
            res.render('index', {data: sess});

    });

    app.get('/logout',function (req,res) {

        req.session.online = false;

        var sess = req.session;
        console.log(sess);
        res.render('index',{data: sess});
    });

    app.post('/temp',function (req,res) {
        res.render('signup');

    });

    app.get('/',function (req,res) {
        if(on9(req)){
           res.render('index', {data: req.session});
       }
       req.session.online=false;
       res.render('index',{data:req.session});
    });

    app.post('/submitSign',function (req,res) {
        var email=req.body.email;
        var password=req.body.password;
        console.log(email);
        console.log(password);
        connection.connect(function (err) {
            if (!!err) {
                console.log('db error');
            }
        });

        connection.query("SELECT * FROM users WHERE email = ? ",[email] ,function (err,result,fields) {
            if(result.length>0){
            if(result[0].email==email)
            {
              res.render('already');
            }}
            else {


                var values = 'insert into users(email,password) values(' + "'" + email + "'" + ',' + "'" + password + "'" + ');';
                console.log(values);
                connection.query(values);
                req.session.online = false;
                var sess = req.session;
                console.log(sess);
                res.render('index', {data: sess});
            }
        });

    });

    app.post('/dd',function (req,res) {
      res.render('form');
    });

    app.post('/mc',function (req,res) {

        var fullname=req.body.fullname;
        var addressline1=req.body.addressline1;
        var addressline2=req.body.addressline2;
        var city=req.body.city;
        var region=req.body.region;
        var postalcode=req.body.postalcode;

        var objective=req.body.objective;
        var highschool=req.body.highschool;
        var intermediate=req.body.intermediate;
        var graduation=req.body.graduation;
        var workexperience=req.body.workexperience;
        var skill1=req.body.skill1;

        var skill2=req.body.skill2;
        var skill3=req.body.skill3;
        var refrences=req.body.refrences;
        var email=req.body.email;
        var tel=req.body.tel;
        var dob=req.body.dob;
        var age=req.body.age;
        var intersts=req.body.intersts;

        console.log(email);

        connection.connect(function (err) {
            if (!!err) {
                console.log('db error');
            }
        });

        connection.query("SELECT * FROM users WHERE email = ? ",[email] ,function (err,result,fields) {

            if(result[0].email!=email)
            {
                res.render('already');
            }
           else
            {
                var password=result[0].password;

                var values='insert into users(email,password,tel,dob,age,intersts,fullname,addressline1,addressline2,city,region,postalcode,objective,highschool,intermediate,graduation,workexperience,skill1,skill2,skill3,refrences) values(' + "'"+email+"'" +','+"'"+password+"'" +','+"'"+tel+"'" +','+"'"+dob+"'" +','+"'"+age+"'" +','+"'"+intersts+"'" +','+"'"+fullname+"'" +','+"'"+addressline1+"'" +','+"'"+addressline2+"'" +','+"'" +city +"'"+ ","+"'"+region+"'" +','+"'"+postalcode+"'" +','+"'"+objective+"'" +','+"'"+highschool+"'" +','+"'"+intermediate+"'" +','+"'"+graduation+"'" +','+"'"+workexperience+"'" +','+"'"+skill1+"'" +','+"'"+skill2+"'" +','+"'"+skill3+"'" +','+"'"+refrences+"'"+ ');';
                console.log(values);
                var del="delete from users where email="+"'"+email+"'";
                console.log(del);
                connection.query(del);
                connection.query(values); 

            }
        });

        connection.query("SELECT * FROM users WHERE email = ? ",[email] ,function (err,result,fields) {
            if(err)
            {
                console.log('error 1');
            }
            else {


                res.render('generate',{data:result[0]});

            }
        });

    });

   app.post('/bc',function (req,res) {

       var email=req.body.email;
       var password=req.body.password;
       console.log(email);
       console.log(password);
       connection.connect(function (err) {
          if(!!err){
              //console.log('db error');
          }
          connection.query("SELECT * FROM users WHERE email = ? ",[email] ,function (err,result,fields) {

              if(err)
              {
                  console.log('error 1');
              }
              if(result[0].password==password)
              {
                  console.log('matched');
                  req.session.email = email;
                  req.session.online = true;

                  var sess = req.session;
                  console.log(sess);
                  res.render('index',{data: sess});
              }
              else{
                  res.render('error');
              }
          });

       });

   });


    app.post('/forgt', function(req, res, next) {

       var email=req.body.email;
       console.log(email);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
<<<<<<< HEAD
                user: 'r15habhgup11@gmail.com',
                pass: 'password'
=======
                user: 'ryouremail',
                pass: 'yourpassword'
>>>>>>> ca7ba1f3ebf86bf8599d4907a27279c50d14067e
            }
        });

        var mailOptions = {
            from: 'r15habhgup11@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'hii aseem kaise ho'
        };

        for( i=0;i<10;i++) {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

    });


    app.get('/forgot', function(req, res) {
        res.render('forget');
    });



};
