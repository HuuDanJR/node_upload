const body_parser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const app = express();
require('dotenv').config();

// Middleware setup
app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());
const server = http.createServer(app);
//routes
const appRouter = require('./router');
app.set('json spaces', 5); // to pretify json response


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.use('/', appRouter);

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
    console.log(`Node Upload Server: ${PORT}`);
});

