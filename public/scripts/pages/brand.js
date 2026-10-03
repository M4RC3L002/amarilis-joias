function about() {
  return html`<section class="page wrap reading">
    ${breadcrumb('Amarílis')}
    <p class="eyebrow">Nosso universo</p>
    <h1>A essência dos detalhes.</h1>
    <p>
      Amarílis é flor, força e delicadeza. Nosso universo combina verde profundo, dourado e creme,
      em uma identidade que celebra a beleza dos detalhes.
    </p>
    <img src="assets/brand-3.jpg" alt="Colar floral em uma caixa Amarílis" />
    <h2>Uma identidade que floresce</h2>
    <p>
      O símbolo floral acompanha cada aplicação da marca, das embalagens às pequenas peças. A
      coleção da loja está em preparação.
    </p>
    <div class="brand-gallery">
      ${[2, 4, 6, 7]
        .map(
          (i) =>
            html`<img
              src="assets/brand-${i}.jpg"
              alt="Aplicação ${i} da identidade visual Amarílis"
              loading="lazy"
            />`,
        )
        .join('')}
    </div>
    <p class="tiny muted">
      Imagens de apresentação da identidade visual. Não representam itens disponíveis para compra.
    </p>
  </section>`;
}

function contact() {
  return html`<section class="page wrap reading">
    ${breadcrumb('Contato')}
    <h1>Vamos conversar</h1>
    <p>Estamos preparando os canais oficiais de atendimento da Amarílis.</p>
    <div class="info">
      WhatsApp, e-mail e redes sociais serão disponibilizados junto com o catálogo. Nenhum canal de
      atendimento está conectado nesta versão.
    </div>
    <img src="assets/brand-4.jpg" alt="Apresentação visual da marca nas redes sociais" /><a
      class="button"
      href="#/catalogo"
      >Conheça o universo Amarílis</a
    >
  </section>`;
}

function information() {
  return html`<section class="page wrap reading">
    ${breadcrumb('Informações da loja')}
    <h1>Informações da loja</h1>
    <h2>Uma primeira apresentação</h2>
    <p>
      Esta versão permite explorar o catálogo demonstrativo, salvar favoritos neste navegador,
      montar um carrinho e conhecer o checkout. A loja ainda não recebe pedidos ou pagamentos.
    </p>
    <h2>Catálogo e entregas</h2>
    <p>
      Fotos reais, materiais, medidas, preços, estoque, frete e prazos serão definidos antes do
      início das vendas.
    </p>
    <h2>Atendimento e políticas</h2>
    <p>
      Os canais de atendimento, as informações comerciais e as políticas de troca e privacidade
      serão publicados antes da abertura da loja.
    </p>
    <h2>Dados nesta versão</h2>
    <p>
      Favoritos e carrinho ficam apenas neste navegador. Os dados de teste do checkout não são
      enviados nem armazenados.
    </p>
    <button class="button outline" data-clear>Limpar carrinho e favoritos deste navegador</button>
  </section>`;
}
