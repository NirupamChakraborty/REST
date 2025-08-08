const mongoose = require('mongoose');
// connection
main()
.then((res)=>{
    // console.log(res)
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  // use `await mogoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

// model to create document
const User = mongoose.model("User", userSchema);

// Insert 
// Inserting one
// const user1 = new User({
//     name:"Aparna",
//     email:"aparna@gmail.com",
//     age: 99,
// })     
// user1.save();   


// const user2 = new User({
//     name:"Pranit",
//     email:"pranit@gmail.com",
//     age: 99,
// })     
// user2.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

User.insertMany([
    {name:"Tony", email:"tony@gmail.com", age:99},
    {name:"Iron man", email:"ironman@gmail.com", age:99},
    {name:"Peter", email:"peter@gmail.com", age:99},
]).then((res)=>{
    console.log(res)
})