const { Router } = require('express');
const { create, getAll } = require('../controllers/user');

const router = new Router();

router.post('/create', create);
router.get('/getAll', getAll);

module.exports = router;