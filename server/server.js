require('dotenv').config();

const path = require('path'); // Usually moved to the start of file
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ac = require('./auth_ctrl');
const area_ctrl = require('./area_ctrl');
const pc = require('./project_ctrl');
const tc = require('./task_ctrl');
const tabs_ctrl = require('./tabs_ctrl');



const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Ducks ready for takeoff! ${SERVER_PORT} blastoff!`))
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.get('/auth/logout', ac.logout);
app.get('/auth/user-data', ac.userData);

app.post('/api/add-area', area_ctrl.addArea);
app.get('/api/get-areas/:id', area_ctrl.getAreas);
app.delete('/api/delete-area/:id', area_ctrl.deleteArea);
app.put('/api/update-area/:id', area_ctrl.updateArea);

app.post('/api/add-project/:id', pc.addProject);
app.get('/api/get-projects/:id', pc.getProjects);
app.delete('/api/delete-project/:project_id&:area_id', pc.deleteProject);
app.put('/api/update-project/:project_id&:area_id', pc.updateProject);

app.get('/api/get-tasks/:id', tc.getTasks);
app.post(`/api/add-task/:id`, tc.addTask);
app.delete('/api/delete-task/:project_id&:task_id', tc.deleteTask);
app.put('/api/update-task/:t_project_id&:task_id', tc.updateTask);

app.get(`/api/get-Inbox/:id&:current_date`, tabs_ctrl.getInbox);
app.get('/api/get-Today/:id&:current_date', tabs_ctrl.getToday);
app.get('/api/get-Logbook/:id&:current_date', tabs_ctrl.getLogbook);
app.get('/api/get-Someday/:id&:current_date', tabs_ctrl.getSomeday);
app.get('/api/get-Upcoming/:id&:current_date', tabs_ctrl.getUpcoming);

app.post('/api/add-task-Inbox/:current_date', tabs_ctrl.addTaskInbox);
app.post('/api/add-task-Someday/:current_date', tabs_ctrl.addTaskSomeday);
app.post('/api/add-task-Today/:current_date', tabs_ctrl.addTaskToday);
app.post('/api/add-task-Logbook/:current_date', tabs_ctrl.addTaskInbox);
app.post('/api/add-task-Upcoming/:current_date', tabs_ctrl.addTaskUpcoming);

app.delete('/api/delete-task-Inbox/:task_id&:current_date', tabs_ctrl.deleteTaskInbox);
app.delete('/api/delete-task-Someday/:task_id&:current_date', tabs_ctrl.deleteTaskSomeday);
app.delete('/api/delete-task-Today/:task_id&:current_date', tabs_ctrl.deleteTaskToday);
app.delete('/api/delete-task-Logbook/:task_id&:current_date', tabs_ctrl.deleteTaskLogbook);
app.delete('/api/delete-task-Upcoming/:task_id&:current_date', tabs_ctrl.deleteTaskUpcoming);

app.put('/api/update-task-Inbox/:task_id&:current_date', tabs_ctrl.updateTaskInbox);
app.put('/api/update-task-Someday/:task_id&:current_date', tabs_ctrl.updateTaskSomeday);
app.put('/api/update-task-Logbook/:task_id&:current_date', tabs_ctrl.updateTaskLogbook);
app.put('/api/update-task-Today/:task_id&:current_date', tabs_ctrl.updateTaskToday);
app.put('/api/update-task-Upcoming/:task_id&:current_date', tabs_ctrl.updateTaskUpcoming);

app.put('/api/update-complete/:task_id', tabs_ctrl.updateCompleted);