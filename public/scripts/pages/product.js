function product(id) {
  const p = products.find((x) => x.id === id);
  if (!p)
    return html`<section class="page wrap">
      ${empty('Peça não encontrada', 'Explore o catálogo disponível.')}
    </section>`;
  return html`<section class="page wrap">
    ${breadcrumb(p.name)}
    <div class="product">
      <img class="product-photo" src="${p.image}" alt="${esc(p.name)} — imagem ilustrativa" />
      <div>
        <span class="pill">Peça demonstrativa · ${esc(p.category)}</span>
        <h1>${esc(p.name)}</h1>
        <p class="muted">Preço a definir</p>
        <p>${esc(p.description)}</p>
        ${p.source
          ? html`<a
              class="photo-credit"
              href="${esc(p.source)}"
              target="_blank"
              rel="noopener noreferrer"
              >Fonte da fotografia · Pexels</a
            >`
          : ''}
        <p class="info">
          Esta peça é ilustrativa. Materiais, medidas, preço e estoque serão informados no catálogo
          oficial.
        </p>
        <div class="purchase">
          ${quantity(productQuantity)}<button class="button" data-add="${p.id}">
            Adicionar à demonstração
          </button>
        </div>
        <button class="textlink" data-favorite="${p.id}" aria-pressed="${favorites.includes(p.id)}">
          ${favorites.includes(p.id) ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        </button>
        <details class="details" open>
          <summary>Sobre esta peça</summary>
          <p class="muted">
            Fotografia de referência de um banco de imagens. Esta peça não representa um produto da
            Amarílis disponível para venda.
          </p>
        </details>
        <details class="details">
          <summary>Entrega e pagamento</summary>
          <p class="muted">
            O checkout está em preparação. Frete e formas de pagamento estarão disponíveis antes do
            início das vendas.
          </p>
        </details>
      </div>
    </div>
  </section>`;
}
