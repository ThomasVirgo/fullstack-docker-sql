const db = require('./dbConfig');

class User {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const userData = await db.query(`SELECT * FROM users;`)
                const users = userData.rows.map(d => new User(d))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    }
}

module.exports = { User };