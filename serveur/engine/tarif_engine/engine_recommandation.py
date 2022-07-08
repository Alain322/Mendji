from flask import Flask, request
import pickle
import pandas as pd
import numpy as np
import json

from geopy.geocoders import Nominatim
from math import *

from pyroutelib3 import Router
import folium
import os

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


def formatage(texte):
    i = 0
    ret = ""
    while i < 5:
        if texte[i] != ' ':
            ret += texte[i]
            i += 1
    ret = ret.strip()
    return ret


def distanceroutedijkstra(lat1, lon1, lat2, lon2, departAdresse, arriveeAdresse, desc1="", desc2=""):
    coor_depart = [lat1, lon1]
    coor_arrivee = [lat2, lon2]
    latm = (float)(lat1+lat2)/2
    lonm = (float)(lon1+lon2)/2
    departAddr = str(departAdresse).strip()
    arriveeAddr = str(arriveeAdresse).strip()
    departAddr = "<i>"+departAddr+"</i>"
    arriveeAddr = "<i>"+arriveeAddr+"</i>"
    msg = ""
    c = folium.Map(location=[latm, lonm], zoom_start=16)
    folium.Marker(coor_depart,
                  icon=folium.Icon(color="blue"),
                  tooltip=departAddr,
                  popup=desc1).add_to(c)
    folium.Marker(coor_arrivee,
                  icon=folium.Icon(color="blue"),
                  tooltip=arriveeAddr,
                  popup=desc2).add_to(c)
    router = Router("car")
    depart = router.findNode(coor_depart[0], coor_depart[1])
    arrivee = router.findNode(coor_arrivee[0], coor_arrivee[1])
    routeLatLong = [coor_depart, coor_arrivee]
    status, route = router.doRoute(depart, arrivee)

    if status == 'success':
        routeLatLong = list(map(router.nodeLatLon, route))

    for coord in routeLatLong:
        coord = list(coord)
        folium.CircleMarker(coord,
                            radius=3,
                            fill=True,
                            color='red').add_to(c)

    dep, arr = formatage(departAdresse), formatage(arriveeAdresse)
    folium.PolyLine(routeLatLong,
                    color='blue',
                    weight=2.5,
                    opacity=1).add_to(c)
    trace = "../../../client/" + dep + '-' + arr +'.html'
    c.save(trace)
    c.save(str( dep + '-' + arr +'.html'))
    import webbrowser 
  
    webbrowser.open(str( dep + '-' + arr +'.html')) 
    return str("./../../" + dep + '-' + arr + '.html')


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
    data = request.get_json()
    distance = distanceroutedijkstra(
        float(data['depart']['latitude']),
        float(data['depart']['longitude']),
        float(data['arrive']['latitude']),
        float(data['arrive']['longitude']),
        str(data['dept']),
        str(data['arr']),
        "",
        ""
    )
    
    return json.dumps({'result': distance})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
