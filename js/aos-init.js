// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Disable problematic animations on mobile
    if (window.innerWidth < 768) {
        const problematicElements = document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"], .nav-item[data-aos]');
        problematicElements.forEach(element => {
            const originalAos = element.getAttribute('data-aos');
            if (originalAos === 'fade-left' || originalAos === 'fade-right') {
                element.setAttribute('data-aos', 'fade-up');
            } else {
                element.removeAttribute('data-aos');
                element.removeAttribute('data-aos-delay');
            }
        });
    }
});