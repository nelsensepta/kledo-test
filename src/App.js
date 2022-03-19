import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard";
import Shipping from "./pages/shipping";
import ShippingTambah from "./pages/shipping/tambah";
import ShippingEdit from "./pages/shipping/edit";

function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/shipping/tambah" element={<ShippingTambah />} />
      <Route path="/shipping/edit/:id" element={<ShippingEdit />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
