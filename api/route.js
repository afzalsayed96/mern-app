const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
let Users = require('./schema');

// Users route
userRoutes.route('/register').post(function (req, res) {
    var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regex.test(req.body.email) == false) {
        res.status(400).send("Invalid Email");
    }
    if (req.body.password === req.body.confirmPassword) {
        let { username, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let register = new Users({ username, email, password: hash });
        register.save()
            .then(reg => {
                res.sendStatus(200);
            })
            .catch(err => {
                res.status(400).send("Failed to store to database");
            });
    } else {
        res.status(400).send("Passwords don't match");
    }
});

// Login Route
userRoutes.route('/login').post(function (req, res) {
    Users.findOne({ username: req.body.username })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(403))
            }
        })
});

// Username validation Route
userRoutes.route('/validateUsername').post(function (req, res) {
    Users.findOne({ username: req.body.username })
        .then(user => user ? res.sendStatus(400) : res.sendStatus(200))
});

// Get all users
userRoutes.route('/all').get(function (req, res) {
    Users.find({}).select({ username: 1, email: 1, created_at: 1, id: 1 }).then((data, err) => err ? res.status(400).send("Error occured") : res.json(data)).catch(err => {
        res.status(400).send("Failed to load to data");
    });
});

module.exports = userRoutes;
