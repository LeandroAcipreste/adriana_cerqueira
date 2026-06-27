import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// HERO SECTION — JS
// ==========================================

export function initHero() {
    const hero = document.querySelector('.hero');
    const heroVideo = document.getElementById('heroVideo');
    if (!hero || !heroVideo) return;

    // 1. O vídeo só deve tocar pela primeira vez APÓS o término do preloader
    window.addEventListener('preloaderComplete', () => {
        heroVideo.currentTime = 0; // Garante que comece do início
        heroVideo.play().catch(e => console.warn("Autoplay prevenido pelo navegador:", e));
    });

    // 2. Toda vez que o usuário voltar a rolar a página para cima (entrar na Hero novamente),
    // o vídeo recomeça a tocar.
    ScrollTrigger.create({
        trigger: hero,
        start: "top bottom", // Quando o topo da Hero entra na base da tela (voltando a subir)
        onEnterBack: () => {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(e => console.warn("Autoplay prevenido:", e));
        },
        // Opcional: pausar o vídeo quando ele sai da tela para economizar processamento
        onLeave: () => {
            heroVideo.pause();
        }
    });
}
