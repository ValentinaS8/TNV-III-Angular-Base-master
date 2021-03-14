-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 14, 2021 at 11:04 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webservice`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `country` varchar(128) NOT NULL,
  `population` int(14) NOT NULL,
  `cases` int(11) NOT NULL,
  `deaths` int(11) NOT NULL,
  `recoveries` int(11) NOT NULL,
  `recoveryRate` float NOT NULL,
  `fatalityRate` float NOT NULL,
  `continent` varchar(12) NOT NULL,
  `classification` varchar(12) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dati_covid`
--

CREATE TABLE `dati_covid` (
  `Id_record` int(11) NOT NULL,
  `nome_stato` varchar(20) NOT NULL,
  `data` date NOT NULL,
  `popolazione` int(11) NOT NULL,
  `morti_giornaliere` int(11) NOT NULL,
  `casi_giornalieri` int(11) NOT NULL,
  `morti_totali` int(11) NOT NULL,
  `casi_totali` int(11) NOT NULL,
  `percentuale_morti` float NOT NULL,
  `casi_su_milione_abitanti` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `meteodata`
--

CREATE TABLE `meteodata` (
  `id` int(11) NOT NULL,
  `timezone` varchar(50) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `temperature` float NOT NULL,
  `temperatureMax` float NOT NULL,
  `temperatureMin` float NOT NULL,
  `relHumidity` float NOT NULL,
  `airQualityIndex` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dati_covid`
--
ALTER TABLE `dati_covid`
  ADD PRIMARY KEY (`Id_record`);

--
-- Indexes for table `meteodata`
--
ALTER TABLE `meteodata`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dati_covid`
--
ALTER TABLE `dati_covid`
  MODIFY `Id_record` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meteodata`
--
ALTER TABLE `meteodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
