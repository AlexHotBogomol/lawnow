import React from "react";
import { Controller } from "react-hook-form";
import {
  Input,
  Row,
  Col,
  Upload,
} from "antd";
import functions from "../../utils/functions";
import { InboxOutlined, InfoCircleFilled } from "@ant-design/icons";

const { Dragger } = Upload;

const HeilbehandlungskostenFields = ({fieldsCount, control, propsForDrager}) => {
  return (
    <>
      {functions.createArrayWithNumbers(fieldsCount).map((number) => (
        <div className="extraFields" key={number}>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 10}}>
              <label htmlFor={`Heilbehandlungskosten.Rechnung${number}`}>
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
                name={`Heilbehandlungskosten.Rechnung[${number}]`}
                id={`Heilbehandlungskosten.Rechnung${number}`}
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
            <Col span={24}>
              <label htmlFor={`Heilbehandlungskosten.Leistung${number}`}>
                Art der Leistung (z.B. Arzneimittelkosten)
              </label>
              <Controller
                as={
                  <Input placeholder="Art der Leistung (z.B. Arzneimittelkosten)" />
                }
                control={control}
                name={`Heilbehandlungskosten.Leistung[${number}]`}
                id={`Heilbehandlungskosten.Leistung${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Heilbehandlungskosten.Summe${number}`}>
                Summe der Rechnung
              </label>
              <Controller
                as={<Input placeholder="Summe der Rechnung" />}
                control={control}
                name={`Heilbehandlungskosten.Summe[${number}]`}
                id={`Heilbehandlungskosten.Summe${number}`}
              />
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

export default HeilbehandlungskostenFields;
