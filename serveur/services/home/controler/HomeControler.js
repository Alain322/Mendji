/*
 * Controler of the home
 */

const dao_home = require('../model/dao/DaoHome')
const locationModel = require("../model/LocationModel")

getAllLocation = async() => {
    var data = new Object()
    // var data = locationModel.initLocation()
    try {
        var temp_data = new Array()

        const result = await dao_home.fetchAllLocation()

        if(result.length > 0){ 
            
            result.forEach((item, index) => {
                var temp = new Object()
                
                temp['id'] = index
                temp['adresse'] = item['adresse']
                temp['label'] = item['label']
                temp['localisation'] = item['localisation']
                temp['latitude'] = item['latitude']
                temp['longitude'] = item['longitude']
                temp_data.push(temp)
            })
            
            data['data'] = temp_data
            data['success'] = true
        }
        else{   
            data['success'] = false
            data['msgerror'] = 'Aucun lieu trouve'
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
    getAllLocation
}