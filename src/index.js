// IMPORTACIONES

import './lib/passport.js'

import MySQLStore from "express-mysql-session";
import cors from "cors";
import { database } from './config/keys.js';
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import express from "express";
import { fileURLToPath } from "url";
import flash from 'connect-flash'
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { registerHelper } from "./lib/handlebars.js";
import router from "./routes/routes.js";
import routerComic from "./routes/comicsRoutes.js";
import routerPedidos from "./routes/pedidosRoutes.js";
import routerUsers from "./routes/trabajadoresRoutes.js";
import session from "express-session";

// INICIALIZACIONES

const app = express();
dotenv.config();

// SETTINGS

const port = process.env.PORT || 4836;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

registerHelper();

app.set("views", path.join(__dirname, "views"));
const views = app.get("views");

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutDir: path.join(views, "layouts"),
    partialsDir: path.join(views, "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARES

app.use(session({
  secret: 'reporamaaplicacion',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))

app.use(flash())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
app.use(passport.initialize())
app.use(passport.session())

// VARIABLES GLOBALES

app.use((req, res, next) => {
  app.locals.success = req.flash('success')
  app.locals.message = req.flash('message')
  app.locals.user = req.user
  next();
});

// RUTAS

app.use("/", router);
app.use("/comics", routerComic);
app.use("/", routerUsers);
app.use("/", routerPedidos);

// app.use("/comics", router);

// ARCHIVOS PÚBLICOS

app.use(express.static(path.join(__dirname, 'public')))

// ERROR 404

app.use((req, res) => {
  const mensajeError = '💀ERoR 404💀 Todo en mi está mal'
  res.status(404).render("404", {mensajeError});
});

// EMPEZAR SERVIDOR

app.listen(port, () => {
  console.log(`Servidor en el puerto: ${port}\nhttp://localhost:${port}/`);
});
