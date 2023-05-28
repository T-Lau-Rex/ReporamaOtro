import { Router } from "express";
import pool from "../config/database.js";

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {title: '¿Funciono?'})
})

// ================================= COMICS ================================== //

// Mostrar todos los Comics GET COMICS:

router.get('/comics', async (req, res) => {
    const comicsCompletos = await pool.query
    (`SELECT comic.id, comic.titulo, comic.volumen, categorias.nombre_categoria, editoriales.nombre_editorial, comic.estado
    FROM comic
    LEFT JOIN categorias ON comic.id_categoria = categorias.id
    LEFT JOIN editoriales ON comic.id_editorial = editoriales.id`)
    
    // const comics = await pool.query('SELECT * FROM comic')
    // console.log('Comics:', comics)
    
    

    res.render('comics/ComicsList', {comicsCompletos})
    // res.render('comics/ComicsList', {comicsCompletos: comicsCompletos, comics:comics})
})

// Mostrar un sólo Comic GET UN COMIC:

router.get('/comics/mostrar/:id', async (req, res) => {
    const { id } = req.params
    const comic = await pool.query
    ('SELECT * FROM comic LEFT JOIN categorias ON comic.id_categoria = categorias.id LEFT JOIN editoriales ON comic.id_editorial = editoriales.id WHERE comic.id = ?', [id])
    res.render('comics/ComicUno', {comic: comic[0]})
    
})

// Mostrar formulario añadir Comic GET UN COMIC:

router.get('/comics/add', (req, res) => {
    res.render('comics/ComicAdd')
})

// Añadir un comic POST UN COMIC: 

router.post('/comics/add', (req, res) => {
    const { id_categoria, id_editorial, titulo, volumen, estado } = req.body
    const newComic = {
        id_categoria,
        id_editorial,
        titulo,
        volumen,
        estado
    }
})

// Eliminar un Comic GET EL COMIC FUERA:

// Editar un Comic GET EL COMIC CON SU INFO:

router.get('/comics/edit/:id', async (req, res) => {
    const { id } = req.params
    const comic = await pool.query
    ('SELECT * FROM comic LEFT JOIN categorias ON comic.id_categoria = categorias.id LEFT JOIN editoriales ON comic.id_editorial = editoriales.id WHERE comic.id = ?', [id])
    res.render('comics/ComicEdit', {comic: comic[0]})

})

// Editar un Comic POST LA  INFO DEL COMIC:



// ================================= PEDIDOS ================================= //


// Mostrar todos los Pedidos GET PEDIDOS:



// Mostrar un sólo Pedido GET UN PEDIDO:



// Mostrar formulario añadir Pedido GET UN PEDIDO:



// Añadir un Pedido POST UN PEDIDO:



// Eliminar un Pedido GET EL PEDIDO FUERA:



// Editar un Pedido GET EL PEDIDO CON SU INFO:



// Editar un Pedido POST LA  INFO DEL PEDIDO:


// =============================== TRABAJADORES ============================== //


// Mostrar todos los Trabajadores GET TRABAJADORES:



// Mostrar un sólo Trabajador GET UN TRABAJADOR:



// Mostrar formulario añadir Trabajador GET UN TRABAJADOR:



// Añadir un Trabajador POST UN TRABAJADOR:



// Eliminar un Trabajador GET EL TRABAJADOR FUERA:



// Editar un Trabajador GET EL TRABAJADOR CON SU INFO:



// Editar un Trabajador POST LA  INFO DEL TRABAJADOR:


// ================================= COMICS ================================== //


export default router