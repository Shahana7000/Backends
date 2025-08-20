const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "../views"));



app.get("/" ,(req, res) =>{
    res.render("login.ejs")
});


app.get("/signup" ,(req,res) =>{
    res.render("signup.ejs")
})

app.post("/signup", async(req,res) =>{
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    const exitUser = await collection.findOne({username : data.username})
    if(exitUser){
        res.send("Already exit try some different username")
    }
   else{ 

    const saltRound = 10;
    const hashedpassword = await bcrypt.hash(data.password, saltRound);

    data.password = hashedpassword;

    const userData = await collection.insertMany([data]); 
        console.log(userData);
   }
})

app.post("/login" ,async(req ,res) =>{
    try{
    const check = await collection.findOne({username : req.body.username})
    if(!check){
        res.send("user not found")
    }
    const isPasswordCheck = await bcrypt.compare(req.body.password , check.password)
    if(isPasswordCheck){
        res.render("home.ejs")
    }else{
        res.send("password is incorrect")
    }
    }catch(error){
        res.send("wrong detail")
    }

})


app.listen(8080 ,() =>{
    console.log("server is running on port 8080");
})