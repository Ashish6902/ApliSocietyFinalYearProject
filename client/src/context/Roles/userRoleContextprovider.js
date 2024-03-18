import React, { useState } from "react";
import userRoleContext from "./userRoleContext"; 

function SetRoles({ children }) {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  return (
    <div>
      <userRoleContext.Provider value={{ role, setRole }}>
        {children}
      </userRoleContext.Provider>
    </div>
  );
}

export default SetRoles;