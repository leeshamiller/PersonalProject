UPDATE task 
SET t_title = ${t_title}, 
tag = ${tag}, 
notes = ${notes}
WHERE task_id = ${task_id};
select * from task
where t_user_id = ${t_user_id}
and task_date = 'someday'
and completed = false
order by task_id desc 