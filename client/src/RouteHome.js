import React  from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import fetchLocation from "./components/utils"
import * as Icone from 'react-bootstrap-icons';
import axios from "axios";
import Navigation from './components/Navigation'

function Home(){
    
    useEffect(() => {
        axios.get('http://localhost:4000/home').then((response) => {
        console.log(response.data)
    })
    }, [])

    return (<React.Fragment>

        <Navigation/>

        <div className="pub-container">
            <div className="pub-bg-img"></div>
            <div className="pub-bg-left"></div>
            <div className="pub-bg-rigth"></div>
            <div className="row pub-box">
                <div className="col-lg-5 offset-lg-1 order-lg-2">
                    <div className="rigth-pub">
                        <span></span>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="left-pub">
                        <h1><span className='ksecondary-color'>Mendji, </span>votre systeme de 
                        recommandation sur le transport urbain</h1>
                        <p>Nous vous amenons où vous voulez en vous proposant des tarifs et des itineraires de qualité, adaptés a vos besoins
                        </p>

                        <div className="monbile-btn">
                        <img className="img-fluid py-2 mt-2" src="./img/btn-play.svg" alt="Applications mobiles" /> 
                        <img className="img-fluid py-2 mx-2 mt-2" src="./img/btn-store.svg" alt="Applications mobiles" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="service-section">
            <div className="title-service"> 
                <div className="col-5">
                    <h1>Pourquoi utiliser notre moteur de recommandation ? </h1>
                </div>
            </div>
            <div className="more-service row">
                <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                    <div className="single-service">
                        <img className="img" src="./img/drive.svg" aria-label="Je veux un itinéraire" />
                        <h4>Itineraire</h4>
                        <p className="card-title"> Je veux un itinéraire </p>
                        <Icone.ArrowRight className="ico"/>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                    <div className="single-service">
                        <img className="img" src="./img/destination.svg" aria-label="Je veux aller à plusieurs endroits" />
                        
                        <h4>Itineraire</h4>
                        <p className="card-title"> Je veux aller à plusieurs endroits  </p>
                        <Icone.ArrowRight className="ico"/>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                    <div className="single-service">
                        <img className="img" src="./img/svg.svg" aria-label="Je veux voir les tarifs de mon trajet" />
                        <h4>Itineraire</h4>
                        <p className="card-title"> Je veux voir les tarifs de mon trajet </p>
                        <Icone.ArrowRight className="ico"/>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                    <div className="single-service">
                        <img className="img" src="./img/svg.svg" aria-label="Je veux voir les tarifs de mon trajet" />
                        <h4>Itineraire</h4>
                        <p className="card-title"> Je veux voir les tarifs de mon trajet </p>
                        <Icone.ArrowRight className="ico"/>
                    </div>
                </div>
            </div>
        </div>


            {/* 
            <div className="tarif-section">
            <div className="col-lg-5">
                <img className="image" src="./img/taxi_white.jpg"/>
            </div>
            <div className="texte col-lg-5 col-md-5">
                <h4> Gagner du temps ! <hr/></h4>
                <p className="text-muted">Nous vous recommandons des tarifs adaptés à vos destinations, pour vous permettre de vous déplacer rapidement </p>
                <Link to='/tarification' className="btn button" onClick={this.tarifClick}> Voir les tarifs </Link>
            </div>
            </div> */}


        <div className="container">
            <div className="row univ-main">
                <div className="col-lg-6 univ-text">
                    <div className="texte col-lg-11">
                        <h4 className="hr-style"> Gagner du temps ! <hr/></h4>
                        <p className="text-muted">Nous vous recommandons des tarifs adaptés à vos destinations, pour vous permettre de vous déplacer rapidement </p>
                        <Link to='/tarification' className="btn button" > Voir les tarifs </Link>
                    </div>
                </div>
                <div className="col-lg-6 univ-img">
                    <div className="univ-img-big">
                        <div className="univ-img-points">
                        <img className="image image-fluid" src="./img/26432.svg" alt=""/>
                        </div>
                        <img className="image image-fluid" src="./img/long.jpg" alt=""/>
                    </div>
                    <div className="col-lg-5 univ-img-small">
                        <img className="image image-fluid" src="./img/transport-cmr.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row univ-main">
                <div className="col-lg-6 univ-text">
                    <div className="texte col-lg-11">
                        <h4 className="hr-style"> Optimisez vos déplacements <hr/></h4>
                        <p className="text-muted"> Pour eviter des embouteillages, <br/> nous vous recommandons des trajets optimisés adaptés en fonction de vos destinations </p>
                        <Link to='/itineraire' className="btn button"> Voir les trajets </Link>
                    </div>
                </div>
                <div className="col-lg-6 univ-img">
                    <div className="univ-img-big">
                        <div className="univ-img-points">
                        <img className="image image-fluid" src="./img/26432.svg" alt=""/>
                        </div>
                        <img className="image" src="./img/hd_bg_t.jpg" alt=""/>
                    </div>
                    <div className="col-lg-5 univ-img-small">
                        <img className="image" src="./img/embouteil.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>


            {/* <div className="trajet-section">
            <div className="texte col-lg-5 col-md-5">
                <h4> Optimisez vos déplacements <hr/></h4>
                <p className="text-muted"> Nous vous recommandons des trajets optimisés adaptés en fonction de vos destinations </p>
                <Link to='/itineraire' className="btn button" onClick={this.itineraireClick}> Voir les trajets </Link>
            
            </div>
            
            <img className="image" src="./img/routes-optim.png"/>
            <div className="col-lg-5">
                <img className="image" src="./img/routes-optim.png"/>
            </div>
            </div> */}

            
        <div className="pub-container">
            <div className="pub-bg-img"></div>
            <div className="pub-bg-left"></div>
            <div className="pub-bg-rigth"></div>
            <div className="row pub-box">
                <div className="col-lg-5 offset-lg-1 order-lg-2">
                    <div className="rigth-pub">
                        <span></span>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="left-pub">
                        <h1><span className='ksecondary-color'>Mendji, </span>votre systeme de 
                        recommandation sur le transport urbain</h1>
                        <p>Nous vous amenons où vous voulez en vous proposant des tarifs et des itineraires de qualité, adaptés a vos besoins
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>
    )
}
  

export default Home