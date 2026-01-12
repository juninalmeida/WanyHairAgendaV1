const LOADER_MIN_MS = 2000;
const LOADER_REMOVE_FALLBACK_MS = 1000;

function removeLoaderSafely() {
  const loader = document.getElementById("loader-screen");
  if (!loader) return;
  loader.remove();
}

function hideLoader() {
  document.body.classList.add("is-loaded");
  document.body.classList.remove("is-loading");

  const loader = document.getElementById("loader-screen");
  if (!loader) return;

  loader.addEventListener("transitionend", removeLoaderSafely, { once: true });
  setTimeout(removeLoaderSafely, LOADER_REMOVE_FALLBACK_MS);
}

document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  setTimeout(hideLoader, LOADER_MIN_MS);
});
