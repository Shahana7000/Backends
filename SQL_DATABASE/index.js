const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shahana_app',
    password: 'shahanaa7000'
});


let getRandomUser = () => {
  return [
    faker.string.uuid(),       
    faker.internet.userName(), 
    faker.internet.email(),    
    faker.internet.password()  
  ];
};

let q = "INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES (?, ?, ?, ?)";


let user = getRandomUser();

try {
    connection.query(q, user, (err, result) => {
        if (err) throw err;
        console.log("✅ Inserted user:", user);
        console.log("Rows affected:", result.affectedRows);
    });
} catch (error) {
    console.log("Error:", error);
}

connection.end();
