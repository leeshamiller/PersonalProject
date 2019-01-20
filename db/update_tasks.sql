update task
set t_title = ${t_title},
completed = ${completed},
task_date = ${task_date},
tag = ${tag},
notes = ${notes}
where task_id = ${task_id}
and t_project_id = ${t_project_id}; 
select * from task t
inner join users u
on t.t_user_id = u.user_id
inner join project p
on t.t_project_id = p.project_id
where user_id = ${user_id}
and project_id = ${t_project_id}
order by task_id desc