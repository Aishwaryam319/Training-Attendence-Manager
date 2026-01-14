function TrainingEditForm({ editFormData, setEditFormData, onSave, onCancel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.employeeName || !editFormData.trainingName || !editFormData.trainingDate) {
      alert('Please fill in all fields!');
      return;
    }
    onSave(editFormData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Training Record</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-employeeName">Employee Name:</label>
            <input
              type="text"
              id="edit-employeeName"
              name="employeeName"
              value={editFormData.employeeName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-trainingName">Training Name:</label>
            <input
              type="text"
              id="edit-trainingName"
              name="trainingName"
              value={editFormData.trainingName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-trainingDate">Training Date:</label>
            <input
              type="date"
              id="edit-trainingDate"
              name="trainingDate"
              value={editFormData.trainingDate || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-status">Status:</label>
            <select
              id="edit-status"
              name="status"
              value={editFormData.status || 'Not Attended'}
              onChange={handleChange}
            >
              <option value="Not Attended">Not Attended</option>
              <option value="Attended">Attended</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              💾 Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              ✕ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainingEditForm;
