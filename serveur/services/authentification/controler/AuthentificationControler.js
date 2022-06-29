/*
 * incription route contrler
 */

const auth_factory = require('../model/dao/DaoAuthentification')
const user_model = require('../model/UserModel')

// create new user
connexionUser = async(username, password) => {

    let user = user_model.initUser()
    const result = await auth_factory.authentificationUser(username, password)
    return result
    // try {
    //     if(result.length > 0){ 
            
    //         result.forEach((item, index) => {
    //             // var temp = new Object()
    //             user['nom'] = item['nom']
    //             user['phone'] = item['phone']
    //             user['type'] = item['type']
    //             user['passw'] = item['passw']
    //             user['mail'] = item['mail']
    //         })
            
    //         data['data'] = user
    //         data['success'] = true
    //     }
    //     else{   
    //         data['success'] = false
    //         data['msgerror'] = "tilisateur incorrect"
    //     }
    // } catch (error) {
    //     data['success'] = false
    //     data['msgerror'] = 'Erreur de connexion'
    // }
    // finally{
    //     return data
    // }
}

createNewUser = async(uname, uphone, umail, utype, upassw, utoken) => {
    var data = new Object()
    const result = await auth_factory.registerUser(uname, uphone, umail, utype, upassw, utoken)
    return result
} 

updateUserInfos = async(uname, uphone, umail, utype, oldname, token) => {
    var data = new Object()
    const result = await auth_factory.updateUserInfosByToken(uname, uphone, umail, utype, oldname, token)
    return result
}

fetchUserInfos = async( oldname, token) => {
    var data = new Object()
    const result = await auth_factory.fetchUserInfosByToken(oldname, token)
    return result
}

updateToken = async(uname, upassw, token) => {
    var data = new Object()
    const result = await auth_factory.updateUserToken(uname, upassw, token)
    return result
}  

module.exports = {
    connexionUser,
    createNewUser,
    updateToken,
    updateUserInfos,
    fetchUserInfos
}