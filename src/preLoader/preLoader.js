import gsap from 'gsap';

// ==========================================
// LÓGICA DO PRELOADER (CINEMATIC REVEAL)
// ==========================================
export function initPreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const title = document.getElementById('welcome-title');
    const words = document.querySelectorAll('#welcome-phrase span');

    if (!preloader || !title || words.length === 0) return;

    const tl = gsap.timeline();

    // 1. O "Bem-vinda." aparece majestoso com um blur cinematográfico (Awwwards Style)
    tl.fromTo(title, {
        opacity: 0,
        y: 30,
        filter: "blur(12px)"
    }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
        delay: 0.3
    });

    // 2. A frase "Que bom ter você aqui." surge em cascata logo abaixo
    tl.fromTo(words, {
        opacity: 0,
        y: 15
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15, // Cascata mais rápida e fluida
        ease: "power2.out"
    }, "-=0.8"); // Inicia antes do Bem-vinda terminar de entrar

    // 3. Tempo de contemplação
    tl.to({}, { duration: 2.0 });

    // 4. Tudo sobe e desaparece com elegância
    tl.to([title, ...words], {
        opacity: 0,
        y: -30,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.in"
    });

    // 5. O preloader dissolve revelando a página
    tl.to(preloader, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
            document.body.style.overflow = 'auto';
            
            if(mainContent) {
                gsap.to(mainContent, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 1.5,
                    onComplete: () => {
                        // Avisa outros componentes (ex: Hero) que o preloader terminou
                        window.dispatchEvent(new CustomEvent('preloaderComplete'));
                    }
                });
            }
        }
    }, "-=0.2");
}
