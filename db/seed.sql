-- USERS TABLE
create table users (
user_id serial primary key,
username varchar(25),
pass_hash varchar(50)
);
alter table users alter COLUMN pass_hash type varchar(100);

-- get
select * from users;

-- post
insert into users (username, pass_hash)
values ('test4', 'test4')
returning *;
select * from users;



-- AREAS TABLE
create table areas (
user_id integer REFERENCES users(user_id),
title varchar(50),
area_id serial primary key
);
alter table areas alter column title set not null;
select * from areas;

-- get
select * from areas
where user_id = 13;

-- post
insert into areas
(user_id, title)
values
(13, 'new area2');
select * from areas;

-- delete
delete from areas
where area_id = 34;
select * from areas
where user_id = 13;

-- put
update areas
set title = 'update works!!!!'
where area_id = 13
and user_id = 12;
select * from areas
order by area_id;



-- PROJECT TABLE
create table project (
area_id integer REFERENCES areas(area_id),
project_id serial primary key,
title varchar(50)
);
alter table project rename column title to project_title;

-- post
insert into project
(area_id, title)
VALUES
(91, 'random');

-- get
select * from areas a
inner join project p
on p.area_id = a.area_id
where p.area_id is not null
and a.user_id = 16

-- delete
delete from project 
where project_id = ${project_id};
select * from project
where area_id = ${area_id}
order by project_id desc;

-- put
update project
set project_title = ${editTitle}
where area_id = ${area_id}
and project_id = ${project_id};
select * from areas a
inner join project p
on p.area_id = a.area_id
where p.area_id is not null
and a.user_id = ${user_id}
and a.area_id = ${area_id}
order by project_id desc;



-- TASK TABLE
create table task (
t_project_id integer REFERENCES project(project_id),
t_user_id integer REFERENCES users(user_id),
task_id serial primary key,
t_title varchar(100),
completed BOOLEAN,
task_date timestamp,
tag text,
notes text
);

-- get
select * from task t
inner join users u
on t.t_user_id = u.user_id
inner join project p
on t.t_project_id = p.project_id
where user_id = 13
and project_id = 80
order by task_id desc

-- post
insert into task
(t_project_id, t_user_id, t_title, completed, task_date, tag, notes)
values
(80, 13, 'task test2', false, '2019-01-18 10:40:25-07', 'work', 'task test notes2');

select * from task;

-- delete
delete from task
where task_id = 17;
select * from task t
inner join users u
on t.t_user_id = u.user_id
inner join project p
on t.t_project_id = p.project_id
where user_id = 16
and project_id = 82
order by task_id desc