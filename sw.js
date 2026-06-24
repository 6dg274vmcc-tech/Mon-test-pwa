self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log("Service Worker prêt.");
});

// Écoute les messages envoyés depuis la page web
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SIMULER_PUSH') {
    
    // Attendre 5 secondes avant de déclencher
    setTimeout(() => {
      
      // 1. AJOUT DE LA PASTILLE (Mettre le chiffre 1 sur l'icône)
      if ('setAppBadge' in navigator) {
        navigator.setAppBadge(1).catch(err => {
          console.error("Erreur lors de l'ajout de la pastille:", err);
        });
      }

      // 2. Affichage de la notification
      self.registration.showNotification("Application Test", {
        body: "Regarde l'icône de l'application, il y a une pastille !",
        icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png",
        vibrate: [200, 100, 200],
        badge: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
      });

    }, 5000);
  }
});

// Événement quand l'utilisateur clique sur la notification
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  // EFFACER LA PASTILLE quand l'utilisateur ouvre la notification
  if ('clearAppBadge' in navigator) {
    navigator.clearAppBadge();
  }

  event.waitUntil(
    clients.openWindow('/')
  );
});
