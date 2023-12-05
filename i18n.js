// Internationalization system for BlastOS website
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'zh-CN';
        this.translations = {
            'zh-CN': {
                // Page title
                'page.title': 'BlastOS - 下一代操作系统',
                
                // Navigation
                'nav.features': '特性',
                'nav.about': '关于',
                'nav.download': '下载',
                
                // Hero section
                'hero.title': '欢迎来到 BlastOS',
                'hero.subtitle': '革命性的操作系统，为现代计算而生',
                'hero.download': '立即下载',
                'hero.learn-more': '了解更多',
                'hero.window-title': 'BlastOS Desktop',
                
                // Features section
                'features.title': '核心特性',
                'features.performance.title': '极速性能',
                'features.performance.desc': '优化的内核设计，确保系统响应迅速，资源占用最小',
                'features.security.title': '安全防护',
                'features.security.desc': '多层安全机制，保护您的数据和隐私安全',
                'features.interface.title': '现代界面',
                'features.interface.desc': '简洁美观的用户界面，提供流畅的使用体验',
                'features.customization.title': '高度定制',
                'features.customization.desc': '丰富的定制选项，打造专属于您的操作系统',
                
                // About section
                'about.title': '关于 BlastOS',
                'about.desc1': 'BlastOS 是一个专为现代计算需求设计的新一代操作系统。我们致力于提供最佳的性能、安全性和用户体验。',
                'about.desc2': '无论您是开发者、设计师还是普通用户，BlastOS 都能满足您的需求，让计算变得更加简单高效。',
                'about.highlight1': '开源免费',
                'about.highlight2': '跨平台支持',
                'about.highlight3': '活跃的社区',
                'about.highlight4': '持续更新',
                'about.stats.users': '用户',
                'about.stats.contributors': '贡献者',
                'about.stats.stability': '稳定性',
                
                // Download section
                'download.title': '开始使用 BlastOS',
                'download.subtitle': '选择适合您设备的版本',
                'download.desktop.title': '桌面版',
                'download.desktop.desc': '适用于 PC 和笔记本电脑',
                'download.desktop.button': '下载 (x64)',
                'download.server.title': '服务器版',
                'download.server.desc': '适用于服务器和云环境',
                'download.server.button': '下载 (Server)',
                'download.dev.title': '开发版',
                'download.dev.desc': '最新功能的预览版本',
                'download.dev.button': '下载 (Beta)',
                
                // Footer
                'footer.tagline': '下一代操作系统',
                'footer.links': '链接',
                'footer.docs': '文档',
                'footer.community': '社区',
                'footer.support': '支持',
                'footer.help': '帮助中心',
                'footer.issues': '问题反馈',
                'footer.contact': '联系我们',
                'footer.copyright': '© 2024 BlastOS. 保留所有权利。',
                
                // JavaScript messages
                'loading': '正在加载 BlastOS...',
                'easter-egg': '🎉 你发现了一个彩蛋！BlastOS 即将改变世界！'
            },
            'en': {
                // Page title
                'page.title': 'BlastOS - Next-generation operating system',
                
                // Navigation
                'nav.features': 'Features',
                'nav.about': 'About',
                'nav.download': 'Download',
                
                // Hero section
                'hero.title': 'Welcome to BlastOS',
                'hero.subtitle': 'Revolutionary operating system built for modern computing',
                'hero.download': 'Download Now',
                'hero.learn-more': 'Learn More',
                'hero.window-title': 'BlastOS Desktop',
                
                // Features section
                'features.title': 'Core Features',
                'features.performance.title': 'Lightning Fast',
                'features.performance.desc': 'Optimized kernel design ensures rapid system response with minimal resource usage',
                'features.security.title': 'Secure Protection',
                'features.security.desc': 'Multi-layered security mechanisms protect your data and privacy',
                'features.interface.title': 'Modern Interface',
                'features.interface.desc': 'Clean and beautiful user interface providing smooth user experience',
                'features.customization.title': 'Highly Customizable',
                'features.customization.desc': 'Rich customization options to create your personalized operating system',
                
                // About section
                'about.title': 'About BlastOS',
                'about.desc1': 'BlastOS is a next-generation operating system designed for modern computing needs. We are committed to providing the best performance, security, and user experience.',
                'about.desc2': 'Whether you are a developer, designer, or regular user, BlastOS meets your needs and makes computing simpler and more efficient.',
                'about.highlight1': 'Open Source & Free',
                'about.highlight2': 'Cross-Platform Support',
                'about.highlight3': 'Active Community',
                'about.highlight4': 'Continuous Updates',
                'about.stats.users': 'Users',
                'about.stats.contributors': 'Contributors',
                'about.stats.stability': 'Uptime',
                
                // Download section
                'download.title': 'Get Started with BlastOS',
                'download.subtitle': 'Choose the version that fits your device',
                'download.desktop.title': 'Desktop Edition',
                'download.desktop.desc': 'For PCs and laptops',
                'download.desktop.button': 'Download (x64)',
                'download.server.title': 'Server Edition',
                'download.server.desc': 'For servers and cloud environments',
                'download.server.button': 'Download (Server)',
                'download.dev.title': 'Developer Edition',
                'download.dev.desc': 'Preview version with latest features',
                'download.dev.button': 'Download (Beta)',
                
                // Footer
                'footer.tagline': 'Next-generation operating system',
                'footer.links': 'Links',
                'footer.docs': 'Documentation',
                'footer.community': 'Community',
                'footer.support': 'Support',
                'footer.help': 'Help Center',
                'footer.issues': 'Report Issues',
                'footer.contact': 'Contact Us',
                'footer.copyright': '© 2024 BlastOS. All rights reserved.',
                
                // JavaScript messages
                'loading': 'Loading BlastOS...',
                'easter-egg': '🎉 You found an easter egg! BlastOS will change the world!'
            }
        };
    }

    // Get translation for a key
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    // Set language and update DOM
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updateDOM();
            this.updateHTMLLang();
        }
    }

    // Update HTML lang attribute
    updateHTMLLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    // Update all translatable elements in the DOM
    updateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            titleElement.textContent = this.t(key);
        }

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Initialize i18n system
    init() {
        this.updateHTMLLang();
        this.updateDOM();
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});