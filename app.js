let data = {};
let currentSection = "classifica";

// Funzione per formattare il nome della squadra con prima lettera maiuscola
function formatTeamName(nome) {
  if (!nome) return "";
  return nome
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const TEAM_COLORS = {
  Arsenal: "#EF0107",
  Bayern: "#DC052D",
  Liverpool: "#C8102E",
  Tottenham: "#FFFFFF",
  Barcellona: "#004D98",
  Chelsea: "#034694",
  "Sporting Lisbona": "#00843D",
  "Manchester City": "#6CABDD",
  "Real Madrid": "#FFFFFF",
  Inter: "#009BDB",
  "Paris Saint-Germain": "#004170",
  "Newcastle United": "#241F20",
  Juventus: "#000000",
  "Atletico Madrid": "#CB3524",
  Atalanta: "#1E71B8",
  "Bayer Leverkusen": "#E32221",
  "Borussia Dortmund": "#FDE100",
  Olympiacos: "#CF0A2C",
  Bruges: "#0055A4",
  Galatasaray: "#FDB913",
  Monaco: "#E7001B",
  Qarabag: "#2D2D2D",
  "Bodo Glimt": "#FFD700",
  Benfica: "#FF0000",
  Marsiglia: "#2FAEE0",
  Pafos: "#F5C518",
  "Union Saint Gilloise": "#FFD200",
  "PSV Eindhoven": "#ED1C24",
  "Athletic Bilbao": "#EE2523",
  Napoli: "#12A0D7",
  Copenaghen: "#006AB5",
  Ajax: "#CF0A2C",
  Eintracht: "#E1000F",
  "Slavia Praga": "#CF122E",
  Villarreal: "#FFCD00",
  "Kairat Almaty": "#FDD800",
  PSG: "#004170",
  "Bayern Monaco": "#DC052D",
};

function teamColorHtml(nome, size) {
  size = size || 28;
  let color = TEAM_COLORS[nome] || "#888";
  let border =
    nome === "Juventus" || nome === "Qarabag" || nome === "Real Madrid" || nome === "Tottenham"
      ? "2px solid rgba(255,255,255,0.3)"
      : "none";

  if (nome === "Arsenal") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(180deg,#EF0107 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Barcellona") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(90deg,#004D98 50%,#A50044 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Bayern" || nome === "Bayern Monaco") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:#DC052D;flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Galatasaray") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(90deg,#FDB913 50%,#E80000 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Newcastle United") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(90deg,#241F20 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Monaco") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(180deg,#E7001B 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Olympiacos") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(180deg,#CF0A2C 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Atletico Madrid") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(180deg,#CB3524 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Paris Saint-Germain" || nome === "PSG") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,#001489 50%,#6B21A8 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }
  if (nome === "Sporting Lisbona") {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(90deg,#FFFFFF 50%,#00843D 50%);flex-shrink:0;border:none;overflow:hidden"></div>`;
  }

  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};flex-shrink:0;border:${border}"></div>`;
}

function renderNav() {
  const nav = document.getElementById("navInner");
  nav.innerHTML = data.fasiTorneo
    .map((f) => {
      return `<button class="nav-btn ${currentSection === f.id ? "active" : ""}"
      onclick="selectSection('${f.id}')">
      <span class="nav-icon">${f.icona}</span>${f.label}
    </button>`;
    })
    .join("");
}

function renderClassifica() {
  const c = data.classifica;
  let rows = "";
  c.forEach((t, i) => {
    if (t.pos === 9)
      rows += `<tr class="divider-playoff"><td colspan="12"></td></tr>`;
    if (t.pos === 25)
      rows += `<tr class="divider-elim"><td colspan="12"></td></tr>`;

    const dr =
      t.dr > 0
        ? `<span class="dr-pos">+${t.dr}</span>`
        : t.dr < 0
          ? `<span class="dr-neg">${t.dr}</span>`
          : `<span class="dr-zero">0</span>`;
    const u5 = t.ultimi5
      .map((r) => `<span class="u5 u5-${r}">${r}</span>`)
      .join("");
    const delay = i * 0.025;
    const teamName = formatTeamName(t.nome);

    rows += `<tr class="${t.fase}" style="animation-delay:${delay}s">
      <td><span class="pos-num">${t.pos}</span></td>
      <td>
        <div class="team-cell">
          ${teamColorHtml(t.nome)}
          <span class="team-name">${teamName}</span>
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
      <td class="hide-mobile"><span class="fase-badge fase-${t.fase}">${t.fase === "ottavi" ? "Ottavi" : t.fase === "playoff" ? "Playoff" : "Elim."}</span></td>
    </tr>`;
  });

  document.getElementById("mainContent").innerHTML = `
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
  const html = giornate
    .map((g, gi) => {
      const partite = g.partite
        .map((p) => {
          const isInCorso = p.stato === "in corso";
          const haGol = p.gol_casa !== null;
          let casaWin = false,
            trasWin = false;
          if (haGol) {
            casaWin = p.gol_casa > p.gol_tras;
            trasWin = p.gol_tras > p.gol_casa;
          }
          const golCasa = haGol
            ? `<span class="partita-gol ${casaWin ? "gol-win" : "gol-lose"}">${p.gol_casa}</span>`
            : `<span class="partita-gol gol-nd">?</span>`;
          const golTras = haGol
            ? `<span class="partita-gol ${trasWin ? "gol-win" : "gol-lose"}">${p.gol_tras}</span>`
            : `<span class="partita-gol gol-nd">?</span>`;
          const qualBanner = p.qualificata
            ? `<div class="qualificata-banner">✓ Qualificato: ${formatTeamName(p.qualificata).toUpperCase()}</div>`
            : "";

          let casaName = formatTeamName(p.casa);
          let trasName = formatTeamName(p.trasferta);

          if (p.qualificata) {
            if (p.casa === p.qualificata) {
              casaName = casaName.toUpperCase();
            }
            if (p.trasferta === p.qualificata) {
              trasName = trasName.toUpperCase();
            }
          }

          return `<div class="partita-card ${p.qualificata ? "qualificata-card" : ""} ${isInCorso ? "in-corso" : ""}">
        <div class="partita-stato ${isInCorso ? "stato-in-corso" : "stato-giocata"}">${isInCorso ? "🔴 QUESTA SERA" : "✓ Giocata"}</div>
        <div class="partita-row">
          ${teamColorHtml(p.casa, 32)}
          <span class="partita-nome">${casaName}</span>
          ${golCasa}
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${teamColorHtml(p.trasferta, 32)}
          <span class="partita-nome">${trasName}</span>
          ${golTras}
        </div>
        ${qualBanner}
      </div>`;
        })
        .join("");
      return `<div class="playoff-giornata" style="animation-delay:${gi * 0.1}s">
      <div class="playoff-giornata-title">📅 ${g.giornata}</div>
      <div class="partite-grid">${partite}</div>
    </div>`;
    })
    .join("");

  document.getElementById("mainContent").innerHTML = `
    <div class="section-header"><h2>⚔️ Playoff Round</h2></div>
    <div class="playoff-grid">${html}</div>`;
}

// Funzione per calcolare l'aggregato tra andata e ritorno
function calculateAggregate(partite) {
  let team1Gol = 0, team2Gol = 0;
  let team1Nome = "", team2Nome = "";

  partite.forEach((p) => {
    if (p.stato && p.stato !== "da giocare" && p.stato !== "in corso") {
      const parts = p.stato.split("-");
      let golCasa = parseInt(parts[0]);
      let golTras = parseInt(parts[1].split(" ")[0]);
      
      if (p.tipo === "andata") {
        team1Nome = p.casa;
        team2Nome = p.trasferta;
        team1Gol += golCasa;
        team2Gol += golTras;
      } else if (p.tipo === "ritorno") {
        team1Gol += golTras;
        team2Gol += golCasa;
      }
    }
  });

  let qualificata = null;
  if (team1Gol > team2Gol) qualificata = team1Nome;
  else if (team2Gol > team1Gol) qualificata = team2Nome;

  return { team1Gol, team2Gol, team1Nome, team2Nome, qualificata };
}

// Funzione GENERICA per renderizzare qualsiasi turno ad eliminazione diretta
function renderKnockoutRound(stageKey, stageTitle, stageIcon) {
  const stageData = data[stageKey];
  if (!stageData || !stageData.length) {
    document.getElementById("mainContent").innerHTML = `
      <div class="section-header"><h2>${stageIcon} ${stageTitle}</h2></div>
      <div style="text-align:center;padding:40px;background:rgba(255,255,255,0.05);border-radius:16px">📅 In attesa del sorteggio</div>`;
    return;
  }

  // Raggruppa le partite per accoppiamento (andata+ritorno)
  const matchesByTie = {};
  
  stageData.forEach(giornata => {
    giornata.partite.forEach(partita => {
      const key = [partita.casa, partita.trasferta].sort().join("_");
      if (!matchesByTie[key]) {
        matchesByTie[key] = {
          squadra1: partita.casa,
          squadra2: partita.trasferta,
          partite: []
        };
      }
      matchesByTie[key].partite.push(partita);
    });
  });

  const html = Object.values(matchesByTie).map((tie, idx) => {
    const andata = tie.partite.find(p => p.tipo === "andata");
    const ritorno = tie.partite.find(p => p.tipo === "ritorno");
    const isFinale = tie.partite[0]?.tipo === "finale";
    
    // Calcola aggregato se entrambe le partite sono giocate
    let aggregato = null;
    let qualificata = null;
    
    if (andata?.stato !== "da giocare" && ritorno?.stato !== "da giocare" && !isFinale) {
      const agg = calculateAggregate(tie.partite);
      aggregato = `${agg.team1Gol} - ${agg.team2Gol}`;
      qualificata = agg.qualificata;
    } else if (isFinale && andata?.stato !== "da giocare") {
      const parts = andata.stato.split("-");
      aggregato = andata.stato;
      const golCasa = parseInt(parts[0]);
      const golTras = parseInt(parts[1].split(" ")[0]);
      qualificata = golCasa > golTras ? andata.casa : andata.trasferta;
    }

    const renderPartita = (p, isRitorno) => {
      if (!p) return "";
      const daGiocare = p.stato === "da giocare" || p.stato === "in corso";
      let golCasaHtml, golTrasHtml;
      let casaVincente = false, trasVincente = false;

      if (!daGiocare && p.stato && p.stato !== "da giocare" && p.stato !== "in corso") {
        const parts = p.stato.split("-");
        let golCasa = parseInt(parts[0]);
        let golTras = parseInt(parts[1].split(" ")[0]);
        casaVincente = golCasa > golTras;
        trasVincente = golTras > golCasa;
        golCasaHtml = `<span class="partita-gol ${casaVincente ? "gol-win" : "gol-lose"}">${golCasa}</span>`;
        golTrasHtml = `<span class="partita-gol ${trasVincente ? "gol-win" : "gol-lose"}">${golTras}</span>`;
      } else {
        golCasaHtml = `<span class="partita-gol gol-nd">-</span>`;
        golTrasHtml = `<span class="partita-gol gol-nd">-</span>`;
      }

      let casaName = formatTeamName(p.casa);
      let trasName = formatTeamName(p.trasferta);

      // Metti in MAIUSCOLO la squadra qualificata
      if (qualificata && isRitorno) {
        if (p.casa === qualificata) casaName = casaName.toUpperCase();
        if (p.trasferta === qualificata) trasName = trasName.toUpperCase();
      }

      const tipoLabel = p.tipo === "finale" ? "Finale" : (p.tipo === "ritorno" ? "Ritorno" : "Andata");
      const statoClass = daGiocare ? "stato-da-giocare" : "stato-giocata";
      const statoText = daGiocare ? "📅 Da giocare" : "✓ Giocata";

      return `<div class="partita-card">
        <div class="partita-stato ${statoClass}">${tipoLabel} — ${statoText}</div>
        <div class="partita-row">
          ${teamColorHtml(p.casa, 32)}
          <span class="partita-nome">${casaName}</span>
          ${golCasaHtml}
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${teamColorHtml(p.trasferta, 32)}
          <span class="partita-nome">${trasName}</span>
          ${golTrasHtml}
        </div>
      </div>`;
    };

    return `<div class="playoff-giornata" style="animation-delay:${idx * 0.1}s">
      <div class="playoff-giornata-title">
        ${isFinale ? "🏆 FINALE" : `🎯 ${formatTeamName(tie.squadra1)} vs ${formatTeamName(tie.squadra2)}`}
        ${aggregato ? `<span style="font-size:0.8rem;margin-left:12px;color:#c8a951">AGG: ${aggregato}</span>` : ""}
        ${qualificata && !isFinale ? `<span style="font-size:0.8rem;margin-left:12px;color:#4CAF50">✓ QUALIFICATA: ${formatTeamName(qualificata).toUpperCase()}</span>` : ""}
      </div>
      <div class="partite-grid">
        ${renderPartita(andata, false)}
        ${!isFinale ? renderPartita(ritorno, true) : ""}
      </div>
    </div>`;
  }).join("");

  document.getElementById("mainContent").innerHTML = `
    <div class="section-header"><h2>${stageIcon} ${stageTitle}</h2></div>
    <div class="playoff-grid">${html}</div>`;
}

// Wrapper per ogni fase
const renderOttavi = () => renderKnockoutRound("ottavi", "Ottavi di Finale", "🏟️");
const renderQuarti = () => renderKnockoutRound("quarti", "Quarti di Finale", "🔥");
const renderSemifinali = () => renderKnockoutRound("semifinali", "Semifinali", "💥");
const renderFinale = () => renderKnockoutRound("finale", "Finale", "🏆");

function selectSection(id) {
  currentSection = id;
  renderNav();
  switch (id) {
    case "classifica":
      renderClassifica();
      break;
    case "playoff":
      renderPlayoff();
      break;
    case "ottavi":
      renderOttavi();
      break;
    case "quarti":
      renderQuarti();
      break;
    case "semifinali":
      renderSemifinali();
      break;
    case "finale":
      renderFinale();
      break;
  }
}

// Inizializzazione
fetch("data.json")
  .then((r) => r.json())
  .then((d) => {
    data = d;
    selectSection("classifica");
  });