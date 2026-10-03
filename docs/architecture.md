# Arquitetura

Aplicação estática em HTML, CSS e JavaScript nativo. Sem servidor de pedidos ou integração de pagamento nesta fase.

O estado compartilhado está em `scripts/state.js`. As funções de renderização recebem os dados e produzem HTML; `router.js` escolhe a página. Eventos delegados em `events.js` continuam funcionando após a troca de conteúdo. `main.js` carrega o catálogo e remove referências locais a produtos que já não existem.

Os scripts usam o mesmo escopo e são carregados na ordem do HTML com `defer`. Essa escolha preserva o funcionamento atual sem acrescentar um empacotador. Uma futura integração de pedidos deve separar esse estado de demonstração do estado validado no servidor.

## Movimento

CSS cuida de hover, pressão e notificações. Web Animations API cuida da primeira apresentação do hero e da navegação. Não há listeners contínuos de rolagem. Um IntersectionObserver revela somente o trecho editorial da marca.

Trocas de quantidade e favoritos são imediatas. A navegação pelo teclado não anima. `prefers-reduced-motion` cancela o movimento; o conteúdo permanece legível mesmo sem JavaScript de animação. A opção por transparência reduzida continua oferecendo superfícies opacas.
Os caminhos da aplicação descritos acima são relativos à pasta public; documentos e ferramentas ficam fora da pasta publicada.

## Páginas internas e preparação comercial

- Catálogo: busca por nome, categoria e descrição, com normalização de acentos; ordem A–Z/Z–A; filtros preservam a busca e a página de favoritos.
- Favoritos: persistem no navegador e podem ser adicionados em conjunto ao carrinho.
- Produto: controles de quantidade com limites, acesso ao carrinho e sugestões relacionadas.
- Carrinho: seleção exportável em JSON, sem dados pessoais. Não representa um pedido.
- Checkout: validação nativa, revisão das peças e endereço, retorno para edição sem perder os campos. Dados pessoais não são persistidos nem enviados. Pagamento permanece desabilitado.
- Contato: rascunho em TXT enquanto o atendimento não existe. Configure apenas um e-mail comercial verificado em `contactChannels.email`, no arquivo `public/scripts/pages/brand.js`, para abrir a mensagem no aplicativo de e-mail do cliente. O site não possui serviço de envio.
- Hover: limitado a ponteiros precisos; foco visível e redução de movimento preservados.

Antes da venda: cadastrar produtos próprios, preços, estoque e atributos; conectar serviço de pedidos/pagamentos e cálculo de frete; cadastrar canais reais e publicar políticas comerciais/privacidade aprovadas pelo responsável. A vitrine atual permite uso demonstrativo, não operação comercial.
