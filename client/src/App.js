// import logo from './logo.svg';
import React from 'react';

import { useEffect } from 'react';

import './assets/css/bootstrap.min.css'
import './assets/css/App.css'
import './assets/css/authentification.css'
import './assets/css/tarification.css'

import Footer from './components/Footer';
import Tarification from './RouteTarification';
import Home from './RouteHome';
import Itineraire from './RouteItineraire';
import Authentification from './RouteAuthentification';
import Account from './RouteAccount';
// import AutocompleteInput from './components/InputComplete';

// import Equipe from './';
import Session from 'react-session-api'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

Session.set('pseudo', null);
        Session.set('token', null);
        Session.set('state', 'error');
        
function App() {

    useEffect(() => {
        if ((Session.get('state') !== 'success')) {
            Session.set('pseudo', null);
            Session.set('token', null);
            Session.set('state', 'error');
        }
    }, [])
   


    const redirectToHome = () => {
        if (window.location.href === "http://localhost:3000/") {
            return (<Redirect exact from="/" to="/home" />)
        }
    }

    return (
        <div className='main'>
            <BrowserRouter>
                {redirectToHome()}
                <Route path='/home'>
                    <Home />
                </Route>

                <Route path='/tarification'>
                    <Tarification />
                </Route>

                <Route path='/itineraire'>
                    <Itineraire />
                </Route>

                <Route path='/authentification'>
                    <Authentification />
                </Route>

                <Route path='/account'>
                    <Account />
                </Route>
                {/* <Route path='/home' component = {Appe}/> */}

                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;