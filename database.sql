/* To drop database if necessary */

DROP DATABASE IF EXISTS plant_shop_database;

/* To create database */

CREATE DATABASE plant_shop_database;
USE plant_shop_database;

/* To create tables */

CREATE TABLE Plant (
    PlantID INT PRIMARY KEY AUTO_INCREMENT,
    PlantName VARCHAR(75) NOT NULL,
    ImageURL VARCHAR(255) NOT NULL
);

CREATE TABLE PlantSize (
   PlantSizeID INT PRIMARY KEY AUTO_INCREMENT,
   PlantSize VARCHAR(75) NOT NULL,
   PlantID INT NOT NULL,
   Price DECIMAL(10,2) NOT NULL,
   FOREIGN KEY (PlantID) REFERENCES Plant(PlantID) ON DELETE CASCADE
);

CREATE TABLE CartItem (
    CartItemID INT PRIMARY KEY AUTO_INCREMENT,
    PlantID INT NOT NULL,
    PlantSizeID INT NOT NULL,
    SessionID CHAR(32) NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plant(PlantID) ON DELETE CASCADE,
    FOREIGN KEY (PlantSizeID) REFERENCES PlantSize(PlantSizeID) ON DELETE CASCADE
);

/* To insert values into Plants table */

INSERT INTO Plant (PlantID, PlantName, ImageURL) 
VALUES(1, 'Aragoda', '/images/aragoda.jpg'); 

INSERT INTO Plant (PlantID, PlantName, ImageURL)
VALUES(2, 'Pianola', '/images/pianola.jpg');

INSERT INTO Plant (PlantID, PlantName, ImageURL)
VALUES(3, 'Unosao', '/images/unosao.jpg');

INSERT INTO Plant (PlantID, PlantName, ImageURL)
VALUES(4, 'Wonabu', '/images/wonabu.jpg');

/* To insert values into PlantSizes table */

/* For the Aragoda plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(1, 'Small', 1, 36.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(2, 'Medium', 1, 72.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(3, 'Large', 1, 108.00);

/* For the Pianola plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(4, 'Small', 2, 43.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(5, 'Medium', 2, 86.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(6, 'Large', 2, 129.00);

/* For the Unosao plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(7, 'Small', 3, 68.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(8, 'Medium', 3, 136.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(9, 'Large', 3, 204.00);

/* For the Wonabu plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(10, 'Small', 4, 52.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(11, 'Medium', 4, 104.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(12, 'Large', 4, 156.00);
