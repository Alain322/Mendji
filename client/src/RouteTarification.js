import React from "react"

import { useState, useEffect, useRef } from 'react';

import axios from 'axios'

import * as Icone from 'react-bootstrap-icons';

import AutocompleteInput from './components/InputComplete'
import Navigation from './components/Navigation'

import Session from 'react-session-api'
import { useHistory } from "react-router-dom";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function Tarification() {

    const [locations, setAllocations] = useState([]);

    const refHeaderPage = useRef(null)
    // form useref
    const inputJour = useRef('')
    const inputPeriode = useRef('')
    const inputDepart = useRef('')
    const inputArrive = useRef('')

    /* Listening handler change */

    const [jour, setJour] = useState('Lundi')
    const [periode, setPeriode] = useState('6H-10H')
    const [depart, setStateDepart] = useState('Lundi')
    const [arrive, setStateArrive] = useState('6H-10H')

    const setArrive = (val) => {
        inputArrive.current.value = val
        setStateArrive(val)
    }

    const setDepart = (val) => {
        inputDepart.current.value = val
        setStateDepart(val)
    }

    const [predictionCout, setPredictionCout] = useState(null)

    const [btnPredictClicked, setBtnPredictClicked] = useState(false)
    const [isGettingResult, setIsGettingResult] = useState(false)

    /* Recuperations des donnees */

    const [recResultData, setRecResultData] = useState(null)

    // const points = [
    //     {'latitude': 3.9328292, 'longitude': 11.5223294843}, 
    //     {'latitude': 3.9149771, 'longitude': 11.5252810487}
    // ]
    const [points, setPoints] = useState([])
    const updatePoints = (pts) => {
        let pnts = []
        pnts = points
        pnts.push(pts)
        setPoints(pnts)
    }

    const isResultReady = (valparams) => {
        if (isGettingResult === true) {
            return valparams
        }
        else {
            return ''
        }
        // return valparams
    }

    const history = useHistory();


    useEffect(() => {
        // if (Session.get('state') === 'error') {
        //     history.push('/authentification');
        // }

        axios.get('http://localhost:4000/itineraire/location').then(
            (response) => {
                setAllocations(response.data.data)
            }
        )
        scrollToRef(refHeaderPage)
        setBtnPredictClicked(false)
        setIsGettingResult(false)
    }, [history])

    const predictiontarif = (cout) => {
        let rest = 0
        let neutre = 0
        let quick = 0
        rest = cout % 50
        quick = cout
        neutre = cout

        if (rest < 25) {
            quick = cout - (rest + 50) + 50
            neutre = cout - (50 + rest)
        } 
        else if(rest >= 20 && rest < 40) {
            quick = cout - rest
            neutre = cout - (50 + rest) + 50
        }
        
        else {
            quick = (50 - rest) + cout
            neutre = cout - rest
        }

        if (neutre < 100) {
            neutre = 100
        }

        if (quick < 100 || quick === neutre) {
            quick = neutre + 50
        }

        // if (rest < 25) {
        //     quick = cout - rest
        //     neutre = cout - (50 + rest)
        // } else {
        //     quick = (50 - rest) + cout
        //     neutre = cout - rest
        // }

        // if (neutre < 100) {
        //     neutre = 100
        // }

        // if (quick < 100 || quick === neutre) {
        //     quick = neutre + 50
        // }

        return { 'quick': quick, 'neutre': neutre }
    }

    const clearform = () => {
        inputDepart.current.val = ''
        inputArrive.current.val = ''
        inputJour.current.val = ''
        inputPeriode.current.val = ''
    }
    /* Envoie des donnees vers le server */
    const refRecommandation = useRef(null)

    const sendDataRecommandation = async () => {
        setIsGettingResult(false)
        let isTrueLocation = false
        let isTrueDepart = false
        let isTrueArrive = false
        let coordDepart = {}
        let coordArrive = {}
        let i = 0

        while ((i < locations.length) && isTrueLocation === false) {
            if (locations[i].adresse.toLowerCase() === inputDepart.current.value.toLowerCase()) {
                coordDepart['latitude'] = locations[i].latitude
                coordDepart['longitude'] = locations[i].longitude

                isTrueDepart = true
            }
            if (locations[i].adresse.toLowerCase() === inputArrive.current.value.toLowerCase()) {
                coordArrive['latitude'] = locations[i].latitude
                coordArrive['longitude'] = locations[i].longitude
                isTrueArrive = true
            }

            if (isTrueArrive === true && isTrueDepart === true) {
                // updatePoints(coordDepart)
                // updatePoints(coordArrive)
                // points[0] = coordDepart
                // points[1] = coordArrive
                isTrueLocation = true

                break
            }

            i = i + 1
        }

        if (isTrueLocation === true) {
            setBtnPredictClicked(true)

            if (btnPredictClicked === true) {
                scrollToRef(refRecommandation)
            }
            axios.post('http://localhost:4000/tarification', {
                jour: inputJour.current.value,
                periode: inputPeriode.current.value,
                depart: coordDepart,
                arrive: coordArrive,
                // depart: inputDepart.current.value,
                // arrive: inputArrive.current.value,
            })
                .then((response) => {
                    setPredictionCout(response.data['predict'])
                    setRecResultData(response.data['predict'])
                    setBtnPredictClicked(true)
                    setIsGettingResult(true)
                })
        }
        clearform()
    }

    return (<React.Fragment>

        <Navigation />


        <div className="tarification-route" ref={refHeaderPage}>
            <div className="tarification-header">
                <div className="container-header-boxe bg-title-tarif">
                    <div className="container-title-boxe">
                        <div className="col-lg-6 col-md-6">
                            <h2> Evaluez le cout de votre transport <hr /></h2>
                            <p className="p-title">
                                Entrez votre depart et votre destination et voyez immédiatement le coût de votre déplacement
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6 container-title-img">
                            <img src="./img/car_ride_re.svg" alt="Evaluer votre transport" />

                        </div>
                    </div>
                    <div className="container-search-bar">
                        <div className="container-search-item col-lg-2 col-md-5">
                            <label>Jour</label>
                            <div className="input-box-select">
                                <Icone.Calendar2 color="#05172F" className="icone" />
                                <select ref={inputJour} value={jour} onChange={(e) => { setJour(Array.from(e.target.selectedOptions).map(day => day.value)[0]) }}>
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
                                <Icone.Clock color="#05172F" className="icone" />
                                <select className="select" ref={inputPeriode} value={periode} onChange={(e) => { setPeriode(Array.from(e.target.selectedOptions).map(time => time.value)[0]) }}>
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
                            <AutocompleteInput locations={locations} ref={inputDepart} setValue={setDepart} placeholder="Depart" />
                        </div>

                        <div className="container-search-item col-lg-3 col-md-5">
                            <label>Arrive</label>
                            <AutocompleteInput locations={locations} ref={inputArrive} setValue={setArrive} placeholder="Arrive" />
                        </div>

                        <div className="container-search-item col-lg col-md-12">
                            <label></label>
                            {(((btnPredictClicked === true) && ((recResultData === null) || (recResultData === undefined))) ? (
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                            ) : (
                                <button className="bton-recom" onClick={sendDataRecommandation}>VOIR LES TARIFS</button>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="loader">
                <div className="loader__element"></div>
            </div> */}

            {btnPredictClicked === true ?
                (<div className="tarification-section" ref={refRecommandation}>
                    <div className="container-section-header">
                        <h2> Nos recommandations <hr /></h2>
                    </div>
                    {(((recResultData === null) || (recResultData === undefined)) ? (
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    ) : (
                        <div className="container-section-result">
                            <div className="container-result-item">
                                <div className="col-lg-2 t-item-img">
                                    <img className="image" src="./img/car.png" alt="car" />
                                </div>
                                <div className="col-lg-6 t-item-info">
                                    <Icone.GeoAlt color="#56C08B" className="icone" />
                                    <span>Depart</span>
                                    <h5>{isResultReady(depart)}</h5>
                                    <hr />
                                    <Icone.GeoAlt color="#FF313" className="icone" />
                                    <span>Arrive</span>
                                    <h5>{isResultReady(arrive)}</h5>
                                    <hr />
                                </div>
                                <div className="col-lg-4 t-item-price">
                                    <div className="price-box">
                                        <h6>Cout du transport</h6>
                                        <p>
                                            <Icone.CheckCircleFill color="#FF3131" className="icone" />
                                            <span className="span">TARIF PLUS PROBABLE</span>
                                        </p>
                                        <div className="price-row">
                                            <h4>{isResultReady(predictiontarif(predictionCout).quick)} FCFA</h4>
                                            <button>Accepter</button>
                                        </div>
                                    </div>
                                    <div className="other-price-box">
                                        <div className="">
                                            <h6><Icone.Calendar2Week color="#FF3131" className="icone" />Jour</h6>
                                            {isResultReady(inputJour.current.value)}
                                        </div>
                                        <div className="">
                                            <h6><Icone.ClockHistory color="#FF3131" className="icone" />Periode</h6>
                                            {isResultReady(inputPeriode.current.value)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-result-item">
                                <div className="col-lg-2 t-item-img">
                                    <img className="image" src="./img/car.png" alt="car" />
                                </div>
                                <div className="col-lg-6 t-item-info">
                                    <Icone.GeoAlt color="#56C08B" className="icone" />
                                    <span>Depart</span>
                                    <h5>{isResultReady(depart)}</h5>
                                    <hr />
                                    <Icone.GeoAlt color="#FF313" className="icone" />
                                    <span>Arrive</span>
                                    <h5>{isResultReady(arrive)}</h5>
                                    <hr />
                                </div>
                                <div className="col-lg-4 t-item-price">
                                    <div className="price-box1">
                                        <h6>Cout du transport</h6>
                                        <p>
                                            <Icone.CheckCircleFill color="#FF3131" className="icone" />
                                            <span className="span">TARIF MOYEN ESTIME</span>
                                        </p>
                                        <div className="price-row1">
                                            <h4>{isResultReady(predictiontarif(predictionCout).neutre)} FCFA</h4>
                                            <button>Accepter</button>
                                        </div>
                                    </div>
                                    <div className="other-price-box">
                                        <div className="">
                                            <h6><Icone.Calendar2Week color="#FF3131" className="icone" />Jour</h6>
                                            {isResultReady(inputJour.current.value)}
                                        </div>
                                        <div className="">
                                            <h6><Icone.ClockHistory color="#FF3131" className="icone" />Periode</h6>
                                            {isResultReady(inputPeriode.current.value)}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>) : null}
        </div>
    </React.Fragment>);
}

export default Tarification