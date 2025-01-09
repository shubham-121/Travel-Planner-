import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSVGOverlay } from "react-leaflet/SVGOverlay";
import "../index.css";

//here the map is rendered to page
export default function MapComponent() {
  return (
    <div>
      <p className="text-center font-semibold text-xl mb-4 border-custom mt-1">
        Itinerary Planner
      </p>
      <RenderMap></RenderMap>
    </div>
  );
}

function RenderMap() {
  const [cordinates, setCordinates] = useState(null);

  //get initial coords of the user
  useEffect(() => {
    async function getInitialCoords() {
      const coords = navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          console.log(`Latitude is: ${lat} and longitude is ${lng}`);

          setCordinates([lat, lng]);
        },
        (error) => {
          alert("user denied the location access");
          console.log(error);
        }
      );
    }
    getInitialCoords();
  }, []);

  if (cordinates === null) {
    //show loading if cordinates not fetched intially
    return (
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xl text-center">Loading map... </p>
      </div>
    );
  }

  return (
    <div>
      <MapContainer
        center={cordinates}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
