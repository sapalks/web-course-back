CREATE TABLE shaurma(
id SERIAL PRIMARY KEY,
is_deleted bool DEFAULT false,
size varchar(30) NOT NULL);

CREATE TABLE filling(
id SERIAL PRIMARY KEY,
meat varchar(20) NOT NULL,
lavash varchar(20) NOT NULL,
sauce varchar(20) NOT NULL,
spice varchar(20) NOT NULL,
is_deleted bool DEFAULT false,
shaurma_id INT REFERENCES shaurma(id) ON DELETE CASCADE ON UPDATE CASCADE);

insert into shaurma values
(1,'false','test Size');
insert into filling values
(1,'test Meat','test Lavash','test Sause','test Spice','false',1);

CREATE TABLE client (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX client_username_uindex
    on client (username);