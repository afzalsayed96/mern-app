const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const next = require('next')
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./src/api/DB.js');
const userRoutes = require('./src/api/route');

mongoose.Promise = global.Promise;

const connectWithRetry = () => {
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
        () => { console.log('Database is connected') },
        err => {
            console.log('Can not connect to the database' + err)
            setTimeout(connectWithRetry, 5000)
        }
    );
}

connectWithRetry();

app.prepare().then(() => {

    server.get('/', (req, res) => {
        return app.render(req, res, '/index', req.query)
    })

    server.get('/create', (req, res) => {
        return app.render(req, res, '/create', req.query)
    })

    server.get('/login', (req, res) => {
        return app.render(req, res, '/login', { id: req.params.id })
    })

    server.get('/export', (req, res) => {
        return app.render(req, res, '/export', { id: req.params.id })
    })
    if (dev) server.use(cors());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use('/users', userRoutes)
    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})


