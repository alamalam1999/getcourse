import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/styles-custom.css';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Header from '../../components/admin/Header';
import DashboardBody from '../../components/admin/DashboardBody';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists, otherwise redirect to login page
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <Header />
        <DashboardBody />
      </div>
    </div>
  );
}

export default AdminDashboard;
