module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,html,png,js,css,jpg,svg}'],
  swDest: 'build/sw.js',
  importWorkboxFrom: 'local',
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
  runtimeCaching: [
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: new RegExp(
        '^https://wsdssot-ap-prd-linux-backend.azurewebsites.net/',
      ),
      // Apply a network-first strategy.
      handler: 'StaleWhileRevalidate',
      options: {
        // Use a custom cache name for this route.
        cacheName: 'ssot-api-prod-cache',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60,
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
        },
        matchOptions: {
          ignoreSearch: false,
        },
      },
    },
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: new RegExp(
        '^https://wsdssot-ap-dev-linux.azurewebsites.net/',
      ),
      // Apply a network-first strategy.
      handler: 'StaleWhileRevalidate',
      options: {
        // Use a custom cache name for this route.
        cacheName: 'ssot-api-dev-cache',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60,
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
        },
        matchOptions: {
          ignoreSearch: false,
        },
      },
    },
  ],
};
