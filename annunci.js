// 1. CONNETTTERMI AL JSON E PORTARLO NEL MIO PROGETTO TRAMITE LA FETCH
//2. CONVERTIRE IL JSON IN UN OGGETTO JS
//3. UTILIZZARE L'OGGETTO

let productCardWrapper = document.querySelector("#productCardWrapper");
let categoryCheckWrapper = document.querySelector("#categoryCheckWrapper");
let price = document.querySelector("#price");
let priceFilter = document.querySelector("#priceFilter");
let searchProduct = document.querySelector("#searchProduct");
let btnPrice = document.querySelector("#btnPrice");


fetch("annunci.json")
  .then((responsability) => responsability.json())
  .then((data) => {

    mostraCard(data);

    function setCategories() {
      // inserimento categorie dei prodotti all'inetrno del filtro prodotti per categoria
      let categories = [];
      // pusho le categorie dell'array di oggetti 'data' in un altro array
      data.forEach((product) => {
        if (!categories.includes(product.category)) {
          categories.push(product.category);
        }
      });
      // creo delle radio per ogni categoria e le appendo al wrapper

      categories.forEach((category) => {
        let div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
    <input class="form-check-input" type="radio" name="flexRadioDefault" id=${category}>
    <label class="form-check-label" for=${category}>
      ${category}
    </label>
    `;
        categoryCheckWrapper.appendChild(div);
      });
    }
    setCategories();

    let radios = document.querySelectorAll(".form-check-input");

    function filterCategory(array) {
      let check = Array.from(radios).find((button) => button.checked);
      let categoria = check.id;
      let filter = data.filter((annuncio) => annuncio.category == categoria);
      if (categoria == "tuttiProdotti") {
        return array;
      } else {
        return filter;
      }
    }

    radios.forEach((button) => {
      button.addEventListener("change", () => {
        setInitialPrice(filterCategory(data));

        globalFilter();
      });
    });

    // filtro prezzo
    function setInitialPrice(array) {
      priceFilter.max = Math.round(array[0].price);
      priceFilter.value = priceFilter.max;
      price.innerHTML = "$" + priceFilter.value;
    }
    setInitialPrice(filterCategory(data));
    priceFilter.addEventListener("input", () => {
      price.innerHTML = "$" + priceFilter.value;
    });
    btnPrice.addEventListener("click", ()=>{
      globalFilter();
    })
    function filterPrice(array) {
      let filter = array.filter(
        (articolo) => +articolo.price <= +priceFilter.value
      );
      return filter;
    }
    // finefiltro prezzo

    // filtro parola
    function filterWord(array) {
      let filter = array.filter((annuncio) =>
        annuncio.name.toLowerCase().includes(searchProduct.value.toLowerCase())
      );
      return filter;
    }
    searchProduct.addEventListener("input", () => {
      globalFilter();
    });
    // fine filtro parola

    // filtro globale
    function globalFilter() {
      let filterCat = filterCategory(data);
      let filterPr = filterPrice(filterCat);
      let filterWo = filterWord(filterPr);
      mostraCard(filterWo);
      if (productCardWrapper.innerHTML == "") {
        let p = document.createElement("p");
        p.innerHTML = "Nessun prodotto corrisponde alla tua ricerca";
        productCardWrapper.appendChild(p);
      }
    }

    // funzione per creare le card del prodotto
    function mostraCard(array) {
      array.sort((a, b) => b.price - a.price);
      productCardWrapper.innerHTML = "";
      array.forEach((prodotto) => {
        let div = document.createElement("div");
        div.classList.add("card", "card-custom", "mb-3");
        div.innerHTML = `
            <div class="card-body d-flex flex-column justify-content-around">
                <h5 class="card-title text-center">${prodotto.name}</h5>
                <p class='text-center'>prezzo: ${prodotto.price}€</p>
                <a href="#" class="btn btn-primary">acquista</a>
            </div>
            <div class="card-footer">categoria: ${prodotto.category}</div>
      `;
        productCardWrapper.appendChild(div);
      });
    }
  });
