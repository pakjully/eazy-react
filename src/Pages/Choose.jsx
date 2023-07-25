import React from 'react';
import ChooseBlock from '../ChooseBlock/ChooseBlock';

export default function Choose() {
  return (
    <div className="choose-page">
      <h1 className="heading">Выберите тип заказа</h1>
      <div className="container">
        <ChooseBlock
          design="block-button"
          heading="Расчет налоговой базы по Interactive Brokers"
          button="Сделать расчет"
          link="/orders/new"
        >
          <p className="block-text">Система автоматически рассчитает налоговую базу, и на выходе вы получите:</p>
          <p className="block-text">- Расчет налоговой базы по IB</p>
          <p className="block-text">- Пояснительную записку</p>
          <p className="block-text">- Файл .dc для самостоятельного дозаполнения декларации</p>
        </ChooseBlock>
        <ChooseBlock
          design="block-button"
          heading="Декларация под ключ"
          button="Хочу декларацию"
          link="/declaration-orders/new"
        >
          <p className="block-text">
            Если Вы не хотите тратить время и разбираться в вычетах, сальдировании и тому подобном,
            то наши специалисты подготовят декларацию и полный пакет документов для Вас.
          </p>
        </ChooseBlock>
      </div>
    </div>
  );
}
