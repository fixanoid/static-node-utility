const express = require('express');
const router = express.Router();
const logger = require('winston');
const fs = require('fs');

let db = require('./db.json');

router.get('/', async (req, res) => {
    res.json(db);
});

router.post('/add', async (req, res) => {
    const enode = req.body['enode'];
    const addr = req.body['addr'];
    const port = req.body['port'];
    const raftport = req.body['raftport'];

    const entry = `enode://${enode}@${addr}:${port}?discport=0&raftport=${raftport}`;

    const index = db.indexOf(entry);

    if (index == -1) {
        db.push(entry);
    }
    
    fs.writeFileSync('db.json', JSON.stringify(db), 'utf8');

    res.json(db);
});

router.post('/remove', async (req, res) => {
    const enode = req.body['enode'];
    const addr = req.body['addr'];
    const port = req.body['port'];
    const raftport = req.body['raftport'];

    const entry = `enode://${enode}@${addr}:${port}?discport=0&raftport=${raftport}`;

    const index = db.indexOf(entry);

    if (index != -1) {
        db.splice(index, 1);
    }

    fs.writeFileSync('db.json', JSON.stringify(db), 'utf8');

    res.json(db);
});

process.on('unhandledRejection', error => {
    logger.error(`unhandledRejection: ${error}`);
});


module.exports = { router: router };
