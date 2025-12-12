import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  dataPage?: string;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  dataPage,
  onClick,
  isCollapsed = false
}) => {
  return (
    <div
      className={`nav-item ${active ? 'active' : ''}`}
      data-page={dataPage}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'flex-start' : 'flex-start',
        padding: '10px 12px',
        fontSize: '13px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <span className="nav-icon">
        {icon}
      </span>
      <span style={{
        marginLeft: isCollapsed ? 0 : '12px',
        display: isCollapsed ? 'none' : 'inline'
      }}>{label}</span>
    </div>
  );
};

export default NavItem;