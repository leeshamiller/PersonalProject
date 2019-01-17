const bcrypt = require('bcryptjs');

module.exports = {
    addArea: async (req, res) => {
        const { id, title } = req.body;
        const db = req.app.get('db')
        if (req.session.user.id !== id) {
            res.status(401).send('Please log in.')
        }
        const newAreaArr = await db.create_area({ id, title })
        res.status(200).send(newAreaArr)
    },
    getAreas: async (req, res) => {
        const { id } = req.params;
        const db = req.app.get('db');

        if (req.session.user.id !== +id) {
            res.status(401).send('Please log in')
        }
        const singleUserAreas = await db.find_user_id({ id })
        res.status(200).send(singleUserAreas)
    },
    addProject: async (req, res) => {
        const { id, title } = req.body;
        console.log(req.body)
        const db = req.app.get('db');

        if (req.session.user.id !== id) {
            res.status(401).send('Not logged in.')
        }
        const newProjectArr = await db.create_project({ id, title })
        res.status(200).send(newProjectArr)
    },
    getProjects: async (req, res) => {
        const { id } = req.params;
        const db = req.app.get('db');

        if (req.session.user.id !== +id) {
            res.status(401).send('Not logged in')
        }
        const singleUserProjects = await db.find_area_id({ id })
        res.status(200).send(singleUserProjects)
    },
    deleteArea: async (req, res) => {
        const { id: area_id } = req.params;
        const db = req.app.get('db');

        if(req.session.user.id) {
            const {id: user_id} = req.session.user
            const deleteAreaArr = await db.delete_area({area_id, user_id})
            res.status(200).send(deleteAreaArr)
        }
    },
    updateArea: async (req, res) => {
        const {id: area_id} = req.params;
        const {id: user_id} = req.session.user
        const {editTitle} = req.body;
        const db = req.app.get('db');

        if(req.session.user.id) {
            const updateArea = await db.update_area_title({editTitle, area_id, user_id})
            res.status(200).send(updateArea)
        }
    }
}