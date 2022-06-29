
const driver = require('./factory')
const DB_NAME = 'trajetdb'

const fetchAllTrajets = async () => {
    const session = driver.session(DB_NAME)
    const result = await session.run(`MATCH (start:Lieu)-[trajet:TRAJET]->(end:Lieu) LIMIT 5 RETURN trajet`)
    return result.records.map(i => i.get('trajet').properties)
    session.close()
}


fetchAllTarification = async() => {
    
    var temp_data = new Array()
    data = new Object()
    try {

        const result = await fetchAllTrajets()

        if(result.length > 0){ 
            
            result.forEach((item, index) => {
                var temp = new Object()
                temp['cout'] = item['tarif'].low
                temp['depart'] = item['depart']
                temp['arrive'] = item['arrive']
                temp_data.push(temp)
            })
        }
        else{   
            data['success'] = false
            data['msgerror'] = 'Aucun trajet disponible'
        }
    } catch (error) {
        data['success'] = false
        data['msgerror'] = 'Erreur de chargement'
    }

} 

fetchAllTarification().then((result) => {
            // response.send({
            //     data: result['data']
            // })
            console.log()
        })
