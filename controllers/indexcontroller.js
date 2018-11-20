/**
 * Created by rishabh on 18/11/18.
 */

module.exports=function (app,connection) {

    app.get('/',function (req,res) {
       res.render('login');
    });
    app.post('/signup',function (req,res) {
       res.render('signup');
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
  var values='insert into users(email,password) values(' + "'"+email+"'" +','+"'"+password +"'"+');';
  console.log(values);
  connection.query(values);

    });

    app.get('/dd',function (req,res) {
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

            if(err)
            {
                console.log('error 1');
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
              }
              else{
                  res.send({
                      "code":404,
                      "success":"not found"
                  });
              }
          });

       });
   });
};
