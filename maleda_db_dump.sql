-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: maleda_db
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `image` varchar(100) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_no` (`phone_no`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (NULL,'Andromedical.com','henokmac2425@gmail.com','$2b$12$dcsFqsD3ADTEn7mJWeYXFO.TNjVTpXlZLPle0776IW0uGqaHbkXDa','0913829029',NULL,NULL,'4f390414-d8a8-4051-a9dd-11b97907e5d1','2024-05-28 19:31:33','2024-05-28 19:31:33');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `full_name` varchar(100) NOT NULL,
  `telegram` varchar(100) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `company_id` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('Iola Haney','In eiusmod eveniet ','+1 (511) 471-3286','Error voluptatum quo','Lideta','4f390414-d8a8-4051-a9dd-11b97907e5d1','067e8d11-85f2-477d-a9a3-dec0adaed56f','2024-05-28 19:32:05','2024-05-28 19:32:05'),('Mia Aguirre','Delectus necessitat','+1 (773) 686-3344','Aut natus duis et vo','Nifas Silk','4f390414-d8a8-4051-a9dd-11b97907e5d1','5fed8331-d058-47d0-aae0-1fc98deaf744','2024-05-29 18:18:04','2024-05-29 18:18:04'),('Olivia Roach','Eveniet fugit in a','+1 (305) 612-6493','Aut elit qui mollit','Bambis','4f390414-d8a8-4051-a9dd-11b97907e5d1','6b50d371-8da2-4f8b-97b5-0d1bb9c8efa8','2024-05-28 19:31:55','2024-05-28 19:31:55'),('Glenna Goff','Culpa veniam autem','+1 (991) 256-1612','Aliquid officia volu','CMC','4f390414-d8a8-4051-a9dd-11b97907e5d1','79c4c132-42e7-4995-9766-2ea50698bd35','2024-05-29 17:58:35','2024-05-29 17:58:35'),('Heidi Heath','Quis aliquam ut labo','+1 (861) 723-2029','Dolores ipsa do duc','Entoto','4f390414-d8a8-4051-a9dd-11b97907e5d1','b73ea133-8c12-424d-9f31-eeff0f256291','2024-05-28 20:07:05','2024-05-28 20:07:05'),('Roary Atkinson','Irure omnis ipsum ut','+1 (627) 873-8571','Rem error laborum qu','Saris','4f390414-d8a8-4051-a9dd-11b97907e5d1','ccefc189-27a5-4d7f-a7c8-11090ffcb20f','2024-05-29 18:07:35','2024-05-29 18:07:35'),('Mason Woodward','Eveniet exercitatio','+1 (435) 113-5119','Est sint lorem ut el','Yeka','4f390414-d8a8-4051-a9dd-11b97907e5d1','db693902-ddbe-4141-9d25-c4b2cdc476a2','2024-05-28 20:07:11','2024-05-28 20:07:11');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery` (
  `order_id` varchar(60) NOT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `delivery_status` varchar(60) DEFAULT NULL,
  `location` varchar(60) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
INSERT INTO `delivery` VALUES ('3f94a193-2403-451a-bd18-603d336de577','2024-05-28 19:40:14','Pending',NULL,'1038f176-196f-477f-9605-2f52587e66f0','2024-05-28 19:46:25','2024-05-28 19:46:25'),('83105bb0-f5b5-4de8-9903-d74d2caafb6a','2024-05-28 19:40:14','Pending',NULL,'1510b111-1401-4c5a-b5f7-ef8a4c7dfd5d','2024-05-28 20:08:27','2024-05-28 20:08:27'),('1750be79-19cf-4524-9eb6-b61d6f28a6cc','2024-05-28 19:40:14','Pending',NULL,'2a011031-8ef3-4077-8482-3fdccef8fcc3','2024-05-28 20:11:01','2024-05-28 20:11:01'),('b8ca73fe-2371-4676-9688-02b606b57eff','2024-05-28 19:40:14','Pending',NULL,'2e546765-7166-40d1-9584-978efbeadce7','2024-05-28 20:11:47','2024-05-28 20:11:47'),('29beb044-cadf-4db5-9d81-c48319742ac3','2024-06-04 00:00:00','Ready for delivery','Ethiopia','329bc9cc-e4a5-454c-babe-9ced1f46355b','2024-05-28 20:11:16','2024-06-04 14:34:07'),('884a0ea5-4c3e-4060-9c27-803a06bfe82a','2024-06-04 00:00:00','Ready for delivery','Ethiopia','3b2d264d-4784-40be-9eb6-f9b20213089d','2024-05-29 17:58:39','2024-06-04 13:37:28'),('7f19c9a0-a0e0-4b31-8c29-2440ffee7dc5','2024-05-28 19:40:14','Pending',NULL,'5a11598b-a7ce-4e7f-888d-9a5ca2d48957','2024-05-28 19:46:08','2024-05-28 19:46:08'),('c075ecac-06ee-447a-8b5c-1bd8ca7f70a2','2024-06-04 00:00:00','Ready for delivery','Ethiopia','5a18d621-6062-419a-9dab-b4d2350532e4','2024-05-28 20:08:49','2024-06-04 14:34:27'),('56bf1dbe-2656-4221-98ac-ca14d19793ed','2024-05-28 19:40:14','Pending',NULL,'65191327-49a1-4333-9176-d68115482666','2024-05-28 20:07:41','2024-05-28 20:07:41'),('66e21610-0345-4fde-8deb-a472bbf02bfb','2024-05-29 18:07:03','Pending',NULL,'87692710-2552-4e34-bea9-ab5523c0165c','2024-05-29 18:07:36','2024-05-29 18:07:36'),('c6bfd12c-95af-40df-afee-33a9ea225b7d','2024-05-28 19:40:14','Pending',NULL,'899a94a6-edd6-43b3-acbc-50a3f9c402b3','2024-05-28 20:11:58','2024-05-28 20:11:58'),('60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','2024-06-05 00:00:00','Pending','Enim lorem non ducim','909309aa-e733-45af-9644-baae57172685','2024-06-05 08:48:45','2024-06-05 08:48:45'),('e9dddaf1-c3b1-4f20-a88f-e4e849e517cc','2024-05-28 19:40:14','Pending',NULL,'a1defeaf-178c-41e1-b9e6-0c703f7c3e95','2024-05-28 20:11:29','2024-05-28 20:11:29'),('bbedf7a6-ab4d-47d4-8e5e-7058a3c098b8','2024-05-28 19:40:14','Pending',NULL,'a21e67be-8bd8-4a63-8e29-9ecf26dcc013','2024-05-28 20:08:02','2024-05-28 20:08:02'),('715b971d-edf0-4c56-a33c-66738dbe01f7','2024-05-29 18:16:51','Pending','Aut natus duis et vo','aa7a9fca-d061-4288-b8fb-3608a363627a','2024-05-29 18:18:04','2024-05-29 18:18:04'),('742e5e43-0dab-47d6-97a8-d153b3b69f76','2024-05-28 19:31:16','Pending',NULL,'b9d3552e-2b01-45f3-ba3c-22a233136cb1','2024-05-28 19:38:32','2024-05-28 19:38:32'),('37ea942c-a00c-465f-818a-572ef80656db','2024-05-28 19:40:14','Pending',NULL,'fa9eba10-43cc-403f-bf9d-daa21d0a3e03','2024-05-28 20:10:39','2024-05-28 20:10:39');
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `image` varchar(100) DEFAULT NULL,
  `product` varchar(50) NOT NULL,
  `catagory` varchar(100) DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  `company_id` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('10f32045-88d7-4eb7-b9ab-a5e1a4ba0d9f.jpg','Illum quo error qua','Home & Kitchen',893,205,'Order','4f390414-d8a8-4051-a9dd-11b97907e5d1','2aa88bd6-05b8-4247-8633-cab5efc63f02','2024-05-28 19:37:48','2024-06-05 08:48:45'),('ad0c290b-25e7-4121-8827-a45b4e2e4475.jpg','Tenetur est in conse','Office Supplies',224,189,'Order','4f390414-d8a8-4051-a9dd-11b97907e5d1','7760f878-2f87-42d0-bf91-3bbcdaae61b7','2024-05-28 20:06:53','2024-06-05 08:48:45'),('f3691454-92b4-4337-b647-eaafedf848e8.jpg','Ad sint est consequ','Musical Instruments',961,590,'Order','4f390414-d8a8-4051-a9dd-11b97907e5d1','b4368570-fdeb-4f36-bd2e-55442fed8145','2024-05-28 19:38:04','2024-06-05 08:48:45'),('ea762de3-3c5e-431f-ac71-63d7008e93b2.jpg','Autem ut quia non do','Garden & Outdoor',480,767,'Order','4f390414-d8a8-4051-a9dd-11b97907e5d1','eb827120-2b4f-46f1-83b5-46d3f393424e','2024-05-28 19:38:14','2024-06-05 08:45:33'),('c2413903-2ca1-4bdb-ba0e-d01f9a33eb5f.jpg','Fugit amet quia co','Luggage & Travel Gear',455,13,'On hand','4f390414-d8a8-4051-a9dd-11b97907e5d1','f99b9255-8fd0-49b8-93f7-48b8bdf35000','2024-05-28 19:32:17','2024-06-05 08:48:45');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `txn_no` varchar(100) NOT NULL,
  `cus_id` varchar(60) NOT NULL,
  `order_date` datetime NOT NULL,
  `total_amnt` float NOT NULL,
  `status` varchar(100) NOT NULL,
  `company_id` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `pre_paid` float DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `cus_id` (`cus_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('tiG1vh4BC3gl','db693902-ddbe-4141-9d25-c4b2cdc476a2','2024-05-28 19:40:14',19,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','1750be79-19cf-4524-9eb6-b61d6f28a6cc','2024-05-28 20:11:01','2024-06-02 13:29:29'),('pflgK7jIVcpo','b73ea133-8c12-424d-9f31-eeff0f256291','2024-05-28 19:40:14',14,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','29beb044-cadf-4db5-9d81-c48319742ac3','2024-05-28 20:11:16','2024-06-02 13:17:45'),('v18gx51gWFut','6b50d371-8da2-4f8b-97b5-0d1bb9c8efa8','2024-05-28 19:40:14',5424,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','37ea942c-a00c-465f-818a-572ef80656db','2024-05-28 20:10:39','2024-05-28 20:10:39'),('qeyYuBYskHe0','067e8d11-85f2-477d-a9a3-dec0adaed56f','2024-05-28 19:40:14',85,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','3f94a193-2403-451a-bd18-603d336de577','2024-05-28 19:46:25','2024-06-02 13:23:25'),('967frVxdbCyJ','067e8d11-85f2-477d-a9a3-dec0adaed56f','2024-05-28 19:40:14',135,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','56bf1dbe-2656-4221-98ac-ca14d19793ed','2024-05-28 20:07:41','2024-06-02 13:21:24'),('24AjCooBNQk6','5fed8331-d058-47d0-aae0-1fc98deaf744','2024-06-05 08:47:48',6390,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','2024-06-05 08:48:45','2024-06-05 08:48:45'),('4Bq97nx4qn4a','ccefc189-27a5-4d7f-a7c8-11090ffcb20f','2024-05-29 18:07:03',10106,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','66e21610-0345-4fde-8deb-a472bbf02bfb','2024-05-29 18:07:35','2024-05-29 18:07:35'),('vrpPwJS7PrbU','5fed8331-d058-47d0-aae0-1fc98deaf744','2024-05-29 18:16:51',5029,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','715b971d-edf0-4c56-a33c-66738dbe01f7','2024-05-29 18:18:04','2024-05-29 18:18:04'),('JXXK6oBvln91','6b50d371-8da2-4f8b-97b5-0d1bb9c8efa8','2024-05-28 19:31:16',183483,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','742e5e43-0dab-47d6-97a8-d153b3b69f76','2024-05-28 19:38:32','2024-05-28 19:38:32'),('9xgCZtimJJ5n','6b50d371-8da2-4f8b-97b5-0d1bb9c8efa8','2024-05-28 19:40:14',138125,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','7f19c9a0-a0e0-4b31-8c29-2440ffee7dc5','2024-05-28 19:46:08','2024-05-28 19:46:08'),('ZhMXh6wgo57r','6b50d371-8da2-4f8b-97b5-0d1bb9c8efa8','2024-05-28 19:40:14',7651,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','83105bb0-f5b5-4de8-9903-d74d2caafb6a','2024-05-28 20:08:27','2024-05-28 20:08:27'),('dU2TFhQmD5Is','79c4c132-42e7-4995-9766-2ea50698bd35','2024-05-29 17:58:07',808,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','884a0ea5-4c3e-4060-9c27-803a06bfe82a','2024-05-29 17:58:37','2024-06-03 11:51:57'),('f1jyzwHQQQjQ','db693902-ddbe-4141-9d25-c4b2cdc476a2','2024-05-28 19:40:14',38,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','b8ca73fe-2371-4676-9688-02b606b57eff','2024-05-28 20:11:47','2024-06-02 13:53:34'),('hAoanCXkwixt','067e8d11-85f2-477d-a9a3-dec0adaed56f','2024-05-28 19:40:14',14,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','bbedf7a6-ab4d-47d4-8e5e-7058a3c098b8','2024-05-28 20:08:02','2024-06-02 13:25:51'),('SEcNcojpXupF','b73ea133-8c12-424d-9f31-eeff0f256291','2024-05-28 19:40:14',24,'Packaged','4f390414-d8a8-4051-a9dd-11b97907e5d1','c075ecac-06ee-447a-8b5c-1bd8ca7f70a2','2024-05-28 20:08:49','2024-06-02 13:19:18'),('zLswQNqq7vmj','db693902-ddbe-4141-9d25-c4b2cdc476a2','2024-05-28 19:40:14',8,'Processing Order','4f390414-d8a8-4051-a9dd-11b97907e5d1','c6bfd12c-95af-40df-afee-33a9ea225b7d','2024-05-28 20:11:58','2024-06-02 14:00:29'),('EbS76Ai2xZ0n','db693902-ddbe-4141-9d25-c4b2cdc476a2','2024-05-28 19:40:14',1935,'Processing','4f390414-d8a8-4051-a9dd-11b97907e5d1','e9dddaf1-c3b1-4f20-a88f-e4e849e517cc','2024-05-28 20:11:29','2024-05-28 20:11:29');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_id` varchar(60) NOT NULL,
  `prod_id` varchar(60) NOT NULL,
  `quantity` int DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `order_id` (`order_id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `inventory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES ('884a0ea5-4c3e-4060-9c27-803a06bfe82a','f99b9255-8fd0-49b8-93f7-48b8bdf35000',4,'0c95be65-6d32-4fea-9a5a-01798446d13d','2024-06-02 14:28:10','2024-06-03 11:51:57'),('715b971d-edf0-4c56-a33c-66738dbe01f7','b4368570-fdeb-4f36-bd2e-55442fed8145',1,'0ef8214f-e80a-4ce7-b74d-6cc496c65836','2024-05-29 18:18:04','2024-05-29 18:18:04'),('83105bb0-f5b5-4de8-9903-d74d2caafb6a','eb827120-2b4f-46f1-83b5-46d3f393424e',4,'141a0fff-32c9-41dc-b8b3-ec0bb37bb5a7','2024-05-28 20:08:27','2024-05-28 20:08:27'),('742e5e43-0dab-47d6-97a8-d153b3b69f76','f99b9255-8fd0-49b8-93f7-48b8bdf35000',520,'2bda5623-6bc3-4d2b-9f59-559546365b91','2024-05-28 19:38:32','2024-05-28 19:38:32'),('715b971d-edf0-4c56-a33c-66738dbe01f7','7760f878-2f87-42d0-bf91-3bbcdaae61b7',4,'2edff111-5590-4617-8a42-1623cb4a76a1','2024-05-29 18:18:04','2024-05-29 18:18:04'),('715b971d-edf0-4c56-a33c-66738dbe01f7','2aa88bd6-05b8-4247-8633-cab5efc63f02',3,'3c5b15f3-2e6e-4092-9fa9-0f1a1175dd71','2024-05-29 18:18:04','2024-05-29 18:18:04'),('742e5e43-0dab-47d6-97a8-d153b3b69f76','2aa88bd6-05b8-4247-8633-cab5efc63f02',342,'3c5d083f-4fd7-49cf-8653-61a66c60d5f4','2024-05-28 19:38:32','2024-05-28 19:38:32'),('66e21610-0345-4fde-8deb-a472bbf02bfb','b4368570-fdeb-4f36-bd2e-55442fed8145',2,'3ca20e0c-f62f-40c0-a2c2-e8296d9a5977','2024-05-29 18:07:36','2024-05-29 18:07:36'),('66e21610-0345-4fde-8deb-a472bbf02bfb','7760f878-2f87-42d0-bf91-3bbcdaae61b7',5,'458a5282-066a-406f-a042-7facf9bc6fff','2024-05-29 18:07:35','2024-05-29 18:07:35'),('29beb044-cadf-4db5-9d81-c48319742ac3','2aa88bd6-05b8-4247-8633-cab5efc63f02',3,'47c9ddd2-e35d-4900-98f2-1a2ba397e65d','2024-05-28 20:11:16','2024-06-02 13:17:45'),('7f19c9a0-a0e0-4b31-8c29-2440ffee7dc5','b4368570-fdeb-4f36-bd2e-55442fed8145',215,'48752c04-62a8-45dc-8179-c12beb09d10c','2024-05-28 19:46:08','2024-05-28 19:46:08'),('e9dddaf1-c3b1-4f20-a88f-e4e849e517cc','2aa88bd6-05b8-4247-8633-cab5efc63f02',2,'520270ee-6199-47a9-9ed2-bea3b29655c0','2024-05-28 20:11:29','2024-05-28 20:11:29'),('60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','f99b9255-8fd0-49b8-93f7-48b8bdf35000',9,'5a34b652-0861-41e0-acf7-dfffbc53b428','2024-06-05 08:48:45','2024-06-05 08:48:45'),('b8ca73fe-2371-4676-9688-02b606b57eff','7760f878-2f87-42d0-bf91-3bbcdaae61b7',5,'60520ec1-bfd3-4c7d-b1d7-aae4b4ed3c69','2024-05-28 20:11:47','2024-06-02 13:53:34'),('37ea942c-a00c-465f-818a-572ef80656db','b4368570-fdeb-4f36-bd2e-55442fed8145',5,'67d4116a-7f5f-4cb8-8def-2c4ad5038ae2','2024-05-28 20:10:39','2024-05-28 20:10:39'),('60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','7760f878-2f87-42d0-bf91-3bbcdaae61b7',7,'67d54ec6-f370-417e-9212-5bf5253de7e0','2024-06-05 08:48:45','2024-06-05 08:48:45'),('c6bfd12c-95af-40df-afee-33a9ea225b7d','eb827120-2b4f-46f1-83b5-46d3f393424e',1,'6e546866-3dad-4630-b033-27f8925da080','2024-05-28 20:11:58','2024-06-02 14:00:29'),('7f19c9a0-a0e0-4b31-8c29-2440ffee7dc5','2aa88bd6-05b8-4247-8633-cab5efc63f02',55,'74651cb4-38e2-407b-89cf-bd0c87f85929','2024-05-28 19:46:08','2024-05-28 19:46:08'),('b8ca73fe-2371-4676-9688-02b606b57eff','2aa88bd6-05b8-4247-8633-cab5efc63f02',23,'76de891a-f1ae-4eb4-9728-9f16a887fc0a','2024-06-02 13:53:34','2024-06-02 13:53:34'),('742e5e43-0dab-47d6-97a8-d153b3b69f76','eb827120-2b4f-46f1-83b5-46d3f393424e',139,'78a236a6-0b31-49d3-a8a5-7c97fde052fc','2024-05-28 19:38:32','2024-05-28 19:38:32'),('715b971d-edf0-4c56-a33c-66738dbe01f7','eb827120-2b4f-46f1-83b5-46d3f393424e',4,'80f13376-848d-461f-9f3b-a03928ca8023','2024-05-29 18:18:04','2024-05-29 18:18:04'),('37ea942c-a00c-465f-818a-572ef80656db','7760f878-2f87-42d0-bf91-3bbcdaae61b7',4,'942ee737-582b-4a59-8a1c-acfaf7c35151','2024-05-28 20:10:39','2024-05-28 20:10:39'),('e9dddaf1-c3b1-4f20-a88f-e4e849e517cc','f99b9255-8fd0-49b8-93f7-48b8bdf35000',1,'95dde0f8-b2c6-4d7d-8bc8-16e48070b3ab','2024-05-28 20:11:29','2024-05-28 20:11:29'),('b8ca73fe-2371-4676-9688-02b606b57eff','eb827120-2b4f-46f1-83b5-46d3f393424e',5,'961de1e4-eb2e-4948-8c08-b2bc95a79ac8','2024-05-28 20:11:47','2024-06-02 13:53:34'),('37ea942c-a00c-465f-818a-572ef80656db','f99b9255-8fd0-49b8-93f7-48b8bdf35000',6,'9a9e3cbe-fead-4c7d-8215-a5ea59317d13','2024-05-28 20:10:39','2024-05-28 20:10:39'),('60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','2aa88bd6-05b8-4247-8633-cab5efc63f02',4,'9f922a01-2a35-49a8-8f95-0ebac7d89b0a','2024-06-05 08:48:45','2024-06-05 08:48:45'),('884a0ea5-4c3e-4060-9c27-803a06bfe82a','7760f878-2f87-42d0-bf91-3bbcdaae61b7',4,'a0120cbe-30d0-4ff4-9cef-076bcc8311db','2024-06-02 14:28:10','2024-06-03 11:51:57'),('66e21610-0345-4fde-8deb-a472bbf02bfb','2aa88bd6-05b8-4247-8633-cab5efc63f02',9,'a1597d5a-e39e-40e2-b561-bb2a30297714','2024-05-29 18:07:35','2024-05-29 18:07:35'),('83105bb0-f5b5-4de8-9903-d74d2caafb6a','2aa88bd6-05b8-4247-8633-cab5efc63f02',9,'a21e2135-a15c-44ff-867c-8a6f60103eba','2024-05-28 20:08:27','2024-05-28 20:08:27'),('e9dddaf1-c3b1-4f20-a88f-e4e849e517cc','7760f878-2f87-42d0-bf91-3bbcdaae61b7',8,'ad70ae71-3464-43d3-8dd2-f61d8ba941c2','2024-05-28 20:11:29','2024-05-28 20:11:29'),('1750be79-19cf-4524-9eb6-b61d6f28a6cc','b4368570-fdeb-4f36-bd2e-55442fed8145',6,'b3bc3b1f-80e5-49b1-bd71-25bc7fd4e542','2024-05-28 20:11:01','2024-06-02 13:29:29'),('c6bfd12c-95af-40df-afee-33a9ea225b7d','f99b9255-8fd0-49b8-93f7-48b8bdf35000',1,'c6b50aa7-faab-4c67-bd55-9abc80f7b2ab','2024-05-28 20:11:58','2024-06-02 14:00:29'),('bbedf7a6-ab4d-47d4-8e5e-7058a3c098b8','b4368570-fdeb-4f36-bd2e-55442fed8145',6,'cb3287ba-b1da-48e8-9dcb-e9f251bd3ea9','2024-05-28 20:08:02','2024-06-02 13:25:51'),('66e21610-0345-4fde-8deb-a472bbf02bfb','eb827120-2b4f-46f1-83b5-46d3f393424e',8,'ccbeb722-eb4f-46ff-8709-7725074eb31e','2024-05-29 18:07:36','2024-05-29 18:07:36'),('37ea942c-a00c-465f-818a-572ef80656db','2aa88bd6-05b8-4247-8633-cab5efc63f02',8,'d7d23e21-2491-4570-b88f-c764ce551b15','2024-05-28 20:10:39','2024-05-28 20:10:39'),('60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','b4368570-fdeb-4f36-bd2e-55442fed8145',7,'dbfafaad-53bc-4998-9611-2d018bac682c','2024-06-05 08:48:45','2024-06-05 08:48:45'),('b8ca73fe-2371-4676-9688-02b606b57eff','f99b9255-8fd0-49b8-93f7-48b8bdf35000',5,'dd0082e3-b257-44e0-9895-f6f9ac168c96','2024-05-28 20:11:47','2024-06-02 13:53:34'),('3f94a193-2403-451a-bd18-603d336de577','f99b9255-8fd0-49b8-93f7-48b8bdf35000',6,'e176f533-a931-476a-b251-9cb6444aae03','2024-05-28 19:46:25','2024-06-02 13:23:25'),('56bf1dbe-2656-4221-98ac-ca14d19793ed','b4368570-fdeb-4f36-bd2e-55442fed8145',1,'e8e72b6b-68fb-4a32-89a5-ed1b81f4cc91','2024-05-28 20:07:41','2024-06-02 13:21:24'),('c6bfd12c-95af-40df-afee-33a9ea225b7d','b4368570-fdeb-4f36-bd2e-55442fed8145',6,'eae8475d-b716-46ab-91e0-79aca14e349d','2024-05-28 20:11:58','2024-06-02 14:00:29'),('83105bb0-f5b5-4de8-9903-d74d2caafb6a','b4368570-fdeb-4f36-bd2e-55442fed8145',4,'ebdfd03e-8c16-481b-9db5-19b9cdf1c771','2024-05-28 20:08:27','2024-05-28 20:08:27'),('83105bb0-f5b5-4de8-9903-d74d2caafb6a','7760f878-2f87-42d0-bf91-3bbcdaae61b7',2,'ec751cef-5565-4bf4-af91-ba1ec01bbd91','2024-05-28 20:08:27','2024-05-28 20:08:27'),('c075ecac-06ee-447a-8b5c-1bd8ca7f70a2','7760f878-2f87-42d0-bf91-3bbcdaae61b7',6,'f51cb502-29dc-4f72-a05c-17acacf8c73b','2024-05-28 20:08:49','2024-06-02 13:19:18');
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_process`
--

DROP TABLE IF EXISTS `order_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_process` (
  `order_id` varchar(60) NOT NULL,
  `process_date` datetime DEFAULT NULL,
  `process_status` varchar(60) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_process_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_process`
--

LOCK TABLES `order_process` WRITE;
/*!40000 ALTER TABLE `order_process` DISABLE KEYS */;
INSERT INTO `order_process` VALUES ('1750be79-19cf-4524-9eb6-b61d6f28a6cc','2024-05-28 19:40:14','Fully Paid','076589f2-f910-4253-8ca4-6b95a8051ef7','2024-05-28 20:11:01','2024-06-02 13:29:29'),('29beb044-cadf-4db5-9d81-c48319742ac3','2024-05-28 19:40:14','Fully Paid','16f2a725-d643-4802-915c-2d98a40e915d','2024-05-28 20:11:16','2024-06-02 13:17:45'),('3f94a193-2403-451a-bd18-603d336de577','2024-05-28 19:40:14','25% paid','41f60240-1d38-42e7-8044-892b426e5c1f','2024-05-28 19:46:25','2024-06-02 13:23:25'),('83105bb0-f5b5-4de8-9903-d74d2caafb6a','2024-05-28 19:40:14','25% Paid','48140ec2-efa5-487e-8a17-23f746b76e00','2024-05-28 20:08:27','2024-05-28 20:08:27'),('7f19c9a0-a0e0-4b31-8c29-2440ffee7dc5','2024-05-28 19:40:14','25% Paid','4900d366-35ae-43e5-b145-3526cb5c0713','2024-05-28 19:46:08','2024-05-28 19:46:08'),('bbedf7a6-ab4d-47d4-8e5e-7058a3c098b8','2024-05-28 19:40:14','Fully Paid','57c2b116-0efc-4b61-bab0-400ab1d2fff9','2024-05-28 20:08:02','2024-06-02 13:25:51'),('37ea942c-a00c-465f-818a-572ef80656db','2024-05-28 19:40:14','25% Paid','6d3c4ff6-6e93-442a-919c-d4d671a4dd17','2024-05-28 20:10:39','2024-05-28 20:10:39'),('56bf1dbe-2656-4221-98ac-ca14d19793ed','2024-05-28 19:40:14','null','75f3e6a0-0d13-4afb-9c87-d16758be0dfa','2024-05-28 20:07:41','2024-06-02 13:21:24'),('66e21610-0345-4fde-8deb-a472bbf02bfb','2024-05-29 18:07:03','25% Paid','8d246dc7-d454-442d-8751-eaf709635d91','2024-05-29 18:07:36','2024-05-29 18:07:36'),('884a0ea5-4c3e-4060-9c27-803a06bfe82a','2024-05-29 17:58:07','25% paid','b5518eb2-2d9a-4722-845d-0119a0e5996e','2024-05-29 17:58:39','2024-06-03 11:51:57'),('715b971d-edf0-4c56-a33c-66738dbe01f7','2024-05-29 18:16:51','25% Paid','b8cd0eef-ef70-48bf-9854-150995154936','2024-05-29 18:18:04','2024-05-29 18:18:04'),('60f3ad3f-12c7-4ff5-a1fa-11d345d945d7','2024-06-05 08:47:48','25% Paid','bbbb9894-6952-45a8-94d2-69141b2e1075','2024-06-05 08:48:45','2024-06-05 08:48:45'),('c6bfd12c-95af-40df-afee-33a9ea225b7d','2024-05-28 19:40:14','Fully Paid','c2b980d1-b056-434e-a5e0-6c013efc325e','2024-05-28 20:11:58','2024-06-02 14:00:29'),('b8ca73fe-2371-4676-9688-02b606b57eff','2024-05-28 19:40:14','Fully Paid','d63fef44-8f90-48e4-a70b-bc58bfef9fb0','2024-05-28 20:11:47','2024-06-02 13:53:34'),('c075ecac-06ee-447a-8b5c-1bd8ca7f70a2','2024-05-28 19:40:14','Fully Paid','e023b872-945d-4748-9764-f8f9ac2e649a','2024-05-28 20:08:49','2024-06-02 13:19:18'),('742e5e43-0dab-47d6-97a8-d153b3b69f76','2024-05-28 19:31:16','25% Paid','ecd13db4-573c-4f92-9ced-0b93834bdd0c','2024-05-28 19:38:32','2024-05-28 19:38:32'),('e9dddaf1-c3b1-4f20-a88f-e4e849e517cc','2024-05-28 19:40:14','25% Paid','edc7d780-ab3e-4d86-b4dc-06902446fdea','2024-05-28 20:11:29','2024-05-28 20:11:29');
/*!40000 ALTER TABLE `order_process` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07 14:07:02
