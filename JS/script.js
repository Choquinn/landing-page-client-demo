// ==== VARIÁVEIS PRINCIPAIS ====
const header = document.getElementById("header");
const carousel = document.getElementById("carousel-inicio");
const lsobre = document.getElementById("links-sobre");
const imgSobre = document.getElementById("image-sobre");
const titleSobre = document.getElementById("sobre-titulo");
const textSobre = document.getElementById("sobre-texto");
const text = document.getElementById("h1-about");

// "Sobre" blocks
const abouts = [
  document.getElementById("about-1"),
  document.getElementById("about-2"),
  document.getElementById("about-3")
];

// "Planos" blocks
const bronze = document.getElementById("plano-bronze");
const prata = document.getElementById("plano-prata");
const ouro = document.getElementById("plano-ouro");
const diamante = document.getElementById("plano-diamante");

// Estados
let onFocusCarousel = 2;
let onFocusPlan = 3;
let onFocusTab = 1;
let onFocusTabPlan = 2;
let onFocusFaq = 0;
let scroll = true;
var menu = false;

// ==== HEADER ====
function alterHeader() {
  if(menu == true) {
    header.classList.toggle("noanim", window.scrollY > 0 && scroll == true);
    setTimeout(() => {
      menu = false;
    }, 2000);
  }else {
    header.classList.remove("noanim");
    header.classList.toggle("alter", window.scrollY > 0 && scroll == true);
  }
}

window.addEventListener("scroll", alterHeader);
alterHeader();

// ==== CARROSSEL SOBRE ====
function updateFocus() {
  const width = window.innerWidth;
  if(width >= 1024){
    const sel = document.querySelector(".carousel-div.sel");
    if (!sel) return;

    onFocusCarousel = +sel.id.replace(/\D/g, "");

    // Reset
    abouts.forEach((a) => {
      a.style.display = "none";
      a.style.maskImage = "";
    });

    const configs = {
      1: {
        show: [[0, 484, 322], [1, 378, 252]],
        masks: { 1: "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)" },
        text: `Monte sua loja de forma <span class="aquagreen">online e automática.</span>
            Aumente sua<span class="aquagreen"> eficiencia!</span>`
      },
      2: {
        show: [[0, 378, 252], [1, 484, 322], [2, 378, 252]],
        masks: {
          0: "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)",
          2: "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)"
        },
        text: `O sistema que você <span class="aquagreen">precisa,</span><br>
              com o suporte que você <span class="aquagreen">merece!</span>`
      },
      3: {
        show: [[1, 378, 252], [2, 484, 322]],
        masks: { 1: "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)" },
        text: `Integre-se aos principais <span class="aquagreen">E-commerces e Marketplaces</span>
              do mercado! Sua loja <span class="aquagreen">24/7</span>`
      }
    };

    const cfg = configs[onFocusCarousel];
    cfg.show.forEach(([idx, w, h]) => {
      abouts[idx].style.display = "flex";
      abouts[idx].style.width = w + "px";
      abouts[idx].style.height = h + "px";
      abouts[idx].style.maskImage = cfg.masks[idx] || "";
    });

    text.innerHTML = cfg.text;
    centralizarSel();
  }else{
    const sel = document.querySelector(".carousel-div.sel");
    if (!sel) return;

    onFocusCarousel = +sel.id.replace(/\D/g, "");

    // Reset
    abouts.forEach((a) => {
      a.style.display = "none";
      a.style.maskImage = "";
    });

    const configs = {
      1: {
        show: [[0, 484, 322], [1, 378, 252]],
        masks: { 1: "linear-gradient(to left, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)" },
        text: `Monte sua loja de forma <span class="aquagreen">online e automática.</span>
              Aumente sua <span class="aquagreen">eficiencia!</span>`
      },
      2: {
        show: [[0, 378, 252], [1, 484, 322], [2, 378, 252]],
        masks: {
          0: "linear-gradient(to right, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)",
          2: "linear-gradient(to left, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)"
        },
        text: `O sistema que você <span class="aquagreen">precisa,</span><br>
              com o suporte que você <span class="aquagreen">merece!</span>`
      },
      3: {
        show: [[1, 378, 252], [2, 484, 322]],
        masks: { 1: "linear-gradient(to right, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)" },
        text: `Integre-se aos principais <span class="aquagreen">E-commerces e Marketplaces</span>
              do mercado! Sua loja <span class="aquagreen">24/7</span>`
      }
    };

    const cfg = configs[onFocusCarousel];
    cfg.show.forEach(([idx, w, h]) => {
      abouts[idx].style.display = "flex";
      abouts[idx].style.width = w + "px";
      abouts[idx].style.height = h + "px";
      abouts[idx].style.maskImage = cfg.masks[idx] || "";
    });

    text.innerHTML = cfg.text;
    centralizarSel();
  }
}

