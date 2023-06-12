import { useState, useEffect } from "react";
import "./App.css";
import { saveUser } from "./service/appService";
import AllUser from "./component/AllUser";

function App() {
  return (
    <div className="App">
      <AllUser />
    </div>
  );
}

export default App;
