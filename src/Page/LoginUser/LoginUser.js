import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });   

      const responseText = await response.text(); // Get the response as text
      console.log('Response text:', responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText); // Attempt to parse the response as JSON
          console.log('Response data:', data);


        const userData = {
            id: data.user['id'],
            name: data.user['name'],
            email: data.user['email'],
        };

          if (data.token) {
            setMessage('Login successful!');
            localStorage.setItem('token', data.token);
            navigate('/dashboard-user',{ state: { user: userData }});
          }
        } catch (error) {
          console.error('Response is not JSON:', responseText);
        }
      } else {
        setMessage('Login failed. Check your credentials.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
