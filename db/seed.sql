create table users (
user_id serial primary key,
username varchar(25),
pass_hash varchar(50)
);

alter table users alter COLUMN pass_hash type varchar(100);
select * from users;

insert into users (username, pass_hash)
values ('test4', 'test4')
returning *;
-- select * from users;

create table areas (
user_id integer REFERENCES users(user_id),
title varchar(50),
area_id serial primary key
);

create table project (
area_id integer REFERENCES areas(area_id),
project_id serial primary key,
title varchar(50)
);

create table task (
project_id integer REFERENCES project(project_id),
user_id integer REFERENCES users(user_id),
task_id serial primary key,
title varchar(100),
completed BOOLEAN,
task_date timestamp,
tag text,
notes text
);