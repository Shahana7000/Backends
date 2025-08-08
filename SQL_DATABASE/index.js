const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shahana_app',
    password: 'shahanaa7000'
});

let users = [
    ["11", "shahana", "shahana12@gmail.com", "808598"],
    ["12", "saksham", "saksham120@gmail.com", "909888"],
    ["13", "sakshi", "sakshi13@gmail.com", "7000606"],
];


let q = "INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES ?";


try {
    connection.query(q, [users], (err, result) => {
        if (err) throw err;
        console.log("Inserted rows:", result.affectedRows);
    });
} catch (error) {
    console.log("Error:", error);
}

connection.end();
