import React from 'react';

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <h2>Manage Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1001</td>
            <td>Jane Doe</td>
            <td>Pending</td>
            <td>
              <button>Mark as Shipped</button>
              <button>Cancel Order</button>
            </td>
          </tr>
          {/* Repeat for other orders */}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
