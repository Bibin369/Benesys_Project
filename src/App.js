import "./App.css";
import { Fragment } from "react";
import LoginDashboard from "./components/LoginDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/" element={<LoginDashboard />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
