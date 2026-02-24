(function() {
    // Only inject if not already present
    if (document.getElementById('chatWidget')) return;

    // Create and inject the chat widget HTML directly
    const chatHTML = `
        <!-- Floating Chat Widget -->
        <div id="chatWidget" class="fixed bottom-8 z-50 transition-all duration-300" style="right: 2rem;">
            <!-- Chat Toggle Button -->
            <button id="openChat"
                    class="rounded-full shadow-lg overflow-hidden hover:scale-105 transition border-2 border-honey bg-white"
                    title="Whispers of Saeriel">
                <img src="assets/saeriel.png" alt="Saeriel" class="w-16 h-16 object-cover rounded-full" />
            </button>

            <!-- Chat Box -->
                       <div id="chatBox"
                class="hidden
                       mt-4
                       w-[90vw] max-w-[90vw] max-h-[75vh] overflow-auto
                       sm:w-[32rem]
                       bg-white rounded-3xl shadow-2xl border border-honey
                       flex flex-col">
                <!-- Header -->
                <div class="bg-honey/10 p-5 flex items-center gap-4" dir="ltr">
                    <img src="assets/saeriel.png" alt="Saeriel" class="w-14 h-14 rounded-full object-cover border border-honey shadow" />
                    <div class="flex-1">
                        <p class="text-xl font-serif text-ink font-semibold" id="chat-title">
                            Saeriel, Veilwarden of Álfheimr
                        </p>
                        <p class="text-md text-ink/60 italic" id="chat-subtitle">
                            "Whisper, and I shall answer in petals and wind."
                        </p>
                    </div>
                </div>

                <!-- Chat Log -->
                <div id="chatLog" class="h-[26rem] overflow-y-auto px-6 py-4 text-[17px] text-ink/90 space-y-4 bg-parchment font-serif">
                    <div class="text-ink/60 italic" id="chat-welcome">
                        💬 Saeriel awaits your question…
                    </div>
                </div>

                <!-- Input -->
                <div class="p-5 border-t border-honey/30 bg-white">
                    <div class="flex gap-2" id="chat-input-container">
                        <input id="chatInput"
                               type="text"
                               placeholder="Ask the fae spirit..."
                               class="w-full rounded-full px-5 py-4 text-lg border border-honey/50 bg-parchment text-ink placeholder-ink/40 font-serif focus:outline-none focus:ring-2 focus:ring-honey" />
                        <button id="chatSubmit" type="button"
                                class="px-4 py-2 bg-honey text-white rounded-full hover:bg-honey/90 transition">
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <audio id="whisperSound" src="https://cdn.pixabay.com/download/audio/2023/02/27/audio_2f62436f40.mp3?filename=magic-chime-88386.mp3" preload="auto"></audio>
    `;

    // Inject the HTML
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Language manager for embedded chat that syncs with main site
    class EmbeddedChatLanguageManager {
        constructor() {
            this.currentLang = 'en';
            this.translations = {
                en: {
                    title: "Saeriel, Veilwarden of Álfheimr",
                    subtitle: '"Whisper, and I shall answer in petals and wind."',
                    welcome: "💬 Saeriel awaits your question…",
                    placeholder: "Ask the fae spirit...",
                    you: "You",
                    saeriel: "Saeriel",
                    mists: "The mists are swirling…",
                    error: "The winds failed to carry your words. Try again soon."
                },
                he: {
                    title: "סאריאל, שומרת הסף של אלפהיימר",
                    subtitle: '"לחש, ואני אענה בעלי כותרת ורוח."',
                    welcome: "💬 סאריאל ממתינה לשאלתך...",
                    placeholder: "שאל את רוח הפיות...",
                    you: "אתה",
                    saeriel: "סאריאל",
                    mists: "הערפל לוחש...",
                    error: "הרוחות נכשלו לשאת את דבריך. נסה שוב בקרוב."
                },
                ru: {
                    title: "Саэриэль, Хранительница Альвхейма",
                    subtitle: '"Шепни, и я отвечу лепестками и ветром."',
                    welcome: "💬 Саэриэль ждет вашего вопроса...",
                    placeholder: "Спроси у духа фей...",
                    you: "Вы",
                    saeriel: "Саэриэль",
                    mists: "Туман шепчет...",
                    error: "Ветры не смогли донести ваши слова. Попробуйте еще раз."
                }
            };
            this.init();
        }

        init() {
            // Check if we can access the main site's language manager
            if (window.languageManager) {
                this.currentLang = window.languageManager.getCurrentLanguage();
                console.log('Embedded chat syncing with main site language:', this.currentLang);
            } else {
                // Fallback to storage-based detection
                const urlLang = new URLSearchParams(window.location.search).get('lang');
                const savedLang = sessionStorage.getItem('wedding-language');
                const localLang = localStorage.getItem('wedding-language');

                if (urlLang && ['en', 'he', 'ru'].includes(urlLang)) {
                    this.currentLang = urlLang;
                } else if (savedLang && ['en', 'he', 'ru'].includes(savedLang)) {
                    this.currentLang = savedLang;
                } else if (localLang && ['en', 'he', 'ru'].includes(localLang)) {
                    this.currentLang = localLang;
                }
            }

            this.applyLanguage();
            this.setupLanguageObserver();
            console.log('Embedded chat initialized with language:', this.currentLang);
        }

        applyLanguage() {
            const lang = this.currentLang;
            const t = this.translations[lang];

            // Update text content
            const titleEl = document.getElementById('chat-title');
            const subtitleEl = document.getElementById('chat-subtitle');
            const welcomeEl = document.getElementById('chat-welcome');
            const inputEl = document.getElementById('chatInput');
            const chatWidget = document.getElementById('chatWidget');
            const chatBox = document.getElementById('chatBox');
            const inputContainer = document.getElementById('chat-input-container');

            if (titleEl) titleEl.textContent = t.title;
            if (subtitleEl) subtitleEl.textContent = t.subtitle;
            if (welcomeEl) welcomeEl.textContent = t.welcome;
            if (inputEl) inputEl.placeholder = t.placeholder;

            // Apply RTL for Hebrew
            if (lang === 'he') {
                if (chatBox) {
                    chatBox.style.direction = 'rtl';
                    chatBox.style.textAlign = 'right';
                }
                if (chatWidget) {
                    chatWidget.style.right = 'auto';
                    chatWidget.style.left = '2rem';
                }
                if (inputContainer) {
                    inputContainer.style.direction = 'rtl';
                    inputContainer.style.flexDirection = 'row-reverse';
                }
                // Move chat log content to RTL
                const chatLog = document.getElementById('chatLog');
                if (chatLog) {
                    chatLog.style.direction = 'rtl';
                    chatLog.style.textAlign = 'right';
                }
            } else {
                // Reset to LTR
                if (chatBox) {
                    chatBox.style.direction = 'ltr';
                    chatBox.style.textAlign = 'left';
                }
                if (chatWidget) {
                    chatWidget.style.right = '2rem';
                    chatWidget.style.left = 'auto';
                }
                if (inputContainer) {
                    inputContainer.style.direction = 'ltr';
                    inputContainer.style.flexDirection = 'row';
                }
                const chatLog = document.getElementById('chatLog');
                if (chatLog) {
                    chatLog.style.direction = 'ltr';
                    chatLog.style.textAlign = 'left';
                }
            }
        }

        setupLanguageObserver() {
            // Listen for main site language manager updates
            if (window.languageManager) {
                // Check for language manager updates periodically
                setInterval(() => {
                    const mainLang = window.languageManager.getCurrentLanguage();
                    if (mainLang !== this.currentLang) {
                        this.setLanguage(mainLang);
                    }
                }, 500);
            }

            // Poll for sessionStorage changes as fallback
            let lastSessionLang = sessionStorage.getItem('wedding-language');
            setInterval(() => {
                const currentSessionLang = sessionStorage.getItem('wedding-language');
                if (currentSessionLang && currentSessionLang !== lastSessionLang && currentSessionLang !== this.currentLang) {
                    console.log('Embedded chat detected storage language change:', currentSessionLang);
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

            // Listen for custom language change events
            window.addEventListener('languageChanged', (event) => {
                if (event.detail && event.detail.language) {
                    this.setLanguage(event.detail.language);
                }
            });
        }

        setLanguage(lang) {
            if (['en', 'he', 'ru'].includes(lang) && lang !== this.currentLang) {
                this.currentLang = lang;
                this.applyLanguage();
                console.log('Embedded chat language changed to:', lang);
            }
        }

        getCurrentLanguage() {
            return this.currentLang;
        }

        getLocalizedText(key) {
            return this.translations[this.currentLang][key] || key;
        }
    }

    // Initialize embedded chat functionality
    function initEmbeddedChat() {
        const langManager = new EmbeddedChatLanguageManager();

        const chatBox = document.getElementById('chatBox');
        const openChat = document.getElementById('openChat');
        const chatLog = document.getElementById('chatLog');
        const chatInput = document.getElementById('chatInput');
        const chatSubmit = document.getElementById('chatSubmit');
        const whisper = document.getElementById('whisperSound');

        // Toggle chat visibility
        if (openChat && chatBox) {
            openChat.addEventListener('click', () => {
                chatBox.classList.toggle('hidden');
            });
        }

        function appendMessage(role, text) {
            const msg = document.createElement('div');

            // Use localized labels
            const roleLabel = role === 'user'
                ? langManager.getLocalizedText('you')
                : langManager.getLocalizedText('saeriel');

            msg.className = `message ${role === 'user' ? 'user font-medium' : 'saeriel italic'} mb-3`;
            msg.style.color = role === 'user' ? '#2e3238' : '#8b5e3c';

            // For Hebrew, adjust text alignment
            if (langManager.getCurrentLanguage() === 'he') {
                msg.style.textAlign = 'right';
                msg.style.direction = 'rtl';
            } else {
                msg.style.textAlign = 'left';
                msg.style.direction = 'ltr';
            }

            msg.innerHTML = `<strong>${roleLabel}:</strong> ${text}`;

            chatLog.appendChild(msg);
            chatLog.scrollTop = chatLog.scrollHeight;

            // Save to session storage
            sessionStorage.setItem('chatLog', chatLog.innerHTML);
        }

        function handleChatSubmit() {
            const message = chatInput.value.trim();
            if (!message) return;

            appendMessage('user', message);
            chatInput.value = '';
            appendMessage('saeriel', langManager.getLocalizedText('mists'));

            fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    language: langManager.getCurrentLanguage()
                })
            })
                .then(res => res.json())
                .then(data => {
                    const last = chatLog.querySelector('.message.saeriel:last-child');
                    if (last) last.remove();
                    appendMessage('saeriel', data.reply);
                    if (whisper) whisper.play().catch(() => {});
                })
                .catch(() => {
                    const last = chatLog.querySelector('.message.saeriel:last-child');
                    if (last) last.remove();
                    appendMessage('saeriel', langManager.getLocalizedText('error'));
                });
        }

        // Event listeners
        if (chatSubmit) {
            chatSubmit.addEventListener('click', handleChatSubmit);
        }

        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleChatSubmit();
                }
            });
        }

        // Restore chat log if any
        const savedChat = sessionStorage.getItem('chatLog');
        if (savedChat && chatLog) {
            chatLog.innerHTML = savedChat;
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        console.log('Embedded chat initialized successfully');

        // Make language manager globally accessible
        window.embeddedChatLangManager = langManager;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEmbeddedChat);
    } else {
        // Small delay to ensure main site language manager is ready
        setTimeout(initEmbeddedChat, 100);
    }
})();