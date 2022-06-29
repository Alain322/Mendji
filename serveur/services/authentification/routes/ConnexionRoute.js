const express = require('express');
const bcrypt = require('bcrypt')
const md5 = require('md5')
const controler = require('../controler/AuthentificationControler')

const session = require('express-session')
const cookieParser = require('cookie-parser')

const connexion = express.Router();
const app = express()

const SALT_PASS_ROUND = 1

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

var expiryDate = new Date(Date.now() + 60 * 60 * 100);

connexion.get('/connexion', async (request, response) => {
    try {
        console.log('')
    }
    catch (error) {
        response.status(400).json({ 'error': `${error}` })
    }

})

connexion.post('/connexion', (req, res) => {
    const cname = req.body.cname
    const cpassw = md5(req.body.cpassw)
    const userinfos = []
    const ctoken = md5(cname + '' + Math.random() + '' + req.body.cpassw)

    // console.log()
    // console.log(cpassw)
    // req.session.user = { pseudo: cname, token: md5('' + Math.random() + '') }
    console.log(req.session)
    try {
        results = controler.updateToken(cname, cpassw, ctoken)
        results.then((result) => {
            if (result.length > 0) {
                res.send({
                    pseudo: result[0].uname,
                    token: result[0].utoken,
                    state: 'success'
                })
            }
            else {
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


module.exports = connexion;
