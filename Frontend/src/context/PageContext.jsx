import React, { createContext, useContext, useState } from "react";

const PageContext = createContext(null);

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
