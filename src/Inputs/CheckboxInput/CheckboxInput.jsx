import React from 'react';
import './CheckboxInput.scss';
import Form from 'react-bootstrap/Form';

export function CheckboxInput(props) {
  const {
    options, handleChange, className,
  } = props;
  return (
    <Form.Group>
      <div className={className}>
        {options.map((option) => (
          <div className={className === 'checkbox-icons' ? 'checkbox-icon' : 'checkbox-label'}>
            <Form.Check.Input
              className="mycheck"
              onChange={handleChange}
              name={option.id}
            />
            <Form.Check.Label>
              { option.icon ? (
                <div
                  className="checkbox-icon"
                  style={{
                    backgroundImage: `url('${option.icon}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    width: 200,
                    height: 35,
                    marginLeft: '10px',
                  }}
                />
              ) : <p className="checkbox-label">{option.label}</p> }
              {' '}
            </Form.Check.Label>
          </div>
        ))}
      </div>
    </Form.Group>
  );
}
