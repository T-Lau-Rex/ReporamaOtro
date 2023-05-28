import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.send('Soy authentication')
})

export default router