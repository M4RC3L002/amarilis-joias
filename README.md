# Amarílis Jóias

Vitrine demonstrativa da Amarílis: catálogo, busca, favoritos, carrinho e revisão de checkout. A loja ainda não recebe pedidos nem pagamentos.

**Site:** https://amarilis-joias.pages.dev

## Organização

```text
public/
  index.html            Entrada da aplicação
  assets/               Fotografias, logotipos e ícones
  data/catalog.json     Catálogo e fontes das fotos
  styles/
    base.css            Tokens, controles e layout das páginas
    storefront.css      Identidade e composição da vitrine
    motion.css          Acabamento visual e transições
  scripts/
    state.js            Estado local e persistência
    components.js       Cabeçalho, rodapé e controles
    pages/              Renderização de cada página
    router.js           Rotas por hash
    events.js           Interações, busca e checkout
    motion.js           Movimento e acessibilidade
    main.js             Carregamento inicial
tools/check.mjs        Verificação de sintaxe e arquivos
docs/                  Arquitetura, créditos e revisão
```

## Rodar localmente

Sirva a pasta do projeto por HTTP:

```sh
python -m http.server 4173 --directory public
```

Acesse http://localhost:4173. Não há etapa de build nem dependências de execução. Os scripts nativos são carregados com `defer`, na ordem declarada no HTML.

## Manutenção

```sh
npm ci
npm run check
npm run format:check
npm run format
```

Prettier é uma dependência apenas de desenvolvimento. Para trocar o catálogo, edite `public/data/catalog.json` e coloque as imagens em `public/assets/`. As páginas ficam em `public/scripts/pages/`; as regras de movimento estão isoladas em `public/scripts/motion.js` e `public/styles/motion.css`.

## Publicação

Cloudflare Pages acompanha a branch `main`: framework **Nenhum**, comando de build `npm run check` e diretório de saída `public`. Cada commit dispara uma nova implantação. Mantenha `index.html` dentro de `public`.

## Antes de vender

Cadastrar produtos reais com preços e estoque; integrar pedidos, pagamento e frete; definir canais de atendimento e políticas da loja. O carrinho e os favoritos são locais ao navegador. Os dados de teste do checkout não são enviados nem armazenados.

As cores e o logotipo vêm da identidade fornecida. Georgia é a fonte provisória dos títulos até recebermos a webfont autorizada da Oligha. As fotos da vitrine são referências ilustrativas, com [créditos](docs/photo-credits.md).