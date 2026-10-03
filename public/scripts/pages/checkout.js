function checkout() {
  if (!count())
    return html`<section class="page wrap">
      ${empty(
        'Selecione uma peça primeiro',
        'Adicione uma peça demonstrativa ao carrinho para conhecer o checkout.',
      )}
    </section>`;
  return html`<section class="page wrap">
    ${breadcrumb('Checkout')}
    <h1>Seu próximo detalhe</h1>
    <p class="steps">1. Carrinho · 2. Seus dados · 3. Revisão</p>
    <div class="cart-layout">
      <div class="panel">
        <h2>Conheça o checkout</h2>
        <p class="info">
          Use dados fictícios para testar. Os dados deste formulário ficam apenas nesta página, não
          são enviados nem armazenados.
        </p>
        <form id="checkoutForm">
          <div class="form-grid">
            ${field('nome', 'Nome completo', 'text', true, 'name')}${field(
              'email',
              'E-mail',
              'email',
              false,
              'email',
            )}${field('telefone', 'Telefone', 'tel', false, 'tel')}${field(
              'cep',
              'CEP',
              'text',
              false,
              'postal-code',
            )}${field('cidade', 'Cidade', 'text', false, 'address-level2')}${field(
              'endereco',
              'Endereço e número',
              'text',
              true,
              'street-address',
            )}
            <div class="field">
              <label for="estado">Estado</label
              ><select id="estado" name="estado" required>
                <option value="">Selecione</option>
                ${'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'
                  .split(' ')
                  .map((s) => html`<option>${s}</option>`)
                  .join('')}
              </select>
            </div>
            <div class="field">
              <label for="complemento">Complemento (opcional)</label
              ><input id="complemento" name="complemento" maxlength="100" />
            </div>
          </div>
          <button class="button full" type="submit">Revisar demonstração</button>
        </form>
        <div id="checkoutReview"></div>
      </div>
      ${summary(true)}
    </div>
  </section>`;
}
