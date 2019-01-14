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
        console.log(newUserArr)
        let newUser = newUserArr[0]
        console.log(newUser)
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
        let user = accountArr[0];
        req.session.user = {id: user.user_id, username: user.username}
        res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})
    }
}