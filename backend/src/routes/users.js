const express = require("express");
const User = require("../models/users");
const client = require("../db/postgres");
const validateSQL = require("../middlewares/validateSQL");
const auth = require("../middlewares/auth");

const router = new express.Router();

// SQL

router.get("/api/sampleData/fakeComments", auth, (req, res) => {
    const sql = "SELECT * FROM comments";

    client
        .query(sql)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get("/api/sampleData/fakeTodos", auth, (req, res) => {
    const sql = "SELECT * FROM todos";

    client
        .query(sql)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// SQL

router.post("/api/users/register", async(req, res) => {
    const email = req.body.email;
    try {
        const user = await new User({ email }).save();
        const token = await user.generateToken();
        res.status(201).send({ token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post("/api/users/getToken", async(req, res) => {
    const email = req.body.email;
    let token = "";
    try {
        const user = await User.findOne({ email });
        if (user) {
            token = user.token;
        }
        res.status(200).send({ token });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;