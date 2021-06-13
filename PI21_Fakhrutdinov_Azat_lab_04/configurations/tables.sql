CREATE TABLE class(
id SERIAL PRIMARY KEY,
is_deleted bool DEFAULT false,
name varchar(50) NOT NULL);

CREATE TABLE vehicle(
id SERIAL PRIMARY KEY,
brand varchar(150) NOT NULL,
model varchar(50) NOT NULL,
year_issue varchar(150) NOT NULL,
price varchar(150) NOT NULL,
is_deleted bool DEFAULT false,
class_id INT REFERENCES class(id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE client (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX client_username_uindex
    on client (username);

INSERT INTO class VALUES
(1,'false','hatchback'),
(2,'false','van'),
(3,'false','coupe');

INSERT INTO vehicle Values
(1, 'VAZ','2108','1988','95000','false',1),
(2, 'Ford','Transit','2011','470000','false',2);