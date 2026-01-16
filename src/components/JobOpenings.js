// Sample job openings data
const availableJobs = [
  { id: 1, company: 'Google', role: 'Software Engineer', location: 'Remote', posted: '2 days ago' },
  { id: 2, company: 'Amazon', role: 'Frontend Developer', location: 'Seattle, WA', posted: '1 week ago' },
  { id: 3, company: 'Microsoft', role: 'Full Stack Developer', location: 'Redmond, WA', posted: '3 days ago' },
  { id: 4, company: 'Meta', role: 'React Developer', location: 'Menlo Park, CA', posted: '5 days ago' },
  { id: 5, company: 'Apple', role: 'iOS Developer', location: 'Cupertino, CA', posted: '1 day ago' },
  { id: 6, company: 'Netflix', role: 'Backend Engineer', location: 'Los Gatos, CA', posted: '4 days ago' },
];

function JobOpenings({ onApply }) { // Receives function to open application modal
  return (
    <div className="job-openings">
      <h2>Available Job Openings</h2>
      <div className="openings-list">
        {availableJobs.map(job => (
          <div key={job.id} className="opening-card">
            <div className="opening-info">
              <h3>{job.company}</h3>
              <p>{job.role}</p>
              <span className="location">{job.location}</span>
              <span className="posted">{job.posted}</span>
            </div>
            <button 
              onClick={() => onApply(job)} // Open modal with job details
              className="quick-add-btn"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobOpenings;
