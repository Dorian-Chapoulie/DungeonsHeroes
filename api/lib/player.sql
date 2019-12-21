-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 21 déc. 2019 à 15:23
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dungeonheroes`
--

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE IF NOT EXISTS `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `money` int(11) NOT NULL DEFAULT '0',
  `lootbox` int(11) NOT NULL DEFAULT '0',
  `skinid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `player`
--

INSERT INTO `player` (`id`, `pseudo`, `email`, `password`, `money`, `lootbox`, `skinid`) VALUES
(1, 'dorian', 'dorian.chapoulie@gmail.com', '1234', 0, 0, 0),
(2, 'none', 'dorian.chapoulie2@gmail.com', '1234', 680, 0, 0),
(3, 'none2', 'dorian.chapoulie3@gmail.com', '1234', 0, 0, 0),
(4, 'none3', 'dorian.chapoulie4@gmail.com', '1234', 0, 0, 0),
(5, 'none5', 'dorian.chapoulie5@gmail.com', '1234', 0, 0, 0),
(6, 'a', 'a@a.com', 'a', 0, 0, 0),
(7, 'fzqfzq', 'ab@a.com', 'a', 0, 0, 0),
(8, 'aafdf', 'a', 'a', 9738, 297, 1),
(9, 'aa', 'af@a.com', 'ffzfzfz', 0, 0, 0),
(10, 'chap', 'dodo@dodo.com', 'bouffon', 0, 0, 0),
(11, 'test', 'test@test.com', 'test', 0, 0, 0),
(12, 'xena', 'ch@gmail.com', '1234', 0, 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
