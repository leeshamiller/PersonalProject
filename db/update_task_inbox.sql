UPDATE task 
SET t_title = ${t_title}, 
tag = ${tag}, 
notes = ${notes} 
WHERE task_id = ${task_id};
select * from task
where task_date = 'inbox'
and completed = false
and t_user_id = ${t_user_id}
order by task_id desc