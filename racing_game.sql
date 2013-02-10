-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 10, 2013 at 09:36 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `racing_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE IF NOT EXISTS `history` (
  `id` int(125) NOT NULL,
  `bestTime` bigint(200) NOT NULL,
  `totalGame` int(250) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `bestTime`, `totalGame`) VALUES
(0, 123123123123, 1),
(25, 41911, 25),
(26, 1061, 2),
(27, 1759, 5),
(30, 1231321321, 1),
(31, 44958, 1),
(32, 54396, 2);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `useridfrom` bigint(10) NOT NULL DEFAULT '0',
  `useridto` bigint(10) NOT NULL DEFAULT '0',
  `subject` text CHARACTER SET utf8 NOT NULL,
  `fullmessage` text CHARACTER SET utf8 NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=35 ;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `useridfrom`, `useridto`, `subject`, `fullmessage`, `createddate`) VALUES
(5, 25, 30, 'Subject', 'sss', '2013-02-03 01:07:26'),
(6, 27, 30, 'Subject', 'Body', '2013-02-03 02:49:22'),
(12, 26, 30, 'Subject', 'hi', '2013-02-03 07:54:09'),
(13, 26, 30, 'Subject', 'hisdfdsf', '2013-02-03 07:54:42'),
(15, 26, 30, 'hello ravi hello brother', 'I am fine ravi are you okay', '2013-02-03 07:57:22'),
(22, 25, 26, 'what is up', 'How is going guys?', '2013-02-07 15:38:21'),
(23, 25, 26, 'hi', 'Body', '2013-02-07 15:38:39'),
(25, 25, 26, 'Subject', 'Body', '2013-02-09 04:58:19'),
(26, 25, 31, 'Subject', 'I am proud to myself.', '2013-02-09 05:01:33'),
(27, 27, 25, 'greeting', 'hi suman how are  you are you fine', '2013-02-09 06:05:25'),
(31, 0, 26, 'Subject', 'adsf', '2013-02-09 10:32:51'),
(32, 25, 27, 'Subject', 'Body', '2013-02-09 10:50:31'),
(33, 32, 25, 'hello!', 'Body', '2013-02-10 10:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_persian_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `gender` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=33 ;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `username`, `password`, `first_name`, `last_name`, `gender`, `email`) VALUES
(25, 'suman', '1533c67e5e70ae7439a9aa993d6a3393', 'suman', 'bogati', 'male', 'bogati@gmail.com'),
(26, 'ravi', '63dd3e154ca6d948fc380fa576343ba6', 'ravi', 'bogati', 'male', 'ravi.com'),
(27, 'laxmi', '5d419095dc537d7d54dadd997bae866e', 'laxmi', 'surkheti', 'male', 'laxmi@gmail.com'),
(28, 'bogati', '5a82bda4cb6f08d58af2c1edfad8f803', '', '', '', ''),
(29, 'ssssssssssss', 'd41d8cd98f00b204e9800998ecf8427e', '', '', '', 'sumanbogati@gmail.com'),
(30, 'kimi', 'aacfa66c7af573977f10b74a0d950c99', 'kimi', 'katkar', 'male', 'kimi'),
(31, 'raju', '03c017f682085142f3b60f56673e22dc', 'raju', 'raju', 'male', 'raju@gmail.com'),
(32, 'manish', 'bc6c7cd9b8d907e4d7f233ffc0d06923', 'manish', 'rawat', 'male', 'rawat.manish108@gmail.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
