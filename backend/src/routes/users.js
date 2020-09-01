"use strict";
const express = require("express");
const User = require("../models/users");
const client = require("../db/postgres");
const validateSQL = require("../middlewares/validateSQL");

const router = new express.Router();

// TESTING //////////////////////////////////////////////////////////////

router.post("/api/db/create", validateSQL, async(req, res) => {
    const tableName = req.body.name;
    const sql = `CREATE TABLE data(id varchar(50) UNIQUE, name varchar(50), lastname varchar(50));`;

    try {
        const result = await client.query(sql);
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/api/db/drop", validateSQL, async(req, res) => {
    const tableName = req.body.name;
    const sql = `DROP TABLE ${tableName}`;

    try {
        const result = await client.query(sql);
        res.status(200).send(result);
    } catch (e) {
        res.status(404).send();
    }
});

router.post("/api/db/query", validateSQL, async(req, res, next) => {
    const tableName = req.body.name;
    const sql = `SELECT * FROM ${tableName};`;

    try {
        const result = await client.query(sql);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }

    next();
});

// TESTING //////////////////////////////////////////////////////////////

router.post("/api/users/register", async(req, res) => {
    const email = req.body.email;
    try {
        const user = await new User({ email }).save();
        const token = await user.generateToken();
        res.status(201).send({ token });
    } catch (e) {
        console.log(e);
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