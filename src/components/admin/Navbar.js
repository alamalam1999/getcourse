import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Admin Dashboard</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-brand navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#!">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
