-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 08, 2021 at 12:26 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyeccionventas`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'Refrescos'),
(2, 'Panaderia'),
(3, 'Cosméticos'),
(4, 'Salud'),
(5, 'Golosinas');

-- --------------------------------------------------------

--
-- Table structure for table `simulaciones`
--

DROP TABLE IF EXISTS `simulaciones`;
CREATE TABLE IF NOT EXISTS `simulaciones` (
  `idSimulacion` int NOT NULL AUTO_INCREMENT,
  `Precio` float NOT NULL,
  `Anios` int NOT NULL,
  `VentasIniciales` int NOT NULL,
  `VentasFinales` int NOT NULL,
  `Categoria` int NOT NULL,
  PRIMARY KEY (`idSimulacion`),
  KEY `Categoria` (`Categoria`)
) AUTO_INCREMENT=3;

--
-- Dumping data for table `simulaciones`
--

INSERT INTO `simulaciones` (`idSimulacion`, `Precio`, `Anios`, `VentasIniciales`, `VentasFinales`, `Categoria`) VALUES
(1, 200, 3, 15000, 675087, 1),
(2, 20, 5, 23456, 466560, 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `simulaciones`
--
ALTER TABLE `simulaciones`
  ADD CONSTRAINT `simulaciones_ibfk_1` FOREIGN KEY (`Categoria`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
