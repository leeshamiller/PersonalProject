module.exports = {
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
    }
}