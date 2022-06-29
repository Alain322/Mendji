const express = require('express')
const md5 = require('md5')

const controler = require('../controler/AuthentificationControler')

const inscription = express.Router();

inscription.get('/inscription', async(request, response) =>{
    try 
    {
        console.log('thennnn')
    }
    catch (error) {
        response.status(400).json({'error': `${error}`})
    }

})

inscription.post('/inscription', async(req, res) => {
    var uname = req.body.uname
    var uphone = req.body.uphone
    var upassw = md5(req.body.upassw)
    var umail = req.body.umail
    var utype = req.body.utype

    try {
        results = controler.createNewUser(uname, uphone, umail, utype, upassw, 'default')
        results.then((result) => {
            if(result.length > 0){
                res.send({
                    pseudo: null, 
                    token: null,
                    state: 'success'
                })
            }
            else{
                res.send({
                    pseudo: null, 
                    token: null,
                    state: 'error'
                })
            }
        }) 
    } catch (error) {
        res.send({
            pseudo: null, 
            token: null,
            state: 'error'
        })
    }
})


module.exports = inscription;
