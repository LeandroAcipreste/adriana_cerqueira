import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Função auxiliar para dividir texto preservando as palavras inteiras (evita quebrar no meio)
function splitTextNodes(element) {
    if (!element) return;
    const processNode = (node) => {
        if (node.nodeType === 3) { // Text node
            const text = node.nodeValue;
            if (text.trim() === '') return;
            
            const fragment = document.createDocumentFragment();
            // Divide por espaços mantendo os espaços no array
            const words = text.split(/(\s+)/);
            
            words.forEach(wordStr => {
                if (wordStr.trim() === '') {
                    // Mantém os espaços naturais
                    fragment.appendChild(document.createTextNode(wordStr));
                } else {
                    // Envolve a palavra inteira em um bloco para não quebrar de forma feia
                    const wordSpan = document.createElement('span');
                    wordSpan.style.display = 'inline-block';
                    wordSpan.style.whiteSpace = 'nowrap';
                    
                    for (let i = 0; i < wordStr.length; i++) {
                        const charSpan = document.createElement('span');
                        charSpan.className = 'split-char';
                        charSpan.style.display = 'inline-block';
                        charSpan.style.opacity = '0';
                        charSpan.style.transform = 'translateX(-15px) rotateY(-20deg)';
                        charSpan.textContent = wordStr[i];
                        wordSpan.appendChild(charSpan);
                    }
                    fragment.appendChild(wordSpan);
                }
            });
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === 1 && node.nodeName !== 'BR') {
            node.style.display = 'inline-block';
            node.style.whiteSpace = 'nowrap'; // Impede tags como <em> de quebrarem ao meio
            Array.from(node.childNodes).forEach(processNode);
        }
    };
    Array.from(element.childNodes).forEach(processNode);
}

// ==========================================
// ABOUT SECTION — CINEMATIC SCRUB ANIMATION
// ==========================================
export function initAbout() {
    const section = document.getElementById('about');
    if (!section || section.dataset.initialized) return;
    section.dataset.initialized = 'true'; // Impede inicialização dupla

    const bgText = section.querySelector('.about-bg-text');
    const photoFrame = section.querySelector('.about-photo-frame');
    const photo = section.querySelector('.about-photo-frame img');
    const badge = section.querySelector('.about-badge');
    const divider = section.querySelector('.about-divider');
    const label = section.querySelector('.about-label');
    const heading = document.getElementById('splitHeading');
    const bodyTexts = section.querySelectorAll('.about-body');
    const quote = section.querySelector('.about-quote');
    const tags = section.querySelector('.about-tags');
    const cta = section.querySelector('.about-cta');

    // 1. Configuração Inicial
    gsap.set(photoFrame, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(photo, { scale: 1.2 });
    gsap.set([label, ...bodyTexts, quote, tags, cta], { opacity: 0, y: 30 });

    // Prepara o título dividindo letra por letra
    if (heading) {
        splitTextNodes(heading);
    }
    const chars = heading ? heading.querySelectorAll('.split-char') : [];

    // 2. Animação da Imagem e Background (Dispara uma vez ou via scrub)
    if (bgText) {
        gsap.to(bgText, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            },
            yPercent: 20,
            ease: 'none'
        });
    }

    if (photo) {
        gsap.to(photo, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            },
            yPercent: -15,
            ease: 'none'
        });
    }

    // A foto e a badge aparecem assim que entram na tela (sem scrub, para impacto imediato)
    ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        once: true,
        onEnter: () => {
            if (photoFrame) {
                photoFrame.classList.add('revealed');
                gsap.to(photoFrame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' });
                gsap.to(photo, { scale: 1.0, duration: 2.5, ease: 'power2.out' });
            }
            if (badge) badge.classList.add('revealed');
            if (divider) divider.classList.add('revealed');
        }
    });

    // 3. ANIMAÇÃO DE TEXTO PREMIUM COM SCRUB 
    // Todos os elementos da direita surgem sincronizados com o rolar do mouse
    const scrubTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 70%',   // Inicia quando o topo da seção chega a 70% da tela
            end: 'bottom 90%',  // Termina quando o fim da seção chega perto do fim da tela
            scrub: 1.5          // Suavidade extrema no scroll
        }
    });

    // Label surge primeiro
    if (label) {
        scrubTl.to(label, { opacity: 1, y: 0, ease: 'power2.out' });
    }

    // Título aparecendo letra por letra da esquerda para a direita (stagger)
    if (chars.length > 0) {
        scrubTl.to(chars, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            stagger: 0.05,
            ease: 'power3.out'
        }, "-=0.3");
    }

    // Parágrafos do corpo
    if (bodyTexts.length > 0) {
        scrubTl.to(bodyTexts, {
            opacity: 1,
            y: 0,
            stagger: 0.3, // Um após o outro
            ease: 'power2.out'
        }, "-=0.2");
    }

    // Citação flutua vindo do lado esquerdo
    if (quote) {
        gsap.set(quote, { x: -30, opacity: 0 }); // override do initial set
        scrubTl.to(quote, {
            opacity: 1,
            x: 0,
            ease: 'power3.out'
        }, "-=0.1");
    }

    // Tags de especialidade aparecem em cascata
    if (tags) {
        const tagItems = tags.querySelectorAll('.about-tag');
        if (tagItems.length > 0) {
            gsap.set(tagItems, { opacity: 0, y: 15 });
            gsap.set(tags, { opacity: 1, y: 0 }); // Garante que o container esteja visível
            
            scrubTl.to(tagItems, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'back.out(1.7)' // Efeito elástico sutil e premium
            }, "-=0.2");
        }
    }

    // Botão final
    if (cta) {
        scrubTl.to(cta, {
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        }, "-=0.2");
    }
}
