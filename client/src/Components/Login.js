import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userRoleContext from "../context/Roles/userRoleContext"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const { setRole } = useContext(userRoleContext);

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

      let userRole = await checkRole(authToken);
      console.log(userRole);
      switch (userRole) {
        case "User":
          navigate("/GetTransactions");
          break;
        case "Admin":
          navigate("/CreateTransaction");
          break;
        
        default:
          break;
      }
      // Store token in local storage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('role',userRole );
      // Optionally, redirect or update state to reflect successful login
    } catch (error) {
      console.error('Error:', error.message);
      // Optionally, show an error message to the user
    }
  };

  //checkRole
  const checkRole = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getuserRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const data = await response.json(); // Parse response to JSON
      const role = data.role; // Assuming the response contains a 'role' property
      setRole(role); // Set the role using the provided setRole function
      return role;
    } catch (error) {
      console.error('Error checking role:', error.message);
    }
  };

  // Check if authToken exists in localStorage
  const authToken = localStorage.getItem('authToken');

  return (
    <div className='container my-4 border border-secondary p-4 mb-4'>
      {authToken ? (
        <h1>You are already logged in</h1>
      ) : (
        <div className="container ">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" autoComplete="email" />

              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} autoComplete="current-password" />

            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
