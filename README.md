# Quiz da Árvore de Natal — Gaivotta

Página mobile de captação de demanda de árvore de Natal. A cliente responde 8 perguntas
rápidas (uma por tela) e, no final, a página monta o briefing e abre o WhatsApp da loja
com tudo já escrito — serviço, tamanho, estilo, prazo e região.

As perguntas são: onde vai ficar, do que ela precisa da loja, se já tem a árvore, tamanho,
enfeites, estilo, e os dados de contato. Duas aparecem só quando fazem sentido: **região**
entra para quem vai receber equipe em casa, e **prazo** só para quem não vai marcar um
horário de verdade no fim (ver a seção da agenda abaixo).

Feito para rodar no celular, para colar na bio do Instagram e nos stories.

- Uma pergunta por tela, com ilustração e cor próprias
- O contador e o festão se ajustam sozinhos ao caminho de cada pessoa
- Resposta única avança sozinha no toque (menos fricção que um formulário)
- Festão de luzes no topo como barra de progresso
- Tudo em um arquivo só, sem build, sem servidor, sem banco de dados

## Antes de divulgar

**1. Número do WhatsApp.** Já configurado: `5582993964110`, o número oficial da montagem
de árvores. Para trocar, é a constante `WHATSAPP` no topo do `<script>` em `index.html`,
só dígitos, no formato `55` + DDD + número.

**2. O que o quiz promete.** Ele oferece **montagem no local**, que a loja faz. **Aluguel
de árvore foi removido** em 06/10/2026, porque a loja não aluga. Antes de incluir qualquer
opção nova, confira se a operação entrega — prometer no quiz e negar no atendimento queima
a lead.

## Ligando a agenda (a cliente escolhe o horário)

O quiz pode terminar na agenda da loja em vez de terminar no WhatsApp: a cliente escolhe
um horário livre de verdade e o evento cai no Google Agenda de vocês, já com o briefing
dela nas observações. Enquanto isso não estiver configurado, o quiz continua terminando
no WhatsApp normalmente — nada quebra.

**Passo 1.** Criar uma conta em [cal.com](https://cal.com) com o e-mail da loja e conectar
o Google Agenda (Apps → Google Calendar). É o que faz o Cal enxergar os compromissos que
já existem e nunca oferecer um horário ocupado.

**Passo 2.** Criar quatro tipos de evento, com estes apelidos e durações:

| Apelido (o texto que vai na URL) | Duração | Quando é usado |
| --- | --- | --- |
| `visita-tecnica` | 30 min | Projeto completo, ou quando a cliente não sabe o tamanho |
| `montagem-ate-180` | 1h30 | Árvores de até 1,80 m |
| `montagem-210-240` | 2h30 | Árvores de 2,10 m a 2,40 m |
| `montagem-3m` | 4h | Árvores de 3 m ou mais, lojas e pé-direito alto |

As durações são um chute inicial, feito pra ser corrigido: depois das primeiras montagens
de novembro, ajustem com o tempo real. Em cada tipo de evento vale configurar também o
intervalo entre atendimentos (deslocamento pela cidade), a antecedência mínima e quantas
montagens cabem por dia.

**Passo 3.** Já feito: a conta é `cal.com/gaivotta`, com os quatro tipos de evento
criados, local definido como endereço do participante, 24h de aviso mínimo e intervalo de
60 minutos para deslocamento (30 na visita). O limite por dia começou em 4 visitas, 3
montagens pequenas, 2 médias e 1 grande — ajustar conforme a equipe aguentar.

A disponibilidade está **segunda a sábado, 9h às 17h**. Para mudar, é em
Disponibilidade → Working hours, no Cal.

Quem escolhe **Montagem no local**, **Montagem e desmontagem** ou **Projeto
completo** passa a ver "Escolher dia e horário" no fim do quiz, com o WhatsApp como
segunda opção. Quem escolhe **só os materiais** ou **kit pronto** continua terminando no
WhatsApp, porque não ocupa equipe.

### O que ainda é manual

A desmontagem de janeiro não é agendada pelo quiz — quem marca "Montagem e desmontagem"
agenda só a ida. A volta é combinada no atendimento.

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
