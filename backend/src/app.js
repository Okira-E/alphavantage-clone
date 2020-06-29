"use strict";
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
require('./db/mongoose');
require('./db/mysql');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);


app.get("/*", (req, _res, next) => {
    console.log(`GET --> http://localhost:3000${req.path}, query=${Object.keys(req.query)}`);
    next();
});

app.post("/*", (req, _res, next) => {
    console.log(`POST --> http://localhost:3000${req.path}, body=[${Object.keys(req.body)}], query=[${Object.keys(req.query)}]`);
    next();
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is not listening on port ${PORT}`);
});