document.querySelectorAll(".carousel-div").forEach((div) => {
  div.addEventListener("click", () => {
    if (div.classList.contains("sel")) return; // ❌ impede ação se já estiver selecionado

    document.querySelectorAll(".carousel-div").forEach((d) => d.classList.remove("sel"));
    div.classList.add("sel");
    updateFocus();
    centralizarSel();
  });
});

updateFocus();

function centralizarSel() {
  const sel = document.querySelector(".carousel-div.sel");
  if (!sel) return;

  const deslocamento = sel.offsetLeft - carousel.offsetWidth / 2 + sel.offsetWidth / 2;

  // Resetar animação antes de aplicar novamente
  sel.style.animation = "none";
  sel.offsetHeight; // força reflow para reiniciar animação

  // Centralizar carrossel
  carousel.style.transition = "transform 0.5s ease";
  carousel.style.transform = `translateX(${-deslocamento}px)`;

  // Aplicar animação de crescimento ao mesmo tempo
  sel.style.animation = "grow 0.6s ease forwards";
}


// ==== TABS SOBRE ====
function selectTab(tab, especial = false) {
  const tabs = document.querySelectorAll(".aba");
  tabs.forEach((t) => t.classList.remove("sel", "selEs"));
  tab.classList.add(especial ? "selEs" : "sel");
  lsobre.style.gap = especial ? "1px" : "16px";
  switchTab();
}

function selectTabEs(tab) {
  selectTab(tab, true);
}

function switchTab() {
  const sel = document.querySelector(".aba.sel, .aba.selEs");
  if (!sel) return;

  if (sel.id.toLowerCase().includes("sistema")) onFocusTab = 1;
  else if (sel.id.toLowerCase().includes("catalogo")) onFocusTab = 3;
  else onFocusTab = 2;

  const tabsConfig = {
    1: {
      title: "Sistema Simples e Intuitivo",
      text: "Usando nosso sistema ERP, você tem acesso a indicadores em<br>tempo real do seu negócio, um catálogo digital completamente<br>integrado e a mais de 20 relatórios gerenciais!",
      img: "Images/dashboard.png"
    },
    2: {
      title: "Integração Com Diversas Plataformas",
      text: "Aqui você transforma seu E-Commerce em uma máquina de<br>vendas! Mantenha total controle sobre seu estoque enquanto<br>vende nas principais plataformas do mercado",
      img: "Images/marketplaces.png"
    },
    3: {
      title: "Catálogo Digital Completo",
      text: "Com o Automaconn você pode dispor seus produtos sem qualquer<br>espécie de taxa ou comissão. Esqueça o Whatsapp e direct, agora<br>você pode automatizar as suas vendas!",
      img: "Images/store.png"
    }
  };

  const { title, text: txt, img } = tabsConfig[onFocusTab];
  titleSobre.innerHTML = title;
  textSobre.innerHTML = txt;
  imgSobre.src = img;
}

switchTab();

// ==== TABS PLANOS ====
function selectTabPlan(tab) {
  const tabs = document.querySelectorAll(".aba-p");
  tabs.forEach((t) => t.classList.remove("sel"));
  tab.classList.add("sel");
  switchTabPlan();
}

