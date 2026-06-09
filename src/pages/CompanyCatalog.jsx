import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  DollarSign, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle,
  HelpCircle,
  Briefcase
} from 'lucide-react';

const CompanyCatalog = () => {
  const [activeTier, setActiveTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(1);

  const companiesData = [
    {
      id: 1,
      name: 'Google',
      tier: 'Product Giant',
      hq: 'Mountain View, CA',
      packages: '$150k - $220k (In India: ₹25L - ₹55L)',
      eligibility: {
        cgpa: '7.5+ CGPA or equivalent',
        degree: 'B.Tech/M.Tech/MCA/MS in Computer Science or related fields',
        backlogs: 'Zero active backlogs'
      },
      examPattern: [
        { round: 'Online Assessment', duration: '90 Mins', details: '2 DSA coding questions (Medium-Hard level)' },
        { round: 'Technical Interview 1', duration: '45 Mins', details: 'Heavy focus on Algorithms, Graph traversal & Complexity' },
        { round: 'Technical Interview 2', duration: '45 Mins', details: 'Tree traversals, Dynamic programming optimization' },
        { round: 'Googleyness & Leadership', duration: '45 Mins', details: 'Behavioral, culture fit, situational leadership scenarios' }
      ],
      syllabus: ['Advanced Graphs (DFS, BFS, Dijkstra, MST)', 'Dynamic Programming (Knapsack, Grid paths)', 'Tries & Segment Trees', 'System Design (for Senior roles)'],
      prepTips: 'Focus heavily on code efficiency (Time and Space complexity). Write clean, readable code and verbalize your thought process throughout the interviews.'
    },
    {
      id: 2,
      name: 'Amazon',
      tier: 'Product Giant',
      hq: 'Seattle, WA',
      packages: '$130k - $180k (In India: ₹18L - ₹40L)',
      eligibility: {
        cgpa: '6.5+ CGPA',
        degree: 'BE / B.Tech / ME / M.Tech / MCA',
        backlogs: 'No active backlogs'
      },
      examPattern: [
        { round: 'Online Test (OA)', duration: '120 Mins', details: '2 Coding challenges + Amazon Leadership Principles quiz' },
        { round: 'Technical Round 1', duration: '60 Mins', details: 'DSA coding question + 15 mins on Leadership Principles' },
        { round: 'Technical Round 2', duration: '60 Mins', details: 'System Design / LLD + Leadership Principles' },
        { round: 'Bar Raiser Round', duration: '60 Mins', details: 'Deep dive behavioral assessment & complex systems overview' }
      ],
      syllabus: ['Trees & Binary Search Trees', 'Heaps & Priority Queues', 'Sliding Window & Hash Maps', 'System Design (LLD / OOD patterns)'],
      prepTips: 'Amazon places equal weight on Leadership Principles. Align all behavioral answers to principles like Customer Obsession and Bias for Action.'
    },
    {
      id: 3,
      name: 'TCS (Tata Consultancy Services)',
      tier: 'Service Leader',
      hq: 'Mumbai, India',
      packages: '₹3.6L (Ninja) - ₹7.0L (Digital) - ₹9.0L (Prime)',
      eligibility: {
        cgpa: '60% or 6.0+ CGPA throughout (10th, 12th, Graduation)',
        degree: 'B.Tech / B.E / M.Tech / M.E / MCA / M.Sc',
        backlogs: 'Max 1 active backlog permitted at testing time'
      },
      examPattern: [
        { round: 'TCS NQT (National Qualifier)', duration: '180 Mins', details: 'Section A: Cognitive (Aptitude, Verbal). Section B: Coding (1 Easy, 1 Medium)' },
        { round: 'Technical Interview', duration: '30 Mins', details: 'Questions on OOPs, DBMS concepts, SQL, and final year projects' },
        { round: 'Managerial & HR Round', duration: '20 Mins', details: 'Background review, shift availability, and relocation questions' }
      ],
      syllabus: ['Quantitative Aptitude (Time & Work, Percentages)', 'Logical Reasoning (Coding-Decoding, Series)', 'Core Programming (C/Java/Python basics)', 'DBMS (SQL Keys, Joins)'],
      prepTips: 'Qualifying NQT Cognitive section is key. Practice mock aptitude papers and make sure you can explain your academic projects clearly.'
    },
    {
      id: 4,
      name: 'Infosys',
      tier: 'Service Leader',
      hq: 'Bengaluru, India',
      packages: '₹3.6L (System Engineer) - ₹6.2L (DSE) - ₹9.5L (Power Programmer)',
      eligibility: {
        cgpa: '60% or 6.0+ CGPA in 10th, 12th & Graduation',
        degree: 'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc',
        backlogs: 'Zero active backlogs allowed'
      },
      examPattern: [
        { round: 'Infosys Certification / InfyTQ', duration: '150 Mins', details: 'MCQs on DBMS & Python/Java + 2 Coding Problems' },
        { round: 'Technical Interview', duration: '30 Mins', details: 'Coding walkthrough, OOPs structures, and basic SDLC models' },
        { round: 'HR Interview', duration: '15 Mins', details: 'Communication validation, basic behavioral checks' }
      ],
      syllabus: ['Data Structures (Arrays, Strings, Linked Lists)', 'Database schemas & Normalization', 'Object-Oriented Programming (Polymorphism, Inheritance)', 'Aptitude Reasoning'],
      prepTips: 'Perform well in InfyTQ coding to skip directly to niche interviews like Power Programmer roles (₹9.5 LPA).'
    }
  ];

  // Filtering
  const filteredCompanies = companiesData.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.syllabus.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTier = activeTier === 'All' || comp.tier.includes(activeTier);
    return matchesSearch && matchesTier;
  });

  const selectedCompany = companiesData.find(c => c.id === selectedCompanyId) || companiesData[0];

  return (
    <div className="company-catalog-view animate-fade-in">
      
      {/* Search Bar + Tier Selection */}
      <div className="filters-strip glass-card">
        <div className="filter-search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search company or exam syllabus..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="selects-row">
          <button 
            className={`btn btn-sm ${activeTier === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTier('All')}
          >
            All Tiers
          </button>
          <button 
            className={`btn btn-sm ${activeTier === 'Product' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTier('Product')}
          >
            Product Scale
          </button>
          <button 
            className={`btn btn-sm ${activeTier === 'Service' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTier('Service')}
          >
            Service Leaders
          </button>
        </div>
      </div>

      {/* Grid split */}
      <div className="portal-grid">
        
        {/* Left side list */}
        <div className="jobs-list-panel">
          {filteredCompanies.map(comp => (
            <div 
              key={comp.id}
              onClick={() => setSelectedCompanyId(comp.id)}
              className={`job-card glass-card ${selectedCompanyId === comp.id ? 'active' : ''}`}
            >
              <div className="job-card-header">
                <div>
                  <h3 className="job-title">{comp.name}</h3>
                  <span className="job-company">{comp.hq}</span>
                </div>
                <span className="badge badge-info">{comp.tier}</span>
              </div>
              <div className="job-card-meta">
                <span className="meta-item">
                  <DollarSign size={14} /> {comp.packages}
                </span>
              </div>
              <div className="skills-row">
                {comp.syllabus.slice(0, 2).map((s, idx) => (
                  <span key={idx} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side info details */}
        <div className="job-details-panel">
          {selectedCompany && (
            <div className="glass-card details-card">
              
              <div className="details-header">
                <div>
                  <div className="details-company-strip">
                    <Building2 size={16} />
                    <span>{selectedCompany.tier}</span>
                  </div>
                  <h2>{selectedCompany.name} Recruitment Hub</h2>
                </div>
              </div>

              {/* Package tag */}
              <div className="details-meta-grid">
                <div className="details-meta-card" style={{ gridColumn: 'span 3' }}>
                  <DollarSign size={18} />
                  <div>
                    <span className="dm-lbl">Compensation Package Range</span>
                    <span className="dm-val" style={{ fontSize: '1.05rem', color: '#ffffff' }}>
                      {selectedCompany.packages}
                    </span>
                  </div>
                </div>
              </div>

              {/* Eligibility Section */}
              <div className="details-body">
                <div className="flex-title-row">
                  <GraduationCap size={18} className="text-primary" />
                  <h3>Eligibility Criteria</h3>
                </div>
                
                <div className="eligibility-details-box glass-card" style={{ padding: '16px', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', margin: '10px 0 20px 0' }}>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li>🎓 <strong>Degree:</strong> {selectedCompany.eligibility.degree}</li>
                    <li>📈 <strong>Min Cutoff:</strong> {selectedCompany.eligibility.cgpa}</li>
                    <li>⚠️ <strong>Backlogs rule:</strong> {selectedCompany.eligibility.backlogs}</li>
                  </ul>
                </div>

                {/* Exam Pattern timeline */}
                <div className="flex-title-row">
                  <Clock size={18} className="text-secondary" />
                  <h3>Exam Pattern & Selection Rounds</h3>
                </div>
                
                <div className="exam-rounds-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '16px 0 24px 0' }}>
                  {selectedCompany.examPattern.map((patt, idx) => (
                    <div key={idx} className="timeline-node glass-card" style={{ padding: '14px 20px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <strong>Round {idx + 1}: {patt.round}</strong>
                        <span className="badge badge-warning">{patt.duration}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem' }}>{patt.details}</p>
                    </div>
                  ))}
                </div>

                {/* Syllabus breakdown */}
                <div className="flex-title-row">
                  <BookOpen size={18} className="text-info" />
                  <h3>Focus Areas / Syllabus</h3>
                </div>
                <div className="skills-row" style={{ margin: '12px 0 24px 0' }}>
                  {selectedCompany.syllabus.map((topic, i) => (
                    <span key={i} className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Prep Tips banner */}
                <div className="hr-tips-box" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '16px', borderRadius: '8px' }}>
                  <Award size={18} className="text-warning" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', color: '#ffffff' }}>Insider Preparation Strategy</strong>
                    <p style={{ fontSize: '0.85rem' }}>{selectedCompany.prepTips}</p>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default CompanyCatalog;
