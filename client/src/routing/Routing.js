import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

function Routing({wspoints}) {
  const map = useMap();

  const points = []

  wspoints.map((point, index) => ( 
    points.push(L.latLng(point.latitude, point.longitude))
  ))

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: points,
      // waypoints: [L.latLng(3.9082808, 11.5329897), L.latLng(3.86667, 11.5167)],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

export default Routing