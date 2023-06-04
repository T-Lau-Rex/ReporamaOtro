import { Router } from "express";
import { isLogedIn } from "../lib/auth.js";
import pool from "../config/database.js";

const routerPedidos = Router();

//* ================================= PEDIDOS PENDIENTES ================================= //  

// Mostrar todos los Pedidos pendientes GET PEDIDOS:

routerPedidos.get("/pedidos-pendientes", isLogedIn, async (req, res) => {
  const pedidos = await pool.query(`
  SELECT pedido.id, categorias.nombre_categoria, editoriales.nombre_editorial, pedido.fecha_pedido 
  FROM pedido
  LEFT JOIN categorias ON pedido.id_categoria = categorias.id
  LEFT JOIN editoriales ON pedido.id_editorial = editoriales.id
  WHERE pedido.estado = 1
  ORDER BY pedido.fecha_pedido DESC`);
  
  res.render("pedidos/PedidosListPendientes", { pedidos });
});

routerPedidos.get('/pedidos-pendientes/:id', isLogedIn, async (req, res) => {

  const { id } = req.params
  const comicsPedidos = await pool.query('SELECT * FROM comic_pedido WHERE id_pedido = ?', [id])

  console.log('id:', id)
  console.log('pedido:', comicsPedidos)
    
  res.render('pedidos/PedidoUno', {comicsPedidos, id}) //FIXME: esto está bien
})  
  
  // Completar un pedido

  routerPedidos.post("/pedidos-pendientes/complete/:id",
  isLogedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query(`UPDATE pedido SET estado = 2 WHERE id = ${id}`);
    res.redirect("/pedidos-pendientes");
  }
);

//? ================================= PEDIDOS REALIZADOS ================================= //  

// Mostrar todos los Pedidos realizados GET PEDIDOS:

routerPedidos.get("/pedidos-realizados", isLogedIn, async (req, res) => {

  const pedidos = await pool.query(`
  SELECT pedido.id, categorias.nombre_categoria, editoriales.nombre_editorial, pedido.fecha_pedido 
  FROM pedido
  LEFT JOIN categorias ON pedido.id_categoria = categorias.id
  LEFT JOIN editoriales ON pedido.id_editorial = editoriales.id
  WHERE pedido.estado = 2
  ORDER BY pedido.fecha_pedido DESC`);
  
  res.render("pedidos/PedidosListRealizados", { pedidos });
});

// Mostrar un Pedidos realizados GET PEDIDOS:

routerPedidos.get("/pedidos-realizados/:id", isLogedIn, async (req, res) => { //FIXME:

 
  const { id } = req.params
  const pedidoRealizado= await pool.query(`SELECT * FROM comic_pedido WHERE id_pedido = ${id}`)

  console.log('id:', id)
  console.log('pedidoRealizado:', pedidoRealizado)
  
  res.render("pedidos/PedidoRealizadoUno", { pedidoRealizado });
  
});

// Mostrar formulario añadir Pedido GET UN PEDIDO:

routerPedidos.get("/pedido/add", isLogedIn, async (req, res) => {
  const categorias = await pool.query(`SELECT * FROM categorias`);
  const editoriales = await pool.query(`SELECT * FROM editoriales`);

  res.render("pedidos/PedidoAdd", {categorias: categorias, editoriales: editoriales});
});

// Añadir un Pedido POST UN PEDIDO:

routerPedidos.post("/pedido/add", isLogedIn, async (req, res) => {
  console.log(req.body);
  const { nombre_categoria, nombre_editorial } = req.body;
  
  const notas = req.body.notas ? req.body.notas : null;

  // Traigo los id o inserto categorias
  let id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria]);

  if (id_categoria.length === 0) { await pool.query(`INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`, [nombre_categoria]);
    id_categoria = await pool.query(`SELECT id FROM categorias WHERE nombre_categoria = ?`, [nombre_categoria]);
  }

  // Traigo los id o inserto editoriales
  let id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial]);

  if (id_editorial.length === 0) {await pool.query(`INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`, [nombre_editorial]);
    id_editorial = await pool.query(`SELECT id FROM editoriales WHERE nombre_editorial = ?`, [nombre_editorial]);

  }

  const newPedido = {
    id_trabajador: req.user.id,
    id_categoria: id_categoria[0].id,
    id_editorial: id_editorial[0].id,
    notas: notas
  };

  const pedido = await pool.query(`INSERT INTO pedido SET ?`, [newPedido]);

//   const pedido = await pool.query(`SELECT id FROM editoriales`)

  req.flash("success", "Categoría y editorial seleccionas");

  const pedidoId = pedido.insertId
  res.redirect(`/comic-pedido/add/${pedidoId}`);
});

export default routerPedidos;