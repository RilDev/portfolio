const cacheName = 'v0.0.1';
const filesToCache = [
    './',
    './index.html',
    './images/github.svg',
    './images/linkedin.svg',
    './images/icons/apple-touch-icon.png',
    './images/icons/favicon-32x32.png',
    './images/icons/favicon-16x16.png',
    './images/open-in-new-blue.svg',
    './images/open-in-new-white.svg',
    './images/selfy.svg',
    './images/youtube.svg',
    './scripts/cookies.js',
    './styles/main.css',
];

// install service worker and cache all the apps content
self.addEventListener('install', event => {
    const preCache = async() => {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
    }

    event.waitUntil(preCache());
});

// serve cached content when offline
self.addEventListener('fetch', event => {
    const cachedResponse = async event => {
        const cache = await caches.match(event.request);
        return cache || fetch(event.request);
    };

    event.respondWith(cachedResponse(event));
})