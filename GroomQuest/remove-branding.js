// A more targeted approach to hide GDevelop branding without breaking functionality
(function() {
    // Wait for the game to load
    window.addEventListener('load', function() {
        // Apply CSS to hide branding elements
        const style = document.createElement('style');
        style.textContent = `
            /* Hide GDevelop branding elements */
            span[style*="48.9246px"],
            span:contains("Made with GDevelop"),
            a[href*="gdevelop-app.com"],
            canvas#pixi-canvas-splash {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);

        // Periodically check for and hide the branding
        function hideBranding() {
            // Check for the specific "Made with GDevelop" text
            const elements = document.querySelectorAll('span');
            elements.forEach(function(el) {
                if (el.textContent && el.textContent.includes('Made with GDevelop')) {
                    el.style.opacity = '0';
                    el.style.visibility = 'hidden';
                }
            });

            // Check for bottom-right corner elements (likely the watermark)
            const allElements = document.querySelectorAll('a');
            allElements.forEach(function(el) {
                if (el.href && el.href.includes('gdevelop')) {
                    el.style.opacity = '0';
                    el.style.visibility = 'hidden';
                }
            });
        }

        // Run immediately and periodically
        hideBranding();
        setInterval(hideBranding, 500);

        // If gdjs is available, try to set the logo to null
        if (typeof gdjs !== 'undefined') {
            gdjs.gdevelopLogo = null;
        }
    });
})();