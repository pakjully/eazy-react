import React from 'react';
import { Link } from 'react-router-dom';
import { Pseudobutton } from '../Buttons/Pseudobutton';
import './ChooseBlock.scss';

export default function ChooseBlock(props) {
  const {
    button,
    children,
    heading,
    link,
    color,
    design,
  } = props;
  return (
    <div className="choose-block">
      <p className="block-heading">{heading}</p>
      {children}
      <Link to={link}>
        <Pseudobutton
          text={button}
          color={color}
          design={design}
        />
      </Link>
    </div>
  );
}
