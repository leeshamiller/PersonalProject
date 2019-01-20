select * from task
where t_user_id = ${t_user_id}
and task_date = 'someday'
and completed = false