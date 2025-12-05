import '../styles/main.css';
import { formatPrice } from './utils.js';
import { filterByCategory, sortProducts } from './filters.js';
import { addToCart, getCartCount } from './cart.js';

let products = [];
let currentCategory = 'all';
let currentSort = 'default';

function init() {
  setupQuantitySelectors();
  setupAddToCartButtons();
  setupFilterButtons();
  setupSortDropdown();

  // TODO: Fetch products from /api/products.json and render them dynamically
  // The static HTML shows exactly how each product card should look
}

function setupQuantitySelectors() {
  const cards = document.querySelectorAll('.product-card');
  var quantity = 1;

  for (var i = 0; i < cards.length; i++) {
    const card = cards[i];
    const minusBtn = card.querySelector('.minus');
    const plusBtn = card.querySelector('.plus');
    const input = card.querySelector('.quantity-input');

    minusBtn.addEventListener('click', function() {
      quantity--;
      input.value = quantity;
    });

    plusBtn.addEventListener('click', function() {
      quantity++;
      input.value = quantity;
    });

    input.addEventListener('change', function() {
      quantity = input.value;
    });
  }
}

function setupAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', async function() {
      const productId = parseInt(this.dataset.id);
      const card = this.closest('.product-card');
      const quantityInput = card.querySelector('.quantity-input');
      const quantity = parseInt(quantityInput.value) || 1;

      const product = products.find(p => p.id === productId);

      if (product) {
        await addToCart(product, quantity);
        quantityInput.value = 1;
      }
    });
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      currentCategory = this.dataset.category;
      applyFiltersAndSort();
    });
  });
}

function setupSortDropdown() {
  const sortDropdown = document.getElementById('sort-dropdown');
  if (!sortDropdown) return;

  sortDropdown.addEventListener('change', function() {
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
