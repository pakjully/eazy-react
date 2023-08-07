import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseBlock.scss';

export default function ChooseBlock(props) {
  const {
    button,
    children,
    heading,
    link,
  } = props;
  return (
    <div className="block">
      <p className="block-heading">{heading}</p>
      {children}
      <Link to={link}>
        <button type="button" className="block-button">{button}</button>
      </Link>
    </div>
  );
}
