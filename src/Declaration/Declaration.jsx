import React from 'react';
import './Declaration.scss';

export default function Declaration() {
  return (
    <div className="declaration">
      <h1 className="heading">Новый заказ</h1>
      <p className="">
        ВАЖНО! Все данные должны быть указаны корректно и максимально подробно.
        <br />
        После выполнения заказа все изменения в декларации, инициированные клиентом,
        будут оплачиваться дополнительно.
        <br />
        Например, добавление налоговых вычетов, иных доходов (подлежащих декларированию) и т.д.

      </p>
    </div>
  );
}
