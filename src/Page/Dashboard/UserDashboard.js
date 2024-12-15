import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/styles.css';
import Sidebar from '../../components/user/Sidebar';
import Navbar from '../../components/user/Navbar';
import Header from '../../components/user/Header';
import DashboardBody from '../../components/user/DashboardBody';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-user');
    }
  }, [navigate]);

  return (
    <div className="d-flex">
      <div className="custom-sidebar " style={{ width: '250px', minWidth: '250px' }}>
        <Sidebar />
      </div>
      <div className="flex-grow-1">
        <Navbar />
        <Header />
        <DashboardBody />
      </div>
  </div>
  );
}

export default UserDashboard;
