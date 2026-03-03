import React, { createContext, useState } from "react";

export const EmployeeContext = createContext<any>(null);

export const EmployeeProvider = ({ children }: any) => {
  const [employees, setEmployees] = useState([]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};