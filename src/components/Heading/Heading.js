import React from "react";
import './Heading.css';
import NearHeading from "../../icons/NearHeading";

const Heading = ({title}) => {
  return(
    <div className="heading">
      <NearHeading/> <h1>{title}</h1>
    </div>
  )
};

export default Heading;