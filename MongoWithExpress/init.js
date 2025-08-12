const mongoose = require('mongoose');
const Chat = require('./models/chat')

main().
then(() => {
     console.log("connection successful")
})

.catch(err => console.log(err)); 


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
    
}

let allChats = [{
    from : "neha",
    to:"priya",
    msg:"hii , send me your exam sheet",
    created_at : new Date()
},
{
 from : "rohit",
    to:"mohit",
    msg:"hii , send me your exam sheet",
    created_at : new Date()
},
{
     from : "sneha",
    to:"supriya",
    msg:"hii , send me your exam sheet",
    created_at : new Date()
},
{
     from : "sakshi",
    to:"kashish",
    msg:"hii , send me your exam sheet",
    created_at : new Date()
},
{
     from : "neha",
    to:"priya",
    msg:"hii , send me your exam sheet",
    created_at : new Date()
},
];
Chat.insertMany(allChats);


