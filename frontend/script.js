/* ============================================================
   KNOW YOUR HEROES — script.js
   Data, the Roll of Honour wheel, animated counters,
   and the Share a Story memorial wall (localStorage-backed).
   ============================================================ */

/* ---------- 1. DATA ---------- */

const WARS = [
  {
    id: "1947",
    year: "1947–48",
    title: "First Kashmir War",
    dates: "22 Oct 1947 – 1 Jan 1949",
    location: "Jammu & Kashmir",
    countries: ["India", "Pakistan"],
    operation: "—",
    result: "Ceasefire under UN supervision; established the Cease-Fire Line, later the Line of Control.",
    stats: { soldiers: "~200,000", martyrs: "~1,500", injured: "~3,500" },
    heroes: [
      { name: "Major Somnath Sharma", age: 24, rank: "Major, 4 KUMAON", contribution: "Held Badgam against overwhelming numbers, buying time for reinforcements to save Srinagar airfield. First Param Vir Chakra ever awarded, posthumously." },
      { name: "Lance Naik Karam Singh", age: 30, rank: "Lance Naik, 1 SIKH", contribution: "Repelled repeated assaults at Tithwal, personally leading five counter-attacks despite being wounded." }
    ],
    response: { awards: "Param Vir Chakra ×1, Maha Vir Chakra ×20", govt: "Formation of the Cease-Fire Line (1949 Karachi Agreement)", memorials: "Badgam War Memorial, Srinagar" }
  },
  {
    id: "1961",
    year: "1961",
    title: "Annexation of Goa",
    dates: "18 – 19 Dec 1961",
    location: "Goa, Daman & Diu",
    countries: ["India", "Portugal"],
    operation: "Operation Vijay (1961)",
    result: "Portuguese colonial rule ended in 36 hours; Goa, Daman and Diu became part of India.",
    stats: { soldiers: "~30,000", martyrs: "~22", injured: "~54" },
    heroes: [
      { name: "Major General K. P. Candeth", age: 46, rank: "Major General", contribution: "Commanded the joint Army-Navy-Air Force operation that liberated Goa with minimal casualties." }
    ],
    response: { awards: "Vir Chakra ×7", govt: "Goa integrated as a Union Territory, later a full state in 1987", memorials: "Reis Magos Fort memorial plaques, Goa" }
  },
  {
    id: "1962",
    year: "1962",
    title: "Sino-Indian War",
    dates: "20 Oct – 21 Nov 1962",
    location: "Aksai Chin & NEFA (Arunachal Pradesh)",
    countries: ["India", "China"],
    operation: "—",
    result: "China declared a unilateral ceasefire after territorial gains; prompted major reform of India's military.",
    stats: { soldiers: "~30,000", martyrs: "~1,400", injured: "~1,700" },
    heroes: [
      { name: "Major Shaitan Singh", age: 36, rank: "Major, 13 KUMAON", contribution: "Defended Rezang La to the last round against a force many times his company's size. Param Vir Chakra, posthumous." },
      { name: "Subedar Joginder Singh", age: 28, rank: "Subedar, 1 SIKH", contribution: "Held Tongpen La with a handful of men through three assaults until ammunition ran out. Param Vir Chakra, posthumous." }
    ],
    response: { awards: "Param Vir Chakra ×2, Maha Vir Chakra ×4", govt: "Long-term modernisation of the Army, raising of new mountain divisions", memorials: "Rezang La War Memorial, Haryana" }
  },
  {
    id: "1965",
    year: "1965",
    title: "Indo-Pakistani War of 1965",
    dates: "5 Aug – 23 Sep 1965",
    location: "Punjab, Rajasthan, Jammu & Kashmir",
    countries: ["India", "Pakistan"],
    operation: "—",
    result: "UN-mandated ceasefire; Tashkent Declaration restored the pre-war status quo.",
    stats: { soldiers: "~700,000", martyrs: "~3,000", injured: "~8,200" },
    heroes: [
      { name: "CQMH Abdul Hamid", age: 32, rank: "Company Quartermaster Havildar, 4 GRENADIERS", contribution: "Destroyed several enemy tanks at Asal Uttar with a recoilless gun, blunting a major armoured thrust. Param Vir Chakra, posthumous." },
      { name: "Lt Col A. B. Tarapore", age: 43, rank: "Lieutenant Colonel, Poona Horse", contribution: "Led repeated tank assaults at Phillora and Chawinda despite being wounded, until he was killed in action. Param Vir Chakra, posthumous." }
    ],
    response: { awards: "Param Vir Chakra ×2, Maha Vir Chakra ×24", govt: "Tashkent Declaration (Jan 1966)", memorials: "Asal Uttar tank memorial, Punjab" }
  },
  {
    id: "1971",
    year: "1971",
    title: "Indo-Pakistani War of 1971",
    dates: "3 – 16 Dec 1971",
    location: "East & West Pakistan, Jammu & Kashmir",
    countries: ["India", "Pakistan"],
    operation: "—",
    result: "Decisive Indian victory; unconditional surrender of over 90,000 Pakistani troops; birth of Bangladesh.",
    stats: { soldiers: "~825,000", martyrs: "~3,850", injured: "~9,850" },
    heroes: [
      { name: "Lance Naik Albert Ekka", age: 22, rank: "Lance Naik, 14 GUARDS", contribution: "Single-handedly destroyed enemy bunkers at Gangasagar despite grievous wounds, enabling his company to secure the position. Param Vir Chakra, posthumous." },
      { name: "Flying Officer Nirmal Jit Singh Sekhon", age: 26, rank: "Flying Officer, IAF", contribution: "Took off alone against a large enemy raid over Srinagar and fought until his aircraft was shot down. The only Param Vir Chakra awarded to the IAF." }
    ],
    response: { awards: "Param Vir Chakra ×4, Maha Vir Chakra ×65", govt: "Simla Agreement (1972); recognition of Bangladesh", memorials: "National War Memorial (1971 gallery), New Delhi" }
  },
  {
    id: "1984",
    year: "1984–present",
    title: "Operation Meghdoot — Siachen",
    dates: "13 Apr 1984 – ongoing",
    location: "Siachen Glacier",
    countries: ["India", "Pakistan"],
    operation: "Operation Meghdoot",
    result: "India occupied and continues to hold the strategic heights of the world's highest battlefield.",
    stats: { soldiers: "Rotational garrison", martyrs: "~900 (incl. weather-related, to date)", injured: "Ongoing" },
    heroes: [
      { name: "Naib Subedar Bana Singh", age: 30, rank: "Naib Subedar, 8 JAK LI", contribution: "Led the assault that recaptured Quaid Post, the glacier's highest enemy position, later renamed Bana Post in his honour. Param Vir Chakra." }
    ],
    response: { awards: "Param Vir Chakra ×1, Vir Chakra ×several", govt: "Continuous high-altitude garrison since 1984", memorials: "Siachen War Memorial, Ladakh" }
  },
  {
    id: "1987",
    year: "1987–90",
    title: "Indian Peace Keeping Force",
    dates: "1987 – 1990",
    location: "Northern & Eastern Sri Lanka",
    countries: ["India", "LTTE (peacekeeping mission)"],
    operation: "Operation Pawan",
    result: "Mission concluded with the IPKF's withdrawal after prolonged counter-insurgency fighting.",
    stats: { soldiers: "~100,000 (peak deployment)", martyrs: "~1,200", injured: "~3,000" },
    heroes: [
      { name: "Lieutenant Colonel Ravindra Nath", rank: "Lieutenant Colonel, 13 SIKH LI", contribution: "Led operations against militant strongholds in Jaffna under intense urban combat conditions." }
    ],
    response: { awards: "Multiple gallantry awards to IPKF personnel", govt: "Withdrawal completed by March 1990", memorials: "IPKF memorials at various regimental centres" }
  },
  {
    id: "1999",
    year: "1999",
    title: "Kargil War",
    dates: "3 May – 26 Jul 1999",
    location: "Kargil, Ladakh (then J&K)",
    countries: ["India", "Pakistan"],
    operation: "Operation Vijay · Operation Safed Sagar (air) · Operation Talwar (naval)",
    result: "India recaptured all occupied heights along the Line of Control. Victory declared 26 July — Kargil Vijay Diwas.",
    stats: { soldiers: "~30,000", martyrs: "527", injured: "~1,363" },
    heroes: [
      { name: "Captain Vikram Batra", age: 24, rank: "Captain, 13 JAK RIF", contribution: "Led the recapture of Point 5140 and Point 4875 with the call sign \"Yeh Dil Maange More\", falling while rescuing a wounded officer. Param Vir Chakra, posthumous." },
      { name: "Grenadier Yogendra Singh Yadav", age: 19, rank: "Grenadier, 18 GRENADIERS", contribution: "Scaled a sheer cliff under fire to clear three enemy bunkers at Tiger Hill despite multiple wounds. Param Vir Chakra." },
      { name: "Rifleman Sanjay Kumar", age: 23, rank: "Rifleman, 13 JAK RIF", contribution: "Charged and captured two enemy bunkers single-handedly at Area Flat Top despite serious wounds. Param Vir Chakra." }
    ],
    response: { awards: "Param Vir Chakra ×4, Maha Vir Chakra ×11, Vir Chakra ×54", govt: "Kargil Review Committee reforms; annual Kargil Vijay Diwas on 26 July", memorials: "Kargil War Memorial, Dras" }
  },
  {
    id: "2019",
    year: "2019",
    title: "Balakot Airstrike",
    dates: "26 Feb 2019",
    location: "Balakot, Khyber Pakhtunkhwa, Pakistan",
    countries: ["India", "Pakistan"],
    operation: "Non-military pre-emptive strike",
    result: "IAF Mirage 2000 jets struck a militant training facility in response to the Pulwama attack, followed by aerial engagement on 27 Feb.",
    stats: { soldiers: "12 aircraft (strike package)", martyrs: "1 (Wg Cdr Abhinandan's MiG-21 downed; safely repatriated)", injured: "—" },
    heroes: [
      { name: "Wing Commander Abhinandan Varthaman", rank: "Wing Commander, IAF", contribution: "Engaged intruding aircraft in aerial combat, was shot down over Pakistani territory, and returned home after diplomatic efforts. Vir Chakra." }
    ],
    response: { awards: "Vir Chakra ×1", govt: "Heightened air-defence posture along the western front", memorials: "—" }
  },
  {
    id: "2020",
    year: "2020",
    title: "Galwan Valley Clash",
    dates: "15 – 16 Jun 2020",
    location: "Galwan Valley, Ladakh (Line of Actual Control)",
    countries: ["India", "China"],
    operation: "Standoff de-escalation",
    result: "Violent hand-to-hand clash along the LAC; both sides later agreed on phased disengagement from friction points.",
    stats: { soldiers: "Forward-deployed units", martyrs: "20", injured: "~76" },
    heroes: [
      { name: "Colonel B. Santosh Babu", rank: "Colonel, 16 BIHAR", contribution: "Led his unit at the forward post during the confrontation and was killed defending Indian positions. Maha Vir Chakra, posthumous." }
    ],
    response: { awards: "Maha Vir Chakra ×1, Vir Chakra ×several", govt: "Multiple rounds of Corps Commander-level talks; phased disengagement from 2020–2022", memorials: "Galwan martyrs memorial, unit lines" }
  }
];

