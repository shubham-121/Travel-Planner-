import { useDispatch, useSelector } from "react-redux";
import Button from "../utils/Button";
import {
  addToFavourites,
  addToVisited,
  addToWishList,
} from "../../Slices/FeaturesSlice";

//show 3 buttons on the markers (features- favs,wishlist,visited)
export default function RenderButtonsOnMarker({ clickedLocation }) {
  const dispatch = useDispatch();

  const { favourites, wishlist, visited } = useSelector(
    (store) => store.Features
  );

  function handleAddToFavourites() {
    dispatch(addToFavourites(clickedLocation));
  }

  function handleAddToWishList() {
    dispatch(addToWishList(clickedLocation));
  }

  function handleAddToVisited() {
    dispatch(addToVisited(clickedLocation));
  }

  return (
    <div className="flex flex-row justify-center items-center space-x-2">
      <Button
        onClick={handleAddToFavourites}
        content={"Add To Favourites"}
        className={
          "bg-green-300 text-sm font-semibold rounded-full   hover:scale-105"
        }
      ></Button>
      <Button
        onClick={handleAddToWishList}
        content={"Add To WishList"}
        className={
          "bg-green-300 text-sm font-semibold rounded-full  hover:scale-105"
        }
      ></Button>
      <Button
        onClick={handleAddToVisited}
        content={"Add To Visited"}
        className={
          "bg-green-300 text-sm font-semibold rounded-full  hover:scale-105"
        }
      ></Button>{" "}
    </div>
  );
}
