import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./components/ExtraComponents/AboutUs";
import App from "./App";
import ContactUs from "./components/ExtraComponents/ContactUs";
import MyItineraries from "./components/ExtraComponents/MyItineraries";
import Login from "./components/ExtraComponents/Login";
import Signin from "./components/ExtraComponents/Signin";
import Homepage from "./components/ExtraComponents/Homepage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/home",
    element: <Homepage></Homepage>,
  },
  {
    path: "/aboutus",
    element: <AboutUs></AboutUs>,
  },
  {
    path: "/contactus",
    element: <ContactUs></ContactUs>,
  },
  {
    path: "/myItineraries",
    element: <MyItineraries></MyItineraries>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
]);

export { appRouter };
