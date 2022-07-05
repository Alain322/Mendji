import React from "react";
import { useState, useRef, useEffect } from "react";
import * as Icone from 'react-bootstrap-icons';
import axios from "axios";
import Navigation from './components/Navigation'

import Session from 'react-session-api'
import { useHistory } from "react-router-dom";


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function Authentification() {
    const history = useHistory();

    const [connectionPage, setConnectionPage] = useState(true)
    // Inscription
    const [uname, setUName] = useState('')
    const [umail, setUMail] = useState('')
    const [upassw, setUPassw] = useState('')
    const [utype, setUType] = useState('')
    const [uphone, setUphone] = useState('')
    const [upassw2, setUPassw2] = useState('')

    useEffect(() => {
        // console.log("useeffect");
    }, [])

    const inscriptionSubmitted = () => {
        if (upassw === upassw2) {
            axios.post('http://localhost:4000/inscription', {
                uname: uname,
                upassw: upassw,
                upassw2: upassw2,
                uphone: uphone,
                utype: utype,
                umail: umail,
            }).then((response) => {
                if (response.data.state === 'success') {
                    // Session.set('pseudo', response.data.pseudo);
                    // Session.set('token', response.data.token);
                    // Session.set('state', response.data.state);
                    alert('Inscription reussit')
                    // history.push('/authentification');
                }
            })
        }
        else {
            alert("Les mots de pass ne correspondent pas...")
        }
    }

    // Connexion 

    const [cname, setCName] = useState('')
    const [cpassw, setCPassw] = useState('')

    const connexionSubmitted = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/connexion', {
            cname: cname,
            cpassw: cpassw
        })
            .then((response) => {
                if (response.data.state === 'success') {
                    Session.set('pseudo', response.data.pseudo);
                    Session.set('token', response.data.token);
                    Session.set('state', response.data.state);

                    localStorage.setItem('state', JSON.stringify({ 'state': response.data.state, 'pseudo': response.data.pseudo, 'token': response.data.token }))

                    history.push('/home');
                }
            })
        setCName('')
        setCPassw('')
    }

    // General scroll to element function
    const singin = useRef(null)
    const singup = useRef(null)

    const executeScroll = () => {
        setConnectionPage(!connectionPage)
        if (connectionPage === true) {
            scrollToRef(singin)
        }
        else {
            scrollToRef(singup)
        }
    }

    return (<React.Fragment>


        <Navigation />


        {(connectionPage === true) ?
            (<div className='' ref={singin}>
                <div className='login-section'>
                    <div className='login-article col-lg-5'>
                        <h1>Beneficiez de plus d'offres</h1>
                        <h1><span className='ksecondary-color'>Restez-Connecté</span></h1>

                        <p className="mt-4">
                            Connectez-vous pour beneficier de toutes <br />les fonctionnalites
                        </p>
                    </div>
                    <div className='login-article col-4'>
                        <img className="img-fluid py-2 mx-2 mt-2" src="./img/access_account.svg" alt="Applications mobiles" />
                    </div>
                </div>

                <div className='login-aside col-lg-4'>
                    <form className="box mx-auto mb-auto mt-4">
                        <h1 className="box-title py-3 text-center"> Connexion </h1>
                        <div className="box-input">
                            <Icone.PersonFill color="#05172F" className="icone" />
                            <input type="text" placeholder="Nom d'utilisateur" value={cname} onChange={(e) => { setCName(e.target.value) }} />
                        </div>
                        <div className='box-input'>
                            <Icone.PersonFill color="#05172F" className="icone" />
                            <input type="password" placeholder="Mot de passe" value={cpassw} onChange={(e) => { setCPassw(e.target.value) }} />
                        </div>
                        <button className="box-button" onClick={connexionSubmitted}>Connexion</button>
                        <p className="box-register text-center">Vous êtes nouveau?
                            <button className="btn" onClick={(e) => executeScroll()}>S'inscrire </button></p>
                    </form>
                </div>
            </div>) : (
                <div className='' ref={singup} >
                    <div className='login-section'>
                        <div className='login-article col-5'>
                            <h1>Il est temps de faire partir de notre univers</h1>
                            <h1><span className='ksecondary-color'>Inscrivez-Vous!</span></h1>
                            <p className="mt-4">
                                Inscrivez-vous pour parcourir toutes <br />nos offres
                            </p>
                        </div>
                        <div className='login-article col-4'>
                            <img className="img-fluid py-2 mx-2 mt-2" src="./img/access_account.svg" alt="Applications mobiles" />
                        </div>
                    </div>
                    <div className='login-aside col-5'>
                        <form className="box mx-auto mb-auto mt-4">
                            <h1 className="box-title py-3 text-center"> Inscription </h1>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box-input">
                                        <Icone.PersonFill color="#05172F" className="icone" />
                                        <input type="text" placeholder="Nom d'utilisateur" value={uname} onChange={(e) => { setUName(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="box-input">
                                        <Icone.At color="#05172F" className="icone" />
                                        <input type="email" placeholder="Adresse electronique" value={umail} onChange={(e) => { setUMail(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='box-input'>
                                        <Icone.Phone color="#05172F" className="icone" />
                                        <input type="text" placeholder="Telephone" value={uphone} onChange={(e) => { setUphone(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='box-input'>
                                        <Icone.FileEarmarkPerson color="#05172F" className="icone" />
                                        <input type="text" placeholder="Utilisateur" value={utype} onChange={(e) => { setUType(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='box-input'>
                                        <Icone.Unlock color="#05172F" className="icone" />
                                        <input type="password" placeholder="Mot de passe" value={upassw} onChange={(e) => { setUPassw(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='box-input'>
                                        <Icone.UnlockFill color="#05172F" className="icone" />
                                        <input type="password" placeholder="Confirmez le pass" value={upassw2} onChange={(e) => { setUPassw2(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <button className="box-button" onClick={inscriptionSubmitted}>Inscription</button>
                            <p className="box-register text-center">
                                Vous êtes inscrit?
                                <button className="btn" onClick={(e) => executeScroll()}>Se connecter </button>
                            </p>
                        </form>
                    </div>
                </div>
            )}

    </React.Fragment>
    );
}


export default Authentification