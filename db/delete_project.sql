delete from project 
where project_id = ${project_id};
select * from project
where area_id = ${area_id}
order by project_id desc;