delete from task
where task_id = ${task_id};
select * from task t
inner join users u
on t.t_user_id = u.user_id
inner join project p
on t.t_project_id = p.project_id
where user_id = ${user_id}
and project_id = ${project_id}
and completed = false
order by task_id desc