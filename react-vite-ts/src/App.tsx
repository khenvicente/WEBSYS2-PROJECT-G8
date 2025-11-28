import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import UserRequest from "./components/UserRequest";
import FamiliarGroup from "./components/FamiliarGroup";
import Familiar from "./components/Familiar";
import Contracts from "./components/Contracts";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-request" element={<UserRequest />} />
        <Route path="/familiar-group" element={<FamiliarGroup />} />
        <Route path="/familiar" element={<Familiar />} />
        <Route path="/contracts" element={<Contracts />} />
      </Routes>
    </Router>
  );
}
