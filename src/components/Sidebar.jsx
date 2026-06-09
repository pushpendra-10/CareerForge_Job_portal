import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  Code2, 
  Building2, 
  Sparkles,
  Trophy
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', name: 'Job Portal', icon: Briefcase },
    { id: 'prep', name: 'Prep Modules', icon: BookOpen },
    { id: 'dsa', name: 'DSA Sheets', icon: Code2 },
    { id: 'companies', name: 'Company Hub', icon: Building2 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Sparkles className="logo-spark" />
        </div>
        <span className="brand-text">CareerForge</span>
      </div>

      <div className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.name}</span>
              {isActive && <div className="active-indicator" />}
            </button>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile-badge">
          <div className="user-avatar">
            <Trophy size={16} className="avatar-icon" />
          </div>
          <div className="user-info">
            <span className="user-name">Pro Member</span>
            <span className="user-xp">1,240 XP</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
