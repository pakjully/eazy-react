import React from 'react';
import './SelectInput.scss';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function SelectInput(props) {
  const {
    text, handleChange, value, name, options, handleBlur, error
  } = props;

  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={12} md={5}>{text}</Form.Label>
      <Col sm={12} md={7}>
        <Form.Select
          value={value}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={error}
        >
          {options.map((option) => (<option key={option} value={option}>{option}</option>))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}
