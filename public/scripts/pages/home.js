let featuredCategory = '';

function home() {
  return html` <section class="hero" data-design="desktop-header-7">
      <img
        src="assets/hero.png"
        alt="Modelo usando brincos e pulseiras dourados"
        fetchpriority="high"
      />
      <div class="hero-content">
        <div class="hero-copy glass-panel">
          <h1>Um detalhe.<br />Todo o seu brilho.</h1>
          <p>Joias que acompanham quem você é, dos pequenos momentos às ocasiões especiais.</p>
          <a class="button gold" href="#/catalogo">Explore as joias</a>
        </div>
      </div>
    </section>
    <div class="experience-strip wrap">
      <a href="#/favoritos"
        >${icon('heart')}<span
          ><strong>Seus favoritos</strong><small>Guarde os detalhes que encantam</small></span
        ></a
      ><a href="#/carrinho"
        >${icon('cart')}<span
          ><strong>Sua seleção</strong><small>Explore o carrinho demonstrativo</small></span
        ></a
      ><a href="#/informacoes"
        >${icon('user')}<span
          ><strong>Uma coleção em preparação</strong
          ><small>Conheça esta primeira apresentação</small></span
        ></a
      >
    </div>
    <section class="shop-categories wrap section">
      <h2>Explore por categoria</h2>
      <nav aria-label="Explore por categoria">
        ${categories
          .map(
            (c) =>
              html`<a href="#/catalogo?categoria=${encodeURIComponent(c)}"
                ><span class="category-circle"
                  >${products.some((p) => p.category === c)
                    ? html`<img
                        src="${products.find((p) => p.category === c).image}"
                        alt=""
                        loading="lazy"
                      />`
                    : categoryIcon(c)}</span
                ><span>${c}</span></a
              >`,
          )
          .join('')}
      </nav>
    </section>
    <section class="section wrap featured">
      <div class="section-title">
        <div>
          <h2>Joias em destaque</h2>
          <p class="muted">Fotografias reais de referência. Nosso catálogo está em preparação.</p>
        </div>
        <a class="textlink" href="#/catalogo">Explorar catálogo</a>
      </div>
      <div class="showcase-filters" role="group" aria-label="Filtrar joias em destaque">
        ${['', ...new Set(products.map((p) => p.category))]
          .map(
            (c) =>
              html`<button
                data-featured-category="${esc(c)}"
                aria-controls="featuredGrid"
                aria-pressed="${featuredCategory === c}"
              >
                ${c || 'Todos os detalhes'}
              </button>`,
          )
          .join('')}
      </div>
      <p class="sr-only" id="featuredStatus" role="status"></p>
      <div class="grid" id="featuredGrid">
        ${products
          .filter((p) => !featuredCategory || p.category === featuredCategory)
          .map(card)
          .join('')}
      </div>
    </section>
    <section class="collection-stories wrap" aria-label="Explore o universo Amarílis">
      <a class="collection-story" href="#/catalogo?categoria=Conjuntos"
        ><img
          src="assets/jewelry-29503017.jpg"
          alt="Conjunto dourado de referência com desenho de folhas"
          loading="lazy"
        />
        <div class="collection-caption">
          <h2>Detalhes que se completam.</h2>
          <span>Explore os conjuntos ${icon('chevron')}</span>
        </div></a
      >
      <a class="collection-story gift-story" href="#/sobre"
        ><img
          src="assets/brand-3.jpg"
          alt="Apresentação de uma caixa Amarílis com uma joia floral"
          loading="lazy"
        />
        <div class="collection-caption">
          <h2>O carinho está nos detalhes.</h2>
          <span>Conheça a identidade da marca ${icon('chevron')}</span>
        </div></a
      >
    </section>
    <section class="story wrap">
      <img
        src="assets/brand-5.jpg"
        alt="Embalagens e joias com a identidade Amarílis"
        loading="lazy"
      />
      <div class="story-text">
        <h2>Beleza que floresce<br />nos detalhes.</h2>
        <p>
          A força do verde, a delicadeza da flor e o brilho do dourado dão vida ao nosso universo.
        </p>
        <a class="button gold" href="#/sobre">Conheça a marca</a>
      </div>
    </section>`;
}
