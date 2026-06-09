import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import JobPortal from './pages/JobPortal';
import PrepModules from './pages/PrepModules';
import DSAPrep from './pages/DSAPrep';
import CompanyCatalog from './pages/CompanyCatalog';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'jobs':
        return <JobPortal />;
      case 'prep':
        return <PrepModules />;
      case 'dsa':
        return <DSAPrep />;
      case 'companies':
        return <CompanyCatalog />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Panel Area */}
      <main className="main-content">
        {/* Top Header section */}
        <Header currentPage={currentPage} />

        {/* Dynamic Page Router rendering */}
        <div className="page-body-container">
          {renderActivePage()}
        </div>
      </main>
    </div>
  );
}

export default App;
