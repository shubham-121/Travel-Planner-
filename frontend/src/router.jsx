import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./components/ExtraComponents/AboutUs";
import App from "./App";
import ContactUs from "./components/ExtraComponents/ContactUs";
import MyItineraries from "./components/ExtraComponents/CreateItineraries";
import Login from "./components/ExtraComponents/Login";
import Signin from "./components/ExtraComponents/Signin";
import Homepage from "./components/ExtraComponents/Homepage";
import PasswordChange from "./components/ExtraComponents/PasswordChange";
import { HeaderTitle } from "./components/SearchBar";
import CreateItineraries from "./components/ExtraComponents/CreateItineraries";
import MySavedItineraries from "./components/ExtraComponents/MySavedItineraries/MySavedItineraries";
import { loader as getSavedItineraryFromDB } from "./components/ExtraComponents/MySavedItineraries/SavedItineraryLoader";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/home",
    element: <Homepage></Homepage>,
    children: [
      {
        index: true,
        element: <HeaderTitle></HeaderTitle>,
        //  render header title also in the homepage route using outlet
      },
    ],
  },
  {
    path: "/aboutus",
    element: <AboutUs></AboutUs>,
    children: [
      {
        index: true,
        element: <HeaderTitle></HeaderTitle>,
        //  render header title also in the about route using outlet
      },
    ],
  },
  {
    path: "/contactus",
    element: <ContactUs></ContactUs>,
    children: [
      {
        index: true,
        element: <HeaderTitle></HeaderTitle>,
        //  render header title also in the contact route using outlet
      },
    ],
  },
  {
    path: "/createItineraries",

    element: <CreateItineraries></CreateItineraries>,
  },
  {
    //add data loader in this route
    path: "/savedItineraries",
    element: <MySavedItineraries></MySavedItineraries>,
    loader: getSavedItineraryFromDB,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  {
    path: "/passwordChange",
    element: <PasswordChange></PasswordChange>,
  },
]);

export { appRouter };
