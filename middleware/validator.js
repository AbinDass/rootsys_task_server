import { body } from "express-validator";

export const checkRegister = [
  body("name")
    .notEmpty()
    .withMessage("name must required")
    .isString()
    .withMessage("name must be a string value"),
  body("email")
    .notEmpty()
    .withMessage("email must required")
    .isEmail()
    .withMessage("Please enter a valid mail"),
  body("password")
    .notEmpty()
    .withMessage("password must required")
    .isLength(6)
    .withMessage("password required atleast 6 charecters"),
];

export const checkLogin = [
  body("email")
    .notEmpty()
    .withMessage("email must required")
    .isEmail()
    .withMessage("Please enter a valid mail"),
  body("password")
    .notEmpty()
    .withMessage("password must required")
    .isLength(6)
    .withMessage("password required atleast 6 charecters"),
];