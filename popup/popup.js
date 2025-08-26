document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("ajoutEbauche");

  // Charger état actuel
  chrome.storage.sync.get("scriptsEnabled", (data) => {
    const enabled = data.scriptsEnabled || {};
    checkbox.checked = !!enabled.ajoutEbauche;
  });

  // Sauvegarder quand on change
  checkbox.addEventListener("change", () => {
    chrome.storage.sync.get("scriptsEnabled", (data) => {
      const enabled = data.scriptsEnabled || {};
      enabled.ajoutEbauche = checkbox.checked;
      chrome.storage.sync.set({ scriptsEnabled: enabled });
    });
  });
});
