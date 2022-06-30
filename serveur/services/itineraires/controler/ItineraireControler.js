/*
 * Controler of tarification service
 */

const dao_itineraire = require('../model/dao/DaoItineraire')

getAllLocations = async () => {
    var data = new Object()
    try {
        var temp_data = new Array()
        const result = await dao_itineraire.fetchAllLocations()
        if (result.length > 0) {
            var temp = new Array()
            result.forEach((item, index) => {
                if (index !== 0) {
                    temp_data.push(item)
                }
            })
            
            // supression des doublons
            temp_data.filter((item, pos, self) => {
               
                    if (self.findIndex(v => v.lieu.toLowerCase() === item.lieu.toLowerCase()) === pos) {
                        temp.push(self[pos])
                    }
            });
            
            data['data'] = temp
            data['success'] = true
        }
        else {
            data['success'] = false
            data['msgerror'] = ''
        }
    } catch (error) {
        data['success'] = false
        data['msgerror'] = ''
    }
    finally {
        return data
    }
}
/*
getAllTrajets = async() => {
    var data = new Object()
    try {
        var temp_data = new Array()

        const result = await dao_itineraire.fetchAllTrajets()

        if(result.length > 0){ 
            
            result.forEach((item, index) => {
                var temp = new Object()
                temp['cout'] = item['tarif'].low
                temp['depart'] = item['depart']
                temp['arrive'] = item['arrive']
                temp_data.push(temp)
            })
            
            data['data'] = temp_data
            data['success'] = true
        }
        else{   
            data['success'] = false
            data['msgerror'] = 'Aucun trajet disponible'
        }
    } catch (error) {
        data['success'] = false
        data['msgerror'] = 'Erreur de chargement'
    }
    finally{
        return data
    }
} 
*/
module.exports = {
    // getAllTrajets,
    getAllLocations
}