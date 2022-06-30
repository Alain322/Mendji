import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";

export default function AppMap({wpoint}) {
  const position = [3.9082808, 11.5329897];

  return (
    <MapContainer center={(wpoint.length > 0)? [wpoint[0].latitude, wpoint[0].longitude]: position} zoom={14} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {(wpoint.length === 0)? (null): <Routing wspoints={wpoint}/>}
    </MapContainer>
  );
}
