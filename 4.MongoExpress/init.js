// To nialise the database an do get some samplw data
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }


  let allchats =[
    {
    from: "Pritam",
    to: "Aparna",
    msg:"Hi can we meet?",
    created_at: new Date(), //to generate random date 
},
{
    from: "Aparna",
    to: "Pritam",
    msg: "Sure! How about tomorrow?",
    created_at: new Date()
},
{
    from: "Rahul",
    to: "Neha",
    msg: "Don’t forget the meeting at 3 PM.",
    created_at: new Date()
},
{
    from: "Neha",
    to: "Rahul",
    msg: "Got it. See you then!",
    created_at: new Date()
},
{
    from: "Ankit",
    to: "Sonia",
    msg: "Happy Birthday! 🎉",
    created_at: new Date()
}
  ]

  Chat.insertMany(allchats)










