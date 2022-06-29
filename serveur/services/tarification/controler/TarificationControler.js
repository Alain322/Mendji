/*
 * Controler of tarification service
 */

const dao_tarif = require('../model/dao/dao_tarification')

// retourne la liste des tarif en fonction des depart et des arrivees



getSingleLocation =  async() =>{
    data = new Object()
    try{
        const result = await dao_tarif.fetchSingleLocation()
        data['data'] = result
        return data
    } catch (error) {
        data['success'] = false
        data['msgerror'] = 'Erreur de chargement'
    }
}

getAllTarification = async() => {
    var data = new Object()
    try {
        var temp_data = new Array()

        const result = await dao_tarif.fetchAllTarifs()

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

module.exports = {
    getAllTarification
}