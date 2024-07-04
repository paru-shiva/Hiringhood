import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Farmer from "./components/Farmer";
import EventPlanner from "./components/EventPlanner";
import Traveller from "./components/Traveller";

function App() {
  return (
    <div className="appComponent">
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/farmer" Component={Farmer} />
        <Route exact path="/eventplanner" Component={EventPlanner} />
        <Route exact path="/traveller" Component={Traveller} />
      </Routes>
    </div>
  );
}

export default App;
