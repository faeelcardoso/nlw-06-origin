const MENU = "show";
const SHADOW_HEADER = "scroll";
const CONTRAST = "contrast";
const MENU_ACTIVE = "active";

// DOM ELEMENTS
const header = document.querySelector("#mainHeader");
const nav = document.querySelector("#mainHeader nav");
const main = document.querySelector("main");
const contact = document.querySelector("#contact");
const footer = document.querySelector("footer");
const backToTopButton = document.querySelector(".back-to-top");
const links = document.querySelectorAll("#menu ul li a");
const sections = document.querySelectorAll("main section[id]");

function toggleMenu() {
  nav.classList.toggle(MENU);
}

// removendo o menu quando clicar em alguma opção
function removeMenu() {
  nav.classList.remove(MENU);
}

const Libs = {
  // Testimonials carousel slider -> swiper lib
  swiper: new Swiper('.swiper', {
      // todas as propriedades estão na API do swiper
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination'
      },
      mousewheel: true,
      keyboard: true,
      breakpoints: {
        767: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        }
      }
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
  const scrollContact = contact.scrollHeight;
  const scrollFooter = footer.scrollHeight;
  const scrollArrivedInFooter = scrollMain - (scrollFooter + scrollContact);

 // Workaround mas ficou massa hahahaha
  if(window.scrollY >= scrollArrivedInFooter) {
    backToTopButton.classList.add(CONTRAST);
  } else {
    backToTopButton.classList.remove(CONTRAST);
  }
}

function activateMenuOnSection() {
  // checkpoint = decolamento Y da janela + metade da altura da janela
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 2;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    const checkpointStart = checkpoint >= sectionTop;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

    if(checkpointStart && checkpointEnd) {
      document.querySelector("nav ul li a[href*="+sectionId+"]").classList.add(MENU_ACTIVE);
    } else {
      document.querySelector("nav ul li a[href*="+sectionId+"]").classList.remove(MENU_ACTIVE);
    }
  });
}

/* WHEN SCROLL */
function scrollEffects() {
  window.addEventListener("scroll", () => {
    changeHeader();
    backToTop();
    changeContrastBackToTopButton();
    activateMenuOnSection();
  });
}

function init() {
  scrollEffects();
  Libs.scrollRevealLib.startReveal();
}

init();