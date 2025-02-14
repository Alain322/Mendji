
const express = require('express');
const cors = require('cors');
const request = require('request');
const trajet = express.Router();

let controler = require('../controler/ItineraireControler')

trajet.get('/itineraire/location', async(req, res) => {

  try{
    controler.getAllLocations().then((result) => {
      res.json(result)
    })
  }
  catch(e){ res.status(400).json({'error': `${error}`})}
})

trajet.get('/itineraire', cors(), async(req, res) => {
    try{
      getAllLocations().then((result) => {
            res.json(result)
        })
    }
    catch(e){ res.status(400).json({'error': `${error}`})}
})

trajet.post('/itineraire', async(req, res) => {
  var jour = req.body.jour
  var depart = req.body.depart
  var periode = req.body.periode
  var arrive = req.body.arrive

//   console.log(`Jour: ${jour} \nPeriode: ${periode}`)

const options = {
    url: 'http://127.0.0.1:5000/itineraireinfos',
    headers: {
      'User-Agent': 'request'
    },
    body: {depart: depart, arrive: arrive},
    json: true
};
   
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body['result'])
      console.log(body['result'])
    }
}
   
request(options, callback);

// controler.getAllTrajets()
//     .then((result) => {
//         res.send(result)
//     })
  
})

module.exports = trajet;
