self.addEventListener("install", (event) => {
  console.log("[SW] Instalado");
});

self.addEventListener("fetch", (event) => {
  console.log("[SW] Interceptando petición:", event.request.url);
});
