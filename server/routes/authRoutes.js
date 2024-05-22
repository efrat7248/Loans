const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
router.post("/login", authController.login)
router.post("/register", authController.register)
<<<<<<< HEAD
module.exports = router  
=======
module.exports = router  

>>>>>>> e12cb346414aa156282bfc96cd7c38786ba5a430
