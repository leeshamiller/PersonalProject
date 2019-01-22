DELETE FROM task 
WHERE task_id = ${task_id};
select * from task
where t_user_id = ${t_user_id}
and completed = true