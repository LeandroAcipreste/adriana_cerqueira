import { initPreloader } from './src/preLoader/preLoader.js';
import { initHero } from './src/hero/hero.js';
import { initAbout } from './src/about/about.js';
import { initTestimonials } from './src/testimonials/testimonials.js';
import { initFooter } from './src/footer/footer.js';

// ==========================================
// INICIALIZAÇÃO CENTRAL (MAIN)
// ==========================================

// Força a página a sempre começar no topo ao atualizar (desativa o scroll automático do navegador)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
});

// Inicialização segura do Preloader e componentes
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => {
        initPreloader();
        initHero();
        initAbout();
        initTestimonials();
        initFooter();
    });
} else {
    initPreloader();
    initHero();
    initAbout();
    initTestimonials();
    initFooter();
}
