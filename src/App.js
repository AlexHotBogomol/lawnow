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
  let [currentStep, setCurrentStep] = useState(1);
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
      {forms[currentStep]}
      <Row justify="center">
        <Col span={24}>
          <p className="warning">
            <ExclamationCircleOutlined
              style={{
                marginRight: "5px"
              }}
            />
            Warnung! Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} bgColor="#ffffff">
        <div className="modal-content">
          <div className="modal-icon">
            <svg className="checkMark" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="checkMark-bg"d="M53.76 0H2.24C1.001 0 0 1.001 0 2.24V53.76C0 54.999 1.001 56 2.24 56H53.76C54.999 56 56 54.999 56 53.76V2.24C56 1.001 54.999 0 53.76 0Z" fill="#FFCC00"/>
              {/*<path className="checkMark-item" d="M22.4775 38.1991C22.6836 38.4867 22.9552 38.721 23.2699 38.8827C23.5846 39.0443 23.9333 39.1287 24.287 39.1287C24.6408 39.1287 24.9895 39.0443 25.3042 38.8827C25.6189 38.721 25.8905 38.4867 26.0965 38.1991L40.8385 17.7591C41.1045 17.3881 40.8385 16.8701 40.3835 16.8701H37.1005C36.3865 16.8701 35.7075 17.2131 35.2875 17.8011L24.2905 33.0611L19.3065 26.1451C18.8865 25.5641 18.2145 25.2141 17.4935 25.2141H14.2105C13.7555 25.2141 13.4895 25.7321 13.7555 26.1031L22.4775 38.1991Z" fill="none"/>*/}
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
