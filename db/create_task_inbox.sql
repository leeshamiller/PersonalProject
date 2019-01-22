INSERT INTO task
(t_user_id, t_title, completed, task_date, tag, notes) 
VALUES
(${t_user_id}, ${t_title}, FALSE, 'inbox', ${tag}, ${notes});
select * from task
where task_date = 'inbox'
and completed = false
and t_user_id = ${t_user_id}
order by task_id desc