import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.send('Soy pedidos')
})

export default router