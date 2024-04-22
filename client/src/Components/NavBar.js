import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import  userRoleContext  from "../context/Roles/userRoleContext"; 
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    let location = useLocation();
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    // Access the role from context
    const { role,setRole } = useContext(userRoleContext); // Using named export here

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clear localStorage and redirect the user to the login page
        localStorage.removeItem('authToken');
        navigate("/");
        setRole("");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid d-flex">
                    <Link className="navbar-brand" to="/">Apli Society</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ">
                            {authToken && role === "User" && ( // Render additional links if user is logged in and has a specific role
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/GetTransactions' ? "active" : ""}`} to="/GetTransactions">Transactions</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/GetNotices' ? "active" : ""}`} to="/GetNotices">Notices</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/UserCalender' ? "active" : ""}`} to="/UserCalender">Calender</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/GetMembers' ? "active" : ""}`} to="/GetMembers">User</Link>
                                    </li>
                                    
                                </>
                            )}
                            {authToken && role === "Admin" && ( // Render additional links if user is logged in and has a specific role
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/AdminDashboard' ? "active" : ""}`} to="/AdminDashboard">DashBoard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/CreateTransaction' ? "active" : ""}`} to="/CreateTransaction">Transactions</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/CreateMembers' ? "active" : ""}`} to="/CreateMembers">Members</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/CreateNotice' ? "active" : ""}`} to="/CreateNotice">Notices</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/Calender' ? "active" : ""}`} to="/Calender">Calender</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/AdminData' ? "active" : ""}`} to="/AdminData">User</Link>
                                    </li>
                                    
                                </>
                            )}
                            {!authToken && ( // Render links only if the user is not logged in
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">AboutUs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="/contact">Contact</Link>
                                    </li>
                                    
                                </>
                            )}
                            {authToken && role === "SuperAdmin" &&( 
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === '/Society' ? "active" : ""}`} to="/Society">Societies</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav" >
                        <ul className="navbar-nav ">
                            {!authToken && <li className="nav-item">
                                            <Link className={`btn btn-outline-success mx-2`} to="/login">Login</Link>
                            </li>}
                            {authToken && ( // Render logout button if user is logged in
                                <button className="btn btn-outline-warning mx-2" onClick={handleLogout}>Logout</button>
                            )}
                        </ul>                                   
                    </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
