import React from 'react';
import { 
  Bell, 
  Search, 
  Flame, 
  Award,
  Sparkles
} from 'lucide-react';

const Header = ({ currentPage }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard Overview';
      case 'jobs': return 'Job Portal';
      case 'prep': return 'Preparation Hub';
      case 'dsa': return 'DSA Practice sheet';
      case 'companies': return 'Company hiring guides';
      default: return 'CareerForge';
    }
  };

  return (
    <header className="main-header glass-card">
      <div className="header-left">
        <div className="breadcrumb">
          <span className="bc-parent">Portal</span>
          <span className="bc-separator">/</span>
          <span className="bc-child">{getPageTitle()}</span>
        </div>
        <h1 className="header-title">{getPageTitle()}</h1>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search resources, jobs..." className="search-input" />
        </div>

        {/* Streak Counter */}
        <div className="streak-badge" title="Daily coding streak">
          <Flame size={18} className="streak-icon animate-pulse" />
          <span className="streak-count">5 Days</span>
        </div>

        {/* Notification Bell */}
        <button className="icon-btn notification-btn" title="Notifications">
          <Bell size={20} />
          <span className="noti-dot" />
        </button>

        {/* Pro status */}
        <div className="premium-tag">
          <Sparkles size={14} />
          <span>Forge Pro</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
