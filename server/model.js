const db = require('./dbConfig');

class User {
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.username = data.username;
        this.hashedPassword = data.password;
    }

    //note that static methods are called on the class itself (i.e. User) and not on an instance of the class
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const userTable = await db.query(`SELECT * FROM users;`)
                const users = userTable.rows.map(d => new User(d))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve,reject) => {
            try {
                const userTable = await db.query('SELECT * FROM users WHERE id = $1', [ id ]);
                const user = new User(userTable.rows[0]);
                resolve(user);
            } catch (err) {
                reject(`Error finding user with id: ${id}`);
            }
        })
    }

    static create(data){
        return new Promise (async (resolve,reject) => {
            try{
                const userTable = await db.query('INSERT INTO users (email, username,password) VALUES ($1, $2, $3) RETURNING *', [ data.email, data.username, data.password ]);
                let newUser = new User(userTable.rows[0]);
                resolve(newUser);
            } catch (err) {
                reject(`Invalid data supplied of the form: ${Object.keys(data).map(key => [key, data[key]])}`)
            }
        })
    }

    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM users WHERE email = $1;', [ email ]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}

module.exports = { User };