import { useDispatch } from "react-redux";
import { removeWishList } from "../../../Slices/FeaturesSlice";

export function RemoveBtn({ idx }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(removeWishList(idx))}
      className="px-3 py-1 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition-all w-10 flex items-center justify-center"
    >
      X
    </button>
  );
}
