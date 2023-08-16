import React from 'react';
import './Pseudobutton.scss';

export function Pseudobutton(props) {
  const {
    text,
    color,
    design,
  } = props;
  return (
    <div className={`pseudobutton ${color} ${design}`}>{text}</div>
  );
}
