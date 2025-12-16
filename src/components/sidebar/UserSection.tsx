import React from 'react';

interface UserSectionProps {
  userName: string;
  avatarUrl?: string;
  onToggleSidebar: () => void;
  isCollapsed?: boolean;
}

const UserSection: React.FC<UserSectionProps> = ({
  userName,
  avatarUrl,
  onToggleSidebar,
  isCollapsed = false
}) => {
  return (
    <div className="user-section" style={{
      display: isCollapsed ? 'flex' : 'flex',
      flexDirection: isCollapsed ? 'column' : 'row',
      alignItems: isCollapsed ? 'center' : 'center',
      justifyContent: isCollapsed ? 'center' : 'space-between',
      padding: isCollapsed ? '10px 0' : '10px'
    }}>
      {!isCollapsed && (
        <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="user-avatar" style={{ marginRight: '10px' }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            ) : (
              <div className="default-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2d3748', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-name" style={{ fontSize: '14px', fontWeight: '500' }}>{userName}</div>
        </div>
      )}
      {isCollapsed && (
        <div className="user-avatar" style={{ marginBottom: '10px' }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
          ) : (
            <div className="default-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2d3748', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}
      <div className="sidebar-toggle" onClick={onToggleSidebar} style={{ cursor: 'pointer' }}>
        {/* 根据侧边栏状态显示不同的箭头图标 */}
        {!isCollapsed ? (
          // 展开状态显示 << 图标
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
          </svg>
        ) : (
          // 收起状态显示 >> 图标
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default UserSection;