const OPERATIONS = [
  { name: "Operation Cactus", year: "1988", desc: "Indian forces flew in overnight to foil a coup attempt and rescue the government of the Maldives." },
  { name: "Operation Trident", year: "1971", desc: "The Indian Navy struck Karachi Harbour by night, sinking and damaging Pakistani vessels." },
  { name: "Operation Python", year: "1971", desc: "A follow-up naval strike on Karachi's fuel storage, deepening the damage from Operation Trident." },
  { name: "Operation Talwar", year: "1999", desc: "The Navy blockaded Pakistani shipping lanes during the Kargil conflict, restricting resupply." },
  { name: "2016 LoC Strikes", year: "2016", desc: "Special forces conducted cross-border strikes on militant launch pads following the Uri attack." },
  { name: "Balakot Airstrike", year: "2019", desc: "IAF jets struck a militant training camp deep inside Pakistan, in response to the Pulwama attack." }
];

// Illustrative composition of active personnel — approximate, for general
// public understanding only; figures vary across public sources and years.
const DEFENCE_TODAY = [
  { label: "Army", value: 78, note: "World's second-largest standing army" },
  { label: "Air Force", value: 12, note: "Fourth-largest air force by personnel" },
  { label: "Navy", value: 8, note: "Growing blue-water capability" },
  { label: "Special Forces", value: 2, note: "Para SF, MARCOS, Garud Commandos" }
];

