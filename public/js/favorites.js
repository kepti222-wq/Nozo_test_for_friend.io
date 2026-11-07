document.addEventListener('DOMContentLoaded', () => {
  // 1. Отрисовываем карточки при загрузке
  renderFavorites();

  // 2. Вешаем ОДИН обработчик клика на весь список (делегирование)
  const list = document.getElementById('favoritesList');
  if (list) {
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.fav-remove-btn');
      if (!btn) return;

      // Предотвращаем переход по ссылке, если кликнули на кнопку
      e.preventDefault(); 
      e.stopPropagation();

      const article = btn.dataset.article;
      NozoCart.toggleFavorite(article); // Удаляем из избранного
      renderFavorites(); // Перерисовываем страницу
    });
  }
});

function renderFavorites() {
  const list = document.getElementById('favoritesList');
  if (!list) return;

  const favoriteArticles = NozoCart.getFavorites(); 
  const favoriteProducts = window.allProducts.filter(p => favoriteArticles.includes(p.article));

  if (favoriteProducts.length === 0) {
    list.innerHTML = '<div class="cart-empty" style="grid-column: 1 / -1;">В избранном пока пусто :(<br>Нажмите на сердечко на странице товара, чтобы добавить его сюда.</div>';
    return;
  }

  list.innerHTML = '';

  favoriteProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card'; 
    
    const hasDiscount = product.sale_Price && parseInt(product.sale_Price.replace(/\s/g, '')) < parseInt(product.price.replace(/\s/g, ''));
    const priceHtml = hasDiscount 
      ? `<div class="prices-with-discount">
           <span class="sale-price">${product.sale_Price} ₽</span>
          <span class="old-price">${product.price} ₽</span>
         </div>`
      : `<span class="regular-price">${product.price} ₽</span>`;

    card.innerHTML = `
      <button class="fav-remove-btn" data-article="${product.article}" title="Убрать из избранного">
        <i class="fa-solid fa-heart"></i>
      </button>
      <a href="/product/${product.article}" class="product-card-link">
        <img src="${product.logo}" alt="${product.name}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-prices">
          ${priceHtml}
        </div>
      </a>
    `;
    list.appendChild(card);
  });
}