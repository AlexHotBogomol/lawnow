import React from "react";
import './Steps.css';
import Person from "../../icons/Person";
import Unfall from "../../icons/Unfall";
import Schaden from "../../icons/Schaden";

const stepsArray= [
  {
    icon: <Person/>,
    title: "Person",
    description: `Um einen schnellen und reibungslosen Ablauf ihrer
        Schadensregulierung zu ermöglichen, achten Sie bitte auf
        vollständige und richtige Angaben. Schritt 1 dauert ca. 2 Minuten.`
  },
  {
    icon: <Unfall/>,
    title: "Unfall",
    description: `Bitte achten Sie auch hier auf Vollständigkeit und Richtigkeit und machen
     Sie so viele Angaben wie möglich. Schritt 2 dauert ca. 4-7 Minuten.`
  },
  {
    icon: <Schaden/>,
    title: "Schaden",
    description: `Bitte achten Sie auch hier auf Vollständigkeit und Richtigkeit und machen
     Sie so viele Angaben wie möglich. Schritt 2 dauert ca. 2-4 Minuten.`
  },
];

const Steps = ({currentStep}) => {
  return(
    <div className="steps-wrapper">
      <div className="steps">
        {stepsArray.map((step, index, array) => {
          const stepClasses = [
            'step',
            (index === currentStep) ? 'active' : null
          ];

          return(
            <div className={stepClasses.join(" ")} key={index}>
              <div className="step-icon">
                {step.icon}
              </div>
              <h1 className="step-title">
                {step.title}
              </h1>
            </div>
          )
        })}
      </div>
      <p className="description">
        {stepsArray[currentStep].description}
      </p>
      <p className="required-info">* Pflichtfeld</p>
    </div>
  )
};

export default Steps;