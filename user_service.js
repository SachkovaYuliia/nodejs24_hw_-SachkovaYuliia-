const dataSource = [
    {id: 1, username: 'Hugh Jackman', email: 'hJackman@gmail.com'},
    {id: 2, username: 'Eva Mendez', email: 'eM@gmail.com'},
    {id: 3, username: 'Ryan Gosling', email: 'rG@gmail.com'}
]

function getAllUsers(){
    return dataSource;
}

function getUserById(userId){
    const item = dataSource.find(({id}) => id === userId);
    if (!item) {
        throw new Error('User not found');
    }

    return item;
}
function createUser(user) {
    const newId = dataSource.length > 0 ? dataSource[dataSource.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...user };
    dataSource.push(newUser);
    return newUser;
}

function deleteUserById(userId) {
    const index = dataSource.findIndex(({id}) => id === userId);
    if (index === -1) {
        throw new Error('User not found');
    }
    dataSource.splice(index, 1);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById
}