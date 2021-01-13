// register service worker
// check if service worker available in navigator
if ('serviceWorker' in navigator) {
    // load service worker
    window.addEventListener('load', async() => {
        try {
            const registration = await navigator.serviceWorker.register('./service-worker.js');
        } catch (error) {
            console.log('Failure: ', error)
        }
    })
}