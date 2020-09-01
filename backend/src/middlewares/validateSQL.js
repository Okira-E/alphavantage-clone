const validate = (req, res, next) => {
    const tableName = req.body.name;
    const forbidden = [";", "'", "$", "|", "&"];

    forbidden.map(char => {
        if (tableName.includes(char)) {
            res.send(400).send();
        }
        next();
    });
};

module.exports = validate;