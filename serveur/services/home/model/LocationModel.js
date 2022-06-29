/**
 * @brief Location model: define all location properties
 * @author Alain 
 * @version 1.1.0 
 */
location = new Object()

// init empty location
initLocation = () => {
    location['nom'] =  ''
    location['adress'] = ''
    location['label'] = ''
    location['latitude'] = ''
    location['longitude'] = ''
    return location
}

// create new location object
newLocation  = (name, adress, longitude, latitude, pass) => {
    location['nom'] =  name
    location['adress'] = adress
    location['label'] = pass
    location['latitude'] = latitude
    location['longitude'] = longitude
    return location
}

// location's setter
setName = (name) => { location['nom'] = name }
setLabel = (pass) => { location['label'] = pass }
setAdress = (adress) => { location['adress'] = adress }
setlAtitude = (latitude) => { location['label'] = latitude }
setLongitude = (longitude) => { location['longitude'] = longitude }

// location's getter
getlocation = () => {return location}
getName = () => { return location['nom']}
getLabel = () => { return location['label']}
getAdress = () => { return location['adress']}
getLatitude = () => { return location['label']}
getLongitude = () => { return location['longitude']}

// newLocation('Alain', '6569', 'ssssx', 'pieton')
// console.log(getName())

module.exports = {
    initLocation,
    newLocation,

    setName,
    setLabel,
    setAdress,
    setlAtitude,
    setLongitude,

    getlocation,
    getName,
    getLabel,
    getAdress,
    getLatitude,
    getLongitude,
}