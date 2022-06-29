
import React from "react";
import { useState, useEffect } from "react";
import * as Icone from 'react-bootstrap-icons';
import axios from "axios";
import $ from 'jquery'
import Navigation from './components/Navigation'

import { useHistory } from "react-router-dom";

import Session from 'react-session-api'
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 

function Account(){

    const history = useHistory();

    const [isPayementContainerVisible, setPayementContainerVisible] = useState(false)
    const [isEditProfilVisible, setEditProfilVisible] = useState(false)
    const [isShowProfilVisible, setShowProfilVisible] = useState(true)
    // Inscription
    const [uname, setUName] = useState('')
    const [umail, setUMail] = useState('')
    const [upassw, setUPassw] = useState('')
    const [utype, setUType] = useState('')
    const [uphone, setUphone] = useState('')
    // const [upassw2, setUPassw2] = useState('')
    
    useEffect(() => {
        if((Session.get('state') === 'error') && (Session.get('token') === null)){
            history.push('/authentification');
        }
        else{               
            axios.post('http://localhost:4000/account', {
                oldname: Session.get('pseudo'),
                utoken: Session.get('token'),
                setup: false
            })
            .then((response) => {
                setUName(response.data.uname)
                setUMail(response.data.umail)
                setUPassw(response.data.upassw)
                setUphone(response.data.uphone)
                setUType(response.data.utype)
             })
        }
    }, [history])

    const updateBtnSubmitted = () => {
        axios.post('http://localhost:4000/account', {
            uname: uname,
            oldname: Session.get('pseudo'),
            utoken: Session.get('token'),
            uphone: uphone,
            utype: utype,
            umail: umail,
            setup: true
        })
        .then((response) => {
            // history.pushState(null, '/');
            // history.pushState(null, '/account');
            
            Session.set('pseudo', response.data.user.pseudo);
            Session.set('token', response.data.user.token);
            Session.set('state', response.data.state);

            // window.location.reload();
            setEditProfilVisible(!isEditProfilVisible)
         })
    }

    const [payprice, setPPrice] = useState('')
    const [paypassw, setPPassw] = useState('')
    const [payphone, setPPhone] = useState('')
    const [paycomment, setPComment] = useState('')

    const payementProcess = (e) => {
        e.preventDefault()
        // var params = {
        //         // Request parameters
        // };
          
            $.ajax({
                url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
                beforeSend: function(xhrObj){
                    // Request headers
                    xhrObj.setRequestHeader("Authorization","Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjM4OTM2YWE3LTk3NjUtNDE2OC04MzI2LTM1NTkyMDlhNTkyMSIsImV4cGlyZXMiOiIyMDIyLTA2LTA3VDExOjM1OjI3LjIwNCIsInNlc3Npb25JZCI6IjRkMTZhOTkzLTQ0YmItNDhkYy1iZGE3LTI2ZjA2YWIyZTA0YiJ9.NC57PlQn07szMzPAXeI7AGiJHCEnHXzO_IpiAGwM3J_XMu96DzaIT24iTuJtk7xrQ60RgeGJ0RC-r94c-LMjIFbgGsDXQ8Tu1RGwPTVYq1dyymE39cGlt4ZCJtIKH3xyebZXo2x6gIW33NZOSvudQRRTonC4KKX-5MQhqDtBPigQKywEk3Rnw8rgqaFu-R_hQy1XtmLfet_0GulMLq6nkPLGodb_OEjW3M3AYSSHY56tX-pUd8VuA7nuCRnwv0hNDL7PlRftT8SqNvomYQw_KjuHmqtzgpvPyvEF7rLiK3HOrP9jAjA--4vAZJz-V8BolWXOUCAEVsirA2Upk2ILWg");
                    
                    xhrObj.setRequestHeader("X-Reference-Id","38936aa7-9765-4168-8326-3559209a5921");
                    xhrObj.setRequestHeader("X-Target-Environment","sandbox");
                    // xhrObj.setRequestHeader("X-Callback-Url","");
                    xhrObj.setRequestHeader("Content-Type","application/json; charset=utf-8");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","4d37736dfa204af29f02b8c13ace7642");
                },
                type: "POST",
                data: {
                    "amount": payprice,
                    "currency": "EUR",
                    "externalId": paypassw,
                    "payer": {
                      "partyIdType": "MSISDN",
                      "partyId": payphone
                    },
                    "payerMessage": paycomment,
                    "payeeNote": "OKI"
                  },
            })
            .done(function(data) {
                alert("payement reussit");
            })
            .fail(function(response) {
                alert('payement reussit');
                // var newLine = "\r\n"
                // var message = "ASPSnippets offers free ASP.Net"
                // message += newLine;
                // message += "Code Snippets, Tutorials, Articles,";
                // message += newLine;
                // message += "Technical Stuff, Tips, Solutions";
                // message += newLine;
                // message += "and much more.";
                // alert(message);
            });

            axios.post('http://localhost:4000/connexion', {
                pprice: payprice,
                pphone: payphone,
                ppassw: paypassw,
                pcomment: paycomment,
            })
            .then((response) => {})
            setPComment('')
            setPPassw('')
            setPPhone('')
            setPPrice('')
    }
    
    // const singin = useRef(null)
    // const singup = useRef(null)

    // const executeScroll = () => {
    //     setConnectionPage(!connectionPage)
    //     if(connectionPage === true){
    //         scrollToRef(singin)
    //     }
    //     else{
    //         scrollToRef(singup)
    //     }
    // }
    const closePayement = (e)  => {
        setPayementContainerVisible(false)
    }

    const menuButtonClicked = (e, btn) => {
        e.preventDefault()
        // alert();
        if(btn === 'profil'){
            setShowProfilVisible(true)
            setPayementContainerVisible(false)
            setEditProfilVisible(false)
        }
        else if(btn === 'edit'){
            setShowProfilVisible(false)
            setPayementContainerVisible(false)
            setEditProfilVisible(true)
        }
        else{
            setShowProfilVisible(true)
            setPayementContainerVisible(true)
        }
    }

    return (
        <React.Fragment>
            <Navigation/>

            {(isPayementContainerVisible === true)?
                    (<div className="payement-main-container">
                        <div className="payement-container">
                            <span className="close-payement" onClick={(e) => {closePayement(e)}}>x</span>
                            
                            <div className="payement-header">
                                <h3 className="title-payement"> Espace de payement </h3>
                            </div>
                            <div className="payement-section">
                                <div className="row">
                                    <div className="col-lg-4">
                                        Montant (XAF)
                                    </div>
                                    <div className="col-lg-8">
                                        {/* <form className="box mx-auto"> */}
                                        <div className="box-input">
                                            {/* <Icone.PersonFill color="#05172F" className="icone"/> */}
                                            <input type="number" placeholder="Montant net a debiter" value={payprice} onChange={(e) => { setPPrice(e.target.value) }}/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-lg-4">
                                        Telephone
                                    </div>
                                    <div className="col-lg-8">
                                        <div className='box-input'>
                                            <input type="number" placeholder="Telephone" value={payphone} onChange={(e) => { setPPhone(e.target.value) }}/>
                                            {/* <input type="number" placeholder="Telephone" value={payphone} onChange={(e) => { setPPhone(e.target.value) }}/> */}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-lg-4">
                                        Mot de passe
                                    </div>
                                    <div className="col-lg-8">
                                        <div className='box-input'>
                                            <input type="password" placeholder="Mot de passe" value={paypassw} onChange={(e) => { setPPassw(e.target.value) }}/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-lg-4">
                                        Objet
                                    </div>
                                    <div className="col-lg-8">
                                        <div className='box-input'>
                                            <textarea value={paycomment} placeholder="Objet du payement (optionnel)" onChange={(e) => { setPComment(e.target.value) }}></textarea>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-lg-4">
                                        
                                    </div>
                                    <div className="col-lg-8">
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                            <div>
                            
                            </div>
                            <div className="payement-footer">
                                {/* <div className="col-lg-">
                                    <button className="box-button-cancel" onClick={connexionSubmitted}>Payement</button>
                                </div> */}
                                <div className="rigth-float">
                                    <button className="box-button-cancel"  onClick={(e) => {closePayement(e)}}>Annuler</button>
                                    <button className="box-button" onClick={(e) => payementProcess(e)}>Payement</button>
                                </div>
                            </div>
                        </div>
                    </div>):
                    (null)
                }
            <div className="account">
                <div className="acc-section">
                    <div className="acc-aside col-lg-3">
                        <div className="acc-paystate">
                            <h2>Etat du compte</h2>
                            <div className="acc-paystate-bloc">
                                <img className="img" src="./img/mastercard.png" alt="Applications mobiles" />  
                                <div>
                                    <span className="ksecondary-color">Compte Active</span> <br/>
                                    <span className="kaccent-green-color">Compte a Jour</span>
                                </div>
                            </div>
                        </div>

                        <div className="acc-aside-menu">
                            <div className="acc-aside-menu-option">
                                <div className="acc-aside-menu-btn" onClick={(e) => {menuButtonClicked(e, 'profil')}}>
                                    <Icone.PersonFill className="icone"/>
                                    <span>Profil</span>
                                </div>
                                <div className="acc-aside-menu-btn" onClick={(e) => {menuButtonClicked(e, 'payement')}}>
                                    <Icone.Paypal className="icone"/>
                                    <span>Payements</span>
                                </div>
                                <div className="acc-aside-menu-btn" onClick={(e) => {menuButtonClicked(e, 'edit')}}>
                                    <Icone.GearFill className="icone"/>
                                    <span>Parametres</span>
                                </div>
                                <div className="acc-aside-menu-btn">
                                    <Icone.InfoCircle className="icone"/>
                                    <span>Notifications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="acc-article col-lg-9">
                        <div className="acc-header">
                            <div className="acc-title">
                                
                            </div>
                            <div className="acc-subtitle">
                                <div className="acc-profil-img">
                                    <img className="img" src="./img/mastercard.png" alt="Applications mobiles" />  
                                </div>
                                <div className="acc-profil-detail">
                                    <h3>{Session.get('pseudo')}<span className="kaccent-green-color"></span></h3>
                                    <span className="kaccent-green-colo">@{Session.get('pseudo')} </span>
                                    <div className="acc-profil-item">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="acc-container">
                            {isEditProfilVisible === true? 
                            (
                                <div className="col-lg-7 mx-auto">
                                    <form className="box">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="box-input">
                                                    <Icone.PersonFill color="#05172F" className="icone"/>
                                                    <input type="text" placeholder="Nom d'utilisateur" value={uname} onChange={(e) => { setUName(e.target.value) }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="box-input">
                                                    <Icone.At color="#05172F" className="icone"/>
                                                    <input type="email" placeholder="Adresse electronique" value={umail} onChange={(e) => { setUMail(e.target.value) }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className='box-input'>
                                                    <Icone.Phone color="#05172F" className="icone"/>
                                                    <input type="text" placeholder="Telephone" value={uphone} onChange={(e) => { setUphone(e.target.value) }}/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className='box-input'>
                                                    <Icone.FileEarmarkPerson color="#05172F" className="icone"/>
                                                    <input type="text" placeholder="Utilisateur" value={utype} onChange={(e) => { setUType(e.target.value) }}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-lg-12">
                                                <div className='box-input'>
                                                    <Icone.Unlock color="#05172F" className="icone"/>
                                                    <input type="password" placeholder="Nouevau mot de passe" value={upassw} onChange={(e) => { setUPassw(e.target.value) }}/>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="row">
                                            <div className="col-lg-12">
                                                <div className='box-input'>
                                                    <Icone.UnlockFill color="#05172F" className="icone"/>
                                                    <input type="password" placeholder="Confirmation" value={upassw2} onChange={(e) => { setUPassw2(e.target.value) }}/>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            <div className="col-lg-6">
                                                {/* <button className="box-button-cancel">Annuler</button>  */}
                                                <button className="box-button-cancel" onClick={(e) => {
                                                    setEditProfilVisible(!isEditProfilVisible)
                                                }}>Annuler</button> 
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="box-button" onClick={updateBtnSubmitted}>Modifier</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>):
                                (null)}
                        </div>
                    </div>
                </div>

                <div className="acc-footer"></div>
            </div>
        </React.Fragment>
    );
}


export default Account