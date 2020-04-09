import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Radio,
  Row,
  Col,
  Collapse,
  TimePicker,
  Upload,
  message,
  Select,
  DatePicker
} from "antd";
import { InboxOutlined, InfoCircleFilled } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import errorMessages from "../utils/errorMessages";
import customValidations from "../utils/customValidation";
import Required from "../components/Required/Required";
import Heading from "../components/Heading/Heading";
import PKW from "../icons/PKW";
import LKW from "../icons/LKW";
import Mottorrad from "../icons/Motorrad";
import moment from "moment";
import axios from "axios";
import OnePerson from "../icons/OnePerson";
import TwoPersons from "../icons/TwoPersons";
import ThreePersons from "../icons/ThreePersons";
import MaskedInput from "antd-mask-input";
import NearHeading from "../icons/NearHeading";
import NearHeading2 from "../icons/NearHeading2";

const API_PATH = "/api/contact/unfall.php";
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Unfall = ({ onOpenModal }) => {
  const { handleSubmit, control, watch, errors } = useForm();

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

  //conditionals

  let isUnfallverursacherFrage = watch("Unfallverursacher.Frage"),
    isUnfallaufnahmeFrage = watch("Unfallaufnahme.Frage"),
    isZeugenFrage = watch("Zeugen.Frage"),
    isFahrzeugschadenFrage = watch("Fahrzeugschaden.Frage"),
    isFahrzeugschadenFinanziert = watch("Fahrzeugschaden.finanziert"),
    isFahrzeugschaden3Jahre = watch("Fahrzeugschaden.3Jahre"),
    isFahrzeugschadenMarkenwerkstatt = watch("Fahrzeugschaden.Markenwerkstatt"),
    isFahrzeugschadenGutachtenkosten = watch("Fahrzeugschaden.gutachtenkosten"),
    isHeilbehandlungskostenFrage = watch("Heilbehandlungskosten.Frage"),
    isSachverstaendigengebuehrenFrage = watch(
      "Sachverstaendigengebuehren.Frage"
    ),
    isFahrtenFrage = watch("Fahrten.Frage"),
    isAbschleppkostenFrage = watch("Abschleppkosten.Frage"),
    isVerletztFrage = watch("Verletzt.Frage"),
    isArbeitsunfahigkeitFrage = watch("Arbeitsunfahigkeit.Frage"),
    isHaushaltsfuhrungsschadenFrage = watch("Haushaltsfuhrungsschaden.Frage"),
    isGegenstaendeFrage = watch("Gegenstaende.Frage");

  //event for check/uncheck checkboxes

  // const [checkboxesState, setcheckboxesState] = useState({
  //   isSchmerzensgeld: true,
  //   isHaushaltsfuehrungsschaden: true,
  //   isGegenstaende: true
  // });
  //
  // const onCheckboxChange = key => {
  //   const state = { ...checkboxesState };
  //   state[key] = !state[key];
  //   setcheckboxesState(state);
  // };

  //event for open/close collapse panel

  const [panelState, setPanelState] = useState({
    isUnfallverursacherFrageOpen: true,
    isUnfallaufnahmeFrageOpen: true,
    isZeugenFrageOpen: true,
    isFahrzeugschadenFrageOpen: true,
    isFahrzeugschadenFinanziertOpen: true,
    isFahrzeugschadenMarkenwerkstattOpen: true,
    isFahrzeugschadenGutachtenkosten1Open: true,
    isFahrzeugschadenGutachtenkosten2Open: true,
    isSachverstaendigengebuehrenOpen: true,
    isFahrtenOpen: true,
    isHaushaltsfuehrungsschadenOpen: true,
    isGegenstaendeOpen: true,
    isVerletztOpen: true,
    isArbeitsunfahigkeitOpen: true,
    isHaushaltsfuhrungsschadenOpen: true,
    isHeilbehandlungskostenOpen: true
  });
  const onPanelChange = key => {
    const state = { ...panelState };
    state[key] = !state[key];
    setPanelState(state);
  };

  //Drager

  const propsForDrager = {
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col span={24}>
          <Heading title="1. Unfalldaten" icon={<NearHeading />} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.UhrZeit">
            1. Unfall Uhrzeit <Required />
          </label>
          <Controller
            as={
              <TimePicker
                style={{
                  width: "100%"
                }}
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.UhrZeit &&
                  "input-error"
                }
                format="HH:mm"
              />
            }
            rules={{
              required: errorMessages.required
            }}
            placeholder="00:00"
            control={control}
            name="Unfalldaten.UhrZeit"
            id="Unfalldaten.UhrZeit"
          />
          {errors.Unfalldaten && errors.Unfalldaten.UhrZeit && (
            <span className="message-error">
              {errors.Unfalldaten.UhrZeit.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfalldaten.StrNr">
            2. Unfallort / Straße & Nr. <Required />
          </label>
          <Controller
            as={
              <Input
                className={
                  errors.Unfalldaten &&
                  errors.Unfalldaten.StrNr &&
                  "input-error"
                }
                placeholder="Straße & Nr."
              />
            }
            control={control}
            name="Unfalldaten.StrNr"
            id="Unfalldaten.StrNr"
            rules={{
              required: errorMessages.required,
              minLength: {
                value: 2,
                message: errorMessages.minLength("StrNr")
              }
            }}
          />
          {errors.Unfalldaten && errors.Unfalldaten.StrNr && (
            <span className="message-error">
              {errors.Unfalldaten && errors.Unfalldaten.StrNr.message}
            </span>
          )}
          <Row>
            <Col span={23} offset={1} className="col-border-left">
              <label htmlFor="Unfalldaten.Str">Straße (bei Kreuzung)</label>
              <Controller
                as={<Input placeholder="Straße (bei Kreuzung)" />}
                control={control}
                name="Unfalldaten.Str"
                id="Unfalldaten.Str"
                defaultValue=""
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <label htmlFor="Unfalldaten.PLZ">
            3. Unfallort / PLZ <Required />
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
        <Col span={12}>
          <label htmlFor="Unfalldaten.Stadt">
            4. Unfallort / Stadt <Required />
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
              {errors.Unfalldaten && errors.Unfalldaten.Stadt.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Unfallverursacher.Frage">
            5. Liegen Ihnen Daten zum Fahrer des gegnerischen Fahrzeugs vor?
            <Required />
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Unfallverursacher.Frage"
            id="Unfallverursacher.Frage"
          />
        </Col>
      </Row>
      {isUnfallverursacherFrage === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isUnfallverursacherFrageOpen");
              }}
            >
              <Panel
                header={
                  panelState.isUnfallverursacherFrageOpen
                    ? "Ausblenden"
                    : "Zeigen"
                }
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <Row gutter={32}>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Vorname">
                          Vorname
                        </label>
                        <Controller
                          as={
                            <Input
                              placeholder="Vorname"
                              className={
                                errors.Unfallverursacher &&
                                errors.Unfallverursacher.Vorname &&
                                "input-error"
                              }
                            />
                          }
                          defaultValue=""
                          control={control}
                          name="Unfallverursacher.Vorname"
                          id="Unfallverursacher.Vorname"
                          rules={{
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
                        {errors.Unfallverursacher &&
                          errors.Unfallverursacher.Vorname && (
                            <span className="message-error">
                              {errors.Unfallverursacher.Vorname.message}
                            </span>
                          )}
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Nachname">
                          Nachname
                        </label>
                        <Controller
                          as={
                            <Input
                              className={
                                errors.Unfallverursacher &&
                                errors.Unfallverursacher.Nachname &&
                                "input-error"
                              }
                              placeholder="Nachname"
                            />
                          }
                          control={control}
                          name="Unfallverursacher.Nachname"
                          id="Unfallverursacher.Nachname"
                          rules={{
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
                        {errors.Unfallverursacher &&
                          errors.Unfallverursacher.Nachname && (
                            <span className="message-error">
                              {errors.Unfallverursacher.Nachname.message}
                            </span>
                          )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Unfallverursacher.StrNr">
                          Straße & Nr.
                        </label>
                        <Controller
                          as={<Input placeholder="Straße & Nr." />}
                          control={control}
                          name="Unfallverursacher.StrNr"
                          id="Unfallverursacher.StrNr"
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.PLZ">PLZ</label>
                        <Controller
                          as={
                            <MaskedInput
                              className={
                                errors.Unfallverursacher &&
                                errors.Unfallverursacher.PLZ &&
                                "input-error"
                              }
                              placeholder="PLZ code"
                              size={5}
                              mask="11111"
                            />
                          }
                          control={control}
                          name="Unfallverursacher.PLZ"
                          id="Unfallverursacher.PLZ"
                          rules={{
                            validate: {
                              inputPLZCorrect: customValidations.isIncorrectPLZ
                            }
                          }}
                        />
                        {errors.Unfallverursacher &&
                          errors.Unfallverursacher.PLZ && (
                            <span className="message-error">
                              {errors.Unfallverursacher.PLZ.message}
                            </span>
                          )}
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Stadt">Stadt</label>
                        <Controller
                          as={<Input placeholder="Stadt" />}
                          control={control}
                          name="Unfallverursacher.Stadt"
                          id="Unfallverursacher.Stadt"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Unfallaufnahme.Frage">
            6. Wurde der Unfall polizeilich aufgenommen? <Required />
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Unfallaufnahme.Frage"
            id="Unfallaufnahme.Frage"
          />
        </Col>
      </Row>
      {isUnfallaufnahmeFrage === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isUnfallaufnahmeFrageOpen");
              }}
            >
              <Panel
                header={
                  panelState.isUnfallaufnahmeFrageOpen ? "Ausblenden" : "Zeigen"
                }
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Unfallaufnahme.Behoerde">
                          Name Dienststelle / Behörde
                        </label>
                        <Controller
                          as={
                            <Input placeholder="Name Dienststelle / Behörde" />
                          }
                          defaultValue=""
                          control={control}
                          name="Unfallaufnahme.Behoerde"
                          id="Unfallaufnahme.Behoerde"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Unfallaufnahme.Aktenzeichen">
                          Aktenzeichen
                        </label>
                        <Controller
                          as={<Input placeholder="Aktenzeichen" />}
                          defaultValue=""
                          control={control}
                          name="Unfallaufnahme.Aktenzeichen"
                          id="Unfallaufnahme.Aktenzeichen"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Unfallaufnahme.StrNr">
                          Straße & Nr.
                        </label>
                        <Controller
                          as={<Input placeholder="Straße & Nr." />}
                          defaultValue=""
                          control={control}
                          name="Unfallaufnahme.StrNr"
                          id="Unfallaufnahme.StrNr"
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col span={12}>
                        <label htmlFor="Unfallaufnahme.PLZ">PLZ</label>
                        <Controller
                          as={
                            <MaskedInput
                              className={
                                errors.Unfallaufnahme &&
                                errors.Unfallaufnahme.PLZ &&
                                "input-error"
                              }
                              placeholder="PLZ code"
                              size={5}
                              mask="11111"
                            />
                          }
                          control={control}
                          name="Unfallaufnahme.PLZ"
                          id="Unfallaufnahme.PLZ"
                          rules={{
                            validate: {
                              inputPLZCorrect: customValidations.isIncorrectPLZ
                            }
                          }}
                        />
                        {errors.Unfallaufnahme && errors.Unfallaufnahme.PLZ && (
                          <span className="message-error">
                            {errors.Unfallaufnahme.PLZ.message}
                          </span>
                        )}
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallaufnahme.Stadt">Stadt</label>
                        <Controller
                          as={<Input placeholder="Stadt" />}
                          control={control}
                          name="Unfallaufnahme.Stadt"
                          id="Unfallaufnahme.Stadt"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <label htmlFor="Unfallaufnahme.Dok">
                          Polizeibericht hochladen
                        </label>
                        <Controller
                          as={
                            <Dragger {...propsForDrager}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                Dokument hierher ziehen oder hier klicken
                              </p>
                              <p className="ant-upload-hint">
                                Einzel- oder Massen-Upload.
                              </p>
                            </Dragger>
                          }
                          control={control}
                          name="Unfallaufnahme.Dok"
                          id="Unfallaufnahme.Dok"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Zeugen.Frage">
            7. Stehen Zeugen zur Verfügung? <Required />
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Zeugen.Frage"
            id="Zeugen.Frage"
          />
        </Col>
      </Row>
      {isZeugenFrage === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isZeugenFrageOpen");
              }}
            >
              <Panel
                header={panelState.isZeugenFrageOpen ? "Ausblenden" : "Zeigen"}
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <Row gutter={32}>
                      <Col span={12}>
                        <label htmlFor="Zeugen.Vorname">Vorname</label>
                        <Controller
                          as={
                            <Input
                              className={
                                errors.Zeugen &&
                                errors.Zeugen.Vorname &&
                                "input-error"
                              }
                              placeholder="Vorname"
                            />
                          }
                          defaultValue=""
                          control={control}
                          name="Zeugen.Vorname"
                          id="Zeugen.Vorname"
                          rules={{
                            pattern: {
                              value: /^[A-Za-z \u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]+$/i,
                              message: errorMessages.specialChars()
                            }
                          }}
                        />
                        {errors.Zeugen && errors.Zeugen.Vorname && (
                          <span className="message-error">
                            {errors.Zeugen.Vorname.message}
                          </span>
                        )}
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Zeugen.Nachname">Nachname</label>
                        <Controller
                          as={
                            <Input
                              className={
                                errors.Zeugen &&
                                errors.Zeugen.Nachname &&
                                "input-error"
                              }
                              placeholder="Nachname"
                            />
                          }
                          rules={{
                            pattern: {
                              value: /^[A-Za-z \u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]+$/i,
                              message: errorMessages.specialChars()
                            }
                          }}
                          control={control}
                          name="Zeugen.Nachname"
                          id="Zeugen.Nachname"
                        />
                        {errors.Zeugen && errors.Zeugen.Nachname && (
                          <span className="message-error">
                            {errors.Zeugen.Nachname.message}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Zeugen.StrNr">Straße & Nr.</label>
                        <Controller
                          as={<Input placeholder="Straße & Nr." />}
                          control={control}
                          name="Zeugen.StrNr"
                          id="Zeugen.StrNr"
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col span={12}>
                        <label htmlFor="Zeugen.PLZ">PLZ</label>
                        <Controller
                          as={
                            <MaskedInput
                              className={
                                errors.Zeugen &&
                                errors.Zeugen.PLZ &&
                                "input-error"
                              }
                              placeholder="PLZ code"
                              size={5}
                              mask="11111"
                            />
                          }
                          control={control}
                          name="Zeugen.PLZ"
                          id="Zeugen.PLZ"
                          rules={{
                            validate: {
                              inputPLZCorrect: customValidations.isIncorrectPLZ
                            }
                          }}
                        />
                        {errors.Zeugen && errors.Zeugen.PLZ && (
                          <span className="message-error">
                            {errors.Zeugen.PLZ.message}
                          </span>
                        )}
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Zeugen.Stadt">Stadt</label>
                        <Controller
                          as={<Input placeholder="Stadt" />}
                          control={control}
                          name="Zeugen.Stadt"
                          id="Zeugen.Stadt"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Fahrzeugschaden.Frage">
            8. Ihr Fahrzeugschaden <Required />
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Fahrzeugschaden.Frage"
            id="Fahrzeugschaden.Frage"
          />
        </Col>
      </Row>
      {isFahrzeugschadenFrage === "Ja" ? (
        <>
          <Row>
            <Col span={24}>
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                onChange={() => {
                  onPanelChange("isFahrzeugschadenFrageOpen");
                }}
              >
                <Panel
                  header={
                    panelState.isFahrzeugschadenFrageOpen
                      ? "Ausblenden"
                      : "Zeigen"
                  }
                  key={1}
                >
                  <Row>
                    <Col span={23} offset={1} className="col-border-left">
                      <Row>
                        <Col span={24}>
                          <label htmlFor="Fahrzeugschaden.Fahrzeugart">
                            Art des beschädigten Fahrzeugs
                          </label>
                          <Controller
                            as={
                              <Select
                                className={
                                  errors.Fahrzeugschaden &&
                                  errors.Fahrzeugschaden.Fahrzeugart &&
                                  "input-error"
                                }
                                defaultValue="PKW"
                                style={{ width: "100%" }}
                              >
                                <Option value="PKW">
                                  <PKW /> PKW
                                </Option>
                                <Option value="Mottorrad">
                                  <Mottorrad /> Mottorrad
                                </Option>
                                <Option value="LKW">
                                  <LKW /> LKW
                                </Option>
                              </Select>
                            }
                            control={control}
                            name="Fahrzeugschaden.Fahrzeugart"
                            id="Fahrzeugschaden.Fahrzeugart"
                            defaultValue="PKW"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label htmlFor="Fahrzeugschaden.AmtKennzeichen">
                            Kennzeichen Ihres beschädigten Fahrzeugs
                          </label>
                          <Controller
                            as={
                              <Input placeholder="Kennzeichen Ihres beschädigten Fahrzeugs" />
                            }
                            control={control}
                            name="Fahrzeugschaden.AmtKennzeichen"
                            id="Fahrzeugschaden.AmtKennzeichen"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label htmlFor="Fahrzeugschaden.MarkeFahrzeugtyp">
                            Marke / Typ (z.B. VW / Golf 6)
                          </label>
                          <Controller
                            as={
                              <Input placeholder="Marke / Typ (z.B. VW / Golf 6)" />
                            }
                            control={control}
                            name="Fahrzeugschaden.MarkeFahrzeugtyp"
                            id="Fahrzeugschaden.MarkeFahrzeugtyp"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.fahrbereit">
                9. Ist das Fahrzeug noch fahrbereit / verkehrssicher?{" "}
                <Required />
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Fahrzeugschaden.fahrbereit"
                id="Fahrzeugschaden.fahrbereit"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.finanziert">
                10. Ist das Fahrzeug geleast / finanziert? <Required />
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Fahrzeugschaden.finanziert"
                id="Fahrzeugschaden.finanziert"
              />
            </Col>
          </Row>
          {isFahrzeugschadenFinanziert === "Ja" ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isFahrzeugschadenFinanziertOpen");
                  }}
                >
                  <Panel
                    header={
                      panelState.isFahrzeugschadenFinanziertOpen
                        ? "Ausblenden"
                        : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col span={23} offset={1} className="col-border-left">
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                            <div className="message-info">
                              <InfoCircleFilled />
                              Bitte beachten Sie, dass im Falle einer
                              Finanzierung/Leasing der Finanzierer bzw. der
                              Leasinggeber grds. für den Fahrzeugschaden
                              anspruchsberechtigt ist. Bitte lassen Sie sich
                              daher eine Bestätigung erteilen, dass Sie den
                              Fahrzeugschaden geltend machen dürfen und laden
                              Sie das Bestätigungsschreiben hier hoch.
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Fahrzeugschaden.Besteatigung">
                              Bestätigungsschreiben
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Fahrzeugschaden.Besteatigung"
                              id="Fahrzeugschaden.Besteatigung"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.3Jahre">
                11. Ist Fahrzeug älter als 3 Jahre? <Required />
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Fahrzeugschaden.3Jahre"
                id="Fahrzeugschaden.3Jahre"
              />
            </Col>
          </Row>
          {isFahrzeugschaden3Jahre === "Ja" ? (
            <>
              <Row>
                <Col xs={{ span: 24 }} sm={{ span: 16 }}>
                  <label htmlFor="Fahrzeugschaden.Markenwerkstatt">
                    Markenwerkstatt <Required />
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
                          >
                            Ja
                          </Radio.Button>
                          <Radio.Button
                            value="Nein"
                            style={{
                              width: "50%",
                              textAlign: "center"
                            }}
                            defaultChecked={true}
                          >
                            Nein
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                    }
                    defaultValue="Nein"
                    control={control}
                    name="Fahrzeugschaden.Markenwerkstatt"
                    id="Fahrzeugschaden.Markenwerkstatt"
                  />
                </Col>
              </Row>
              {isFahrzeugschadenMarkenwerkstatt === "Ja" ? (
                <Row>
                  <Col span={24}>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={["1"]}
                      onChange={() => {
                        onPanelChange("isFahrzeugschadenMarkenwerkstattOpen");
                      }}
                    >
                      <Panel
                        header={
                          panelState.isFahrzeugschadenMarkenwerkstattOpen
                            ? "Ausblenden"
                            : "Zeigen"
                        }
                        key={1}
                      >
                        <Row>
                          <Col span={23} offset={1} className="col-border-left">
                            <Row>
                              <Col span={10}>
                                <label htmlFor="Fahrzeugschaden.Nachweis">
                                  Nachweise für Reperatur
                                </label>
                                <Controller
                                  as={
                                    <Dragger {...propsForDrager}>
                                      <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                      </p>
                                      <p className="ant-upload-text">
                                        Dokument hierher ziehen oder hier klicken
                                      </p>
                                      <p className="ant-upload-hint">
                                        Einzel- oder Massen-Upload.
                                      </p>
                                    </Dragger>
                                  }
                                  control={control}
                                  name="Fahrzeugschaden.Nachweis"
                                  id="Fahrzeugschaden.Nachweis"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              ) : null}
            </>
          ) : null}
          <Row>
            <Col span={24}>
              <label htmlFor="Fahrzeugschaden.Datum">
                Datum der Erstzulassung
              </label>
              <Controller
                as={
                  <DatePicker
                    className={
                      errors.Fahrzeugschaden &&
                      errors.Fahrzeugschaden.Datum &&
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
                name="Fahrzeugschaden.Datum"
                id="Fahrzeugschaden.Datum"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor="Fahrzeugschaden.Laufleistung">
                Laufleistung zum Unfallzeitpunkt
              </label>
              <Controller
                as={<Input placeholder="Laufleistung Unfallzeitpunkt" />}
                control={control}
                name="Fahrzeugschaden.Laufleistung"
                id="Fahrzeugschaden.Laufleistung"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.Vorsteuerabzug">
                Vorsteuerabzugsberechtigt? <Required />
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Fahrzeugschaden.Vorsteuerabzug"
                id="Fahrzeugschaden.Vorsteuerabzug"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.gutachtenkosten">
                Liegt Ihnen ein Kostenvoranschlag oder Gutachten zu Ihren
                Fahrzeugschaden vor? <Required />
              </label>
              <Controller
                as={
                  <div>
                    <Radio.Group
                      defaultValue="Gutachten"
                      style={{
                        width: "100%"
                      }}
                      buttonStyle="solid"
                    >
                      <Radio.Button
                        value="Kostenvoranschlag"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                      >
                        Kostenvoranschlag
                      </Radio.Button>
                      <Radio.Button
                        value="Gutachten"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Gutachten
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Gutachten"
                control={control}
                name="Fahrzeugschaden.gutachtenkosten"
                id="Fahrzeugschaden.gutachtenkosten"
              />
            </Col>
          </Row>
          {isFahrzeugschadenGutachtenkosten === "Kostenvoranschlag" ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isFahrzeugschadenGutachtenkosten1Open");
                  }}
                >
                  <Panel
                    header={
                      panelState.isFahrzeugschadenGutachtenkosten1Open
                        ? "Ausblenden"
                        : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col span={23} offset={1} className="col-border-left">
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Kostenvoranschlag.Dok">
                              Dokument Kostenvoranschlag <Required />
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Kostenvoranschlag.Dok"
                              id="Kostenvoranschlag.Dok"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Kostenvoranschlag.Foto">
                              Upload Schadenfotos <Required />
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Kostenvoranschlag.Foto"
                              id="Kostenvoranschlag.Foto"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <div className="message-info">
                              <InfoCircleFilled />
                              Für eine zügigere Bearbeitung können Sie folgende
                              Daten einpflegen (optional)
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Kostenvoranschlag.Netto">
                              Reparaturkosten (netto)
                            </label>
                            <Controller
                              as={<Input placeholder="Reparaturkosten" />}
                              control={control}
                              name="Kostenvoranschlag.Netto"
                              id="Kostenvoranschlag.Netto"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isFahrzeugschadenGutachtenkosten2Open");
                  }}
                >
                  <Panel
                    header={
                      panelState.isFahrzeugschadenGutachtenkosten2Open
                        ? "Ausblenden"
                        : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col span={23} offset={1} className="col-border-left">
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Gutachten.Gutachten">
                              Gutachten <Required />
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Gutachten.Gutachten"
                              id="Gutachten.Gutachten"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <div className="message-info">
                              <InfoCircleFilled />
                              Für eine zügigere Bearbeitung können Sie folgende
                              Daten einpflegen (optional)
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Kosten">
                              Vorraus. Reperaturkosten
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Vorraus. Reperaturkosten" />
                              }
                              control={control}
                              name="Gutachten.Kosten"
                              id="Gutachten.Kosten"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.WBW">
                              Wiederbeschaffungswert
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Wiederbeschaffungswert" />
                              }
                              control={control}
                              name="Gutachten.WBW"
                              id="Gutachten.WBW"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Rest">
                              Restwert (sofern ermittelt)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Restwert (sofern ermittelt)" />
                              }
                              control={control}
                              name="Gutachten.Rest"
                              id="Gutachten.Rest"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Abzug">
                              Abzug alt für neu (sofern ermittelt)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Abzug alt für neu (sofern ermittelt)" />
                              }
                              control={control}
                              name="Gutachten.Abzug"
                              id="Gutachten.Abzug"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Minderwert">
                              Wertmilderung, Merkantiler Minderwert
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Wertmilderung, Merkantiler Minderwert" />
                              }
                              control={control}
                              name="Gutachten.Minderwert"
                              id="Gutachten.Minderwert"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Nutzungsausfalls">
                              Höhe Nutzungsausfall pro Tag
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Höhe Nutzungsausfall pro Tag" />
                              }
                              control={control}
                              name="Gutachten.Nutzungsausfalls"
                              id="Gutachten.Nutzungsausfalls"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Tage">
                              Wiederbeschaffungsdauer (sofern angegeben)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Wiederbeschaffungsdauer (sofern angegeben)" />
                              }
                              control={control}
                              name="Gutachten.Tage"
                              id="Gutachten.Tage"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Sachverstaendigengebuehren.Frage">
                12. Sachverständigengebühren / Kosten für Kostenvoranschlag
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Sachverstaendigengebuehren.Frage"
                id="Sachverstaendigengebuehren.Frage"
              />
            </Col>
          </Row>
          {isSachverstaendigengebuehrenFrage === "Ja" ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isSachverstaendigengebuehrenOpen");
                  }}
                >
                  <Panel
                    header={
                      panelState.isSachverstaendigengebuehrenOpen
                        ? "Ausblenden"
                        : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col span={23} offset={1} className="col-border-left">
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Sachverstaendigengebuehren.Rechnung">
                              Rechnung Gutachter (falls nicht in Gutachten)
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Sachverstaendigengebuehren.Rechnung"
                              id="Sachverstaendigengebuehren.Rechnung"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Sachverstaendigengebuehren.Gutachterkosten">
                              Kosten (brutto)
                            </label>
                            <Controller
                              as={<Input placeholder="Kosten" />}
                              control={control}
                              name="Sachverstaendigengebuehren.Gutachterkosten"
                              id="Sachverstaendigengebuehren.Gutachterkosten"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ) : null}
        </>
      ) : null}
      <Row>
        <Col span={24}>
          <Heading
            title="2. Weitere Schadenpositionen"
            icon={<NearHeading2 />}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Fahrten.Frage">
            13. Sind unfallbedinge Fahrten bzw. Fahrtkosten angefallen?
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Fahrten.Frage"
            id="Fahrten.Frage"
          />
        </Col>
      </Row>
      {isFahrtenFrage === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isFahrtenOpen");
              }}
            >
              <Panel
                header={panelState.isFahrtenOpen ? "Ausblenden" : "Zeigen"}
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <Row>
                      <Col span={10}>
                        <label htmlFor="Fahrten.Rechnung">
                          Rechnung <Required />
                        </label>
                        <Controller
                          as={
                            <Dragger {...propsForDrager}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                Dokument hierher ziehen oder hier klicken
                              </p>
                              <p className="ant-upload-hint">
                                Einzel- oder Massen-Upload.
                              </p>
                            </Dragger>
                          }
                          control={control}
                          name="Fahrten.Rechnung"
                          id="Fahrten.Rechnung"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <div className="message-info">
                          <InfoCircleFilled />
                          Für eine zügigere Bearbeitung können Sie folgende
                          Daten einpflegen (optional)
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Fahrten.Rechnung.Summe">Summe</label>
                        <Controller
                          as={<Input placeholder="Summe" />}
                          control={control}
                          name="Fahrten.Rechnung.Summe"
                          id="Fahrten.Rechnung.Summe"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Abschleppkosten.Frage">
            14. Sind Ihnen Abschleppkosten entstanden?
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Abschleppkosten.Frage"
            id="Abschleppkosten.Frage"
          />
        </Col>
      </Row>
      {isAbschleppkostenFrage === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isAbschleppkostenFrageOpen");
              }}
            >
              <Panel
                header={
                  panelState.isAbschleppkostenFrageOpen
                    ? "Ausblenden"
                    : "Zeigen"
                }
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <Row>
                      <Col span={10}>
                        <label htmlFor="Abschleppkosten.Rechnung.Rechnung">
                          Rechnung <Required />
                        </label>
                        <Controller
                          as={
                            <Dragger {...propsForDrager}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                Dokument hierher ziehen oder hier klicken
                              </p>
                              <p className="ant-upload-hint">
                                Einzel- oder Massen-Upload.
                              </p>
                            </Dragger>
                          }
                          control={control}
                          name="Abschleppkosten.Rechnung.Rechnung"
                          id="Abschleppkosten.Rechnung.Rechnung"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <div className="message-info">
                          <InfoCircleFilled />
                          Für eine zügigere Bearbeitung können Sie folgende
                          Daten einpflegen (optional)
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Abschleppkosten.Rechnung.Summe">
                          Summe der Rechnung
                        </label>
                        <Controller
                          as={<Input placeholder="Summe der Rechnung" />}
                          control={control}
                          name="Abschleppkosten.Rechnung.Summe"
                          id="Abschleppkosten.Rechnung.Summe"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Verletzt.Frage">
            15. Wurden Sie durch den Unfall verletzt?
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Verletzt.Frage"
            id="Verletzt.Frage"
          />
        </Col>
      </Row>
      {isVerletztFrage === "Ja" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isVerletztOpen");
              }}
            >
              <Panel
                header={panelState.isVerletztOpen ? "Ausblenden" : "Zeigen"}
                key={1}
              >
                <Row>
                  <Col span={23} offset={1} className="col-border-left">
                    <Row>
                      <Col span={10}>
                        <label htmlFor="Verletzt.Rechnung">Rechnung</label>
                        <Controller
                          as={
                            <Dragger {...propsForDrager}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                Dokument hierher ziehen oder hier klicken
                              </p>
                              <p className="ant-upload-hint">
                                Einzel- oder Massen-Upload.
                              </p>
                            </Dragger>
                          }
                          control={control}
                          name="Verletzt.Rechnung"
                          id="Verletzt.Rechnung"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <div className="message-info">
                          <InfoCircleFilled />
                          Für eine zügigere Bearbeitung können Sie folgende
                          Daten einpflegen (optional)
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Verletzt.Verletzungen">
                          Welche Verletzungen liegen vor? Primärverletzung?
                        </label>
                        <Controller
                          as={
                            <Input placeholder="Welche Verletzungen liegen vor? Primärverletzung?" />
                          }
                          control={control}
                          name="Verletzt.Verletzungen "
                          id="Verletzt.Verletzungen "
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <label htmlFor="Arbeitsunfahigkeit.Frage">
            16. Bestand eine Arbeitsunfähigkeit?
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
                  >
                    Ja
                  </Radio.Button>
                  <Radio.Button
                    value="Nein"
                    style={{
                      width: "50%",
                      textAlign: "center"
                    }}
                    defaultChecked={true}
                  >
                    Nein
                  </Radio.Button>
                </Radio.Group>
              </div>
            }
            defaultValue="Nein"
            control={control}
            name="Arbeitsunfahigkeit.Frage"
            id="Arbeitsunfahigkeit.Frage"
          />
        </Col>
      </Row>
      {isArbeitsunfahigkeitFrage === "Ja" ? (
        <>
          <Row>
            <Col span={24}>
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                onChange={() => {
                  onPanelChange("isArbeitsunfahigkeitOpen");
                }}
              >
                <Panel
                  header={
                    panelState.isArbeitsunfahigkeitOpen
                      ? "Ausblenden"
                      : "Zeigen"
                  }
                  key={1}
                >
                  <Row>
                    <Col span={23} offset={1} className="col-border-left">
                      <Row>
                        <Col span={10}>
                          <label htmlFor="Schmerzensgeld.Dok">
                            Ärztliche Unterlagen
                          </label>
                          <Controller
                            as={
                              <Dragger {...propsForDrager}>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Dokument hierher ziehen oder hier klicken
                                </p>
                                <p className="ant-upload-hint">
                                  Einzel- oder Massen-Upload.
                                </p>
                              </Dragger>
                            }
                            control={control}
                            name="Schmerzensgeld.Dok"
                            id="Schmerzensgeld.Dok"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          <div className="message-info">
                            <InfoCircleFilled />
                            Für eine zügigere Bearbeitung können Sie folgende
                            Daten einpflegen (optional)
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label htmlFor="Schmerzensgeld.Verletzungen">
                            Welche Verletzungen liegen vor? Primärverletzung?
                          </label>
                          <Controller
                            as={
                              <Input placeholder="Welche Verletzungen liegen vor? Primärverletzung?" />
                            }
                            control={control}
                            name="Schmerzensgeld.Verletzungen"
                            id="Schmerzensgeld.Verletzungen"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Haushaltsfuhrungsschaden.Frage">
                17. Ist Ihnen ein Haushaltsführungsschaden entstanden?
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Haushaltsfuhrungsschaden.Frage"
                id="Haushaltsfuhrungsschaden.Frage"
              />
            </Col>
          </Row>
          {isHaushaltsfuhrungsschadenFrage === "Ja" ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isHaushaltsfuhrungsschadenOpen");
                  }}
                >
                  <Panel
                    header={
                      panelState.isHaushaltsfuhrungsschadenOpen
                        ? "Ausblenden"
                        : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col span={23} offset={1} className="col-border-left">
                        <Row>
                          <Col xs={{ span: 24 }} sm={{ span: 16 }}>
                            <label htmlFor="Haushaltsfuhrungsschaden.Eingeschränkt">
                              Waren oder sind Sie aufgrund der Verletzung
                              eingeschränkt?
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
                                    >
                                      Ja
                                    </Radio.Button>
                                    <Radio.Button
                                      value="Nein"
                                      style={{
                                        width: "50%",
                                        textAlign: "center"
                                      }}
                                      defaultChecked={true}
                                    >
                                      Nein
                                    </Radio.Button>
                                  </Radio.Group>
                                </div>
                              }
                              defaultValue="Nein"
                              control={control}
                              name="Haushaltsfuhrungsschaden.Eingeschränkt"
                              id="Haushaltsfuhrungsschaden.Eingeschränkt"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Haushaltsfuhrungsschaden.Tatigkeit">
                              Welche Haushaltliche Tätigkeit konnten Sie nicht
                              mehr wahrnehmen?
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Individuelle Faktoren Einschränkung" />
                              }
                              control={control}
                              name="Haushaltsfuhrungsschaden.Tatigkeit"
                              id="Haushaltsfuhrungsschaden.Tatigkeit"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Haushaltsfuhrungsschaden.DatumVon">
                              Startdatum einschränkung - Enddatum Einschränkung
                            </label>
                            <br />
                            <Controller
                              as={
                                <RangePicker
                                  ranges={{
                                    Today: [moment(), moment()],
                                    "This Month": [
                                      moment().startOf("month"),
                                      moment().endOf("month")
                                    ]
                                  }}
                                />
                              }
                              control={control}
                              name="Haushaltsfuhrungsschaden.DatumVon"
                              id="Haushaltsfuhrungsschaden.DatumVon"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Haushaltsfuehrungsschaden.Zeitraum.Angabe">
                              Grobe Schätzung
                            </label>
                            <Controller
                              as={
                                <Select
                                  defaultValue="100%"
                                  style={{ width: "100%" }}
                                >
                                  <Option value="10%">10%</Option>
                                  <Option value="20%">20%</Option>
                                  <Option value="30%">30%</Option>
                                  <Option value="40%">40%</Option>
                                  <Option value="50%">50%</Option>
                                  <Option value="60%">60%</Option>
                                  <Option value="70%">70%</Option>
                                  <Option value="80%">80%</Option>
                                  <Option value="90%">90%</Option>
                                  <Option value="100%">100%</Option>
                                </Select>
                              }
                              control={control}
                              name="Haushaltsfuehrungsschaden.Zeitraum.Angabe"
                              id="Haushaltsfuehrungsschaden.Zeitraum.Angabe"
                              defaultValue="100%"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Haushaltsfuehrungsschaden.Zeitraum.a">
                              Haushaltsgröße
                            </label>
                            <Controller
                              as={
                                <Select
                                  defaultValue="100%"
                                  style={{ width: "100%" }}
                                >
                                  <Option value="1 Person">
                                    <OnePerson /> 1 Person
                                  </Option>
                                  <Option value="2 Personen (Eheleute)">
                                    <TwoPersons /> 2 Personen (Eheleute)
                                  </Option>
                                  <Option value="3 Personen (Eheleute + Kind)">
                                    <ThreePersons /> 3 Personen (Eheleute +
                                    Kind)
                                  </Option>
                                  <Option value="4 Personen (Eheleute + 2 Kinder)">
                                    <ThreePersons /> 4 Personen (Eheleute + 2
                                    Kinder)
                                  </Option>
                                  <Option value="5 Personen (Eheleute + 3 Kinder)">
                                    <ThreePersons /> 5 Personen (Eheleute + 3
                                    Kinder)
                                  </Option>
                                </Select>
                              }
                              control={control}
                              name="Haushaltsfuehrungsschaden.Zeitraum.a"
                              id="Haushaltsfuehrungsschaden.Zeitraum.a"
                              defaultValue="1 Person"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Heilbehandlungskosten.Frage">
                18. Sind Ihnen Heilbehandlungskosten entstanden?
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Heilbehandlungskosten.Frage"
                id="Heilbehandlungskosten.Frage"
              />
            </Col>
          </Row>
          {isHeilbehandlungskostenFrage === "Ja" ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isHeilbehandlungskostenOpen");
                  }}
                >
                  <Panel
                    header={
                      panelState.isHeilbehandlungskostenOpen
                        ? "Ausblenden"
                        : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col span={23} offset={1} className="col-border-left">
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Heilbehandlungskosten.Rechnung">
                              Rechnung
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Heilbehandlungskosten.Rechnung"
                              id="Heilbehandlungskosten.Rechnung"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <div className="message-info">
                              <InfoCircleFilled />
                              Für eine zügigere Bearbeitung können Sie folgende
                              Daten einpflegen (optional)
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Heilbehandlungskosten.Leistung">
                              Art der Leistung (z.B. Arzneimittelkosten)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Art der Leistung (z.B. Arzneimittelkosten)" />
                              }
                              control={control}
                              name="Heilbehandlungskosten.Leistung"
                              id="Heilbehandlungskosten.Leistung"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Heilbehandlungskosten.Summe">
                              Summe der Rechnung
                            </label>
                            <Controller
                              as={<Input placeholder="Summe der Rechnung" />}
                              control={control}
                              name="Heilbehandlungskosten.Summe"
                              id="Heilbehandlungskosten.Summe"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Gegenstaende.Frage">
                19. Wurden sonstige Gegenstände (z.B. Kleidung/Handy) durch den
                Unfall beschädigt?
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
                      >
                        Ja
                      </Radio.Button>
                      <Radio.Button
                        value="Nein"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                        defaultChecked={true}
                      >
                        Nein
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Nein"
                control={control}
                name="Gegenstaende.Frage"
                id="Gegenstaende.Frage"
              />
            </Col>
          </Row>
          {isGegenstaendeFrage === "Ja" ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isGegenstaendeOpen");
                  }}
                >
                  <Panel
                    header={
                      panelState.isGegenstaendeOpen ? "Ausblenden" : "Zeigen"
                    }
                    key={1}
                  >
                    <Row>
                      <Col
                        span={23}
                        offset={1}
                        className="col-border-left border-97"
                      >
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Gegenstaende.Gegenstaende.Rechnung">
                              Rechnung
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Gegenstaende.Gegenstaende.Rechnung"
                              id="Gegenstaende.Gegenstaende.Rechnung"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <div className="message-info">
                              <InfoCircleFilled />
                              Für eine zügigere Bearbeitung können Sie folgende
                              Daten einpflegen (optional)
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Gegenstaende.Gegenstaende.Foto">
                              Foto Gegenstand
                            </label>
                            <Controller
                              as={
                                <Dragger {...propsForDrager}>
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Dokument hierher ziehen oder hier klicken
                                  </p>
                                  <p className="ant-upload-hint">
                                    Einzel- oder Massen-Upload.
                                  </p>
                                </Dragger>
                              }
                              control={control}
                              name="Gegenstaende.Gegenstaende.Foto"
                              id="Gegenstaende.Gegenstaende.Foto"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gegenstaende.Gegenstaende.Bezeichnung">
                              Bezeichnung Gegenstand
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Bezeichnung Gegenstand" />
                              }
                              control={control}
                              name="Gegenstaende.Gegenstaende.Bezeichnung"
                              id="Gegenstaende.Gegenstaende.Bezeichnung"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gegenstaende.Gegenstaende.Preis">
                              Kaufpreis ca.
                            </label>
                            <Controller
                              as={<Input placeholder="Reparaturkosten" />}
                              control={control}
                              name="Gegenstaende.Gegenstaende.Preis"
                              id="Gegenstaende.Gegenstaende.Preis"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gegenstaende.Gegenstaende.Datum">
                              Kaufdatum ca.
                            </label>
                            <Controller
                              as={
                                <DatePicker
                                  style={{
                                    width: "100%"
                                  }}
                                  mode="date"
                                  format="YYYY-MM-DD"
                                  showTime={false}
                                />
                              }
                              control={control}
                              name="Gegenstaende.Gegenstaende.Datum"
                              id="Gegenstaende.Gegenstaende.Datum"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          ) : null}
        </>
      ) : null}
      <Row>
        <Col span={10}>
          <label htmlFor="Unfall.Vollmacht">20. Vollmacht</label>
          <Controller
            as={
              <Dragger {...propsForDrager}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Dokument hierher ziehen oder hier klicken
                </p>
                <p className="ant-upload-hint">
                  Einzel- oder Massen-Upload.
                </p>
              </Dragger>
            }
            control={control}
            name="Unfall.Vollmacht"
            id="Unfall.Vollmacht"
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <label htmlFor="Unfall.Weiteres.Dok">21. Weiteres Dokument</label>
          <Controller
            as={
              <Dragger {...propsForDrager}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Dokument hierher ziehen oder hier klicken
                </p>
                <p className="ant-upload-hint">
                  Einzel- oder Massen-Upload.
                </p>
              </Dragger>
            }
            control={control}
            name="Unfall.Weiteres.Dok"
            id="Unfall.Weiteres.Dok"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfall.Weiteres.Infos">22. Weitere Infos</label>
          <Controller
            as={<Input placeholder="Weitere Infos" />}
            control={control}
            name="Unfall.Weiteres.Infos"
            id="Unfall.Weiteres.Infos"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfall.Email">
            23. Ihre E-mail <Required />
          </label>
          <Controller
            as={
              <Input
                placeholder="Ihre E-mail"
                className={
                  errors.Unfall &&
                  errors.Unfall.Email &&
                  "input-error"
                }
              />
            }
            control={control}
            name="Unfall.Email"
            id="Unfall.Email"
            rules={{
              required: errorMessages.required,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: errorMessages.incorrect("E-mail")
              }
            }}
          />
          {errors.Unfall && errors.Unfall.Email && (
            <span className="message-error">
              {errors.Unfall.Email.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor="Unfall.Aktenzeichen">
            24. Ihr Lawnow Aktenzeichen (per Mail an Sie gesendet) <Required />
          </label>
          <Controller
            as={
              <Input
                placeholder="Ihr Lawnow Aktenzeichen (per Mail an Sie gesenet)"
                className={
                  errors.Unfall &&
                  errors.Unfall.Aktenzeichen &&
                  "input-error"
                }
              />
            }
            control={control}
            name="Unfall.Aktenzeichen"
            id="Unfall.Aktenzeichen"
            rules={{
              required: errorMessages.required,
            }}
          />
          {errors.Unfall && errors.Unfall.Aktenzeichen && (
            <span className="message-error">
              {errors.Unfall.Aktenzeichen.message}
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={14}>
          <p className="description-info">
            Vielen Dank, wenn Sie alle Pflichtfelder ausgefüllt haben klicken
            Sie unten um Schritt 2 abzuschließen.
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              marginBottom: "30px"
            }}
          >
            Schritt 2 abschließen
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default Unfall;
