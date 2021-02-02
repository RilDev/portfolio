const cacheName = 'v0.0.3';
const filesToCache = [
    '/',
    'index.html',
    'images/icons/apple-touch-icon.png',
    'images/icons/favicon-32x32.png',
    'images/icons/favicon-16x16.png',
    'images/portfolio/gh-packages.png',
    'images/portfolio/code-for-faith.png',
    'images/portfolio/rildev-s-website.png',
    'images/github.svg',
    'images/linkedin.svg',
    'images/open-in-new-blue.svg',
    'images/open-in-new-white.svg',
    'images/portrait.svg',
    'images/portrait1.svg',
    'images/youtube.svg',
    'scripts/cookies.js',
    'styles/main.css',
];

// install service worker and cache all the apps content
self.addEventListener('install', event => {
    const preCache = async() => {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
    }

    // imediately activate the service worker when updated
    self.skipWaiting();

    event.waitUntil(preCache());
});

// delete outdated cache on cacheName update
self.addEventListener('activate', event => {
    const deleteOutdatedCaches = async() => {
        const keys = await caches.keys();
        return Promise.all(keys
            .filter(key => key !== cacheName)
            .map(key => caches.delete(key)));
    }

    event.waitUntil(deleteOutdatedCaches());
});

// serve cached content when offline
self.addEventListener('fetch', event => {
    const cachedResponse = async event => {
        const cache = await caches.match(event.request);
        return cache || fetch(event.request);
    };

    event.respondWith(cachedResponse(event));
});