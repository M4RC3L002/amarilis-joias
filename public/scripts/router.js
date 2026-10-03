function route() {
  let raw = location.hash.slice(1) || '/',
    [path, query] = raw.split('?');
  const params = new URLSearchParams(query || '');
  document.body.classList.toggle('home-page', path === '/');
  document.body.classList.toggle('campaign-entry', firstRender && path === '/');
  firstRender = false;
  header(path === '/');
  footer();
  productQuantity = 1;
  let html,
    title = 'Amarílis Jóias';
  if (path === '/') html = home();
  else if (path === '/catalogo') {
    html = catalog(params);
    title = 'Joias · Amarílis';
  } else if (path === '/favoritos') html = catalog(params, true);
  else if (path.startsWith('/produto/')) html = product(path.split('/')[2]);
  else if (path === '/carrinho') html = cartPage();
  else if (path === '/checkout') html = checkout();
  else if (path === '/sobre') html = about();
  else if (path === '/contato') html = contact();
  else if (path === '/informacoes') html = information();
  else
    html = html`<section class="page wrap">
      ${empty('Página não encontrada', 'Volte ao catálogo para continuar explorando.')}
    </section>`;
  $('#main').innerHTML = html;
  document.title = title;
  enhancePage(path);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
