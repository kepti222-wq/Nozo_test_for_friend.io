document.addEventListener('DOMContentLoaded', () => {
  renderCart();

 
  const list = document.getElementById('cartList');
  if (!list) return;

  list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const article = btn.dataset.article;
    const action = btn.dataset.action;

    if (action === 'remove') {
      NozoCart.removeFromCart(article);
    } else if (action === 'plus') {
      NozoCart.changeQuantity(article, 1);
    } else if (action === 'minus') {
      NozoCart.changeQuantity(article, -1);
    } else if (action === 'favorite') {
      NozoCart.toggleFavorite(article);
    }

    renderCart();
  });

  
  list.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    const card = e.target.closest('.cart-item');
    if (!card || !card.dataset.article) return;

    window.location.href = `/product/${card.dataset.article}`;
  });

});



function renderCart() {
  const list = document.getElementById('cartList');
  const countEl = document.getElementById('cart-total-count');
  const priceEl = document.getElementById('cart-total-price');
  if (!list) return;

  const cart = NozoCart.getCart();
  const items = Object.values(cart);

  if (items.length === 0) {
    list.innerHTML = '<div class="cart-empty">У вас в корзине пока ничего нет :(</div>';
    if (countEl) countEl.textContent = 0;
    if (priceEl) priceEl.textContent = 0;
    return;
  }

  let totalCount = 0;
  let totalPrice = 0;
  list.innerHTML = '';

  items.forEach(item => {
    totalCount += item.quantity;
    const itemPrice = parseInt(item.price.replace(/\s/g, ''), 10) || 0;
    totalPrice += itemPrice * item.quantity;

    const isFav = NozoCart.isFavorite(item.article);
    const heartIcon = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    const heartClass = isFav ? 'favorite active' : 'favorite';

    const card = document.createElement('div');
    card.className = 'cart-item';
    card.dataset.article = item.article; // ← запоминаем артикул
    card.innerHTML = `
      <img src="${item.logo}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-article">Артикул: ${item.article}</p>
        <div class="cart-item-actions">
          <button class="${heartClass}" data-action="favorite" data-article="${item.article}">
            <i class="${heartIcon}"></i>
          </button>
          <button class="cart-item-remove" data-action="remove" data-article="${item.article}">Удалить</button>
        </div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">${item.price} ₽</div>
        <div class="cart-item-counter">
          <button data-action="minus" data-article="${item.article}">−</button>
          <span>${item.quantity}</span>
          <button data-action="plus" data-article="${item.article}">+</button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  if (countEl) countEl.textContent = totalCount;
  if (priceEl) priceEl.textContent = totalPrice.toLocaleString('ru-RU');
}