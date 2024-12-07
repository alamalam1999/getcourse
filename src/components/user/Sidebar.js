import React from 'react';

function Sidebar() {
  return (
    <div className="d-flex flex-column custom-sidebar text-black" style={{ height: '100vh', width: '250px' }}>
      <a className="text-black text-center py-3 label-sidebar mb-3" href="/">DASHBOARD</a>
      <ul className="nav flex-column">
        <li className="nav-item nav-sidebar">
          <a className="nav-link text-black" href="#!">Overview</a>
        </li>
        <li className="nav-item nav-sidebar">
          <a className="nav-link text-black" href="#!">Settings</a>
        </li>
        <li className="nav-item nav-sidebar">
          <a className="nav-link text-black" href="#!">Users</a>
        </li>
        <li className="nav-item nav-sidebar">
          <a className="nav-link text-black" href="#!">Reports</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
