/**
 * Quixotist Preview System
 * Handles link previews, meta-description fetching, and smart positioning.
 */
document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.prev-link-wrapper');

    wrappers.forEach(wrapper => {
        const popup = wrapper.querySelector('.prev-popup');
        const textEl = wrapper.querySelector('.prev-text');
        const iframe = wrapper.querySelector('.prev-iframe');
        const url = textEl ? textEl.dataset.url : null;

        wrapper.addEventListener('mouseenter', () => {
            // 1. Lazy load Iframe
            if (iframe && iframe.dataset.src && iframe.src === "about:blank") {
                iframe.src = iframe.dataset.src;
            }

            // 2. Fetch Metadata (Only once)
            if (url && textEl && !textEl.dataset.fetched) {
                textEl.dataset.fetched = "loading";
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        
                        const description = 
                            doc.querySelector('meta[property="og:description"]')?.content ||
                            doc.querySelector('meta[name="description"]')?.content ||
                            doc.querySelector('meta[name="twitter:description"]')?.content;

                        const title = 
                            doc.querySelector('meta[property="og:title"]')?.content ||
                            doc.title;

                        if (description) {
                            textEl.innerHTML = `<strong>${title}</strong><br>${description}<br>` + textEl.innerHTML;
                            textEl.dataset.fetched = "true";
                        }
                    })
                    .catch(err => {
                        console.error('Preview fetch error:', err);
                        textEl.dataset.fetched = "error";
                    });
            }

            // 3. Smart Positioning
            const rect = wrapper.getBoundingClientRect();
            const popupWidth = 320;
            const popupHeight = 240; // Approximate or measured
            
            if (rect.left + popupWidth > window.innerWidth) {
                popup.style.left = 'auto';
                popup.style.right = '0';
            } else {
                popup.style.left = '0';
                popup.style.right = 'auto';
            }

            if (rect.bottom + popupHeight > window.innerHeight) {
                popup.style.top = 'auto';
                popup.style.bottom = '100%';
                popup.style.marginBottom = '8px';
            } else {
                popup.style.top = '100%';
                popup.style.bottom = 'auto';
                popup.style.marginTop = '8px';
            }
        });
    });
});
