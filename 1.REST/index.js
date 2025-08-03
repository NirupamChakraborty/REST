const express = require("express");
const app = express();
const port = 3000
const path = require("path")
const { v4: uuidv4 } = require('uuid');
// uuidv4();
// use uuidv4(); in place of id

const methodOverride = require("method-override");

 
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }))


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id:uuidv4(),
        username: "Sonu",
        content: "I love coding"
    },
    {
        id:uuidv4(),
        username: "Monu",
        content: "I love technology"
    },
    {
        id:uuidv4(),
        username: "Aonu",
        content: "I love computer"
    },
    
];

// 1
app.get("/posts", (req,res)=>{
    res.render("index.ejs", { posts });
})
// CREATE
// 2
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username, content}= req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    // res.send("post req working")
    // redirect to /posts pagep
    res.redirect("/posts")
});

// 3
// READ
app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    // res.send("req working")
    res.render("show.ejs", {post})
});

// UPDATE
// 4
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    console.log(id);
    let newContent= req.body.content;
    console.log(newContent);
    //  to update the content 
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    // res.send("patch is working")
    res.redirect("/posts");
});

// 5 => mix of 4 and 5
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
    })    
//DELETE
// 6
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts =posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})


app.listen(port,()=>{
    console.log("app is listening")
})