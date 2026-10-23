/**
 * Agenda da Aline -> quiz de Natal (natal.gaivotta.com.br)
 *
 * Lê o Google Agenda principal da conta (a agenda "Gaivotta Jatiuca") e
 * devolve só os dias e horários ocupados. Não sai nome de cliente,
 * endereço nem título de evento.
 *
 * Regras:
 *  - Evento de dia inteiro ("MONTAGEM ...", "NÃO POSSO") fecha o dia todo.
 *  - Evento com horário fecha o horário de montagem que ele encosta,
 *    contando uma folga de deslocamento antes e depois.
 *  - Evento recusado não conta.
 *
 * Resposta: {"atualizado":"...","ocupado":{"2026-10-28":["19h"],"2026-10-29":"dia"}}
 *
 * Como publicar (uma vez só, logado na conta dona da agenda):
 *  1. script.google.com > Novo projeto > colar este arquivo.
 *  2. Configurações do projeto > Fuso horário: (GMT-03:00) Maceió.
 *  3. Implantar > Nova implantação > Tipo: App da Web.
 *     Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 *  4. Autorizar o acesso à agenda e copiar o endereço que termina em /exec.
 */

const FUSO = 'America/Maceio';
const ATE = '2026-12-24';
const HORARIOS = { semana: ['19h'], fimDeSemana: ['15h', '19h'] };
const DURACAO_H = 2;    // quanto tempo uma montagem ocupa a partir do horário
const FOLGA_MIN = 60;   // deslocamento antes e depois de outro compromisso
const CACHE_SEG = 300;  // guarda a resposta por 5 minutos

function doGet() {
  const cache = CacheService.getScriptCache();
  let texto = cache.get('ocupado');
  if (!texto) {
    texto = JSON.stringify({ atualizado: new Date().toISOString(), ocupado: calcula_() });
    cache.put('ocupado', texto, CACHE_SEG);
  }
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.JSON);
}

function calcula_() {
  const cal = CalendarApp.getDefaultCalendar();
  const inicio = new Date();
  const fim = new Date(ATE + 'T23:59:59-03:00');
  const ocupado = {};

  const marca = (dia, valor) => {
    if (ocupado[dia] === 'dia') return;
    if (valor === 'dia') { ocupado[dia] = 'dia'; return; }
    const lista = ocupado[dia] || [];
    if (!lista.includes(valor)) lista.push(valor);
    ocupado[dia] = lista;
  };

  cal.getEvents(inicio, fim).forEach(ev => {
    if (ev.getMyStatus() === CalendarApp.GuestStatus.NO) return;

    if (ev.isAllDayEvent()) {
      const d = new Date(ev.getAllDayStartDate());
      const ultimo = ev.getAllDayEndDate();
      while (d < ultimo) { marca(iso_(d), 'dia'); d.setDate(d.getDate() + 1); }
      return;
    }

    const evIni = ev.getStartTime().getTime() - FOLGA_MIN * 60000;
    const evFim = ev.getEndTime().getTime() + FOLGA_MIN * 60000;
    let dia = iso_(new Date(evIni));
    const ultimoDia = iso_(new Date(evFim));
    while (dia <= ultimoDia) {
      horariosDoDia_(dia).forEach(h => {
        const hIni = new Date(dia + 'T' + h.replace('h', '').padStart(2, '0') + ':00:00-03:00').getTime();
        const hFim = hIni + DURACAO_H * 3600000;
        if (hIni < evFim && evIni < hFim) marca(dia, h);
      });
      dia = proximo_(dia);
    }
  });

  return ocupado;
}

function horariosDoDia_(dia) {
  const semana = new Date(dia + 'T12:00:00-03:00').getUTCDay();
  return (semana === 0 || semana === 6) ? HORARIOS.fimDeSemana : HORARIOS.semana;
}

function iso_(data) {
  return Utilities.formatDate(data, FUSO, 'yyyy-MM-dd');
}

function proximo_(dia) {
  const d = new Date(dia + 'T12:00:00-03:00');
  d.setUTCDate(d.getUTCDate() + 1);
  return iso_(d);
}

/** Para testar no editor: Executar > testar e ver o resultado em Registros. */
function testar() {
  Logger.log(JSON.stringify(calcula_(), null, 2));
}
