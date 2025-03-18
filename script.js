document.addEventListener('DOMContentLoaded', function() {
    loadChangelogs();
    
    animateOnScroll();
    
    activateMenuOnScroll();
    
    addSmoothScrolling();
    
    addParallaxEffect();
    
    addButtonAnimation();
});

function copyScript() {
    const scriptCode = document.getElementById('scriptCode').innerText;
    copyToClipboard(scriptCode);
    showCopyNotification('Скрипт скопирован!');
}

function copyKey() {
    const keyValue = document.getElementById('keyValue').innerText;
    copyToClipboard(keyValue);
    showCopyNotification('Ключ скопирован!');
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Текст успешно скопирован');
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showCopyNotification(message) {
    let notification = document.querySelector('.copy-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'copy-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    if (!document.getElementById('notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            .copy-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #333;
                color: white;
                padding: 10px 20px;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                display: none;
                z-index: 1000;
                animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function loadChangelogs() {
    const changelogs = [
        {
            version: "1.4.1P",
            date: "18.03.2025",
            changes: [
                { type: "added", text: "Added console command - /setflyspeed or /sfs" },
                { type: "updated", text: "Updated Bypass for Fly" },
                { type: "updated", text: "Updated Bypass for SpeedChanger - Bypass1" },
                { type: "updated", text: "Updated Bypass for SpeedChanger - Bypass2" },
                { type: "fixed", text: "Fixed Aimbot" },
                { type: "fixed", text: "Fixed OneTarget (Aimbot)" },
            ]
        },
    ];

    const changelogSection = document.getElementById('changelog');
    if (changelogSection) {
        const changelogContainer = document.createElement('div');
        changelogContainer.className = 'changelog-container';
        changelogContainer.id = 'changelogContainer';
        
        changelogs.forEach((log, index) => {
            const item = document.createElement('div');
            item.className = 'changelog-item';
            
            if (index === 0) {
                item.classList.add('latest-changelog');
            }
            
            const header = document.createElement('div');
            header.className = 'changelog-header';
            
            const title = document.createElement('h4');
            title.textContent = `Version ${log.version}`;
            
            const date = document.createElement('span');
            date.className = 'changelog-date';
            date.textContent = log.date;
            
            header.appendChild(title);
            header.appendChild(date);
            
            const content = document.createElement('div');
            content.className = 'changelog-content';
            
            const changesList = document.createElement('ul');
            
            log.changes.forEach(change => {
                const li = document.createElement('li');
                li.className = change.type;
                li.textContent = change.text;
                changesList.appendChild(li);
            });
            
            content.appendChild(changesList);
            
            item.appendChild(header);
            item.appendChild(content);
            
            if (index !== 0) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'toggle-changelog-btn';
                toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
                toggleBtn.setAttribute('aria-label', 'Показать/скрыть подробности');
                
                toggleBtn.addEventListener('click', function() {
                    const isExpanded = content.classList.toggle('expanded');
                    toggleBtn.innerHTML = isExpanded ? 
                        '<i class="fas fa-chevron-up"></i>' : 
                        '<i class="fas fa-chevron-down"></i>';
                });
                
                if (index !== 0) {
                    content.style.display = 'none';
                }
                
                header.appendChild(toggleBtn);
                
                header.style.cursor = 'pointer';
                header.addEventListener('click', function(e) {
                    if (e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
                        toggleBtn.click();
                    }
                });
            }
            
            changelogContainer.appendChild(item);
        });
        
        changelogSection.appendChild(changelogContainer);
    }
}

function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

function activateMenuOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function addParallaxEffect() {
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPositionX = `${x * 20}px`;
        document.body.style.backgroundPositionY = `${y * 20}px`;
    });
}

function addButtonAnimation() {
    const buttons = document.querySelectorAll('.copy-btn, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
}

const translations = {
    en: {
        home: 'Home',
        features: 'Features',
        changelog: 'Changelog',
        contact: 'Contact',
        scriptInstall: 'Script for Installation',
        currentKey: 'Current Key',
        created: 'Created:',
        validUntil: 'Valid Until:',
        status: 'Status:',
        joinUs: 'Join Us',
        copy: 'Copy',
        powerfulScript: 'Powerful and modern cheat for Roblox',
        version: 'Version:',
        compatibility: 'Compatibility:',
        lastUpdate: 'Last Update:',
        active: 'Active'
    },
    ru: {
        home: 'Главная',
        features: 'Функции',
        changelog: 'Чейнджлог',
        contact: 'Контакты',
        scriptInstall: 'Скрипт для установки',
        currentKey: 'Актуальный ключ',
        created: 'Создан:',
        validUntil: 'Действует до:',
        status: 'Статус:',
        joinUs: 'Присоединяйтесь к нам',
        copy: 'Копировать',
        powerfulScript: 'Мощный и современный чит для Roblox',
        version: 'Версия:',
        compatibility: 'Совместимость:',
        lastUpdate: 'Последнее обновление:',
        active: 'Активен'
    }
};

function setLanguage(lang) {
    document.querySelector('a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('a[href="#features"]').textContent = translations[lang].features;
    document.querySelector('a[href="#changelog"]').textContent = translations[lang].changelog;
    document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;
    document.querySelector('#scriptCode').previousElementSibling.textContent = translations[lang].scriptInstall;
    document.querySelector('#key-section h3').textContent = translations[lang].currentKey;
    document.querySelectorAll('.key-details .key-item .label')[0].textContent = translations[lang].created;
    document.querySelectorAll('.key-details .key-item .label')[1].textContent = translations[lang].validUntil;
    document.querySelectorAll('.key-details .key-item .label')[2].textContent = translations[lang].status;
    document.querySelector('#social h3').textContent = translations[lang].joinUs;
    document.querySelectorAll('.copy-btn').forEach(btn => btn.innerHTML = `<i class="fas fa-copy"></i> ${translations[lang].copy}`);
    document.querySelector('.hero-text p').textContent = translations[lang].powerfulScript;
    document.querySelectorAll('.script-info .info-item .label')[0].textContent = translations[lang].version;
    document.querySelectorAll('.script-info .info-item .label')[1].textContent = translations[lang].compatibility;
    document.querySelectorAll('.script-info .info-item .label')[2].textContent = translations[lang].lastUpdate;
    document.querySelector('.status .value').innerHTML = `<span class="status-indicator green"></span> ${translations[lang].active}`;
}

function initLanguageSwitcher() {
    document.getElementById('lang-ru').addEventListener('click', () => {
        document.documentElement.lang = 'ru';
        setLanguage('ru');
    });

    document.getElementById('lang-en').addEventListener('click', () => {
        document.documentElement.lang = 'en';
        setLanguage('en');
    });
}

document.addEventListener('DOMContentLoaded', initLanguageSwitcher); 