/* ---------- 2. UTILITIES ---------- */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function throttleRAF(fn) {
  let ticking = false;
  return (...args) => {
    if (!ticking) {
      requestAnimationFrame(() => { fn(...args); ticking = false; });
      ticking = true;
    }
  };
}

/* ---------- 3. BUILD THE 3D COVERFLOW ---------- */

const wheelEl = $("#coverflow");
const wheelSection = $("#wheelRunway");
const detailPanel = $("#warDetail");
const N = WARS.length;
let activeIndex = 0;
let plaques = [];

function buildWheel() {
  WARS.forEach((war, i) => {
    const item = document.createElement("button");
    item.className = "war-plaque";
    item.type = "button";
    item.dataset.index = i;
    const shortYear = war.year.split("–")[0].split("-")[0].trim();
    item.innerHTML = `
      <span class="plaque-rank">${String(i + 1).padStart(2, "0")}</span>
      <span class="plaque-year">${shortYear}</span>
      <span class="plaque-ribbon" aria-hidden="true"></span>
      <span class="plaque-title">${war.title}</span>
    `;
    item.setAttribute("aria-label", `${war.title}, ${war.year}`);
    item.addEventListener("click", () => setActive(i, true));
    wheelEl.appendChild(item);
    plaques.push(item);
  });
}

