import React, {useContext }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import About from './pages/Defalut/About';
import Contact from './pages/Defalut/Contact';
import Login from './Components/Login';
import Home from './pages/Defalut/Home';
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
import AdminBalanceSheet from './pages/AdminPages/AdminBalanceSheet';
import UserCalender from './pages/Users/UserCalender';
import userRoleContext from './context/Roles/userRoleContext';
import Society from './pages/SuperAdmin/Society';
import SocietyState from './context/Society/SocietyState';
import AdminDetails from './pages/SuperAdmin/AdminDetails';
import AdminState from './context/AdminsData/AdminState';
import AdminData from './pages/AdminPages/AdminData';
import EmailBoradcast from './pages/AdminPages/EmailBoradcast';
import ComplaintBox from './pages/AdminPages/ComplaintBox';
import Complaints from './pages/Users/Complaints';
function App() {

  const {role} = useContext(userRoleContext);;
  
  return (
      <AdminState>
      <SocietyState>
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
              {role === "SuperAdmin" && <Route exact path='/Society' element={<Society/>} />}
              {role === "SuperAdmin" && <Route exact path='/AdminDetails' element={<AdminDetails/>}/>}

              {role === "Admin" && <Route exact path='/AdminDashboard' element={<AdminDashboard/>} />}
              {role === "Admin" &&<Route exact path='/CreateTransaction' element={<CreateTransaction/>} />}
              {role === "Admin" &&<Route exact path='/CreateMembers' element={<CreateMembers/>} />}
              {role === "Admin" &&<Route exact path='/CreateNotice' element={<CreateNotice/>} />}
              {role === "Admin" &&<Route exact path='/Calender' element={<AdminEvents/>} /> }{/*rendering AdminEvent ar calender route */}
              {role === "Admin" &&<Route exact path='/AdminData' element={<AdminData/>}/>}
              {role === "Admin" &&<Route exact path='/BroadCast' element={<EmailBoradcast/>}/>}
              {role === "Admin" &&<Route exact path='/Complaints' element={<ComplaintBox/>}/>}


              {role === "User" &&<Route exact path='/GetMembers' element={<Members/>} />}
              {role === "User" &&<Route exact path='/GetTransactions' element={<Transactions/>} />}
              {role === "User" &&<Route exact path='/UserCalender' element={<UserCalender/>} />}
              {role === "User" &&<Route exact path='/Complaints' element={<Complaints/>} />}

              <Route exact path='/BalanceSheet' element={<AdminBalanceSheet/>} />
              <Route exact path='/GetNotices' element={<Notices/>} />
          </Route>
        </Routes>
      </Router>
      </TransactionState>
      </MemberState>
      </NoticeState>
      </SocietyState>
      </AdminState>
  );
}

export default App;