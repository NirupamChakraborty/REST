const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override")
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

let getRandomUser = ()=> {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
    ];
  }
//   console.log(getRandomUser());

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: "Nirupam@01" 
  });



// //  to use the database
// // let q ="SHOW TABLES";
// // imserting new data
// let q ="INSERT INTO user(id, username, email, password) values ?";
// // let users =[["5", "1a_newuser", "newa@gmail.com", "ap"], ["3", "3a_newuser", "newa3@gmail.com", "apapap"]];
// let data = [];
// for (let i = 0; i <=100; i++) {
//     data.push(getRandomUser());
// }


// HOME ROUTE
app.get("/", (req, res)=>{
    let q =`select count(*) from user`;
    try{
            // connection.query("SHOW TABLES", (err, result)=>{
            connection.query(q,(err, result)=>{
            if(err) throw err;
            // console.log(result);
            let count = result[0]["count(*)"]
            res.render("home.ejs", {count});
        });
        }catch(err){
            console.log(err);
            res.send("some error")
        }

//    res.send("welcome to the home page")
});

// SHOW USERS ROUTE
app.get("/user", (req, res)=>{
    let q= `select * from user`;
    try{
        // connection.query("SHOW TABLES", (err, result)=>{
        connection.query(q,(err, result)=>{
        if(err) throw err;
        // console.log(result);
        // res.send(result)
        res.render("showusers.ejs", {result});
        
    });
    }catch(err){
        console.log(err);
        res.send("some error")
    }

    // res.send("sucess");

})

// EDIT ROUTE
app.get("/user/:id/edit", (req,res)=>{
    let {id} = req.params;
    let q = `select * from user where id='${id}'`
    try{
        connection.query(q,(err, result)=>{
        if(err) throw err;
        let user = result[0];
        console.log(result)
        res.render("edit.ejs", {user});
        
    });
    }catch(err){
        console.log(err);
        res.send("some error")
    }
   
})

// UPDATE (DB) ROUTE
app.patch("/user/:id", (req,res)=>{
    // search user based on id
    let { id } = req.params;
    let{password: formPass, username: newUsername} = req.body;
    let q = `select * from user where id='${id}'`
    try{
        connection.query(q,(err, result)=>{
        if(err) throw err;
        let user = result[0];
        if(formPass != user.password){
            res.send("invalid Password");
        }else{
            // query to update the username
            let q1 = `update user set username='${newUsername}' where id='${id}'`
            connection.query(q1,(err,result)=>{
                if(err) throw err;
                // res.send(result);
                res.redirect("/user");
            })
        }
        
    });
    }catch(err){
        console.log(err);
        res.send("some error")
    }
})




app.listen("8080", ()=>{
    console.log("server is listening at 8080");
})

// try{
//     // connection.query("SHOW TABLES", (err, result)=>{
//     connection.query(q,[data],(err, result)=>{
//     if(err) throw err;
//     console.log(result);
//     // console.log(result.length);
//     // console.log(result[0]);
//     // console.log(result[1]);
// });
// }catch(err){
//     console.log(err)
// }
// //to end the connection

// connection.end();