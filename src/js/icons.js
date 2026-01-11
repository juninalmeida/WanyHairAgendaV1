const LUCIDE_SRC = "https://unpkg.com/lucide@latest";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(script);
  });
}

async function initIcons() {
  try {
    if (!window.lucide) {
      await loadScript(LUCIDE_SRC);
    }

    window.lucide?.createIcons?.();
  } catch (err) {}
}

document.addEventListener("DOMContentLoaded", initIcons);
