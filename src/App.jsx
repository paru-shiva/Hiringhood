import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Farmer from "./components/Farmer";

function App() {
  return (
    <div className="appComponent">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/farmers" Component={Farmer} />
      </Routes>
    </div>
  );
}

export default App;
