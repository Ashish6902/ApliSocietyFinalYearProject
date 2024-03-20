import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import About from './pages/Defalut/About';
import Contact from './pages/Defalut/Contact';
import Login from './Components/Login';
import Home from './pages/Defalut/Home';
import SetRoles from './context/Roles/userRoleContextprovider';
import Transactions from './pages/Users/Transactions';
import PrivateRoutes from './privateRoute';
import Notices from './pages/Users/Notices';
import Members from './pages/Users/Members';
import CreateTransaction from './pages/AdminPages/CreateTransaction';
import CreateMembers from './pages/AdminPages/CreateMembers';
import CreateNotice from './pages/AdminPages/CreateNotice';
import NoticeState from './context/Notice/NoticeState';
import MemberState from './context/Members/MemberState';
import TransactionState from './context/Transactions/TransactionState'
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import AdminEvents from './pages/AdminPages/AdminEvents';


function App() {
  return (
    <SetRoles>
      <NoticeState>
      <MemberState>
      <TransactionState>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={<PrivateRoutes/>}>
              <Route exact path='/AdminDashboard' element={<AdminDashboard/>} />
              <Route exact path='/GetTransactions' element={<Transactions/>} />
              <Route exact path='/GetMembers' element={<Members/>} />
              <Route exact path='/GetNotices' element={<Notices/>} />
              <Route exact path='/Calender' element={<AdminEvents/>} /> {/*rendering AdminEvent ar calender route */}
              <Route exact path='/CreateTransaction' element={<CreateTransaction/>} />
              <Route exact path='/CreateMembers' element={<CreateMembers/>} />
              <Route exact path='/CreateNotice' element={<CreateNotice/>} />
          </Route>
        </Routes>
      </Router>
      </TransactionState>
      </MemberState>
      </NoticeState>
    </SetRoles>
  );
}

export default App;