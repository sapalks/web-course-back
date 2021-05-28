
create table Users (
    id integer NOT NULL PRIMARY KEY,
    Username character varying(120) NOT NULL,
    Login character varying(120),
    Password character varying(120),
    Phone character varying(120) NOT NULL,
	isAdmin bool NOT null default false,
	isVerificated bool NOT null default false,
    isDeleted bool NOT null default false
);

CREATE SEQUENCE Users_Seq START 1;

alter table Users alter column ID set default nextval('Users_seq');

CREATE TABLE ad (
    id integer NOT NULL PRIMARY KEY,
    Name character varying(255) NOT NULL,
    Price numeric(10,2),
    Date date NOT NULL,
    Address character varying(255) NOT NULL,
	Description character varying(255) NOT NULL,
    isDeleted bool NOT null default false,
	UserID integer NOT null REFERENCES Users (ID)
);

CREATE SEQUENCE ad_Seq START 1;

alter table ad alter column ID set default nextval('ad_seq');