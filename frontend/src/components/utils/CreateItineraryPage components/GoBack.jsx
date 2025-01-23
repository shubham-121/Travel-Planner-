import { useNavigate } from "react-router";

export function GoBack({ route }) {
  const navigate = useNavigate();

  return (
    <button
      className="font-semibold text-base px-6 py-2 mt-4 ml-6 bg-gray-500 text-white rounded-full border border-gray-400 hover:bg-gray-600 hover:scale-105 transition-all"
      onClick={() =>
        route === "createItineraries"
          ? navigate("/createItineraries")
          : navigate("/")
      }
    >
      Go Back
    </button>
  );
}
