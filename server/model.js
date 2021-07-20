const db = require('./dbConfig');

class User {
    constructor(data){
        this.id = data.id;
        this.name = data.name || 'dummy_name';
        this.age = data.age || 100;
        this.username = data.username;
        this.password = data.password;
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
                const userTable = await db.query('INSERT INTO user_data (username,password,name,age) VALUES ($1, $2, $3, $4) RETURNING *', [ data.username, data.password, data.name, data.age ]);
                let newUser = new User(userTable.rows[0]);
                resolve(newUser);
            } catch (err) {
                reject(`Invalid data supplied of the form: ${Object.keys(data).map(key => [key, data[key]])}`)
            }
        })
    }
}

module.exports = { User };