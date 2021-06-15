CREATE TABLE brand(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    founderName VARCHAR(255),
    creationYear INTEGER,
    isDeleted boolean DEFAULT FALSE
);

CREATE TABLE car(
     id SERIAL PRIMARY KEY,
     name VARCHAR(255),
     hp VARCHAR(255),
     creationYear INTEGER,
     engineVolume VARCHAR(255),
     brandId INTEGER,
     FOREIGN KEY (brandId) REFERENCES brand (id) ON DELETE CASCADE ON UPDATE CASCADE,
     isDeleted boolean DEFAULT FALSE
);