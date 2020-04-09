import React, { useState, useEffect} from "react";
import Person from "./forms/Person";
import Unfall from "./forms/Unfall";
import Schaden from "./forms/Schaden";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Steps from "./components/Steps/Steps";
import {Button, Col, Row} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Modal from "./components/Modal/Modal";
import ReactHtmlParser from "react-html-parser";
import disableScroll from 'disable-scroll';

const App = () => {
  let [currentStep, setCurrentStep] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = event => {
    setIsModalOpen(false);
  };

  const onOpenModal = event => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if(isModalOpen && window.innerWidth >= 1200){
      disableScroll.on();
    } else if(isModalOpen && window.innerWidth < 1200){
      document.body.style.overflow = 'hidden';
    } else {
      disableScroll.off();
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const forms = [
    <Person onOpenModal={onOpenModal} />,
    <Unfall onOpenModal={onOpenModal} />,
    <Schaden onOpenModal={onOpenModal} />
  ];

  const onNextStep = () => {
    onCloseModal();
    if(currentStep + 1 < forms.length) {
      setCurrentStep(currentStep + 1 );
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  const modals = [
    {
      title:
        "Vielen Dank, Sie haben den ersten Schritt erfolgreich durchgeführt!",
      description: `<p>Wir haben Ihnen eine E-Mail an die angegebene E-Mail Adresse gesendet, diese enthält eine Vollmacht sowie wichtige Informationen zum weiteren Ablauf.</p>
                    <p>Wenn Sie bereits jetzt Schadenunterlagen (z.B. Kostenvoranschlag oder Gutachten) zur Hand haben gehen Sie zum nächsten Schritt, dort können Sie den Schaden anmelden.</p>
                    <p>Sollten Sie noch keine Unterlagen zur Verfügung haben, holen Sie   diese bitte ein und laden diese über den Link in der E-Mail an Sie hoch.</p>`,
      btnText: "Zum nächsten Schritt"
    },
    {
      title: "Vielen Dank, dass auch den zweiten Schritt erfolgreich haben!",
      description: `<p>Wir werden so schnell wie möglich Ihre Schadenpositionen prüfen     und bei der Versicherung anmelden.</p>
                    <p>Die entsprechenden Dokumente werden wir Ihnen per E-Mail zusenden.</p>
                    <p>Wenn Sie weitere Schäden anmelden möchten (z.B. Reparaturkosten, Mietwagenkosten, etc. ) und Ihnen die Rechnungsen vorliegen, fahren Sie fort mit Schritt 3.</p>`,
      btnText: "Zum nächsten Schritt"
    },
    {
      title:
        "Vielen Dank, Sie haben auch den dritten und letzten Schritt erfolgreich durchgeführt!",
      description: `<p>Wir werden so schnell wie möglich Ihre weiteren Schadenpositionen prüfen und bei der Versicherung anmelden.</p>
                    <p>Die entsprechenden Dokumente werden wir Ihnen per E-Mail zusenden.</p>
                    <p>Wenn Sie weitere Schäden anmelden möchten  und Ihnen die Rechnungen vorliegen klicken Sie hier oder auf den Link, den Sie per E-Mail erhalten haben.</p>`,
      btnText: "Weitere Schäden anmelden"
    }
  ];
  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Steps currentStep={currentStep} />
        </Col>
      </Row>
      <div className="form-wrapper">
        {forms[currentStep]}
        <Row justify="center">
          <Col span={24}>
            <p className="warning">
              <ExclamationCircleOutlined
                style={{
                  marginRight: "5px"
                }}
              />
              Bitte überprüfen Sie Ihre Eingaben vor dem Absenden auf Richtigkeit!
            </p>
          </Col>
        </Row>
      </div>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} bgColor="#ffffff">
        <div className="modal-content">
          <div className="modal-icon">
            <svg className="checkMark" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="checkMark-bg"d="M53.76 0H2.24C1.001 0 0 1.001 0 2.24V53.76C0 54.999 1.001 56 2.24 56H53.76C54.999 56 56 54.999 56 53.76V2.24C56 1.001 54.999 0 53.76 0Z" fill="#FFCC00"/>
              <path className="checkMark-item" d="M16 25.5L24.5 36.5L38.5 17.5" stroke="none"/>
            </svg>
          </div>
          <h1 className="modal-title">
            {modals[currentStep].title}
          </h1>
          <div className="modal-description">
            {ReactHtmlParser(modals[currentStep].description)}
          </div>
          <div className="modal-btnWrapper">
            <Button
              htmlType="button"
              className="modal-btn"
              onClick={onNextStep}
            >
              {modals[currentStep].btnText}
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default App;
