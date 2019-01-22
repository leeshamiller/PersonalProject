insert into task
(t_user_id, t_title, completed, task_date, tag, notes)
values
(${t_user_id}, ${t_title}, false, ${current_date}, ${tag}, ${notes});
select * from task
where t_user_id = ${t_user_id}
and task_date = ${current_date}
and completed = false
order by task_id desc