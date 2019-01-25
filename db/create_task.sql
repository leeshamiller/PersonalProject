insert into task
(t_project_id, t_user_id, t_title, completed, task_date, tag, notes)
values
(${project_id}, ${user_id}, ${t_title}, ${completed}, ${date}, ${tag}, ${notes});

select * from task t
inner join users u
on t.t_user_id = u.user_id
inner join project p
on t.t_project_id = p.project_id
where user_id = ${user_id}
and project_id = ${project_id}
and completed = false
order by task_id desc