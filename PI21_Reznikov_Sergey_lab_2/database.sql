CREATE TABLE thread ( 
 threadID int NOT NULL PRIMARY KEY, 
 threadname VARCHAR(100) NOT NULL,
 datecreate date not null default current_date,
 description varchar(100) not null
);

CREATE TABLE Message (
 messageID int primary key,
	datetimecreate timestamp not null default current_timestamp,
	text varchar(300) not null	
);

alter table message add column threadID int not null

alter table message add constraint thread_id_fk FOREIGN KEY (threadID) 
 REFERENCES thread (threadID) ON DELETE CASCADE ON UPDATE CASCADE


CREATE SEQUENCE thread_seq START 1;

ALTER TABLE thread ALTER COLUMN threadID SET DEFAULT nextval('thread_seq');


CREATE SEQUENCE message_seq START 1;

ALTER TABLE message ALTER COLUMN messageID SET DEFAULT nextval('message_seq');

alter table message add column isDeleted boolean not null default false ;

alter table thread add column isDeleted boolean not null default false ;