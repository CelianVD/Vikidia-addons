// inject.js
chrome.storage.sync.get("scriptsEnabled", function (data) {
  const enabled = data.scriptsEnabled || {};

  // Vérifie chaque script
  if (enabled.ajoutEbauche) {
    scriptAjoutEbauche(); // Appelle la fonction définie dans scripts/ajoutEbauche.js
  }

  // d'autrez sxript 
});
