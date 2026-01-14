import TrainingEditForm from './TrainingEditForm';

function TrainingTable({
  trainings,
  editingId,
  editFormData,
  onEditStart,
  onEditSave,
  onEditCancel,
  onDelete,
  setEditFormData,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'Attended':
        return 'status-attended';
      default:
        return 'status-not-attended';
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="training-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Training Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training, index) => (
              <tr key={training.id}>
                <td>{index + 1}</td>
                <td>{training.employeeName}</td>
                <td>{training.trainingName}</td>
                <td>{new Date(training.trainingDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(training.status)}`}>
                    {training.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => onEditStart(training)}
                      title="Edit this record"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(training.id)}
                      title="Delete this record"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && (
        <TrainingEditForm
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          onSave={onEditSave}
          onCancel={onEditCancel}
        />
      )}
    </>
  );
}

export default TrainingTable;
