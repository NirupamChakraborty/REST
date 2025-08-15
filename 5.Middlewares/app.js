const express = require("express");
const app = express();
// If we write m iddlewares in the last it will not work
// Middlewares 
// utility middlewares 
app.use((req,res, next) =>{
    // console.log(req);
    console.log(req.method)
    next();
})
app.use((req,res, next) =>{
    req.time = Date.now();
    console.log(req.method, req.hostname, req.path, req.time)
    next();
})
app.get("/", (req,res)=>{
    res.send("Hi I am root")
})
app.listen(3000,()=>{
    console.log("App is listening")
})