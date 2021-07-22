const express = require('express');
const cors = require('cors');
const { User } = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewareAuth');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.json('Server is running boiza!')
})

// adding the verifytoken middleware means can only access this route if provide a valid token in auth header!
app.get('/users', verifyToken, async (req,res) => {
    try {
        const users = await User.all
        res.json(users)
    } catch(err) {
        res.status(500).json({err})
    }
})

app.get('/users/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json(err);
    }
})

app.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        console.log(req.body);
        const newUser = await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = bcrypt.compare(req.body.password, user.hashedPassword)
        if (authed){
            const payload = { username: user.username, email: user.email }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ err });
    }
})

module.exports = { app };