import axios from "axios";


const fetchLocation = () => {
    axios.get('http://localhost:4000/home').then((response) => {
        return response.data
    })
    return []
}


function circle(val) {
    return <div className="cercle" style={{height: val, width: val}}></div>
}

function circleSpin(val) {
    return <div className="spinner-grow cercle" role="status"style={{height: val, width: val}}>
        <span className="visually-hidden">Loading...</span>
    </div>
}

function RoundSeparator({val}) {
    let ligne = <div className="ligne ligne-circle my-5"> 
        {circle(8)}{circle(22)}{circle(40)}{circle(22)}{circle(8)}
        </div>
    let ligneSpin = <div className="ligne ligne-circle my-4">
        {circleSpin(30)}{circleSpin(50)}{circleSpin(100)}{circleSpin(50)}{circleSpin(30)}
        </div>
    if (val) {
        return ligneSpin
    }
    return ligne
}

// const obj =  {
//     RoundSeparator,
//     fetchLocation
// }
export default fetchLocation