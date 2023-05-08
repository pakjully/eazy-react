import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

export default function OrdersPage(props) {
  const { orders } = props;
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
      <MaterialReactTable columns={columns} data={orders} />
    </div>
  );
}
