const express = require('express');
const bcrypt = require('bcrypt')
const controler = require('../controler/AuthentificationControler');
const { session } = require('neo4j-driver');

const connexion = express.Router();

const SALT_PASS_ROUND = 2

connexion.get('/session', async(request, response) =>{
    try 
    {
        // res.send()
    }
    catch (error) {
        response.status(400).json({'error': `${error}`})
    }

})

connexion.post('/session', (req, res) => {
    // console.log('acc')
    const {connexionState} = req.body
    console.log(connexionState)
    try {
        res.send({"connexion": "success"})
    } catch (error) {
        res.send({"connexion": "error"})
    }
})


module.exports = connexion;
