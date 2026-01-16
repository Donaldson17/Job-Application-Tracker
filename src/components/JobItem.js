// Import useState for managing edit mode
import { useState } from 'react';

function JobItem({ job, onUpdate, onDelete, onEdit }) { // Receives single job object and handlers
  // State: Track if item is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State: Track edited values
  const [editedCompany, setEditedCompany] = useState(job.company);
  const [editedRole, setEditedRole] = useState(job.role);
  const [editedDate, setEditedDate] = useState(job.date);

  // Handle save after editing
  const handleSave = () => {
    if (!editedCompany.trim() || !editedRole.trim() || !editedDate) return; // Validate
    onEdit(job.id, { company: editedCompany.trim(), role: editedRole.trim(), date: editedDate }); // Save changes
    setIsEditing(false); // Exit edit mode
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditedCompany(job.company); // Reset to original
    setEditedRole(job.role);
    setEditedDate(job.date);
    setIsEditing(false); // Exit edit mode
  };

  return (
    // Dynamic className based on status for color-coded border
    <div className={`job-item ${job.status.toLowerCase()}`}>
      {/* Job information section */}
      <div className="job-info">
        {isEditing ? ( // Show inputs if editing
          <>
            <input 
              type="text" 
              value={editedCompany} 
              onChange={(e) => setEditedCompany(e.target.value)}
              className="edit-input"
            />
            <input 
              type="text" 
              value={editedRole} 
              onChange={(e) => setEditedRole(e.target.value)}
              className="edit-input"
            />
            <input 
              type="date" 
              value={editedDate} 
              onChange={(e) => setEditedDate(e.target.value)}
              className="edit-input"
            />
          </>
        ) : ( // Show text if not editing
          <>
            <h3>{job.company}</h3> {/* Display company name */}
            <p>{job.role}</p> {/* Display role */}
            <span className="date">{job.date}</span> {/* Display application date */}
            {job.applicantName && ( // Show applicant details if available
              <div className="applicant-details">
                <small>👤 {job.applicantName}</small>
                <small>📧 {job.applicantEmail}</small>
                {job.applicantPhone && <small>📱 {job.applicantPhone}</small>}
                <small>📄 CV: {job.cv}</small>
              </div>
            )}
          </>
        )}
      </div>
      {/* Action buttons section */}
      <div className="job-actions">
        {isEditing ? ( // Show save/cancel if editing
          <>
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </>
        ) : ( // Show normal actions if not editing
          <>
            {/* Dropdown to update status */}
            <select 
              value={job.status} // Current status selected
              onChange={(e) => onUpdate(job.id, e.target.value)} // Call update with job ID and new status
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {/* Edit button */}
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
            {/* Delete button */}
            <button onClick={() => onDelete(job.id)}>Delete</button> {/* Call delete with job ID */}
          </>
        )}
      </div>
    </div>
  );
}

export default JobItem;
