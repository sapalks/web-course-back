CREATE TABLE CustomerCard(
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    TelNumber VARCHAR(255),
    isDeleted boolean DEFAULT FALSE
);

CREATE TABLE SickList(
     id SERIAL PRIMARY KEY,
     StartDate DATE,
     EndDate DATE,

     CustomerCardId INTEGER,
     FOREIGN KEY (CustomerCardId) REFERENCES CustomerCard (id) ON DELETE CASCADE ON UPDATE CASCADE,
     isDeleted boolean DEFAULT FALSE
);