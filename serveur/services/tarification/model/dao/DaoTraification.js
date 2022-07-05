
const dao = require('./DaoFactory')

const fetchRecommandTarif = async (depart, arrivee)=>{
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Location{nom: '${depart}'})-[trajet:TRAJET]->(end:Location{nom: '${arrivee}'}) RETURN trajet`)
    // return result.records.map()
    return result.records.map(i => i.get('trajet').properties)
}

// fetch all Lieu
const fetchAllTarifs = async () => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Location)-[trajet:TRAJET]->(end:Location) RETURN trajet`)
    session.close()
    return result.records.map(i => i.get('trajet').properties)
}

// le tarif entre 02 lieu
const fetchTarifByLieu = async (depart, arrive) => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (start:Location{nom: '${depart}'})-[trajet:TRAJET]->(end:Location{nom: '${arrive}'}) RETURN start.nom AS Depart, end.nom AS Arrive, trajet.tarif AS Tarif`)
    session.close()
    return result.records.map(i => i.get('n').properties)
}

//  fetch single location
const fetchSingleLocation = async (location_name) => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (location:Location{nom : ${location_name}})`)
    return result.records.map(i => i.get('location').properties)
    session.close()
}
module.exports = {
    fetchAllTarifs,
    fetchTarifByLieu,
    fetchRecommandTarif,
    fetchSingleLocation
};
