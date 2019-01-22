DELETE FROM task 
WHERE task_id = ${task_id};
select * from task
where task_date = ${current_date}
and completed = false
and t_user_id = ${t_user_id}