import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthTest from "../AuthTest";
import InventoryDashboard from "../Inventory/dashboard/InventoryDashboard";
import { AuthProvider } from "./AuthProvider";
import Callback from "./Callback";
import ProtectedRoutes from "./ProtectedRoutes";

export default function RouterRoot() {


  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
              <Route path="/" element={<ProtectedRoutes><AuthTest /></ProtectedRoutes>} />
              <Route path="/callback" element={<Callback/>}/>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
