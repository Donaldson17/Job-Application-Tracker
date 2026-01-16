// Import useState hook for managing form input state
import { useState } from 'react';

function JobForm({ onAdd }) { // Receives onAdd function from parent
  // State: Track company input value
  const [company, setCompany] = useState('');
  // State: Track role input value
  const [role, setRole] = useState('');
  // State: Track date input value
  const [date, setDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Validate all fields filled and not just whitespace
    if (!company.trim() || !role.trim() || !date) return;
    onAdd({ company: company.trim(), role: role.trim(), date, status: 'Applied' }); // Call parent function with trimmed values
    // Reset form fields after submission
    setCompany('');
    setRole('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      {/* Controlled input: value from state, onChange updates state */}
      <input 
        type="text" 
        placeholder="Company" 
        value={company} // Controlled by state
        onChange={(e) => setCompany(e.target.value)} // Update state on change
        required // HTML5 validation
      />
      <input 
        type="text" 
        placeholder="Role" 
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <input 
        type="date" 
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Application</button>
    </form>
  );
}

export default JobForm;
