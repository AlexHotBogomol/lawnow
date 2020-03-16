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
  Collapse
} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { useForm, Controller } from "react-hook-form";
import Layout from "../components/Layout/Layout";
import RadioImage from "../components/RadioImage/RadioImage";
import Required from "../components/Required/Required";
import errorMessages from "../utils/errorMessages";
// import postcodes from "../utils/postcodes";

const { Option } = Select;
const { Panel } = Collapse;

const Person = () => {
  const { handleSubmit, control, watch, setValue, register, errors, getValues} = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  const cond1 = watch("Ist_Ihnen_die_Versicherung_des_Unfallgegners_bekannt");

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: true,
    infinite: false
  };

  const [checkedRadioImageIndex, SetCheckedRadioImageIndex] = useState(0);

  const onChangeRadioImage = (value, index) => {
    setValue("Unfallart", value);
    SetCheckedRadioImageIndex(index);
  };

  const RadioImages = [
    {
      id: "first",
      value: "1. Auffahrunfall",
    },
    {
      id: "second",
      value: "2. Vorfahrtsverstoß / Rechts vor Links",
    },
    {
      id: "third",
      value: "3. Anfahren vom Fahrbahnrand / Einfahren in den fließenden Verkehr",
    },
    {
      id: "fourth",
      value: "4. Unfall zwischen Überholer und vorausfahrendem Linksabbieger",
    },
    {
      id: "fifth",
      value: "5. Unfall aufgrund Spurwechsel des Unfallgegners",
    },
    {
      id: "sixth",
      value: "6. Unfall aufgrund Spurwechsel des Unfallgegners",
    },
  ];

  useEffect(() => {
    register({ name: "Unfallart" });
  }, [register]);

  return (
    <Layout>
      <Row>
        <Col span={18}>
          <p className="description">
            Um einen schnellen und reibungslosen Ablauf ihrer
            Schadensregulierung zu ermöglichen, achten Sie bitte auf
            vollständige und richtige Angaben. Schritt 1 dauert ca. 2 Minuten.
          </p>
          <p className="required-info">* Pflichtfeld</p>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col span={16}>
            <label htmlFor="Geschlecht" className={errors.Geschlecht && 'input-error'}>1. Geschlecht <Required/></label>
            <Controller
              as={
                <div>
                  <Radio.Group
                    defaultValue="Herr"
                    style={{
                      width: "100%"
                    }}
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
              control={control}
              name="Geschlecht"
              id="Geschlecht"
            />
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <label htmlFor="Vorname" >2. Vorname <Required/></label>
            <Controller
              as={<Input className={errors.Vorname && 'input-error'} placeholder="Vorname" />}
              control={control}
              name="Vorname"
              id="Vorname"
              rules={{
                required: errorMessages.required,
                minLength: {
                  value: 2,
                  message: errorMessages.minLength("Vorname")
                }
              }}
            />
            {errors.Vorname && <span className="message-error">{errors.Vorname.message}</span>}
          </Col>
          <Col span={12}>
            <label htmlFor="Nachname">3. Nachname <Required/></label>
            <Controller
              as={<Input className={errors.Nachname && 'input-error'} placeholder="Nachname" />}
              control={control}
              name="Nachname"
              id="Nachname"
              rules={{
                required: errorMessages.required,
                minLength: {
                  value: 2,
                  message: errorMessages.minLength("Nachname")
                }
              }}
            />
            {errors.Nachname && <span className="message-error">{errors.Nachname.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="Adresse">4. Straße & Nr. <Required/></label>
            <Controller
              as={<Input className={errors.Adresse && 'input-error'} placeholder="Straße & Nr." />}
              control={control}
              name="Adresse"
              id="Adresse"
              rules={{
                required: errorMessages.required,
                minLength: {
                  value: 2,
                  message: errorMessages.minLength("Adresse")
                }
              }}
            />
            {errors.Adresse && <span className="message-error">{errors.Adresse.message}</span>}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <label htmlFor="PLZ">5. PLZ <Required/></label>
            <Controller
              as={<Input className={errors.PLZ && 'input-error'} placeholder="PLZ" />}
              control={control}
              name="PLZ"
              id="PLZ"
              rules={{
                required: errorMessages.required,
                pattern: {
                  value: /\d{5}/,
                  message: errorMessages.incorrect("PLZ")
                }
              }}
            />
            {errors.PLZ && <span className="message-error">{errors.PLZ.message}</span>}
          </Col>
          <Col span={12}>
            <label htmlFor="Stadt">6. Stadt <Required/></label>
            <Controller
              as={<Input className={errors.Stadt && 'input-error'} placeholder="Stadt" />}
              control={control}
              name="Stadt"
              id="Stadt"
              rules={{
                required: errorMessages.required
              }}
            />
            {errors.Stadt && <span className="message-error">{errors.Stadt.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="email">7. E-mail <Required/></label>
            <Controller
              as={<Input className={errors.email && 'input-error'} placeholder="E-mail" />}
              control={control}
              name="email"
              id="email"
              rules={{
                required: errorMessages.required,
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: errorMessages.incorrect("E-mail")
                }
              }}
            />
            {errors.email && <span className="message-error">{errors.email.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="phone">8. Telefon / Mobil</label>
            <Controller
              as={<Input className={errors.phone && 'input-error'} placeholder="Telefon / Mobil" />}
              control={control}
              name="phone"
              id="phone"
              rules={{
                validate: (value) => value.match(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/) && value !== ''
              }}
            />
            {errors.phone && <span className="message-error">{errors.phone.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="Kennzeichen_des_Unfallgegners">
              9. Kennzeichen des Unfallgegners <Required/>
            </label>
            <Controller
              as={<Input className={errors.Kennzeichen_des_Unfallgegners && 'input-error'} placeholder="Kennzeichen des Unfallgegners" />}
              control={control}
              name="Kennzeichen_des_Unfallgegners"
              id="Kennzeichen_des_Unfallgegners"
              rules={{
                required: errorMessages.required,
              }}
            />
            {errors.Kennzeichen_des_Unfallgegners && <span className="message-error">{errors.Kennzeichen_des_Unfallgegners.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="Herkunfsland_Fahrzeug_Unfallgegner">
              10. Herkunfsland Fahrzeug Unfallgegner <Required/>
            </label>
            <Controller
              as={
                <Select className={errors.Kennzeichen_des_Unfallgegners && 'select-error'} defaultValue="lucy" style={{ width: "100%" }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              }
              control={control}
              name="Herkunfsland_Fahrzeug_Unfallgegner"
              id="Herkunfsland_Fahrzeug_Unfallgegner"
            />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <label htmlFor="Ist_Ihnen_die_Versicherung_des_Unfallgegners_bekannt">
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
              name="Ist_Ihnen_die_Versicherung_des_Unfallgegners_bekannt"
              id="Ist_Ihnen_die_Versicherung_des_Unfallgegners_bekannt"
            />
          </Col>
        </Row>
        {cond1 !== "Nein" ? (
          <Row>
            <Col span={24}>
              <Collapse bordered={false} defaultActiveKey={["1"]}>
                <Panel header="Ausblenden" key={1}>
                  <Row>
                    <Col span={23} offset={1}>
                      <label htmlFor="Versicherer">11.1 Versicherer</label>
                      <Controller
                        as={<Input placeholder="Versicherer" />}
                        control={control}
                        name="Versicherer"
                        id="Versicherer"
                      />
                      <label htmlFor="Schadennummer">11.2 Schadennummer</label>
                      <Controller
                        as={<Input placeholder="Schadennummer" />}
                        control={control}
                        name="Schadennummer"
                        id="Schadennummer"
                      />
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col span={24}>
            <label htmlFor="Unfalldatum">12. Unfalldatum <Required/></label>
            <Controller
              as={
                <DatePicker
                  className={errors.Unfalldatum && 'input-error'}
                  style={{
                    width: "100%"
                  }}
                />
              }
              control={control}
              name="Unfalldatum"
              id="Unfalldatum"
              rules={{
                required: errorMessages.required,
              }}
            />
            {errors.Unfalldatum && <span className="message-error">{errors.Unfalldatum.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="Unfallort">13. Unfallort <Required/></label>
            <Controller
              as={
                <Select className={errors.Unfallort && 'input-error'} defaultValue="lucy" style={{ width: "100%" }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              }
              control={control}
              name="Unfallort"
              id="Unfallort"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="Unfallart">14. Unfallart <Required/></label>
            <Carousel {...sliderSettings}>
              {RadioImages.map((radioImage, index) => {
                return (
                  <RadioImage
                    onChangeRadioImage={onChangeRadioImage}
                    name="Unfallart"
                    id={radioImage.id}
                    key={radioImage.id}
                    value={radioImage.value}
                    checked={index === checkedRadioImageIndex}
                    index = {index}
                  />
                )
              })}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label htmlFor="Sonstiges_Unfallart">
              14.1 Sonstige Unfallart, bitte beschreiben
            </label>
            <Controller
              as={<Input placeholder="Sonstiges Unfallart" />}
              control={control}
              name="Sonstiges_Unfallart"
              id="Sonstiges_Unfallart"
            />
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <p className="description-info">
              Vielen Dank, wenn Sie alle Pflichtfelder ausgefüllt haben klicken
              Sie unten um Schritt 1 abzuschließen.
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Button
              type="primary"
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
        <Row justify="center">
          <Col span={11} >
            <p className="warning">
              <ExclamationCircleOutlined
                style={{
                  marginRight: '5px'
                }}
              />
              Warnung! Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
        </Row>
      </form>
    </Layout>
  );
};

export default Person;
