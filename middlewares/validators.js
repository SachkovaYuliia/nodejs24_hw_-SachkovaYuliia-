const yup = require('yup');

const userSchema = yup.object({
    username: yup.string().required({ info: 'Username is required'}),
    email: yup.string().email({ info: 'Invalid format'}).required({ info: 'Email is required'})
});

const userDataValidator = async (req, res, next) => {
    try {
        await userSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        res.status(400).send({ error: err.errors });
    }
};

module.exports = {
    userDataValidator
};