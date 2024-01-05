import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function SwitchInput(props) {
  const { text, label, name, handleChange } = props;
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={12} md={5}>
        {text}
        <p className="label">{label}</p>
      </Form.Label>
      <Col sm={12} md={7}>
        <Form.Check
          type="switch"
          id="custom-switch"
          onChange={handleChange}
          name={name}
        />
      </Col>
    </Form.Group>
  );
}
