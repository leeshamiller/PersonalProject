module.exports = {
    getInbox: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const db = req.app.get('db');
        
        if(req.session.user.id) {
            const getInbox = await db.get_inbox({t_user_id})
            return res.status(200).send(getInbox)
        }
    },
    getToday: async (req,res) => {
        const {id: t_user_id} = req.session.user;
        const {current_date} = req.params
        const db = req.app.get('db')

        if(req.session.user.id) {
            const getToday = await db.get_today({current_date, t_user_id})
            return res.status(200).send(getToday)
        }
    },
    getLogbook: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const db = req.app.get('db');

        if(req.session.user.id) {
            const getLogbook = await db.get_logbook({t_user_id})
            return res.status(200).send(getLogbook)
        }
    },
    getSomeday: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const db = req.app.get('db');

        if(req.session.user) {
            const getSomeday = await db.get_someday({t_user_id})
            return res.status(200).send(getSomeday)
        }
    },
    getUpcoming: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {current_date} = req.params;
        const db = req.app.get('db');

        if(req.session.user.id) {
            const getUpcoming = await db.get_upcoming({t_user_id, current_date})
            return res.status(200).send(getUpcoming)
        }
    },
    addTaskInbox: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {t_title, tag, notes} = req.body;
        const db = req.app.get('db');
        
        if(req.session.user.id) {
            const addTaskInbox = await db.create_task_inbox({t_user_id, t_title, tag, notes})
            return res.status(200).send(addTaskInbox)
        }
    },
    addTaskSomeday: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {t_title, tag, notes} = req.body;
        const db = req.app.get('db');
        
        if(req.session.user.id) {
            const addTaskSomeday = await db.create_task_someday({t_user_id, t_title, tag, notes})
            return res.status(200).send(addTaskSomeday)
        }
    },
    addTaskToday: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {t_title, tag, notes} = req.body;
        const {current_date} = req.params
        const db = req.app.get('db');
        
        if(req.session.user.id) {
            const addTaskToday = await db.create_task_today({t_user_id, t_title, tag, notes, current_date})
            return res.status(200).send(addTaskToday)
        }
    },
    addTaskUpcoming: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {t_title, tag, notes, task_date} = req.body;
        const {current_date} = req.params
        const db = req.app.get('db');
        
        if(req.session.user.id) {
            const addTaskUpcoming = await db.create_task_upcoming({t_user_id, t_title, tag, notes, current_date, task_date})
            return res.status(200).send(addTaskUpcoming)
        }

    },
    deleteTaskInbox: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {task_id} = req.params;
        const db = req.app.get('db')

        if(t_user_id) {
            const deleteTaskInbox = await db.delete_task_inbox({t_user_id, task_id})
            res.status(200).send(deleteTaskInbox)
        }
    },
    deleteTaskSomeday: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {task_id} = req.params;
        const db = req.app.get('db')
    
        if(t_user_id) {
            const deleteTaskSomeday = await db.delete_task_someday({t_user_id, task_id})
            res.status(200).send(deleteTaskSomeday)
        }
    },
    deleteTaskToday: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {task_id, current_date} = req.params;
        const db = req.app.get('db')
        
        if(t_user_id) {
            const deleteTaskToday = await db.delete_task_today({t_user_id, task_id, current_date})
            res.status(200).send(deleteTaskToday)
        }
    },
    deleteTaskLogbook: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {task_id} = req.params;
        const db = req.app.get('db')
        
        if(t_user_id) {
            const deleteTaskLogbook = await db.delete_task_logbook({t_user_id, task_id})
            res.status(200).send(deleteTaskLogbook)
        } 
    },
    deleteTaskUpcoming: async (req, res) => {
        const {id: t_user_id} = req.session.user;
        const {task_id, current_date} = req.params;
        const db = req.app.get('db')
        
        if(t_user_id) {
            const deleteTaskUpcoming = await db.delete_task_upcoming({t_user_id, task_id, current_date})
            res.status(200).send(deleteTaskUpcoming)
        }
    }
}