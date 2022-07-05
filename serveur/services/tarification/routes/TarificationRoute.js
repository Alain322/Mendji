
const express = require('express');
const cors = require('cors');

const request = require('request');

const tarifs = express.Router();

require('../controler/TarificationControler')
const model = require('../model/TarificationModel')

tarifs.get('/tarification/location', cors(), async (req, res) => {
  const locations = { 'Douala': 'Yaounde' }
  try {
    res.status(200).json(locations)
    // getAllTarification().then((result) => {
    //     res.status(200).json(result)
    // })
  }
  catch (e) { res.status(400).json({ 'error': `${error}` }) }
})

tarifs.get('/tarification', cors(), async (req, res) => {
  try {
    getAllTarification().then((result) => {
      res.status(200).json(result)
    })
  }
  catch (e) { res.status(400).json({ 'error': `${error}` }) }
})

tarifs.post('/tarification', async (req, res) => {
  var jour = req.body.jour
  var depart = req.body.depart
  var periode = req.body.periode
  var arrive = req.body.arrive

  /* Envoie des donnees au serveur du model de prediction */
  try {
    const options = {
      url: 'http://127.0.0.1:5000/flask',
      headers: {
        'User-Agent': 'request'
      },
      // body: {jour: model.getNumericDay(jour), periode: model.getNumericPeriod(periode), depart: depart, arrive: arrive},
      body: { jour: model.getNumericDay(jour), periode: model.getNumericPeriod(periode), depart: depart, arrive: arrive },
      json: true
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.status(200).send({ 'predict': body['result'] })
        console.log(body['result'])
      }
    }

    request(options, callback);
  }
  catch (e) { res.status(400).json({ 'error': "e"}) }

})


module.exports = tarifs;
