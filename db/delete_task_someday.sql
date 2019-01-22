DELETE FROM task 
WHERE task_id = ${task_id};
select * from task
where completed = false
and t_user_id = ${t_user_id}
and task_date = 'someday'
order by task_id desc