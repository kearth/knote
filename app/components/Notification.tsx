import React from 'react';

interface NotificationProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="notification" id="notification">
      <div className="notification-content">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>{message}</span>
        <button className="notification-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;