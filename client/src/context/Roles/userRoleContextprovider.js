import React, { useState } from "react";
import userRoleContext from "./userRoleContext"; 

function SetRoles({ children }) {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [userId,setId] = useState(localStorage.getItem('userId') || '')

  const updateUserId = (newUserId) => {
    setId(newUserId);
    localStorage.setItem('userId', newUserId);
  };

  return (
    <div>
      <userRoleContext.Provider value={{ role, setRole ,userId,setId,updateUserId}}>
        {children}
      </userRoleContext.Provider>
    </div>
  );
}

export default SetRoles;