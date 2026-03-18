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

  // Sporting Lisbona: Bianco e Verde (come le fasce della maglia)
  if (nome === 'Sporting Lisbona') {
    return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(90deg,#FFFFFF 50%,#00843D 50%);flex-shrink:0;border:none;overflow:hidden"></div>';
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

function calculateAggregate(partite) {
  let team1Gol = 0, team2Gol = 0;
  
  // partite[0] = andata (team1 in casa)
  // partite[1] = ritorno (team2 in casa = team1 in trasferta)
  
  if (partite[0].stato !== 'da giocare') {
    const parts0 = partite[0].stato.split('-');
    let gol0casa = parseInt(parts0[0]);
    let gol0tras = parseInt(parts0[1].split(' ')[0]);
    
    // Andata: casa è team1, trasferta è team2
    team1Gol += gol0casa;
    team2Gol += gol0tras;
  }
  
  if (partite[1].stato !== 'da giocare') {
    const parts1 = partite[1].stato.split('-');
    let gol1casa = parseInt(parts1[0]);
    let gol1tras = parseInt(parts1[1].split(' ')[0]);
    
    // Ritorno: casa è team2, trasferta è team1
    // Quindi: gol1casa conta per team2, gol1tras conta per team1
    team1Gol += gol1tras;
    team2Gol += gol1casa;
  }
  
  return { team1Gol, team2Gol };
}

function renderOttavi() {
  const ottavi = data.ottavi;
  const html = ottavi.map((blocco, bi) => {
    const partite = blocco.partite.map((p, pi) => {
      const daGiocare = p.stato === 'da giocare';
      const tipoLabel = p.tipo === 'ritorno' ? 'Ritorno' : 'Andata';
      
      // Se è ritorno, calcola l'aggregato
      let aggregato = null;
      if (p.tipo === 'ritorno' && !daGiocare) {
        // Trova la sfida a cui appartiene questo ritorno
        const sfidaIndex = blocco.partite.indexOf(p) > 1 ? 1 : 0;
        const sfida = blocco.partite.slice(sfidaIndex * 2, sfidaIndex * 2 + 2);
        const agg = calculateAggregate(sfida);
        aggregato = `${agg.team2Gol}-${agg.team1Gol}`; // Invertito perché team2 è a casa nel ritorno
      }

      let golCasaHtml, golTrasHtml, statoHtml;

      if (daGiocare) {
        golCasaHtml = `<span class="partita-gol gol-nd">-</span>`;
        golTrasHtml = `<span class="partita-gol gol-nd">-</span>`;
        
        // Se è ritorno, mostra "AGG:" senza risultato
        const aggLabel = p.tipo === 'ritorno' ? `<span style="font-size:0.75rem;color:#c8a951;margin-left:8px;font-weight:bold">AGG: -</span>` : '';
        statoHtml = `<div class="partita-stato" style="color:#aaa;display:flex;align-items:center">${tipoLabel} — Da giocare${aggLabel}</div>`;
      } else {
        const parts = p.stato.split('-');
        let golCasa = parseInt(parts[0]);
        let golTras = parseInt(parts[1].split(' ')[0]);
        const casaWin = golCasa > golTras;
        const trasWin = golTras > golCasa;
        golCasaHtml = `<span class="partita-gol ${casaWin ? 'gol-win' : 'gol-lose'}">${golCasa}</span>`;
        golTrasHtml = `<span class="partita-gol ${trasWin ? 'gol-win' : 'gol-lose'}">${golTras}</span>`;
        
        // Aggiungi l'aggregato se è ritorno
        const aggText = aggregato ? `<span style="font-size:0.75rem;color:#c8a951;margin-left:8px;font-weight:bold">AGG: ${aggregato}</span>` : '';
        statoHtml = `<div class="partita-stato stato-giocata" style="display:flex;align-items:center">${tipoLabel} — ✓ Giocata${aggText}</div>`;
      }

      // Se è ritorno e giocato, determina il vincitore
      let isWinner = false;
      if (!daGiocare && p.tipo === 'ritorno') {
        // Trova la sfida a cui appartiene questo ritorno
        const sfidaIndex = blocco.partite.indexOf(p) > 1 ? 1 : 0;
        const sfida = blocco.partite.slice(sfidaIndex * 2, sfidaIndex * 2 + 2);
        const agg = calculateAggregate(sfida);
        
        // Determina il vincitore
        if (sfidaIndex === 0) {
          // Sfida 1: team1 è casa ritorno, team2 è trasferta andata
          isWinner = (p.casa === sfida[1].casa && agg.team2Gol > agg.team1Gol) || 
                     (p.trasferta === sfida[1].trasferta && agg.team1Gol > agg.team2Gol);
        } else {
          // Sfida 2
          isWinner = (p.casa === sfida[1].casa && agg.team2Gol > agg.team1Gol) || 
                     (p.trasferta === sfida[1].trasferta && agg.team1Gol > agg.team2Gol);
        }
      }

      return `<div class="partita-card">
        ${statoHtml}
        <div class="partita-row">
          ${teamColorHtml(p.casa, 32)}
          <span class="partita-nome">${isWinner && p.casa === blocco.partite[blocco.partite.indexOf(p)].casa ? p.casa.toUpperCase() : p.casa}</span>
          ${golCasaHtml}
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${teamColorHtml(p.trasferta, 32)}
          <span class="partita-nome">${isWinner && p.trasferta === blocco.partite[blocco.partite.indexOf(p)].trasferta ? p.trasferta.toUpperCase() : p.trasferta}</span>
          ${golTrasHtml}
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

function renderQuarti() {
  const ottavi = data.ottavi;
  
  // Estrai i vincitori dagli ottavi
  const quartiDati = [];
  
  ottavi.forEach((blocco) => {
    const sfida1 = blocco.partite.slice(0, 2);
    const sfida2 = blocco.partite.slice(2, 4);
    
    // Controlla se sfida1 è completata
    const sfida1Completa = sfida1.every(p => p.stato !== 'da giocare');
    let vincitore1 = null;
    if (sfida1Completa) {
      const agg1 = calculateAggregate(sfida1);
      const team1a = sfida1[0].casa;
      const team1b = sfida1[1].casa;
      vincitore1 = agg1.team1Gol > agg1.team2Gol ? team1a : team1b;
    } else {
      vincitore1 = `${sfida1[0].casa} o ${sfida1[1].casa}`;
    }
    
    // Controlla se sfida2 è completata
    const sfida2Completa = sfida2.every(p => p.stato !== 'da giocare');
    let vincitore2 = null;
    if (sfida2Completa) {
      const agg2 = calculateAggregate(sfida2);
      const team2a = sfida2[0].casa;
      const team2b = sfida2[1].casa;
      vincitore2 = agg2.team1Gol > agg2.team2Gol ? team2a : team2b;
    } else {
      vincitore2 = `${sfida2[0].casa} o ${sfida2[1].casa}`;
    }
    
    quartiDati.push({
      vincitore1,
      vincitore2,
      completa1: sfida1Completa,
      completa2: sfida2Completa,
      team1a: sfida1[0].casa,
      team1b: sfida1[1].casa,
      team2a: sfida2[0].casa,
      team2b: sfida2[1].casa
    });
  });
  
  // Incroci quarti - squadre già definite!
  // 1. PSG vs LIVERPOOL (Liverpool è il secondo di Quarto 1, sfida 2)
  // 2. REAL MADRID vs BAYERN (Bayern è il secondo di Quarto 2, sfida 2)
  // 3. BARCELLONA vs ATLETICO MADRID (Barcellona è il secondo di Quarto 3, sfida 1; Atletico è il primo di sfida 2)
  // 4. ARSENAL vs SPORTING LISBONA (come sono)
  
  const quartiFinali = [
    { 
      squadra1: 'PSG', 
      squadra2: 'Liverpool',
      logo1: 'PSG',
      logo2: 'Liverpool',
      complete: true
    },
    { 
      squadra1: 'Real Madrid', 
      squadra2: 'Bayern',
      logo1: 'Real Madrid',
      logo2: 'Bayern',
      complete: true
    },
    { 
      squadra1: 'Barcellona', 
      squadra2: 'Atletico Madrid',
      logo1: 'Barcellona',
      logo2: 'Atletico Madrid',
      complete: true
    },
    { 
      squadra1: 'Arsenal', 
      squadra2: 'Sporting Lisbona',
      logo1: 'Arsenal',
      logo2: 'Sporting Lisbona',
      complete: true
    }
  ];
  
  // Crea le card dei quarti
  const quartiHtml = quartiFinali.map((q, i) => {
    return `<div class="partita-card" style="animation-delay:${i*0.1}s">
      <div class="partita-stato" style="color:#c8a951">🎯 QUARTI DI FINALE</div>
      <div class="partita-row">
        ${teamColorHtml(q.logo1, 40)}
        <span class="partita-nome" style="color:#fff;font-weight:bold;text-transform:uppercase">${q.squadra1.toUpperCase()}</span>
      </div>
      <div class="vs-sep">VS</div>
      <div class="partita-row">
        ${teamColorHtml(q.logo2, 40)}
        <span class="partita-nome" style="color:#fff;font-weight:bold;text-transform:uppercase">${q.squadra2.toUpperCase()}</span>
      </div>
      <div style="margin-top:8px;padding:8px;background:rgba(200,169,81,0.1);border-radius:6px;font-size:0.75rem;text-align:center;color:rgba(244,246,255,0.6)">
        In attesa di data e orario
      </div>
    </div>`;
  }).join('');

  document.getElementById('mainContent').innerHTML = `
    <div class="section-header"><h2>🔥 Quarti di Finale</h2></div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;animation:rowIn 0.4s ease">${quartiHtml}</div>`;
}

function selectSection(id) {
  currentSection = id;
  renderNav();
  switch(id) {
    case 'classifica':  renderClassifica(); break;
    case 'playoff':     renderPlayoff();     break;
    case 'ottavi':      renderOttavi();      break;
    case 'quarti':      renderQuarti();      break;
    case 'semifinali':  renderComingSoon('Semifinali','💥'); break;
    case 'finale':      renderComingSoon('Finale','🏆'); break;
  }
}

fetch('data.json')
  .then(r => r.json())
  .then(d => { data = d; selectSection('classifica'); });