document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.hasAttribute('data-menu')) {
    const open = $('#navlinks').classList.toggle('open');
    b.setAttribute('aria-expanded', open);
  }
  if (b.hasAttribute('data-search')) {
    $('#searchDialog').showModal();
    $('#searchInput').focus();
  }
  if (b.dataset.favorite) {
    const id = b.dataset.favorite;
    favorites = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
    save();
    const scroll = window.scrollY;
    route();
    window.scrollTo({ top: scroll, behavior: 'instant' });
    toast(favorites.includes(id) ? 'Peça salva nos favoritos' : 'Peça removida dos favoritos');
  }
  if (b.dataset.add) {
    cart[b.dataset.add] = Math.min(99, (cart[b.dataset.add] || 0) + productQuantity);
    save();
    toast('Peça adicionada ao carrinho demonstrativo');
  }
  if (b.hasAttribute('data-quantity')) {
    const id = b.dataset.quantity,
      delta = Number(b.dataset.delta);
    if (id) {
      cart[id] = Math.max(1, Math.min(99, cart[id] + delta));
      save();
      const scroll = window.scrollY;
      route();
      window.scrollTo({ top: scroll, behavior: 'instant' });
    } else {
      productQuantity = Math.max(1, Math.min(99, productQuantity + delta));
      $('#productQuantity').textContent = productQuantity;
    }
  }
  if (b.dataset.remove) {
    delete cart[b.dataset.remove];
    save();
    route();
    toast('Peça removida do carrinho');
  }
  if (b.hasAttribute('data-clear')) {
    cart = {};
    favorites = [];
    save();
    toast('Carrinho e favoritos apagados deste navegador');
  }
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'sort') {
    const [path, query] = (location.hash.slice(1) || '/catalogo').split('?');
    const params = new URLSearchParams(query || '');
    params.set('ordem', e.target.value);
    location.hash = path + '?' + params.toString();
  }
});
document.addEventListener('submit', (e) => {
  if (e.target.id === 'searchForm' || e.target.id === 'headerSearchForm') {
    e.preventDefault();
    const q = e.target.querySelector('input').value.trim();
    if ($('#searchDialog').open) $('#searchDialog').close();
    location.hash = '/catalogo?busca=' + encodeURIComponent(q);
  }
  if (e.target.id === 'checkoutForm') {
    e.preventDefault();
    const data = new FormData(e.target);
    $('#checkoutReview').innerHTML = html`<div class="confirmation" role="status">
      <p class="eyebrow">Revisão da demonstração</p>
      <h3>Seleção revisada</h3>
      <p>
        <strong>${esc(data.get('nome'))}</strong><br />${esc(data.get('email'))}<br />${esc(
          data.get('endereco'),
        )},
        ${esc(data.get('cidade'))} — ${esc(data.get('estado'))}<br />CEP ${esc(data.get('cep'))}
      </p>
      <p>${count()} peça(s) demonstrativa(s). Preços e frete a definir.</p>
      <p>
        Nenhum pedido foi criado. O pagamento será habilitado após o cadastro do catálogo e a
        integração do provedor.
      </p>
      <button class="button full" disabled>Pagamento ainda não disponível</button>
    </div>`;
    $('#checkoutReview').scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'center',
    });
  }
});
window.addEventListener('hashchange', route);
document.querySelector('.skip').addEventListener('click', (e) => {
  e.preventDefault();
  $('#main').focus();
  $('#main').scrollIntoView();
});
window.addEventListener('storage', (e) => {
  if (e.key === 'amarilis-cart' || e.key === 'amarilis-favorites') location.reload();
});
