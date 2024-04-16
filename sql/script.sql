CREATE SCHEMA acessibilidade DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE acessibilidade;

CREATE TABLE local (
  idlocal INT NOT NULL AUTO_INCREMENT,
  nm_local VARCHAR(100) NOT NULL,
  end_local VARCHAR(100) NOT NULL,
  cep_local VARCHAR(10) NOT NULL,
  num_local VARCHAR(45) NOT NULL,
  cidade_local VARCHAR(100) NOT NULL,
  uf_local VARCHAR(2) NOT NULL,
  PRIMARY KEY (idlocal)
);

CREATE TABLE caracteristica (
  idcaracteristica INT NOT NULL AUTO_INCREMENT,
  nm_carac VARCHAR(45) NOT NULL,
  PRIMARY KEY (idcaracteristica)
);

CREATE TABLE local_caracteristica (
  idlocal_caracteristica INT NOT NULL AUTO_INCREMENT,
  nm_caracteristica VARCHAR(45) NOT NULL,
  idcaracteristica INT NOT NULL,
  idlocal INT NOT NULL,
  PRIMARY KEY (idlocal_caracteristica),
  INDEX fk_local_tipo_caracteristicas1_idx (idcaracteristica ASC) VISIBLE,
  INDEX fk_local_caracteristica_local1_idx (idlocal ASC) VISIBLE,
  CONSTRAINT fk_local_tipo_caracteristicas1
    FOREIGN KEY (idcaracteristica)
    REFERENCES caracteristica (idcaracteristica)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_local_caracteristica_local1
    FOREIGN KEY (idlocal)
    REFERENCES local (idlocal)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
