insert into task
(t_user_id, t_title, completed, task_date, tag, notes)
values
(${t_user_id}, ${t_title}, false, 'someday', ${tag}, ${notes});
select * from task
where completed = false
and t_user_id = ${t_user_id}
and task_date = 'someday'
order by task_id desc