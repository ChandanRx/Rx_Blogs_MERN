const express = require("express")
const upload = require("../middlewares/upload")
const { registerUser, loginUser, getProfile } = require("../controllers/UserController")
const isAuth = require("../middlewares/isAuth")
const router = express.Router()


router.post('/register', upload.uploadProfiles.single('profilePic') , registerUser )
router.post("/login" , loginUser)
router.get("/profile" , isAuth , getProfile )

module.exports = router;