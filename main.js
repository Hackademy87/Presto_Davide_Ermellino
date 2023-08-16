//GRUPPO CATTURA
let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector("#logo");
let primonumero = document.querySelector("#primonumero");
let secondonumero = document.querySelector("#secondonumero");
let terzonumero = document.querySelector("#terzonumero");

window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;

  if (scrolled > 0) {
    changeNavbar(
      "navbar-blur",
      "Logo_baltic",
      "var(--colorBaltic)",
      "var(--colorSunSet)"
    );
  } else {
    navbar.classList.remove("navbar-blur");
    changeNavbar(
      "navbar-custom",
      "Logo_ice",
      "var(--colorIce)",
      "var(--colorSunSet)"
    );
  }
});
//1. PASSAGGIO: CREARE UNA FUNZIONE
//2. INCOLLARCI L'INTERA IF
//3. AL POSTO DEI VALORI mettere i parametri
//4. ANDIAMO A SOSTITUIRE IL TUTTO RICHIAMANDO LA FUNZIONE ALL'INTERNO DELLA NOSTRA IF
function changeNavbar(background, imgLogo, color1, color2) {
  navbar.classList.add(background);
  logo.src = `http://127.0.0.1:5500/Media/${imgLogo}.png`;
  links.forEach((link) => {
    link.style.color = color1;
    link.addEventListener("mouseover", () => {
      link.style.color = color1;
      link.style.borderBottom = ` 2px solid ${color2}`;
    });
    link.addEventListener("mouseleave", () => {
      link.style.color = color1;
      link.style.borderBottom = "none";
    });
  });
}

//CHIAMATA ASICRONA: FUNZIONI CHE RESTANO IN ATTESA CHE TUTTO IL CODICE VENGA ESEGUITO, POI SCATTANO

//setInterval(); crea un loop infinito come i cicli scritti male, ma non blocca l'esecuzione del codice e non crasha il nostro browser
//clearInterval(); : blocca un intervallo
//IntersectionObserver(): un oggetto che viene fornito dal browser, si occupa di far scattare delle funzioni/callback nel momento in cui viene intersecato un elemento
let check = true;
let observer = new IntersectionObserver((entris) => {
  entris.forEach((entry) => {
    if (entry.isIntersecting && check) {
      createInterval(primonumero, 1557, 5);
      createInterval(secondonumero, 2977, 1);
      createInterval(terzonumero, 557, 15);
      check = false;
    }
  });
});
observer.observe(primonumero);

function createInterval(elemento, number, tempo) {
  let counter = 0;
  let interval = setInterval(() => {
    if (counter < number) {
      counter++;
      elemento.innerHTML = counter;
    } else {
      clearInterval(interval);
    }
  }, tempo);
}

// sezione swiper js
const swiper = new Swiper(".swiper", {
  // Optional parameters
  // direction: 'vertical',
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
});



let reviews = [
  { nome: "Davide", descrizione: "blabla" },

  { nome: "Elena", descrizione: "blabla" },

  { nome: "Luca", descrizione: "blabla" },

  { nome: "Giulia", descrizione: "blabla" },

  { nome: "Matteo", descrizione: "blabla" },

  { nome: "Sofia", descrizione: "blabla" },

  { nome: "Andrea", descrizione: "blabla" },

  { nome: "Laura", descrizione: "blabla" },

  { nome: "Alessio", descrizione: "blabla" },

  { nome: "Martina", descrizione: "blabla" },

];

let swiperWrapper = document.querySelector("#swiperWrapper");

function addReview() {
  swiperWrapper.innerHTML = "";
  reviews.forEach((review) => {
    let div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
  <div class="card" style="width: 18rem;">
      <div class="card-body">
          <h5 class="card-title">${review.nome}</h5>
          <p class="card-text">${review.descrizione}</p>
      </div>
  </div>
  `;
    swiperWrapper.appendChild(div);
    swiper.update();
  });
}
addReview();
let nomeInput = document.querySelector('#nomeInput');
let reviewInput = document.querySelector('#reviewInput');
let btnReview = document.querySelector('#btn-review');

btnReview.addEventListener('click',()=>{
  if(nomeInput.value && reviewInput.value){
    reviews.push({nome : nomeInput.value , descrizione :reviewInput.value});
    nomeInput.innerHTML='';
    reviewInput.innerHTML='';
  }else if(!nomeInput.value && !reviewInput.value)
  {
    alert('NESSUN DATO INSERITO');

  }else if(!reviewInput.value && nomeInput.value){
    alert('RECENSIONE NON INSERITA');
  }else{
   alert('NOME NON INSERITO');
  }
  addReview();
  console.log(reviews);

  swiper.update();

})