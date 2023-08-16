import React from 'react';
import { Link } from 'react-router-dom';
import { Pseudobutton } from '../../Buttons/Pseudobutton';
import ChooseBlock from '../../ChooseBlock/ChooseBlock';
import './Choose.scss';

export function Choose() {
  return (
    <div className="choose-page">
      <h1 className="heading">Выберите тип заказа</h1>
      <div className="container">
        <ChooseBlock
          heading="Расчет налоговой базы по Interactive Brokers"
        >
          <p className="block-text">Система автоматически рассчитает налоговую базу, и на выходе вы получите:</p>
          <p className="block-text">- Расчет налоговой базы по IB</p>
          <p className="block-text">- Пояснительную записку</p>
          <p className="block-text">- Файл .dc для самостоятельного дозаполнения декларации</p>
          <Link to="/orders/new">
            <Pseudobutton
              text="Сделать расчет"
              color="orange"
              design="choose"
            />
          </Link>
        </ChooseBlock>
        <ChooseBlock
          heading="Декларация под ключ"
        >
          <p className="block-text declaration">
            Если Вы не хотите тратить время и разбираться в вычетах, сальдировании и тому подобном,
            то наши специалисты подготовят декларацию и полный пакет документов для Вас.
          </p>
          <Link to="/declaration-orders/new">
            <Pseudobutton
              text="Хочу декларацию"
              color="orange"
              design="choose"
            />
          </Link>
        </ChooseBlock>
      </div>
    </div>
  );
}
