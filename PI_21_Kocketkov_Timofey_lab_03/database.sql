CREATE SEQUENCE Timofey_Seq START 2;

CREATE SEQUENCE Desire_Seq START 1;

create TABLE Timofey (
id integer PRIMARY KEY,
Surname VARCHAR(50) not null,
age integer not null

);

create TABLE Desire (
id integer PRIMARY KEY,
Name_desire VARCHAR(50) not null,
Degree_of_desire int,
Timofey_id integer,

Foreign key (Timofey_id)
references Timofey(id) 
);

alter table Timofey alter column id set default nextval('Timofey_Seq');

alter table Desire alter column id set default nextval('Desire_Seq');