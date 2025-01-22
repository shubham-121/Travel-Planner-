import { useDispatch } from "react-redux";
import { removeWishList } from "../../../Slices/FeaturesSlice";

export function RemoveBtn({ idx }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(removeWishList(idx))}
      className="px-2 py-1  rounded-full bg-red-400 text-white hover:bg-red-500 w-[5%]"
    >
      X
    </button>
  );
}
