import React from "react";
import { Controller } from "react-hook-form";
import {
  Input,
  Row,
  Col,
  Upload, DatePicker,
} from "antd";
import functions from "../../utils/functions";
import { InboxOutlined, InfoCircleFilled } from "@ant-design/icons";

const { Dragger } = Upload;

const GegenstaendeFields = ({fieldsCount, control, propsForDrager}) => {
  return (
    <>
      {functions.createArrayWithNumbers(fieldsCount).map((number) => (
        <div className="extraFields" key={number}>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 10}}>
              <label htmlFor={`Gegenstaende.Gegenstaende.Rechnung${number}`}>
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
                name={`Gegenstaende.Gegenstaende.Rechnung[${number}]`}
                id={`Gegenstaende.Gegenstaende.Rechnung${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 10}}>
              <div className="message-info">
                <InfoCircleFilled />
                Für eine zügigere Bearbeitung können Sie folgende
                Daten einpflegen (optional)
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 10}}>
              <label htmlFor={`Gegenstaende.Gegenstaende.Foto${number}`}>
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
                name={`Gegenstaende.Gegenstaende.Foto[${number}]`}
                id={`Gegenstaende.Gegenstaende.Foto${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Gegenstaende.Gegenstaende.Bezeichnung${number}`}>
                Bezeichnung Gegenstand
              </label>
              <Controller
                as={
                  <Input placeholder="Bezeichnung Gegenstand" />
                }
                control={control}
                name={`Gegenstaende.Gegenstaende.Bezeichnung[${number}]`}
                id={`Gegenstaende.Gegenstaende.Bezeichnung${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Gegenstaende.Gegenstaende.Preis${number}`}>
                Kaufpreis ca.
              </label>
              <Controller
                as={<Input placeholder="Reparaturkosten" />}
                control={control}
                name={`Gegenstaende.Gegenstaende.Preis[${number}]`}
                id={`Gegenstaende.Gegenstaende.Preis${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Gegenstaende.Gegenstaende.Datum${number}`}>
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
                    placeholder="Datum wählen"
                  />
                }
                control={control}
                name={`Gegenstaende.Gegenstaende.Datum[${number}]`}
                id={`Gegenstaende.Gegenstaende.Datum${number}`}
              />
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

export default GegenstaendeFields;
