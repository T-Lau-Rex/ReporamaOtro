import { Router } from "express";
import { isLogedIn } from "../lib/auth.js";
import pool from "../config/database.js";

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/home', isLogedIn, async (req, res) => {
    const pendiente = await pool.query('SELECT estado FROM pedido WHERE estado = 1')
    console.log('pendiente:', pendiente[0])
    res.render('home', {pendiente})
})

router.get('/pachy', (req, res) => {
    res.render('partials/Important')
})

export default router