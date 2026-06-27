import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// FOOTER SECTION — JS
// ==========================================
export function initFooter() {
    const footer = document.getElementById('footer');
    if (!footer || footer.dataset.initialized) return;
    footer.dataset.initialized = 'true'; // Safeguard

    const bgLetter = footer.querySelector('.footer-bg-letter');
    const logo = footer.querySelector('.footer-logo');
    const subtitle = footer.querySelector('.footer-subtitle');
    const cols = footer.querySelectorAll('.footer-col');
    const divider = footer.querySelector('.footer-divider');
    const bottomElements = footer.querySelectorAll('.footer-copyright, .footer-back-top');
    const backToTopBtn = document.getElementById('backToTop');

    // 1. Efeito Parallax sutil na letra gigante do fundo
    if (bgLetter) {
        gsap.to(bgLetter, {
            scrollTrigger: {
                trigger: footer,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 1.5
            },
            yPercent: -20,
            ease: 'none'
        });
    }

    // 2. Animação de entrada dos elementos do footer
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: 'top 85%', // Dispara quando o topo do footer estiver a 85% da altura da tela
            once: true
        }
    });

    // Reset inicial
    gsap.set([logo, subtitle, ...cols, ...bottomElements], { opacity: 0, y: 30 });
    gsap.set(divider, { width: '0%' });

    // Anima a Logo e Subtítulo
    if (logo) {
        tl.to(logo, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.6");
    }

    // Anima as colunas de links em cascata (stagger)
    if (cols.length > 0) {
        tl.to(cols, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        }, "-=0.4");
    }

    // Expande a linha divisória do centro para as bordas
    if (divider) {
        tl.to(divider, {
            width: '100%',
            duration: 1.2,
            ease: 'expo.inOut'
        }, "-=0.4");
    }

    // Anima os créditos finais
    if (bottomElements.length > 0) {
        tl.to(bottomElements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        }, "-=0.6");
    }

    // 3. Lógica do botão "Voltar ao topo"
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
