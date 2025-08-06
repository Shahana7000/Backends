const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"Public")));

app.use(methodOverride("_method"))

let posts =[{
     id  :uuidv4(),
    username : "shahana",
    content : "i love coding "
},
{
    id : uuidv4(),
    username : "harry",
    content : "i love to do coding, hardwork is very important to achive your goal"
},
{
    id :uuidv4(),
    username : "rohan",
    content : "i got my first internship"
},


];

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");
})
app.post("/posts", (req,res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id ,username , content});
    res.redirect("/posts");
})
app.get("/posts/:id", (req,res) =>{
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", {post});


});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let Newcontant = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = Newcontant;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res) =>{
     let { id } = req.params;
     let post = posts.find((p) => p.id === id);
     res.render("edit.ejs",{post})

    


})
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});


app.listen( port, ()=>{
    console.log(`Server is running on port ${port}`);
})