import React, { Component } from 'react'
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Login from './Page/LoginAdmin/Login'
import Dashboard from './Dashboard'
import Register from './Page/LoginAdmin/Register'
import AdminDashboard from './Page/Dashboard/AdminDashboard'
import ProtectedRoute from './ProtectedRoute'
import LoginUser from './Page/LoginUser/LoginUser'
import RegisterUser from './Page/LoginUser/RegisterUser'
import UserDashboard from './Page/Dashboard/UserDashboard'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard-user" 
          element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
          }
          />
          <Route path="/register" element={<Register /> } />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login-user" element={<LoginUser/>} />
          <Route path="/register-user" element={<RegisterUser/>} />
        </Routes>
      </Router>
    )
  }
}
