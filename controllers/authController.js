const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.AuthUser = async (req, resp) => {
  try {
    // Validar el resultado de la validacion de campos del usersroute
    const validationList = validationResult(req);

    if (!validationList.isEmpty()) {
      return resp.status(400).json({ error: validationList.array() });
    }

    // Extraer el email y el password
    const { email, password } = req.body;

    // Revisar que sea un usuario registrado
    let user = await User.findOne({ email });

    // Si no existe
    if (!user) {
      return resp.status(400).json({ msg: "El usuario no existe" });
    }

    //Revisar password
    const passOk = await bcryptjs.compare(password, user.password);

    // Password incorrecto
    if (!passOk) {
      return resp.status(400).json({ msg: "Password Incorrecto" });
    }

    // Crear el jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        // Segundos
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          resp.json({ token: token });
        }
      }
    );
  } catch (error) {
    console.log(error);
    resp.status(500).send({ msg: "Hubo un error" });
  }
};

// Obtiene el usuario autenticado
exports.GetAuthUser = async (req,resp) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    resp.json({user});
  } catch (error) {
    console.log(error);
    resp.status(500).send({ msg: "Hubo un error" });
  }
}
