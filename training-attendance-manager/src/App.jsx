import React, { useState, useEffect } from 'react';
import './App.css';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';

function App() {
  const [trainings, setTrainings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // 🔹 Load data from LocalStorage (priority) or SessionStorage
  useEffect(() => {
    const localData = localStorage.getItem('trainings');
    const sessionData = sessionStorage.getItem('trainings');

    if (localData) {
      setTrainings(JSON.parse(localData));
    } else if (sessionData) {
      setTrainings(JSON.parse(sessionData));
    }
  }, []);

  // 🔹 Save data whenever trainings change
  useEffect(() => {
    const data = JSON.stringify(trainings);
    localStorage.setItem('trainings', data);
    sessionStorage.setItem('trainings', data);
  }, [trainings]);

  // 🔹 CREATE
  const handleAddTraining = (newTraining) => {
    const trainingWithId = {
      ...newTraining,
      id: Date.now(),
    };
    setTrainings((prev) => [...prev, trainingWithId]);
  };

  // 🔹 EDIT START
  const handleEditStart = (training) => {
    setEditingId(training.id);
    setEditFormData(training);
  };

  // 🔹 EDIT SAVE
  const handleEditSave = (updatedTraining) => {
    setTrainings((prev) =>
      prev.map((training) =>
        training.id === editingId ? updatedTraining : training
      )
    );
    setEditingId(null);
    setEditFormData({});
  };

  // 🔹 EDIT CANCEL
  const handleEditCancel = () => {
    setEditingId(null);
    setEditFormData({});
  };

  // 🔹 DELETE
  const handleDeleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setTrainings((prev) =>
        prev.filter((training) => training.id !== id)
      );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Training Attendance Manager</h1>
        <p>Track employee training sessions and completion status</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>Add New Training Session</h2>
          <TrainingForm onAdd={handleAddTraining} />
        </section>

        <section className="table-section">
          <h2>Training Records ({trainings.length})</h2>
          {trainings.length === 0 ? (
            <p className="no-data">No training records yet. Add one above!</p>
          ) : (
            <TrainingTable
              trainings={trainings}
              editingId={editingId}
              editFormData={editFormData}
              onEditStart={handleEditStart}
              onEditSave={handleEditSave}
              onEditCancel={handleEditCancel}
              onDelete={handleDeleteTraining}
              setEditFormData={setEditFormData}
            />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Data is stored using <strong>LocalStorage</strong> and
          <strong> SessionStorage</strong>.
        </p>
      </footer>
    </div>
  );
}

export default App;
