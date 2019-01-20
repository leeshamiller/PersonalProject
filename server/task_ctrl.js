module.exports = {
    getTasks: async (req, res) => {
        const {id: project_id} = req.params;
        const db = req.app.get('db');


        if(req.session.user.id) {
            const {id: user_id} = req.session.user;
            const getTasks = await db.get_tasks({project_id, user_id})
            return res.status(200).send(getTasks)
        }
    },
    addTask: async (req, res) => {
        const {id: project_id} = req.params;
        const {title: t_title, completed, date, tag, notes} = req.body;
        const db = req.app.get('db');

        if(req.session.user.id) {
            const {id: user_id} = req.session.user;
            const addTask = await db.create_task({project_id, user_id, t_title, completed, date, tag, notes})
            return res.status(200).send(addTask)
        }
    },
    deleteTask: async (req, res) => {
        const {task_id, project_id} = req.params;
        const db = req.app.get('db');

        if(req.session.user.id) {
            const {id: user_id} = req.session.user;
            const deleteTask = await db.delete_task({task_id, project_id, user_id})
            return res.status(200).send(deleteTask)
        }
    }
    // ,
    // updateTask: async (req, res) => {
    //     const {t_title, completed, task_date, tag, notes} = req.body;
    //     const {task_id, t_project_id} = req.params;
    //     const db = req.app.get('db');

    //     if(req.session.user.id) {
    //         const {id: user_id} = req.session.user;
    //         const updateTask = db.update_tasks({t_title, completed,task_date, tag, notes, task_id, t_project_id, user_id})
    //         return res.status(200).send(updateTask)
    //     }
    // }
}