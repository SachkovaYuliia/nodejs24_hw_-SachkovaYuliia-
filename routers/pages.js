const pagesRouter = require('express').Router();
const user_service = require('./servises/user_service')

pagesRouter.get('/', (_req, res)=> {
    const dataList = user_service.getAllUsers();
    res.render('index', {dataList});
});

module.exports = {
    pagesRouter
}