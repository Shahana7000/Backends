const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path'); 
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shahana_app',
    password: 'shahanaa7000'
});
let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM users`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]['count(*)'];
            console.log(count);
            res.render("home.ejs", { count });
        });
    } catch (error) {
        console.log("Error in the query:", error);
    }
});

app.get("/users", (req, res) => {
    let q = `SELECT * FROM users`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            res.render("showusers.ejs",{users});
        });
    } catch (error) {
        console.log("Error in the query:", error);
    }
});

app.get("/users/:id/edit", (req,res) =>{
    let {id} = req.params;
    let q = `SELECT * FROM users WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", { user }); // pass the user to the template
        });
    } catch (error) {
        console.log("Error in the query:", error);
    }
});

app.patch("/users/:id", (req,res) =>{
    let {id} = req.params;
    let {password : formPass, username : newUsername} = req.body;
    let q = `SELECT * FROM users WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
           let user = result[0];
           if(formPass != user.password){
            res.send("wrong password");
           }else{
            let q2 = `UPDATE users SET name = '${newUsername}' WHERE id = '${id}'`;
            connection.query(q2, (err, result) => {
                if (err) throw err;
                res.redirect("/users");
           });
        }

        });
    
    } catch (error) {
        console.log("Error in the query:", error);
    }
});
app.listen(8080, () =>{
    console.log("Server is running on port 8080");
});