function switchTabPlan() {
  const sel = document.querySelector(".aba-p.sel");
  if (!sel) return;
  onFocusTabPlan = sel.id.toLowerCase().includes("mensal") ? 1 : 2;

  const precoLinkBronze = document.getElementById("link-bronze");
  const precoLinkPrata = document.getElementById("link-prata");
  const precoLinkOuro = document.getElementById("link-ouro");
  const precoLinkDiamante = document.getElementById("link-diamante");
  const precoPlan = document.querySelectorAll(".preco-plano");
  const subheaderPlan = document.querySelectorAll(".subheader");

  const planosConfig = {
    1: { // Mensal
      label: "/Mês",
      bronze: { preco: "R$ 99,90", link: "https://bit.ly/bronzemensal" },
      prata: { preco: "R$ 149,90", link: "https://bit.ly/pratamensal" },
      ouro: { preco: "R$ 199,90", link: "https://bit.ly/ouromensal" },
      diamante: { preco: "R$ 299,90", link: "https://bit.ly/4pTZfsw" }
    },
    2: { // Anual
      label: "/Mês no contrato anual",
      bronze: { preco: "R$ 79,90", link: "https://bit.ly/42KlW8n" },
      prata: { preco: "R$ 119,90", link: "https://bit.ly/46V3Ym6" },
      ouro: { preco: "R$ 159,90", link: "https://bit.ly/4gIQBZM" },
      diamante: { preco: "R$ 239,90", link: "https://bit.ly/3IfRlc8" }
    }
  };

  const cfg = planosConfig[onFocusTabPlan];

  precoPlan.forEach((div) => {
    const plano = div.dataset.plano;
    const { preco, link } = cfg[plano];
    div.innerHTML = preco;
    switch (plano) {
      case "bronze": precoLinkBronze.href = link; break;
      case "prata": precoLinkPrata.href = link; break;
      case "ouro": precoLinkOuro.href = link; break;
      case "diamante": precoLinkDiamante.href = link; break;
    }
  });

  subheaderPlan.forEach((div) => (div.innerHTML = cfg.label));
}

switchTabPlan();

// ==== CARROSSEL PLANOS ====
const tDivs = document.querySelectorAll(".bloco-plano");

tDivs.forEach((div) => {
  div.addEventListener("click", () => {
    if (div.classList.contains("sel")) return; // não anima se já selecionado

    tDivs.forEach((d) => d.classList.remove("sel"));
    div.classList.add("sel");
    updateTabFocus();
    centralizarSelPlan();
  });
  removeMask();
});

function removeMask(){
  const esq = document.getElementById("about-1");
  const dir = document.getElementById("about-3");

  esq.classList.remove("basesq");
  dir.classList.remove("basdir");
}

function updateTabFocus() {
  const sel = document.querySelector(".bloco-plano.sel");
  if (!sel) return;

  const id = sel.id.toLowerCase();
  onFocusPlan = id.includes("bronze") ? 1 : id.includes("prata") ? 2 : id.includes("ouro") ? 3 : 4;

  [bronze, prata, ouro, diamante].forEach((p) => {
    p.style.display = "none";
    p.style.maskImage = "";
  });

  const configs = {
    1: { show: [bronze, prata], masks: { prata: "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)" } },
    2: { show: [bronze, prata, ouro], masks: { bronze: "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)", ouro: "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)" } },
    3: { show: [prata, ouro, diamante], masks: { prata: "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)", diamante: "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)" } },
    4: { show: [ouro, diamante], masks: { ouro: "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)" } }
  };

  if(onFocusPlan != 3) {
    removeMaskPlan();
    removeOff();
  }

  const cfg = configs[onFocusPlan];
  cfg.show.forEach((el) => (el.style.display = "block"));
  Object.entries(cfg.masks).forEach(([elName, mask]) => {
    const el = { bronze, prata, ouro, diamante }[elName];
    el.style.maskImage = mask;
  });
}

function removeMaskPlan(){
  const esq = document.getElementById("plano-prata");
  const dir = document.getElementById("plano-diamante");

  esq.classList.remove("basesq");
  dir.classList.remove("basdir");
}

function removeOff(){
  const off = document.getElementById("plano-bronze");

  off.classList.remove("off");
}

updateTabFocus();

function centralizarSelPlan() {
  const sel = document.querySelector(".bloco-plano.sel");
  if (!sel) return;

  const carouselPlan = document.getElementById("blocos-planos");
  const deslocamento = sel.offsetLeft - carouselPlan.offsetWidth / 2 + sel.offsetWidth / 2;

  carouselPlan.style.transition = "transform 0.5s ease";
  carouselPlan.style.transform = `translateX(${-deslocamento}px)`;

  sel.style.animation = "shrink 0.3s ease forwards";
  sel.offsetWidth; // força reflow para reiniciar a animação
  sel.style.animation = "grow 0.3s ease forwards";
}

