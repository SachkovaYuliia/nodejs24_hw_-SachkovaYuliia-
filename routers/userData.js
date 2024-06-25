const { Router } = require('express');
const { userDataValidator } = require('../middlewares/validators');
const { userIdValidator } = require('../middlewares/validatorId');
const { getAllUsers, getUserById, createUser, deleteUserById } = require('../user_service');
const userDataRouter = Router();

function errorHandler(err, _req, res, _next) {
    res.status(404).send({ error: err.message});
};

userDataRouter.get('/', (req, res) => {
    const userList = getAllUsers();
    res.status(200).json(userList);
});

userDataRouter.get('/:userId', userIdValidator, (req, res) => {
    const { userId } = req.params;
    const item = getUserById(userId);
    res.status(200).json(item);
}, errorHandler);

userDataRouter.post('/', userDataValidator, (req, res) => {
    const newUser = createUser(req.body);
    res.status(201).json(newUser);
});

userDataRouter.delete('/:userId', userIdValidator, (req, res) => {
    const { userId } = req.params;
    deleteUserById(userId);
    res.status(204).send('User deleted');
}, errorHandler);

module.exports = {
    userDataRouter
};
