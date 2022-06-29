import React from 'react'

import RoundSeparator from './utils'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="footer">
                {/* <div className="penche"></div> */}
                <footer className="text-center">
                    <span>SYSTEME DE RECOMMANDATION</span><br/> © 2022 Transport routier, FS-UY1
                    <img className="img-fluid" src="./img/footer-mark.png" alt="Applications mobiles" />
                {/* <div>{RoundSeparator(false)}</div>  */}
                </footer>
                
            </div>
        )
    }
}

export default Footer