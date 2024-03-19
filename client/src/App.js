import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <SetRoles>
      <NoticeState>
      <MemberState>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={<PrivateRoutes/>}>
              <Route path='/GetTransactions' element={<Transactions/>} />
              <Route path='/GetMembers' element={<Members/>} />
              <Route path='/GetNotices' element={<Notices/>} />
              <Route path='/CreateTransaction' element={<CreateTransaction/>} />
              <Route path='/CreateMembers' element={<CreateMembers/>} />
              <Route path='/CreateNotice' element={<CreateNotice/>} />
          </Route>
        </Routes>
      </Router>
      </MemberState>
      </NoticeState>
    </SetRoles>
  );
}

export default App;