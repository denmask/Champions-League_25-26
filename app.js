let data = {};
let currentSection = 'classifica';

const TEAM_COLORS = {
  'Arsenal':'#EF0107','Bayern':'#DC052D','Liverpool':'#C8102E','Tottenham':'#FFFFFF',
  'Barcellona':'#004D98','Chelsea':'#034694','Sporting Lisbona':'#00843D','Manchester City':'#6CABDD',
  'Real Madrid':'#FFFFFF','Inter':'#009BDB','Paris Saint-Germain':'#004170','Newcastle United':'#241F20',
  'Juventus':'#000000','Atletico Madrid':'#CB3524','Atalanta':'#1E71B8','Bayer Leverkusen':'#E32221',
  'Borussia Dortmund':'#FDE100','Olympiacos':'#CF0A2C','Bruges':'#0055A4','Galatasaray':'#FDB913',
  'Monaco':'#E7001B','Qarabag':'#2D2D2D','Bodo Glimt':'#FFD700','Benfica':'#FF0000',
  'Marsiglia':'#2FAEE0','Pafos':'#F5C518','Union Saint Gilloise':'#FFD200',
  'PSV Eindhoven':'#ED1C24','Athletic Bilbao':'#EE2523','Napoli':'#12A0D7','Copenaghen':'#006AB5',
  'Ajax':'#CF0A2C','Eintracht':'#E1000F','Slavia Praga':'#CF122E','Villarreal':'#FFCD00',
  'Kairat Almaty':'#FDD800','PSG':'#004170'
};

