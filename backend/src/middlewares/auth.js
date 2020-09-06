const User = require("../models/users");

const auth = async(req, res, next) => {
    const apiKey = req.query.api_key;

    try {
        const user = await User.findOne({ token: apiKey });
        console.log(user);

        if (!user) {
            throw new Error();
        }
        next();
    } catch (e) {
        res.status(401).send();
    }
};

module.exports = auth;