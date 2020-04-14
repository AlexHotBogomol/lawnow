import React from "react";
import './AddFieldsButton.css';
import Plus from "../../icons/plus";

const AddFieldsButton = ({onClick, text}) => (
  <div className="addFields" onClick={onClick}>
    <span className="addFields-icon"><Plus /></span>
    <span className="addFields-text">{text}</span>
  </div>
);

export default AddFieldsButton