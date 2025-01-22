import { useNavigate } from "react-router";

export function GoBack() {
  const navigate = useNavigate();

  return (
    <button
      className="font-semibold text-l px-6 py-2.5 mt-4 ml-6  border-custom bg-gray-400 rounded-full hover:scale-105 "
      onClick={() => navigate("/")}
    >
      Go back
    </button>
  );
}
