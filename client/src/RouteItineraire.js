import React from "react"

import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import * as Icone from 'react-bootstrap-icons';
import RoundSeparator from './components/utils'

import AutocompleteInput from './components/InputComplete'

import Session from 'react-session-api'
import { useHistory } from "react-router-dom";

import AppMap from "./routing/Map"

import Navigation from './components/Navigation'


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 

function Itineraire() {
    // form useref
    const inputJour = useRef('')
    const inputPeriode = useRef('')
    const inputDepart = useRef('')
    const inputArrive = useRef('')
    const refStartMap = useRef(null)
    /* Listening handler change */
    const [jour, setJour] = useState('Lundi')
    const [periode, setPeriode] = useState('6H-10H')
    // const [depart, setDepart] = useState('')
    // const [arrive, setArrive] = useState('')
    // const [predictionCout, setPredictionCout] = useState('')
    // const [queryLocation, setQueryLocation] = useState('')
    const [locations, setAllocations] = useState(null)
    const [btnPredictClicked, setBtnPredictClicked] = useState(false)
    const [recResultData, setRecResultData] = useState(null)

    const setArrive = (val) => {
        inputArrive.current.value = val
    }

    const setDepart = (val) => {
        inputDepart.current.value = val
    }
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:4000/itineraire/location').then(
        (response) => {
            // queryLocation = response.data.data
            setAllocations(response.data.data)
        })
        
        // if(Session.get('state') === 'error'){
        //     history.push('/authentification');
        // }
        setBtnPredictClicked(false)
    }, [])

    const [points, setPoints] = useState([])
    const updatePoints = (pts) => {
        let pnts = []
        pnts = points
        pnts.push(pts)
        setPoints(pnts)
    }
    // const points = [
    //     {'latitude': 3.9328292, 'longitude': 11.5223294843}, 
    //     {'latitude': 3.9149771, 'longitude': 11.5252810487}
    // ]
    /* Envoie des donnees vers le server */
    const sendDataRecommandation = async(e) => {
        e.preventDefault()
        setBtnPredictClicked(true)

                
        let isTrueLocation = false
        let isTrueDepart = false
        let isTrueArrive = false
        let coordDepart =  {}
        let coordArrive =  {}
        let i = 0
        
        while((i < locations.length) && isTrueLocation === false){

            if(locations[i].lieu.toLowerCase() === inputDepart.current.value.toLowerCase()){
                coordDepart['latitude'] = locations[i].latitude
                coordDepart['longitude'] = locations[i].longitude

                isTrueDepart = true
            }
            if(locations[i].lieu.toLowerCase() === inputArrive.current.value.toLowerCase()){
                coordArrive['latitude'] = locations[i].latitude
                coordArrive['longitude'] = locations[i].longitude
                isTrueArrive = true
            }

            if(isTrueArrive === true && isTrueDepart === true){
                updatePoints(coordDepart)
                updatePoints(coordArrive)
                // points.push(coordDepart)
                // points.push(coordArrive)
                isTrueLocation = true
            }

            i = i + 1
        }

        if(isTrueLocation === true){
            // axios.post('http://localhost:4000/tarification', {
            //     jour: inputJour.current.value,
            //     periode: inputPeriode.current.value,
            //     // depart: coordDepart,
            //     // arrive: coordArrive
            //     depart: inputDepart.current.value,
            //     arrive: inputArrive.current.value,
            // }).then((response) => {
            //     setPredictionCout(response.data['predict'])
            //     console.log(btnPredictClicked)
            //     console.log(predictionCout)
            // })
            // console.log(coordDepart, '\t', coordArrive)
            scrollToRef(refStartMap)
            isTrueLocation = false
        }else{
            alert('Impossible de trouver votre localisation')
        }
        // axios.post('http://localhost:4000/itineraire', {
        //     jour: inputJour.current.value,
        //     periode: inputPeriode.current.value,
        //     depart: inputDepart.current.value,
        //     arrive: inputArrive.current.value,
        // })
        // .then((response) => {
        //     // console.log(response.data)
        //     setRecResultData(response.data)
        // })
        // calculateRoute()
    }
    
    const position = [51.505, -0.09]

    return (
    <React.Fragment>

    <Navigation/>


        <div className="tarification-route">
            <div className="tarification-header">
                <div className="container-header-boxe bg-title-trajet">
                    <div className="container-title-boxe">
                        <div className="container-suble-title col-lg-6 col-md-5">
                            <h2> Ou voulez-vous vous rendre aujourd'hui?<hr/></h2>
                            <p className="p-title">
                                Entrez votre depart et votre destination, nous vous proposerons des itineraires plus rapides
                            </p>
                            {/* <div className="smal-deco"></div> */}
                        </div>
                        <div className="col-lg-6 col-md-6 container-title-img">
                            {/* <img src="./img/delivery_address.svg" alt="Votre destination"/> */}
                        </div>
                    </div>

                    <div className="container-search-bar">
                        <div className="container-search-item col-lg-2 col-md-5">
                            <label>Jour</label>
                            <div className="input-box-select">
                                <Icone.Calendar2 color="#05172F" className="icone"/>
                                <select ref={inputJour} value = {jour} onChange={(e) => { setJour(Array.from(e.target.selectedOptions).map(day => day.value)[0]) }}>
                                    <option value='Lundi'>Lundi</option>
                                    <option value='Mardi'>Mardi</option>
                                    <option value='Mercredi'>Mercredi</option>
                                    <option value='Jeudi'>Jeudi</option>
                                    <option value='Vendredi'>Vendredi</option>
                                    <option value='Samedi'>Samedi</option>
                                    <option value='Dimanche'>Dimanche</option>
                                </select>
                            </div>
                        </div>
                        <div className="container-search-item col-lg-2 col-md-5">
                            <label>periode</label>
                            <div className="input-box-select">
                                <Icone.Clock color="#05172F" className="icone"/>
                                <select className="select" ref={inputPeriode} value = {periode} onChange={(e) => { setPeriode(Array.from(e.target.selectedOptions).map(time => time.value)[0]) }}>
                                    <option value='6H-9H'>6H-9H</option>
                                    <option value='9H-12H'>9H-12H</option>
                                    <option value='12H-16H'>12H-16H</option>
                                    <option value='16H-20H'>16H-20H</option>
                                    <option value='20H-22H'>20H-22H</option>
                                    <option value='22H-00H'>22H-00H</option>
                                    <option value='00H-6H'>00H-6H</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="container-search-item col-lg-3 col-md-5">
                            <label>Depart</label>
                            <AutocompleteInput locations = {locations} ref={inputDepart} setValue = {setDepart} placeholder="Depart" />
                        </div>

                        <div className="container-search-item col-lg-3 col-md-5">
                            <label>Arrive</label>
                            <AutocompleteInput locations = {locations} ref={inputArrive} setValue = {setArrive} placeholder="Arrive"/>
                        </div>

                        <div className="container-search-item col-lg col-md-12">
                        <label></label>
                        {/* {(((btnPredictClicked === true) && ((recResultData === null) || (recResultData === undefined)))?(
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    
                        ):(
                            <button className="bton-recom" onClick={sendDataRecommandation}>VOIR LES ITINERAIRES</button>
                        ))
                        } */}
                        
                        <button className="bton-recom" onClick={sendDataRecommandation}>VOIR LES ITINERAIRES</button>
                        
                        </div>
                    </div>
                </div> 
            </div>

            {
            // btnPredictClicked === true? (
            // <div className="tarification-section">
            //     <div className="container-section-header">
            //         <h2> Nos recommandations <hr/></h2>
            //     </div>
            //     <div className="container-section-result">
            //         <div className="itineraire-result-item">  
            //             <div className="col itineraire-result-infos">
            //                 <div className="itineraire-result-title">
            //                     <div>
            //                         Details du trajet
            //                     </div>
            //                 </div> 
            //                 <div className="itineraire-result-box">
            //                     {/*  */}

            //                 </div>                
            //             </div>
            //         </div>
            //     </div>
            // </div>): null
            }
        </div>
    
        <div className="leafleft-map" ref={refStartMap}>
            {(points.length > 0)? (<AppMap wpoint={points}/>): (null)}
            
        </div>

    </React.Fragment>);
}

export default Itineraire