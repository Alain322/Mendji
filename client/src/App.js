// import logo from './logo.svg';
import React from 'react';

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
  
function App() { 
    
    Session.set('pseudo', null);
    Session.set('token', null);
    Session.set('state', 'error');
    // const locations = [{
    //     id: 0,
    //     lieu: 'Eleveur',
    //     label: ' ',
    //     adress: 'Carrefour éleveur, Ngousso, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, BP:4880, Cameroun',      
    //     latitude: 3.9005899,
    //     longitude: 11.5576303
    //   },
    //   {
    //     id: 0,
    //     lieu: 'Ngousso',
    //     label: null,
    //     adress: 'Ngousso, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, Cameroun',
    //     latitude: 3.90262055,
    //     longitude: 11.5490797595
    //   },
    //   {
    //     id: 1,
    //     lieu: 'Carrefour TKC',
    //     label: null,
    //     adress: 'Carrefour TKC, Biyem-Assi, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, 135, Cameroun',
    //     latitude: 3.8409544,
    //     longitude: 11.4774023
    //   },
    //   {
    //     id: 1,
    //     lieu: 'mokolo',
    //     label: ' Dovv mokolo',
    //     adress: 'Mokolo, Communauté urbaine de Yaoundé, Yaoundé II, Mfoundi, Centre, Cameroun',
    //     latitude: 3.87562575,
    //     longitude: 11.4984147892
    //   },
    //   {
    //     id: 2,
    //     lieu: 'acacia',
    //     label: ' AfriLand',
    //     adress: "Fountain of Hope ministries INC Love chapel int Yaounde, Rue de l'Acacia, Biyem-Assi, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, 15983 YDÏ¿½, Cameroun",
    //     latitude: 3.8400439,
    //     longitude: 11.4898396996
    //   },
    //   {
    //     id: 3,
    //     lieu: 'mimboman',
    //     label: 'terminus',
    //     adress: 'Mimboman, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, Cameroun',
    //     latitude: 3.862988,
    //     longitude: 11.5592399793
    //   },
    //   {
    //     id: 3,
    //     lieu: 'Mimboman',
    //     label: 'dernier poto',
    //     adress: 'Mimboman, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, Cameroun',
    //     latitude: 3.862988,
    //     longitude: 11.5592399793
    //   },
    //   {
    //     id: 4,
    //     lieu: 'omnisport',
    //     label: 'mobile omnisport',
    //     adress: "Auto-ecole De L'omnisport, Route de Ngousso, Quartier Fouda, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi,  Centre, BP 20404 Y, Cameroun",
    //     latitude: 3.884255,
    //     longitude: 11.5353173
    //   },
    //   {
    //     id: 5,
    //     lieu: 'Ebanda',
    //     label: 'Carrefour Ebanda',
    //     adress: 'Mvog-Ébanda, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, BP:4880, Cameroun',
    //     latitude: 3.9001826,
    //     longitude: 11.5637185356
    //   },
    //   {
    //     id: 5,
    //     lieu: 'Simbock',
    //     label: 'Entrée Simbock',
    //     adress: 'Simbock, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, 8389 YDÏ¿½, Cameroun',
    //     latitude: 3.8209702,
    //     longitude: 11.4731585
    //   },
    //   {
    //     id: 6,
    //     lieu: 'Etoudi',
    //     label: null,
    //     adress: 'Étoudi, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, Cameroun',
    //     latitude: 3.9149771,
    //     longitude: 11.5252810487
    //   },
    //   {
    //     id: 6,
    //     lieu: 'poste centrale',
    //     label: null,
    //     adress: 'Poste Centrale, Rue 3.007, Centre Administratif, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, 16374, Cameroun',
    //     latitude: 3.86070075,
    //     longitude: 11.5205384964
    //   },
    //   {
    //     id: 7,
    //     lieu: 'Marche central',
    //     label: 'pharmacie du soleil',
    //     adress: 'Marché Central, Avenue du Pdt El Hadj Ahmadou Ahidjo, Centre Commercial, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, 1286YDÏ¿½, Cameroun',
    //     latitude: 3.86631775,
    //     longitude: 11.5178073257
    //   },
    //   {
    //     id: 7,
    //     lieu: 'ngoa ekele',
    //     label: 'chateau',
    //     adress: 'Ngoa-Ékélé, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, Cameroun',
    //     latitude: 3.85576305,
    //     longitude: 11.4991586372
    //   },
    //   {
    //     id: 8,
    //     lieu: 'odza',
    //     label: 'terminus',
    //     adress: 'Odza, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, Cameroun',
    //     latitude: 3.79859675,
    //     longitude: 11.5291189075
    //   },
    //   {
    //     id: 9,
    //     lieu: 'Ekie',
    //     label: ' Ekie chambre froide',
    //     adress: 'Ekié Chefferie, Ékoumdoum, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, 215 YDÏ¿½, Cameroun',    
    //     latitude: 3.8310733,
    //     longitude: 11.5432372
    //   },
    //   {
    //     id: 9,
    //     lieu: 'ekounou',
    //     label: 'Carrefour ekounou',
    //     adress: 'Ékounou, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, Cameroun',
    //     latitude: 3.8416153,
    //     longitude: 11.5340896111
    //   },
    //   {
    //     id: 10,
    //     lieu: 'cité verte',
    //     label: 'Garage camion',
    //     adress: 'Cité Verte, Communauté urbaine de Yaoundé, Yaoundé II, Mfoundi, Centre, Cameroun',
    //     latitude: 3.8745287,
    //     longitude: 11.4890272409
    //   },
    //   {
    //     id: 10,
    //     lieu: 'marché 8eme',
    //     label: null,
    //     adress: 'Marché du 8ème, Rue 6.002, Oliga, Communauté urbaine de Yaoundé, Yaoundé II, Mfoundi, Centre, 4636 YDE, Cameroun',
    //     latitude: 3.8890345,
    //     longitude: 11.4970878607
    //   },
    //   {
    //     id: 11,
    //     lieu: 'Poste central',
    //     label: null,
    //     adress: 'Rue 3.021, Centre Administratif, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, 134, Cameroun',   
    //     latitude: 3.8624308,
    //     longitude: 11.5150423
    //   },
    //   {
    //     id: 12,
    //     lieu: 'Tsinga',
    //     label: 'Polyclinique Tsinga',
    //     adress: 'Tsinga, Communauté urbaine de Yaoundé, Yaoundé II, Mfoundi, Centre, Cameroun',
    //     latitude: 3.8874226,
    //     longitude: 11.4992625235
    //   },
    //   {
    //     id: 13,
    //     lieu: 'Damas',
    //     label: 'Rond point Damas',
    //     adress: 'Damas, Rue Ombga Damase, Nsimeyong, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, 3559 YDÏ¿½, Cameroun',
    //     latitude: 3.82268055,
    //     longitude: 11.4898635084
    //   },
    //   {
    //     id: 14,
    //     lieu: 'Efoulan',
    //     label: 'Pont-efoulan',
    //     adress: 'Éfoulan, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, Cameroun',
    //     latitude: 3.8343538,
    //     longitude: 11.5064392595
    //   },
    //   {
    //     id: 14,
    //     lieu: 'carrefour mvolyé',
    //     label: null,
    //     adress: 'Carrefour Vogt, Mvolye, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, 3559 YDÏ¿½, Cameroun',     
    //     latitude: 3.8442558,
    //     longitude: 11.5013896
    //   },
    //   {
    //     id: 16,
    //     lieu: 'Ecole de police',
    //     label: null,
    //     adress: 'École de Police, Communauté urbaine de Yaoundé, Yaoundé II, Mfoundi, Centre, Cameroun',
    //     latitude: 3.877611,
    //     longitude: 11.5124508305
    //   },
    //   {
    //     id: 17,
    //     lieu: 'Essos',
    //     label: 'hotel du plateau',
    //     adress: "Complexe Scolaire Annexe D'essos, Rue 1.276, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, BP. 709 YAOUNDÉ, Cameroun",
    //     latitude: 3.8751905,
    //     longitude: 11.5462071
    //   },
    //   {
    //     id: 19,
    //     lieu: 'hotel du plateau',
    //     label: null,
    //     adress: 'Hôtel du Plateau, Rue Jean Abanda Bili, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, BP:4874, Cameroun',
    //     latitude: 3.8789897,
    //     longitude: 11.5489583
    //   },
    //   {
    //     id: 20,
    //     lieu: 'emana',
    //     label: 'mobile emana',
    //     adress: 'Émana, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, Cameroun',
    //     latitude: 3.9328292,
    //     longitude: 11.5223294843
    //   },
    //   {
    //     id: 21,
    //     lieu: 'ngousso',
    //     label: null,
    //     adress: 'Ngousso, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, Cameroun',
    //     latitude: 3.90262055,
    //     longitude: 11.5490797595
    //   },
    //   {
    //     id: 23,
    //     lieu: ' Santa maria',
    //     label: null,
    //     adress: 'Santa Maria, Rue 8.795, Ékoumdoum, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, 215 YDÏ¿½, Cameroun',
    //     latitude: 3.8279879,
    //     longitude: 11.5498327
    //   },
    //   {
    //     id: 23,
    //     lieu: 'hopital general ',
    //     label: null,
    //     adress: 'Hôpital Général De Yaoundé, Rue 5.563, Ngousso, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, BP4112 YAOUNDE-CAMEROUN, Cameroun',
    //     latitude: 3.9069181,
    //     longitude: 11.5410072937
    //   },
    //   {
    //     id: 27,
    //     lieu: 'mvog-ada',
    //     label: 'Shell mvog-ada',
    //     adress: 'Mvog-Ada, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, Cameroun',
    //     latitude: 3.8635231,
    //     longitude: 11.5283875143
    //   },
    //   {
    //     id: 28,
    //     lieu: 'Odza',
    //     label: 'Mbog Abang',
    //     adress: 'Odza, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, Cameroun',
    //     latitude: 3.79859675,
    //     longitude: 11.5291189075
    //   },
    //   {
    //     id: 28,
    //     lieu: 'Calafatas',
    //     label: 'Hippodrome',
    //     adress: "Square Boulangerie CALAFATAS, Rue Valéry Giscard d'Estaing, Centre Commercial, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, 1430 YAOUNDÉ, Cameroun",
    //     latitude: 3.87180585,
    //     longitude: 11.5171373577
    //   },
    //   {
    //     id: 29,
    //     lieu: 'Oyom abang',
    //     label: 'Camp sonel',
    //     adress: 'Oyom-Abang, Communauté urbaine de Yaoundé, Mfoundi, Centre, 2180 YDE, Cameroun',
    //     latitude: 3.87594175,
    //     longitude: 11.4729960787
    //   },
    //   {
    //     id: 29,
    //     lieu: 'Polytechnique',
    //     label: 'ecole Polytechnique de Yaounde',
    //     adress: 'Polytechnique, Avenue du Fleuve, Kingabwa, Limete, Kinshasa, 724, République démocratique du Congo',
    //     latitude: -4.3453849,
    //     longitude: 15.3539367
    //   },
    //   {
    //     id: 31,
    //     lieu: 'cradat',
    //     label: null,
    //     adress: 'CRADAT, Rue 3.744, Ngoa-Ékélé, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, 30553, Cameroun',   
    //     latitude: 3.8523628,
    //     longitude: 11.498848
    //   },
    //   {
    //     id: 31,
    //     lieu: 'education',
    //     label: null,
    //     adress: "Centre D'éducation Populaire Et D'animation Pour Le Développement, Rue 1.250, Mvog-Ada, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, 219 YDÏ¿½, Cameroun",
    //     latitude: 3.8638626,
    //     longitude: 11.5323649
    //   },
    //   {
    //     id: 33,
    //     lieu: 'Emombo',
    //     label: 'Total Emombo',
    //     adress: 'Emombo 2, Mimboman, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, 7021 YDÏ¿½, Cameroun',
    //     latitude: 3.8647696,
    //     longitude: 11.549043
    //   },
    //   {
    //     id: 35,
    //     lieu: 'province',
    //     label: null,
    //     adress: 'Rond-point Province, Centre Commercial, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, BP 10004 YAOUNDÉ, Cameroun',
    //     latitude: 3.8811539,
    //     longitude: 11.5164638
    //   },
    //   {
    //     id: 36,
    //     lieu: 'Omnisport',
    //     label: 'mobile omnisport',
    //     adress: "Auto-ecole De L'omnisport, Route de Ngousso, Quartier Fouda, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, BP 20404 Y, Cameroun",
    //     latitude: 3.884255,
    //     longitude: 11.5353173
    //   },
    //   {
    //     id: 37,
    //     lieu: 'ministere des finances ',
    //     label: 'finance',
    //     adress: 'Ministère des Finances, Rue 3.021, Centre Administratif, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, 134, Cameroun',
    //     latitude: 3.8624571,
    //     longitude: 11.5149651923
    //   },
    //   {
    //     id: 38,
    //     lieu: 'Essomba',
    //     label: null,
    //     adress: 'Carrefour Essomba, Kondengui, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, 12421 YDÏ¿½, Cameroun',
    //     latitude: 3.855302,
    //     longitude: 11.5475887
    //   },
    //   {
    //     id: 40,
    //     lieu: 'Awae',
    //     label: 'Awae laverie',
    //     adress: 'Awae, Communauté urbaine de Yaoundé, Yaoundé IV, Mfoundi, Centre, Cameroun',
    //     latitude: 3.83599,
    //     longitude: 11.5505660919
    //   },
    //   {
    //     id: 41,
    //     lieu: 'Mendong',
    //     label: 'carrefour banane',
    //     adress: 'Mendong, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, Cameroun',
    //     latitude: 3.83464345,
    //     longitude: 11.4726984564
    //   },
    //   {
    //     id: 41,
    //     lieu: 'cite U',
    //     label: null,
    //     adress: 'Cité de La Vierge Marie, Fébé, Communauté urbaine de Yaoundé, Yaoundé II, Mfoundi, Centre, 33923 YDE, Cameroun',    latitude: 3.9094099,
    //     longitude: 11.4837368
    //   },
    //   {
    //     id: 42,
    //     lieu: 'station Neptune',
    //     label: 'face ecole de poste',
    //     adress: 'Mvolyé, Autoroute Yaoundé-Nsimalen, 7000 YAOUNDÉ, Cameroun',
    //     latitude: 3.8389642,
    //     longitude: 11.5119471
    //   },
    //   {
    //     id: 44,
    //     lieu: 'Carrefour EMIA',
    //     label: null,
    //     adress: 'Carrefour EMIA, Ngoa-Ékélé, Communauté urbaine de Yaoundé, Yaoundé III, Mfoundi, Centre, BP 4824 YDE, Cameroun',    latitude: 3.8623753,
    //     longitude: 11.5040748
    //   },
    //   {
    //     id: 44,
    //     lieu: 'carrefour messassi',
    //     label: null,
    //     adress: 'Carrefour Messassi, Émana, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, 15425 YDÏ¿½, Cameroun',   
    //     latitude: 3.9419351,
    //     longitude: 11.5184559
    //   },
    //   {
    //     id: 45,
    //     lieu: 'poste',
    //     label: null,
    //     adress: 'Place Ahmadou Ahidjo, Mvog-Ada, Communauté urbaine de Yaoundé, Yaoundé V, Mfoundi, Centre, 16374, Cameroun',    
    //     latitude: 3.8614277,
    //     longitude: 11.5204889
    //   },
    //   {
    //     id: 45,
    //     lieu: 'chateau',
    //     label: null,
    //     adress: "Chateau قصر, الطريق السريع عبر أفريقيا انجمينا-لاغوس/ياوندي/نيامي, 9ème Arrondissement / الدائرة التاسعة, Walia , 9ème Arrondissement / الدائرة التاسعة, N'Djaména انجمينا, 1285, Tchad تشاد",
    //     latitude: 12.0649729,
    //     longitude: 15.0873589
    //   },
    //   {
    //     id: 46,
    //     lieu: 'johannesburg',
    //     label: null,
    //     adress: 'Yaounde Crescent, Cosmo City, Johannesburg Ward 100, Roodepoort, City of Johannesburg Metropolitan Municipality, Gauteng, 2060, South Africa',
    //     latitude: -26.0298768,
    //     longitude: 27.9267264
    //   },
    //   {
    //     id: 46,
    //     lieu: 'mendong',
    //     label: null,
    //     adress: 'Mendong, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, Cameroun',
    //     latitude: 3.83464345,
    //     longitude: 11.4726984564
    //   },
    //   {
    //     id: 47,
    //     lieu: 'Bata Nlongkak',
    //     label: null,
    //     adress: 'Carrefour Bata Nlongkak, Nlongkak, Communauté urbaine de Yaoundé, Yaoundé I, Mfoundi, Centre, 4558, Cameroun',  
    //     latitude: 3.8891106,
    //     longitude: 11.5224098
    //   },
    //   {
    //     id: 48,
    //     lieu: 'chapelle tkc',
    //     label: null,
    //     adress: 'Carrefour Chapelle TKC, Mendong, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, 135, Cameroun',    
    //     latitude: 3.8376866,
    //     longitude: 11.4747919
    //   },
    //   {
    //     id: 49,
    //     lieu: 'Mendong ',
    //     label: null,
    //     adress: 'Mendong, Communauté urbaine de Yaoundé, Yaoundé VI, Mfoundi, Centre, Cameroun',
    //     latitude: 3.83464345,
    //     longitude: 11.4726984564
    //   }
    // ]

    // const [path, setPath] = useState("/")

    const redirectToHome = () => {
        if(window.location.href === "http://localhost:3000/"){
            return (<Redirect exact from="/" to="/home" />)
        }
    }
    
    return (
        <div className='main'>
            <BrowserRouter>
                { redirectToHome()}
                <Route path='/home'>
                    <Home/>
                </Route>

                <Route path='/tarification'>
                    <Tarification />
                </Route>

                <Route path='/itineraire'>
                    <Itineraire/>
                </Route>
                
                <Route path='/authentification'>
                  <Authentification/>
                </Route>

                <Route path='/account'>
                  <Account/>
                </Route>
                {/* <Route path='/home' component = {Appe}/> */}
                
                <Footer/>
            </BrowserRouter>
        </div>
    )
}  
 
export default App;