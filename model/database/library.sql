-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `awards` int(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Miguel de Cervantes','Saavedra',54,'España'),(2,'William','Faulkner',19,'Estados Unidos'),(3,'Antoine','Saint-Exupery',30,'Francia'),(4,'Nicolas','Maquiavelo',15,'Italia'),(5,'Henry','Kissinger',32,'Alemania'),(6,'Kitty','Kelley',12,'Gran Bretaña'),(7,'Aisin Gioro','Pu-Yi',3,'China'),(8,'Pérez','Galdós',16,'España'),(10,'Julio','Cortázar',50,'Bélgica');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `editorial` varchar(50) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `pages` int(11) NOT NULL,
  `year` year(4) NOT NULL,
  `price` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Don Quijote de La Mancha I','Anaya','Caballeresco',520,1991,2750,1),(2,'Don Quijote de La Mancha II','Anaya','Caballeresco',630,1992,3125,1),(3,'Historias de Nueva Orleans','Alfaguara','Novela',186,1985,675,2),(4,'El principito','Andina','Aventura',120,1996,750,3),(5,'El principe','S.M','Político',210,1995,1125,4),(6,'Diplomacia','S.M','Político',825,1997,1750,5),(7,'Los Windsor','Plaza & Janés','Biografías',620,1998,1130,6),(8,'El Último Emperador','Caral','Autobiografías',353,1989,995,7),(9,'Fortunata y Jacinta','Plaza & Janés','Novela',625,1984,725,8),(10,'Todo Cortázar','Fernández Blanco','Bio-Bibliografía',400,2014,560,10);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `mount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (15668420,500),(20202020,350),(123456789,180);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `loan_date_in` date DEFAULT NULL,
  `loan_date_out` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` VALUES (1,2,2,'2019-03-28','2020-04-28'),(2,5,3,'2020-03-28','2020-04-28'),(3,4,4,'2020-04-06','2020-05-05');
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `domicilie` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Diego Rodrigo','Sanchez Moreno','Chibaja 2632','Cordoba','2000-01-27','111'),(2,'José','Sanchez Pons','Mesa y López 51','Las Palmas','1966-09-06','258'),(3,'Miguel','Gómez Sáez','Gran Vía 71','Madrid','1976-12-09','369'),(4,'Eva','Santana','Baroja 23','Cordoba','1980-05-23','471'),(5,'Yolanda','Betancor','Av. Nvo Mundo 20','Bs As','1976-09-17','582'),(6,'Juan Luis','Rivera','Cándido Galvan 20','Tucuman','1982-03-01','693'),(7,'Diego','Sanchez','Av. Japón 75','Cordoba','2003-03-27','password'),(8,'Lucas','Perez','Armenia 220','Chubut','1995-05-07','julian'),(9,'Lorena','Salgado','Altamira 47','Buenos Aires','1996-05-08','SaragozA'),(10,'Ana','Lopez','Rancagua 500','Madrid','2000-10-25','ran500'),(11,'Lucas','Valle','Los Ticas 0','Málaga','1995-08-15','malaga'),(12,'Martin','Carrasco','Cándido Galvan 1500','Cordoba','1986-02-02','candido1500'),(13,'Lucas','Peralta','José Franco 239','Buenos Aires','1967-08-24','BS67AS'),(14,'Agustina','Trogero','Chilavert 2020','Misiones','2005-12-18','RAStrogero'),(15,'Pablo','Barrionuevo','Cruz Roja 503','Madrid','2003-05-30','voleyCruzRoja'),(16,'Elias','Quevedo','Tohaen 800','Barcelona','1975-01-26','messi10'),(18,'Marcos','De la Serna','Bacalao 505','Madrid','1998-06-05','deLaSerna505'),(19,'Matias','Lereda','Góngora 650','Cordoba','1995-05-06','albarra'),(20,'Lucas','Fontes','Guanahani 750','Chaco','1980-05-06','chacoplus'),(21,'Lucas','Olivera','Manuel Belgrano 150','Santa Cruz','1996-12-15','sanBelgrano');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-06 18:13:25
