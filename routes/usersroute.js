// Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

//Crear usuario api/users
router.post("/", 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password','El password debe ser mínimo 6 caracteres').isLength({ min: 6})
], 
userController.CreateUser);

module.exports = router;
