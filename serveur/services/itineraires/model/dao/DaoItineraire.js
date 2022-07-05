const dao = require('./DaoFactory')


// selection de tous les Lieux
const fetchAllLocations = async () => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (place:Location) RETURN place`)
    session.close()
    return result.records.map(i => i.get('place').properties)
}

//  Ajout d'un nouveau trajet a partir d'un depart et d'une destination
const addNewTrajet = async (depart, arrive, trajets) => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session
    .run(`MATCH (start:Location{adresse: ${depart}}), (end:Location{adresse: ${end}}) CREATE (start)-[trajet:DRIVE_TO{depart: start.adresse, arrive: end.adresse, tarif: ${trajets['tarif']}, periode: ${trajets['periode']}, jour: ${trajets['jour']}, embouteillage: ${trajets['embouteillage']}, duree: ${trajets['duree']}, route: ${trajets['route']}}]`)
}
// selection de tous les trajets
const fetchAllTrajets = async () => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Location)-[trajet:DRIVE_TO]->(end:Location) RETURN trajet`)
    session.close()
    return result.records.map(i => i.get('trajet').properties)
}

// selection de tous les trajets a partir d'un location de depart et une destination
const fetchTrajetsByLocation = async (depart, arrive) => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Location{adresse: '${depart}'})-[trajet:DRIVE_TO]->(end:Location{adresse: '${arrive}'}) RETURN start.nom AS Depart, end.adresse AS Arrive, trajet.tarif AS Tarif`)
    session.close()
    return result.records.map(i => i.get('n').properties)
}

module.exports = {
    fetchAllTrajets,
    fetchTrajetsByLocation,
    addNewTrajet,
    fetchAllLocations
};