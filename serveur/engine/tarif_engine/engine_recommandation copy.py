from flask import Flask, request
import pickle
import pandas as pd
import numpy as np
import json 

from geopy.geocoders import Nominatim 
from math import *

app = Flask(__name__)

model = pickle.load(open('up_tarif_engine_uptodate.pkl', 'rb'))

def distance_location(lat1, lon1, lat2, lon2):
    R = 6372.8
    dLat = radians(lat2 - lat1)
    dLon = radians(lon2 - lon1)
    lat1 = radians(lat1)
    lat2 = radians(lat2)
    a = sin(dLat/2)**2 + cos(lat1)*cos(lat2)*sin(dLon/2)**2
    c = 2*asin(sqrt(a))
    return R * c

@app.route('/flask', methods=['GET'])
def prediction():
    data = request.get_json() 
    distance = distance_location(
        float(data['depart']['latitude']), 
        float(data['depart']['longitude']),  
        float(data['arrive']['latitude']), 
       float(data['arrive']['longitude']))
    mteest = pd.DataFrame(np.array([[distance,  data['jour'], data['periode']]]), 
                          columns=['distance', 'Jour', 'Periode'])
    mode = model.predict(mteest)
    return json.dumps({'result': mode[0, 0].round(decimals=0, out=None)})
    
@app.route('/itineraireinfos', methods=['GET'])
def itineraireinfos():
    place = []
    
    nomination = Nominatim(user_agent='Noned')
    location = request.get_json() 
    depart = nomination.geocode(location['depart'] + ", Yaounde", timeout=1)
    arrive = nomination.geocode(location['arrive'] + ", Yaounde", timeout=1)
    
    if((depart != None) and (arrive != None)):
        tem_d = {"depart": location['depart'], "adressed": depart.address,
                 "arrive": location['arrive'], "adressea": arrive.address,
                 "distance": distance_location(depart.latitude, depart.longitude, arrive.latitude, arrive.longitude)
                }
        return json.dumps({'result': tem_d})

if __name__ == "__main__":
    app.run(port=5000, debug=True)