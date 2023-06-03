import { Router } from "express";
import { isLogedIn } from "../lib/auth.js";
import pool from "../config/database.js";

const routerComic = Router()

// ================================= COMICS ================================== //

// Mostrar todos los Comics GET COMICS:

routerComic.get('/', isLogedIn, async (req, res) => {
    const comicsCompletos = await pool.query
    (`SELECT comic.id, comic.titulo, comic.volumen, categorias.nombre_categoria, editoriales.nombre_editorial, comic.estado
    FROM comic
    LEFT JOIN categorias ON comic.id_categoria = categorias.id
    LEFT JOIN editoriales ON comic.id_editorial = editoriales.id`)
    console.log('comicsCompletos')
    res.render('comics/ComicsList', {comicsCompletos})
})

// Mostrar un sólo Comic GET UN COMIC:

routerComic.get('/mostrar/:id', isLogedIn, async (req, res) => {
    const { id } = req.params
    const comic = await pool.query
    ('SELECT * FROM comic LEFT JOIN categorias ON comic.id_categoria = categorias.id LEFT JOIN editoriales ON comic.id_editorial = editoriales.id WHERE comic.id = ?', [id])
    
    res.render('comics/ComicUno', {comic: comic[0]})
})

// Mostrar formulario añadir Comic GET UN COMIC:

routerComic.get('/add', isLogedIn, async (req, res) => {
    const categorias = await pool.query(`SELECT * FROM categorias`)
    const editoriales = await pool.query(`SELECT * FROM editoriales`)
    const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)

    res.render('comics/ComicAdd', {categorias:categorias, editoriales:editoriales, comics:comics})
})

// Añadir un comic POST UN COMIC: 

routerComic.post('/add', isLogedIn, async (req, res) => {
    const { nombre_categoria, nombre_editorial, titulo, volumen, estado } = req.body
    // const { id } = req.params

    // Traigo los id o inserto categorias
    let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
    if (id_categoria.length === 0) {
        await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria])
        id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
    }
    
    // Traigo los id o inserto editoriales
    let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
    if (id_editorial.length === 0) {
        await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial])
        id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
    }
    

    const newComic = {
        id_categoria: id_categoria[0].id,
        id_editorial: id_editorial[0].id,
        titulo,
        volumen,
        estado
    }

    await pool.query(`INSERT INTO comic SET ?`, [newComic])
    
    req.flash('success', 'Comic guardado correctamente')
    res.redirect('/comics')
})

// Eliminar un Comic GET EL COMIC FUERA:

routerComic.get('/delete/:id', isLogedIn, async (req, res) => {
    const { id } = req.params
    await pool.query(`DELETE FROM comic WHERE id = ?`, [id])
    req.flash('success', 'Comic eliminado correctamente')
    res.redirect('/comics')
})

// Editar un Comic GET EL COMIC CON SU INFO:

routerComic.get('/edit/:id', isLogedIn, async (req, res) => {
    const { id } = req.params
    
    const categorias = await pool.query(`SELECT * FROM categorias`)
    const editoriales = await pool.query(`SELECT * FROM editoriales`)
    const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)
    let comic = await pool.query('SELECT * FROM comic WHERE comic.id = ?', [id])
    comic = {
        ...comic[0],
        nombre_categoria: categorias.find(el => el.id === comic[0].id_categoria).nombre_categoria,
        nombre_editorial: editoriales.find(el => el.id ===comic[0].id_editorial).nombre_editorial,
    }
    res.render('comics/ComicEdit', {comic, categorias:categorias, editoriales:editoriales, comics:comics})
    
})

// Editar un Comic POST LA INFO DEL COMIC:

routerComic.post('/edit/:id', isLogedIn, async (req, res) => {
    const { nombre_categoria, nombre_editorial, titulo, volumen, estado } = req.body
    const { id } = req.params
    
    // Traigo los id o inserto categorias
    let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
    if (id_categoria.length === 0) {
        await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria])
        id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
    }
    // Traigo los id o inserto editoriales
    let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
    if (id_editorial.length === 0) {
        await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial])
        id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
    }
    
    const comicEdited = {
        id_categoria: id_categoria[0].id,
        id_editorial: id_editorial[0].id,
        titulo,
        volumen,
        estado
    }

    await pool.query(`UPDATE comic SET ? WHERE id = ?`, [comicEdited, id])
    
    req.flash('success', 'Comic editado correctamente')
    res.redirect('/comics')
})


export default routerComic