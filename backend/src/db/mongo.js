const mongoose = require("mongoose");

mongoose
    .connect("mongodb://mongo:27017/auth", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection with MongoDB has been established!");
    })
    .catch(err => {
        console.log(err);
    });