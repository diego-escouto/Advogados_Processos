-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema apiadvogadodb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema apiadvogadodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `apiadvogadodb` ;
USE `apiadvogadodb` ;

-- -----------------------------------------------------
-- Table `apiadvogadodb`.`advogado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `apiadvogadodb`.`advogado` ;

CREATE TABLE IF NOT EXISTS `apiadvogadodb`.`advogado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `oab` VARCHAR(8) NOT NULL,
  `especialidade` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apiadvogadodb`.`processo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `apiadvogadodb`.`processo` ;

CREATE TABLE IF NOT EXISTS `apiadvogadodb`.`processo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_processo` VARCHAR(20) NOT NULL UNIQUE,
  `descricao` VARCHAR(150) NULL,
  `status` VARCHAR(30) NULL,
  `id_advogado` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_processo_advogado1_idx` (`id_advogado` ASC),
  CONSTRAINT `fk_processo_advogado1`
    FOREIGN KEY (`id_advogado`)
    REFERENCES `apiadvogadodb`.`advogado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Data for table `apiadvogadodb`.`advogado`
-- -----------------------------------------------------
START TRANSACTION;
USE `apiadvogadodb`;
INSERT INTO `apiadvogadodb`.`advogado` (`id`, `nome`, `oab`, `especialidade`) VALUES (DEFAULT, 'advogado1', '00000001', 'penal');

COMMIT;


-- -----------------------------------------------------
-- Data for table `apiadvogadodb`.`processo`
-- -----------------------------------------------------
START TRANSACTION;
USE `apiadvogadodb`;
INSERT INTO `apiadvogadodb`.`processo` (`id`, `numero_processo`, `descricao`, `status`, `id_advogado`) VALUES (DEFAULT, '00001', 'Processo 1', 'em andamento', 1);
INSERT INTO `apiadvogadodb`.`processo` (`id`, `numero_processo`, `descricao`, `status`, `id_advogado`) VALUES (DEFAULT, '00002', 'Processo 2', 'em andamento', 1);

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

