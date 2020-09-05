const { Client } = require("pg");


const client = new Client({
    host: "postgres",
    port: 5432,
    user: "postgres",
    password: "somethingsecret",
    database: "apis",
});

client.connect(err => {
    if (err) {
        console.log("FAILED TO CONNECT", err);
    } else {
        console.log("Connection with Postgresql has been established!");
    }
});

module.exports = client;