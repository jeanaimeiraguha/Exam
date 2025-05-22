-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 11:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sims`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`) VALUES
(2, 'theonest', 'theonest'),
(3, 'aline', 'aline'),
(4, 'Cyuzuzzo', 'CYuzuzo');

-- --------------------------------------------------------

--
-- Table structure for table `spare_part`
--

CREATE TABLE `spare_part` (
  `id` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `UnitPrice` decimal(10,2) DEFAULT NULL,
  `TotalPrice` decimal(10,2) GENERATED ALWAYS AS (`Quantity` * `UnitPrice`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spare_part`
--

INSERT INTO `spare_part` (`id`, `Name`, `Category`, `Quantity`, `UnitPrice`) VALUES
(4, 'Chai', 'dfd', 2, 343432.00),
(5, 'Ram', 'v1', 343, 98765432.00);

-- --------------------------------------------------------

--
-- Table structure for table `stock_in`
--

CREATE TABLE `stock_in` (
  `id` int(11) NOT NULL,
  `StockInQuantity` int(11) DEFAULT NULL,
  `StockInPrice` decimal(10,2) DEFAULT NULL,
  `spare_part_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_in`
--

INSERT INTO `stock_in` (`id`, `StockInQuantity`, `StockInPrice`, `spare_part_id`, `admin_id`) VALUES
(2, 2343, 3.00, NULL, NULL),
(3, 34, 23456.00, NULL, NULL),
(4, 454, 675767.00, NULL, NULL),
(5, 45, 989.00, NULL, NULL),
(6, 1000, 34567890.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_out`
--

CREATE TABLE `stock_out` (
  `id` int(11) NOT NULL,
  `StockOutQuantity` int(11) DEFAULT NULL,
  `StockOutUnitPrice` decimal(10,2) DEFAULT NULL,
  `StockOutTotalPrice` decimal(10,2) GENERATED ALWAYS AS (`StockOutQuantity` * `StockOutUnitPrice`) STORED,
  `StockOutDate` date DEFAULT NULL,
  `spare_part_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_out`
--

INSERT INTO `stock_out` (`id`, `StockOutQuantity`, `StockOutUnitPrice`, `StockOutDate`, `spare_part_id`, `admin_id`) VALUES
(1, 378, 4567890.00, '2025-05-28', NULL, NULL),
(2, 455, 456789.00, '2025-05-07', NULL, NULL),
(3, 454, 454.00, '2025-05-16', NULL, NULL),
(4, 6767, 7890.00, '2025-05-22', NULL, NULL),
(5, 500, 567.00, '2025-05-23', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spare_part`
--
ALTER TABLE `spare_part`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spare_part_id` (`spare_part_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `stock_out`
--
ALTER TABLE `stock_out`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spare_part_id` (`spare_part_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `spare_part`
--
ALTER TABLE `spare_part`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock_in`
--
ALTER TABLE `stock_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stock_out`
--
ALTER TABLE `stock_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stock_in`
--
ALTER TABLE `stock_in`
  ADD CONSTRAINT `stock_in_ibfk_1` FOREIGN KEY (`spare_part_id`) REFERENCES `spare_part` (`id`),
  ADD CONSTRAINT `stock_in_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Constraints for table `stock_out`
--
ALTER TABLE `stock_out`
  ADD CONSTRAINT `stock_out_ibfk_1` FOREIGN KEY (`spare_part_id`) REFERENCES `spare_part` (`id`),
  ADD CONSTRAINT `stock_out_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
