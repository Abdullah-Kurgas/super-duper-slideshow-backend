-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: super_slideshow
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `slide`
--

DROP TABLE IF EXISTS `slide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slide` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_url` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `website_url` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `slideshow_id` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_slide_1_idx` (`slideshow_id`),
  CONSTRAINT `fk_slide_1` FOREIGN KEY (`slideshow_id`) REFERENCES `slideshow` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slide`
--

LOCK TABLES `slide` WRITE;
/*!40000 ALTER TABLE `slide` DISABLE KEYS */;
INSERT INTO `slide` VALUES (2,'http://res.cloudinary.com/dzbizu8pe/image/upload/v1651009660/v4adocdyiizvkyzlw5ek.jpg',NULL,NULL,'5','af17a8c8-c568-11ec-9f3a-0024d6f7b5f2'),(7,NULL,NULL,'http://cze.ba/','40','e3b743a7-c5aa-11ec-9f3a-0024d6f7b5f2'),(10,NULL,NULL,'https://shahed4u.pw/home2/','59','af17a8c8-c568-11ec-9f3a-0024d6f7b5f2'),(11,'https://i.ytimg.com/vi/0SILdb7gS-8/sddefault.jpg','https://www.youtube.com/watch?v=0SILdb7gS-8&t=68104s',NULL,'PT22H36M51S','af17a8c8-c568-11ec-9f3a-0024d6f7b5f2'),(12,'https://i.ytimg.com/vi/4RGAi-obAC4/sddefault.jpg','https://www.youtube.com/watch?v=4RGAi-obAC4&list=RDgfXl3v9IXjY&index=13',NULL,'PT2M6S','af17a8c8-c568-11ec-9f3a-0024d6f7b5f2');
/*!40000 ALTER TABLE `slide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slideshow`
--

DROP TABLE IF EXISTS `slideshow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slideshow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_date` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`,`user_id`),
  KEY `fk_slideshow_userid_idx` (`user_id`),
  KEY `fk_slideshow_id` (`url`),
  CONSTRAINT `fk_slideshow_userid` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slideshow`
--

LOCK TABLES `slideshow` WRITE;
/*!40000 ALTER TABLE `slideshow` DISABLE KEYS */;
INSERT INTO `slideshow` VALUES (14,'test 5 (test1)','af17a8c8-c568-11ec-9f3a-0024d6f7b5f2',1,'2022-04-26 15:56:34'),(24,'test 4','a5906836-c5aa-11ec-9f3a-0024d6f7b5f2',1,'2022-04-26 23:48:45'),(25,'test 3','e3b743a7-c5aa-11ec-9f3a-0024d6f7b5f2',1,'2022-04-26 23:50:29'),(26,'test 2','12e6f7fd-c5ab-11ec-9f3a-0024d6f7b5f2',1,'2022-04-26 23:51:48'),(27,'test 1','d5be0936-c630-11ec-9f3a-0024d6f7b5f2',1,'2022-04-27 15:49:18');
/*!40000 ALTER TABLE `slideshow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','pre-admin','admin@gmail.com','admin','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-28 14:34:40
