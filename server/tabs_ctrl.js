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
    }
}