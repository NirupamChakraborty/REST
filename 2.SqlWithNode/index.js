const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();

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



//  to use the database
// let q ="SHOW TABLES";
// imserting new data
let q ="INSERT INTO user(id, username, email, password) values ?";
// let users =[["5", "1a_newuser", "newa@gmail.com", "ap"], ["3", "3a_newuser", "newa3@gmail.com", "apapap"]];
let data = [];
for (let i = 0; i <=100; i++) {
    data.push(getRandomUser());
}

try{
    // connection.query("SHOW TABLES", (err, result)=>{
    connection.query(q,[data],(err, result)=>{
    if(err) throw err;
    console.log(result);
    // console.log(result.length);
    // console.log(result[0]);
    // console.log(result[1]);
});
}catch(err){
    console.log(err)
}
//to end the connection

connection.end();


app.listen("8080", ()=>{
    console.log("server is listening");
})