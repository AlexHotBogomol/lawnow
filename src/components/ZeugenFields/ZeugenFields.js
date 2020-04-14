import React from "react";
import { Col, Input, Row } from "antd";
import { Controller } from "react-hook-form";
import errorMessages from "../../utils/errorMessages";
import MaskedInput from "antd-mask-input";
import customValidations from "../../utils/customValidation";
import functions from "../../utils/functions";

const ZeugenFields = ({fieldsCount, errors, control}) => {
  return (
   <>
      {functions.createArrayWithNumbers(fieldsCount).map((number) => (
        <div className="extraFields" key={number}>
          <Row gutter={32}>
            <Col xs={{ span: 24 }} md={{ span: 12}}>
              <label htmlFor={`Zeugen.Vorname${number}`}>Vorname</label>
              <Controller
                as={
                  <Input
                    className={
                      errors.Zeugen && errors.Zeugen.Vorname && "input-error"
                    }
                    placeholder="Vorname"
                  />
                }
                defaultValue=""
                control={control}
                name={`Zeugen.Vorname[${number}]`}
                id={`Zeugen.Vorname${number}`}
                rules={{
                  pattern: {
                    value: /^[A-Za-z \u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]+$/i,
                    message: errorMessages.specialChars()
                  }
                }}
              />
              {errors.Zeugen && errors.Zeugen.Vorname[number] && (
                <span className="message-error">{errors.Zeugen.Vorname[number].message}</span>
              )}
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12}}>
              <label htmlFor={`Zeugen.Nachname${number}`}>Nachname</label>
              <Controller
                as={
                  <Input
                    className={
                      errors.Zeugen && errors.Zeugen.Nachname && "input-error"
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
                name={`Zeugen.Nachname[${number}]`}
                id={`Zeugen.Nachname${number}`}
              />
              {errors.Zeugen && errors.Zeugen.Nachname[number] && (
                <span className="message-error">
                  {errors.Zeugen.Nachname[number].message}
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor={`Zeugen.StrNr${number}`}>Straße & Nr.</label>
              <Controller
                as={<Input placeholder="Straße & Nr." />}
                control={control}
                name={`Zeugen.StrNr[${number}]`}
                id={`Zeugen.StrNr${number}`}
              />
            </Col>
          </Row>
          <Row gutter={32}>
            <Col xs={{ span: 24 }} md={{ span: 12}}>
              <label htmlFor={`Zeugen.PLZ${number}`}>PLZ</label>
              <Controller
                as={
                  <MaskedInput
                    className={errors.Zeugen && errors.Zeugen.PLZ && "input-error"}
                    placeholder="PLZ code"
                    size={5}
                    mask="11111"
                  />
                }
                control={control}
                name={`Zeugen.PLZ[${number}]`}
                id={`Zeugen.PLZ${number}`}
                rules={{
                  validate: {
                    inputPLZCorrect: customValidations.isIncorrectPLZ
                  }
                }}
              />
              {errors.Zeugen && errors.Zeugen.PLZ[number] && (
                <span className="message-error">{errors.Zeugen.PLZ[number].message}</span>
              )}
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12}}>
              <label htmlFor={`Zeugen.Stadt${number}`}>Stadt</label>
              <Controller
                as={<Input placeholder="Stadt" />}
                control={control}
                name={`Zeugen.Stadt[${number}]`}
                id={`Zeugen.Stadt${number}`}
              />
            </Col>
          </Row>
        </div>
      ))}
     </>
  );
};

export default ZeugenFields;
