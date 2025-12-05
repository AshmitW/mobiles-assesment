let cart = [];
let cartCount = 0;

export function getCart() {
  return cart;
}

export function getCartCount() {
  return cartCount;
}

export async function addToCart(product, quantity) {
  await simulateNetworkDelay();

  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  cartCount += quantity;
  updateCartBadge();

  return { success: true, cartCount };
}

export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.product.id === productId);

  if (index !== -1) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
    updateCartBadge();
  }
}

export function updateCartItemQuantity(productId, newQuantity) {
  const item = cart.find(item => item.product.id === productId);

  if (item) {
    const diff = newQuantity - item.quantity;
    item.quantity = newQuantity;
    cartCount += diff;
    updateCartBadge();
  }
}

export function clearCart() {
  cart = [];
  cartCount = 0;
  updateCartBadge();
}

export function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    badge.textContent = cartCount;
  }
}

function simulateNetworkDelay() {
  return new Promise(resolve => {
    setTimeout(resolve, 100);
  });
}
