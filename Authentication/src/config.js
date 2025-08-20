const mongoose = require('mongoose'); 
main().
then(() => {
     console.log("connection successful")
})

.catch(err => console.log(err)); 


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Authentication");
    
}


const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection = mongoose.model("Authentication",loginSchema);

module.exports = collection;






