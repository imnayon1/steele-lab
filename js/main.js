// Steele Lab — content loader
// Every page fetches its own JSON file from /content/ and renders it into
// the placeholders already in the HTML. Editing content through /admin
// (Decap CMS) rewrites these JSON files, so changes show up on next load
// with no rebuild step required.

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`${path}: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Content failed to load:", err);
    return null;
  }
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

// ---------- settings (footer + contact, used on every page) ----------

async function renderSettings() {
  const s = await loadJSON("/content/settings.json");
  if (!s) return;
  document.querySelectorAll("[data-lab-name]").forEach((n) => (n.textContent = s.labName));
  document.querySelectorAll("[data-pi-name]").forEach((n) => (n.textContent = s.piName));
  document.querySelectorAll("[data-university]").forEach((n) => (n.textContent = s.university));
  document.querySelectorAll("[data-email]").forEach((n) => {
    n.textContent = s.email;
    n.href = `mailto:${s.email}`;
  });
  document.querySelectorAll("[data-phone]").forEach((n) => (n.textContent = s.phone));
  document.querySelectorAll("[data-department]").forEach((n) => (n.textContent = s.department));
  document.querySelectorAll("[data-office]").forEach((n) => (n.textContent = s.office));
}

// ---------- home ----------

async function renderHome() {
  const d = await loadJSON("/content/home.json");
  if (!d) return;
  document.getElementById("hero-kicker").textContent = d.heroKicker;
  document.getElementById("hero-headline").textContent = d.heroHeadline;
  document.getElementById("hero-text").textContent = d.heroText;

  const rows = document.getElementById("home-highlights");
  rows.innerHTML = "";
  (d.highlights || []).forEach((h) => {
    rows.appendChild(
      el(`<div class="row"><h3>${h.title}</h3><p>${h.text}</p></div>`)
    );
  });

      document.getElementById("join-headline").textContent = d.joinHeadline;
      document.getElementById("join-text").textContent = d.joinText;
      const btn = document.getElementById("join-btn");
      btn.textContent = d.joinButtonText || "See how to join";
      btn.href = d.joinButtonLink || "/join.html";
}

// ---------- research ----------

async function renderResearch() {
  const d = await loadJSON("/content/research.json");
  if (!d) return;
  document.getElementById("research-intro").textContent = d.intro;
  document.getElementById("model-system-title").textContent = d.modelSystemTitle;
  document.getElementById("model-system-text").textContent = d.modelSystemText;
  document.getElementById("strategies-title").textContent = d.strategiesTitle;
  document.getElementById("strategies-text").textContent = d.strategiesText;

  const rows = document.getElementById("research-projects");
  rows.innerHTML = "";
  (d.projects || []).forEach((p) => {
    rows.appendChild(
      el(`<div class="row"><h3>${p.title}</h3><p>${p.text}</p></div>`)
    );
  });
}

// ---------- people ----------

async function renderPeople() {
  const d = await loadJSON("/content/people.json");
  if (!d) return;

  const pi = d.pi || {};
  const piWrap = document.getElementById("pi-block");
  piWrap.innerHTML = "";
  piWrap.appendChild(
    el(`
      <div class="person" style="border-top:none;">
        ${pi.photo ? `<img class="photo" src="${pi.photo}" alt="${pi.name || ""}">` : `<div class="photo" style="width:132px;height:132px;background:var(--paper-dim);border-radius:4px;"></div>`}
        <div>
          <h3 style="font-style:normal;">${pi.name || ""}</h3>
          <div class="role">${pi.role || ""}</div>
          <div class="meta">${pi.education || ""}</div>
          <p>${pi.interests || ""}</p>
        </div>
      </div>
    `)
  );

  const list = document.getElementById("members-list");
  list.innerHTML = "";
  const members = d.members || [];
  if (members.length === 0) {
    list.appendChild(el(`<p class="empty-note">Lab roster coming soon — postdocs, graduate students, and undergraduates will be listed here.</p>`));
  } else {
    members.forEach((m) => {
      list.appendChild(
        el(`
          <div class="person">
            ${m.photo ? `<img class="photo" src="${m.photo}" alt="${m.name || ""}">` : `<div class="photo" style="width:132px;height:132px;background:var(--paper-dim);border-radius:4px;"></div>`}
            <div>
              <h3 style="font-style:normal;">${m.name || ""}</h3>
              <div class="role">${[m.role, m.year].filter(Boolean).join(" · ")}</div>
              ${m.education ? `<div class="meta">${m.education}</div>` : ""}
              ${m.interests ? `<p>${m.interests}</p>` : ""}
            </div>
          </div>
        `)
      );
    });
  }
}

// ---------- publications ----------

async function renderPublications() {
  const d = await loadJSON("/content/publications.json");
  if (!d) return;
  const list = document.getElementById("pub-list");
  list.innerHTML = "";
  (d.publications || []).forEach((p) => {
    list.appendChild(
      el(`
        <div class="pub">
          <span class="year">${p.year}</span><span class="authors">${p.authors}</span>
          <span class="title">${p.title}</span>
          <div class="cite">${p.journal}${p.details ? ", " + p.details : ""}${p.doi ? ` — <a class="doi" href="https://doi.org/${p.doi}" target="_blank" rel="noopener">doi:${p.doi}</a>` : ""}</div>
          ${p.note ? `<div class="note">${p.note}</div>` : ""}
        </div>
      `)
    );
  });
}

// ---------- join / prospective students ----------

async function renderJoin() {
  const d = await loadJSON("/content/join.json");
  if (!d) return;
  document.getElementById("postdoc-title").textContent = d.postdocTitle;
  document.getElementById("postdoc-text").textContent = d.postdocText;
  document.getElementById("grad-title").textContent = d.gradTitle;
  document.getElementById("grad-text").textContent = d.gradText;
  document.getElementById("undergrad-title").textContent = d.undergradTitle;
  document.getElementById("undergrad-text").textContent = d.undergradText;

  const links = document.getElementById("grad-fellowships");
  links.innerHTML = "";
  (d.gradFellowships || []).forEach((f, i) => {
    links.appendChild(el(`<li><a href="${f.url}" target="_blank" rel="noopener">${f.label}</a></li>`));
  });
}
