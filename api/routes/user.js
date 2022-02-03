const { Router } = require('express');
const { create } = require('../controllers/user');

const router = new Router();

router.post('/create', create);

module.exports = router;