const yup = require('yup');

const userIdSchema = yup.number().required().integer().positive();

const userIdValidator = async (req, res, next) => {
    try {
        req.params.userId = await userIdSchema.validate(req.params.userId);
        next();
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

module.exports = {
    userIdValidator
};
