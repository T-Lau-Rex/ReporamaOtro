import { isLogedIn, isNotLogedIn } from "../lib/auth.js";

import { Router } from "express";
import passport from "passport";

const routerUsers = Router()

// ================================== PERFIL ================================= //


routerUsers.get('/perfil', isLogedIn, async (req, res) => {
    res.render('profile/Perfil')
}) 

// =============================== TRABAJADORES ============================== //

// Mostrar formulario añadir Trabajador GET UN TRABAJADOR:

routerUsers.get('/signup', isNotLogedIn, (req, res) => {
    res.render('authentication/SignUp')
})

// Añadir un Trabajador POST UN TRABAJADOR:

routerUsers.post('/signup', isNotLogedIn, passport.authenticate('local.signup', {
    successRedirect: '/perfil',
    failureRedirect: '/signup',
    failureFlash: true
}))

// Mostrar formulario iniciar sesión un Trabajador GET UN TRABAJADOR:

routerUsers.get('/login', isNotLogedIn, (req, res) => {
    res.render('authentication/LogIn')
})

// Iniciar sesión un TRABAJADOR POST SESIÓN UN TRABAJADOR:

routerUsers.post('/login', isNotLogedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/perfil',
        failureRedirect: '/login',
        failureFlash: true
    }) (req, res, next) 
})

// Cerrar sesión un TRABAJADOR GET SESIÓN CERRADA DE UN TRABAJADOR:

routerUsers.get('/logout', isLogedIn, (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
})

export default routerUsers