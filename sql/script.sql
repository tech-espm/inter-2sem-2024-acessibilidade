CREATE SCHEMA acessibilidade DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE acessibilidade;

CREATE TABLE tipo (
  idtipo INT NOT NULL,
  nm_tipo VARCHAR(100) NOT NULL,
  PRIMARY KEY (idtipo)
);

INSERT INTO tipo (idtipo, nm_tipo) VALUES (1, 'Hospedagem'), (2, 'Bares'), (3, 'Restaurante'), (4, 'Lazer'), (5, 'Loja'), (6, 'Infantil'), (7, 'Turismo'), (8, 'Parceiros PCD');

CREATE TABLE local (
  idlocal INT NOT NULL AUTO_INCREMENT,
  idtipo INT NOT NULL,
  nm_local VARCHAR(100) NOT NULL,
  end_local VARCHAR(100) NOT NULL,
  cep_local VARCHAR(10) NOT NULL,
  num_local VARCHAR(45) NOT NULL,
  cidade_local VARCHAR(100) NOT NULL,
  uf_local VARCHAR(2) NOT NULL,
  lat_local FLOAT NOT NULL,
  lng_local FLOAT NOT NULL,
  estrelas TINYINT NOT NULL,
  PRIMARY KEY (idlocal),
  INDEX fk_local_idtipo_ix (idtipo ASC) VISIBLE,
  CONSTRAINT fk_local_idtipo
    FOREIGN KEY (idtipo)
    REFERENCES tipo (idtipo)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
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
