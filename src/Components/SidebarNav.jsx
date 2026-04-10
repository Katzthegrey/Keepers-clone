import React from 'react';

const SidebarNav = ({ activeView, onViewChange, reminderCount }) => {
  const reminderBadge =
    reminderCount > 0 ? (reminderCount > 99 ? '99+' : String(reminderCount)) : null;

  const items = [
    {
      id: 'notes',
      icon: 'lightbulb',
      label: 'Notes',
      badge: null,
      selectable: true,
    },
    {
      id: 'reminders',
      icon: 'notifications',
      label: 'Reminders',
      badge: reminderBadge,
      selectable: true,
    },
    { id: 'labels', icon: 'edit', label: 'Edit labels', badge: null, selectable: false },
    { id: 'archive', icon: 'archive', label: 'Archive', badge: null, selectable: false },
    { id: 'bin', icon: 'delete', label: 'Bin', badge: null, selectable: false },
  ];

  return (
    <>
      {items.map((item) => {
        const isActive = activeView === item.id;

        return (
          <div
            key={item.id}
            className={`sidebar-item${isActive ? ' sidebar-active' : ''}`}
            role={item.selectable ? 'button' : undefined}
            tabIndex={item.selectable ? 0 : undefined}
            onClick={() => {
              if (item.selectable) onViewChange(item.id);
            }}
            onKeyDown={(e) => {
              if (!item.selectable) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewChange(item.id);
              }
            }}
          >
            <span className="sidebar-item-icon-wrap">
              <span className={`material-icons-outlined hover${isActive ? ' active' : ''}`}>
                {item.icon}
              </span>
              {item.badge ? (
                <span className="sidebar-item-badge" aria-label={`${reminderCount} reminders`}>
                  {item.badge}
                </span>
              ) : null}
            </span>
            <span className="sidebar-item-text">{item.label}</span>
          </div>
        );
      })}
    </>
  );
};

export default SidebarNav;
