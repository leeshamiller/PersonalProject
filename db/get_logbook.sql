select * from task
where t_user_id = ${t_user_id}
and completed = true
order by task_id desc