import { useState } from 'react';

function TrainingForm({ onAdd }) {
  const [formData, setFormData] = useState({
    employeeName: '',
    trainingName: '',
    trainingDate: '',
    status: 'Not Attended',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.trainingName || !formData.trainingDate) {
      alert('Please fill in all fields!');
      return;
    }
    onAdd(formData);
    setFormData({ employeeName: '', trainingName: '', trainingDate: '', status: 'Not Attended' });
  };

  return (
    <form className="training-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="employeeName">Employee Name:</label>
        <input
          type="text"
          id="employeeName"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          placeholder="Enter employee name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="trainingName">Training Name:</label>
        <input
          type="text"
          id="trainingName"
          name="trainingName"
          value={formData.trainingName}
          onChange={handleChange}
          placeholder="Enter training name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="trainingDate">Training Date:</label>
        <input
          type="date"
          id="trainingDate"
          name="trainingDate"
          value={formData.trainingDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Not Attended">Not Attended</option>
          <option value="Attended">Attended</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        + Add Training
      </button>
    </form>
  );
}

export default TrainingForm;
