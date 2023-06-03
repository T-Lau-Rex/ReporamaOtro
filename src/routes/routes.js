import { isLogedIn, isNotLogedIn } from "../lib/auth.js";

import { Router } from "express";
import passport from "passport";
import pool from "../config/database.js";

const router = Router()



router.get('/', (req, res) => {
    res.render('index')
})


router.get('/home', isLogedIn, (req, res) => {
    res.render('home')
})


// // ================================= COMICS ================================== //


// // Mostrar todos los Comics GET COMICS:

// router.get('/comics', isLogedIn, async (req, res) => {
//     const comicsCompletos = await pool.query
//     (`SELECT comic.id, comic.titulo, comic.volumen, categorias.nombre_categoria, editoriales.nombre_editorial, comic.estado
//     FROM comic
//     LEFT JOIN categorias ON comic.id_categoria = categorias.id
//     LEFT JOIN editoriales ON comic.id_editorial = editoriales.id`)
    
//     res.render('comics/ComicsList', {comicsCompletos})
// })

// // Mostrar un sólo Comic GET UN COMIC:

// router.get('/comics/mostrar/:id', isLogedIn, async (req, res) => {
//     const { id } = req.params
//     const comic = await pool.query
//     ('SELECT * FROM comic LEFT JOIN categorias ON comic.id_categoria = categorias.id LEFT JOIN editoriales ON comic.id_editorial = editoriales.id WHERE comic.id = ?', [id])
    
//     res.render('comics/ComicUno', {comic: comic[0]})
// })

// // Mostrar formulario añadir Comic GET UN COMIC:

// router.get('/comics/add', isLogedIn, async (req, res) => {
//     const categorias = await pool.query(`SELECT * FROM categorias`)
//     const editoriales = await pool.query(`SELECT * FROM editoriales`)
//     const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)

//     res.render('comics/ComicAdd', {categorias:categorias, editoriales:editoriales, comics:comics})
// })

// // Añadir un comic POST UN COMIC: 

// router.post('/comics/add', isLogedIn, async (req, res) => {
//     const { nombre_categoria, nombre_editorial, titulo, volumen, estado } = req.body
//     const { id } = req.params
    
//     // if (!nombre_categoria || !nombre_editorial || !titulo || !volumen || !estado) {
//     //     // Alguno de los campos obligatorios está vacío
//     //     return res.status(400).send('Todos los campos son obligatorios');
//     // }

//     // Traigo los id o inserto categorias
//     let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     if (id_categoria.length === 0) {
//         await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria])
//         id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     }
    
//     // Traigo los id o inserto editoriales
//     let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     if (id_editorial.length === 0) {
//         await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial])
//         id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     }
    

//     const newComic = {
//         id_categoria: id_categoria[0].id,
//         id_editorial: id_editorial[0].id,
//         titulo,
//         volumen,
//         estado
//     }

//     await pool.query(`INSERT INTO comic SET ?`, [newComic])
    
//     req.flash('success', 'Comic guardado correctamente')
//     res.redirect('/comics')
// })


// // Eliminar un Comic GET EL COMIC FUERA:

// router.get('/comics/delete/:id', isLogedIn, async (req, res) => { //TODO hacer un pop up preguntando si desea aleminar 
//     const { id } = req.params
//     await pool.query(`DELETE FROM comic WHERE id = ?`, [id])
//     req.flash('success', 'Comic eliminado correctamente')
//     res.redirect('/comics')
// })
// // Editar un Comic GET EL COMIC CON SU INFO:

// router.get('/comics/edit/:id', isLogedIn, async (req, res) => {
//     const { id } = req.params
    
//     const categorias = await pool.query(`SELECT * FROM categorias`)
//     const editoriales = await pool.query(`SELECT * FROM editoriales`)
//     const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)
//     let comic = await pool.query('SELECT * FROM comic WHERE comic.id = ?', [id])
//     comic = {
//         ...comic[0],
//         nombre_categoria: categorias.find(el => el.id === comic[0].id_categoria).nombre_categoria,
//         nombre_editorial: editoriales.find(el => el.id ===comic[0].id_editorial).nombre_editorial,
//     }
//     res.render('comics/ComicEdit', {comic, categorias:categorias, editoriales:editoriales, comics:comics})
    
// })

// // Editar un Comic POST LA INFO DEL COMIC:

// router.post('/comics/edit/:id', isLogedIn, async (req, res) => {
//     const { nombre_categoria, nombre_editorial, titulo, volumen, estado } = req.body
//     const { id } = req.params
    
//     if (!nombre_categoria || !nombre_editorial || !titulo || !volumen || !estado) {
//         // Alguno de los campos obligatorios está vacío
//         return res.status(400).send('Todos los campos son obligatorios');
//     }
    
//     // Traigo los id o inserto categorias
//     let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     if (id_categoria.length === 0) {
//         await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria])
//         id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     }
//     // Traigo los id o inserto editoriales
//     let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     if (id_editorial.length === 0) {
//         await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial])
//         id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     }
    
//     const comicEdited = {
//         id_categoria: id_categoria[0].id,
//         id_editorial: id_editorial[0].id,
//         titulo,
//         volumen,
//         estado
//     }

//     await pool.query(`UPDATE comic SET ? WHERE id = ?`, [comicEdited, id])
    
//     req.flash('success', 'Comic editado correctamente')
//     res.redirect('/comics')
    
// })






// // ================================= PEDIDOS ================================= //  :FIXME:






// // Mostrar todos los Pedidos pendientes GET PEDIDOS:

// router.get('/pedidos-pendientes', isLogedIn, async (req, res) => {
//     const pedidos = await pool.query('SELECT * FROM pedido WHERE estado = 1') 
//     res.render('pedidos/PedidosListPendientes', {pedidos})
// }) 
// // Mostrar todos los Pedidos realizados GET PEDIDOS:

