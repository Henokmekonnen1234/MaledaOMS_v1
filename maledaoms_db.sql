-- This sql quiry will create database file for maleda OMS
DROP DATABASE IF EXISTS maleda_db;
CREATE DATABASE IF NOT EXISTS maleda_db;
CREATE USER IF NOT EXISTS 'maledaoms'@'localhost'
IDENTIFIED BY 'maledaoms_pwd';
GRANT ALL PRIVILEGES ON `maleda_db`.* to 'maledaoms'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'maledaoms'@'localhost';