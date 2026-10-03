# Arquitetura

Aplicação estática em HTML, CSS e JavaScript nativo. Sem servidor de pedidos ou integração de pagamento nesta fase.

O estado compartilhado está em `scripts/state.js`. As funções de renderização recebem os dados e produzem HTML; `router.js` escolhe a página. Eventos delegados em `events.js` continuam funcionando após a troca de conteúdo. `main.js` carrega o catálogo e remove referências locais a produtos que já não existem.

Os scripts usam o mesmo escopo e são carregados na ordem do HTML com `defer`. Essa escolha preserva o funcionamento atual sem acrescentar um empacotador. Uma futura integração de pedidos deve separar esse estado de demonstração do estado validado no servidor.

## Movimento

CSS cuida de hover, pressão e notificações. Web Animations API cuida da primeira apresentação do hero e da navegação. Não há listeners contínuos de rolagem. Um IntersectionObserver revela somente o trecho editorial da marca.

Trocas de quantidade e favoritos são imediatas. A navegação pelo teclado não anima. `prefers-reduced-motion` cancela o movimento; o conteúdo permanece legível mesmo sem JavaScript de animação. A opção por transparência reduzida continua oferecendo superfícies opacas.
Os caminhos da aplicação descritos acima são relativos à pasta public; documentos e ferramentas ficam fora da pasta publicada.
