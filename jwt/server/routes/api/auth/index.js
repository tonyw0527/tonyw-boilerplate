const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', controller.logout);

module.exports = router;