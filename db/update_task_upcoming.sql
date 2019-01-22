UPDATE task 
SET t_title = ${t_title}, 
tag = ${tag}, 
notes = ${notes}
WHERE task_id = ${task_id};
select * from task
where completed = false
and t_user_id = ${t_user_id}
and task_date != 'inbox'
and task_date != 'someday'
and task_date != ${current_date}
order by task_id desc