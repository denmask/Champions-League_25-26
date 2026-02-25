let data = {};
let currentSection = 'classifica';

const LOGOS = {
  'Arsenal':             'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  'Bayern':              'https://images/bayern.png',
  'Liverpool':           'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  'Tottenham':           'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'Barcellona':          'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  'Chelsea':             'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  'Sporting Lisbona':    'https://upload.wikimedia.org/wikipedia/en/f/f8/Sporting_CP_%28black%29.svg',
  'Manchester City':     'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'Real Madrid':         'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  'Inter':               'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
  'Paris Saint-Germain': 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
  'Newcastle United':    'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
  'Juventus':            'https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_icon_%28black%29.svg',
  'Atletico Madrid':     'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_de_madrid_crest.svg',
  'Atalanta':            'https://upload.wikimedia.org/wikipedia/commons/4/44/Logo_Atalanta_BC.svg',
  'Bayer Leverkusen':    'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
  'Borussia Dortmund':   'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
  'Olympiacos':          'https://upload.wikimedia.org/wikipedia/en/0/0e/Olympiacos_FC_logo.svg',
  'Bruges':              'https://upload.wikimedia.org/wikipedia/en/f/f5/Club_Brugge_KV_logo.svg',
  'Galatasaray':         'https://upload.wikimedia.org/wikipedia/commons/e/eb/Galatasaray_Sport_Club_crest.svg',
  'Monaco':              'https://upload.wikimedia.org/wikipedia/en/e/ea/AS_Monaco_FC.svg',
  'Qarabag':             'https://upload.wikimedia.org/wikipedia/en/3/31/Qarabag_FK_logo.svg',
  'Bodo Glimt':          'https://upload.wikimedia.org/wikipedia/en/6/6a/FK_Bod%C3%B8%2FGlimt_logo.svg',
  'Benfica':             'https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg',
  'Marsiglia':           'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg',
  'Pafos':               'https://upload.wikimedia.org/wikipedia/en/d/d2/Pafos_FC_logo.svg',
  'Union Saint Gilloise':'https://upload.wikimedia.org/wikipedia/en/5/53/Royale_Union_Saint-Gilloise_logo.svg',
  'PSV Eindhoven':       'https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg',
  'Athletic Bilbao':     'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_de_Bilbao_logo.svg',
  'Napoli':              'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli.svg',
  'Copenaghen':          'https://upload.wikimedia.org/wikipedia/en/6/66/FC_Copenhagen_logo.svg',
  'Ajax':                'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg',
  'Eintracht':           'https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg',
  'Slavia Praga':        'https://upload.wikimedia.org/wikipedia/en/1/1f/SK_Slavia_Prague_logo.svg',
  'Villarreal':          'https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg',
  'Kairat Almaty':       'https://upload.wikimedia.org/wikipedia/en/9/94/FC_Kairat_logo.svg'
};

const EMOJI_FALLBACK = {
  'Arsenal':'🔴','Bayern':'🔴','Liverpool':'🔴','Tottenham':'⚪','Barcellona':'🔵',
  'Chelsea':'🔵','Sporting Lisbona':'🟢','Manchester City':'🔵','Real Madrid':'⚪',
  'Inter':'🔵','Paris Saint-Germain':'🔵','Newcastle United':'⚫','Juventus':'⚫',
  'Atletico Madrid':'🔴','Atalanta':'🔵','Bayer Leverkusen':'🔴','Borussia Dortmund':'🟡',
  'Olympiacos':'🔴','Bruges':'🔵','Galatasaray':'🟡','Monaco':'🔴','Qarabag':'⚫',
  'Bodo Glimt':'🟡','Benfica':'🔴','Marsiglia':'🔵','Pafos':'🟡','Union Saint Gilloise':'🟡',
  'PSV Eindhoven':'🔴','Athletic Bilbao':'🔴','Napoli':'🔵','Copenaghen':'🔵','Ajax':'🔴',
  'Eintracht':'⚫','Slavia Praga':'🔴','Villarreal':'🟡','Kairat Almaty':'🟡'
};

function logoHtml(nome, size=28) {
  const url = LOGOS[nome];
  if (url) {
    return `<div class="team-logo" style="width:${size}px;height:${size}px">
      <img src="${url}" alt="${nome}" onerror="this.parentNode.innerHTML='${EMOJI_FALLBACK[nome]||'⚽'}'" />
    </div>`;
  }
  return `<div class="team-logo" style="width:${size}px;height:${size}px;font-size:${size*0.5}px">${EMOJI_FALLBACK[nome]||'⚽'}</div>`;
}

function partitaLogoHtml(nome) {
  const url = LOGOS[nome];
  if (url) {
    return `<div class="partita-logo">
      <img src="${url}" alt="${nome}" onerror="this.parentNode.innerHTML='${EMOJI_FALLBACK[nome]||'⚽'}'" />
    </div>`;
  }
  return `<div class="partita-logo" style="font-size:18px">${EMOJI_FALLBACK[nome]||'⚽'}</div>`;
}

function renderNav() {
  const nav = document.getElementById('navInner');
  nav.innerHTML = data.fasiTorneo.map(f => {
    const disabled = ['ottavi','quarti','semifinali','finale'].includes(f.id) ? 'disabled' : '';
    return `<button class="nav-btn ${currentSection===f.id?'active':''} ${disabled}"
      onclick="${disabled?'':'selectSection(\''+f.id+'\')'}">
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
          ${logoHtml(t.nome)}
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

      const golCasa = haGol
        ? `<span class="partita-gol ${casaWin?'gol-win':'gol-lose'}">${p.gol_casa}</span>`
        : `<span class="partita-gol gol-nd">?</span>`;
      const golTras = haGol
        ? `<span class="partita-gol ${trasWin?'gol-win':'gol-lose'}">${p.gol_tras}</span>`
        : `<span class="partita-gol gol-nd">?</span>`;

      const qualBanner = p.qualificata
        ? `<div class="qualificata-banner">✓ Qualificato: ${p.qualificata}</div>`
        : '';

      return `<div class="partita-card ${p.qualificata?'qualificata-card':''} ${isInCorso?'in-corso':''}">
        <div class="partita-stato ${isInCorso?'stato-in-corso':'stato-giocata'}">
          ${isInCorso ? '🔴 QUESTA SERA' : '✓ Giocata'}
        </div>
        <div class="partita-row">
          ${partitaLogoHtml(p.casa)}
          <span class="partita-nome">${p.casa}</span>
          ${golCasa}
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${partitaLogoHtml(p.trasferta)}
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
    <div class="section-header">
      <h2>⚔️ Playoff Round</h2>
    </div>
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
    case 'playoff':     renderPlayoff();    break;
    case 'ottavi':      renderComingSoon('Ottavi di Finale','🏟️'); break;
    case 'quarti':      renderComingSoon('Quarti di Finale','🔥'); break;
    case 'semifinali':  renderComingSoon('Semifinali','💥'); break;
    case 'finale':      renderComingSoon('Finale','🏆'); break;
  }
}

fetch('data.json')
  .then(r => r.json())
  .then(d => { data = d; selectSection('classifica'); });