function positionPlaques(rawIndex) {
  plaques.forEach((el, i) => {
    const delta = i - rawIndex;
    const absDelta = Math.abs(delta);
    const translateX = delta * 200;
    const rotateY = Math.max(-62, Math.min(62, delta * -34));
    const translateZ = -absDelta * 90;
    const scale = Math.max(0.62, 1 - absDelta * 0.14);
    const opacity = Math.max(0, 1 - absDelta * 0.32);
    const z = 100 - Math.round(absDelta * 10);
    el.style.transform = `translate(-50%,-50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
    el.style.opacity = opacity;
    el.style.zIndex = z;
    el.classList.toggle("is-active", Math.round(rawIndex) === i);
  });
}

function renderDetail(i) {
  const w = WARS[i];
  detailPanel.innerHTML = `
    <div class="detail-eyebrow">${w.year} · ${w.operation !== "—" ? w.operation : "Conflict record"}</div>
    <h3 class="detail-title">${w.title}</h3>
    <p class="detail-summary">${w.result}</p>

    <div class="detail-grid">
      <div class="detail-block">
        <h4>War information</h4>
        <dl>
          <dt>Dates</dt><dd>${w.dates}</dd>
          <dt>Location</dt><dd>${w.location}</dd>
          <dt>Countries involved</dt><dd>${w.countries.join(" · ")}</dd>
        </dl>
      </div>
      <div class="detail-block">
        <h4>War statistics <span class="approx">approximate</span></h4>
        <dl>
          <dt>Soldiers involved</dt><dd>${w.stats.soldiers}</dd>
          <dt>Martyrs</dt><dd>${w.stats.martyrs}</dd>
          <dt>Injured</dt><dd>${w.stats.injured}</dd>
        </dl>
      </div>
    </div>

    <div class="detail-block heroes-block">
      <h4>Heroes of this war</h4>
      <div class="hero-cards">
        ${w.heroes.map(h => `
          <div class="hero-card">
            <div class="hero-name">${h.name}</div>
            <div class="hero-meta">${h.rank}${h.age ? ` · Age ${h.age}` : ""}</div>
            <p class="hero-contribution">${h.contribution}</p>
          </div>`).join("")}
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-block">
        <h4>India's response</h4>
        <dl>
          <dt>Awards</dt><dd>${w.response.awards}</dd>
          <dt>Government action</dt><dd>${w.response.govt}</dd>
          <dt>Memorials</dt><dd>${w.response.memorials}</dd>
        </dl>
      </div>
      <div class="detail-block">
        <h4>Learn more</h4>
        <p class="media-note">Video and photo archives are best explored on official sources.</p>
        <a class="media-link" target="_blank" rel="noopener"
           href="https://www.youtube.com/results?search_query=${encodeURIComponent(w.title + " India")}">
           Search documentaries on ${w.title} ↗
        </a>
      </div>
    </div>
  `;
}

function setActive(i, userInitiated) {
  activeIndex = ((i % N) + N) % N;
  positionPlaques(activeIndex);
  renderDetail(activeIndex);
  if (userInitiated) {
    // gently sync the scroll position to this plaque's slice of the pinned section
    const sectionHeight = wheelSection.offsetHeight - window.innerHeight;
    const targetProgress = activeIndex / (N - 1);
    const targetScroll = wheelSectionTop + targetProgress * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }
}

let wheelSectionTop = 0;

function onWheelScroll() {
  const total = wheelSection.offsetHeight - window.innerHeight;
  if (total <= 0) return;
  let progress = (window.scrollY - wheelSectionTop) / total;
  progress = Math.min(1, Math.max(0, progress));
  const rawIndex = progress * (N - 1);
  const nearest = Math.round(rawIndex);

  positionPlaques(rawIndex);
  if (nearest !== activeIndex) {
    activeIndex = nearest;
    renderDetail(activeIndex);
  }
}

/* ---------- 4. MAJOR OPERATIONS GRID ---------- */

function buildOperations() {
  const grid = $("#operationsGrid");
  grid.innerHTML = OPERATIONS.map(op => `
    <article class="op-card">
      <span class="op-year">${op.year}</span>
      <h3>${op.name}</h3>
      <p>${op.desc}</p>
    </article>
  `).join("");
}

/* ---------- 5. DEFENCE TODAY — ANIMATED BARS ---------- */

function buildDefenceBars() {
  const wrap = $("#defenceBars");
  wrap.innerHTML = DEFENCE_TODAY.map(d => `
    <div class="bar-row">
      <div class="bar-label">
        <span>${d.label}</span>
        <span class="bar-value" data-target="${d.value}">0%</span>
      </div>
      <div class="bar-track"><div class="bar-fill" data-target="${d.value}" style="width:0%"></div></div>
      <p class="bar-note">${d.note}</p>
    </div>
  `).join("");
}

function animateDefenceBars() {
  $$(".bar-fill").forEach(el => {
    const target = el.dataset.target;
    el.style.width = target + "%";
  });
  $$(".bar-value").forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = () => {
      current += Math.max(1, target / 40);
      if (current >= target) { el.textContent = target + "%"; return; }
      el.textContent = Math.round(current) + "%";
      requestAnimationFrame(step);
    };
    step();
  });
}

/* ---------- 6. SHARE A STORY — MEMORIAL WALL ---------- */

const STORAGE_KEY = "kyh_stories_v1";

function loadStories() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

function saveStories(stories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

const SEED_STORIES = [
  {
    heroName: "Naik Devendra Pal",
    relation: "Written by his daughter",
    unit: "Assam Regiment",
    story: "He never spoke much about the border, but every Republic Day he'd press his uniform himself and stand a little taller. We understood the silence better after he was gone — some things are carried, not told.",
    submittedBy: "Priya P.",
    date: "2024"
  },
  {
    heroName: "Havildar Ramesh Chander",
    relation: "Written by his younger brother",
    unit: "Corps of Signals",
    story: "He taught me to ride a bicycle in the three weeks he was home on leave. Those three weeks are most of what I remember of him, and I have never stopped being grateful for them.",
    submittedBy: "Anil C.",
    date: "2023"
  }
];

function renderStories() {
  const list = loadStories();
  const combined = [...SEED_STORIES, ...list];
  const grid = $("#storyGrid");
  const empty = $("#storyEmpty");

  if (combined.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  grid.innerHTML = combined.slice().reverse().map(s => `
    <article class="story-card">
      <div class="story-flame" aria-hidden="true"></div>
      <h3>${escapeHTML(s.heroName)}</h3>
      <div class="story-meta">${escapeHTML(s.relation)}${s.unit ? ` · ${escapeHTML(s.unit)}` : ""}</div>
      <p class="story-text">${escapeHTML(s.story)}</p>
      <div class="story-footer">
        <span>— ${escapeHTML(s.submittedBy)}</span>
        <span>${escapeHTML(s.date)}</span>
      </div>
    </article>
  `).join("");
}

function escapeHTML(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function initStoryForm() {
  const form = $("#storyForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entry = {
      heroName: (data.get("heroName") || "").trim(),
      relation: (data.get("relation") || "").trim() || "Shared by family",
      unit: (data.get("unit") || "").trim(),
      story: (data.get("story") || "").trim(),
      submittedBy: (data.get("submittedBy") || "").trim() || "A grateful family",
      date: new Date().getFullYear().toString()
    };
    if (!entry.heroName || !entry.story) return;

    const stories = loadStories();
    stories.push(entry);
    saveStories(stories);
    renderStories();
    form.reset();

    const confirmMsg = $("#storyConfirm");
    confirmMsg.hidden = false;
    setTimeout(() => { confirmMsg.hidden = true; }, 4000);

    $("#storyGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ---------- 7. SCROLL REVEALS ---------- */

function initReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.id === "defenceOverview") animateDefenceBars();
      }
    });
  }, { threshold: 0.2 });

  $$(".reveal").forEach(el => io.observe(el));
}

/* ---------- 8. NAV + PROGRESS ---------- */

function initNav() {
  const links = $$(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const progressBar = $("#scrollProgress");
  const updateProgress = throttleRAF(() => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progressBar.style.transform = `scaleX(${scrolled})`;
  });
  window.addEventListener("scroll", updateProgress);
}

/* ---------- 9. AMBIENT SOUND TOGGLE (graceful no-op without an audio file) ---------- */

function initSoundToggle() {
  const btn = $("#soundToggle");
  const audio = $("#ambientAudio");
  let playing = false;
  btn.addEventListener("click", () => {
    if (!audio.currentSrc && !audio.querySelector("source[src]")) {
      btn.classList.add("shake");
      btn.setAttribute("title", "Add an audio file to enable ambient sound");
      setTimeout(() => btn.classList.remove("shake"), 500);
      return;
    }
    playing = !playing;
    playing ? audio.play() : audio.pause();
    btn.classList.toggle("is-playing", playing);
  });
}

/* ---------- 9b. HERO EMBLEM — spokes + floating light particles ---------- */

function buildEmblemDetail() {
  const spokes = $("#emblemSpokes");
  const studs = $("#emblemStuds");
  if (!spokes || !studs) return;
  const cx = 200, cy = 200, rOuter = 168, rInner = 70;
  for (let i = 0; i < 32; i++) {
    const a = (i * Math.PI * 2) / 32;
    const x1 = cx + Math.cos(a) * rInner, y1 = cy + Math.sin(a) * rInner;
    const x2 = cx + Math.cos(a) * rOuter, y2 = cy + Math.sin(a) * rOuter;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    line.setAttribute("opacity", i % 2 === 0 ? "0.9" : "0.4");
    spokes.appendChild(line);
  }
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI * 2) / 16;
    const x = cx + Math.cos(a) * rOuter, y = cy + Math.sin(a) * rOuter;
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("r", 3.4);
    studs.appendChild(dot);
  }
}

function initParticles() {
  const field = $("#particleField");
  if (!field) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const COUNT = 20;
  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    const left = 20 + Math.random() * 60;
    const dx = (Math.random() - 0.5) * 140;
    const dy = -(80 + Math.random() * 160);
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 6;
    s.style.left = left + "%";
    s.style.top = 55 + Math.random() * 20 + "%";
    s.style.setProperty("--dx", dx + "px");
    s.style.setProperty("--dy", dy + "px");
    s.style.animationDuration = duration + "s";
    s.style.animationDelay = delay + "s";
    field.appendChild(s);
  }
}

/* ---------- 9c. PREMIUM 3D MICRO-INTERACTIONS ---------- */

function initTiltDelegated(selector, maxTilt = 9, scale = 1.03) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || matchMedia("(hover: none)").matches) return;

  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(selector);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transition = "box-shadow .2s ease";
    card.style.transform = `perspective(700px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale(${scale})`;
  });

  document.addEventListener("mouseout", (e) => {
    const card = e.target.closest(selector);
    if (!card || (e.relatedTarget && card.contains(e.relatedTarget))) return;
    card.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1)";
    card.style.transform = "";
  });
}

function initHeroParallax() {
  const hero = $("#hero");
  const content = $(".hero-content");
  const emblemWrap = $(".hero-emblem-parallax");
  if (!hero || matchMedia("(hover: none)").matches) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (content) content.style.transform = `translate3d(${(px * -14).toFixed(1)}px, ${(py * -10).toFixed(1)}px, 0)`;
    if (emblemWrap) emblemWrap.style.transform = `translate3d(${(px * 26).toFixed(1)}px, ${(py * 18).toFixed(1)}px, 0)`;
  });
  hero.addEventListener("mouseleave", () => {
    if (content) content.style.transform = "";
    if (emblemWrap) emblemWrap.style.transform = "";
  });
}

/* ---------- 10. INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  buildWheel();
  wheelSectionTop = wheelSection.offsetTop;
  setActive(0, false);
  buildOperations();
  buildDefenceBars();
  renderStories();
  initStoryForm();
  initReveals();
  initNav();
  initSoundToggle();
  buildEmblemDetail();
  initParticles();
  initTiltDelegated(".hero-card, .op-card, .story-card");
  initHeroParallax();

  window.addEventListener("scroll", throttleRAF(onWheelScroll));
  window.addEventListener("resize", throttleRAF(() => { wheelSectionTop = wheelSection.offsetTop; }));

  // hero year ticks up on load
  const heroCount = $("#heroYears");
  if (heroCount) {
    let n = 1947;
    const end = new Date().getFullYear();
    const tick = () => {
      n += Math.ceil((end - n) / 12) || 1;
      if (n >= end) { heroCount.textContent = end; return; }
      heroCount.textContent = n;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
});
