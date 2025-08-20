const mongoose = require('mongoose');
main()
.then(() =>{
    console.log('connected to database');
})
.catch(err => {
    console.log(err);

});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,

});
const User = mongoose.model("User", userSchema);
const user1 = new User({name : "shahana",email:"shahana@yahoo.com",age:23,});
const user2 = new User({name : "saksham",email:"saksham@yahoo.com",age:22,});

user1.save();
user2.save();




