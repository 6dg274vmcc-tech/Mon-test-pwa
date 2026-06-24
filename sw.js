self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log("Service Worker prêt.");
});

// Écoute les messages envoyés depuis la page web
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SIMULER_PUSH') {
    
    // Attendre 5 secondes avant d'afficher la notification
    setTimeout(() => {
      self.registration.showNotification("Application Test", {
        body: "Ça fonctionne ! Ma PWA envoie des notifications.",
        icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png",
        vibrate: [200, 100, 200],
        badge: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
      });
    }, 5000); // 5000 millisecondes = 5 secondes
  }
});
