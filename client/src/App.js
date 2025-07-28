import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'; 
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedCustomerRoute from './components/ProtectedCustomerRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute> <AdminDashboard /> </ProtectedAdminRoute>}/>
        <Route path="/customer/dashboard" element={<ProtectedCustomerRoute> <CustomerDashboard /> </ProtectedCustomerRoute>}/>
      </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
