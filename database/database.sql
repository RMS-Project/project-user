CREATE DATABASE USERS_DATABASE;
/* DROP DATABASE USERS_DATABASE; */

SHOW DATABASES;

USE `USERS_DATABASE`;

## DROP TABLE USERS_DATABASE.user;
CREATE TABLE `USERS_DATABASE`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(200) NOT NULL UNIQUE,
  `createdAt`DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`)
);

## DROP TABLE USERS_DATABASE.deleted_user;
CREATE TABLE `USERS_DATABASE`.`deleted_user` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(200) NOT NULL UNIQUE,
  `createdAt`DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`)
);

insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Benita Gilling', 'bgilling0@xinhuanet.com', '6053f3fa4a48d06825eb324481e43f14bf8f2d1b98d40cd6ebf688837c8d7c86', '2022-05-23', '2022-10-15');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Collette Cracie', 'ccracie1@topsy.com', '083f9c55b98d01bdaa643ec21455e5280a0581f4b42dd7c77f971420305a2ab6', '2022-01-15', '2022-11-10');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Darrin Dries', 'ddries2@patch.com', '3d3329f02b674a1069456ab161aa681703ebe4fa7a1317e9fd67c2e8ec544420', '2022-08-05', '2022-01-09');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Constanta Dearle-Palser', 'cdearlepalser4@cbslocal.com', '86bc7da0967aa754f1ca36b01e07198af40f078b3033d162a078d4b95f5e419c', '2022-03-05', '2022-05-02');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Loralie Schankel', 'lschankel5@barnesandnoble.com', '398fef5dde7287ab879a3f2710c14b3cf7ddfee45d3d466fa67381294772feaf', '2022-02-20', '2022-06-11');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Farrel O''Teague', 'foteague7@ucsd.edu', 'ddb8b1b6f95774cb029c8e2e2a38bdb0f2f1b0c9d7b7558e96f30d2735504306', '2022-09-02', '2022-06-09');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Constancy Willeson', 'cwilleson8@histats.com', 'dffd3b4f4d4561897cb7cf377ba9f7a3f9fe80df0e07baaf69d67ef07678ecaf', '2022-04-20', '2022-04-30');
insert into USERS_DATABASE.user (name, email, password, createdAt, updatedAt) values ('Junie Sample', 'jsample9@drupal.org', '683aacb01cafd4e8bed62328c8ae1955a543b5575b114ddec8a64d251d2c798f', '2022-07-08', '2022-03-26');

select * from USERS_DATABASE.user;
