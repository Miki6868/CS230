-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 04, 2022 at 02:16 AM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs230_u200441`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_records`
--

CREATE TABLE `address_records` (
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `physical` varchar(100) NOT NULL,
  `shipping` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `eircode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address_records`
--

INSERT INTO `address_records` (`customer_id`, `physical`, `shipping`, `city`, `eircode`) VALUES
(253, '4 Beufield', '4 Beufield', 'Maynooth', 'W21V1K7'),
(256, '19 Straffan Wood', '19 Straffan Wood', 'Tallaght', 'W14V3K5'),
(257, '4 Beufield', '4 Beufield', 'Kildare', 'W12V6K9'),
(258, '7 Dublin Road', '7 Dublin Road', 'Lucan', 'W29V5K7'),
(259, '6 Main Street', '6 Main Street', 'Maynooth', 'W15V1K1'),
(260, '7 Greene Estate', '7 Greene Estate', 'Kildare', 'W21V4K2'),
(261, '17 Straffan Wood', '17 Straffan Wood', 'Lucan', 'W23V3K2'),
(262, '8 Greene Estate', '8 Greene Estate', 'Kildare', 'W24V7K6'),
(263, '18 Main Street', '18 Main Street', 'Tallaght', 'W22V8K2'),
(264, '12 Greene Estate', '12 Greene Estate', 'Lucan', 'W15V3K9'),
(265, '6 Greene Estate', '6 Greene Estate', 'Maynooth', 'W11V1K6'),
(266, '4 Beaufield Ave', '4 Beaufield Ave', 'Tallaght', 'W19V5K4'),
(268, '13 Main Street', '13 Main Street', 'Kildare', 'W26V5K7'),
(269, '17 Beaufield Ave', '17 Beaufield Ave', 'Wicklow', 'W18V6K3'),
(270, '9 Main Street', '9 Main Street', 'Tallaght', 'W13V4K6'),
(271, '9 Straffan Wood', '9 Straffan Wood', 'Maynooth', 'W29V9K5'),
(272, '14 Beaufield Ave', '14 Beaufield Ave', 'Lucan', 'W28V4K3'),
(273, '3 Beaufield Ave', '3 Beaufield Ave', 'Maynooth', 'W22V9K5'),
(274, '8 Straffan Wood', '8 Straffan Wood', 'Galway', 'W15V4K1'),
(275, '1 Tolkien Street', '1 Tolkien Street', 'Wicklow', 'W16V8K1'),
(276, '4 Main Street', '4 Main Street', 'Maynooth', 'W12V3K3'),
(277, '1 Straffan Wood', '1 Straffan Wood', 'Wicklow', 'W25V7K3'),
(278, '5 Greene Estate', '5 Greene Estate', 'Lucan', 'W29V4K5'),
(279, '20 Tolkien Street', '20 Tolkien Street', 'Lucan', 'W18V1K3'),
(280, '8 Straffan Wood', '8 Straffan Wood', 'Dublin', 'W25V5K3'),
(281, '15 Dublin Road', '15 Dublin Road', 'Maynooth', 'W26V7K8');

-- --------------------------------------------------------

--
-- Table structure for table `user_records`
--

CREATE TABLE `user_records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_records`
--

INSERT INTO `user_records` (`id`, `title`, `firstname`, `surname`, `mobile`, `email`) VALUES
(253, 'Dr', 'John', 'Phillip', '085785749', 'johnphillip29@email.com'),
(256, 'Mrs', 'Sheila', 'Aragon', '0852502815', 'SheilaAragon@email.com'),
(257, 'Mrs', 'Steven', 'Michael', '0856864350', 'StevenMichael@email.com'),
(258, 'Miss', 'Palita', 'Michael', '0859032266', 'palitamichael58@email.com'),
(259, 'Mrs', 'Steven', 'Aragon', '0857695631', 'stevenaragon23@email.com'),
(260, 'Mr', 'Bruce', 'Hull', '0854073289', 'brucehull18@email.com'),
(261, 'Mx', 'David', 'Carter', '0857519719', 'davidcarter36@email.com'),
(262, 'Mrs', 'James', 'Chapman', '0853850936', 'jameschapman56@email.com'),
(263, 'Miss', 'Carl', 'Chapman', '0858031062', 'carlchapman18@email.com'),
(264, 'Mr', 'David', 'Carrick', '085443697', 'davidcarrick68@email.com'),
(265, 'Sei', 'Casey', 'Hull', '0851234567', 'caseyhull7@email.com'),
(266, 'Mr', 'Casey', 'Hull', '0856136023', 'caseyhull80@email.com'),
(268, 'Mrs', 'Bruce', 'Carrick', '0856563791', 'brucecarrick109@email.com'),
(269, 'Miss', 'David', 'Carrick', '0856437082', 'davidcarrick49@email.com'),
(270, 'Miss', 'James', 'Hull', '0851120798', 'jameshull63@email.com'),
(271, 'Mr', 'Bruce', 'Carrick', '0859356978', 'brucecarrick16@email.com'),
(272, 'Mr', 'Phillip', 'Chapman', '0859500898', 'phillipchapman24@email.com'),
(273, 'Dr', 'Casey', 'Carter', '0856107059', 'caseycarter21@email.com'),
(274, 'Mr', 'James', 'Chapman', '085138870', 'jameschapman35@email.com'),
(275, 'Mx', 'John', 'Michael', '0854832339', 'johnmichael31@email.com'),
(276, 'Dr', 'Phillip', 'Hull', '0855019698', 'philliphull42@email.com'),
(277, 'Mx', 'Bruce', 'Hull', '0853564004', 'brucehull16@email.com'),
(278, 'Miss', 'David', 'Hull', '0858968497', 'davidhull86@email.com'),
(279, 'Mr', 'David', 'Hull', '0853815534', 'davidhull96@email.com'),
(280, 'Mx', 'Casey', 'Carrick', '0859208473', 'caseycarrick51@email.com'),
(281, 'Mr', 'Phillip', 'Phillip', '08687889', 'phil@email.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_records`
--
ALTER TABLE `address_records`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`);

--
-- Indexes for table `user_records`
--
ALTER TABLE `user_records`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_records`
--
ALTER TABLE `address_records`
  MODIFY `customer_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- AUTO_INCREMENT for table `user_records`
--
ALTER TABLE `user_records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address_records`
--
ALTER TABLE `address_records`
  ADD CONSTRAINT `address_records_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user_records` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
