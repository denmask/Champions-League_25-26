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
};

function teamColorHtml(nome, size) {
  size = size || 28;
  var color = TEAM_COLORS[nome] || "#888";
  var border =
    nome === "Juventus" ||
    nome === "Qarabag" ||
    nome === "Real Madrid" ||
    nome === "Tottenham"
      ? "2px solid rgba(255,255,255,0.3)"
      : "none";

  // --- LOGICHE COLORI SPECIALI AGGIORNATE ---

  // Arsenal: Bianco e Rosso, gradiente verticale (come Atletico/Monaco)
  if (nome === "Arsenal") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(180deg,#EF0107 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }

  // Barcellona: Blaugrana (Blu e Rosso)
  if (nome === "Barcellona") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(90deg,#004D98 50%,#A50044 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }

  // Bayern Monaco: Rosso intenso (corretto dal grigio/azzurro)
  if (nome === "Bayern" || nome === "Bayern Monaco") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:#DC052D;flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }

  if (nome === "Galatasaray") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(90deg,#FDB913 50%,#E80000 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }
  if (nome === "Newcastle United") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(90deg,#241F20 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }
  if (nome === "Monaco") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(180deg,#E7001B 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }
  if (nome === "Olympiacos") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(180deg,#CF0A2C 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }
  if (nome === "Atletico Madrid") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(180deg,#CB3524 50%,#FFFFFF 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }
  if (nome === "Paris Saint-Germain" || nome === "PSG") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(135deg,#001489 50%,#6B21A8 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }

  // Sporting Lisbona: Bianco e Verde (come le fasce della maglia)
  if (nome === "Sporting Lisbona") {
    return (
      '<div style="width:' +
      size +
      "px;height:" +
      size +
      'px;border-radius:50%;background:linear-gradient(90deg,#FFFFFF 50%,#00843D 50%);flex-shrink:0;border:none;overflow:hidden"></div>'
    );
  }

  return (
    '<div style="width:' +
    size +
    "px;height:" +
    size +
    "px;border-radius:50%;background:" +
    color +
    ";flex-shrink:0;border:" +
    border +
    '"></div>'
  );
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

          // Se è il ritorno e c'è una qualificata, mostra in MAIUSCOLO
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

function calculateAggregate(partite) {
  let team1Gol = 0,
    team2Gol = 0;

  // partite[0] = andata (team1 in casa)
  // partite[1] = ritorno (team2 in casa = team1 in trasferta)

  if (partite[0].stato !== "da giocare") {
    const parts0 = partite[0].stato.split("-");
    let gol0casa = parseInt(parts0[0]);
    let gol0tras = parseInt(parts0[1].split(" ")[0]);

    // Andata: casa è team1, trasferta è team2
    team1Gol += gol0casa;
    team2Gol += gol0tras;
  }

  if (partite[1].stato !== "da giocare") {
    const parts1 = partite[1].stato.split("-");
    let gol1casa = parseInt(parts1[0]);
    let gol1tras = parseInt(parts1[1].split(" ")[0]);

    // Ritorno: casa è team2, trasferta è team1
    // Quindi: gol1casa conta per team2, gol1tras conta per team1
    team1Gol += gol1tras;
    team2Gol += gol1casa;
  }

  return { team1Gol, team2Gol };
}

// Funzione unificata per renderizzare stage di knockout
function renderStage(stageKey, stageTitle, stageIcon) {
  const stageData = data[stageKey];
  if (!stageData) {
    document.getElementById("mainContent").innerHTML = renderComingSoon(
      stageTitle,
      stageIcon,
    );
    return;
  }

  const isOttavi = stageKey === "ottavi";
  const isQuarti = stageKey === "quarti";
  const isSemifinali = stageKey === "semifinali";
  const isFinale = stageKey === "finale";

  let html = "";

  if (isOttavi) {
    // OTTAVI: mostra i 4 quarti con andata/ritorno
    html = stageData
      .map((blocco, bi) => {
        const partite = blocco.partite
          .map((p) => {
            const daGiocare = p.stato === "da giocare";
            const tipoLabel = p.tipo === "ritorno" ? "Ritorno" : "Andata";

            // Se è ritorno, calcola l'aggregato e determina il vincitore
            let aggregato = null;
            let casaVincente = false;
            let trasVincente = false;

            if (p.tipo === "ritorno" && !daGiocare) {
              const sfidaIndex = blocco.partite.indexOf(p) > 1 ? 1 : 0;
              const sfida = blocco.partite.slice(
                sfidaIndex * 2,
                sfidaIndex * 2 + 2,
              );
              const agg = calculateAggregate(sfida);
              aggregato = `${agg.team2Gol}-${agg.team1Gol}`;

              // Determina il vincitore: team1 è casa in andata, team2 è casa in ritorno
              if (agg.team2Gol > agg.team1Gol) {
                casaVincente = true; // p.casa ha vinto (era team2 in andata)
              } else if (agg.team1Gol > agg.team2Gol) {
                trasVincente = true; // p.trasferta ha vinto (era team1 in andata)
              }
            }

            let golCasaHtml, golTrasHtml, statoHtml;

            if (daGiocare) {
              golCasaHtml = `<span class="partita-gol gol-nd">-</span>`;
              golTrasHtml = `<span class="partita-gol gol-nd">-</span>`;
              const aggLabel =
                p.tipo === "ritorno"
                  ? `<span style="font-size:0.75rem;color:#c8a951;margin-left:8px;font-weight:bold">AGG: -</span>`
                  : "";
              statoHtml = `<div class="partita-stato" style="color:#aaa;display:flex;align-items:center">${tipoLabel} — Da giocare${aggLabel}</div>`;
            } else {
              const parts = p.stato.split("-");
              let golCasa = parseInt(parts[0]);
              let golTras = parseInt(parts[1].split(" ")[0]);
              const casaWin = golCasa > golTras;
              const trasWin = golTras > golCasa;
              golCasaHtml = `<span class="partita-gol ${casaWin ? "gol-win" : "gol-lose"}">${golCasa}</span>`;
              golTrasHtml = `<span class="partita-gol ${trasWin ? "gol-win" : "gol-lose"}">${golTras}</span>`;
              const aggText = aggregato
                ? `<span style="font-size:0.75rem;color:#c8a951;margin-left:8px;font-weight:bold">AGG: ${aggregato}</span>`
                : "";
              statoHtml = `<div class="partita-stato stato-giocata" style="display:flex;align-items:center">${tipoLabel} — ✓ Giocata${aggText}</div>`;
            }

            // Formato nomi: vincente in MAIUSCOLO nel ritorno
            let casaName = formatTeamName(p.casa);
            let trasName = formatTeamName(p.trasferta);

            if (p.tipo === "ritorno" && !daGiocare) {
              if (casaVincente) casaName = casaName.toUpperCase();
              if (trasVincente) trasName = trasName.toUpperCase();
            }

            return `<div class="partita-card">
          ${statoHtml}
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
          })
          .join("");

        return `<div class="playoff-giornata" style="animation-delay:${bi * 0.1}s">
        <div class="playoff-giornata-title" style="background:rgba(255,255,255,0.05);padding:10px;border-radius:8px;font-size:0.9rem">
          🔗 ${blocco.accoppiamento}<br><strong>${blocco.incrocio_quarti}</strong>
        </div>
        <div class="partite-grid">${partite}</div>
      </div>`;
      })
      .join("");
  } else if (isQuarti || isSemifinali || isFinale) {
    // QUARTI/SEMIFINALI/FINALE: formato matches semplice
    const cols = isSemifinali || isFinale ? (isFinale ? 1 : 2) : 2;
    const icon = isSemifinali ? "💥" : isFinale ? "🏆" : "🎯";
    const matchTitle = isSemifinali
      ? "SEMIFINALE"
      : isFinale
        ? "FINALE"
        : "QUARTI DI FINALE";

    html = stageData
      .map((match, i) => {
        const sq1 = formatTeamName(match.squadra1);
        const sq2 = formatTeamName(match.squadra2);
        return `<div class="partita-card" style="animation-delay:${i * 0.1}s">
        <div class="partita-stato" style="color:#c8a951">${icon} ${matchTitle}</div>
        <div class="partita-row">
          ${teamColorHtml(match.logo1, 40)}
          <span class="partita-nome" style="color:#fff;font-weight:bold">${sq1}</span>
        </div>
        <div class="vs-sep">VS</div>
        <div class="partita-row">
          ${teamColorHtml(match.logo2, 40)}
          <span class="partita-nome" style="color:#fff;font-weight:bold">${sq2}</span>
        </div>
        <div style="margin-top:8px;padding:8px;background:rgba(200,169,81,0.1);border-radius:6px;font-size:0.75rem;text-align:center;color:rgba(244,246,255,0.6)">
          In attesa di data e orario
        </div>
      </div>`;
      })
      .join("");
    html = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px;animation:rowIn 0.4s ease">${html}</div>`;
  }

  document.getElementById("mainContent").innerHTML = `
    <div class="section-header"><h2>${stageIcon} ${stageTitle}</h2></div>
    <div class="playoff-grid">${html}</div>`;
}

// Wrapper specifici per ogni stage
const renderOttavi = () => renderStage("ottavi", "Ottavi di Finale", "🏟️");

const renderQuarti = () => renderStage("quarti", "Quarti di Finale", "🔥");

const renderSemifinali = () => renderStage("semifinali", "Semifinali", "💥");

const renderFinale = () => renderStage("finale", "Finale", "🏆");

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

fetch("data.json")
  .then((r) => r.json())
  .then((d) => {
    data = d;
    selectSection("classifica");
  });
