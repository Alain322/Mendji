import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import Session from 'react-session-api'
import * as Icone from 'react-bootstrap-icons';

function Navigation() {

  //  Sticky navigation

  const history = useHistory();

  const [scrollClass, setscrollClass] = useState('main-nav')

  const [connexionDatas, setconnexionDatas] = useState({ 'state': 'error' })
  const [recResultData, setRecResultData] = useState(null)

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 80) {
      setscrollClass('scrolled')
    }
    else {
      setscrollClass('main-nav')
    }
  }

  useEffect(() => {
    // alert(Session.get('token'))
    // console.log(connexionDatas)
    window.addEventListener('scroll', handleScroll)
      
  }, [])

  const deconnexion = (e) => {
    e.preventDefault()

    Session.set('pseudo', null);
    Session.set('token', null);
    Session.set('state', 'error');
    history.push('/home');
  }

  return (
    <React.Fragment>
      <div className="top-navbar">
        <div className="navbar navbar-topbar navbar-expand-xl navbar-dark navbar-absolute top-0 d-none d-xl-flex">
          <div className="container">
            <ul className="nav navbar-nav me-100 nav-no-opacity">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle p-0" href="http://localhost:3000/">
                  English
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none">
                    <path fill="currentColor" d="m5 5-.495.495L5 5.99l.495-.495L5 5ZM.505 1.495l4 4 .99-.99-4-4-.99.99Zm4.99 4 4-4-.99-.99-4 4 .99.99Z"></path>
                  </svg>
                </a>
                <ul className="dropdown-menu rounded-2 shadow">
                  <li><a className="dropdown-item active" href="http://localhost:3000/">English</a></li>
                  <li><a className="dropdown-item" href="http://localhost:3000/">Francais</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav nav-gap-xl nav-contacts nav-no-opacity">
              <li className="nav-item">
                <a className="nav-link" href="tel:12023580309">
                  <svg width="16" height="16" fill="none">
                    <path fill="currentColor" d="M16 11.98v2.408a1.604 1.604 0 0 1-1.094 1.527 1.613 1.613 0 0 1-.66.079 15.941 15.941 0 0 1-6.943-2.465A15.672 15.672 0 0 1 2.476 8.71a15.869 15.869 0 0 1-2.47-6.96A1.603 1.603 0 0 1 .96.136C1.163.047 1.384 0 1.607 0h2.414A1.61 1.61 0 0 1 5.63 1.381c.102.77.29 1.528.563 2.256a1.603 1.603 0 0 1-.362 1.694l-1.022 1.02a12.86 12.86 0 0 0 4.827 4.817l1.022-1.02a1.61 1.61 0 0 1 1.697-.36c.73.271 1.489.46 2.26.561A1.61 1.61 0 0 1 16 11.98Z"></path>
                  </svg>+237 698 96 67 98</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="mailto:contact@mendji.com">
                  <svg width="14" height="11" fill="none">
                    <path fill="currentColor" d="M14 0H0l7 4.583L14 0Z"></path>
                    <path fill="currentColor" d="M14 9.821V2L7 6.5 0 2v7.821C0 10.47.63 11 1.4 11h11.2c.77 0 1.4-.53 1.4-1.179Z"></path>
                  </svg>contact@mendji.com
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="none">
                    <path fill="currentColor" d="M6 14s6-3.818 6-8.273a5.598 5.598 0 0 0-1.757-4.05A6.148 6.148 0 0 0 6 0a6.148 6.148 0 0 0-4.243 1.677A5.598 5.598 0 0 0 0 5.727C0 10.182 6 14 6 14Zm2-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
                  </svg>2260 Dept Informatique, Facscience, UYI
                </a>
              </li>
            </ul>
            <ul className="nav nav-gap-sm navbar-nav nav-social ms-auto nav-no-opacity align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" fill="none">
                    <path fill="currentColor" d="M5.535 2.71h1.053V.748A12.741 12.741 0 0 0 5.055.66c-1.518 0-2.557 1.023-2.557 2.903v1.73H.823v2.195h1.675v5.525h2.053V7.488h1.607l.255-2.195H4.551V3.78c0-.635.159-1.07.984-1.07Z"></path>
                  </svg>
                </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="http://localhost:3000/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" fill="none">
                <path fill="currentColor" d="M15.048 2.23A1.87 1.87 0 0 0 13.737.9C12.58.587 7.94.587 7.94.587S3.301.587 2.144.9A1.87 1.87 0 0 0 .832 2.23c-.31 1.172-.31 3.618-.31 3.618s0 2.445.31 3.617c.171.647.674 1.135 1.312 1.308 1.157.314 5.796.314 5.796.314s4.64 0 5.797-.314a1.842 1.842 0 0 0 1.311-1.308c.31-1.172.31-3.617.31-3.617s0-2.446-.31-3.618ZM6.423 8.068v-4.44l3.877 2.22-3.877 2.22Z"></path>
              </svg></a></li>
              <li className="nav-item"><a className="nav-link" href="http://localhost:3000/"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" fill="none">
                <path fill="currentColor" d="M12.854 2.986c.009.124.009.248.009.373 0 3.793-2.887 8.163-8.164 8.163a8.108 8.108 0 0 1-4.406-1.288c.23.027.453.036.693.036a5.746 5.746 0 0 0 3.562-1.226 2.874 2.874 0 0 1-2.683-1.99 3.035 3.035 0 0 0 1.297-.053 2.87 2.87 0 0 1-2.3-2.816v-.036a2.89 2.89 0 0 0 1.296.365A2.867 2.867 0 0 1 .88 2.124c0-.533.142-1.022.391-1.448a8.156 8.156 0 0 0 5.916 3.002 3.239 3.239 0 0 1-.07-.657c0-1.581 1.278-2.87 2.869-2.87.826 0 1.572.347 2.096.907a5.65 5.65 0 0 0 1.821-.693 2.862 2.862 0 0 1-1.261 1.581 5.751 5.751 0 0 0 1.652-.444 6.169 6.169 0 0 1-1.44 1.484Z"></path>
              </svg></a></li>
              <li className="nav-item"><a className="nav-link" href="http://localhost:3000/"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none">
                <path fill="currentColor" d="M7.004 3.692c-1.754 0-3.169 1.403-3.169 3.142 0 1.74 1.415 3.142 3.169 3.142 1.753 0 3.168-1.403 3.168-3.142 0-1.739-1.415-3.142-3.168-3.142Zm0 5.185a2.055 2.055 0 0 1-2.06-2.043c0-1.126.924-2.042 2.06-2.042 1.136 0 2.06.916 2.06 2.042a2.055 2.055 0 0 1-2.06 2.043Zm4.036-5.313c0 .407-.33.733-.739.733a.734.734 0 0 1-.739-.733c0-.405.331-.733.74-.733.407 0 .738.328.738.733Zm2.099.744c-.047-.982-.273-1.852-.998-2.568-.723-.716-1.6-.94-2.59-.99-1.02-.057-4.078-.057-5.098 0-.987.047-1.864.27-2.59.987-.724.717-.948 1.586-.997 2.568-.058 1.011-.058 4.044 0 5.056.047.981.273 1.85.998 2.567.725.717 1.6.94 2.589.99 1.02.058 4.078.058 5.098 0 .99-.046 1.867-.27 2.59-.99.722-.716.948-1.586.998-2.567.058-1.012.058-4.042 0-5.053Zm-1.318 6.138a2.077 2.077 0 0 1-1.175 1.165c-.813.32-2.744.246-3.642.246-.9 0-2.832.071-3.643-.246a2.076 2.076 0 0 1-1.175-1.165c-.322-.806-.248-2.72-.248-3.612 0-.891-.071-2.808.248-3.612a2.077 2.077 0 0 1 1.175-1.165c.814-.32 2.744-.246 3.643-.246.898 0 2.831-.071 3.642.246.54.213.957.626 1.175 1.165.322.807.248 2.72.248 3.612 0 .891.074 2.808-.248 3.612Z"></path>
              </svg></a></li>
              <li className="nav-item"><a className="nav-link" href="http://localhost:3000/"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" fill="none">
                <path fill="currentColor" d="M1.662 2.728a.516.516 0 0 0-.167-.432L.262.808V.587h3.833l2.964 6.5 2.606-6.5h3.656v.221L12.265 1.82a.308.308 0 0 0-.117.295v7.438a.308.308 0 0 0 .117.295l1.031 1.012v.221H8.11v-.221l1.07-1.036c.103-.104.103-.137.103-.296v-6.01L6.31 11.062h-.402L2.452 3.518v5.056a.689.689 0 0 0 .191.58l1.39 1.684v.222H.094v-.22l1.389-1.686a.666.666 0 0 0 .178-.58V2.728Z"></path>
              </svg></a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className={scrollClass}>
        <nav className='navbar navbar-expand-lg navbar-default'>
          <a className="logo" href="http://localhost:3000">
            <img src='./img/logo-dark.png' alt="img" />
            {/* <img src='./img/logo.png' alt="img"/> */}
          </a>
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent2" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className='nav-link'>Accueil</Link>
              </li>
              <li className="nav-item dropdown">
                <Link to="/itineraire" className='nav-link'>Itineraires</Link>
                {/* <a className={this.state.classRecommend} id="iDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                    Itineraires </a>
                    <ul className="dropdown-menu" aria-labelledby="iDropdown">
                      <li><a className="dropdown-item btn" onClick={this.navItiClick}> Itineraire Simple </a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item btn" onClick={this.navItineraireClick}> Itineraire à destinations multiples </a></li>
                    </ul> */}
              </li>
              <li className="nav-item">
                <Link to="/tarification" className='nav-link'>Tarification</Link>
              </li>
              {/* <li className="nav-item">
                    <Link to="/actualite" className='nav-link'> Actu</Link> 
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className='nav-link'> A propos</Link> 
                  </li> */}
            </ul>
            <div className="d-flex">
              {(Session.get('state') === 'error') ?
                <Link to="/authentification" className='conn-btn'> Connexion</Link> :
                <div className='nav-profil-avatar'>
                  <Link to="/account" className=''>
                    <Icone.PersonCircle className="icone" />
                  </Link>
                  <div className="nav-profil-pseudo">
                    <Link to="/account" className="span">Mon compte</Link>
                    <div className="span" onClick={(e) => { deconnexion(e) }}>Deconnexion</div>
                  </div>
                </div>
              }
            </div>
          </div>
          {/* <div className="ms-2 user"><button className="btn userData"> <i className="bi-person-circle"></i> </button></div> */}
        </nav>
      </div>

    </React.Fragment>);
}

export default Navigation