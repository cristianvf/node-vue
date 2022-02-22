const { Router } = require('express');
const { check } = require('express-validator');
const { create, getAll, get, update} = require('../controllers/user');
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

router.get('/get',[
    check('id', 'The id is required').not().isEmpty(),
    validations
], get);

router.post('/update',[
    check('_id', 'The id is required').not().isEmpty(),
    check('name','The name is required').not().isEmpty(),
    check('last_name','The last_name is required').not().isEmpty(),
    check('email','The email is required').not().isEmpty(),
    check('email', 'The email is invalid').isEmail(),
    validations
], update)

module.exports = router;