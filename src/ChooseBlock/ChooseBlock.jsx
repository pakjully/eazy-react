import React from 'react';
import './ChooseBlock.scss';

export default function ChooseBlock(props) {
  const {
    children,
    heading,
  } = props;
  return (
    <div className="block">
      <p className="block-heading">{heading}</p>
      {children}
    </div>
  );
}
