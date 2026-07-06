// Dugong Watch — in-dashboard assistant
// A self-contained, rule-based helper that explains the project and the risk
// map in plain language. No API key / no backend, so it is safe to ship on a
// public static page. Every answer is grounded in the model's real outputs;
// it can later be swapped for a live LLM behind a small proxy.

(function () {
  // ---- styling ----
  const css = `
  #dw-assist-btn{position:absolute;right:16px;bottom:16px;z-index:1200;
    background:#065a82;color:#fff;border:none;border-radius:24px;padding:11px 16px;
    font:600 14px/1 -apple-system,Segoe UI,Roboto,Arial,sans-serif;cursor:pointer;
    box-shadow:0 3px 12px rgba(0,0,0,.35);display:flex;align-items:center;gap:8px}
  #dw-assist-btn:hover{background:#07688f}
  #dw-assist-panel{position:absolute;right:16px;bottom:16px;z-index:1300;width:360px;
    max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 90px);display:none;
    flex-direction:column;background:#fff;border-radius:12px;overflow:hidden;
    box-shadow:0 10px 34px rgba(0,0,0,.4);font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif}
  #dw-assist-panel.open{display:flex}
  .dw-head{background:#0b1f3a;color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px}
  .dw-head .t{font-weight:600;font-size:15px}
  .dw-head .s{font-size:11px;color:#8fb3c8}
  .dw-head .x{margin-left:auto;background:none;border:none;color:#cbd8e2;font-size:20px;cursor:pointer;line-height:1}
  .dw-body{flex:1;overflow-y:auto;padding:14px;background:#f4f9fb}
  .dw-msg{max-width:85%;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.5;margin-bottom:10px}
  .dw-a{background:#fff;color:#0f172a;border:1px solid #e2e8f0;border-bottom-left-radius:3px}
  .dw-u{background:#065a82;color:#fff;margin-left:auto;border-bottom-right-radius:3px}
  .dw-chips{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;background:#f4f9fb;border-top:1px solid #e6eef3}
  .dw-chip{background:#e3eef4;color:#065a82;border:none;border-radius:14px;padding:6px 10px;font-size:12px;cursor:pointer}
  .dw-chip:hover{background:#d3e6ef}
  .dw-input{display:flex;border-top:1px solid #e6eef3;background:#fff}
  .dw-input input{flex:1;border:none;padding:12px;font-size:13px;outline:none}
  .dw-input button{border:none;background:#065a82;color:#fff;padding:0 16px;font-size:13px;cursor:pointer}
  .dw-foot{font-size:10px;color:#94a3b8;text-align:center;padding:5px;background:#fff}
  .dw-msg b{color:#065a82}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---- DOM ----
  const btn = document.createElement("button");
  btn.id = "dw-assist-btn"; btn.innerHTML = "&#128172; Ask the assistant";
  const panel = document.createElement("div");
  panel.id = "dw-assist-panel";
  panel.innerHTML =
    '<div class="dw-head"><span>&#128172;</span><div><div class="t">Dugong Watch Assistant</div>' +
    '<div class="s">Explains the map &middot; grounded in the real model</div></div>' +
    '<button class="x" title="Close">&times;</button></div>' +
    '<div class="dw-body" id="dw-body"></div>' +
    '<div class="dw-chips" id="dw-chips"></div>' +
    '<div class="dw-input"><input id="dw-in" placeholder="Ask about the map, risk, threats..." autocomplete="off"/>' +
    '<button id="dw-send">Send</button></div>' +
    '<div class="dw-foot">Rule-based assistant &middot; answers use the model&rsquo;s real outputs</div>';
  document.body.appendChild(btn); document.body.appendChild(panel);

  const body = panel.querySelector("#dw-body");
  const input = panel.querySelector("#dw-in");

  // ---- data for grounded answers ----
  let biggest = { area_ha: "7,049", dominant_threat: "vessel" };
  function _setBiggest(d) {
    const hs = (d.hotspots || []).map(h => ({ a: parseFloat(h.area_ha), t: h.dominant_threat }));
    if (hs.length) {
      const b = hs.reduce((m, h) => (h.a > m.a ? h : m));
      biggest = { area_ha: Math.round(b.a).toLocaleString(), dominant_threat: b.t };
    }
  }
  // Use inline data if present (offline / file:// mode), else fetch it.
  if (window.DW_DATA) _setBiggest(window.DW_DATA);
  else fetch("data.json").then(r => r.json()).then(_setBiggest).catch(() => {});

  // ---- knowledge base (ordered; first match wins) ----
  const KB = [
    [/\b(hi|hello|hey|salam|marhaba)\b/, () =>
      "Hi! I can explain the Dugong Watch risk map. Try a question below, or ask me anything about the seagrass, the threats, or how it was built."],
    [/what.*(this|project|dugong watch)|what am i looking at|about/, () =>
      "<b>Dugong Watch</b> maps where dugong seagrass habitat is most at risk in the Marawah / Bu Tinah reserve, Abu Dhabi — home to the world&rsquo;s 2nd-largest dugong population (~3,000&ndash;3,500). Dugongs eat almost only seagrass, so the map shows where valuable seagrass <i>and</i> real pressure overlap."],
    [/colou?r|legend|red|blue|mean.*(map|class)|what.*class/, () =>
      "The risk map has 5 classes on a blue&rarr;red ramp: <b>blue = Very Low</b> &rarr; Low &rarr; Moderate &rarr; High &rarr; <b>red = Very High</b> risk. It comes from <b>Risk = habitat Value &times; Threat</b>, so a place only turns red when valuable seagrass and strong pressure coincide."],
    [/why.*(risk|red|high|at stake|danger)|what makes/, () =>
      "Risk = habitat <b>value</b> (seagrass weighted by dugong use) &times; <b>threat</b> (5 weighted pressures). In the top hotspots the main drivers are <b>vessel pressure</b> and <b>measured seagrass loss</b> (2019&rarr;2024). The single largest high-risk zone (~" + biggest.area_ha + " ha) is <b>" + biggest.dominant_threat + "</b>-dominated — the central navigation corridor through the reserve."],
    [/threat|pressure|danger|risk factor|what.*(harm|threaten)/, () =>
      "Five weighted threats: <b>observed seagrass loss</b> (0.30), <b>coastal development / dredging</b> (0.20), <b>thermal stress</b> (0.20), <b>desalination / industrial discharge</b> (0.15) and <b>vessel pressure</b> (0.15). Toggle the &lsquo;threat context&rsquo; layers on the map to see each source."],
    [/vessel|boat|ship|navigation/, () =>
      "<b>Vessel pressure</b> (weight 0.15) comes from ports, landings and navigation routes through the shallow reserve, where propeller scarring and groundings damage foraging beds. It dominates the single largest high-risk zone — the central corridor."],
    [/seagrass|halodule|meadow/, () =>
      "Seagrass is everything here: dugongs feed almost exclusively on it. The model maps seagrass from Sentinel-2 imagery (85.3% accuracy) and detects 2019&rarr;2024 change — the &lsquo;loss&rsquo; layer is the most heavily weighted threat (0.30)."],
    [/heat|thermal|temperature|warm|sst/, () =>
      "<b>Thermal stress</b> (weight 0.20) uses Landsat summer surface temperature, water-masked. The Gulf is among the hottest seas on Earth, and heat can bleach and kill seagrass."],
    [/desal|brine|discharge|industrial|power plant/, () =>
      "<b>Desalination / industrial discharge</b> (weight 0.15) is modelled by distance-decay from real outfalls (e.g. the Mirfa plant). Brine and thermal discharge raise local salinity and temperature."],
    [/develop|dredg|construction|coastal/, () =>
      "<b>Coastal development / dredging</b> (weight 0.20) buries or smothers meadows. Development-dominated hotspots are smaller but carry the highest mean-risk values (up to ~0.66), clustered near the developed shoreline."],
    [/hotspot|how many|105|ranked/, () =>
      "The model ranks <b>105 hotspots</b> (&ge;5 ha) by habitat value &times; pressure. The biggest is ~" + biggest.area_ha + " ha (" + biggest.dominant_threat + "-dominated); the highest-risk small patches are development-driven near the shore. Click any marker on the map for its rank, area, mean risk and dominant threat."],
    [/built|how.*(work|made|model)|method|classif|random forest|sentinel/, () =>
      "Pipeline: free <b>Sentinel-2</b> imagery &rarr; a <b>Random Forest</b> classifier maps seagrass (<b>85.3%</b> accuracy) &rarr; 2019&rarr;2024 change detection &rarr; a weighted <b>risk model</b> in Google Earth Engine. All open data and code — re-runnable at near-zero cost."],
    [/trust|valid|accura|robust|reliable|confiden|proof/, () =>
      "Three checks: <b>85.3%</b> classification accuracy; mean risk inside the documented dugong core is <b>~3&times;</b> the reserve-wide average (it targets where dugongs actually are); and perturbing each weight &plusmn;10% shifts the high-risk area by <b>&le;3%</b> — so the ranking is robust, not an artefact of the weights."],
    [/solution|do about|protect|action|fix|recommend|what.*(can|should).*(do|done)|next/, () =>
      "The ranked map says <b>where to act first</b>: speed / no-wake zones and re-routing around the vessel corridor; monitoring &amp; restoration at loss hotspots; dredging-permit buffers near development hotspots; and factoring thermal / discharge into siting new outfalls."],
    [/dugong|animal|mammal|sea cow/, () =>
      "The <b>dugong</b> is a Vulnerable marine mammal that feeds almost only on seagrass. Abu Dhabi&rsquo;s population (~3,000&ndash;3,500) is the <b>2nd largest on Earth</b> after Australia. Lose the seagrass and they have nowhere to feed."],
    [/limit|weakness|honest|not.*(perfect|done)|caveat|problem with/, () =>
      "It&rsquo;s a validated <b>prototype</b>, not a deployed tool. Some threat inputs are documented approximations pending official GIS layers, and the risk index is <b>relative</b> (ranks locations against each other), not an absolute probability of loss."],
    [/thank|thx|cheers|shukran/, () => "You&rsquo;re welcome! Ask me anything else about the map. &#128009;"],
    [/who are you|are you (ai|real|chatgpt|claude)|bot/, () =>
      "I&rsquo;m a built-in helper for this dashboard. My answers are scripted from the project&rsquo;s real results (not a live AI), so they stay accurate — but the same panel could be wired to a live model later."],
  ];

  const CHIPS = [
    ["What is this?", "what is this project"],
    ["What do the colours mean?", "what do the colours mean"],
    ["Why are areas at risk?", "why are areas at high risk"],
    ["Biggest threat?", "what are the threats"],
    ["How was it built?", "how was it built"],
    ["What can be done?", "what solutions"],
    ["Is it accurate?", "is it accurate and robust"],
  ];

  function answer(q) {
    const s = q.toLowerCase();
    for (const [re, fn] of KB) if (re.test(s)) return fn();
    return "I can explain the risk map, the seagrass, the five threats, how it was built, how it&rsquo;s validated, and what can be done. Try one of the buttons below, or rephrase your question.";
  }

  function add(text, who) {
    const m = document.createElement("div");
    m.className = "dw-msg " + (who === "u" ? "dw-u" : "dw-a");
    m.innerHTML = text;
    body.appendChild(m); body.scrollTop = body.scrollHeight;
  }

  function ask(q) {
    add(q.replace(/</g, "&lt;"), "u");
    setTimeout(() => add(answer(q), "a"), 180);
  }

  // chips
  const chipWrap = panel.querySelector("#dw-chips");
  CHIPS.forEach(([label, q]) => {
    const c = document.createElement("button");
    c.className = "dw-chip"; c.textContent = label;
    c.onclick = () => ask(q);
    chipWrap.appendChild(c);
  });

  // events
  btn.onclick = () => {
    panel.classList.add("open"); btn.style.display = "none";
    if (!body.childElementCount)
      add("Hi! I&rsquo;m the Dugong Watch assistant. I can explain what this map shows, why areas are at risk, and how it was built. Ask me anything, or tap a question below.", "a");
    input.focus();
  };
  panel.querySelector(".x").onclick = () => { panel.classList.remove("open"); btn.style.display = "flex"; };
  panel.querySelector("#dw-send").onclick = () => { const v = input.value.trim(); if (v) { ask(v); input.value = ""; } };
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") panel.querySelector("#dw-send").click(); });
})();
