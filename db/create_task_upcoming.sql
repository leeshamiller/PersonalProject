insert into task
(t_user_id, t_title, completed, task_date, tag, notes)
values
(${t_user_id}, ${t_title}, false, ${task_date}, ${tag}, ${notes});
select * from task
where completed = false
and t_user_id = ${t_user_id}
and task_date != 'someday'
and task_date != 'inbox'
and task_date != ${current_date}
order by task_id desc