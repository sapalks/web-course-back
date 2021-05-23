create table users(
	id integer NOT NULL PRIMARY KEY,
	username varchar(255) not null,
	password varchar(255) not null
);

CREATE SEQUENCE Users_seq START 1;

alter table users alter column ID set default nextval('Users_seq');

create table Customer(
    id integer NOT NULL PRIMARY KEY,
    email character varying(120) NOT NULL,
    name character varying(120),
    phone character varying(120),
    nickname character varying(120) NOT NULL,
    isDeleted bool not null default false
);

CREATE SEQUENCE Customer_Seq START 1;

alter table Customer alter column ID set default nextval('Customer_Seq');

CREATE TABLE Project (
    id integer NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    description character varying(255),
    createdate time without time zone,
    isDeleted bool not null default false
);

CREATE SEQUENCE Project_Seq START 1;

alter table Project alter column ID set default nextval('Project_Seq');

create table Customer_Project(
    CustomerID integer not null REFERENCES Customer (ID),
    ProjectID integer not null REFERENCES project (ID),
    IsHost bool not null,
    isDeleted bool not null default false
);

