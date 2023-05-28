// IMPORTACIONES

import MySQLStore from "express-mysql-session";
import cors from "cors";
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import express from "express";
import { fileURLToPath } from "url";
import morgan from "morgan";
import path from "path";
import { registerHelper } from "./lib/handlebars.js";
import router from "./routes/routes.js";

// import flash from 'connect-flash' 
// import passport from "passport";
// import session from "express-session";

// INICIALIZACIONES

const app = express();
dotenv.config();

// SETTINGS

const port = process.env.PORT || 4000;

// ========================= Handlebars "viejo" ========================= //

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

// ====================================================================== //
// ========================= Handlebars "nuevo" ========================= //

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.set('views', path.join(__dirname, 'views'))

// app.engine('.hbs', exphbs());
// app.set('view engine', '.hbs');

// const template = Handlebars.compile("Name: {{ name }}")
// console.log(template({name: "Laura"}))

// ====================================================================== //

// MIDDLEWARES

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// RUTAS

app.use("/", router);
// app.use("/comics", router);

// VARIABLES GLOBALES

app.use((req, res, next) => {
  next();
});

// ARCHIVOS PÚBLICOS

app.use(express.static(path.join(__dirname, 'public')))

// ERROR 404

app.use((req, res) => {
  res.status(404).render("404");
});

// EMPEZAR SERVIDOR

app.listen(port, () => {
  console.log(`Servidor en el puerto: ${port}\nhttp://localhost:${port}/`);
});
