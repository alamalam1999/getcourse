import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {

  const location = useLocation();
  const user = location.state?.user;
  return (
    <div className="p-4 bg-primary text-white">
      <h1>Welcome, {user?.name}</h1>
      <p>Your overview for today</p>
    </div>
  );
}

export default Header;
