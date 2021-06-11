CREATE SEQUENCE Cook_Seq START 2;

CREATE SEQUENCE Sushi_Seq START 1;

create TABLE Cook (
id integer PRIMARY KEY,
Surname VARCHAR(50) not null,
Age integer not null

);

create TABLE Sushi (
id integer PRIMARY KEY,
Name_Sushi VARCHAR(50) not null,
Ingredients VARCHAR(50),
Cook_id integer,

Foreign key (Cook_id)
references Cook(id) 
);

alter table Cook alter column id set default nextval('Cook_Seq');

alter table Sushi alter column id set default nextval('Sushi_Seq');

CREATE SEQUENCE User_Seq START 1;

create TABLE Users (
id integer PRIMARY KEY,
Login VARCHAR(50) not null,
Password VARCHAR(30) not null,
DateCreate Date not null DEFAULT CURRENT_DATE
);

alter table Users alter column id set default nextval('User_Seq');