import React from 'react';

interface CommandItem {
  command: string;
  icon: string;
  name: string;
  description: string;
  shortcut: string;
}

const CommandMenu: React.FC = () => {
  const commands: CommandItem[] = [
    { command: 'text', icon: '📝', name: '文本', description: '纯文本内容', shortcut: '空格' },
    { command: 'heading1', icon: 'H1', name: '标题 1', description: '大标题', shortcut: '1' },
    { command: 'heading2', icon: 'H2', name: '标题 2', description: '中标题', shortcut: '2' },
    { command: 'bullet', icon: '•', name: '无序列表', description: '项目符号列表', shortcut: '-' },
    { command: 'number', icon: '1.', name: '有序列表', description: '数字列表', shortcut: '1.' },
    { command: 'todo', icon: '☐', name: '待办事项', description: '任务清单', shortcut: '[]' },
    { command: 'quote', icon: '"', name: '引用', description: '引用文本', shortcut: '>' },
    { command: 'divider', icon: '—', name: '分割线', description: '水平分割线', shortcut: '---' }
  ];

  return (
    <div className="command-menu" id="commandMenu">
      {commands.map((item, index) => (
        <div key={index} className="command-item" data-command={item.command}>
          <span className="command-icon">{item.icon}</span>
          <div className="command-info">
            <div className="command-name">{item.name}</div>
            <div className="command-desc">{item.description}</div>
          </div>
          <span className="command-shortcut">{item.shortcut}</span>
        </div>
      ))}
    </div>
  );
};

export default CommandMenu;