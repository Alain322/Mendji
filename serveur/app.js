
require('dotenv').config()
const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');

const session = require('express-session')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

// Connexion du back et du front
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"],
    credentials: true
}))
 
// app.use(cookieParser())
// app.use(express.urlencoded({extended: true}))

// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

// app.use(
//     session({  
//         key: "userId",
//         secret: "subscribe",
//         resave: false,
//         saveUninitialized: false,  
//         cookie:
//         {
//             maxAge: expiryDate
//         }
//     })
// );
/* Define All Routes app */

const homeRoute = require('./services/home/routes/HomeRoute')
const tarificationRoute = require('./services/tarification/routes/TarificationRoute')
const itineraireRoute = require('./services/itineraires/routes/ItineraireRoute')
const connexionRoute = require('./services/authentification/routes/ConnexionRoute')
const sessionRoute = require('./services/authentification/routes/SessionRoute')
const inscriptionRoute = require('./services/authentification/routes/InscriptionRoute')
const accountRoute = require('./services/authentification/routes/AccountRoute')

// const r_single_it = require('./routes/single_it')
// const r_multiple_it = require('./routes/multiple_it')

app.use(
    session({  
        // key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: true,  
        cookie:
        {
            maxAge: 3600,
            httpOnly: true
        }
    })
);


app.use('/', homeRoute)
app.use('/', tarificationRoute)
app.use('/', itineraireRoute)
app.use('/', connexionRoute)
app.use('/', sessionRoute)
app.use('/', inscriptionRoute)
app.use('/', accountRoute)


var axios = require('axios');

// app.get('/home', (req, res) => {
//     // console.log(req.session.user)
//     // if(req.session.user === 'undefined'){
//     //     res.json({login: false, user: 'inconu'})
//     // }
//     // else{
//     //     res.send({login: true, user: req.session.user})
//     // }
// })

// app.post('/home', (req, res) => {
//     // var cname = req.body.cname
//     // if(cname !== ''){
//     //     // req.session.user = cname 
//     //     console.log(req.session)
//     // }
//     console.log(req.body.jour)
// })

// app.post('/home', (req, res) => {
    
// })

app.get('*', (req, res) => {
    res.send('Impossible')
})

app.use((_, res) => res.redirect("/"))

app.listen(PORT, ()=>{console.log(`server listening at ${PORT}`)})