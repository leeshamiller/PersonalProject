const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const accountArr = await db.find_acc_username({username});
        if(accountArr.length !== 0) {
            res.status(200).send({message: 'Username already in use.'})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUserArr = await db.create_user({username, hash})
        let newUser = newUserArr[0]
        req.session.user = {id: newUser.user_id, username: newUser.username}
        res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const accountArr = await db.find_acc_username({username});
        if (!accountArr[0]){
            res.status(200).send({message: 'Username not found'})
        }
        const result = bcrypt.compareSync(password, accountArr[0].pass_hash)
        if(!result) {
            res.status(401).send({message: 'Incorrect password.'})
        }
        let newUser = accountArr[0];
        req.session.user = {id: newUser.user_id, username: newUser.username}
        res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('http://localhost:3000/#/')
    },
    userData: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Please log in')
        }
    },
    addArea: async (req, res) => {
        const { id, title } = req.body;
        // const { id } = req.session.user
        // console.log(req.body)
        const db = req.app.get('db')
        const userArr = await db.find_user_id({ id })
        // console.log(req.session)
        // console.log(userArr)
        if (req.session.user.id !== userArr[0].user_id) {
            res.status(401).send('Please log in.')
        }
        // console.log(req.body)
        const newAreaArr = await db.create_area({ id, title })
        // console.log(newAreaArr)
        const userArea = newAreaArr.pop()
        // console.log(userArea)
        req.session.user = {...req.session.user, title: userArea.title }
        // console.log(req.session.user)
        res.status(200).send({ message: 'area created', userData: req.session.user })
    },
    getAreas: (req, res) => {
        const db = req.app.get('db');
        db.get_areas().then((response) => {
            res.status(200).send(response)
        })
    }
}