const UNICORN_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(script);
  });
}

async function initUnicornStudio() {
  try {
    if (window.UnicornStudio?.isInitialized) return;

    window.UnicornStudio = window.UnicornStudio || { isInitialized: false };

    await loadScript(UNICORN_SRC);

    if (window.UnicornStudio?.init && !window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  } catch (err) {}
}

document.addEventListener("DOMContentLoaded", initUnicornStudio);
