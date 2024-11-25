import express from "express"

const authRoutes = express.Router()

import { login, Register } from "../controller/authcontroller.js"
import { checkLogin, checkRegister } from "../middleware/validator.js"

authRoutes.post('/register', checkRegister, Register)
authRoutes.post('/login', checkLogin, login)

export default authRoutes