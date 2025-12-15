import React, { useState } from 'react';
import SearchContainer from './sidebar/SearchContainer';
import NavItem from './sidebar/NavItem';
import RecentItem from './sidebar/RecentItem';
import CollapsibleSection from './sidebar/CollapsibleSection';
import UserSection from './sidebar/UserSection';

// 本地定义接口，避免导入导出问题
interface RecentItemData {
  title: string;
  time: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleSidebar }) => {

  // 更新后的项目内容
  const projectItems: RecentItemData[] = [
    { title: "项目一", time: "2024-01-15" },
    { title: "项目二", time: "2024-01-14" },
    { title: "项目三", time: "2024-01-13" },
    { title: "项目四", time: "2024-01-12" },
    { title: "项目五", time: "2024-01-11" }
  ];

  // 更新后的置顶内容
  const pinnedItems: RecentItemData[] = [
    { title: "设计皇帝背景文字游戏指南", time: "2024-01-15" },
    { title: "Material Design 3 Icons Analysis", time: "2024-01-14" }
  ];

  // 更新后的历史内容
  const historyItems: RecentItemData[] = [
    { title: "Material Design 3 Icons Analysis", time: "2024-01-15" },
    { title: "knote logo and futuristic avatar", time: "2024-01-14" },
    { title: "道教符箓网页游戏界面设计", time: "2024-01-13" },
    { title: "科举功名与德财关系表格", time: "2024-01-12" },
    { title: "清光绪升官图：流程与讽刺", time: "2024-01-11" },
    { title: "古代官员选拔制度的演变", time: "2024-01-10" },
    { title: "明清两代科举考试内容对比", time: "2024-01-09" },
    { title: "汉代察举制的利弊分析", time: "2024-01-08" },
    { title: "唐代科举制的创立与发展", time: "2024-01-07" },
    { title: "宋代科举制度的完善与影响", time: "2024-01-06" }
  ];

  // State for collapsed sections
  const [collapsed, setCollapsed] = useState({
    projects: true,
    pinned: false,
    history: false
  });

  const toggleSection = (section: keyof typeof collapsed) => {
    setCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: isCollapsed ? '60px' : '250px', transition: 'width 0.3s ease', borderRight: '1px solid #e2e8f0' }}>
      <div className="sidebar-header" style={{ display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-start', alignItems: 'center', padding: isCollapsed ? '40px 0px 10px 0px' : '40px 0px 10px 15px' }}>
        <div className="logo">
          <img src="/images/logo-white.png" width="36" height="36" alt="logo" style={{ display: 'block' }} />
        </div>
      </div>

      <nav className="nav-section" style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', padding: isCollapsed ? '0px' : '0px 10px' }}>
        <SearchContainer placeholder="搜索..." isCollapsed={isCollapsed} />

        <NavItem
          icon={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
              <path d="M10 4V4C8.13623 4 7.20435 4 6.46927 4.30448C5.48915 4.71046 4.71046 5.48915 4.30448 6.46927C4 7.20435 4 8.13623 4 10V13.6C4 15.8402 4 16.9603 4.43597 17.816C4.81947 18.5686 5.43139 19.1805 6.18404 19.564C7.03968 20 8.15979 20 10.4 20H14C15.8638 20 16.7956 20 17.5307 19.6955C18.5108 19.2895 19.2895 18.5108 19.6955 17.5307C20 16.7956 20 15.8638 20 14V14" stroke="#000000" strokeLinecap="square"></path>
              <path d="M12.4393 14.5607L19.5 7.5C20.3284 6.67157 20.3284 5.32843 19.5 4.5C18.6716 3.67157 17.3284 3.67157 16.5 4.5L9.43934 11.5607C9.15804 11.842 9 12.2235 9 12.6213V15H11.3787C11.7765 15 12.158 14.842 12.4393 14.5607Z" stroke="#000000" strokeLinecap="square"></path>
            </svg>
          }
          label="对话"
          active={false}
          dataPage="chat"
          isCollapsed={isCollapsed}
        />

        <CollapsibleSection
          title="项目"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1f1f1f">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
            </svg>
          }
          isCollapsed={collapsed.projects}
          sidebarCollapsed={isCollapsed}
          items={projectItems}
          onToggle={() => toggleSection('projects')}
        />

        <CollapsibleSection
          title="置顶"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1f1f1f">
              <g><rect fill="none" height="24" width="24" /></g><g><path d="M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z" /></g>
            </svg>
          }
          isCollapsed={collapsed.pinned}
          sidebarCollapsed={isCollapsed}
          items={pinnedItems}
          onToggle={() => toggleSection('pinned')}
        />

        <CollapsibleSection
          title="历史"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1f1f1f">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" />
            </svg>
          }
          isCollapsed={collapsed.history}
          sidebarCollapsed={isCollapsed}
          items={historyItems}
          onToggle={() => toggleSection('history')}
        />
      </nav>

      <div className="divider"></div>

      <UserSection
        userName="Kearth"
        onToggleSidebar={onToggleSidebar || (() => { })}
        isCollapsed={isCollapsed}
      />
    </aside>
  );
};

export default Sidebar;