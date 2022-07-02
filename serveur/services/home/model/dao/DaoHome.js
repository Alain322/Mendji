
const dao = require('./DaoFactory')

// fetch all location
const fetchAllLocation = async () => {
    const session = dao.driver.session(dao.getDBName())
    const result = await session.run(`MATCH (location:Location) RETURN location`)
    return result.records.map(i => i.get('location').properties)
    session.close()
}

module.exports = {
    fetchAllLocation
};
