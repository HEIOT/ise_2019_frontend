if (workbox) {
    workbox.core.setCacheNameDetails({ prefix: 'HEIOT' })

    /**
     * The workboxSW.precacheAndRoute() method efficiently caches and responds to
     * requests for URLs in the manifest.
     * See https://goo.gl/S9QRab
     */
    self.__precacheManifest = [].concat(self.__precacheManifest || [])
    workbox.precaching.suppressWarnings()
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

    /**
     * Cache Api Responses
     */
    workbox.routing.registerRoute(
        new RegExp('.*/api/devicemanagement/.*'),
        new workbox.strategies.NetworkFirst({
            cacheName: 'api-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    )
}
