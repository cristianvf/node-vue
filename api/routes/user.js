const { Router } = require('express');
const { check } = require('express-validator');
const { create, getAll } = require('../controllers/user');
const { validations } = require('../middlewares/validations');

const router = new Router();

router.post('/create',[
    check('name','The name is required').not().isEmpty(),
    check('last_name','The last_name is required').not().isEmpty(),
    check('email','The email is required').not().isEmpty(),
    check('email', 'The email is invalid').isEmail(),
    validations
] ,create);

router.get('/getAll', getAll);

module.exports = router;