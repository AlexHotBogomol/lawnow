import React from "react";
import "./Layout.css";
import logo from '../../logo.svg';

const Layout = ({children}) => {
  return (
    <main id="content">
      <img className="logo" src={logo} alt="LawNow"/>
      <div className="container">
      {children}
      </div>
    </main>
  )
};

export default Layout;