// router.get('/pedidos-realizados', isLogedIn, async (req, res) => {
//     const pedidos = await pool.query('SELECT * FROM pedido WHERE estado = 2') 
//     res.render('pedidos/PedidosListRealizados', {pedidos})
// }) 

// // Mostrar un sólo Pedido GET UN PEDIDO:


// // Completar un pedido
// router.post('/pedidos-pendientes/complete/:id', isLogedIn , async (req, res) => {
//     const { id } = req.params
//     await pool.query(`UPDATE pedido SET estado = 2 WHERE id = ${id}`) 
//     res.redirect('/pedidos-pendientes')
// })


// // Mostrar formulario añadir Pedido GET UN PEDIDO:

// router.get('/pedido/add', isLogedIn, async (req, res) => {
//     const categorias = await pool.query(`SELECT * FROM categorias`)
//     const editoriales = await pool.query(`SELECT * FROM editoriales`)

//     res.render('pedidos/PedidoAdd', {categorias:categorias, editoriales:editoriales})
// }) 

// // Añadir un Pedido POST UN PEDIDO:

// router.post('/pedido/add', isLogedIn, async (req, res) => {
    
//     const { nombre_categoria, nombre_editorial } = req.body

//     // Traigo los id o inserto categorias
//     let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     if (id_categoria.length === 0) {
//         await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria])
//         id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     }
    
//     // Traigo los id o inserto editoriales
//     let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     if (id_editorial.length === 0) {
//         await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial])
//         id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     }

//     const newPedido = {
//         id_trabajador: req.user.id,
//         id_categoria: id_categoria[0].id,
//         id_editorial: id_editorial[0].id
//     }

//     await pool.query(`INSERT INTO pedido SET ?`, [newPedido])
    
//     req.flash('success', 'Categoría y editorial seleccionas')

//     res.redirect('/comic-pedido/add')

// }) 

// // Mostrar formulario añadir Comic a Pedido GET UN COMIC A PEDIDO: FIXME:

// router.get('/comic-pedido/add', isLogedIn, async (req, res) => {
//     // const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)
//     // const comicPedido = await pool.query(`SELECT * FROM comic`)

//     // res.render('comicPedido/ComicPedidoAdd', {comics: comics, comicPedido: comicPedido})
// }) 

// // Añadir un Comic a Pedido GET UN COMIC A PEDIDO:

// router.post('/pedido/add', isLogedIn, async (req, res) => {
//     console.log(req.body)
//     const { nombre_categoria, nombre_editorial } = req.body

//     // Traigo los id o inserto categorias
//     let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     if (id_categoria.length === 0) {
//         await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria])
//         id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria])
//     }
    
//     // Traigo los id o inserto editoriales
//     let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     if (id_editorial.length === 0) {
//         await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial])
//         id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial])
//     }

//     const newPedido = {
//         id_trabajador: req.user.id,
//         id_categoria: id_categoria[0].id,
//         id_editorial: id_editorial[0].id
//     }

//     await pool.query(`INSERT INTO pedido SET ?`, [newPedido])
    
//     req.flash('success', 'Categoría y editorial seleccionas')

//     res.redirect('/comic-pedido/add')

// }) 

// // Mostrar formulario añadir Pedido GET UN PEDIDO:

// router.get('/pedido/realizar', isLogedIn, (req, res) => {
    
//     res.render('pedidos/PedidoDo')
// })     


// // Eliminar un Pedido GET EL PEDIDO FUERA:



// // Editar un Pedido GET EL PEDIDO CON SU INFO:



// // Editar un Pedido POST LA  INFO DEL PEDIDO:






// // ================================== PERFIL ================================= //





// router.get('/perfil', isLogedIn, async (req, res) => {
//     // const infoTrabajador = await pool.query(`SELECT * FROM trabajadores WHERE id = ?`, [req.user.id])
//     res.render('profile/Perfil')
// }) 





// // =============================== TRABAJADORES ============================== //





// // Mostrar formulario añadir Trabajador GET UN TRABAJADOR:

// router.get('/signup', isNotLogedIn, (req, res) => {
//     res.render('authentication/SignUp')
// })

// // Añadir un Trabajador POST UN TRABAJADOR:

// router.post('/signup', isNotLogedIn, passport.authenticate('local.signup', {
//     successRedirect: '/perfil',
//     failureRedirect: '/signup',
//     failureFlash: true
// }))

// // Mostrar formulario iniciar sesión un Trabajador GET UN TRABAJADOR:

// router.get('/login', isNotLogedIn, (req, res) => {
//     res.render('authentication/LogIn')
// })

// // Iniciar sesión un TRABAJADOR POST SESIÓN UN TRABAJADOR:

// router.post('/login', isNotLogedIn, (req, res, next) => {
//     passport.authenticate('local.login', {
//         successRedirect: '/perfil',
//         failureRedirect: '/login',
//         failureFlash: true
//     }) (req, res, next) 
// })

// // Cerrar sesión un TRABAJADOR GET SESIÓN CERRADA DE UN TRABAJADOR:

// router.get('/logout', isLogedIn, (req, res) => {
//     req.logOut((err) => {
//         if (err) {
//             return next(err)
//         }
//         res.redirect('/login')
//     })
// })

// // Eliminar un Trabajador GET EL TRABAJADOR FUERA:



// // Editar un Trabajador GET EL TRABAJADOR CON SU INFO:



// // Editar un Trabajador POST LA  INFO DEL TRABAJADOR:


// IMPORTANTE
router.get('/pachy', (req, res) => {
    res.render('partials/Important')
})


export default router