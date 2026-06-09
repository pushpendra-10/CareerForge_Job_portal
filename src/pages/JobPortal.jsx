import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Star, 
  UploadCloud, 
  CheckCircle,
  FileText,
  Building,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const JobPortal = () => {
  const [selectedJobId, setSelectedJobId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');
  
  // Simulated State for Application Process
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [resumeScoring, setResumeScoring] = useState(false);
  const [resumeMatchScore, setResumeMatchScore] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);

  const jobsData = [
    {
      id: 1,
      title: 'Frontend Software Engineer',
      company: 'Stripe',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $160k',
      xp: '2+ Years',
      match: 96,
      skills: ['React', 'TypeScript', 'CSS Grid', 'REST APIs'],
      desc: 'We are looking for a Frontend Engineer to build premium payment checkout experiences. You will collaborate closely with designers and product managers to craft responsive dashboards that load in milliseconds.',
      reqs: [
        'Strong expertise in modern React and TypeScript architecture.',
        'Eye for premium UX design details and micro-animations.',
        'Experience writing robust unit and integration tests.'
      ]
    },
    {
      id: 2,
      title: 'Backend Systems Developer',
      company: 'Vercel',
      location: 'Hybrid (San Francisco)',
      type: 'Full-time',
      salary: '$150k - $180k',
      xp: '3+ Years',
      match: 91,
      skills: ['Node.js', 'Go', 'Serverless', 'Redis'],
      desc: 'Join the edge computing infrastructure team. You will write high-performance APIs and orchestrate deployments that scale to billions of daily requests worldwide.',
      reqs: [
        'Proven history developing scalable distributed systems.',
        'Familiarity with serverless runtimes and content delivery networks (CDNs).',
        'Strong foundation in Operating Systems and computer network protocols.'
      ]
    },
    {
      id: 3,
      title: 'Software Engineer Intern',
      company: 'Microsoft',
      location: 'On-site (Redmond)',
      type: 'Internship',
      salary: '$40/hour',
      xp: 'University Student',
      match: 87,
      skills: ['C++', 'Data Structures', 'Algorithms', 'SQL'],
      desc: 'Work on developer tools inside Azure Dev Spaces. This role offers heavy mentorship, real project ownership, and path-to-conversion opportunities.',
      reqs: [
        'Currently pursuing a BS/MS in Computer Science or equivalent.',
        'High proficiency in DSA: Trees, Graphs, Sorting, Hash Maps.',
        'Basic database understanding (schemas, queries).'
      ]
    },
    {
      id: 4,
      title: 'Data & Analytics Architect',
      company: 'Snowflake',
      location: 'Remote',
      type: 'Full-time',
      salary: '$160k - $200k',
      xp: '5+ Years',
      match: 76,
      skills: ['Python', 'SQL', 'Snowflake DW', 'Airflow'],
      desc: 'Lead the design of data storage models for enterprise business intelligence platforms. You will streamline ETL pipelines and run predictive modeling operations.',
      reqs: [
        'Expert-level SQL and query optimization expertise.',
        'Experience managing container environments (Docker, Kubernetes).',
        'Demonstrated history deploying machine learning pipelines.'
      ]
    }
  ];

  // Filters calculation
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === 'All' || 
                        (roleFilter === 'Frontend' && job.title.includes('Frontend')) ||
                        (roleFilter === 'Backend' && job.title.includes('Backend')) ||
                        (roleFilter === 'Intern' && job.type === 'Internship') ||
                        (roleFilter === 'Data' && job.title.includes('Data'));
    const matchesLoc = locFilter === 'All' || job.location.includes(locFilter);
    return matchesSearch && matchesRole && matchesLoc;
  });

  const selectedJob = jobsData.find(j => j.id === selectedJobId) || jobsData[0];

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeUploaded(false);
      setResumeName(file.name);
      setResumeScoring(true);
      
      // Simulate parser delay
      setTimeout(() => {
        setResumeScoring(false);
        setResumeUploaded(true);
        // Generate a matching score
        const score = Math.floor(Math.random() * 20) + 78; // 78 to 97
        setResumeMatchScore(score);
      }, 2000);
    }
  };

  const executeApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setAppliedJobs(prev => new Set([...prev, selectedJob.id]));
      setShowApplyModal(false);
    }, 1500);
  };

  return (
    <div className="job-portal-view animate-fade-in">
      
      {/* Search and Filters Strip */}
      <div className="filters-strip glass-card">
        <div className="filter-search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search roles, companies, or tech..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="selects-row">
          <select className="form-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Frontend">Frontend Dev</option>
            <option value="Backend">Backend Dev</option>
            <option value="Data">Data & Analytics</option>
            <option value="Intern">Internships</option>
          </select>

          <select className="form-select" value={locFilter} onChange={(e) => setLocFilter(e.target.value)}>
            <option value="All">All Locations</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Main Panel Layout */}
      <div className="portal-grid">
        
        {/* Left Side: Job Cards List */}
        <div className="jobs-list-panel">
          {filteredJobs.length === 0 ? (
            <div className="glass-card empty-state">
              <Building size={32} className="empty-icon" />
              <p>No jobs match your query.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => setSelectedJobId(job.id)}
                className={`job-card glass-card ${selectedJobId === job.id ? 'active' : ''}`}
              >
                <div className="job-card-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <span className="job-company">{job.company}</span>
                  </div>
                  <span className="badge badge-primary">{job.match}% Match</span>
                </div>
                
                <div className="job-card-meta">
                  <span className="meta-item"><MapPin size={14} /> {job.location}</span>
                  <span className="meta-item"><DollarSign size={14} /> {job.salary}</span>
                </div>

                <div className="skills-row">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>

                {appliedJobs.has(job.id) && (
                  <div className="applied-banner">
                    <CheckCircle size={14} /> Applied
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Side: Detailed View */}
        <div className="job-details-panel">
          {selectedJob && (
            <div className="glass-card details-card">
              <div className="details-header">
                <div>
                  <div className="details-company-strip">
                    <Building size={16} />
                    <span>{selectedJob.company}</span>
                  </div>
                  <h2>{selectedJob.title}</h2>
                </div>
                
                {/* Match Indicator Circle */}
                <div className="match-indicator-container">
                  <div className="match-radial">
                    <span className="match-num">{selectedJob.match}%</span>
                    <span className="match-label">Match</span>
                  </div>
                </div>
              </div>

              {/* Meta information tags */}
              <div className="details-meta-grid">
                <div className="details-meta-card">
                  <MapPin size={16} />
                  <div>
                    <span className="dm-lbl">Location</span>
                    <span className="dm-val">{selectedJob.location}</span>
                  </div>
                </div>
                <div className="details-meta-card">
                  <DollarSign size={16} />
                  <div>
                    <span className="dm-lbl">Salary Range</span>
                    <span className="dm-val">{selectedJob.salary}</span>
                  </div>
                </div>
                <div className="details-meta-card">
                  <Briefcase size={16} />
                  <div>
                    <span className="dm-lbl">Experience</span>
                    <span className="dm-val">{selectedJob.xp}</span>
                  </div>
                </div>
              </div>

              {/* Resume Parser Sandbox */}
              <div className="resume-analyzer-box">
                <div className="ra-header">
                  <Sparkles size={16} className="sparkle-icon" />
                  <h4>Simulated Resume ATS Match Scorer</h4>
                </div>
                <p className="ra-desc">Upload your resume to check how well your experience matches this job description using our mock ATS algorithm.</p>
                
                <div className="upload-zone">
                  <input 
                    type="file" 
                    id="resume-file" 
                    onChange={handleResumeUpload} 
                    className="hidden-file-input"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="resume-file" className="upload-label">
                    <UploadCloud size={24} className="upload-icon" />
                    <span>{resumeName ? resumeName : 'Click to upload Resume (PDF, DOCX)'}</span>
                  </label>
                </div>

                {resumeScoring && (
                  <div className="scanner-progress">
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill animate-pulse" style={{ width: '60%' }} />
                    </div>
                    <span>Parsing and analyzing resume elements...</span>
                  </div>
                )}

                {resumeUploaded && resumeMatchScore && (
                  <div className="score-reveal-panel">
                    <div className="score-row">
                      <span className="score-tag">Your Profile Match: <strong>{resumeMatchScore}%</strong></span>
                      <span className="badge badge-success">READY TO APPLY</span>
                    </div>
                    <ul className="suggestions-list">
                      <li>✓ Matching keywords found: {selectedJob.skills.slice(0, 2).join(', ')}</li>
                      <li>💡 Tip: Explicitly add <strong>{selectedJob.skills[selectedJob.skills.length - 1]}</strong> to your project details to hit 95%+ match.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Job Body Details */}
              <div className="details-body">
                <h3>About the Role</h3>
                <p>{selectedJob.desc}</p>
                
                <h3>Requirements</h3>
                <ul>
                  {selectedJob.reqs.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="details-footer">
                {appliedJobs.has(selectedJob.id) ? (
                  <button className="btn btn-secondary" disabled style={{ width: '100%', cursor: 'not-allowed' }}>
                    <CheckCircle size={16} /> Application Submitted
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => setShowApplyModal(true)} style={{ width: '100%' }}>
                    Apply for this Job <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Wizard Modal */}
      {showApplyModal && (
        <div className="modal-backdrop">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h3>Apply to {selectedJob.company}</h3>
              <span className="modal-subtitle">Role: {selectedJob.title}</span>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-input" defaultValue="Pushpendra Pal" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-input" defaultValue="pushpendra@example.com" />
              </div>
              <div className="form-group">
                <label>AI-Generated Cover Letter (Click to preview)</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  defaultValue={`Dear Hiring Team at ${selectedJob.company},\n\nI am thrilled to express my interest in the ${selectedJob.title} role. With solid coding abilities in ${selectedJob.skills.slice(0, 3).join(', ')} and a passionate focus on crafting optimized products, I am confident I will integrate perfectly into your team...`}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowApplyModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={executeApply} disabled={applying}>
                {applying ? 'Sending application...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;