// ==== FAQ ====
function faqButton() {
  const fDivs = document.querySelectorAll(".faqbutton");
  const duvs = document.querySelector(".duvidas");
  
  fDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const isSel = div.classList.contains("sel");
      const duvItem = div.closest('.duvs');
      
      // Fecha todos os outros itens
      document.querySelectorAll('.faqbutton.sel').forEach(d => {
        if (d !== div) {
          d.classList.remove("sel");
          const otherItem = d.closest('.duvs');
          otherItem.classList.remove("active");
        }
      });
      
      // Alterna o item clicado
      div.classList.toggle("sel", !isSel);
      duvItem.classList.toggle("active", !isSel);
      
      // Atualiza a classe da seção duvidas
      const hasActive = document.querySelector('.duvs.active');
      duvs.classList.toggle("showing", !!hasActive);
    });
  });
}

function removeSelId() {
  document.querySelectorAll(".p").forEach((d) => d.classList.remove("selId"));
}

function initFAQ() {
  faqButton();
  
  // Fecha todos os itens ao carregar a página
  document.querySelectorAll('.duvs').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.faqbutton').forEach(btn => {
    btn.classList.remove('sel');
  });
}

document.addEventListener("DOMContentLoaded", initFAQ);

function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages([
  "Images/dashboard.png",
  "Images/marketplaces.png",
  "Images/store.png"
]);

document.documentElement.style.visibility = "hidden";

document.fonts.ready.then(() => {
    document.documentElement.style.visibility = "visible";
});

// Tablet
const button = document.getElementById("my-button");
const ibutton = document.getElementById("ibutton");     // atenção ao nome
const navL = document.querySelectorAll(".nav-l");       // seletores de classe precisam do ponto
const headerB = document.getElementById("header");
const nav = document.getElementById("nav-al");
const bButton = document.getElementById("button-h");
const inter = document.getElementById("interaction");
const secondsToHold=1;
let clickedMark = false;
let scrollPosition = 0;
var isDown=false;

// handler reutilizável para touchmove (para poder remover depois)
const preventTouchMove = (e) => e.preventDefault();
button.addEventListener('touchstart', () => {
  // simulando evento de retenção
  if (isDown == false){
    isDown = true;
    setTimeout(() => {
      if (isDown == true){
        menu = true;
      }
    }, (secondsToHold*1000));
  }
});

button.addEventListener('touchend', () => {
  isDown = false;
  menu = true;
});

button.addEventListener('click', () => {
  navL.forEach((div) => div.classList.toggle('show'));
  nav.classList.toggle('show');
  toggleButton();
});

function toggleButton() {
  if (!clickedMark) {
    // --- ABRIR MENU ---
    ibutton.className = "fas fa-times";
    clickedMark = true;

    // adiciona blur no fundo
    document.body.classList.add('blurred');
    headerB.classList.add('blurred');

    // salva posição atual do scroll
    scrollPosition = window.scrollY;

    // trava o scroll sem causar jump
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.top = `-${scrollPosition}px`;
    document.documentElement.style.left = '0';
    document.documentElement.style.right = '0';
    document.documentElement.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';

    // garante que header e inter fiquem visíveis
    headerB.style.position = 'fixed';
    headerB.style.top = '0';
    headerB.style.left = '0';
    headerB.style.width = '100%';
    headerB.style.zIndex = '5';

    inter.style.position = 'fixed';
    inter.style.top = '0';
    inter.style.left = '0';
    inter.style.width = '100%';

    document.addEventListener('touchmove', preventDefault, { passive: false });
    scroll = false;
    menu = true;
  } else {
    // --- FECHAR MENU ---
    ibutton.className = "fas fa-bars";
    clickedMark = false;

    // remove blur
    document.body.classList.remove('blurred');
    headerB.classList.remove('blurred');
    
    // restaura o body
    document.documentElement.style.position = '';
    document.documentElement.style.top = '';
    document.documentElement.style.left = '';
    document.documentElement.style.right = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.width = '';
    
    // restaura o scroll exatamente onde estava
    window.scrollTo(0, scrollPosition);
    
    headerB.style.animation = '';
    inter.style.position = '';
    
    document.removeEventListener('touchmove', preventDefault, { passive: false });
    
    alterHeader();
    scroll=true;
  }
}

function preventDefault(e) {
  e.preventDefault();
}

function checkScreen() {
  const width = window.innerWidth;

  switch (true) {
    case (width < 1024):
      bButton.className = "Bbutton-top";
    break;
    case (width >= 1024):
      bButton.className = "Bbutton";
    break;
  }
  updateFocus()
}

function closeSidebar(){
  nav.classList.toggle('show');
  clickedMark = true;
  toggleButton();
}

window.addEventListener('resize', checkScreen);

checkScreen();