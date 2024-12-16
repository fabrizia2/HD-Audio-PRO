// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Menu</h2>
      <NavLink to="/admin" activeClassName="active">Dashboard</NavLink>
      <NavLink to="/admin/users" activeClassName="active">Users</NavLink>
      <NavLink to="/admin/products" activeClassName="active">Products</NavLink>
      <NavLink to="/admin/orders" activeClassName="active">Orders</NavLink>
      <NavLink to="/admin/categories" activeClassName="active">Categories</NavLink>
    </div>
  );
};

export default Sidebar;
