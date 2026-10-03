function about() {
  return html`<section class="page wrap reading">
    ${breadcrumb('Amarílis')}

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

// Configure only verified business channels before opening the store.
const contactChannels = { email: '', whatsapp: '' };
function contact() {
  return html`<section class="page wrap">
    ${breadcrumb('Contato')}
    <div class="contact-layout">
      <div class="contact-story">
        <h1>Um detalhe começa com uma conversa.</h1>
        <p class="page-intro">
          Dúvidas sobre a coleção, presentes ou a sua seleção? Prepare sua mensagem para a Amarílis.
        </p>
        <img src="assets/brand-4.jpg" alt="Identidade visual e embalagens Amarílis" />
        <details class="details">
          <summary>Já posso comprar?</summary>
          <p>
            Estamos preparando o catálogo oficial. As peças desta vitrine são demonstrativas e o
            pagamento ainda não está conectado.
          </p>
        </details>
        <details class="details">
          <summary>Onde encontro minha seleção?</summary>
          <p>
            Seus favoritos e carrinho ficam salvos neste navegador. Você pode baixar sua seleção na
            página do carrinho.
          </p>
        </details>
      </div>
      <div class="panel">
        <h2>Escreva sua mensagem</h2>
        <p class="info">
          ${contactChannels.email
            ? 'Abra sua mensagem no aplicativo de e-mail para enviá-la.'
            : 'O atendimento ainda não está conectado. Você pode baixar um rascunho; nenhum dado será enviado ou armazenado pelo site.'}
        </p>
        <form id="contactForm">
          <div class="form-grid">
            ${field('contactName', 'Seu nome', 'text', true, 'name')}${field(
              'contactEmail',
              'Seu e-mail',
              'email',
              true,
              'email',
            )}
            <div class="field wide">
              <label for="contactSubject">Assunto</label
              ><select id="contactSubject" name="subject">
                <option>Sobre a coleção</option>
                <option>Minha seleção</option>
                <option>Presentes</option>
                <option>Outro assunto</option>
              </select>
            </div>
            <div class="field wide">
              <label for="contactMessage">Mensagem</label
              ><textarea
                id="contactMessage"
                name="message"
                rows="6"
                required
                maxlength="3000"
              ></textarea>
            </div>
          </div>
          <button class="button full" type="submit">
            ${contactChannels.email ? 'Abrir mensagem no e-mail' : 'Baixar rascunho da mensagem'}
          </button>
          <p id="contactStatus" role="status" class="tiny muted"></p>
        </form>
      </div>
    </div>
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
