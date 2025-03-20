import React from 'react';

function OrdersDisplay({ orders }) {
  const groupedOrders = groupOrdersByEmail(orders);
  console.log("hi from kitchen display")
  console.log({orders})
  return (
    <div>
      <h2>Orders by Email</h2>
      {Object.entries(groupedOrders).map(([email, orderList]) => (
        <div key={email}>
          <h3>{email}</h3>
          <ul>
            {orderList.map((order) => (
              <li key={order._id.$oid}>
                {order.name} - {order.quantity} {order.unit} - ${order.price} - {order.time}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function groupOrdersByEmail(orders) {
  const groupedOrders = {};

  orders.forEach((order) => {
    if (!groupedOrders[order.email]) {
      groupedOrders[order.email] = [];
    }
    groupedOrders[order.email].push(order);
  });

  return groupedOrders;
}

export default OrdersDisplay;