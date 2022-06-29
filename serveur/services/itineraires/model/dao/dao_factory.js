
const neo4j = require('neo4j-driver')
require('dotenv').config()

const { url, usern, passw, database } = process.env

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo'))

const DB_NAME = 'trajetdb'

const getDBName = () => {
    return DB_NAME
}

module.exports = {driver, getDBName}