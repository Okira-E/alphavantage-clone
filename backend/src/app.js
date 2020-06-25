"use strict";
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
require('./db/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is not listening on port ${PORT}`);
});
