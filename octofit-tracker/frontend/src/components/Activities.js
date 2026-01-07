import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      });
  }, []);
  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Activities</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.id || idx + 1}</td>
                  <td>{activity.name || '-'}</td>
                  <td>{activity.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" data-bs-toggle="modal" data-bs-target="#addActivityModal">Nieuwe activiteit toevoegen</button>
        </div>
      </div>
      {/* Modal voor toevoegen activiteit */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Nieuwe activiteit toevoegen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="activityName" className="form-label">Naam</label>
                  <input type="text" className="form-control" id="activityName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDesc" className="form-label">Beschrijving</label>
                  <textarea className="form-control" id="activityDesc" rows="3"></textarea>
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
export default Activities;
