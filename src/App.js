// Import React hooks for state and side effects
import { useState, useEffect } from 'react';
// Import child components
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import JobOpenings from './components/JobOpenings';
import ApplicationModal from './components/ApplicationModal';

function App() {
  // State: Array to store all job applications
  const [jobs, setJobs] = useState([]);
  // State: Current filter selection (All, Applied, Interview, Offer, Rejected)
  const [filter, setFilter] = useState('All');
  // State: Search query for filtering by company/role
  const [search, setSearch] = useState('');
  // State: Track selected job for application modal
  const [selectedJob, setSelectedJob] = useState(null);

  // Effect: Load jobs from localStorage on component mount (runs once)
  useEffect(() => {
    const saved = localStorage.getItem('jobs'); // Get saved data
    if (saved) setJobs(JSON.parse(saved)); // Parse and set state if exists
  }, []); // Empty dependency array = runs only on mount

  // Effect: Save jobs to localStorage whenever jobs array changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs)); // Always save jobs to localStorage
  }, [jobs]); // Runs whenever jobs state changes

  // CRUD - Create: Add new job with unique ID
  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now() }]); // Spread existing jobs, add new with timestamp ID
  };

  // CRUD - Update: Change job status or edit job details by ID
  const updateStatus = (id, status) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status } : job)); // Map through, update matching ID
  };

  // CRUD - Update: Edit entire job entry
  const editJob = (id, updatedJob) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job)); // Update all fields for matching ID
  };

  // Quick add job from openings list
  const quickAddJob = (company, role) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    addJob({ company, role, date: today, status: 'Applied' }); // Add with today's date
  };

  // Handle application submission with CV and details
  const handleApplicationSubmit = (applicationData) => {
    const today = new Date().toISOString().split('T')[0];
    addJob({ 
      company: applicationData.company, 
      role: applicationData.role, 
      date: today, 
      status: 'Applied',
      applicantName: applicationData.name,
      applicantEmail: applicationData.email,
      applicantPhone: applicationData.phone,
      cv: applicationData.cv,
      coverLetter: applicationData.coverLetter
    });
  };

  // CRUD - Delete: Remove job by ID with confirmation
  const deleteJob = (id) => {
    if (window.confirm('Delete this application?')) { // Confirm before deleting
      setJobs(jobs.filter(job => job.id !== id)); // Filter out job with matching ID
    }
  };

  // CRUD - Read: Compute filtered and searched jobs, sorted by date (newest first)
  const filteredJobs = jobs
    .filter(job => filter === 'All' || job.status === filter) // Filter by status
    .filter(job => // Filter by search query (case-insensitive)
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

  return (
    <div className="app">
      <h1>Job Application Tracker</h1>
      {/* Form component to add new jobs */}
      <JobForm onAdd={addJob} />
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
      </div>

      {/* Filter buttons with job count */}
      <div className="filters">
        {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(status => {
          const count = status === 'All' ? jobs.length : jobs.filter(j => j.status === status).length; // Count jobs per status
          return (
            <button 
              key={status} // Unique key for React list rendering
              className={filter === status ? 'active' : ''} // Highlight active filter
              onClick={() => setFilter(status)} // Update filter on click
            >
              {status} ({count})
            </button>
          );
        })}
      </div>
      
      {/* List component displays filtered jobs with update/delete handlers */}
      <JobList jobs={filteredJobs} onUpdate={updateStatus} onDelete={deleteJob} onEdit={editJob} />
      
      {/* Job openings section */}
      <JobOpenings onApply={(job) => setSelectedJob(job)} />
      
      {/* Application modal */}
      {selectedJob && (
        <ApplicationModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
}

export default App;
