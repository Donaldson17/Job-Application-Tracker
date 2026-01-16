// Import JobItem component to render individual jobs
import JobItem from './JobItem';

function JobList({ jobs, onUpdate, onDelete, onEdit }) { // Receives jobs array and handler functions
  return (
    <div className="job-list">
      {/* Conditional rendering: Show message if no jobs, otherwise map through jobs */}
      {jobs.length === 0 ? (
        <p className="empty">No applications found</p>
      ) : (
        jobs.map(job => ( // Loop through jobs array
          <JobItem 
            key={job.id} // Unique key for React reconciliation
            job={job} // Pass job data as prop
            onUpdate={onUpdate} // Pass update handler down
            onDelete={onDelete} // Pass delete handler down
            onEdit={onEdit} // Pass edit handler down
          />
        ))
      )}
    </div>
  );
}

export default JobList;
