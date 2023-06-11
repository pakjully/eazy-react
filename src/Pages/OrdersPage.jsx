import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { stateDictionary } from '../Dictionary';
import { modifyDate } from '../utils/modifyDate';

export default function OrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [declOrders, setDeclOrders] = React.useState([]);
  const [allOrders, setAllOrders] = React.useState([]);

  React.useEffect(() => {
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
  }, []);
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

  const columns = useMemo(() => [
    {
      accessorKey: 'number',
      header: 'Номер заказа',
    },
    {
      accessorKey: 'year',
      header: 'Год',
    },
    {
      accessorKey: 'type',
      header: 'Вид',
    },
    {
      accessorKey: 'state',
      header: 'Состояние',
    },
    {
      accessorKey: 'created',
      header: 'Дата создания',
    },
    {
      accessorKey: 'updated',
      header: 'Дата обновления',
    },
    {
      accessorKey: 'price',
      header: 'Сумма',
    },
  ]);
  return (
    <div className="orders">
      <button type="button" className="button button--order">Создать заказ</button>
      <MaterialReactTable columns={columns} data={allOrders} />
    </div>
  );
}
