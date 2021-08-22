const MENU = "show";
const SHADOW_HEADER = "scroll";
const CONTRAST = "contrast";

// DOM ELEMENTS
const header = document.querySelector("#mainHeader");
const nav = document.querySelector("#mainHeader nav");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const backToTopButton = document.querySelector(".back-to-top");
const links = document.querySelectorAll("#menu ul li a");

function toggleMenu() {
  nav.classList.toggle(MENU);
}

// removendo o menu quando clicar em alguma opção
function removeMenu() {
  nav.classList.remove(MENU);
}

const Libs = {
  // Testimonials carousel slider -> swiper lib
  swiper: new Swiper('.swiper-container', {
      // todas as propriedades estão na API do swiper
      slidePerView: 1,
      pagination: {
        el: '.swiper-pagination',
      },
      mousewheel: true, // rodinha do mouse
      keyboard: true,
  }),

  //ScrollReveal, mostrar os elementos quando der scroll ná página
  scrollRevealLib: {
    scrollReveal: ScrollReveal({ // ScrollReveal(options I want to use instead of the defaults)
      origin: 'top',
      distance: '30px',
      duration: 700,
      reset: true,
    }),

    startReveal() {
      this.scrollReveal.reveal(
        `#home img, #home .text,
        #about img, #about .text,
        #services header, #services .card,
        #testimonials header, #testimonials .testimonials,
        #contact .text, #contact .links,
        footer .brand, footer .social`,

        { interval: 100 },
      )
    }
  }
}

// sombra no header assim que o scrool tive rolando
function changeHeader() {
  const navHeight = header.offsetHeight; // deslocamento da altura do header, o tamanho do header incluindo borda e padding

  if(window.scrollY > navHeight) { // se o scrool da página passou a altura do header
    header.classList.add(SHADOW_HEADER);
  } else {
    header.classList.remove(SHADOW_HEADER);
  }
}

// back to top button
function backToTop() {
  if(window.scrollY >= 700) {
    backToTopButton.classList.add(MENU);
  } else {
    backToTopButton.classList.remove(MENU);
  }
}

function changeContrastBackToTopButton() {
  // Mudo a cor do button quando o user chegar no footer
  const scrollMain = main.scrollHeight;
  const scrollFooter = footer.scrollHeight;
  const scrollArrivedInFooter = scrollMain - scrollFooter;

 // Workaround mas ficou massa hahahaha
  if(window.scrollY >= scrollArrivedInFooter) {
    backToTopButton.classList.add(CONTRAST);
  } else {
    backToTopButton.classList.remove(CONTRAST);
  }
}

/* WHEN SCROLL */
function scrollEffects() {
  window.addEventListener("scroll", () => {
    changeHeader();
    backToTop();
    changeContrastBackToTopButton();
  });
}

function init() {
  scrollEffects();
  Libs.scrollRevealLib.startReveal();
}

init();