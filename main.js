const MENU = "show";
const SHADOW_HEADER = "scroll";

const nav = document.querySelector("#mainHeader nav");
const allToggle = document.querySelectorAll("nav .toggle");
const links = document.querySelectorAll("#menu ul li a");
const header = document.querySelector("#mainHeader");

// adicionando e removendo o menu
allToggle.forEach(toggle => {
  toggle.addEventListener("click", () => {
    nav.classList.toggle(MENU);
  });
});

// removendo o menu quando clicar em alguma opção
links.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove(MENU);
  });
});

// sombra no header assim que o scrool tive rolando
const navHeight = header.offsetHeight; // deslocamento da altura do header, o tamanho do header incluindo borda e padding

window.addEventListener("scroll", () => {
  if(window.scrollY > navHeight) { // se o scrool da página passou a altura do header
    header.classList.add(SHADOW_HEADER);
  } else {
    header.classList.remove(SHADOW_HEADER);
  }
});