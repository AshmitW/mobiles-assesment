import '../styles/main.css';
import { formatPrice } from './utils.js';
import { filterByCategory, sortProducts } from './filters.js';
import { addToCart, getCartCount } from './cart.js';

let products = [];
let currentCategory = 'all';
let currentSort = 'default';

async function init() {
  setupQuantitySelectors();
  setupAddToCartButtons();
  setupFilterButtons();
  setupSortDropdown();

  try {
    const response = await fetch('/api/products.json');

    if (!response.ok) {
      console.log('no data to show');
    }
    const data = await response.json();
    products = data;
    renderHtmlFromJSON(data);
    console.log(data);
  } catch (err) {
    console.log(' promise not resolved');
  }

  // console.log(data[2]);
  // renderHtmlFromJSON("data from json " + data);

  // TODO: Fetch products from /api/products.json and render them dynamically
  // The static HTML shows exactly how each product card should look
}

function renderHtmlFromJSON(data) {
  const productGridElement = document.getElementById('product-grid');
  const productGrid = data.map((jsonData) => {
    return `<div class="product-card" data-id="1" data-category="apple">
            <img
              src=${jsonData.image}
              alt=${jsonData.name}
              class="product-image" />
            <div class="product-content">
              <h3 class="product-name">${jsonData.name}</h3>
              <p class="product-description">${jsonData.description}</p>
              <p class="product-price">
                <span class="price-current">${jsonData.price}</span>
              </p>
              <div class="quantity-selector">
                <button class="quantity-btn minus" data-id="1">-</button>
                <input type="text" class="quantity-input" value="1" data-id="1" />
                <button class="quantity-btn plus" data-id="1">+</button>
              </div>
              <button class="add-to-cart-btn" data-id="1">Add to Cart</button>
            </div>
          </div>`;
  });

  for (let i = 0; i < productGrid.length; i++) {
    productGridElement.insertAdjacentHTML('beforeend',productGrid[i]);
  }

  console.log(productGrid);
}

function setupQuantitySelectors() {
  const cards = document.querySelectorAll('.product-card');
  var quantity = 1;

  for (var i = 0; i < cards.length; i++) {
    const card = cards[i];
    const minusBtn = card.querySelector('.minus');
    const plusBtn = card.querySelector('.plus');
    const input = card.querySelector('.quantity-input');

    minusBtn.addEventListener('click', function () {
      quantity--;
      input.value = quantity;
    });

    plusBtn.addEventListener('click', function () {
      quantity++;
      input.value = quantity;
    });

    input.addEventListener('change', function () {
      quantity = input.value;
    });
  }
}

function setupAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', async function () {
      const productId = parseInt(this.dataset.id);
      const card = this.closest('.product-card');
      const quantityInput = card.querySelector('.quantity-input');
      const quantity = parseInt(quantityInput.value) || 1;

      const product = products.find((p) => p.id === productId);

      if (product) {
        await addToCart(product, quantity);
        quantityInput.value = 1;
      }
    });
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterButtons.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      currentCategory = this.dataset.category;
      applyFiltersAndSort();
    });
  });
}

function setupSortDropdown() {
  const sortDropdown = document.getElementById('sort-dropdown');
  if (!sortDropdown) return;

  sortDropdown.addEventListener('change', function () {
    currentSort = this.value;
    applyFiltersAndSort();
  });
}

function applyFiltersAndSort() {
  let filtered = filterByCategory(products, currentCategory);

  if (currentSort !== 'default') {
    filtered = sortProducts(filtered, currentSort);
  }

  // TODO: Re-render the filtered products
}

document.addEventListener('DOMContentLoaded', init);
