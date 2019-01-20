select * from task
where completed = false
and t_user_id = ${t_user_id}
and task_date != 'inbox'
and task_date != 'someday'
and task_date != ${current_date}