import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results || data);
      });
  }, []);
  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Workouts</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id || idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.type || '-'}</td>
                  <td>{workout.duration || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">Nieuwe workout toevoegen</button>
        </div>
      </div>
      {/* Modal voor toevoegen workout */}
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkoutModalLabel">Nieuwe workout toevoegen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="workoutName" className="form-label">Naam</label>
                  <input type="text" className="form-control" id="workoutName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="workoutType" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDuration" className="form-label">Duur (minuten)</label>
                  <input type="number" className="form-control" id="workoutDuration" />
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
export default Workouts;
