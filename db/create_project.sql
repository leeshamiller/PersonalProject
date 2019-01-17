insert into project
(area_id, title)
values
(${area_id}, ${title});

select * from areas a
inner join project p
on p.area_id = a.area_id
where p.area_id is not null
and a.user_id = ${user_id}