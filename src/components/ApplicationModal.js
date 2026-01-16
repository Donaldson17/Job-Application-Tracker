// Import useState for managing form state
import { useState } from 'react';

function ApplicationModal({ job, onClose, onSubmit }) { // Receives job details, close and submit handlers
  // State: Track form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  // Handle CV file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCvFile(file.name); // Store filename only (no actual upload in this demo)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return; // Validate required fields
    
    // Submit application with all details
    onSubmit({
      company: job.company,
      role: job.role,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      cv: cvFile || 'Not uploaded',
      coverLetter: coverLetter.trim()
    });
    
    onClose(); // Close modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Click outside to close */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent close on content click */}
        <h2>Apply to {job.company}</h2>
        <p className="modal-role">{job.role}</p>
        
        <form onSubmit={handleSubmit} className="application-form">
          {/* Personal details */}
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          {/* CV upload */}
          <div className="file-upload">
            <label htmlFor="cv-upload">Upload CV:</label>
            <input
              id="cv-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            {cvFile && <span className="file-name">✓ {cvFile}</span>}
          </div>
          
          {/* Cover letter */}
          <textarea
            placeholder="Cover Letter (optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows="4"
          />
          
          {/* Action buttons */}
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Submit Application</button>
            <button type="button" onClick={onClose} className="cancel-modal-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationModal;
