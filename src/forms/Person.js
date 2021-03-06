import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Radio,
  Row,
  Col,
  Select,
  DatePicker,
  Collapse
} from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import customValidations from "../utils/customValidation";
import MaskedInput from "antd-mask-input";
import RadioImage from "../components/RadioImage/RadioImage";
import Required from "../components/Required/Required";
import errorMessages from "../utils/errorMessages";
import Street from "../icons/Street";
import Intersection from "../icons/Intersection";
import CarPark from "../icons/CarPark";
import FootWay from "../icons/FootWay";
import BikePath from "../icons/BikePath";
import Garage from "../icons/Garage";
import Other from "../icons/Other";
import Img1 from "../icons/illustrations/Img1";
import Img2 from "../icons/illustrations/Img2";
import Img3 from "../icons/illustrations/Img3";
import Img4 from "../icons/illustrations/Img4";
import Img5 from "../icons/illustrations/Img5";
import Img6 from "../icons/illustrations/Img6";
import Img7 from "../icons/illustrations/Img7";
import Img8 from "../icons/illustrations/Img8";
import Img9 from "../icons/illustrations/Img9";
import versicherungOprions from "../utils/versicherung";

import axios from "axios";
const API_PATH = "/api/contact/person.php";

// import codes from "german-postal-codes";
//
// console.log(codes);

const { Option } = Select;
const { Panel } = Collapse;

