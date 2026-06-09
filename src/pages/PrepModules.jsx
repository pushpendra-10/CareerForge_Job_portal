import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  HelpCircle, 
  BookOpen, 
  UserCheck, 
  Award, 
  Check, 
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

const PrepModules = () => {
  const [activeSubTab, setActiveSubTab] = useState('aptitude');

  // Aptitude Quiz State
  const [aptQuizStarted, setAptQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [aptAnswers, setAptAnswers] = useState({});
  const [aptSubmitted, setAptSubmitted] = useState(false);
  const [aptScore, setAptScore] = useState(0);

  // Technical State
  const [activeSubject, setActiveSubject] = useState('dbms');
  const [techAnswers, setTechAnswers] = useState({});
  const [techSubmitted, setTechSubmitted] = useState(false);
  const [techScore, setTechScore] = useState(0);

  // HR Simulator State
  const [hrQuestionIndex, setHrQuestionIndex] = useState(0);
  const [hrResponse, setHrResponse] = useState('');
  const [hrFeedback, setHrFeedback] = useState(null);
  const [analyzingHr, setAnalyzingHr] = useState(false);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (aptQuizStarted && timeLeft > 0 && !aptSubmitted) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !aptSubmitted) {
      handleSubmitApt();
    }
    return () => clearInterval(timer);
  }, [aptQuizStarted, timeLeft, aptSubmitted]);

  // Data Definitions
  const aptitudeQuestions = [
    {
      id: 1,
      q: 'A train 120m long passes a telegraph post in 6 seconds. Find the speed of the train in km/h.',
      options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
      correct: 1, // index 1 (72 km/h)
      explain: 'Speed = Distance / Time = 120 / 6 = 20 m/s. To convert to km/h, multiply by 18/5: 20 * 18/5 = 72 km/h.'
    },
    {
      id: 2,
      q: 'If 15 men can build a wall 100m long in 12 days, how many men will build a 200m wall in 15 days?',
      options: ['20 men', '24 men', '18 men', '30 men'],
      correct: 1, // index 1 (24 men)
      explain: 'Using M1 * D1 / W1 = M2 * D2 / W2 -> 15 * 12 / 100 = M2 * 15 / 200 -> M2 = (15 * 12 * 200) / (100 * 15) = 24 men.'
    },
    {
      id: 3,
      q: 'Find the next number in the series: 4, 9, 20, 43, 90, ...',
      options: ['181', '185', '190', '195'],
      correct: 1, // index 1 (185)
      explain: 'The pattern is: (Previous term * 2) + successive integers starting from 1. 4*2+1=9; 9*2+2=20; 20*2+3=43; 43*2+4=90; 90*2+5=185.'
    }
  ];

  const technicalData = {
    dbms: {
      title: 'Database Management Systems',
      cheats: [
        { topic: 'ACID Properties', desc: 'Atomicity (all or nothing), Consistency (preserves database integrity), Isolation (transactions are independent), Durability (permanent updates).' },
        { topic: 'Normalization Forms', desc: '1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (for every functional dependency X -> Y, X is a superkey).' }
      ],
      questions: [
        {
          id: 1,
          q: 'Which of the following joins returns all rows from the left table, even if there are no matches in the right table?',
          options: ['INNER JOIN', 'RIGHT OUTER JOIN', 'LEFT OUTER JOIN', 'FULL JOIN'],
          correct: 2,
          explain: 'LEFT OUTER JOIN returns all values from the left relation, filling unmatched right attributes with NULL.'
        },
        {
          id: 2,
          q: 'What is the primary purpose of an index in SQL database engines?',
          options: ['To enforce uniqueness', 'To speed up data retrieval queries', 'To minimize disk space usage', 'To secure table data'],
          correct: 1,
          explain: 'Indexes build search-tree schemas (like B+ trees) to speed up SELECT query matching speeds.'
        }
      ]
    },
    os: {
      title: 'Operating Systems',
      cheats: [
        { topic: 'Process vs Thread', desc: 'A Process is an executing instance of a program (owns memory space). A Thread is a lightweight execution unit inside a process (shares memory).' },
        { topic: 'Virtual Memory & Paging', desc: 'Paging maps physical memory frames to logical pages. Thrashing occurs when the system spends more time paging than executing processes.' }
      ],
      questions: [
        {
          id: 1,
          q: 'Which CPU scheduling algorithm is completely free of starvation?',
          options: ['Priority Scheduling', 'Shortest Job First (SJF)', 'Round Robin', 'Multilevel Feedback Queue'],
          correct: 2,
          explain: 'Round Robin ensures every process gets a constant time quantum, guaranteeing periodic CPU allocation.'
        }
      ]
    },
    networks: {
      title: 'Computer Networks',
      cheats: [
        { topic: 'OSI 7 Layers', desc: 'Physical, Data Link, Network (routing), Transport (TCP/UDP ports), Session, Presentation (encryption), Application (HTTP, DNS).' },
        { topic: 'TCP vs UDP', desc: 'TCP is connection-oriented, reliable (handshake), flow-controlled. UDP is connectionless, fast, unreliable (streaming).' }
      ],
      questions: [
        {
          id: 1,
          q: 'Which protocol is responsible for translating domain names (e.g., google.com) into IP addresses?',
          options: ['HTTP', 'DNS', 'DHCP', 'FTP'],
          correct: 1,
          explain: 'DNS (Domain Name System) acts as the phonebook of the internet, mapping domains to IP addresses.'
        }
      ]
    }
  };

  const hrQuestions = [
    {
      q: 'Tell me about a time you had to deal with a challenging team member or conflict during a project.',
      tips: 'Outline: Explain the context, the exact cause of conflict, your calm communication method, and how the project completed successfully.'
    },
    {
      q: 'Describe a significant coding bug or architectural failure you faced, and how you recovered.',
      tips: 'Outline: Outline the root cause analysis, your immediate mitigation steps, the ultimate resolution, and post-mortem safeguards.'
    },
    {
      q: 'Why should we hire you over other candidates for this development position?',
      tips: 'Outline: Highlight your combination of DSA proficiency, project portfolio, hunger to learn, and team alignment.'
    }
  ];

  // Actions
  const handleSelectAptAnswer = (qId, optionIdx) => {
    setAptAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitApt = () => {
    let score = 0;
    aptitudeQuestions.forEach(q => {
      if (aptAnswers[q.id] === q.correct) {
        score++;
      }
    });
    setAptScore(score);
    setAptSubmitted(true);
  };

  const handleRestartApt = () => {
    setAptQuizStarted(false);
    setAptAnswers({});
    setAptSubmitted(false);
    setTimeLeft(120);
  };

  const handleSelectTechAnswer = (qId, optionIdx) => {
    setTechAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitTech = () => {
    let score = 0;
    const questions = technicalData[activeSubject].questions;
    questions.forEach(q => {
      if (techAnswers[q.id] === q.correct) {
        score++;
      }
    });
    setTechScore(score);
    setTechSubmitted(true);
  };

  const handleRestartTech = () => {
    setTechAnswers({});
    setTechSubmitted(false);
  };

  const analyzeHrResponse = () => {
    if (!hrResponse.trim()) return;
    setAnalyzingHr(true);
    setHrFeedback(null);

    // Simulate response analyzer
    setTimeout(() => {
      setAnalyzingHr(false);
      const text = hrResponse.toLowerCase();
      
      // Look for STAR keywords
      const checks = {
        situation: text.includes('situation') || text.includes('project') || text.includes('working on'),
        task: text.includes('task') || text.includes('goal') || text.includes('responsibility') || text.includes('assigned'),
        action: text.includes('action') || text.includes('i did') || text.includes('implemented') || text.includes('resolved'),
        result: text.includes('result') || text.includes('outcome') || text.includes('completed') || text.includes('concluded')
      };

      let starScore = 0;
      Object.values(checks).forEach(v => { if(v) starScore += 25; });

      let rating = 'Needs Improvement';
      if (starScore === 100) rating = 'Excellent STAR Coverage!';
      else if (starScore >= 75) rating = 'Very Good (Partial details missing)';
      else if (starScore >= 50) rating = 'Moderate STAR alignment';

      setHrFeedback({
        score: starScore,
        rating,
        checks,
        tips: starScore < 100 
          ? `Try to explicitly structure your answer with sections showing the Situation, Task, Actions you took, and final quantitative Results.`
          : `Great structure! The answer has clear situational context, individual tasks, concrete steps, and a conclusive outcome.`
      });
    }, 1500);
  };

  return (
    <div className="prep-hub-view animate-fade-in">
      
      {/* Sub-tabs Nav */}
      <div className="sub-tabs glass-card">
        <button 
          onClick={() => setActiveSubTab('aptitude')} 
          className={`sub-tab-btn ${activeSubTab === 'aptitude' ? 'active' : ''}`}
        >
          <BrainCircuit size={18} />
          <span>Aptitude Practice</span>
        </button>
        <button 
          onClick={() => setActiveSubTab('technical')} 
          className={`sub-tab-btn ${activeSubTab === 'technical' ? 'active' : ''}`}
        >
          <BookOpen size={18} />
          <span>Core Technical</span>
        </button>
        <button 
          onClick={() => setActiveSubTab('hr')} 
          className={`sub-tab-btn ${activeSubTab === 'hr' ? 'active' : ''}`}
        >
          <UserCheck size={18} />
          <span>HR STAR Simulator</span>
        </button>
      </div>

      {/* Aptitude Arena */}
      {activeSubTab === 'aptitude' && (
        <div className="aptitude-arena">
          {!aptQuizStarted ? (
            <div className="glass-card quiz-start-card">
              <Award size={48} className="start-icon" />
              <h3>Aptitude Assessment Arena</h3>
              <p>Practice Quantitative, Logical reasoning and Verbal MCQs under a simulated countdown. Perfect for qualifying rounds of major product and service-based companies.</p>
              
              <div className="quiz-rules">
                <div className="rule-item">⏰ <strong>Timer:</strong> 2 Minutes limit</div>
                <div className="rule-item">📝 <strong>Questions:</strong> 3 Challenges</div>
                <div className="rule-item">💡 <strong>Feedback:</strong> Explanations revealed on submission</div>
              </div>

              <button className="btn btn-primary" onClick={() => setAptQuizStarted(true)}>
                Start Assessment Now
              </button>
            </div>
          ) : (
            <div className="quiz-running-panel">
              <div className="quiz-running-header glass-card">
                <div className="timer-badge">
                  <Clock size={16} />
                  <span>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
                {!aptSubmitted ? (
                  <button className="btn btn-accent" onClick={handleSubmitApt}>Submit Quiz</button>
                ) : (
                  <button className="btn btn-secondary" onClick={handleRestartApt}>
                    <RefreshCw size={14} /> Restart Quiz
                  </button>
                )}
              </div>

              <div className="questions-list">
                {aptitudeQuestions.map((question, qIdx) => {
                  const selectedOpt = aptAnswers[question.id];
                  const isCorrect = selectedOpt === question.correct;
                  return (
                    <div key={question.id} className="glass-card question-box">
                      <div className="q-head">
                        <span className="q-number">Q{qIdx + 1}</span>
                        <p>{question.q}</p>
                      </div>

                      <div className="options-grid">
                        {question.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            disabled={aptSubmitted}
                            onClick={() => handleSelectAptAnswer(question.id, optIdx)}
                            className={`option-btn ${selectedOpt === optIdx ? 'selected' : ''} ${
                              aptSubmitted && optIdx === question.correct ? 'correct-highlight' : ''
                            } ${
                              aptSubmitted && selectedOpt === optIdx && !isCorrect ? 'wrong-highlight' : ''
                            }`}
                          >
                            <span className="opt-marker">{String.fromCharCode(65 + optIdx)}</span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>

                      {aptSubmitted && (
                        <div className="explanation-panel">
                          <h5>
                            {isCorrect ? (
                              <span className="text-success">✓ Correct Answer</span>
                            ) : (
                              <span className="text-danger">✗ Incorrect (Selected {String.fromCharCode(65 + selectedOpt)})</span>
                            )}
                          </h5>
                          <p>{question.explain}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {aptSubmitted && (
                <div className="glass-card quiz-result-summary">
                  <h4>Assessment Scorecard</h4>
                  <div className="result-score">
                    <span className="score-num">{aptScore}</span>
                    <span className="score-den">/ {aptitudeQuestions.length} Correct</span>
                  </div>
                  <p>
                    {aptScore === aptitudeQuestions.length 
                      ? 'Master Class! Excellent logical aptitude.' 
                      : 'Good effort! Study the explanations below to refine calculations.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Core Technical */}
      {activeSubTab === 'technical' && (
        <div className="technical-hub">
          <div className="tech-layout-grid">
            
            {/* Sidebar list of subjects */}
            <div className="tech-subjects-nav">
              {Object.keys(technicalData).map(subjKey => (
                <button
                  key={subjKey}
                  onClick={() => {
                    setActiveSubject(subjKey);
                    handleRestartTech();
                  }}
                  className={`tech-subj-btn glass-card ${activeSubject === subjKey ? 'active' : ''}`}
                >
                  <h4>{technicalData[subjKey].title}</h4>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>

            {/* Subject content view */}
            <div className="tech-content-view">
              <div className="glass-card tech-cheatsheet-card">
                <h3>Core Concepts Cheat Sheet</h3>
                <p className="margin-b-16">Quick reference topics commonly targeted in screening rounds.</p>
                
                <div className="cheat-topics-grid">
                  {technicalData[activeSubject].cheats.map((cheat, i) => (
                    <div key={i} className="cheat-item">
                      <strong>{cheat.topic}</strong>
                      <p>{cheat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Subject MCQs */}
              <div className="tech-quiz-arena">
                <div className="tq-header">
                  <h3>Interactive Sub-Topic Quiz</h3>
                  {!techSubmitted ? (
                    <button className="btn btn-primary btn-sm" onClick={handleSubmitTech}>Grade MCQ Answers</button>
                  ) : (
                    <button className="btn btn-secondary btn-sm" onClick={handleRestartTech}>
                      <RefreshCw size={12} /> Redo Subject Quiz
                    </button>
                  )}
                </div>

                <div className="questions-list">
                  {technicalData[activeSubject].questions.map((question, qIdx) => {
                    const selectedOpt = techAnswers[question.id];
                    const isCorrect = selectedOpt === question.correct;
                    return (
                      <div key={question.id} className="glass-card question-box">
                        <div className="q-head">
                          <span className="q-number">Q{qIdx + 1}</span>
                          <p>{question.q}</p>
                        </div>

                        <div className="options-grid">
                          {question.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              disabled={techSubmitted}
                              onClick={() => handleSelectTechAnswer(question.id, optIdx)}
                              className={`option-btn ${selectedOpt === optIdx ? 'selected' : ''} ${
                                techSubmitted && optIdx === question.correct ? 'correct-highlight' : ''
                              } ${
                                techSubmitted && selectedOpt === optIdx && !isCorrect ? 'wrong-highlight' : ''
                              }`}
                            >
                              <span className="opt-marker">{String.fromCharCode(65 + optIdx)}</span>
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>

                        {techSubmitted && (
                          <div className="explanation-panel">
                            <h5>{isCorrect ? '✓ Correct' : '✗ Explanation'}</h5>
                            <p>{question.explain}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {techSubmitted && (
                  <div className="glass-card quiz-result-summary">
                    <h4>Technical Score: {techScore} / {technicalData[activeSubject].questions.length}</h4>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* HR STAR Simulator */}
      {activeSubTab === 'hr' && (
        <div className="hr-simulator-section glass-card">
          <div className="hr-layout-split">
            
            {/* Instructions on STAR framework */}
            <div className="hr-instructions">
              <div className="star-title-row">
                <Sparkles size={20} className="sparkle-icon" />
                <h3>The STAR Method Framework</h3>
              </div>
              <p>Ace your behavioral rounds by structuring responses into distinct narrative chapters:</p>
              
              <div className="star-steps">
                <div className="star-step">
                  <span className="step-char">S</span>
                  <div>
                    <strong>Situation:</strong>
                    <span className="step-desc">Establish the background, context, project parameters, or team setup.</span>
                  </div>
                </div>
                <div className="star-step">
                  <span className="step-char">T</span>
                  <div>
                    <strong>Task:</strong>
                    <span className="step-desc">Specify the clear challenges, issues, or deadlines you had to resolve.</span>
                  </div>
                </div>
                <div className="star-step">
                  <span className="step-char">A</span>
                  <div>
                    <strong>Action:</strong>
                    <span className="step-desc">Elaborate on the specific steps YOU took (code fixes, conversations, architectures).</span>
                  </div>
                </div>
                <div className="star-step">
                  <span className="step-char">R</span>
                  <div>
                    <strong>Result:</strong>
                    <span className="step-desc">Provide the concrete achievements, quantitative results, and takeaways.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive simulator dashboard */}
            <div className="hr-interactive-playground">
              <div className="question-navigation-row">
                <span>Behavioral Question {hrQuestionIndex + 1} of {hrQuestions.length}</span>
                <div className="qn-arrows">
                  <button 
                    disabled={hrQuestionIndex === 0} 
                    onClick={() => { setHrQuestionIndex(prev => prev - 1); setHrResponse(''); setHrFeedback(null); }}
                  >
                    Back
                  </button>
                  <button 
                    disabled={hrQuestionIndex === hrQuestions.length - 1} 
                    onClick={() => { setHrQuestionIndex(prev => prev + 1); setHrResponse(''); setHrFeedback(null); }}
                  >
                    Next Question
                  </button>
                </div>
              </div>

              <div className="hr-question-display">
                <h4>"{hrQuestions[hrQuestionIndex].q}"</h4>
                <div className="hr-tips-box">
                  <AlertTriangle size={14} />
                  <span>{hrQuestions[hrQuestionIndex].tips}</span>
                </div>
              </div>

              <div className="hr-textarea-box">
                <label>Write your behavioral response here:</label>
                <textarea 
                  className="form-textarea" 
                  rows={6} 
                  placeholder="In my previous project, we were developing a web app... The task was... I decided to... As a result, performance increased by..."
                  value={hrResponse}
                  onChange={(e) => setHrResponse(e.target.value)}
                />
              </div>

              <div className="hr-action-row">
                <button 
                  className="btn btn-primary" 
                  onClick={analyzeHrResponse}
                  disabled={analyzingHr || !hrResponse.trim()}
                >
                  {analyzingHr ? 'Running NLP Analyzer...' : 'Grade response (STAR Metrics)'}
                </button>
              </div>

              {hrFeedback && (
                <div className="hr-feedback-card glass-card">
                  <div className="hrc-score-row">
                    <span>Grader Match: <strong>{hrFeedback.score}%</strong></span>
                    <span className="badge badge-primary">{hrFeedback.rating}</span>
                  </div>
                  
                  <div className="star-checklist">
                    <div className={`checklist-item ${hrFeedback.checks.situation ? 'checked' : ''}`}>
                      <Check size={14} /> Situation context parsed
                    </div>
                    <div className={`checklist-item ${hrFeedback.checks.task ? 'checked' : ''}`}>
                      <Check size={14} /> Task/goal statement parsed
                    </div>
                    <div className={`checklist-item ${hrFeedback.checks.action ? 'checked' : ''}`}>
                      <Check size={14} /> Actions taken parsed
                    </div>
                    <div className={`checklist-item ${hrFeedback.checks.result ? 'checked' : ''}`}>
                      <Check size={14} /> Quantitative results parsed
                    </div>
                  </div>

                  <p className="hr-feedback-text">
                    {hrFeedback.tips}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PrepModules;
