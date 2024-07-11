const express = require('express')
const router = express.Router()
const user = require('../controller/userControl')

router.post('/cadastro',user.singUp)
router.post('/login',user.login)
router.post('/nome',user.userName)
router.post('/userCart',user.userCart)

module.exports = router;