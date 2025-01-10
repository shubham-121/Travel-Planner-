import { useState } from "react";
import MapComponent from "./components/MapComonents/MapComponent";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div>
      <SearchBar></SearchBar>
      <MapComponent></MapComponent>
    </div>
  );
}
