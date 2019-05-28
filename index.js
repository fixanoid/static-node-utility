const express = require('express');
const app = express();
const winston = require('winston');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

winston.configure({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => { return `${info.timestamp} ${info.level}: ${info.message}`; })
    ),
    transports: [
        new winston.transports.Console({
            level: 'error'
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'ssu.log',
            handleExceptions: true,
            json: true,
            maxsize: (5 * 1024 * 1024),
            maxFiles: 5
        })
    ]
});

// Routers
var api = require('./api');

// Mappings
app.use('/api', api.router);

app.listen(3000, () => winston.info('Application initialized'));
