const jwt = require('jsonwebtoken');

module.exports = function(req,resp,next){
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token){
        return resp.status(401).json({ msg: 'No hay token, autenticacion invalida'});
    }

    // Validar el token
    try {
        const encryption = jwt.verify(token,process.env.SECRET_KEY);
        // User creado cuando se firma el jwt
        req.user = encryption.user
        next();
    } catch (error) {
        return resp.status(401).json({ msg: 'Token no valido'});
    }
}