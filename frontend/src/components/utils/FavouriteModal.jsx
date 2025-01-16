import { useDispatch, useSelector } from "react-redux";
import { removeFavourites, toggleFavModal } from "../../Slices/FeaturesSlice";

export default function FavouriteModal() {
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-40">
      <RenderFavModal />
    </div>
  );
}
function RenderFavModal() {
  const { favourites } = useSelector((store) => store.Features);
  const dispatch = useDispatch();

  return (
    <div className="border-custom min-h-[50%] max-h-[80vh] overflow-auto bg-white z-50 fixed p-6 rounded-lg shadow-xl w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Close Button */}
      <button
        className="absolute w-7 h-8 bg-red-500 top-1 right-3 hover:scale-105 border-custom rounded-full text-xl font-bold text-gray-900"
        onClick={() => dispatch(toggleFavModal())}
      >
        X
      </button>

      <div className="flex items-center justify-center flex-col">
        <p className="text-xl font-semibold mb-4">Your Favourite Places:</p>
        {favourites.length > 0 ? (
          <RenderFavourites fav={favourites} />
        ) : (
          <p>No favourite places</p>
        )}
      </div>
    </div>
  );
}

function RenderFavourites({ fav }) {
  const { favourites } = useSelector((store) => store.Features); //global state
  const dispatch = useDispatch();

  //   function handleRemoveFavourite() {}
  return (
    <div>
      <ol className="list-decimal pl-6 space-y-2">
        {fav.map((fav, idx) => (
          <li
            key={idx}
            className="relative text-lg text-gray-700 py-2 pl-8 pr-12 rounded-lg bg-blue-100 border border-gray-300 hover:bg-gray-100 transition-all"
          >
            {fav}
            {/* Close Button */}
            <button
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white text-sm font-bold rounded-full hover:bg-red-700"
              onClick={() => dispatch(removeFavourites(idx))} // Call the remove function
            >
              X
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
