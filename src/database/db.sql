CREATE DATABASE IF NOT EXISTS reporamaaaaa;
CREATE DATABASE IF NOT EXISTS reporama2;

USE reporamaaaaa;
USE reporama2;


CREATE TABLE IF NOT EXISTS trabajadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    foto_imagen VARCHAR(255)
);

INSERT INTO trabajadores (nombre_usuario, correo, contrasena) VALUES ("Jesus", "jesuskyman@hotmail.com", "123");

DESCRIBE trabajadores;
SELECT * FROM trabajadores;
 

CREATE TABLE IF NOT EXISTS categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) NOT NULL
);

INSERT INTO categorias (nombre_categoria) VALUES ("Manga");

DESCRIBE categorias;
SELECT * FROM categorias;
 

CREATE TABLE IF NOT EXISTS editoriales (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_editorial VARCHAR(100) NOT NULL
);

INSERT INTO editoriales (nombre_editorial) VALUES ("Planeta");

DESCRIBE editoriales;
SELECT * FROM editoriales;
 

CREATE TABLE IF NOT EXISTS comic (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    volumen INT,
    id_categoria INT NOT NULL,
    id_editorial INT NOT NULL,
    estado ENUM('Disponible', 'Agotado', 'Descatalogado') NOT NULL,
    CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id),
    CONSTRAINT fk_editorial FOREIGN KEY (id_editorial) REFERENCES editoriales(id)
);

INSERT INTO comic (titulo, volumen, id_categoria, id_editorial) VALUES ("Naruto", 1, 1, 1);
ALTER TABLE comic MODIFY estado ENUM('Disponible', 'Agotado', 'Descatalogado') NOT NULL;
UPDATE comic set estado = 2 WHERE id = 2;

DESCRIBE comic;
SELECT * FROM comic;
 

CREATE TABLE IF NOT EXISTS pedido (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_trabajador INT NOT NULL,
    id_categoria INT NOT NULL,
    id_editorial INT NOT NULL,
    fecha_pedido timestamp NOT NULL DEFAULT current_timestamp,
    estado ENUM('Pendiente', 'Realizado') NOT NULL,
    notas VARCHAR(255),
    CONSTRAINT fk_trabajador FOREIGN KEY (id_trabajador) REFERENCES trabajadores(id),
    CONSTRAINT fk_categoria_pedido FOREIGN KEY (id_categoria) REFERENCES categorias(id),
    CONSTRAINT fk_editorial_pedido FOREIGN KEY (id_editorial) REFERENCES editoriales(id)
);

INSERT INTO pedido (id_trabajador) VALUES (1);

DESCRIBE pedido;
SELECT * FROM pedido;

CREATE TABLE IF NOT EXISTS comic_pedido (
    id_pedido INT NOT NULL,
    id_comic INT NOT NULL,
    PRIMARY KEY (id_pedido, id_comic),
    cantidad INT NOT NULL,
    notas VARCHAR(255),
    CONSTRAINT fk_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id),
    CONSTRAINT fk_comic FOREIGN KEY (id_comic) REFERENCES comic(id)
);

INSERT INTO comic_pedido (id_pedido, id_comic, cantidad) VALUES (1, 1, 5);

DESCRIBE comic_pedido;
SELECT * FROM comic_pedido;

-- CREATE DATABASE IF NOT EXISTS reporama;

-- USE reporama;


-- CREATE TABLE IF NOT EXISTS trabajadores (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     nombre_usuario VARCHAR(100) NOT NULL,
--     correo VARCHAR(100) NOT NULL,
--     contrasena VARCHAR(100) NOT NULL,
--     foto_imagen VARCHAR(255)
-- );

-- CREATE TABLE IF NOT EXISTS categorias (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     nombre_categoria VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS editoriales (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     nombre_editorial VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS comic (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     titulo VARCHAR(255) NOT NULL,
--     volumen INT,
--     id_categoria INT NOT NULL,
--     id_editorial INT NOT NULL,
--     estado ENUM('Disponible', 'Agotado', 'Descatalogado') NOT NULL,
--     CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id),
--     CONSTRAINT fk_editorial FOREIGN KEY (id_editorial) REFERENCES editoriales(id)
-- );

-- CREATE TABLE IF NOT EXISTS pedido (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     id_trabajador INT NOT NULL,
--     id_categoria INT NOT NULL,
--     id_editorial INT NOT NULL,
--     fecha_pedido timestamp NOT NULL DEFAULT current_timestamp,
--     estado ENUM('Pendiente', 'Realizado') NOT NULL,
--     notas VARCHAR(255),
--     CONSTRAINT fk_trabajador FOREIGN KEY (id_trabajador) REFERENCES trabajadores(id),
--     CONSTRAINT fk_categoria_pedido FOREIGN KEY (id_categoria) REFERENCES categorias(id),
--     CONSTRAINT fk_editorial_pedido FOREIGN KEY (id_editorial) REFERENCES editoriales(id)
-- );

-- CREATE TABLE IF NOT EXISTS comic_pedido (
--     id_pedido INT NOT NULL,
--     id_comic INT NOT NULL,
--     PRIMARY KEY (id_pedido, id_comic),
--     cantidad INT NOT NULL,
--     notas VARCHAR(255),
--     CONSTRAINT fk_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id),
--     CONSTRAINT fk_comic FOREIGN KEY (id_comic) REFERENCES comic(id)
-- );