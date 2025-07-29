// menu.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidade do Menu Hambúrguer ---
    const mobileMenuButton = document.querySelector('[data-collapse-toggle="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Alterna a visibilidade da div do menu
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    } else {
        // J.A.R.V.I.S.: Este aviso será exibido no console do navegador se os elementos não forem encontrados.
        console.warn("J.A.R.V.I.S.: Elementos do menu móvel não encontrados. Verifique IDs e data-attributes no HTML.");
    }

    // Fechar o menu ao clicar em um link (se o menu estiver visível) E adicionar scroll suave
    // Esta parte do código agora lida com todos os links de navegação, independentemente de estarem no menu móvel ou desktop
    document.querySelectorAll('a[href^="#"]').forEach(anchor => { // Seleciona todos os links que começam com #
        anchor.addEventListener('click', function (event) {
            event.preventDefault(); // Impede o comportamento padrão de salto

            // Fecha o menu móvel se estiver aberto
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight; // Obtém a altura do cabeçalho
                const offsetPosition = targetElement.offsetTop - headerOffset; // Usar offsetTop para a posição relativa ao documento

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Habilita o scroll suave
                });
            }
        });
    });


    // --- Funcionalidade de Tradução (já existente) ---
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const lang = event.target.dataset.lang;
            applyLanguage(lang);
        });
    });
    // Aplicar idioma padrão ao carregar a página (Português do Brasil)
    applyLanguage('pt-BR');
});