document.addEventListener('DOMContentLoaded', function() {
    loadChangelogs();
    
    animateOnScroll();
    
    activateMenuOnScroll();
    
    addSmoothScrolling();
    
    addParallaxEffect();
    
    addButtonAnimation();
    
    addScrollReveal();
    
    initBackToTop();
    
    initModalEvents();
    
    updateCountdown();
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
    
    const audio = new Audio('data:audio/mp3;base64,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');
    audio.volume = 0.5;
    audio.play();
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function loadChangelogs() {
    const changelogs = [
        {
            version: "1.4.1P",
            date: "15.03.2025",
            changes: [
                { type: "added", text: "Added console command - /setflyspeed or /sfs" },
                { type: "updated", text: "Updated Bypass for Fly" },
                { type: "updated", text: "Updated Bypass for SpeedChanger - Bypass1" },
                { type: "updated", text: "Updated Bypass for SpeedChanger - Bypass2" },
                { type: "fixed", text: "Fixed Aimbot" },
                { type: "fixed", text: "Fixed OneTarget (Aimbot)" },
            ]
        },
        {
            version: "1.4.2A",
            date: "18.03.2025",
            changes: [
                { type: "added", text: "Added console command - /setflyspeed or /sfs" },
                { type: "updated", text: "Updated Bypass for Fly" },
                { type: "updated", text: "Updated Bypass for SpeedChanger - Bypass1" },
                { type: "updated", text: "Updated Bypass for SpeedChanger - Bypass2" },
                { type: "fixed", text: "Fixed Aimbot" },
                { type: "fixed", text: "Fixed OneTarget (Aimbot)" },
                { type: "fixed", text: "Fixed ESP" },
                { type: "fixed", text: "Fixed Wallhack" },
                { type: "fixed", text: "Fixed NoLag" },
                { type: "fixed", text: "Fixed StreamerMode" },
                { type: "fixed", text: "Fixed ThirdPerson" },
                { type: "fixed", text: "Fixed Console Injection" },
                { type: "fixed", text: "Fixed Optimization" },
                { type: "fixed", text: "Fixed Bugs" },
                { type: "fixed", text: "Fixed Key" },
                { type: "fixed", text: "Fixed Script" },
                { type: "fixed", text: "Fixed Interface" },
                { type: "fixed", text: "Fixed Menu" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
                { type: "fixed", text: "Fixed UI" },
            ]
        }
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
    const navLinks = document.querySelectorAll('.nav-link');
    
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
    // Функция пустая, чтобы отключить эффект параллакса
    return;
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

function addScrollReveal() {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    sr.reveal('.hero-content, .features-content, .changelog-container, .key-info, .social-links', {
        interval: 200
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

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) {
        console.error('Не найдена кнопка backToTop');
        return;
    }
    
    const scrollThreshold = 300;
    
    if (window.pageYOffset > scrollThreshold) {
        backToTopButton.classList.add('show');
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > scrollThreshold) {
            if (!backToTopButton.classList.contains('show')) {
                backToTopButton.classList.add('show');
            }
        } else {
            if (backToTopButton.classList.contains('show')) {
                backToTopButton.classList.remove('show');
            }
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initModalEvents() {
    const modal = document.getElementById('demoModal');
    const showModalBtn = document.getElementById('showDemoBtn');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !showModalBtn || !closeModal) {
        console.error('Не найдены элементы модального окна');
        return;
    }
    
    showModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    });
    
    closeModal.addEventListener('click', () => {
        closeModalWindow();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWindow();
        }
    });
    
    function closeModalWindow() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    const validUntil = new Date('2025-05-01');
    
    function calculate() {
        const now = new Date();
        const diff = validUntil - now;
        
        if (diff <= 0) {
            countdownEl.innerHTML = 'Истек';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownEl.innerHTML = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }
    
    calculate();
    setInterval(calculate, 1000);
}

function addTypingEffect() {
    const codeElement = document.getElementById('scriptCode');
    const originalCode = codeElement.innerText;
    
    codeElement.innerText = '';
    
    let i = 0;
    function typeCode() {
        if (i < originalCode.length) {
            codeElement.innerText += originalCode.charAt(i);
            i++;
            setTimeout(typeCode, 50);
        }
    }
    
    setTimeout(typeCode, 1000);
} 
