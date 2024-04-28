/* To drop database if necessary */
DROP DATABASE IF EXISTS plant_shop_database;

/* To create database */

CREATE DATABASE plant_shop_database;
USE plant_shop_database;

/* To create tables */

CREATE TABLE Plant (
    PlantID INT PRIMARY KEY,
    PlantName VARCHAR(75) NOT NULL,
    ImageURL VARCHAR(255) NOT NULL
);

CREATE TABLE PlantSize (
   PlantSizeID INT PRIMARY KEY,
   PlantSize VARCHAR(75) NOT NULL,
   PlantID INT NOT NULL,
   Price DECIMAL(10,2) NOT NULL,
   FOREIGN KEY (PlantID) REFERENCES Plant(PlantID) ON DELETE CASCADE
);

CREATE TABLE CartItem (
    CartItemID INT PRIMARY KEY,
    PlantID INT NOT NULL,
    PlantSizeID INT NOT NULL,
    SessionID INT NOT NULL,
    FOREIGN KEY (PlantID) REFERENCES Plant(PlantID) ON DELETE CASCADE,
    FOREIGN KEY (PlantSizeID) REFERENCES PlantSize(PlantSizeID) ON DELETE CASCADE
);


/* To insert values into Plants table */

INSERT INTO Plant (PlantID, PlantName, ImageURL) 
VALUES(01111, 'Aragoda', '/images/aragoda.jpg'); 

INSERT INTO Plant (PlantID, PlantName, ImageURL)
VALUES(02222, 'Pianola', '/images/pianola.jpg');

INSERT INTO Plant (PlantID, PlantName, ImageURL)
VALUES(03333, 'Unosao', '/images/unosao.jpg');

INSERT INTO Plant (PlantID, PlantName, ImageURL)
VALUES(04444, 'Wonabu', '/images/wonabu.jpg');

/* To insert values into PlantSizes table */

/* For the Aragoda plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00001, 'Small', 01111, 36.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00011, 'Medium', 01111, 72.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00111, 'Large', 01111, 108.00);

/* For the Pianola plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00002, 'Small', 02222, 43.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00022, 'Medium', 02222, 86.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00222, 'Large', 02222, 129.00);

/* For the Unosao plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00003, 'Small', 03333, 68.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00033, 'Medium', 03333, 136.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00333, 'Large', 03333, 204.00);

/* For the Wonabu plant */

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00004, 'Small', 04444, 52.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00044, 'Medium', 04444, 104.00);

INSERT INTO PlantSize (PlantSizeID, PlantSize, PlantID, Price)
VALUES(00444, 'Large', 04444, 156.00);
