import express from "express"
import { changePassword, forgotPassword, getUser, loginUser, logoutUser, registerUser, verifyOTP } from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { userSchema, validateUser } from "../validators/userValidate.js"

const router = express.Router()


router.post('/register', validateUser(userSchema), registerUser)
router.post('/login', loginUser)
router.get('/get-user', isAuthenticated, getUser)
router.post('/logout', isAuthenticated, logoutUser)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post('/change-password/:email', changePassword)

export default router