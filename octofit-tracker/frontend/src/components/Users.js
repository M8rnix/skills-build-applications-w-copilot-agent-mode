import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(data.results || data);
      });
  }, []);
  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Users</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td>{user.id || idx + 1}</td>
                  <td>{user.username || '-'}</td>
                  <td>{user.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" data-bs-toggle="modal" data-bs-target="#addUserModal">Nieuwe gebruiker toevoegen</button>
        </div>
      </div>
      {/* Modal voor toevoegen gebruiker */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Nieuwe gebruiker toevoegen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Gebruikersnaam</label>
                  <input type="text" className="form-control" id="userName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="userEmail" />
                </div>
                <button type="submit" className="btn btn-primary">Toevoegen</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Users;
