function catalog(params, fav = false) {
  let category = params.get('categoria') || '',
    q = params.get('busca') || '',
    sort = params.get('ordem') || 'original';
  const link = (c = '') => {
    const next = new URLSearchParams(params);
    c ? next.set('categoria', c) : next.delete('categoria');
    return '#/' + (fav ? 'favoritos' : 'catalogo') + (next.size ? '?' + next.toString() : '');
  };
  const normalize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR');
  let list = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!fav || favorites.includes(p.id)) &&
      (!q || normalize(p.name + ' ' + p.category + ' ' + p.description).includes(normalize(q))),
  );
  if (sort === 'nome') list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  if (sort === 'nome-desc') list.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
  return html`<section class="page wrap">
    ${breadcrumb(fav ? 'Favoritos' : 'Joias')}
    <h1>${fav ? 'Seus favoritos' : esc(category || 'Todas as joias')}</h1>
    <p class="page-intro">
      ${fav
        ? 'Sua seleção pessoal, salva neste navegador. Reúna seus detalhes favoritos em um só lugar.'
        : 'Encontre o detalhe que combina com você. Explore as fotografias de referência enquanto preparamos nossa coleção.'}
    </p>
    ${fav && list.length
      ? html`<button class="button outline" data-add-favorites>Levar favoritos ao carrinho</button>`
      : ''}
    <div class="catalog-layout">
      <aside class="filters">
        <h3>Categorias</h3>
        <a href="${link()}" class="${!category ? 'active' : ''}">Todas as joias</a>${categories
          .map((c) => html`<a class="${category === c ? 'active' : ''}" href="${link(c)}">${c}</a>`)
          .join('')}
        <p class="tiny muted">Catálogo demonstrativo, sem preços ou estoque definidos.</p>
      </aside>
      <div class="catalog">
        ${category || q
          ? html`<div class="active-filters">
              <span>${esc(category || 'Todas as categorias')}${q ? ' · ' + esc(q) : ''}</span
              ><a href="#/${fav ? 'favoritos' : 'catalogo'}">Limpar filtros</a>
            </div>`
          : ''}
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
              <option value="nome-desc" ${sort === 'nome-desc' ? 'selected' : ''}>
                Nome: Z a A
              </option>
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
