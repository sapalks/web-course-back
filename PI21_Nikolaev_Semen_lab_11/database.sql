CREATE TABLE vacancy 
( 
	vacancyID int NOT NULL PRIMARY KEY, 
	namePost VARCHAR(255) NOT NULL,
	salary int NOT NULL,
	delete boolean NOT NULL DEFAULT FALSE
);
 
CREATE SEQUENCE vacancy_seq START 1;

ALTER TABLE vacancy ALTER COLUMN vacancyID SET DEFAULT nextval('vacancy_seq');

CREATE TABLE resume 
( 
	resumeID int NOT NULL PRIMARY KEY, 
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL, 
	delete boolean NOT NULL DEFAULT FALSE,
	vacancyID int NOT NULL, 
	FOREIGN KEY (vacancyID) 
	REFERENCES vacancy (vacancyID) ON DELETE CASCADE ON UPDATE CASCADE
 );
 
CREATE SEQUENCE resume_seq START 1;

ALTER TABLE resume ALTER COLUMN resumeID SET DEFAULT nextval('resume_seq');

insert into vacancy values (nextval('vacancy_seq'),'Нужен 1С программист', 50);
insert into vacancy values (nextval('vacancy_seq'),'Нужен python разработчик jango', 150);
insert into vacancy values (nextval('vacancy_seq'),'Нужен php разработчик jango', 250);

insert into resume values (nextval('resume_seq'),'Петр','Петров', FALSE, 1);
insert into resume values (nextval('resume_seq'),'Вася','Иванов', FALSE, 2);
insert into resume values (nextval('resume_seq'),'Рома','Соловьев', FALSE, 3);

