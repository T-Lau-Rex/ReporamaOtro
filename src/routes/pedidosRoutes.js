import { Router } from "express";
import { isLogedIn } from "../lib/auth.js";
import passport from "passport";
import pool from "../config/database.js";

const routerPedidos = Router();

// ================================= PEDIDOS ================================= //  :FIXME:

// Mostrar todos los Pedidos pendientes GET PEDIDOS:

routerPedidos.get("/pedidos-pendientes", isLogedIn, async (req, res) => {
//   const ksajf = await pool.query(
//     `SELECT pedido.id_categoria, pedido.id_editorial FROM pedido LEFT JOIN categorias ON `
//   );
  const pedidos = await pool.query("SELECT * FROM pedido WHERE estado = 1");
  //FIXME:

  res.render("pedidos/PedidosListPendientes", { pedidos });
});
// Mostrar todos los Pedidos realizados GET PEDIDOS:

routerPedidos.get("/pedidos-realizados", isLogedIn, async (req, res) => {
  const pedidos = await pool.query("SELECT * FROM pedido WHERE estado = 2");
  res.render("pedidos/PedidosListRealizados", { pedidos });
});

// Mostrar un sólo Pedido GET UN PEDIDO:

// Completar un pedido

routerPedidos.post("/pedidos-pendientes/complete/:id",
  isLogedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query(`UPDATE pedido SET estado = 2 WHERE id = ${id}`);
    res.redirect("/pedidos-pendientes");
  }
);

// Mostrar formulario añadir Pedido GET UN PEDIDO:

routerPedidos.get("/pedido/add", isLogedIn, async (req, res) => {
  const categorias = await pool.query(`SELECT * FROM categorias`);
  const editoriales = await pool.query(`SELECT * FROM editoriales`);

  res.render("pedidos/PedidoAdd", {
    categorias: categorias,
    editoriales: editoriales,
  });
});

// Añadir un Pedido POST UN PEDIDO:

routerPedidos.post("/pedido/add", isLogedIn, async (req, res) => {
  console.log(req.body);
  const { nombre_categoria, nombre_editorial } = req.body;

  // Traigo los id o inserto categorias
  let id_categoria = await pool.query(
    `SELECT id FROM categorias WHERE nombre_categoria = ?`,
    [nombre_categoria]
  );
  if (id_categoria.length === 0) {
    await pool.query(
      `INSERT IGNORE INTO categorias (nombre_categoria) VALUES (?)`,
      [nombre_categoria]
    );
    id_categoria = await pool.query(
      `SELECT id FROM categorias WHERE nombre_categoria = ?`,
      [nombre_categoria]
    );
  }

  // Traigo los id o inserto editoriales
  let id_editorial = await pool.query(
    `SELECT id FROM editoriales WHERE nombre_editorial = ?`,
    [nombre_editorial]
  );
  if (id_editorial.length === 0) {
    await pool.query(
      `INSERT IGNORE INTO editoriales (nombre_editorial) VALUES (?)`,
      [nombre_editorial]
    );
    id_editorial = await pool.query(
      `SELECT id FROM editoriales WHERE nombre_editorial = ?`,
      [nombre_editorial]
    );
  }

  const newPedido = {
    id_trabajador: req.user.id,
    id_categoria: id_categoria[0].id,
    id_editorial: id_editorial[0].id,
  };

  await pool.query(`INSERT INTO pedido SET ?`, [newPedido]);

  req.flash("success", "Categoría y editorial seleccionas");

  res.redirect("/comic-pedido/add");
});

// Mostrar formulario añadir Comic a Pedido GET UN COMIC A PEDIDO: FIXME:

routerPedidos.get("/comic-pedido/add", isLogedIn, async (req, res) => {
  const comics = await pool.query(`SELECT DISTINCT titulo FROM comic`)
  const comicPedido = await pool.query(`SELECT * FROM comic`)
  res.render('comicPedido/ComicPedidoAdd', {comics: comics, comicPedido: comicPedido})
});

// // Mostrar formulario añadir Pedido GET UN PEDIDO:

// routerPedidos.get('/pedido/realizar', isLogedIn, (req, res) => {

//     res.render('pedidos/PedidoDo')
// })

// // Eliminar un Pedido GET EL PEDIDO FUERA:

// // Editar un Pedido GET EL PEDIDO CON SU INFO:

// // Editar un Pedido POST LA  INFO DEL PEDIDO:

export default routerPedidos;
