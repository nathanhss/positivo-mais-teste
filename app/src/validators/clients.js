import { body, param } from "express-validator";

export const createClientValidator = [
    body("name").notEmpty().isString().withMessage("Name is required"),
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email is required or not valid"),
    body("document")
        .notEmpty()
        .isString()
        .withMessage("Document is required or not valid"),
    body("username")
        .notEmpty()
        .isString()
        .withMessage("Username is required or not valid"),
    body("password")
        .notEmpty()
        .isString()
        .withMessage("Password is required or not valid"),
];

export const getClientValidator = [
    param("id")
        .isMongoId()
        .notEmpty()
        .isString()
        .withMessage("Id is required or not valid"),
];

export const updateClientValidator = [
    body("name").notEmpty().isString().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required or not valid"),
    body("document")
        .isString()
        .withMessage("Document is required or not valid"),
    body("username")
        .isString()
        .withMessage("Username is required or not valid"),
    param("id")
        .isMongoId()
        .notEmpty()
        .isString()
        .withMessage("Id is required or not valid"),
];

export const deleteClientValidator = [
    param("id")
        .isMongoId()
        .notEmpty()
        .isString()
        .withMessage("Id is required or not valid"),
];
