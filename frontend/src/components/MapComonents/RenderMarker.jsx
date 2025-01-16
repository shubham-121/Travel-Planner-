import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import Button from "./../utils/Button";
import RenderButtonsOnMarker from "./RenderButtonsOnMarker";

const API_KEY = import.meta.env.VITE_API_kEY; //for reverse geocoding

//shows a marker when use clicks anywhere in the map
export default function RenderMarker({ clickedMarker, setClickedMarker }) {
  //state for holding reverse geocoding location
  const [reverseGeocodeData, setReverseGeocodeData] = useState("");

  //reverse geocoding using the clicked marker coordinates

  useEffect(() => {
    async function reverseGeocoding() {
      if (!clickedMarker || clickedMarker.length < 2) return; // Ensure valid coordinates

      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${clickedMarker[0]}%2C${clickedMarker[1]}&key=${API_KEY}`
        );

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          alert("Failed to reverse geocode the clicked marker on map");
          return;
        }

        console.log("Reverse geocoded location-> ", data.results[0].formatted);

        setReverseGeocodeData(data.results[0].formatted);
      } catch (error) {
        console.error(
          "failed to reverse geocode the clicked marker on map",
          error
        );
      }
    }
    reverseGeocoding();
  }, [clickedMarker]);

  //render marker on the map when user clicks
  const map = useMapEvents({
    click: (e) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;

      console.log(`Clicked location lat: ${clickedLat} and long:${clickedLng}`);

      // console.log("location found:", e);
      setClickedMarker([clickedLat, clickedLng]);
      // reverseGeocoding();
      map.locate();
    },
  });
  // return null;
  return (
    clickedMarker && (
      <Marker position={clickedMarker}>
        <Popup>
          You clicked here: <br />
          {/* {`Clicked coords: ${clickedMarker}`} <br /> */}
          {reverseGeocodeData
            ? `${reverseGeocodeData}`
            : "Fetching place name..."}{" "}
          <RenderButtonsOnMarker
            clickedLocation={reverseGeocodeData}
          ></RenderButtonsOnMarker>
        </Popup>
      </Marker>
    )
  );
}
