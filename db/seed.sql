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

select * from areas
where user_id = 13;

alter table areas alter column title set not null;
select * from areas;

insert into areas
(user_id, title)
values
(13, 'new area2');
select * from areas;

delete from areas
where area_id = 34;
select * from areas
where user_id = 13;

update areas
set title = 'update works!!!!'
where area_id = 13
and user_id = 12;
select * from areas
order by area_id;

create table project (
area_id integer REFERENCES areas(area_id),
project_id serial primary key,
title varchar(50)
);

insert into project
(area_id, title)
VALUES
(91, 'random');

select * from areas a
inner join project p
on p.area_id = a.area_id
where p.area_id is not null
and a.user_id = 16

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