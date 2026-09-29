const sectionBtn = document.querySelector(".btnSection");
const btn = document.querySelector(".showBtn");
const mainProducts = document.querySelector(".mainProducts");
const productsContainer = document.querySelector(".products");
const loading = document.querySelector(".loading");
let numberOfProducts = 0;
let showingProducts = false;

function showProductsSection() {
  sectionBtn.classList.remove("min-vh-100");
  sectionBtn.classList.add("pt-3");
  mainProducts.classList.remove("d-none");
  btn.innerText = "Click to Hide Products";
}

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  const products = data.products.slice(0, numberOfProducts);
  return products;
}

function createProductCards(products) {
  let productCards = "";
  products.forEach((product) => {
    productCards += `     <div class="card col-sm-6 col-3" style="width: 18rem">
          <img
            src="${product.thumbnail}"
            class="card-img-top"
            alt="${product.title}"
          />
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-category">${product.category}</p>
            <p class="card-description">
                ${product.description}
            </p>
            <p class="card-price text-success fw-bold">${product.price}$</p>
            <a href="#" class="btn btn-primary d-flex justify-content-center"
              >View Product</a
            >
          </div>
          </div>`;
  });
  productsContainer.innerHTML = productCards;
}

function hideProducts() {
  sectionBtn.classList.add("min-vh-100");
  sectionBtn.classList.remove("pt-3");
  mainProducts.classList.add("d-none");
  btn.innerText = "Click to Show Products";
  btn.disabled = false;
  loading.classList.add("d-none");
  productsContainer.innerHTML = "";
}

numberOfProducts = 10;

btn.addEventListener("click", async () => {
  if (!showingProducts) {
    showingProducts = true;
    btn.disabled = true;

    showProductsSection();
    loading.classList.remove("d-none");

    try {
      const products = await fetchProducts();

      setTimeout(() => {
        loading.classList.add("d-none");
        createProductCards(products);
        btn.disabled = false;
      }, 600);
    } catch (error) {
      console.log("Error fetching products:", error);
      showingProducts = false;
      hideProducts();
    }
  } else {
    hideProducts();
    showingProducts = false;
  }
});
