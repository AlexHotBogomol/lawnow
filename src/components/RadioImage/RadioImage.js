import React from "react";
import "./RadioImage.css";

const RadioImage = ({ name, id, value, onChangeRadioImage, checked, index}) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        id={id}
        className="radioImage-input"
        value={value}
        onChange={function (event) {
          onChangeRadioImage(event.target.value, index);
        }}
        checked={!!checked}
      />
      <label className="radioImage-label" htmlFor={id}>
        <img src="//placekitten.com/160/160" alt="I'm sad" />
      </label>
      <p>{value}</p>
    </>
  );
};

export default RadioImage;
