import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSVGOverlay } from "react-leaflet/SVGOverlay";
import "../../index.css";
import RenderMap from "./RenderMap";

//here the map is rendered to page
export default function MapComponent() {
  return (
    <div className="h-screen w-full  ">
      <RenderMap></RenderMap>
    </div>
  );
}
