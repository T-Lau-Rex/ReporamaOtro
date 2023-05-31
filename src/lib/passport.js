// import helpers from './helpers.js'

import { Strategy as localStrategy } from 'passport-local'
import passport from "passport";
import pool from "../config/database.js";

// passport.use('local.signup', new localStrategy({
//     correoField: 'correo', // FIXME: Tercero en modificar si no funciona
//     usernameField: 'nombre_usuario', 
//     passwordField: 'contraseña', // FIXME: Segundo en modificar si no funciona
//     passReqToCallback: true
// }, async (req, correo, nombre_usuario, contraseña, done) => {
//     const { foto_imagen } = req.body
//     const newUser = {
//         nombre_usuario,
//         correo,
//         contraseña,
//         foto_imagen // FIXME: Primero en eliminar si no funciona 
//     }

//     const result = await pool.query('INSERT INTO trabajadores SET ?', [newUser])

//     // newUser.contraseña = await 
// }
// ))