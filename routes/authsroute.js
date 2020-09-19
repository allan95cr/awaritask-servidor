// Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require('../controllers/authController');
const auth = require("../middleware/auth");

// Autenticar usuario api/auth
router.post("/", 
[
    check('email', 'Agrega un email válido').isEmail(),
    check('password','El password debe ser mínimo 6 caracteres').isLength({ min: 6})
], authController.AuthUser);

// Obtiene el usuario autenticado
router.get('/',
auth,
authController.GetAuthUser
)

module.exports = router;
