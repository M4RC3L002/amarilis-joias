function catalog(params, fav = false) {
  let category = params.get('categoria') || '',
    q = params.get('busca') || '',
    sort = params.get('ordem') || 'original';
  let list = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!fav || favorites.includes(p.id)) &&
      (!q || p.name.toLocaleLowerCase('pt-BR').includes(q.toLocaleLowerCase('pt-BR'))),
  );
  if (sort === 'nome') list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  return html`<section class="page wrap">
    ${breadcrumb(fav ? 'Favoritos' : 'Joias')}
    <h1>${fav ? 'Seus favoritos' : esc(category || 'Todas as joias')}</h1>
    <div class="catalog-layout">
      <aside class="filters">
        <h3>Categorias</h3>
        <a href="#/catalogo" class="${!category ? 'active' : ''}">Todas as joias</a>${categories
          .map(
            (c) =>
              html`<a
                class="${category === c ? 'active' : ''}"
                href="#/catalogo?categoria=${encodeURIComponent(c)}"
                >${c}</a
              >`,
          )
          .join('')}
        <p class="tiny muted">Catálogo demonstrativo, sem preços ou estoque definidos.</p>
      </aside>
      <div class="catalog">
        <div class="catalog-top">
          <span class="muted"
            >${list.length}
            ${list.length === 1 ? 'peça ilustrativa' : 'peças ilustrativas'}${q
              ? ` para “${esc(q)}”`
              : ''}</span
          ><label
            >Ordenar
            <select id="sort">
              <option value="original">Seleção Amarílis</option>
              <option value="nome" ${sort === 'nome' ? 'selected' : ''}>Nome: A a Z</option>
            </select></label
          >
        </div>
        ${list.length
          ? html`<div class="grid">${list.map(card).join('')}</div>`
          : empty(
              fav
                ? 'Seus detalhes favoritos começam aqui'
                : q
                  ? 'Nenhuma peça encontrada'
                  : 'Uma nova coleção está florescendo',
              fav
                ? 'Salve as peças que chamarem sua atenção para encontrá-las aqui.'
                : q
                  ? 'Experimente buscar por brincos ou colar.'
                  : 'Esta categoria receberá as peças quando o catálogo estiver disponível.',
            )}
      </div>
    </div>
  </section>`;
}
