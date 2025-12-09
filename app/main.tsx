import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
import './app.css';

// 获取root元素
const rootElement = document.getElementById('root');

if (rootElement) {
  // 创建React根实例并渲染应用
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}