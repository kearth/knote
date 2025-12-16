import React from 'react';

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div
      className="logo-container"
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0 0 0',
        padding: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, border-radius 0.3s ease',
        height: '60px',
        width: '60px',
        flexShrink: 0,
        backgroundColor: 'transparent',
        borderRadius: '0px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e5e7eb';
        e.currentTarget.style.borderRadius = '8px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderRadius = '0px';
      }}
    >
      <img
        src="/images/logo-white.png"
        width="36"
        height="36"
        alt="logo"
        style={{
          display: 'block'
        }}
      />
    </div>
  );
};

export default Logo;