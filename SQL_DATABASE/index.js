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
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

let q = "INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES ?";
let data = [];

for(let i = 1;i<=100;i++){
    data.push(getRandomUser());
}


try {
    connection.query(q, [data], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (error) {
    console.log("Error:", error);
}

connection.end();
