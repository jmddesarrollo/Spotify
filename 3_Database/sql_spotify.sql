-- MySQL Script generated by MySQL Workbench
-- Sat May  5 11:05:57 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bd_spotify
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bd_spotify` ;

-- -----------------------------------------------------
-- Schema bd_spotify
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_spotify` DEFAULT CHARACTER SET utf8 ;
USE `bd_spotify` ;

-- -----------------------------------------------------
-- Table `bd_spotify`.`artistas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_spotify`.`artistas` ;

CREATE TABLE IF NOT EXISTS `bd_spotify`.`artistas` (
  `id` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `imagen` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_spotify`.`albumes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_spotify`.`albumes` ;

CREATE TABLE IF NOT EXISTS `bd_spotify`.`albumes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` LONGTEXT NULL DEFAULT NULL,
  `anho` INT(4) NULL DEFAULT NULL,
  `imagen` VARCHAR(45) NULL DEFAULT NULL,
  `artista_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_albumes_artistas_idx` (`artista_id` ASC),
  CONSTRAINT `fk_albumes_artistas`
    FOREIGN KEY (`artista_id`)
    REFERENCES `bd_spotify`.`artistas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_spotify`.`canciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_spotify`.`canciones` ;

CREATE TABLE IF NOT EXISTS `bd_spotify`.`canciones` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `numero` INT(3) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `duracion` VARCHAR(8) NULL DEFAULT NULL,
  `archivo` VARCHAR(45) NULL DEFAULT NULL,
  `album_id` INT(11) NOT NULL,
  `artistas_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_canciones_albumes1_idx` (`album_id` ASC),
  INDEX `fk_canciones_artistas1_idx` (`artistas_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_canciones_albumes1`
    FOREIGN KEY (`album_id`)
    REFERENCES `bd_spotify`.`albumes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_canciones_artistas1`
    FOREIGN KEY (`artistas_id`)
    REFERENCES `bd_spotify`.`artistas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bd_spotify`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd_spotify`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `bd_spotify`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `contrasenha` VARCHAR(60) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;