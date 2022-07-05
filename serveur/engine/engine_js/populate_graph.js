'use strict'

/* 
 * Automatic populate Knowledge Graph
*/

const fs = require('fs');
const dao = require('./factory')

let rawdata = fs.readFileSync('datasjson.json');
let dataset = JSON.parse(rawdata);
let locations = []

var j = 0;
for (var item, i = 0; item = dataset[i++];) {
  var tem1 = []
  var tem2 = []
  if (item.Label_d === null || item.Label_d === '')
    item.Label_d = item.Depart

  if (item.Label_a === null || item.Label_d === '')
    item.Label_a = item.Arrive

  tem1 = { id: j, 'lieu': item.Depart, 'label': item.Label_d, 'adresse': item.Adresse_d, 'latitude': item.Latitude_d, 'longitude': item.Longitude_d }
  tem2 = { id: j, 'lieu': item.Arrive, 'label': item.Label_a, 'adresse': item.Adresse_a, 'latitude': item.Latitude_a, 'longitude': item.Longitude_a }
  locations.push(tem1);
  locations.push(tem2);
  j = j + 1
}

var result = [];
// suppression des doublons
locations.filter((item, pos, self) => {
  if (self.findIndex(v => v.lieu.toLowerCase() === item.lieu.toLowerCase()) === pos) {
    result.push(self[pos])
    // console.log(self[pos])
  }
});

/* 
 * Automatic populate knowledge Graph with Location 
*/
var donn 
const session = dao.driver.session(dao.getDBName())

const populateKnowledgeGraphLocations = async (datass) => {
  result = datass
  const session = dao.driver.session(dao.getDBName())
  for (var item = 0; item <= (result.length - 1); item++) {
    console.log(item)
    await session.run(`CREATE (:Location{adresse: "${result[item].lieu}", label: ["${result[item].label}"], localisation: "${result[item].adresse}", latitude: "${result[item].latitude}", longitude: "${result[item].longitude}"})`)
  }
  session.close()
  console.log('end')
}

/* 
 * Automatic populate knowledge Graph with relation 
*/
const populateKnowledgeGraphRelation = async (datass) => {
  result = datass
  const session = dao.driver.session(dao.getDBName())
  var res
  var r1
  var r2
  for (var item = 0; item <= (result.length - 1); item++) {
    console.log(item)
    res = await session.run(`MATCH (start:Location{adresse: "${result[item].Depart.toLowerCase()}"}), (end:Location{adresse: "${result[item].Arrive.toLowerCase()}"}) RETURN start, end`)
    if (res.records[0] !== undefined) {
      r1 = res.records[0]._fields[0].properties
      r2 = res.records[0]._fields[0].properties
      await session.run(`MATCH (start:Location{adresse: "${result[item].Depart.toLowerCase()}"}), (end:Location{adresse: "${result[item].Arrive.toLowerCase()}"})  CREATE (start)-[:DRIVE_TO{jour: "${result[item].Jour}", periode: "${result[item].Periode.toLowerCase()}", depart: ["${r1.adresse}", "${r1.latitude}", "${r1.longitude}"], arrive: ["${r2.adresse}", "${r2.latitude}", "${r2.longitude}"], cout: "${result[item].Cout}",  distance: "${result[item].distance}", trafic: "${result[item].Trafic.toLowerCase()}", route: "${result[item].Route.toLowerCase()}", duree: "${result[item].Duree}"}]->(end)`)
      // await session.run(`MATCH (start:Location{adresse: "${result[item].Depart.toLowerCase()}"}), (end:Location{adresse: "${result[item].Arrive.toLowerCase()}"})  CREATE (start)-[:DRIVE_TO{jour: "${result[item].Jour}", periode: "${result[item].Periode.toLowerCase()}", depart: "${r1}", arrive: "${r2}", cout: "${result[item].Cout}",  distance: "${result[item].distance}", trafic: "${result[item].Trafic.toLowerCase()}", route: "${result[item].Route.toLowerCase()}", duree: "${result[item].Duree}"}]->(end)`)
    } // await session.run(`MATCH (start:Location{adresse: "${result[item].Depart.toLowerCase()}"}), (end:Location{adresse: "${result[item].Arrive.toLowerCase()}"})  CREATE (start)-[:DRIVE_TO{jour: "${result[item].Jour}", periode: "${result[item].Periode.toLowerCase()}", depart: "${result[item].Depart.toLowerCase()}", arrive: "${result[item].Arrive.toLowerCase()}", cout: "${result[item].Cout}",  distance: "${result[item].distance}", trafic: "${result[item].Trafic.toLowerCase()}", route: "${result[item].Route.toLowerCase()}", duree: "${result[item].Duree}"}]->(end)`)
  }
  session.close()
  console.log('end')
}

/* 
 * Creation de tous les lieux et des relation 
*/

// populateKnowledgeGraphLocations(result)

populateKnowledgeGraphRelation(dataset)