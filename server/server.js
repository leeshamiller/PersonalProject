require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ac = require('./auth_ctrl');
const area_ctrl = require('./area_ctrl');
const pc = require('./project_ctrl');

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
