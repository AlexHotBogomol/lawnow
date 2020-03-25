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
  DatePicker,
  Checkbox
} from "antd";
import { InboxOutlined, InfoCircleFilled } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import errorMessages from "../utils/errorMessages";
import Required from "../components/Required/Required";
import Heading from "../components/Heading/Heading";
import PKW from "../icons/PKW";
import LKW from "../icons/LKW";
import Mottorrad from "../icons/Motorrad";
import axios from "axios";

const API_PATH = "http://lawnow.ein-des-ein.com/api/contact/unfall.php";
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;

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

  //conditionals

  const isUnfallverursacherFrage = watch("Unfallverursacher.Frage");
  const isUnfallaufnahmeFrage = watch("Unfallaufnahme.Frage");
  const isZeugenFrage = watch("Zeugen.Frage");
  const isFahrzeugschadenFrage = watch("Fahrzeugschaden.Frage");
  const isFahrzeugschadenFinanziert = watch("Fahrzeugschaden.finanziert");
  const isFahrzeugschaden3Jahre = watch("Fahrzeugschaden.3Jahre");
  const isFahrzeugschadenMarkenwerkstatt = watch(
    "Fahrzeugschaden.Markenwerkstatt"
  );
  const isFahrzeugschadenGutachtenkosten = watch(
    "Fahrzeugschaden.gutachtenkosten"
  );
  const isFahrtkostenFrage = watch("Fahrtkosten.Frage")

  //event for check/uncheck checkboxes

  const [checkboxesState, setcheckboxesState] = useState({
    isSachverständigengebühren: true,
    isHeilbehandlungskosten: true
  });

  const onCheckboxChange = key => {
    const state = { ...checkboxesState };
    state[key] = !state[key];
    setcheckboxesState(state);
  };

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
    isSachverständigengebührenOpen: true,
    isHeilbehandlungskostenOpen: true,
    isFahrtkostenFrageOpen: true
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
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
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
          <Heading title="1. Unfalldaten" />
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
              <label htmlFor="Unfalldaten.Str">2.1 Straße (bei Kreuzung)</label>
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
            name="Unfallverursacher.Frage"
            id="Unfallverursacher.Frage"
          />
        </Col>
      </Row>
      {isUnfallverursacherFrage !== "Nein" ? (
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
                          5.1 Vorname
                        </label>
                        <Controller
                          as={<Input placeholder="Vorname" />}
                          defaultValue=""
                          control={control}
                          name="Unfallverursacher.Vorname"
                          id="Unfallverursacher.Vorname"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Nachname">
                          5.2 Nachname
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
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Unfallverursacher.StrNr">
                          5.3 Straße & Nr.
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
                        <label htmlFor="Unfallverursacher.PLZ">5.4 PLZ</label>
                        <Controller
                          as={<Input placeholder="PLZ code" maxLength={5} />}
                          control={control}
                          name="Unfallverursacher.PLZ"
                          id="Unfallverursacher.PLZ"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Stadt">
                          5.5 Stadt
                        </label>
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
            name="Unfallaufnahme.Frage"
            id="Unfallaufnahme.Frage"
          />
        </Col>
      </Row>
      {isUnfallaufnahmeFrage !== "Nein" ? (
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
                          6.1 Name Dienststelle / Behörde
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
                          6.2 Aktenzeichen
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
                          6.3 Straße & Nr.
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
                        <label htmlFor="Unfallaufnahme.PLZ">6.4 PLZ</label>
                        <Controller
                          as={<Input placeholder="PLZ code" maxLength={5} />}
                          control={control}
                          name="Unfallaufnahme.PLZ"
                          id="Unfallaufnahme.PLZ"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallaufnahme.Stadt">6.5 Stadt</label>
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
                          6.6 Polizeibericht hochladen
                        </label>
                        <Dragger
                          id="Unfallaufnahme.Dok"
                          name="Unfallaufnahme.Dok"
                          {...propsForDrager}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or a bulk upload.
                          </p>
                        </Dragger>
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
            name="Zeugen.Frage"
            id="Zeugen.Frage"
          />
        </Col>
      </Row>
      {isZeugenFrage !== "Nein" ? (
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
                        <label htmlFor="Zeugen.Vorname">7.1 Vorname</label>
                        <Controller
                          as={<Input placeholder="Vorname" />}
                          defaultValue=""
                          control={control}
                          name="Zeugen.Vorname"
                          id="Zeugen.Vorname"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Zeugen.Nachname">7.2 Nachname</label>
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
                          name="Zeugen.Nachname"
                          id="Zeugen.Nachname"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Zeugen.StrNr">7.3 Straße & Nr.</label>
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
                        <label htmlFor="Zeugen.PLZ">7.4 PLZ</label>
                        <Controller
                          as={<Input placeholder="PLZ code" maxLength={5} />}
                          control={control}
                          name="Zeugen.PLZ"
                          id="Zeugen.PLZ"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Zeugen.Stadt">7.5 Stadt</label>
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
            name="Fahrzeugschaden.Frage"
            id="Fahrzeugschaden.Frage"
          />
        </Col>
      </Row>
      {isFahrzeugschadenFrage !== "Nein" ? (
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
                            8.1 Art des beschädigten Fahrzeugs
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
                            8.2 Kennzeichen Ihres beschädigten Fahrzeugs
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
                            8.3 Marke / Typ (z.B. VW / Golf 6)
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
                name="Fahrzeugschaden.finanziert"
                id="Fahrzeugschaden.finanziert"
              />
            </Col>
          </Row>
          {isFahrzeugschadenFinanziert !== "Nein" ? (
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
                              10.1 Bestätigungsschreiben
                            </label>
                            <Dragger
                              id="Fahrzeugschaden.Besteatigung"
                              name="Fahrzeugschaden.Besteatigung"
                              {...propsForDrager}
                            >
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
              <Col span={10}>
                <div className="message-info">
                  <InfoCircleFilled />
                  Falls Sie die gegnerischer Versicherung nicht kennen können
                  Sie diese einfach unter 0800 250 260 0 kostenfrei erfragen
                  oder hier klicken hier eine online Anfrage stellen: &nbsp;
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
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.3Jahre">
                11. Ist Fahrzeug älter als 3 Jahre? <Required />
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
                name="Fahrzeugschaden.3Jahre"
                id="Fahrzeugschaden.3Jahre"
              />
            </Col>
          </Row>
          {isFahrzeugschaden3Jahre !== "Nein" ? (
            <>
              <Row>
                <Col xs={{ span: 24 }} sm={{ span: 16 }}>
                  <label htmlFor="Fahrzeugschaden.Markenwerkstatt">
                    11.1 Markenwerkstatt <Required />
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
                    name="Fahrzeugschaden.Markenwerkstatt"
                    id="Fahrzeugschaden.Markenwerkstatt"
                  />
                </Col>
              </Row>
              {isFahrzeugschadenMarkenwerkstatt !== "Nein" ? (
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
                                  11.1.1 Nachweise für Reperatur
                                </label>
                                <Dragger
                                  id="Fahrzeugschaden.Nachweis"
                                  name="Fahrzeugschaden.Nachweis"
                                  {...propsForDrager}
                                >
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
                11.2 Datum der Erstzulassung
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
                11.3 Laufleistung zum Unfallzeitpunkt
              </label>
              <Controller
                as={<Input placeholder="Laufleistung Unfallzeitpunkt" />}
                control={control}
                name="Fahrzeugschaden.Laufleistung"
                id="Fahrzeugschaden.Laufleistung"
              />
              <span className="message-comment">Nur dezimal</span>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.Vorsteuerabzug">
                11.4 Vorsteuerabzugsberechtigt? <Required />
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
                name="Fahrzeugschaden.Vorsteuerabzug"
                id="Fahrzeugschaden.Vorsteuerabzug"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <label htmlFor="Fahrzeugschaden.gutachtenkosten">
                11.5 Liegt Ihnen ein Kostenvoranschlag oder Gutachten zu Ihren
                Fahrzeugschaden vor? <Required />
              </label>
              <Controller
                as={
                  <div>
                    <Radio.Group
                      defaultValue="Kostenvoranschlag"
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
                        defaultChecked={true}
                      >
                        Kostenvoranschlag
                      </Radio.Button>
                      <Radio.Button
                        value="Gutachten"
                        style={{
                          width: "50%",
                          textAlign: "center"
                        }}
                      >
                        Gutachten
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                }
                defaultValue="Kostenvoranschlag"
                control={control}
                name="Fahrzeugschaden.gutachtenkosten"
                id="Fahrzeugschaden.gutachtenkosten"
              />
            </Col>
          </Row>
          {isFahrzeugschadenGutachtenkosten !== "Gutachten" ? (
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
                              11.5.1 Dokument Kostenvoranschlag <Required />
                            </label>
                            <Dragger
                              id="Kostenvoranschlag.Dok"
                              name="Kostenvoranschlag.Dok"
                              {...propsForDrager}
                            >
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
                          </Col>
                        </Row>
                        <Row>
                          <Col span={10}>
                            <label htmlFor="Kostenvoranschlag.Foto">
                              11.5.2 Upload Schadenfotos <Required />
                            </label>
                            <Dragger
                              id="Kostenvoranschlag.Foto"
                              name="Kostenvoranschlag.Foto"
                              {...propsForDrager}
                            >
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
                              11.5.3 Reparaturkosten (netto)
                            </label>
                            <Controller
                              as={<Input placeholder="Reparaturkosten" />}
                              control={control}
                              name="Kostenvoranschlag.Netto"
                              id="Kostenvoranschlag.Netto"
                            />
                            <span className="message-comment">Währung</span>
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
                              11.5.1 Gutachten <Required />
                            </label>
                            <Dragger
                              id="Gutachten.Gutachten"
                              name="Gutachten.Gutachten"
                              {...propsForDrager}
                            >
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
                              11.5.2 Vorraus. Reperaturkosten
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Vorraus. Reperaturkosten" />
                              }
                              control={control}
                              name="Gutachten.Kosten"
                              id="Gutachten.Kosten"
                            />
                            <span className="message-comment">Nur dezimal</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.WBW">
                              11.5.3 Wiederbeschaffungswert
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Wiederbeschaffungswert" />
                              }
                              control={control}
                              name="Gutachten.WBW"
                              id="Gutachten.WBW"
                            />
                            <span className="message-comment">Nur dezimal</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Rest">
                              11.5.4 Restwert (sofern ermittelt)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Restwert (sofern ermittelt)" />
                              }
                              control={control}
                              name="Gutachten.Rest"
                              id="Gutachten.Rest"
                            />
                            <span className="message-comment">Nur dezimal</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Abzug">
                              11.5.5 Abzug alt für neu (sofern ermittelt)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Abzug alt für neu (sofern ermittelt)" />
                              }
                              control={control}
                              name="Gutachten.Abzug"
                              id="Gutachten.Abzug"
                            />
                            <span className="message-comment">Nur dezimal</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Minderwert">
                              11.5.6 Wertmilderung, Merkantiler Minderwert
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Wertmilderung, Merkantiler Minderwert" />
                              }
                              control={control}
                              name="Gutachten.Minderwert"
                              id="Gutachten.Minderwert"
                            />
                            <span className="message-comment">Nur dezimal</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Nutzungsausfalls">
                              11.5.7 Höhe Nutzungsausfall pro Tag
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Höhe Nutzungsausfall pro Tag" />
                              }
                              control={control}
                              name="Gutachten.Nutzungsausfalls"
                              id="Gutachten.Nutzungsausfalls"
                            />
                            <span className="message-comment">Nur dezimal</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Gutachten.Tage">
                              11.5.8 Wiederbeschaffungsdauer (sofern angegeben)
                            </label>
                            <Controller
                              as={
                                <Input placeholder="Wiederbeschaffungsdauer (sofern angegeben)" />
                              }
                              control={control}
                              name="Gutachten.Tage"
                              id="Gutachten.Tage"
                            />
                            <span className="message-comment">Nur dezimal</span>
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
            <Col span={24}>
              <Checkbox
                defaultChecked={true}
                checked={checkboxesState.isSachverständigengebühren}
                onChange={() => {
                  onCheckboxChange("isSachverständigengebühren");
                }}
              >
                12. Sachverständigengebühren / Kosten für Kostenvoranschlag
              </Checkbox>
            </Col>
          </Row>
          {checkboxesState.isSachverständigengebühren ? (
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={() => {
                    onPanelChange("isSachverständigengebührenOpen");
                  }}
                >
                  <Panel
                    header={
                      panelState.isSachverständigengebührenOpen
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
                              12.1 Rechnung Gutachter (falls nicht in Gutachten)
                            </label>
                            <Dragger
                              id="Sachverstaendigengebuehren.Rechnung"
                              name="Sachverstaendigengebuehren.Rechnung"
                              {...propsForDrager}
                            >
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
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <label htmlFor="Sachverstaendigengebuehren.Gutachterkosten">
                              12.2 Kosten (brutto)
                            </label>
                            <Controller
                              as={<Input placeholder="Kosten" />}
                              control={control}
                              name="Sachverstaendigengebuehren.Gutachterkosten"
                              id="Sachverstaendigengebuehren.Gutachterkosten"
                            />
                            <span className="message-comment">Nur dezimal</span>
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
          <Heading title="2. Weitere Schadenpositionen" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox
            defaultChecked={true}
            checked={checkboxesState.isHeilbehandlungskosten}
            onChange={() => {
              onCheckboxChange("isHeilbehandlungskosten");
            }}
          >
            13. Heilbehandlungskosten
          </Checkbox>
        </Col>
      </Row>
      {checkboxesState.isHeilbehandlungskosten ? (
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
                        <label htmlFor="Heilbehandlungskosten.Rechnung.Summe">
                          13.1 Rechnung
                        </label>
                        <Dragger
                          id="Heilbehandlungskosten.Rechnung.Summe"
                          name="Heilbehandlungskosten.Rechnung.Summe"
                          {...propsForDrager}
                        >
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
                        <label htmlFor="Heilbehandlungskosten.Rechnung.Art">
                          13.2 Art der Leistung (z.B. Arzneimittelkosten)
                        </label>
                        <Controller
                          as={
                            <Input placeholder="Art der Leistung (z.B. Arzneimittelkosten)" />
                          }
                          control={control}
                          name="Heilbehandlungskosten.Rechnung.Art"
                          id="Heilbehandlungskosten.Rechnung.Art"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Heilbehandlungskosten.Rechnung.Rechnung">
                          13.3 Summe der Rechnung
                        </label>
                        <Controller
                          as={<Input placeholder="Summe der Rechnung" />}
                          control={control}
                          name="Heilbehandlungskosten.Rechnung.Rechnung"
                          id="Heilbehandlungskosten.Rechnung.Rechnung"
                        />
                        <span className="message-comment">Nur dezimal</span>
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
          <label htmlFor="Fahrtkosten.Frage">
            14. Haben Sie eine Rechnung über die Fahrtkosten?
            <Required />
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
            name="Fahrtkosten.Frage"
            id="Fahrtkosten.Frage"
          />
        </Col>
      </Row>
      {isFahrtkostenFrage !== "Nein" ? (
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              onChange={() => {
                onPanelChange("isFahrtkostenFrageOpen");
              }}
            >
              <Panel
                header={
                  panelState.isFahrtkostenFrageOpen
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
                          5.1 Vorname
                        </label>
                        <Controller
                          as={<Input placeholder="Vorname" />}
                          defaultValue=""
                          control={control}
                          name="Unfallverursacher.Vorname"
                          id="Unfallverursacher.Vorname"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Nachname">
                          5.2 Nachname
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
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <label htmlFor="Unfallverursacher.StrNr">
                          5.3 Straße & Nr.
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
                        <label htmlFor="Unfallverursacher.PLZ">5.4 PLZ</label>
                        <Controller
                          as={<Input placeholder="PLZ code" maxLength={5} />}
                          control={control}
                          name="Unfallverursacher.PLZ"
                          id="Unfallverursacher.PLZ"
                        />
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unfallverursacher.Stadt">
                          5.5 Stadt
                        </label>
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
