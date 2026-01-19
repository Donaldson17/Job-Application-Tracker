# Job Application Tracker

A web application that helps job seekers organize and track their applications with visual status indicators. Includes search functionality and automatic data saving across browser sessions. **Tech: React, JavaScript, HTML, CSS**

## Features
- Add job applications (company, role, date)
- Update status (Applied, Interview, Offer, Rejected)
- Filter applications by status
- Delete entries
- Data persists in localStorage

## Setup
```bash
npm install
npm start
```

## Key Interview Points

### State Management
- **useState**: Manages jobs array and filter state
- **useEffect**: Syncs data with localStorage on mount and updates

### Component Structure
- **App.js**: Main component with state and CRUD logic
- **JobForm.js**: Controlled form inputs for adding jobs
- **JobList.js**: Maps through filtered jobs
- **JobItem.js**: Individual job card with update/delete actions

### CRUD Operations
- **Create**: addJob adds new entry with unique ID
- **Read**: filteredJobs computed from jobs and filter
- **Update**: updateStatus modifies job status
- **Delete**: deleteJob removes entry by ID

### LocalStorage
- Load data on mount (first useEffect)
- Save data whenever jobs change (second useEffect)
- Data persists across browser sessions