function teamColorHtml(nome, size) {
  size = size || 28;
  var color = TEAM_COLORS[nome] || '#888';
  var border = (nome === 'Juventus' || nome === 'Qarabag' || nome === 'Real Madrid' || nome === 'Tottenham')
    ? '2px solid rgba(255,255,255,0.3)'
    : 'none';

  // --- LOGICHE COLORI SPECIALI AGGIORNATE ---

  // Arsenal: Bianco e Rosso, gradiente verticale (come Atletico/Monaco)
  if (nome === 'Arsenal') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(180deg,#EF0107 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }

  // Barcellona: Blaugrana (Blu e Rosso)
  if (nome === 'Barcellona') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(90deg,#004D98 50%,#A50044 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }

  // Bayern Monaco: Rosso intenso (corretto dal grigio/azzurro)
  if (nome === 'Bayern' || nome === 'Bayern Monaco') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:#DC052D;flex-shrink:0;border:none;overflow:hidden"></div>';
  }

  if (nome === 'Galatasaray') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(90deg,#FDB913 50%,#E80000 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }
  if (nome === 'Newcastle United') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(90deg,#241F20 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }
  if (nome === 'Monaco') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(180deg,#E7001B 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }
  if (nome === 'Olympiacos') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(180deg,#CF0A2C 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }
  if (nome === 'Atletico Madrid') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(180deg,#CB3524 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }
  if (nome === 'Paris Saint-Germain' || nome === 'PSG') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(135deg,#001489 50%,#6B21A8 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
  }

  return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + color + ';flex-shrink:0;border:' + border + '"></div>';
}

function renderNav() {
  const nav = document.getElementById('navInner');
  nav.innerHTML = data.fasiTorneo.map(f => {
    return `<button class="nav-btn ${currentSection===f.id?'active':''}"
      onclick="selectSection('${f.id}')">
      <span class="nav-icon">${f.icona}</span>${f.label}
    </button>`;
  }).join('');
}

function renderClassifica() {
  const c = data.classifica;
  let rows = '';
  c.forEach((t, i) => {
    if (t.pos === 9)  rows += `<tr class="divider-playoff"><td colspan="12"></td></tr>`;
    if (t.pos === 25) rows += `<tr class="divider-elim"><td colspan="12"></td></tr>`;

    const dr = t.dr > 0 ? `<span class="dr-pos">+${t.dr}</span>` : t.dr < 0 ? `<span class="dr-neg">${t.dr}</span>` : `<span class="dr-zero">0</span>`;
    const u5 = t.ultimi5.map(r => `<span class="u5 u5-${r}">${r}</span>`).join('');
    const delay = i * 0.025;

    rows += `<tr class="${t.fase}" style="animation-delay:${delay}s">
      <td><span class="pos-num">${t.pos}</span></td>
      <td>
        <div class="team-cell">
          ${teamColorHtml(t.nome)}
          <span class="team-name">${t.nome}</span>
        </div>
      </td>
      <td class="pts-cell">${t.pts}</td>
      <td class="hide-mobile">${t.pg}</td>
      <td class="hide-mobile">${t.v}</td>
      <td class="hide-mobile">${t.s}</td>
      <td class="hide-mobile">${t.p}</td>
      <td class="hide-mobile">${t.gr}</td>
      <td class="hide-mobile">${t.gs}</td>
      <td>${dr}</td>
      <td class="hide-mobile"><div class="ultimi5">${u5}</div></td>
      <td class="hide-mobile"><span class="fase-badge fase-${t.fase}">${t.fase==='ottavi'?'Ottavi':t.fase==='playoff'?'Playoff':'Elim.'}</span></td>
    </tr>`;
  });

  document.getElementById('mainContent').innerHTML = `
    <div class="section-header">
      <h2>⚽ Classifica — Fase League</h2>
      <div class="badge-info">
        <span class="badge badge-ottavi">● Ottavi diretti (1-8)</span>
        <span class="badge badge-playoff">● Playoff (9-24)</span>
        <span class="badge badge-elim">● Eliminati (25-36)</span>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="classifica-table">
        <thead>
          <tr>
            <th>#</th>
            <th style="text-align:left">Squadra</th>
            <th>PTS</th>
            <th class="hide-mobile">PG</th>
            <th class="hide-mobile">V</th>
            <th class="hide-mobile">S</th>
            <th class="hide-mobile">P</th>
            <th class="hide-mobile">GF</th>
            <th class="hide-mobile">GS</th>
            <th>DR</th>
            <th class="hide-mobile">Ultimi 5</th>
            <th class="hide-mobile">Fase</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderPlayoff() {
  const giornate = data.playoff;
  const html = giornate.map((g, gi) => {
    const partite = g.partite.map(p => {
      const isInCorso = p.stato === 'in corso';
      const haGol = p.gol_casa !== null;
      let casaWin = false, trasWin = false;
      if (haGol) {
        casaWin = p.gol_casa > p.gol_tras;
        trasWin = p.gol_tras > p.gol_casa;
      }
      const golCasa = haGol ? `<span class="partita-gol ${casaWin?'gol-win':'gol-lose'}">${p.gol_casa}</span>` : `<span class="partita-gol gol-nd">?</span>`;
      const golTras = haGol ? `<span class="partita-gol ${trasWin?'gol-win':'gol-lose'}">${p.gol_tras}</span>` : `<span class="partita-gol gol-nd">?</span>`;
      const qualBanner = p.qualificata ? `<div class="qualificata-banner">✓ Qualificato: ${p.qualificata}</div>` : '';

      return `<div class="partita-card ${p.qualificata?'qualificata-card':''} ${isInCorso?'in-corso':''}">
        <div class="partita-stato ${isInCorso?'stato-in-corso':'stato-giocata'}">${isInCorso ? '🔴 QUESTA SERA' : '✓ Giocata'}</div>
        <div class="partita-row">
          ${teamColorHtml(p.casa, 32)}
          <span class="partita-nome">${p.casa}</span>
          ${golCasa}
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${teamColorHtml(p.trasferta, 32)}
          <span class="partita-nome">${p.trasferta}</span>
          ${golTras}
        </div>
        ${qualBanner}
      </div>`;
    }).join('');
    return `<div class="playoff-giornata" style="animation-delay:${gi*0.1}s">
      <div class="playoff-giornata-title">📅 ${g.giornata}</div>
      <div class="partite-grid">${partite}</div>
    </div>`;
  }).join('');

  document.getElementById('mainContent').innerHTML = `
    <div class="section-header"><h2>⚔️ Playoff Round</h2></div>
    <div class="playoff-grid">${html}</div>`;
}

function renderOttavi() {
  const ottavi = data.ottavi;
  const html = ottavi.map((blocco, bi) => {
    const partite = blocco.partite.map(p => {
      return `<div class="partita-card">
        <div class="partita-stato stato-giocata">Ottavi di Finale</div>
        <div class="partita-row">
          ${teamColorHtml(p.casa, 32)}
          <span class="partita-nome">${p.casa}</span>
          <span class="partita-gol gol-nd">-</span>
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${teamColorHtml(p.trasferta, 32)}
          <span class="partita-nome">${p.trasferta}</span>
          <span class="partita-gol gol-nd">-</span>
        </div>
      </div>`;
    }).join('');

    return `<div class="playoff-giornata" style="animation-delay:${bi*0.1}s">
      <div class="playoff-giornata-title" style="background:rgba(255,255,255,0.05);padding:10px;border-radius:8px;font-size:0.9rem">
        🔗 Prossimo incrocio Quarti:<br><strong>${blocco.incrocio_quarti}</strong>
      </div>
      <div class="partite-grid">${partite}</div>
    </div>`;
  }).join('');

  document.getElementById('mainContent').innerHTML = `
    <div class="section-header"><h2>🏟️ Ottavi di Finale</h2></div>
    <div class="playoff-grid">${html}</div>`;
}

function renderComingSoon(label, icon) {
  document.getElementById('mainContent').innerHTML = `
    <div class="coming-soon">
      <span class="cs-icon">${icon}</span>
      <h3>${label}</h3>
      <p>I dati saranno disponibili a breve</p>
    </div>`;
}

function selectSection(id) {
  currentSection = id;
  renderNav();
  switch(id) {
    case 'classifica':  renderClassifica(); break;
    case 'playoff':     renderPlayoff();     break;
    case 'ottavi':      renderOttavi();      break;
    case 'quarti':      renderComingSoon('Quarti di Finale','🔥'); break;
    case 'semifinali':  renderComingSoon('Semifinali','💥'); break;
    case 'finale':      renderComingSoon('Finale','🏆'); break;
  }
}

fetch('data.json')
  .then(r => r.json())
  .then(d => { data = d; selectSection('classifica'); });