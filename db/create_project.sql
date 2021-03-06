insert into project
(area_id, project_title)
values
(${area_id}, ${project_title});

select * from areas a
inner join project p
on p.area_id = a.area_id
where p.area_id is not null
and a.user_id = ${user_id}
and a.area_id = ${area_id}
order by project_id desc;
