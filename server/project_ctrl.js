module.exports = {
    addProject: async (req, res) => {
        const {  title: project_title } = req.body;
        const {id: user_id} = req.session.user;
        const db = req.app.get('db');
        const {id: area_id} = req.params;

        if (req.session.user.id) {
            const newProjectArr = await db.create_project({ area_id, project_title, user_id })
            return res.status(200).send(newProjectArr)
        }
    },
    getProjects: async (req, res) => {
        const db = req.app.get('db');
        // req.session.user = {
        //     id: 16
        // }

        if (req.session.user.id) {
            const singleUserProjects = await db.find_area_id({ user_id: req.session.user.id , area_id: req.params.id})
            return res.status(200).send(singleUserProjects)
        }
    },
    deleteProject: async (req, res) => {
        const {project_id, area_id} = req.params;
        // console.log(req.params.id)
        const db = req.app.get('db');

        if(req.session.user) {
            const deleteProjectArr = await db.delete_project({project_id, area_id})
            return res.status(200).send(deleteProjectArr)
        }
    },
    updateProject: async (req, res) => {
        const {project_id, area_id} = req.params;
        const {editTitle} = req.body;
        const {id: user_id} = req.session.user
        const db = req.app.get('db');

        if (req.session.user.id) {
            const updateProject = await db.update_project_title({editTitle, area_id, project_id, user_id})
            return res.status(200).send(updateProject)
        }
    }
}