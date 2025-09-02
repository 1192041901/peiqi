import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Routers from "./router";
import Nav from "./comment/nav";
function App() {
  return (
    <>
      <Nav />
      <Routers />
    </>
  );
}

export default App;
