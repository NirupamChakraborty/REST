const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
// If we write m iddlewares in the last it will not work
// Middlewares 
// })/ utility middlewares 
app.use((req,res, next) =>{
    // console.log(req);
    console.log(req.method) 
    next();
})
app.use((req,res, next) =>{
    req.time = Date.now();
    console.log(req.method, req.hostname, req.path, req.time)
    next();z
})
// // we can setup middle wares for specific routes
// app.use("/random",(req,res, next) =>{
//     console.log("I am only for random")
//     next();
// })

// app.use("/api", (req,res,next)=>{
// USING MULTIPLE MIDDLEWARES
const tokenAccess = (req,res,next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }else{
        // res.send("ACCESS DENIED")
        throw new ExpressError(401, "ACCESS DENIED")
    }
}

app.get("/api", tokenAccess, (req,res)=>{
    res.send("data")
})

// error
// app.get("/err", (req,res)=>{
//    abcd=abcd;
// })

// custum express error

app.get("/admin", (req,res)=>{
    throw new ExpressError(403, "You are not the admin")
})


app.use((err,req,res,next)=>{
    // console.log("--Error--")
    let {status= 500, message} = err;
    // res.send(err)
    res.status(status).send(message)
    
})




app.get("/", (req,res)=>{
    res.send("Hi I am root")
})

app.get("/random", (req,res)=>{
    res.send("Hi I am random")
})
app.listen(3000,()=>{
    console.log("App is listening")
})