
require('express')

const getNumericDay = (mday) => {

    let num_day = 7

    if( mday === 'Mardi'){
        num_day = 5
    }
    else if (mday === 'Mercredi'){
        num_day = 3
    }
    else if (mday === 'Jeudi'){
        num_day = 4
    }
    else if (mday === 'Vendredi'){
        num_day = 6
    }
    else if (mday === 'Samedi'){
        num_day = 2
    }
    else if (mday === 'Dimanche'){
        num_day = 1
    }

    return num_day
}


const getNumericTrafic = (mtrafic ) => {
    let trafic = 1

    if( mtrafic === 'Oui'){
        trafic = 3
    }

    return trafic
}

const getNumericRoute = (mroute ) => {
    let route = 1

    if( mroute === 'Bonne'){
        periode = 1
    }
    else if( mroute === 'Passable'){
        periode = 2
    }
    else if( mroute === 'Mauvaise'){
        periode = 3
    }

    return route
}

const getNumericPeriod = (mperiode ) => {
    let periode = 5

    if( mperiode === '06H-10H'){
        periode = 10
    }
    else if( mperiode === '10H-12H'){
        periode = 5
    }
    else if( mperiode === '12H-16H'){
        periode = 6
    }
    else if( mperiode === '16H-18H'){
        periode = 10
    }
    else if( mperiode === '18H-20H'){
        periode = 9
    }
    else if( mperiode === '20H-22H'){
        periode = 7
    }
    else if( mperiode === '22H-6H'){
        periode = 11
    }

    return periode
}


module.exports = {
    getNumericDay,
    getNumericPeriod,
    getNumericTrafic,
    getNumericRoute
};