const Person = ({ onOpenModal }) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    errors
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data);
    axios({
      method: "post",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: data
    })
      .then(response => {
        onOpenModal();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const firstErrorInput = document.querySelector(".input-error");
    if (firstErrorInput && firstErrorInput.classList.contains("ant-input")) {
      firstErrorInput.focus();
    } else if (
      firstErrorInput &&
      !firstErrorInput.classList.contains("ant-input")
    ) {
      firstErrorInput.querySelector("input").focus();
    }
  }, [errors]);

  //condition for 11th question
  const isUnfalldatenVersicherung = watch("Unfalldaten.Versicherung");

  //event for open/close collapse panel

  const [panelState, setPanelState] = useState({
    isUnfalldatenVersicherungOpen: true
  });
  const onPanelChange = key => {
    const state = { ...panelState };
    state[key] = !state[key];
    setPanelState(state);
  };

  const [checkedRadioImageIndex, SetCheckedRadioImageIndex] = useState(null);

  const onChangeRadioImage = (value, index) => {
    setValue("Unfalldaten.Unfallart", value);
    SetCheckedRadioImageIndex(index);
  };

  const RadioImages = [
    {
      id: "first",
      value: "Auffahrunfall",
      image: <Img1 />
    },
    {
      id: "second",
      value: "Vorfahrtsverstoß / Rechts vor Links",
      image: <Img2 />
    },
    {
      id: "third",
      value: "Anfahren vom Fahrbahnrand Einfahren in den fließenden Verkehr",
      image: <Img3 />
    },
    {
      id: "fourth",
      value: "Unfall zwischen Überholer und vorausfahrendem Linksabbieger",
      image: <Img4 />
    },
    {
      id: "fifth",
      value: "Unfall aufgrund Spurwechsel des Unfallgegners",
      image: <Img5 />
    },
    {
      id: "sixth",
      value: "Unfall mit einem rückwärtsfahrenden Fahrzeug",
      image: <Img6 />
    },
    {
      id: "seventh",
      value: "Unfall auf Parkplatz mit Rückwärtsausparker",
      image: <Img7 />
    },
    {
      id: "eighth",
      value: "Touchieren des Fahrzeugs beim Ein-/Ausparken auch auf Parkplatz",
      image: <Img8 />
    },
    {
      id: "ninth",
      value: "Unfall durch entgegenkommendes Fahrzeug (Begegnungsunfall)",
      image: <Img9 />
    }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#">
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Rechtsschutzversicherer">
            1. Ihr Rechtsschutzversicherer <Required />
          </label>
          <Controller
            as={
              <Select
                placeholder="Ihr Rechtsschutzversicherer"
                style={{ width: "100%" }}
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Rechtsschutzversicherer &&
                  "input-error"
                }
                showSearch={true}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
                }
              >
                <Option value="Advocard">Advocard</Option>
                <Option value="Allianz Deutschland AG">
                  Allianz Deutschland AG
                </Option>
                <Option value="Allrecht">Allrecht</Option>
                <Option value="Arag">Arag</Option>
                <Option value="Auxilia Rechtsschutz">
                  Auxilia Rechtsschutz
                </Option>
                <Option value="BGV Badische Versicherungen">
                  BGV Badische Versicherungen
                </Option>
                <Option value="Bruderhilfe">Bruderhilfe</Option>
                <Option value="Concordia">Concordia</Option>
                <Option value="Continentale">Continentale</Option>
                <Option value="DA Deutsche Allgemeine">
                  DA Deutsche Allgemeine
                </Option>
                <Option value="D.A.S. Deutscher Automobil Schutz">
                  D.A.S. Deutscher Automobil Schutz
                </Option>
                <Option value="Debeka">Debeka</Option>
                <Option value="Deurag">Deurag</Option>
                <Option value="DEVK">DEVK</Option>
                <Option value="DFV Deutsche Familienversicherung AG">
                  DFV Deutsche Familienversicherung AG
                </Option>
                <Option value="Verti Versicherung AG">
                  Verti Versicherung AG
                </Option>
                <Option value="DMB">DMB</Option>
                <Option value="GVO Gegenseitigkeit">GVO Gegenseitigkeit</Option>
                <Option value="HDI-Gerling Firmen und Privat">
                  HDI-Gerling Firmen und Privat
                </Option>
                <Option value="HDI Versicherung AG">HDI Versicherung AG</Option>
                <Option value="Huk24 AG">Huk24 AG</Option>
                <Option value="Huk-Coburg">Huk-Coburg</Option>
                <Option value="Itzehoer Versicherung">
                  Itzehoer Versicherung
                </Option>
                <Option value="Jurpartner">Jurpartner</Option>
                <Option value="LVM">LVM</Option>
                <Option value="Mecklenburgische">Mecklenburgische</Option>
                <Option value="Medien-Versicherung a.G.">
                  Medien-Versicherung a.G.
                </Option>
                <Option value="Neue Rechtsschutz">Neue Rechtsschutz</Option>
                <Option value="Örag">Örag</Option>
                <Option value="Roland">Roland</Option>
                <Option value="R+V">R+V</Option>
                <Option value="VGH – Versicherungen">
                  VGH – Versicherungen
                </Option>
                <Option value="WGV-Versicherung AG">WGV-Versicherung AG</Option>
                <Option value="Württembergische">Württembergische</Option>
              </Select>
            }
            control={control}
            name="Unfalldaten.Rechtsschutzversicherer"
            id="Unfalldaten.Rechtsschutzversicherer"
            rules={{
              required: errorMessages.required
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Rechtsschutzversicherer && (
            <span className="message-error">
              {errors.Unfalldaten.Rechtsschutzversicherer.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Versicherungsscheinnummer">
            2. Versicherungsscheinnummer
          </label>
          <Controller
            as={<Input placeholder="Versicherungsscheinnummer" />}
            control={control}
            name="Unfalldaten.Versicherungsscheinnummer"
            id="Unfalldaten.Versicherungsscheinnummer"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Schadennummer">
            3. Schadennummer / Leistungsnummer
          </label>
          <Controller
            as={<Input placeholder="Schadennummer / Leistungsnummer" />}
            control={control}
            name="Unfalldaten.Schadennummer"
            id="Unfalldaten.Schadennummer"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Unfalldaten.Geschlecht">
            4. Geschlecht <Required />
          </label>
          <Controller
            as={
              <div>
                <Radio.Group
                  defaultValue="Herr"
                  style={{
                    width: "100%"
                  }}
                  buttonStyle="solid"
                >
                  <Radio.Button
                    value="Herr"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                  >
                    Herr
                  </Radio.Button>
                  <Radio.Button
                    value="Frau"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                  >
                    Frau
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Herr"
            control={control}
            name="Unfalldaten.Geschlecht"
            id="Unfalldaten.Geschlecht"
          />
        </Col>
      </Row>
      <Row gutter={32}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <label htmlFor="Unfalldaten.Vorname">
            5. Vorname <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Vorname &&
                  "input-error"
                }
                placeholder="Vorname"
              />
            }
            control={control}
            name="Unfalldaten.Vorname"
            id="Unfalldaten.Vorname"
            rules={{
              required: errorMessages.required,
              minLength: {
                value: 2,
                message: errorMessages.minLength("Vorname")
              },
              pattern: {
                value: /^[A-Za-z \u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]+$/i,
                message: errorMessages.specialChars()
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Vorname && (
            <span className="message-error">
              {errors.Unfalldaten.Vorname.message}
            </span>
          )}
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <label htmlFor="Unfalldaten.Nachname">
            6. Nachname <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Nachname &&
                  "input-error"
                }
                placeholder="Nachname"
              />
            }
            control={control}
            name="Unfalldaten.Nachname"
            id="Unfalldaten.Nachname"
            rules={{
              required: errorMessages.required,
              minLength: {
                value: 2,
                message: errorMessages.minLength("Nachname")
              },
              pattern: {
                value: /^[A-Za-z \u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]+$/i,
                message: errorMessages.specialChars()
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Nachname && (
            <span className="message-error">
              {errors.Unfalldaten.Nachname.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Strasse">
            7. Straße & Nr. <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Strasse &&
                  "input-error"
                }
                placeholder="Straße & Nr."
              />
            }
            control={control}
            name="Unfalldaten.Strasse"
            id="Unfalldaten.Strasse"
            rules={{
              required: errorMessages.required,
              minLength: {
                value: 2,
                message: errorMessages.minLength("Strasse")
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Strasse && (
            <span className="message-error">
              {errors.Unfalldaten.Strasse.message}
            </span>
          )}
        </Col>
      </Row>
      <Row gutter={32}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <label htmlFor="Unfalldaten.PLZ">
            8. PLZ <Required />
          </label>
          <Controller
            as={
              <MaskedInput
                className={
                  errors.Unfalldaten && errors.Unfalldaten.PLZ && "input-error"
                }
                placeholder="PLZ code"
                size={5}
                mask="11111"
              />
            }
            control={control}
            name="Unfalldaten.PLZ"
            id="Unfalldaten.PLZ"
            rules={{
              required: errorMessages.required,
              validate: {
                inputPLZCorrect: customValidations.isIncorrectPLZ
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.PLZ && (
            <span className="message-error">
              {errors.Unfalldaten.PLZ.message}
            </span>
          )}
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <label htmlFor="Unfalldaten.Stadt">
            9. Stadt <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Stadt &&
                  "input-error"
                }
                placeholder="Stadt"
              />
            }
            control={control}
            name="Unfalldaten.Stadt"
            id="Unfalldaten.Stadt"
            rules={{
              required: errorMessages.required
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Stadt && (
            <span className="message-error">
              {errors.Unfalldaten.Stadt.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Email">
            10. E-mail <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Email &&
                  "input-error"
                }
                placeholder="E-mail"
              />
            }
            control={control}
            name="Unfalldaten.Email"
            id="Unfalldaten.Email"
            rules={{
              required: errorMessages.required,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: errorMessages.incorrect("E-mail")
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Email && (
            <span className="message-error">
              {errors.Unfalldaten.Email.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Telefon">11. Telefon / Mobil</label>
          <Controller
            as={
              <Input
                placeholder="Telefon / Mobil"
              />
            }
            control={control}
            name="Unfalldaten.Telefon"
            id="Unfalldaten.Telefon"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Kennzeichen_Geg">
            12. Kennzeichen des Unfallgegners
          </label>
          <Controller
            as={
              <Input
                placeholder="Kennzeichen des Unfallgegners"
              />
            }
            control={control}
            name="Unfalldaten.Kennzeichen_Geg"
            id="Unfalldaten.Kennzeichen_Geg"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Herkunftsland">
            13. Herkunftsland Fahrzeug Unfallgegner <Required />
          </label>
          <Controller
            as={
              <Select
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Herkunftsland &&
                  "input-error"
                }
                defaultValue="Deutschland"
                style={{ width: "100%" }}
              >
                <Option value="Deutschland">Deutschland</Option>
                <Option value="Ausland">Ausland</Option>
                <Option value="Unsicher">Unsicher</Option>
              </Select>
            }
            defaultValue="Deutschland"
            control={control}
            name="Unfalldaten.Herkunftsland"
            id="Unfalldaten.Herkunftsland"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Unfalldaten.Versicherung">
            14. Ist Ihnen die Versicherung des Unfallgegners bekannt?
          </label>
          <Controller
            as={
              <div>
                <Radio.Group
                  defaultValue="Nein"
                  style={{
                    width: "100%"
                  }}
                  buttonStyle="solid"
                >
                  <Radio.Button
                    value="Ja"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Unfalldaten.Versicherung"
            id="Unfalldaten.Versicherung"
          />
        </Col>
      </Row>
      {isUnfalldatenVersicherung === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isUnfalldatenVersicherungOpen");
              }}
            >
              <Panel
                header={
                  panelState.isUnfalldatenVersicherungOpen
                    ? "Ausblenden"
                    : "Zeigen"
                }
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <label htmlFor="Unfalldaten.Versicherer">Versicherer</label>
                    <Controller
                      as={
                        <Select
                          placeholder="Versicherer"
                          style={{ width: "100%" }}
                          showSearch={true}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
                          }
                        >
                          {versicherungOprions.map((option, index)=>(
                            <Option key={index} value={option}>{option}</Option>
                          ))}
                        </Select>
                      }
                      control={control}
                      name="Unfalldaten.Versicherer"
                      id="Unfalldaten.Versicherer"
                    />
                    <label htmlFor="Unfalldaten.Nr">Schadennummer</label>
                    <Controller
                      as={<Input placeholder="Schadennummer" />}
                      control={control}
                      name="Unfalldaten.Nr"
                      id="Unfalldaten.Nr"
                      defaultValue=""
                    />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <div className="message-info">
              <InfoCircleFilled />
              Falls Sie die gegnerischer Versicherung nicht kennen können Sie
              diese einfach unter 0800 250 260 0 kostenfrei erfragen oder hier
              klicken hier eine online Anfrage stellen:
              <a
                href="https://www.zentralruf.de/"
                target="_blank"
                className="link"
                rel="noopener noreferrer"
              >
                https://www.zentralruf.de/
              </a>
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Unfalldatum">
            15. Unfalldatum <Required />
          </label>
          <Controller
            as={
              <DatePicker
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Unfalldatum &&
                  "input-error"
                }
                style={{
                  width: "100%"
                }}
                placeholder="Datum wählen"
                mode="date"
                format="YYYY-MM-DD"
                showTime={false}
                showToday={false}
                disabledDate={d => !d || d.isAfter(Date.now())}
              />
            }
            control={control}
            name="Unfalldaten.Unfalldatum"
            id="Unfalldaten.Unfalldatum"
            rules={{
              required: errorMessages.required
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Unfalldatum && (
            <span className="message-error">
              {errors.Unfalldaten.Unfalldatum.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Unfallort">
            16. Unfallort <Required />
          </label>
          <Controller
            as={
              <Select
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Unfallort &&
                  "input-error"
                }
                defaultValue="Straße"
                style={{ width: "100%" }}
              >
                <Option value="Straße">
                  <Street /> Straße
                </Option>
                <Option value="Kreuzung">
                  <Intersection /> Kreuzung
                </Option>
                <Option value="Parkplatz">
                  <CarPark /> Parkplatz
                </Option>
                <Option value="Fußweg">
                  <FootWay /> Fußweg
                </Option>
                <Option value="Radweg">
                  <BikePath /> Radweg
                </Option>
                <Option value="Parkhaus">
                  <Garage /> Parkhaus
                </Option>
                <Option value="Sonstiges">
                  <Other /> Sonstiges
                </Option>
              </Select>
            }
            control={control}
            name="Unfalldaten.Unfallort"
            id="Unfalldaten.Unfallort"
            defaultValue="Straße"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Unfallart">
            17. Unfallart <Required />
          </label>
          <br />
          <Controller
            as={
              <div className="radioImages">
                {RadioImages.map((radioImage, index) => {
                  return (
                    <RadioImage
                      onChangeRadioImage={onChangeRadioImage}
                      name="Unfalldaten.Unfallart"
                      id={radioImage.id}
                      key={radioImage.id}
                      value={radioImage.value}
                      checked={checkedRadioImageIndex !== false && index === checkedRadioImageIndex}
                      index={index}
                      image={radioImage.image}
                    />
                  );
                })}
              </div>
            }
            control={control}
            name="Unfalldaten.Unfallart"
            id="Unfalldaten.Unfallart"
            rules={{
              required: errorMessages.required
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Unfallart && (
            <span className="message-error">
              {errors.Unfalldaten.Unfallart.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Sonstiges">
            Sonstige Unfallart, bitte beschreiben
          </label>
          <Controller
            as={<Input placeholder="Sonstiges Unfallart" />}
            control={control}
            name="Unfalldaten.Sonstiges"
            id="Unfalldaten.Sonstiges"
            defaultValue=""
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 18 }}>
          <p className="description-info">
            Vielen Dank, wenn Sie alle Pflichtfelder ausgefüllt haben klicken
            Sie unten um Schritt 1 abzuschließen.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 8, offset: 8 }}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              marginBottom: "30px"
            }}
          >
            Daten senden
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default Person;
