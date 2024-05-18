import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userRoleContext from "../context/Roles/userRoleContext";
import Notification from './Notification';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const { setRole, setId } = useContext(userRoleContext);
  const [alert, setAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const authToken = data.authtoken;
      const Userid = data.userID;

      let userRole = await checkRole(authToken);
      setRole(userRole);
      switch (userRole) {
        case "User":
          navigate("/GetTransactions");
          break;
        case "Admin":
          navigate("/AdminDashboard");
          break;
        case "SuperAdmin":
          navigate("/Society");
          break;
        default:
          break;
      }
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('role', userRole);
      localStorage.setItem('userId', Userid);
    } catch (error) {
      setAlert(true);
      console.error('Error:', error.message);
    }
  };

  const checkRole = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getuserRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const data = await response.json();
      const role = data.role;
      const Userid = data._id;
      setRole(role);
      setId(Userid);
      return role;
    } catch (error) {
      console.error('Error checking role:', error.message);
    }
  };

  const authToken = localStorage.getItem('authToken');

  const handleCloseNotification = () => {
    setAlert(false);
  };

  return (
    <div className='login-main-container'>
      {alert && <Notification type="danger" msg="Login failed. Please check your credentials." onClose={handleCloseNotification} />}
      {authToken ? (
        <h1>You are already logged in</h1>
      ) : (
        <div className="login-form-container">
          <center><h2>Login</h2></center>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} autoComplete="current-password" />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
