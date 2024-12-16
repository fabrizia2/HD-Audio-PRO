import React from 'react';

const UsersPage = () => {
  return (
    <div className="users-page">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          {/* Repeat for other users */}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
