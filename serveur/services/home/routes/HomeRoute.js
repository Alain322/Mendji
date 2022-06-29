
const express = require('express');
const cors = require('cors');

const request = require('request');

const home = express.Router();

require('../controler/HomeControler')


home.get('/home', cors(), async(req, res) => {
    try{
        getAllLocation().then((result) => {
            // res.json(result)
            res.send(result)
        })
    }
    catch(e){ res.status(400).json({'error': `${error}`})}
})

home.post('/home', async(req, res) => {})

module.exports = home;
