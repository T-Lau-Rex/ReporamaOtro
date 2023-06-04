import { isLogedIn, isNotLogedIn } from "../lib/auth.js";

import { Router } from "express";
import passport from "passport";
import pool from "../config/database.js";

const routerComicsPedidos = Router()

// Mostrar formulario añadir Comic a Pedido GET UN COMIC A PEDIDO: FIXME:

routerComicsPedidos.get("/comic-pedido/add/:id", isLogedIn, async (req, res) => {
    const {id} = req.params;
    
    const pedidoId = id
  
    // id_categoria e id_editorial del pedido
    const pedido = await pool.query(`SELECT id_categoria, id_editorial FROM pedido WHERE id = ?`, [pedidoId]);
    
    const id_categoria = pedido[0].id_categoria;
    const id_editorial = pedido[0].id_editorial;
    
    // Obtengo el id y el volumen del comic filtrando por id_categoria e id_editorial
    const comics = await pool.query(`SELECT DISTINCT id, volumen FROM comic WHERE id_categoria = ? AND id_editorial = ? ORDER BY comic.titulo ASC, comic.volumen ASC`, [id_categoria, id_editorial]);
    
    // Obtengo el título del comic filtrando por id_categoria e id_editorial para mostrar en el dropdown
    const comictitulo = await pool.query(`SELECT DISTINCT titulo FROM comic WHERE id_categoria = ? AND id_editorial = ? ORDER BY comic.titulo ASC, comic.volumen ASC`, [id_categoria, id_editorial])
    
    //Obtengo el contenido de comic_pedido para mostrar los comics añadidos si los hay
    const elementosPedido = await pool.query(`SELECT comic_pedido.id, comic_pedido.id_pedido, comic_pedido.id_comic, comic.titulo, comic.volumen, comic_pedido.cantidad, comic_pedido.notas
    FROM comic_pedido
    INNER JOIN comic ON comic_pedido.id_comic = comic.id
    WHERE comic_pedido.id_pedido = ?
    ORDER BY comic.titulo ASC, comic.volumen ASC`, [pedidoId])
    
    // await pool.query('INSERT')
    
    console.log('elementosPedido:', elementosPedido)
    // const tituloComic = await pool.query('SELECT titulo FROM comic_pedido')
      res.render("comicPedido/ComicPedidoAdd", {comics: comics, comictitulo: comictitulo, pedidoId:pedidoId, elementosPedido});
    });
  
    // Añadir Comic a Pedido POST UN COMIC A PEDIDO: FIXME:
    
    routerComicsPedidos.post("/comic-pedido/add/:id", isLogedIn, async (req, res) => {
      
      const { id } = req.params
      const notas = req.body.notas ? req.body.notas : null;
  
      const {titulo, volumen, cantidad} = req.body
      
      // Traigo la categoria y la editorial
      const pedidoCategoria = await pool.query('SELECT id_categoria FROM pedido WHERE id = ?', [id])
      const pedidoEditorial = await pool.query('SELECT id_editorial FROM pedido WHERE id = ?', [id])
      
      try {
        let comicId = await pool.query('SELECT id FROM comic WHERE titulo = ? AND volumen = ? AND id_categoria = ? AND id_editorial = ?', [titulo, volumen, pedidoCategoria[0].id_categoria, pedidoEditorial[0].id_editorial])
        const tituloCompleto = titulo + ' vol. ' + volumen;

        comicId = comicId[0].id
        console.log('comicId:', comicId)
        
        const newComicPedido = {
          id_pedido: parseInt(id),
          id_comic: parseInt(comicId),
          cantidad: parseInt(cantidad),
          notas: notas,
          tituloCompleto
        }
        
        console.log('newComicPedido:', newComicPedido)
        console.log('newComicPedido:', newComicPedido)
        
        let comicPedido = await pool.query(`SELECT id FROM comic_pedido WHERE id_pedido = ? AND id_comic = ?`, [parseInt(id), parseInt(comicId)])
        if (comicPedido.length === 0) {
          await pool.query(`INSERT IGNORE INTO comic_pedido SET ?`, [newComicPedido])}
          
          console.log('comicPedido:', comicPedido)
      }catch(err){
        
        //si el comic no esta en la db, manda un mensaje con la info 
        console.log('Error:', err)
        req.flash("message", "El comic todavía no está en la base de datos, insértalo primero.");
      }
        
        res.redirect(`/comic-pedido/add/${id}`)
      });
  

export default routerComicsPedidos