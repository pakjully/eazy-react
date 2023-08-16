import React from 'react';
import ChooseBlock from '../ChooseBlock/ChooseBlock';

export function Choose() {
  return (
    <div className="choose-page">
      <h1 className="heading">Выберите тип заказа</h1>
      <div className="container">
        <ChooseBlock
          heading="Расчет налоговой базы по Interactive Brokers"
          button="Сделать расчет"
          link="/orders/new"
          color="orange"
          design="choose"
        >
          <p className="block-text">Система автоматически рассчитает налоговую базу, и на выходе вы получите:</p>
          <p className="block-text">- Расчет налоговой базы по IB</p>
          <p className="block-text">- Пояснительную записку</p>
          <p className="block-text">- Файл .dc для самостоятельного дозаполнения декларации</p>
        </ChooseBlock>
        <ChooseBlock
          heading="Декларация под ключ"
          button="Хочу декларацию"
          link="/declaration-orders/new"
          color="orange"
          design="choose"
        >
          <p className="block-text declaration">
            Если Вы не хотите тратить время и разбираться в вычетах, сальдировании и тому подобном,
            то наши специалисты подготовят декларацию и полный пакет документов для Вас.
          </p>
        </ChooseBlock>
      </div>
    </div>
  );
}
