const express = require('express')
const md5 = require('md5')

const controler = require('../controler/AuthentificationControler')

const inscription = express.Router();

inscription.get('/account', async(request, response) =>{
    try 
    {
        console.log('thennnn')
    }
    catch (error) {
        response.status(400).json({'error': `${error}`})
    }

})

inscription.post('/account', async(req, res) => {
    var setup = req.body.setup
    if(setup === true){    
        var accName = req.body.uname
        var accPhone = req.body.uphone
        var accMail = req.body.umail
        var accType = req.body.utype
        var accOldName = req.body.oldname
        var accToken = req.body.utoken

        try {
            results = controler.updateUserInfos(accName, accPhone, accMail, accType, accOldName, accToken)
            results.then((result) => {
                if(result.length > 0){
                    res.send({
                        user: result[0],
                        state: 'success'
                    })
                }
            }) 
        } catch (error) {
            console.log(error)
        }
    }
    if(setup === false){
        var accOldName = req.body.oldname
        var accToken = req.body.utoken
        try {
            results = controler.fetchUserInfos(accOldName, accToken)
            results.then((result) => {
                if(result.length > 0){
                    res.send(result[0])
                }
            }) 
        } catch (error) {
            console.log(error)
        }
    }
})


module.exports = inscription;
