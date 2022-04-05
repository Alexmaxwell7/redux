import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Read from "./components/Read";
import Create from "./components/Create";
import Update from "./components/Update";
const Component1 = () => {
  return <Read/>;
};

const Component2 = () => {
  return <Create/>;
};
const Component3 =()=>{
  return <Update/>
}
function App() {
  let routes = useRoutes([
    { path: "/", element: <Component1 /> },
    { path: "/create", element: <Component2 /> },
    { path:"/update/:id", element: <Component3 /> },
  ]);
  return routes;
};
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
  

export default AppWrapper;
