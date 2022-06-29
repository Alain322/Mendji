import pandas as pd
from geopy.geocoders import Nominatim 
from math import *


ft = pd.read_excel ('dataset_trus.xlsx')
dta = pd.DataFrame(ft)


da = dta[['Jour', 'Periode', 'Depart', 'label_d', 'Arrive', 'label_a', 'Cout', 'Trafic', 'Route', 'Duree']]

loca_d = []
loca_a = []

nomination = Nominatim(user_agent='Noned')

def distance_location(lat1, lon1, lat2, lon2):
    R = 6372.8
    dLat = radians(lat2 - lat1)
    dLon = radians(lon2 - lon1)
    lat1 = radians(lat1)
    lat2 = radians(lat2)
    a = sin(dLat/2)**2 + cos(lat1)*cos(lat2)*sin(dLon/2)**2
    c = 2*asin(sqrt(a))
    return R * c



# for i in range(5):
for i in range(len(da)):
    
    location_d = nomination.geocode(da.iloc[i, 2] + ", Yaounde", timeout=4) 
    location_a = nomination.geocode(da.iloc[i, 4] + ", Yaounde", timeout=4)
    
    if((location_d != None) and (location_a != None)):
        tem_d = {"Jour": da.iloc[i, 0], "Periode": da.iloc[i, 1], "Depart": da.iloc[i, 2], "Label_d": da.iloc[i, 3], 
                 "Adresse_d": location_d.address, "Longitude_d": location_d.longitude , "Latitude_d": location_d.latitude
                }
        tem_a = {"Arrive": da.iloc[i, 4], "Label_a": da.iloc[i, 5], "Adresse_a": location_a.address, 
                 "Longitude_a": location_a.longitude , "Latitude_a": location_a.latitude, 'Cout': da.iloc[i, 6],
                 "distance": distance_location(location_d.latitude, location_d.longitude, location_a.latitude, location_a.longitude),
                 'Trafic': da.iloc[i, 7], 'Route': da.iloc[i, 8], 'Duree': da.iloc[i, 9]}
        
        loca_d.append(tem_d)
        loca_a.append(tem_a)
    else:
        if(location_d == None):
            print(i, "\t", da.iloc[i, 2], "\n")
        if(location_a == None):
            print(i, "\t", da.iloc[i, 4], "\n")
            

loca1 = pd.DataFrame(loca_d)
loca2 = pd.DataFrame(loca_a)
locations = pd.concat([loca1,loca2], axis=1)
# locations


# locations.to_excel('new_populate.xlsx', index=False)