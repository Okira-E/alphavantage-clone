const User = require("../models/users");

const auth = async(req, res, next) => {
    const apiKey = req.query.api_key;
    let isAllowed;

    try {
        const user = await User.findOne({ token: apiKey });
        if (!user) {
            res.status(400).send("Api key is not valid");
        }

        if (Date.now() < user.updatedAt.getTime() + 10000) {
            // Less than 10 seconds have passed so we track how many calls so far
            isAllowed = await user.called(true);
        } else {
            // More than 10 seconds have passed so we reset the calls count
            isAllowed = await user.called(false); // Allowed here is always TRUE
        }

        if (isAllowed) {
            await User.updateOne({ _id: user._id }, { $set: { activated: true } });
            await user.save();
        } else {
            throw new Error();
        }

        next();
    } catch (e) {
        res.status(401).send("Reached the limit for number of requests");
    }
};

module.exports = auth;