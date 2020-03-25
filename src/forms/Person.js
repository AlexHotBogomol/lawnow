import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Radio,
  Row,
  Col,
  Select,
  DatePicker,
  Carousel,
  Collapse,
} from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
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

import axios from "axios";
const API_PATH = "http://lawnow.ein-des-ein.com/api/contact/person.php";

// import codes from "german-postal-codes";
//
// console.log(codes);

const { Option } = Select;
const { Panel } = Collapse;

const Person = ({onOpenModal}) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    register,
    errors,
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
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
    const firstErrorInput = document.querySelector('.input-error');
    if(firstErrorInput){
      firstErrorInput.focus();
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

  // slider with radio
  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [checkedRadioImageIndex, SetCheckedRadioImageIndex] = useState(0);

  const onChangeRadioImage = (value, index) => {
    setValue("Unfalldaten.Unfallart", value);
    SetCheckedRadioImageIndex(index);
  };

  const RadioImages = [
    {
      id: "first",
      value: "1. Auffahrunfall",
      image: <Img1 />
    },
    {
      id: "second",
      value: "2. Vorfahrtsverstoß / Rechts vor Links",
      image: <Img2 />
    },
    {
      id: "third",
      value: "3. Anfahren vom Fahrbahnrand Einfahren in den fließenden Verkehr",
      image: <Img3 />
    },
    {
      id: "fourth",
      value: "4. Unfall zwischen Überholer und vorausfahrendem Linksabbieger",
      image: <Img4 />
    },
    {
      id: "fifth",
      value: "5. Unfall aufgrund Spurwechsel des Unfallgegners",
      image: <Img5 />
    },
    {
      id: "sixth",
      value: "6. Unfall mit einem rückwärtsfahrenden Fahrzeug",
      image: <Img6 />
    },
    {
      id: "seventh",
      value: "7. Unfall auf Parkplatz mit Rückwärtsausparker",
      image: <Img7 />
    },
    {
      id: "eighth",
      value:
        "8. Touchieren des Fahrzeugs beim Ein-/Ausparken auch auf Parkplatz",
      image: <Img8 />
    },
    {
      id: "ninth",
      value: "9. Unfall durch entgegenkommendes Fahrzeug (Begegnungsunfall)",
      image: <Img9 />
    }
  ];

  useEffect(() => {
    register({
      name: "Unfalldaten.Unfallart",
      value: RadioImages[checkedRadioImageIndex].value
    });
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#">
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Unfalldaten.Geschlecht">
            1. Geschlecht <Required />
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
            2. Vorname <Required />
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
            3. Nachname <Required />
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
            4. Straße & Nr. <Required />
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
            5. PLZ <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten && errors.Unfalldaten.PLZ && "input-error"
                }
                placeholder="PLZ code"
                maxLength={5}
              />
            }
            control={control}
            name="Unfalldaten.PLZ"
            id="Unfalldaten.PLZ"
            rules={{
              required: errorMessages.required
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
            6. Stadt <Required />
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
            7. E-mail <Required />
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
          <label htmlFor="Unfalldaten.Telefon">8. Telefon / Mobil</label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Telefon &&
                  "input-error"
                }
                placeholder="Telefon / Mobil"
              />
            }
            control={control}
            name="Unfalldaten.Telefon"
            id="Unfalldaten.Telefon"
            defaultValue=""
            rules={{
              pattern: {
                value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                message: errorMessages.incorrect("phone")
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Telefon && (
            <span className="message-error">
              {errors.Unfalldaten.Telefon.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Kennzeichen_Geg">
            9. Kennzeichen des Unfallgegners <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Kennzeichen_Geg &&
                  "input-error"
                }
                placeholder="Kennzeichen des Unfallgegners"
              />
            }
            control={control}
            name="Unfalldaten.Kennzeichen_Geg"
            id="Unfalldaten.Kennzeichen_Geg"
            rules={{
              required: errorMessages.required
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.Kennzeichen_Geg && (
            <span className="message-error">
              {errors.Unfalldaten.Kennzeichen_Geg.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Herkunftsland">
            10. Herkunfsland Fahrzeug Unfallgegner <Required />
          </label>
          <Controller
            as={
              <Select
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.Herkunftsland &&
                  "select-error"
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
            11. Ist Ihnen die Versicherung des Unfallgegners bekannt?
          </label>
          <Controller
            as={
              <div>
                <Radio.Group
                  defaultValue="Ja"
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
            defaultValue="Ja"
            control={control}
            name="Unfalldaten.Versicherung"
            id="Unfalldaten.Versicherung"
          />
        </Col>
      </Row>
      {isUnfalldatenVersicherung !== "Nein" ? (
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
                    <label htmlFor="Unfalldaten.Versicherer">
                      11.1 Versicherer
                    </label>
                    <Controller
                      as={<Input placeholder="Versicherer" />}
                      control={control}
                      name="Unfalldaten.Versicherer"
                      id="Unfalldaten.Versicherer"
                      defaultValue=""
                    />
                    <label htmlFor="Unfalldaten.Nr">11.2 Schadennummer</label>
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
              klicken hier eine online Anfrage stellen: &nbsp;
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
            12. Unfalldatum <Required />
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
                mode="date"
                format="YYYY-MM-DD"
                showTime={false}
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
            13. Unfallort <Required />
          </label>
          <Controller
            as={
              <Select
                className={errors.Unfalldaten && errors.Unfalldaten.Unfallort && "input-error"}
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
            14. Unfallart <Required />
          </label>
          <Carousel {...sliderSettings}>
            {RadioImages.map((radioImage, index) => {
              return (
                <RadioImage
                  onChangeRadioImage={onChangeRadioImage}
                  name="Unfalldaten.Unfallart"
                  id={radioImage.id}
                  key={radioImage.id}
                  value={radioImage.value}
                  checked={index === checkedRadioImageIndex}
                  index={index}
                  image={radioImage.image}
                />
              );
            })}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.Sonstiges">
            14.1 Sonstige Unfallart, bitte beschreiben
          </label>
          <Controller
            as={<Input placeholder="Sonstiges Unfallart"/>}
            control={control}
            name="Unfalldaten.Sonstiges"
            id="Unfalldaten.Sonstiges"
            defaultValue=""
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 14 }}>
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
