import React from 'react';
import { 
  Code2, 
  Briefcase, 
  CheckCircle, 
  ArrowUpRight, 
  BookOpen, 
  Calendar,
  Zap,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const Dashboard = ({ setCurrentPage }) => {
  const stats = [
    { title: 'DSA Progress', value: '42 / 120', detail: '35% Completed', icon: Code2, color: 'primary' },
    { title: 'Jobs Applied', value: '8 Applications', detail: '2 In review', icon: Briefcase, color: 'secondary' },
    { title: 'Quiz Accuracy', value: '86%', detail: 'Aptitude & Technical', icon: CheckCircle, color: 'success' },
    { title: 'Interview Invites', value: '2 Scheduled', detail: 'Stripe & Oracle', icon: Calendar, color: 'warning' },
  ];

  const activities = [
    { text: 'Completed "Reverse Linked List" challenge', time: '2 hours ago', type: 'dsa' },
    { text: 'Applied for Full Stack Engineer at Vercel', time: '5 hours ago', type: 'job' },
    { text: 'Scored 90% on Operating Systems Mock Quiz', time: '1 day ago', type: 'prep' },
    { text: 'Mock HR Interview - STAR simulation review', time: '2 days ago', type: 'prep' },
  ];

  const recommendedJobs = [
    { title: 'Frontend Developer', company: 'Stripe', match: '96% Match', salary: '$140k - $160k' },
    { title: 'Software Engineer Intern', company: 'Microsoft', match: '92% Match', salary: 'Competitive' },
    { title: 'Junior React Dev', company: 'Vercel', match: '89% Match', salary: '$95k - $110k' },
  ];

  return (
    <div className="dashboard-view animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="hero-banner glass-card">
        <div className="hero-content">
          <div className="badge badge-primary">✨ FORGE PILOT ACTIVE</div>
          <h2>Accelerate Your Engineering Career</h2>
          <p>Practice coding sheets, simulate real interviews, study syllabus patterns, and apply directly to matching tech opportunities.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setCurrentPage('dsa')}>
              <Code2 size={16} />
              Solve Daily Challenge
            </button>
            <button className="btn btn-secondary" onClick={() => setCurrentPage('jobs')}>
              Browse Jobs
            </button>
          </div>
        </div>
        <div className="hero-artwork">
          <div className="glow-sphere" />
        </div>
      </div>

      {/* Grid Statistics */}
      <div className="stats-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-title">{stat.title}</span>
                <div className={`stat-icon-wrapper ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-detail">{stat.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Activities and Recommendations */}
      <div className="dashboard-grid">
        {/* Left Column: Recent Activity */}
        <div className="glass-card activity-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <span className="card-subtitle">Keep the momentum going</span>
          </div>
          <div className="activity-list">
            {activities.map((act, idx) => (
              <div key={idx} className="activity-item">
                <div className="activity-dot" />
                <div className="activity-body">
                  <span className="activity-text">{act.text}</span>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="glass-card recommendation-card">
          <div className="card-header">
            <h3>AI Matched Jobs</h3>
            <span className="card-subtitle">Based on your DSA & Prep performance</span>
          </div>
          <div className="reco-list">
            {recommendedJobs.map((job, idx) => (
              <div key={idx} className="reco-item">
                <div className="reco-info">
                  <span className="reco-title">{job.title}</span>
                  <span className="reco-company">{job.company} • {job.salary}</span>
                </div>
                <div className="reco-action">
                  <span className="badge badge-success">{job.match}</span>
                  <button className="icon-btn" onClick={() => setCurrentPage('jobs')}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
