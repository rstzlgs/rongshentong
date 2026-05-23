// common.js - 导航高亮、移动端菜单、下拉菜单位置修正
(function() {
    // 移动端菜单切换
    function initMobile() {
        const toggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        if (toggle) {
            toggle.addEventListener('click', () => navMenu.classList.toggle('open'));
        }
        // 点击菜单项后关闭移动菜单
        document.querySelectorAll('.nav-menu a, .mega-link-item').forEach(el => {
            el.addEventListener('click', () => {
                if (window.innerWidth < 900) navMenu.classList.remove('open');
            });
        });
    }

    // 导航栏高亮当前页面
    function setActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-menu > .nav-item');
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === currentPath) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }

    // 调整下拉菜单位置（避免超出视口）
    function adjustMegaMenuPosition() {
        const megaMenus = document.querySelectorAll('.nav-item.has-mega .mega-menu');
        megaMenus.forEach(menu => {
            menu.style.left = '';
            menu.style.right = '';
            const rect = menu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                menu.style.left = 'auto';
                menu.style.right = 'auto';
            } else if (rect.left < 0) {
                menu.style.left = '0';
                menu.style.right = 'auto';
            }
        });
    }

    function bindMegaMenuAdjust() {
        document.querySelectorAll('.nav-item.has-mega').forEach(item => {
            item.addEventListener('mouseenter', () => {
                setTimeout(() => adjustMegaMenuPosition(), 10);
            });
        });
        window.addEventListener('resize', () => {
            const visibleMenu = document.querySelector('.nav-item.has-mega:hover .mega-menu');
            if (visibleMenu) adjustMegaMenuPosition();
        });
    }

    // 初始化
    initMobile();
    setActiveNav();
    bindMegaMenuAdjust();
})();
