const express = require('express');
const router = express.Router();

const userController = require('../Controllers/user');


//routers
router.post("/signup", userController.SignUp_User );

router.post('/login', userController.Login_User)

router.delete('/:userId', userController.Delete_User);

module.exports = router;