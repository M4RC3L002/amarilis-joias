function cartPage() {
  return html`<section class="page wrap">
    ${breadcrumb('Carrinho')}
    <h1>Seu carrinho</h1>
    ${count()
      ? html`<div class="cart-layout">
          <div class="panel">
            ${Object.entries(cart)
              .map(([id, n]) => {
                const p = products.find((x) => x.id === id);
                return html`<article class="cart-item">
                  <a href="#/produto/${id}"><img src="${p.image}" alt="${esc(p.name)}" /></a>
                  <div>
                    <a href="#/produto/${id}"><h3>${esc(p.name)}</h3></a>
                    <p class="demo-tag">Peça demonstrativa</p>
                    <p class="muted">Preço a definir</p>
                    ${quantity(n, id)}
                  </div>
                  <button class="remove" data-remove="${id}">Remover</button>
                </article>`;
              })
              .join('')}
          </div>
          ${summary()}
        </div>`
      : empty(
          'Seu carrinho está esperando um detalhe',
          'Explore as referências da marca e experimente a seleção de peças.',
        )}
  </section>`;
}
