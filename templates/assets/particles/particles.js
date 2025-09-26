// Particles.js initialization function
function initParticles(configUrl) {
    return new Promise(function (resolve, reject) {
        particlesJS.load('particles-js', configUrl, function () {
            console.log('particlesjs-config.json loaded successfully');
            resolve();
        });
    });
}