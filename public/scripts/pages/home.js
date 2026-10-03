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
                ><span class="category-circle">${categoryIcon(c)}</span><span>${c}</span></a
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
      <div class="grid">${products.map(card).join('')}</div>
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
