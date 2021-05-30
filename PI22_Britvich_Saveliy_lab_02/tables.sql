CREATE TABLE class(
id SERIAL PRIMARY KEY,
is_deleted bool DEFAULT false,
name varchar(50) NOT NULL);

CREATE TABLE car(
id SERIAL PRIMARY KEY,
brand varchar(150) NOT NULL,
model varchar(50) NOT NULL,
year_of_issue varchar(150) NOT NULL,
price varchar(150) NOT NULL,
is_deleted bool DEFAULT false,
class_id INT REFERENCES class(id) ON DELETE CASCADE ON UPDATE CASCADE);

INSERT INTO class VALUES
(1,'false','sedan'),(2,'false','crossover');
INSERT INTO car Values
(1, 'MAZDA','CX5','2015','1250000','false',2),(2, 'KIA','Stinger','2020','850000','false',1);
