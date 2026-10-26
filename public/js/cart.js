const CART_KEY = 'nozo_cart';
const FAV_KEY = 'nozo_favorites';

//  Корзина 

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const article = product.article;
  if (cart[article]) {
    cart[article].quantity += qty;
  } else {
    cart[article] = {
      article: article,
      name: product.name,
      price: product.price,
      logo: product.logo,
      quantity: qty,
    };
  }
  saveCart(cart);
}

function removeFromCart(article) {
  const cart = getCart();
  delete cart[article];
  saveCart(cart);
}

function changeQuantity(article, delta) {
  const cart = getCart();
  if (!cart[article]) return;
  cart[article].quantity += delta;
  if (cart[article].quantity <= 0) {
    delete cart[article];
  }
  saveCart(cart);
}

function getCartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    const count = getCartCount();
    countEl.textContent = count > 0 ? count : '';
    countEl.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

// Избранное 

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}

function isFavorite(article) {
  return getFavorites().includes(article);
}

function toggleFavorite(article) {
  const favs = getFavorites();
  const idx = favs.indexOf(article);
  if (idx >= 0) {
    favs.splice(idx, 1);
    saveFavorites(favs);
    return false;
  } else {
    favs.push(article);
    saveFavorites(favs);
    return true;
  }
}

// Экспорт 
window.NozoCart = {
  getCart, addToCart, removeFromCart, changeQuantity, getCartCount, updateCartCount,
  getFavorites, isFavorite, toggleFavorite,
};

document.addEventListener('DOMContentLoaded', updateCartCount);