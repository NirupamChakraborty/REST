const express = require("express");
const app = express();
const port = 3000
const path = require("path")

app.use(express.urlencoded({ extended: true }))


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id:"1a",
        username: "Sonu",
        content: "I love coding"
    },
    {
        id:"2b",
        username: "Monu",
        content: "I love technology"
    },
    {
        id:"3c",
        username: "Aonu",
        content: "I love computer"
    },
    
];

// 1
app.get("/posts", (req,res)=>{
    res.render("index.ejs", { posts });
})

// 2
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username, content}= req.body;
    posts.push({username, content});
    // res.send("post req working")
    // redirect to /posts pagep
    res.redirect("/posts")
});

// 3

app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    // res.send("req working")
    res.render("show.ejs", {post})
});


app.listen(port,()=>{
    console.log("app is listening")
})