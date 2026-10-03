# Revisão do movimento

| Antes                                            | Depois                                                                   | Motivo                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Notificação alternava `display`                  | Transição de opacidade e deslocamento, reaproveitando a mesma superfície | Repetições não reiniciam o efeito; feedback continua imediato |
| Navegação substituía conteúdo abruptamente       | Entrada curta de 180 ms apenas quando a rota muda por ponteiro           | Suaviza a mudança sem atrasar busca, teclado ou quantidade    |
| Hero animava apenas o título                     | Apresentação inicial em três passos com intervalo de 45 ms               | Organiza a leitura de título, texto e ação                    |
| Chamadas da vitrine eram blocos verdes idênticos | Links com linha fina e indicação de direção                              | Dá prioridade às peças e reduz repetição visual               |
| Movimento distribuído sem tokens                 | Curva e durações nomeadas, isoladas em arquivos próprios                 | Facilita manutenção e consistência                            |

Movimento de controles abaixo de 300 ms; hover restrito a ponteiro fino; movimento reduzido respeitado. A transição de preto e branco para cor foi preservada por solicitação explícita, apesar de `filter` não ser uma propriedade composta em todos os dispositivos. No celular as fotos permanecem coloridas.

Critério de aceitação: conteúdo visível sem animação, feedback imediato, ausência de animação nos rerenders de quantidade/favoritos e preferência de movimento reduzido aplicada.
