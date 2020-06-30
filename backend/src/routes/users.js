"use strict";
const express = require('express');
const User = require('../models/users');

const router = new express.Router();



router.post("/api/users/register", async (req, res) => {
    const email = req.body.email;
    try {
        const user  = await new User({ email }).save();
        const token = await user.generateToken();
        res.status(201).send({ token });
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

router.post("/api/users/getToken", async (req, res) => {
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
