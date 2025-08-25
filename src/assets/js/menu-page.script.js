document.fonts.ready.then(() => {
    ScrollReveal().reveal('main article', {
        interval: 300,
        origin: 'bottom',
        distance: '100px',
        duration: 1000,
        reset: false,
        once: false
    });
});