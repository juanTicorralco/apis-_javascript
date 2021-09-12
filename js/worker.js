let version = "version 2";

self.addEventListener("install", e => {
    caches.open(version).then(cache => {
        cache.addAll(["../index.html", "../css/style.css", "main.js"]).then(res => {
            console.log("informacion cacheada");
        }).catch(e => {
            console.log(e);
        })
    })
})

self.addEventListener("activate", () => {
    caches.keys().then(key => {
        return Promise.all(
            key.map(cache => {
                if (cache !== version) {
                    console.log("cache antiguo, eliminado");
                    return caches.delete(cache);
                }
            })
        );
    });
});

self.addEventListener("fetch", e => {
    e.respondWith(async() => {
        const respuestaCache = await caches.match(e.request);
        if (respuestaCache) return respuestaCache;
        return e.request;
    });
});