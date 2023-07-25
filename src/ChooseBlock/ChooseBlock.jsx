import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseBlock.scss';

export default function ChooseBlock(props) {
  const {
    heading, button, link, design, children
  } = props;
  return (
    <div className="block">
      <p className="block-heading">{heading}</p>
      {children}
      <Link to={link}>
        <button type="button" className={design}>{button}</button>
      </Link>
    </div>
  );
}
