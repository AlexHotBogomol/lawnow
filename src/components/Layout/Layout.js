import React from "react";
import "./Layout.css";

const Layout = ({children}) => {
  return (
    <main id="content">
      <div className="container">
      {children}
      </div>
    </main>
  )
};

export default Layout;