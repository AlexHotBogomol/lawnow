import React from "react";
import { Controller } from "react-hook-form";
import {
  Input,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import functions from "../../utils/functions";
import moment from "moment";
import OnePerson from "../../icons/OnePerson";
import TwoPersons from "../../icons/TwoPersons";
import ThreePersons from "../../icons/ThreePersons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const HaushaltsfuhrungsschadenFields = ({fieldsCount, control}) => {
  return (
    <>
      {functions.createArrayWithNumbers(fieldsCount).map((number) => (
        <div className="extraFields" key={number}>
          <Row>
            <Col span={24}>
              <label htmlFor={`Haushaltsfuhrungsschaden.Tatigkeit${number}`}>
                Welche Haushaltliche Tätigkeit konnten Sie nicht
                mehr wahrnehmen?
              </label>
              <Controller
                as={
                  <Input placeholder="Individuelle Faktoren Einschränkung" />
                }
                control={control}
                name={`Haushaltsfuhrungsschaden.Tatigkeit[${number}]`}
                id={`Haushaltsfuhrungsschaden.Tatigkeit${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Haushaltsfuhrungsschaden.DatumVon${number}`}>
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
                    placeholder={[
                      "Startdatum einschränkung",
                      "Enddatum Einschränkung"
                    ]}
                  />
                }
                control={control}
                name={`Haushaltsfuhrungsschaden.DatumVon[${number}]`}
                id={`Haushaltsfuhrungsschaden.DatumVon${number}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Haushaltsfuhrungsschaden.Zeitraum.Angabe${number}`}>
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
                name={`Haushaltsfuhrungsschaden.Zeitraum.Angabe[${number}]`}
                id={`Haushaltsfuhrungsschaden.Zeitraum.Angabe${number}`}
                defaultValue="100%"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Haushaltsfuhrungsschaden.Zeitraum.a${number}`}>
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
                name={`Haushaltsfuhrungsschaden.Zeitraum.a[${number}]`}
                id={`Haushaltsfuhrungsschaden.Zeitraum.a${number}`}
                defaultValue="1 Person"
              />
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

export default HaushaltsfuhrungsschadenFields;
