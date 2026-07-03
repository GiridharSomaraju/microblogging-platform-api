const { registerUser, userLogin } = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const express = require("express")
const router = express.Router()


router.post('/auth/register',registerUser)
router.post('/auth/login',userLogin)

module.exports = router