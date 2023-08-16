import React from 'react';
import img from '../images/404.png';

export function EmptyPage() {
  return (
    <div className="empty-page">
      <img alt="404" src={img} />
      <p>Такой страницы не существует :(</p>
    </div>
  );
}
