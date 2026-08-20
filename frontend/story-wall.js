// ===== Story Wall: backend-connected version =====
// Replace your existing storyForm/storyGrid/localStorage logic in script.js with this block.

const storyForm   = document.getElementById("storyForm");
const storyGrid   = document.getElementById("storyGrid");
const storyEmpty  = document.getElementById("storyEmpty");
const storyConfirm = document.getElementById("storyConfirm");

function renderStories(stories) {
  storyGrid.innerHTML = "";

  if (!stories.length) {
    storyEmpty.hidden = false;
    return;
  }
  storyEmpty.hidden = true;

  stories.forEach(s => {
    const card = document.createElement("article");
    card.className = "story-card";
    card.innerHTML = `
      <h3>${escapeHTML(s.hero_name)}</h3>
      ${s.unit ? `<p class="story-unit">${escapeHTML(s.unit)}</p>` : ""}
      <p class="story-text">${escapeHTML(s.story)}</p>
      <footer>
        ${s.relation ? `<span>${escapeHTML(s.relation)}</span>` : ""}
        ${s.submitted_by ? `<span> · ${escapeHTML(s.submitted_by)}</span>` : ""}
      </footer>
    `;
    storyGrid.appendChild(card);
  });
}

// Basic escaping so user-submitted text can't inject HTML
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

// Load existing stories on page load
function loadStories() {
  fetch("story_api.php")
    .then(res => res.json())
    .then(renderStories)
    .catch(err => console.error("Failed to load stories:", err));
}

if (storyForm) {
  storyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = {
      heroName: document.getElementById("heroName").value.trim(),
      relation: document.getElementById("relation").value.trim(),
      unit: document.getElementById("unit").value.trim(),
      story: document.getElementById("story").value.trim(),
      submittedBy: document.getElementById("submittedBy").value.trim(),
      website: document.getElementById("website").value.trim(), // honeypot — must stay empty
    };

    fetch("story_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          return;
        }
        storyForm.reset();
        storyConfirm.hidden = false;
        setTimeout(() => (storyConfirm.hidden = true), 4000);
        loadStories(); // refresh wall with the new story included
      })
      .catch(err => console.error("Failed to submit story:", err));
  });
}

loadStories();