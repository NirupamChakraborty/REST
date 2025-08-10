const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");


app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");



main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));



async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Imdex route
app.get("/chats", async (req, res)=>{
    // to get all chats from database which can be ashynchronous
    let chats = await Chat.find();
    console.log(chats)
    res.send("working")
})


app.get("/", (req,res)=>{
    res.send("working");
})

app.listen(8080,()=>{
    console.log("app is listening");
})