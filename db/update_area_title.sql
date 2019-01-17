update areas
set title = ${editTitle}
where area_id = ${area_id}
and user_id = ${user_id};
select * from areas
where user_id = ${user_id}
order by area_id;