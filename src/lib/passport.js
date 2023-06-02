import { Strategy as localStrategy } from "passport-local";
import passport from "passport";
import pool from "../config/database.js";
import qHelpers from "./helpers.js";

// =========================== Iniciar sesión Login =========================== //

passport.use('local.login', new localStrategy({
  usernameField: "correo",
  passwordField: "contrasena",
  passReqToCallback: true

}, async (req, correo, contrasena, done) => {

  // Correo en minúsculas
  correo = correo.toLowerCase()
  const rows = await pool.query('SELECT * FROM trabajadores WHERE correo = ?', [correo])
  
  if (rows.length > 0) {
    const user = rows[0]
    const validPassword = await qHelpers.matchPassword(contrasena, user.contrasena)

    if (validPassword){
      done(null, user, req.flash('success', '¡Qué alegría volver a verte', user.nombre_usuario +'!'))
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'))
    }
  } else {
    done(null, false, req.flash('message', 'El usuario no existe'))
  }
}))


// ======================== Registro de usuarios Signup ======================== //


passport.use("local.signup", new localStrategy({
  usernameField: "correo",
  passwordField: "contrasena",
  passReqToCallback: true,
}, async (req, correo, contrasena, done) => {
  const { nombre_usuario } = req.body;
  // Correo en minúsculas
  correo = correo.toLowerCase()
  const newUser = {
    nombre_usuario,
    correo,
    contrasena,
  };

  const userExist = await pool.query('SELECT * FROM trabajadores WHERE correo = ?', [correo])

  if(userExist > 0){
    // El usuario existe, por lo que:
    return done(null, false, req.flash('message', 'Este correo ya está registrado'))
  }
  newUser.contrasena = await qHelpers.encryptPassword(contrasena);
  const result = await pool.query("INSERT INTO trabajadores SET ?", [
    newUser,
  ]);

  newUser.id = result.insertId;
  return done(null, newUser);
}));


// ======================== Serializar y des-serializar ======================== //


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const row = await pool.query("SELECT * FROM trabajadores WHERE id = ?", [id]);
  done(null, row[0]);
});