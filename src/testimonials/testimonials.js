import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTestimonials() {
    const section = document.getElementById('testimonials');
    if (!section) return;

    const bgImage = section.querySelector('.testimonials-bg');
    const headerElements = section.querySelectorAll('.testimonials-label, .testimonials-title');
    const cards = section.querySelectorAll('.testimonial-card');

    // 1. Efeito Parallax suave no Background Imagem usando GSAP
    if (bgImage) {
        gsap.to(bgImage, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom", 
                end: "bottom top",
                scrub: true
            }
        });
    }

    // 2. Animação de revelação do cabeçalho
    if (headerElements.length > 0) {
        gsap.from(headerElements, {
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // 3. Animação sofisticada e em cascata dos Cards (3D Reveal)
    if (cards.length > 0) {
        // Estado inicial
        gsap.set(cards, { 
            y: 100, 
            opacity: 0, 
            rotationX: 15, // Leve rotação 3D
            transformPerspective: 1000 
        });

        // Trigger da animação
        ScrollTrigger.batch(cards, {
            onEnter: batch => {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.5,
                    stagger: 0.15, // Cascata elegante
                    ease: "expo.out",
                    overwrite: true
                });
            },
            // Descomente abaixo se quiser que a animação aconteça novamente ao subir a página
            // onLeaveBack: batch => gsap.set(batch, { y: 100, opacity: 0, rotationX: 15 }),
            start: "top 80%"
        });
    }
}
