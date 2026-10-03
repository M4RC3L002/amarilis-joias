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
  let content,
    title = 'Amarílis Jóias';
  if (path === '/') content = home();
  else if (path === '/catalogo') {
    content = catalog(params);
    title = 'Joias · Amarílis';
  } else if (path === '/favoritos') content = catalog(params, true);
  else if (path.startsWith('/produto/')) content = product(path.split('/')[2]);
  else if (path === '/carrinho') content = cartPage();
  else if (path === '/checkout') content = checkout();
  else if (path === '/sobre') content = about();
  else if (path === '/contato') content = contact();
  else if (path === '/informacoes') content = information();
  else
    content = html`<section class="page wrap">
      ${empty('Página não encontrada', 'Volte ao catálogo para continuar explorando.')}
    </section>`;
  $('#main').innerHTML = content;
  const heading = $('#main h1')?.textContent;
  document.title = path === '/' ? title : `${heading || 'Página não encontrada'} · Amarílis`;
  if (lastInputWasKeyboard) $('#main').focus({ preventScroll: true });
  enhancePage(path);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
