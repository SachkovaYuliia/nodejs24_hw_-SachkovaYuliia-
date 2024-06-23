const { Router } = require('express');
const { userDataValidator } = require('../middlewares/validators');
const { userIdValidator } = require('../middlewares/validatorId');
const userDataRouter = Router();

const users = [];

userDataRouter.get('/', (req, res) => {
    res.status(200).json(users);
});

userDataRouter.get('/:userId', userIdValidator, (req, res) => {
    const { userId } = req.params;
    const user = users.find(user => user.id === parseInt(userId, 10));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

userDataRouter.post('/', userDataValidator, (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

userDataRouter.delete('/:userId', userIdValidator, (req, res) => {
    const { userId } = req.params;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send('User deleted');
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = {
    userDataRouter
};
