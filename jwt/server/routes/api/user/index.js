const router = require('express').Router();
const controller = require('./user.contorller');

router.get('/test', controller.test);
router.get('/users', controller.users);


module.exports = router;