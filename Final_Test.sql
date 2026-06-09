-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 09-06-2026 a las 08:28:46
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Final_Test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mazo`
--

CREATE TABLE `Mazo` (
  `id_mazo` int NOT NULL,
  `nombre_mazo` varchar(50) NOT NULL,
  `favorito` tinyint(1) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Mazo`
--

INSERT INTO `Mazo` (`id_mazo`, `nombre_mazo`, `favorito`, `fecha_creacion`, `id_usuario`) VALUES
(3, 'Chocobos', 0, '2026-06-01', 2),
(5, 'Chocobos Remastered', 1, '2026-06-02', 2),
(6, '67 Copias de Cid', 0, '2026-06-05', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `nivel` double NOT NULL,
  `guiles` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id`, `nombre_usuario`, `nivel`, `guiles`) VALUES
(2, 'Cuchufleto', 6.7, 42070),
(4, 'Juan Carlos', 67, 67);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Mazo`
--
ALTER TABLE `Mazo`
  ADD PRIMARY KEY (`id_mazo`),
  ADD KEY `fk_usuario` (`id_usuario`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Mazo`
--
ALTER TABLE `Mazo`
  MODIFY `id_mazo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Mazo`
--
ALTER TABLE `Mazo`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
