import bcrypt from "bcrypt";

import user from "../model/user.js";
import { generateToken } from "../helpers/generateToken.js";

export const    Register = async (req, res, next) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        console.log(req.body)
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)
        const isExist = await user.findOne({ email: email });
        if (isExist) {
            return res.status(409).json({ 
                success: false,
                message: `A user with this email already exist`,
            });
        }
        if (password === confirmpassword) {
            const newUser = new user({
                username: username,
                email: email,
                password: hashedPassword,
            });
            let tokens;
            const data = await newUser.save();
            if (data) {
                tokens = generateToken({
                    id: data._id,
                    username: username,
                    email: email,
                });
            }
            res.status(200).json({
                userData: data,
                success: true,
                message: `successfully registered`,
                Tokens: tokens,
            });
        } else {
            return res.status(409).json({
                success: false,
                message: `password missmatch`,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isExist = await user.findOne({ email: email });
        console.log(isExist)
        if (isExist) {
            const isMatch = await bcrypt.compare(password, isExist.password);
            let tokens;
            if (isMatch) {
                tokens = generateToken({
                    id: isExist._id,
                    username: isExist.username,
                    email: isExist.email,
                });
                return res.status(200).json({
                    userData: isExist,
                    success: true,
                    message: `Successfully loged in`,
                    Tokens: tokens,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};
