import { Router } from "express";
import passport from "passport";
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

// Mostrar formulario añadir Comic GET UN COMIC:   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/comics/add', async (req, res) => {
    const categorias = await pool.query(`SELECT * FROM categorias`)
    const editoriales = await pool.query(`SELECT * FROM editoriales`)
    const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)

    res.render('comics/ComicAdd', {categorias:categorias, editoriales:editoriales, comics:comics})
})

// Añadir un comic POST UN COMIC: 

router.post('/comics/add', async (req, res) => {
    const { nombre_categoria, nombre_editorial, titulo, volumen, estado } = req.body
    const { id } = req.params
    
    if (!nombre_categoria || !nombre_editorial || !titulo || !volumen || !estado) {
        // Alguno de los campos obligatorios está vacío
        return res.status(400).send('Todos los campos son obligatorios');
    }

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

    res.redirect('/comics')
})


// Eliminar un Comic GET EL COMIC FUERA:

router.get('/comics/delete/:id', async (req, res) => { //TODO hacer un pop up preguntando si desea aleminar 
    const { id } = req.params
    await pool.query(`DELETE FROM comic WHERE id = ?`, [id])
    res.redirect('/comics')
})

// Editar un Comic GET EL COMIC CON SU INFO:

router.get('/comics/edit/:id', async (req, res) => {
    const { id } = req.params

    const categorias = await pool.query(`SELECT * FROM categorias`)
    const editoriales = await pool.query(`SELECT * FROM editoriales`)
    const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)

    const comic = await pool.query('SELECT * FROM comic LEFT JOIN categorias ON comic.id_categoria = categorias.id LEFT JOIN editoriales ON comic.id_editorial = editoriales.id WHERE comic.id = ?', [id])
    res.render('comics/ComicEdit', {comic: comic[0], categorias:categorias, editoriales:editoriales, comics:comics})

})

// Editar un Comic POST LA INFO DEL COMIC: FIXME:
router.post('/comics/edit/:id', async (req, res) => {
    const { nombre_categoria, nombre_editorial, titulo, volumen, estado } = req.body
    const { id } = req.params
    

    if (!nombre_categoria || !nombre_editorial || !titulo || !volumen || !estado) {
        // Alguno de los campos obligatorios está vacío
        return res.status(400).send('Todos los campos son obligatorios');
    }

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

    res.redirect('/comics')

})



// ================================= PEDIDOS ================================= //


// Mostrar todos los Pedidos GET PEDIDOS:



// Mostrar un sólo Pedido GET UN PEDIDO:



// Mostrar formulario añadir Pedido GET UN PEDIDO:



// Añadir un Pedido POST UN PEDIDO:



// Eliminar un Pedido GET EL PEDIDO FUERA:



// Editar un Pedido GET EL PEDIDO CON SU INFO:



// Editar un Pedido POST LA  INFO DEL PEDIDO:

// ================================== PERFIL ================================= //

router.get('/perfil', (req, res) => {
    res.render('profile/Perfil')
}) 

// =============================== TRABAJADORES ============================== //

// Mostrar formulario añadir Trabajador GET UN TRABAJADOR:

router.get('/signup', (req, res) => {
    res.render('authentication/SignUp')
})

// Añadir un Trabajador POST UN TRABAJADOR:

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/perfil',
    failureRedirect: '/signup',
    failureFlash: true
}))

// Mostrar formulario iniciar sesión un Trabajador GET UN TRABAJADOR:



// Iniciar sesión un TRABAJADOR POST SESIÓN UN TRABAJADOR:



// Cerrar sesión un TRABAJADOR GET SESIÓN CERRADA DE UN TRABAJADOR:



// Eliminar un Trabajador GET EL TRABAJADOR FUERA:



// Editar un Trabajador GET EL TRABAJADOR CON SU INFO:



// Editar un Trabajador POST LA  INFO DEL TRABAJADOR:


// ================================= COMICS ================================== //


export default router