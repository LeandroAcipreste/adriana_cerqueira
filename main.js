import { initPreloader } from './src/preLoader/preLoader.js';
import { initHero } from './src/hero/hero.js';
import { initAbout } from './src/about/about.js';
import { initTestimonials } from './src/testimonials/testimonials.js';

// ==========================================
// INICIALIZAÇÃO CENTRAL (MAIN)
// ==========================================

// Força a página a sempre começar no topo ao atualizar (desativa o scroll automático do navegador)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Inicialização segura do Preloader e componentes
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => {
        initPreloader();
        initHero();
        initAbout();
        initTestimonials();
    });
} else {
    initPreloader();
    initHero();
    initAbout();
    initTestimonials();
}
