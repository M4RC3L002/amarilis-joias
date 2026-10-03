fetch('data/catalog.json', { cache: 'no-store' })
  .then((r) => {
    if (!r.ok) throw Error('Catálogo indisponível');
    return r.json();
  })
  .then((data) => {
    products = data.products;
    cart = Object.fromEntries(
      Object.entries(cart).filter(
        ([id, n]) => products.some((p) => p.id === id) && Number.isInteger(n) && n > 0 && n <= 99,
      ),
    );
    favorites = favorites.filter((id) => products.some((p) => p.id === id));
    save();
    route();
  })
  .catch(() => {
    header(false);
    footer();
    $('#main').innerHTML =
      '<section class="page wrap"><h1>Não foi possível carregar o catálogo</h1><p>Atualize a página para tentar novamente.</p></section>';
  });
