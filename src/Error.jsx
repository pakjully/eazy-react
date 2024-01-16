import React from 'react';
import Form from 'react-bootstrap/Form';

export function Error(props) {
  const { computedErrors } = props;
  return (
    <div>
      <Form.Control.Feedback type="invalid">
        <p>Hello</p>
      </Form.Control.Feedback>
    </div>
  );
}
