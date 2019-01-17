delete from areas
where area_id = ${area_id};
select * from areas
where user_id = ${user_id}
order by area_id desc;