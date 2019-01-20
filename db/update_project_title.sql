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
