import React from "react";
import { createContext, useState } from "react";

const CoupenContext = createContext({});

function CoupenProvider({ children }) {
  const [coupens, setCoupens] = useState({});
  return (
    <CoupenContext.Provider value={{ coupens, setCoupens }}>
      {children}
    </CoupenContext.Provider>
  );
}

export { CoupenContext, CoupenProvider };
