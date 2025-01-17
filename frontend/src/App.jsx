import { useState } from "react";
import MapComponent from "./components/MapComonents/MapComponent";
import SearchBar from "./components/SearchBar";
import { useSelector } from "react-redux";
import Modal from "./components/utils/Modal";
import FavouriteModal from "./components/utils/FavouriteModal";
import WishlistModal from "./components/utils/WishlistModal";
import VisitedModal from "./components/utils/VisitedModal";

export default function App() {
  return (
    <div>
      <SearchBar></SearchBar>
      <MapComponent></MapComponent>
      <RenderModalWindow></RenderModalWindow>
    </div>
  );
}


//render the features modal when the user clicks any one of the three
function RenderModalWindow() {
  const { isFavClicked, isWishClicked, isVistClicked } = useSelector(
    (store) => store.Features
  );

  return (
    <div>
      {isFavClicked && <FavouriteModal></FavouriteModal>}
      {isWishClicked && <WishlistModal></WishlistModal>}
      {isVistClicked && <VisitedModal></VisitedModal>}
    </div>
  );
}
