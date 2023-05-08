import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.scss';
import LoginPage from './Pages/LoginPage';
import OrdersPage from './Pages/OrdersPage';
import { stateDictionary } from './Dictionary';
import { modifyDate } from './utils/modifyDate';
import { Header } from './Header';

function App() {
  const [orders, setOrders] = React.useState([]);
  const [declOrders, setDeclOrders] = React.useState([]);
  const [allOrders, setAllOrders] = React.useState([]);

  async function handleClick() {
    await fetch('/api/sessions/auth', {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: '{"email":"admin@example.com","password":"admin@example.com"}',
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });
    fetch('/api/users/552c4028-c4c0-4ab7-9937-47023d0bcd05/orders', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders.map((order) => ({
        number: order.number,
        year: order.year,
        type: 'Расчет налоговой базы',
        state: stateDictionary[order.state] || '-',
        created: modifyDate(order.created_at),
        updated: modifyDate(order.updated_at),
        price: order.price,
      }))));
    fetch('/api/users/552c4028-c4c0-4ab7-9937-47023d0bcd05/declaration_orders', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setDeclOrders(data.orders.map((declOrder) => ({
        number: declOrder.number,
        year: declOrder.year,
        type: 'Декларация',
        state: stateDictionary[declOrder.state] || '-',
        created: modifyDate(declOrder.created_at),
        updated: modifyDate(declOrder.updated_at),
        price: declOrder.price,
      }))));
  }

  React.useEffect(() => {
    setAllOrders(orders.concat(declOrders).sort((a, b) => {
      if (a.number < b.number) {
        return -1;
      }
      if (a.number > b.number) {
        return 1;
      }
      return 0;
    }));
  }, [orders, declOrders]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="*"
          element={(
            <LoginPage
              handleClick={handleClick}
            />
          )}
        />
        <Route
          path="orders"
          element={(
            <OrdersPage
              orders={allOrders}
            />
        )}
        />
      </Routes>
    </div>
  );
}

export default App;
