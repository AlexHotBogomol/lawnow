import React from "react";
import './Heading.css';

const Heading = ({title, icon}) => {
  return(
    <div className="heading">
      {icon} <h1>{title}</h1>
    </div>
  )
};

export default Heading;