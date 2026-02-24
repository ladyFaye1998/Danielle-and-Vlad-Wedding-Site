// chat.js - Enhanced with language support

function get(el) {
    return document.getElementById(el);
}

// Language manager for embedded chat
class EmbeddedChatLanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Check multiple sources for language preference
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        const savedLang = sessionStorage.getItem('wedding-language');
        const localLang = localStorage.getItem('wedding-language');

        console.log('Embedded chat language detection:', { urlLang, savedLang, localLang });

        // Priority: URL parameter > sessionStorage > localStorage > default
        if (urlLang && ['en', 'he', 'ru'].includes(urlLang)) {
            this.currentLang = urlLang;
        } else if (savedLang && ['en', 'he', 'ru'].includes(savedLang)) {
            this.currentLang = savedLang;
        } else if (localLang && ['en', 'he', 'ru'].includes(localLang)) {
            this.currentLang = localLang;
        }

        this.setupLanguageObserver();
        console.log('Embedded chat initialized with language:', this.currentLang);
    }

    setupLanguageObserver() {
        // Poll for sessionStorage changes
        let lastSessionLang = sessionStorage.getItem('wedding-language');
        setInterval(() => {
            const currentSessionLang = sessionStorage.getItem('wedding-language');
            if (currentSessionLang && currentSessionLang !== lastSessionLang && currentSessionLang !== this.currentLang) {
                console.log('Embedded chat detected language change:', currentSessionLang);
                this.setLanguage(currentSessionLang);
                lastSessionLang = currentSessionLang;
            }
        }, 1000);

        // Listen for storage changes
        window.addEventListener('storage', (event) => {
            if (event.key === 'wedding-language' && event.newValue) {
                this.setLanguage(event.newValue);
            }
        });
    }

    setLanguage(lang) {
        if (['en', 'he', 'ru'].includes(lang) && lang !== this.currentLang) {
            this.currentLang = lang;
            console.log('Embedded chat language changed to:', lang);
        }
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    getLocalizedText(key) {
        const texts = {
            you: { en: 'You', he: 'אתה', ru: 'Вы' },
            saeriel: { en: 'Saeriel', he: 'סאריאל', ru: 'Саэриэль' },
            mists: { en: 'The mists are swirling…', he: 'הערפל לוחש...', ru: 'Туман шепчет...' },
            error: { en: 'The winds failed to carry your words. Try again soon.', he: 'הרוחות נכשלו לשאת את דבריך. נסה שוב בקרוב.', ru: 'Ветры не смогли донести ваши слова. Попробуйте еще раз.' }
        };
        return texts[key] ? texts[key][this.currentLang] : key;
    }
}

// Initialize language manager
let embeddedLangManager;

function appendMessage(role, text) {
    const msg = document.createElement('div');

    // Ensure language manager is available
    if (!embeddedLangManager) {
        embeddedLangManager = new EmbeddedChatLanguageManager();
    }

    // Use localized labels
    const roleLabel = role === 'user'
        ? embeddedLangManager.getLocalizedText('you')
        : embeddedLangManager.getLocalizedText('saeriel');

    msg.className = `text-[17px] ${role === 'user' ? 'text-ink font-medium' : 'text-honey italic'}`;
    msg.innerHTML = `<strong>${roleLabel}:</strong> ${text}`;

    get('chatLog').appendChild(msg);
    get('chatLog').scrollTop = get('chatLog').scrollHeight;
    saveChatLog();
}

function saveChatLog() {
    sessionStorage.setItem('chatLog', get('chatLog').innerHTML);
}

function restoreChatLog() {
    const saved = sessionStorage.getItem('chatLog');
    if (saved) get('chatLog').innerHTML = saved;
}

function handleSubmit(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const message = get('chatInput').value.trim();
        if (!message) return;

        // Ensure language manager is available
        if (!embeddedLangManager) {
            embeddedLangManager = new EmbeddedChatLanguageManager();
        }

        appendMessage('user', message);
        get('chatInput').value = '';
        appendMessage('saeriel', embeddedLangManager.getLocalizedText('mists'));

        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message,
                language: embeddedLangManager.getCurrentLanguage()
            })
        })
            .then(res => res.json())
            .then(data => {
                const last = get('chatLog').querySelector('div:last-child');
                if (last && last.innerText.includes(embeddedLangManager.getLocalizedText('mists'))) {
                    last.remove();
                }
                appendMessage('saeriel', data.reply);
                get('whisperSound')?.play();
            })
            .catch(() => {
                const last = get('chatLog').querySelector('div:last-child');
                if (last && last.innerText.includes(embeddedLangManager.getLocalizedText('mists'))) {
                    last.remove();
                }
                appendMessage('saeriel', embeddedLangManager.getLocalizedText('error'));
            });
    }
}

function initChat() {
    // Initialize language manager first
    embeddedLangManager = new EmbeddedChatLanguageManager();

    restoreChatLog();
    const input = get('chatInput');
    if (input) input.addEventListener('keydown', handleSubmit);

    const toggle = get('openChat');
    const box = get('chatBox');
    if (toggle && box) {
        toggle.addEventListener('click', () => {
            box.classList.toggle('hidden');
            box.classList.toggle('flex');
            box.classList.toggle('flex-col');
        });
    }
}

// Wait until the widget is present in DOM
const interval = setInterval(() => {
    if (document.getElementById('openChat') && document.getElementById('chatBox')) {
        clearInterval(interval);
        initChat();
    }
}, 100);