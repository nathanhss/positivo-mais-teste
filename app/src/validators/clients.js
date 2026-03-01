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
        .notEmpty()
        .isString()
        .withMessage("Id is required or not valid"),
];

export const updateClientValidator = [
    param("id")
        .notEmpty()
        .isString()
        .withMessage("Id is required or not valid"),
];

export const deleteClientValidator = [
    param("id")
        .notEmpty()
        .isString()
        .withMessage("Id is required or not valid"),
];
