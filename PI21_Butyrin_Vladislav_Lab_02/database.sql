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