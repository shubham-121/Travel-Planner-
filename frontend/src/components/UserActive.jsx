import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteActiveUser, toggleActiveUser } from "../Slices/ActiveUserSlice";
import { beautifyString } from "./utils/helperFunctions";

//
export default function UserActive() {
  return (
    <div>
      <CheckUserValid></CheckUserValid>
    </div>
  );
}

/* {conditionally render this based on user login or new user using the session token} */

function CheckUserValid() {
  const { isUserActive, userActiveData } = useSelector(
    (store) => store.ActiveUser
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState();

  //user Logout
  async function handleLogOut() {
    dispatch(toggleActiveUser());
    dispatch(deleteActiveUser());

    //write a fetch request here to clear the cookie from the backedn when user logout
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log("Successfully logged out the user from the app", data);
        alert("Successfully logged out the user from the app");
      } else {
        console.log("Error in logging out the user from the app");
        alert("Error in logging out the user from the app");
      }
    } catch (err) {
      console.error(
        "Error occured while logging the user out of the app",
        err.message
      );
    }
    navigate("/");
  }

  return (
    <div className="flex flex-row space-x-2">
      <button
        className="text-sm sm:text-base px-3 py-1 rounded-md bg-blue-400 hover:bg-blue-500 text-white transition-all"
        // onClick={() => navigate("/signin")}
        onClick={() =>
          isUserActive ? navigate("/myItineraries") : navigate("/login")
        }
      >
        {isUserActive ? `${beautifyString(userActiveData.userName)}` : "Log In"}
      </button>

      {isUserActive && (
        <button
          className="text-sm sm:text-base px-1 py-1 rounded-md bg-blue-400 hover:bg-blue-500 text-white transition-all"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      )}
    </div>
  );

  /* {conditionally render this based on user login or new user} */
}
