import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.send('Soy comics')
})

export default router