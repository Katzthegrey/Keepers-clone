import React from 'react';
import '../Styles/SidebarStyles.css';
import SidebarNav from './SidebarNav';

const Sidebar = ({ activeView, onViewChange, reminderCount }) => {
  return (
    <div className="sidebar">
      <SidebarNav
        activeView={activeView}
        onViewChange={onViewChange}
        reminderCount={reminderCount}
      />
    </div>
  );
};

export default Sidebar;
