insert into users (username, pass_hash)
values (${username}, ${hash})
returning *;