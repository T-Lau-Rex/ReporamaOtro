CREATE DATABASE IF NOT EXISTS reporama2;
CREATE DATABASE IF NOT EXISTS reporama3;
CREATE DATABASE IF NOT EXISTS reporamaVacia;

USE reporama2;
USE reporama3;
USE reporamaVacia;

CREATE TABLE IF NOT EXISTS trabajadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS editoriales (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_editorial VARCHAR(100) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS pedido (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_trabajador INT NOT NULL,
    id_categoria INT NOT NULL,
    id_editorial INT NOT NULL,
    fecha_pedido timestamp NOT NULL DEFAULT current_timestamp,
    estado ENUM('1', '2') NOT NULL,
    notas VARCHAR(255),
    CONSTRAINT fk_trabajador FOREIGN KEY (id_trabajador) REFERENCES trabajadores(id),
    CONSTRAINT fk_categoria_pedido FOREIGN KEY (id_categoria) REFERENCES categorias(id),
    CONSTRAINT fk_editorial_pedido FOREIGN KEY (id_editorial) REFERENCES editoriales(id)
);

CREATE TABLE IF NOT EXISTS comic_pedido (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_comic INT NOT NULL,
    tituloCompleto VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    notas VARCHAR(255),
    CONSTRAINT fk_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id),
    CONSTRAINT fk_comic FOREIGN KEY (id_comic) REFERENCES comic(id)
);