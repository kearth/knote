import React from 'react';
import Home from './page/home';

interface WorkspaceProps {
  currentPage: string;
}

const Workspace: React.FC<WorkspaceProps> = ({ currentPage }) => {
  // 根据currentPage显示不同的页面组件
  // 目前只支持home页面，其他页面暂时显示空白
  // 后续可以扩展其他页面组件的导入和显示逻辑
  return (
    <div className="workspace">
      {currentPage === 'home' && <Home />}
      {/* 其他页面的显示逻辑可以在这里扩展 */}
      {/* {currentPage === 'chat' && <Chat />} */}
      {/* {currentPage === 'settings' && <Settings />} */}
    </div>
  );
};

export default Workspace;