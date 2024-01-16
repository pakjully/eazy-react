import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Error } from '../../Error';

export function SelectInput(props) {
  const {
    text, handleChange, value, name, options, handleBlur, errors,
  } = props;
  const computedErrors = Array.isArray(errors) ? errors : [errors];
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={12} md={5}>{text}</Form.Label>
      <Col sm={12} md={7}>
        <Form.Select
          value={value}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={computedErrors.length}
        >
          {options.map((option) => (<option key={option} value={option}>{option}</option>))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{computedErrors}</Form.Control.Feedback>

      </Col>
    </Form.Group>
  );
}
