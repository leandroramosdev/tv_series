-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Tempo de geração: 06/06/2022 às 17:47
-- Versão do servidor: 5.7.34
-- Versão do PHP: 8.0.8

CREATE DATABASE IF NOT EXISTS series;
USE series;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `series`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tv_series`
--

CREATE TABLE `tv_series` (
  `id` int(11) NOT NULL,
  `title` varchar(120) NOT NULL,
  `channel` varchar(50) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `image_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tv_series_intervals`
--

CREATE TABLE `tv_series_intervals` (
  `id_tv_series` int(11) NOT NULL,
  `week_day` varchar(100) NOT NULL,
  `show_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tv_series`
--
ALTER TABLE `tv_series`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tv_series_intervals`
--
ALTER TABLE `tv_series_intervals`
  ADD PRIMARY KEY (`id_tv_series`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tv_series`
--
ALTER TABLE `tv_series`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
