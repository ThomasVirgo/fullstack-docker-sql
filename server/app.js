const express = require('express');
const cors = require('cors');
const { User } = require('./model');

const app = express();

app.use(cors());

app.get('/', (req,res) => {
    res.json('Server is running boiza!')
})

app.get('/users', async (req,res) => {
    try {
        const users = await User.all
        res.json({users})
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = { app };