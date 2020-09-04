"use strict";
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
require("./db/mongo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(chalk.cyan(`App is now listening on port ${PORT}`));
});
// Added this line of code to test something