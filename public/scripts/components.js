function icon(name, alt) {
  return html`<img src="assets/${name}.svg" alt="" aria-hidden="true" />`;
}

function header(home) {
  $('#header').className = home ? 'header-home' : '';
  $('#header').innerHTML = html` <div class="notice">
      Primeira coleção em preparação · Conheça o universo Amarílis
    </div>
    <nav class="nav" aria-label="Navegação principal">
      <a class="brand" href="#/" aria-label="Amarílis Jóias, início"
        ><img src="assets/logo-header.svg" alt="Amarílis"
      /></a>
      <form class="header-search" id="headerSearchForm" role="search">
        <label class="sr-only" for="headerSearchInput">Buscar joias</label
        ><input
          id="headerSearchInput"
          type="search"
          placeholder="O que você procura?"
          maxlength="80"
        /><button aria-label="Buscar no catálogo">${icon('search')}</button>
      </form>
      <div class="navlinks" id="navlinks">
        <a href="#/">Início</a><a href="#/catalogo">Joias</a><a href="#/sobre">Amarílis</a
        ><a href="#/contato">Contato</a>
      </div>
      <div class="actions">
        <button class="icon mobile-search" data-search aria-label="Buscar joias">
          ${icon('search')}</button
        ><a class="icon" href="#/favoritos" aria-label="Favoritos"
          >${icon('heart')}<span class="action-label">Favoritos</span
          ><span class="counter" id="favoriteCount">${favorites.length}</span></a
        ><a class="icon" href="#/carrinho" aria-label="Carrinho"
          >${icon('cart')}<span class="action-label">Carrinho</span
          ><span class="counter" id="cartCount">${count()}</span></a
        ><button
          class="menu"
          data-menu
          aria-controls="navlinks"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
    <nav class="header-categories" aria-label="Categorias de joias">
      ${categories
        .map((c) => html`<a href="#/catalogo?categoria=${encodeURIComponent(c)}">${c}</a>`)
        .join('')}<a href="#/catalogo">Todas as joias</a>
    </nav>`;
}

function updateCounters() {
  if ($('#cartCount')) $('#cartCount').textContent = count();
  if ($('#favoriteCount')) $('#favoriteCount').textContent = favorites.length;
}

function footer() {
  $('#footer').innerHTML = html`<div class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div>
          <a class="brand" href="#/"><img src="assets/logo.png" alt="Amarílis" /></a>
          <p>Joias e detalhes para expressar a sua essência.</p>
          <p>
            Catálogo em preparação. A vitrine usa fotografias de referência. As embalagens
            apresentam a identidade da marca.
          </p>
        </div>
        <div>
          <p class="eyebrow">Explore</p>
          <a href="#/catalogo">Todas as joias</a><a href="#/favoritos">Meus favoritos</a
          ><a href="#/sobre">Universo Amarílis</a>
        </div>
        <div>
          <p class="eyebrow">Sua experiência</p>
          <a href="#/carrinho">Meu carrinho</a><a href="#/contato">Contato</a
          ><a href="#/informacoes">Informações da loja</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Amarílis Jóias</span
        ><span>Versão de apresentação · vendas ainda não disponíveis</span>
      </div>
    </div>
  </div>`;
}

function card(p) {
  return html`<article class="card">
    <a class="photo" href="#/produto/${p.id}"
      ><img src="${p.image}" alt="${esc(p.name)} — fotografia de referência" loading="lazy" /></a
    ><button
      class="favorite"
      data-favorite="${p.id}"
      aria-label="${favorites.includes(p.id) ? 'Remover dos' : 'Adicionar aos'} favoritos: ${esc(
        p.name,
      )}"
      aria-pressed="${favorites.includes(p.id)}"
    >
      ${icon('heart')}</button
    ><a href="#/produto/${p.id}"><h3>${esc(p.name)}</h3></a>
    <p class="demo-tag">Peça demonstrativa</p>
    <p class="muted">Preço a definir</p>
    <a class="piece-link" href="#/produto/${p.id}">Conhecer peça</a>
  </article>`;
}

function breadcrumb(label) {
  return html`<div class="breadcrumb"><a href="#/">Início</a> / ${esc(label)}</div>`;
}

function categoryIcon(category) {
  const paths = {
    Brincos:
      '<circle cx="18" cy="12" r="3"/><circle cx="46" cy="12" r="3"/><ellipse cx="18" cy="34" rx="9" ry="17"/><ellipse cx="46" cy="34" rx="9" ry="17"/>',
    Colares: '<path d="M13 10c-9 36 6 42 19 42s28-6 19-42M28 45l4-5 4 5-4 6z"/>',
    Anéis:
      '<circle cx="32" cy="36" r="17"/><path d="M25 17l-5-7 5-5h14l5 5-5 7zM20 10h24M27 5l5 12 5-12"/>',
    Pulseiras:
      '<ellipse cx="32" cy="32" rx="23" ry="18"/><ellipse cx="32" cy="32" rx="19" ry="13"/><path d="M29 14v5M29 45v5"/>',
    Relógios:
      '<rect x="24" y="4" width="16" height="14" rx="3"/><rect x="24" y="46" width="16" height="14" rx="3"/><circle cx="32" cy="32" r="15"/><path d="M32 22v10l7 4"/>',
    Conjuntos:
      '<path d="M18 9c-7 24 4 34 14 34s21-10 14-34M28 37l4-5 4 5-4 5z"/><circle cx="13" cy="44" r="3"/><circle cx="51" cy="44" r="3"/><ellipse cx="13" cy="54" rx="5" ry="6"/><ellipse cx="51" cy="54" rx="5" ry="6"/>',
  };
  return html`<svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    stroke-width="1.3"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    ${paths[category]}
  </svg>`;
}

function empty(title, text) {
  return html`<div class="empty">
    <h2>${title}</h2>
    <p class="muted">${text}</p>
    <a class="button" href="#/catalogo">Explorar as joias</a>
  </div>`;
}

function quantity(value, id = '') {
  return html`<div class="quantity">
    <button data-quantity="${id}" data-delta="-1" aria-label="Diminuir quantidade">−</button
    ><span ${id ? '' : 'id="productQuantity"'}>${value}</span
    ><button data-quantity="${id}" data-delta="1" aria-label="Aumentar quantidade">+</button>
  </div>`;
}

function summary(checkout = false) {
  return html`<aside class="panel summary">
    <h2>Resumo ${checkout ? 'da seleção' : 'do carrinho'}</h2>
    <div class="summary-row"><span>Peças selecionadas</span><strong>${count()}</strong></div>
    <div class="summary-row"><span>Subtotal</span><span>A definir</span></div>
    <div class="summary-row"><span>Frete</span><span>A definir</span></div>
    <div class="summary-row total"><span>Total</span><span>A definir</span></div>
    <p class="info">Demonstração: nenhuma compra ou cobrança será realizada.</p>
    ${checkout ? '' : html`<a class="button full" href="#/checkout">Conhecer o checkout</a>`}
  </aside>`;
}

function field(name, label, type = 'text', wide = false, autocomplete = '') {
  return html`<div class="field ${wide ? 'wide' : ''}">
    <label for="${name}">${label}</label
    ><input
      id="${name}"
      name="${name}"
      type="${type}"
      autocomplete="${autocomplete}"
      required
      maxlength="150"
      ${name === 'cep'
        ? 'inputmode="numeric" pattern="[0-9]{5}-?[0-9]{3}" placeholder="00000-000"'
        : ''}
    />
  </div>`;
}
