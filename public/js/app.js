// 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function () {
      initializeSearch();
      initializeCommandMenu();
      initializeNavigation();
      initializeSuperGrok();
      initializeKeyboardShortcuts();
    });

    // 初始化搜索功能
    function initializeSearch() {
      const searchInput = document.querySelector('.search-input-large');
      if (!searchInput) return;

      searchInput.addEventListener('input', function (e) {
        // 实时搜索功能
        if (e.target.value.length > 2) {
          // 这里可以添加搜索逻辑
          console.log('Searching for:', e.target.value);
        }
      });

      searchInput.addEventListener('focus', function () {
        // 聚焦时可以显示搜索建议
      });
    }

    // 初始化命令菜单
    function initializeCommandMenu() {
      const commandMenu = document.getElementById('commandMenu');
      if (!commandMenu) return;
      
      const commandItems = commandMenu.querySelectorAll('.command-item');

      commandItems.forEach(item => {
        item.addEventListener('click', function () {
          const command = this.getAttribute('data-command');
          executeCommand(command);
          hideCommandMenu();
        });
      });

      // 点击外部关闭菜单
      document.addEventListener('click', function (e) {
        if (commandMenuVisible && !commandMenu.contains(e.target)) {
          hideCommandMenu();
        }
      });
    }

    // 执行命令
    function executeCommand(command) {
      const searchInput = document.querySelector('.search-input-large');
      if (!searchInput) return;
      
      const currentValue = searchInput.value;

      switch (command) {
        case 'text':
          searchInput.value = currentValue + ' ';
          break;
        case 'heading1':
          searchInput.value = currentValue + ' # ';
          break;
        case 'heading2':
          searchInput.value = currentValue + ' ## ';
          break;
        case 'bullet':
          searchInput.value = currentValue + ' - ';
          break;
        case 'number':
          searchInput.value = currentValue + ' 1. ';
          break;
        case 'todo':
          searchInput.value = currentValue + ' [ ] ';
          break;
        case 'quote':
          searchInput.value = currentValue + ' > ';
          break;
        case 'divider':
          searchInput.value = currentValue + ' --- ';
          break;
      }

      searchInput.focus();
    }

    // 隐藏命令菜单
    function hideCommandMenu() {
      const commandMenu = document.getElementById('commandMenu');
      if (commandMenu) {
        commandMenu.classList.remove('active');
      }
      commandMenuVisible = false;
    }

    // 初始化导航
    function initializeNavigation() {
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        item.addEventListener('click', function () {
          navItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');

          const page = this.getAttribute('data-page');
          showNotification(`切换到${this.textContent.trim()}`, 'success');

          // 更新主内容区域
          updateMainContent(page);
        });
      });

      // 绑定最近项目点击事件
      const recentItems = document.querySelectorAll('.recent-item');
      recentItems.forEach(item => {
        item.addEventListener('click', function () {
          const title = this.querySelector('.recent-title')?.textContent;
          if (title) {
            showNotification(`打开: ${title}`, 'success');
          }
        });
      });

      // 绑定内容卡片点击事件
      const contentCards = document.querySelectorAll('.content-card');
      contentCards.forEach(card => {
        card.addEventListener('click', function () {
          const title = this.querySelector('.card-title')?.textContent;
          if (title) {
            showNotification(`打开: ${title}`, 'success');
          }
        });
      });
    }

    // 更新主内容区域
    function updateMainContent(page) {
      const workspace = document.querySelector('.workspace');

      // 这里可以根据不同的页面类型更新内容
      switch (page) {
        case 'chat':
          workspace.innerHTML = `
                        <div class="workspace-header">
                            <h1 class="workspace-title">对话</h1>
                            <p class="workspace-subtitle">与 AI 助手进行对话</p>
                        </div>
                        <div class="search-container-large">
                            <div class="search-icon">💬</div>
                            <input type="text" class="search-input-large" placeholder="输入您的问题...">
                            <div class="search-actions">
                                <button class="search-action-btn">DeepSearch</button>
                                <button class="search-action-btn">Create Image</button>
                                <button class="search-action-btn">Pick Personas</button>
                                <button class="search-action-btn">Voice</button>
                                <button class="search-action-btn primary">Auto</button>
                            </div>
                        </div>
                    `;
          break;
        case 'voice':
          workspace.innerHTML = `
                        <div class="workspace-header">
                            <h1 class="workspace-title">语音输入</h1>
                            <p class="workspace-subtitle">使用语音创建笔记</p>
                        </div>
                        <div class="search-container-large">
                            <div class="search-icon">🎙️</div>
                            <input type="text" class="search-input-large" placeholder="说出您的内容...">
                            <div class="search-actions">
                                <button class="search-action-btn">DeepSearch</button>
                                <button class="search-action-btn">Create Image</button>
                                <button class="search-action-btn">Pick Personas</button>
                                <button class="search-action-btn">Voice</button>
                                <button class="search-action-btn primary">Auto</button>
                            </div>
                        </div>
                    `;
          break;
        case 'imagine':
          workspace.innerHTML = `
                        <div class="workspace-header">
                            <h1 class="workspace-title">图像生成</h1>
                            <p class="workspace-subtitle">创建 AI 生成的图像</p>
                        </div>
                        <div class="search-container-large">
                            <div class="search-icon">🖼️</div>
                            <input type="text" class="search-input-large" placeholder="描述您想要的图像...">
                            <div class="search-actions">
                                <button class="search-action-btn">DeepSearch</button>
                                <button class="search-action-btn">Create Image</button>
                                <button class="search-action-btn">Pick Personas</button>
                                <button class="search-action-btn">Voice</button>
                                <button class="search-action-btn primary">Auto</button>
                            </div>
                        </div>
                    `;
          break;
        default:
          // 默认显示主页
          break;
      }
    }

    // 初始化 SuperGrok
    function initializeSuperGrok() {
      const superGrokBtn = document.querySelector('.super-grok-btn');
      if (superGrokBtn) {
        superGrokBtn.addEventListener('click', function () {
          showNotification('升级功能开发中...', 'success');
        });
      }
    }

    // 切换侧边栏
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('collapsed');
    }

    // 显示历史记录
    function showHistory() {
      showNotification('历史记录功能开发中...', 'success');
    }

    // 切换收藏
    function toggleStar() {
      showNotification('收藏功能开发中...', 'success');
    }

    // 切换视图
    function toggleView() {
      showNotification('视图切换功能开发中...', 'success');
    }

    // 显示通知
    function showNotification(message, type = 'success') {
      const notification = document.getElementById('notification');
      if (!notification) return;
      
      const messageElement = notification.querySelector('.notification-message');
      const iconElement = notification.querySelector('.notification-icon');
      
      if (messageElement && iconElement) {
        messageElement.textContent = message;
        notification.className = `notification ${type} show`;

        if (type === 'success') {
          iconElement.textContent = '✓';
        } else if (type === 'error') {
          iconElement.textContent = '✕';
        }
      }

      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }

    // 监听窗口大小变化
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          sidebar.classList.remove('collapsed');
        }
      }
    });

    // 初始化键盘快捷键
    function initializeKeyboardShortcuts() {
      let commandMenuVisible = false;

      document.addEventListener('keydown', function (e) {
        // 检测 Command+K (Mac) 或 Ctrl+K (Windows/Linux)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          toggleCommandMenu();
        }

        // 检测 Esc 键关闭命令菜单
        if (e.key === 'Escape' && commandMenuVisible) {
          hideCommandMenu();
        }
      });

      // 切换命令菜单
      function toggleCommandMenu() {
        const commandMenu = document.getElementById('commandMenu');
        const searchInput = document.querySelector('.search-input-large');
        
        if (!commandMenu || !searchInput) {
          commandMenuVisible = false;
          return;
        }

        commandMenuVisible = !commandMenuVisible;

        if (commandMenuVisible) {
          // 显示命令菜单并定位
          commandMenu.classList.add('active');
          
          // 计算命令菜单的位置（居中）
          const searchRect = searchInput.getBoundingClientRect();
          const menuRect = commandMenu.getBoundingClientRect();
          
          commandMenu.style.left = `${searchRect.left + (searchRect.width - menuRect.width) / 2}px`;
          commandMenu.style.top = `${searchRect.bottom + 8}px`;
        } else {
          hideCommandMenu();
        }
      }
    }