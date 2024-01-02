import React from 'react';
import '../../Declaration/Declaration.scss';
import './TextInput.scss';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MaskedInput from 'react-text-mask';

export function TextInput(props) {
  const {
    text, label, handleChange, value, name, type, handleBlur, error, mask,
  } = props;
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={12} md={5}>
        {text}
        <p className="label">{label}</p>
      </Form.Label>
      <Col sm={12} md={7}>
        { mask
          ? (
            <Form.Control
              className="text-input"
              as={MaskedInput}
              mask={mask}
              showMask
              value={value}
              name={name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={error}
            />
          )
          : (
            <Form.Control
              className="text-input"
              as={type}
              value={value}
              name={name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={error}
            />
          )}
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}
