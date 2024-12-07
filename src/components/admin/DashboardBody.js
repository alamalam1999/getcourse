import React from 'react';

function DashboardBody() {
  return (
    <div className="p-4">
      <h2>Dashboard Overview</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Total Users</h5>
            <p>1,234</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Total Sales</h5>
            <p>$12,345</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>New Signups</h5>
            <p>56</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBody;
