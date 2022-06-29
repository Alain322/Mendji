const dao = require('./DaoFactory')


// selection de tous les Lieux
const fetchAllLocations = async () => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (place:Lieu) RETURN place`)
    session.close()
    return result.records.map(i => i.get('place').properties)
}

//  Ajout d'un nouveau trajet a partir d'un depart et d'une destination
const addNewTrajet = async (depart, arrive, trajets) => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session
    .run(`MATCH (start:Lieu{nom: ${depart}}), (end:Lieu{nom: ${end}}) CREATE (start)-[trajet:TRAJET{depart: start.nom, arrive: end.nom, tarif: ${trajets['tarif']}, periode: ${trajets['periode']}, jour: ${trajets['jour']}, embouteillage: ${trajets['embouteillage']}, duree: ${trajets['duree']}, route: ${trajets['route']}}]`)
}
// selection de tous les trajets
const fetchAllTrajets = async () => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Lieu)-[trajet:TRAJET]->(end:Lieu) RETURN trajet`)
    session.close()
    return result.records.map(i => i.get('trajet').properties)
}

// selection de tous les trajets a partir d'un location de depart et une destination
const fetchTrajetsByLocation = async (depart, arrive) => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Lieu{nom: '${depart}'})-[trajet:TRAJET]->(end:Lieu{nom: '${arrive}'}) RETURN start.nom AS Depart, end.nom AS Arrive, trajet.tarif AS Tarif`)
    session.close()
    return result.records.map(i => i.get('n').properties)
}

module.exports = {
    fetchAllTrajets,
    fetchTrajetsByLocation,
    addNewTrajet,
    fetchAllLocations
};