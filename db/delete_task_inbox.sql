DELETE FROM task 
WHERE task_id = ${task_id};
select * from task
where task_date = 'inbox'
and completed = false
and t_user_id = ${t_user_id}