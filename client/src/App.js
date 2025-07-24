import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'; 
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedCustomerRoute from './components/ProtectedCustomerRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute> <AdminDashboard /> </ProtectedAdminRoute>}/>
        <Route path="/customer/dashboard" element={<ProtectedCustomerRoute> <CustomerDashboard /> </ProtectedCustomerRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
