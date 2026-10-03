document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.hasAttribute('data-featured-category')) {
    featuredCategory = b.dataset.featuredCategory;
    const selected = products.filter((p) => !featuredCategory || p.category === featuredCategory);
    $('#featuredGrid').innerHTML = selected.map(card).join('');
    document
      .querySelectorAll('[data-featured-category]')
      .forEach((control) =>
        control.setAttribute('aria-pressed', control.dataset.featuredCategory === featuredCategory),
      );
    $('#featuredStatus').textContent =
      `${selected.length} peças de referência em ${featuredCategory || 'todas as categorias'}`;
  }
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
      const controls = b.closest('.quantity');
      controls.querySelector('[data-delta="-1"]').disabled = productQuantity <= 1;
      controls.querySelector('[data-delta="1"]').disabled = productQuantity >= 99;
    }
  }
  if (b.dataset.remove) {
    delete cart[b.dataset.remove];
    save();
    route();
    toast('Peça removida do carrinho');
  }
  if (b.hasAttribute('data-add-favorites')) {
    for (const id of favorites) cart[id] = Math.min(99, (cart[id] || 0) + 1);
    save();
    toast('Favoritos adicionados à sua seleção');
  }
  if (b.hasAttribute('data-export')) {
    const selection = Object.entries(cart).map(([id, quantity]) => ({
      id,
      name: products.find((p) => p.id === id).name,
      quantity,
    }));
    downloadDraft(
      'amarilis-selecao.json',
      JSON.stringify(
        { type: 'Seleção demonstrativa — não é um pedido', items: selection },
        null,
        2,
      ),
      'application/json',
    );
    toast('Seleção baixada, sem dados pessoais');
  }
  if (b.hasAttribute('data-edit-checkout')) {
    $('#checkoutReview').innerHTML = '';
    $('#reviewStep').removeAttribute('aria-current');
    $('#checkoutForm').hidden = false;
    $('#nome').focus();
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
  if (e.target.id === 'contactForm') {
    e.preventDefault();
    const data = new FormData(e.target);
    const message = `Nome: ${data.get('contactName')}\nE-mail: ${data.get('contactEmail')}\nAssunto: ${data.get('subject')}\n\n${data.get('message')}`;
    if (contactChannels.email)
      location.href = `mailto:${contactChannels.email}?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(message)}`;
    else downloadDraft('amarilis-mensagem.txt', message, 'text/plain;charset=utf-8');
    $('#contactStatus').textContent = contactChannels.email
      ? 'Mensagem preparada. Envie pelo seu aplicativo de e-mail.'
      : 'Rascunho baixado. A mensagem não foi enviada à loja.';
  }
  if (e.target.id === 'checkoutForm') {
    e.preventDefault();
    const data = new FormData(e.target);
    $('#checkoutReview').innerHTML = html`<div class="confirmation" role="status">
      <h3>Confira sua seleção</h3>
      <ul class="review-items">
        ${Object.entries(cart)
          .map(
            ([id, n]) =>
              html`<li>
                <span>${esc(products.find((p) => p.id === id).name)}</span><strong>${n} un.</strong>
              </li>`,
          )
          .join('')}
      </ul>
      <p>
        <strong>${esc(data.get('nome'))}</strong><br />${esc(data.get('email'))}<br />${esc(
          data.get('endereco'),
        )},
        ${esc(data.get('complemento'))}<br />${esc(data.get('telefone'))}<br />${esc(
          data.get('cidade'),
        )}
        — ${esc(data.get('estado'))}<br />CEP ${esc(data.get('cep'))}
      </p>
      <p>${count()} peça(s) demonstrativa(s). Preços e frete a definir.</p>
      <p>
        Nenhum pedido foi criado. O pagamento será habilitado após o cadastro do catálogo e a
        integração do provedor.
      </p>
      <button class="button outline" data-edit-checkout>Editar dados</button
      ><button class="textlink" data-export>Baixar seleção sem dados pessoais</button
      ><button class="button full" disabled>Pagamento ainda não disponível</button>
    </div>`;
    e.target.hidden = true;
    $('#reviewStep').setAttribute('aria-current', 'step');
    $('#checkoutReview').setAttribute('tabindex', '-1');
    $('#checkoutReview').focus({ preventScroll: true });
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

function downloadDraft(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
