import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import FamiliarsPage from "./pages/FamiliarsPage";
import GroupsPage from "./pages/GroupsPage";
import CustomerPage from "./pages/CustomersPage";
import ContractPage from "./pages/ContractsPage";

function AppContent() {
  const location = useLocation();

  const noSidebarRoutes = ["/login", "/register"];

  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {!hideSidebar && <Sidebar />}

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/familiars" element={<FamiliarsPage/>} />
          <Route path="/groups" element={<GroupsPage/>} />
          <Route path="/customers" element={<CustomerPage/>} />
          <Route path="/contracts" element={<ContractPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}