# Quiz da Árvore de Natal — Gaivotta

Página mobile de captação de demanda de árvore de Natal. A cliente responde 12 perguntas
rápidas (uma por tela) e, no final, a página monta o briefing e abre o WhatsApp da loja
com tudo já escrito — tamanho, estilo, prazo, região e o que ela precisa.

Feito para rodar no celular, para colar na bio do Instagram e nos stories.

- Uma pergunta por tela, com ilustração e cor próprias
- Resposta única avança sozinha no toque (menos fricção que um formulário)
- Festão de luzes no topo como barra de progresso
- Tudo em um arquivo só, sem build, sem servidor, sem banco de dados

## Antes de divulgar

**1. Trocar o número do WhatsApp.** Abra `index.html`, procure a linha:

```js
const WHATSAPP = "5599999999999";
```

Troque pelo número que recebe os briefings, só dígitos, no formato `55` + DDD + número.
Exemplo para um número de Maceió: `5582988887777`.

**2. Conferir as duas promessas do quiz.** A pergunta "Do que você precisa da gente?"
oferece **montagem no local** e a pergunta da árvore oferece **aluguel para a temporada**.
Se a loja não fizer algum dos dois, apague a opção antes de publicar — prometer no quiz e
negar no atendimento queima a lead.

## Editando as perguntas

As perguntas ficam no array `PASSOS`, dentro de `index.html`. Cada item é uma tela:

```js
{ id:"tamanho", tipo:"unica", art:"medida", banda:"cereja",
  q:"Qual o tamanho que você quer?",
  dica:"Dica de ouro: meça do chão ao teto e tire 50 cm...",
  ops:[ {v:"1,80 m", sub:"A queridinha das salas"} ] }
```

- `tipo`: `unica` (escolhe uma e avança), `chips` (várias, com `max` opcional) ou `campos` (digitar)
- `art`: qual ilustração aparece — as disponíveis estão no objeto `ART`
- `banda`: cor de fundo da ilustração — `creme`, `pinho`, `dourado`, `cereja`, `neve` ou `indigo`
- `id`: chave da resposta; para ela aparecer no resumo e no WhatsApp, inclua no array `RESUMO`

O número de perguntas se ajusta sozinho: o festão de luzes e o contador leem o tamanho de `PASSOS`.

## Publicação

A página é servida pelo GitHub Pages a partir da branch `main`. Qualquer alteração em
`index.html` que for para o `main` entra no ar em um ou dois minutos.

## Créditos visuais

Paleta da marca (indigo e laranja do sol) com o Natal da loja: vermelho, dourado e verde
profundo. A gaivota da capa é um desenho de apoio — trocar pelo símbolo oficial quando
tiver o arquivo.
