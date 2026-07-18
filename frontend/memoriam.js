/* ============================================================
   IN MEMORIAM — real, documented fallen heroes of the
   Indian Armed Forces, drawn from the public gallantry-award
   record. Kept accurate rather than padded — add more via
   the FALLEN array below as they're verified.
   ============================================================ */

const FALLEN = [
  { name: "Major Somnath Sharma", unit: "4 KUMAON", branch: "army", war: "First Kashmir War, 1947", award: "Param Vir Chakra", note: "Held Badgam against overwhelming numbers, buying time to save Srinagar airfield. India's first Param Vir Chakra." },
  { name: "Naik Jadunath Singh", unit: "1 RAJPUT", branch: "army", war: "First Kashmir War, 1948", award: "Param Vir Chakra", note: "Held a forward post at Naushera through three enemy assaults until his ammunition, and his life, ran out." },
  { name: "Company Havildar Major Piru Singh", unit: "2 RAJPUT", branch: "army", war: "First Kashmir War, 1948", award: "Param Vir Chakra", note: "Charged bunker after bunker at Tithwal alone, clearing the way for his company even as he fell." },
  { name: "Captain Gurbachan Singh Salaria", unit: "3/1 GORKHA RIFLES", branch: "army", war: "UN Mission, Congo, 1961", award: "Param Vir Chakra", note: "Led a bayonet charge against a far larger force to rescue a besieged UN column in the Congo." },
  { name: "Major Shaitan Singh", unit: "13 KUMAON", branch: "army", war: "Sino-Indian War, 1962", award: "Param Vir Chakra", note: "Commanded the defence of Rezang La to the last round against a force many times his company's size." },
  { name: "Subedar Joginder Singh", unit: "1 SIKH", branch: "army", war: "Sino-Indian War, 1962", award: "Param Vir Chakra", note: "Held Tongpen La through three assaults with a handful of men until overwhelmed." },
  { name: "Brigadier Rajinder Singh", unit: "J&K State Forces", branch: "army", war: "First Kashmir War, 1947", award: "Maha Vir Chakra", note: "Delayed the raiders' advance toward Srinagar at Uri long enough for reinforcements to arrive, at the cost of his life." },
  { name: "CQMH Abdul Hamid", unit: "4 GRENADIERS", branch: "army", war: "Indo-Pak War, 1965", award: "Param Vir Chakra", note: "Destroyed several enemy tanks at Asal Uttar with a recoilless gun, blunting a major armoured thrust." },
  { name: "Lt Col Ardeshir Tarapore", unit: "POONA HORSE", branch: "army", war: "Indo-Pak War, 1965", award: "Param Vir Chakra", note: "Led repeated tank assaults at Phillora and Chawinda despite being wounded, until he was killed in action." },
  { name: "Lance Naik Albert Ekka", unit: "14 GUARDS", branch: "army", war: "Indo-Pak War, 1971", award: "Param Vir Chakra", note: "Destroyed enemy bunkers at Gangasagar despite grievous wounds, enabling his company to secure the position." },
  { name: "2nd Lt Arun Khetarpal", unit: "POONA HORSE", branch: "army", war: "Indo-Pak War, 1971", award: "Param Vir Chakra", note: "Held his ground and destroyed enemy tanks at Basantar even after being ordered to abandon his own burning tank." },
  { name: "Captain N. Kenguruse", unit: "4/5 GORKHA RIFLES", branch: "army", war: "Indo-Pak War, 1971", award: "Param Vir Chakra", note: "Cleared enemy bunkers under heavy fire at Sylhet, falling just short of the objective he had already won." },
  { name: "Flying Officer Nirmal Jit Singh Sekhon", unit: "Indian Air Force", branch: "airforce", war: "Indo-Pak War, 1971", award: "Param Vir Chakra", note: "Took off alone against a large enemy raid over Srinagar and fought until his aircraft went down. The only PVC awarded to the IAF." },
  { name: "Major Ramaswamy Parameswaran", unit: "MAHAR REGIMENT", branch: "army", war: "IPKF, Sri Lanka, 1987", award: "Param Vir Chakra", note: "Led a charge on a militant hideout near Jaffna, refusing to retreat even after being fatally wounded." },
  { name: "Captain Manoj Kumar Pandey", unit: "1/11 GORKHA RIFLES", branch: "army", war: "Kargil War, 1999", award: "Param Vir Chakra", note: "Led the capture of Khalubar Ridge, clearing bunker after bunker before falling to enemy fire near the top." },
  { name: "Major Vivek Gupta", unit: "2 RAJPUTANA RIFLES", branch: "army", war: "Kargil War, 1999", award: "Maha Vir Chakra", note: "Led the assault on Tololing under heavy fire, turning the tide of the battle that opened the way to Tiger Hill." },
  { name: "Major Padmapani Acharya", unit: "2 RAJPUTANA RIFLES", branch: "army", war: "Kargil War, 1999", award: "Maha Vir Chakra", note: "Took over the lead assault on Tololing after his commanding officer fell, and carried the attack forward himself." },
  { name: "Captain Anuj Nayyar", unit: "17 JAT", branch: "army", war: "Kargil War, 1999", award: "Maha Vir Chakra", note: "Led the final charge that cleared Pimple II and Knoll features, clearing three bunkers single-handedly." },
  { name: "Captain Vikram Batra", unit: "13 JAK RIFLES", branch: "army", war: "Kargil War, 1999", award: "Param Vir Chakra", note: "Led the recapture of Point 5140 and Point 4875, and fell while rescuing a wounded officer under fire." },
  { name: "Colonel B. Santosh Babu", unit: "16 BIHAR", branch: "army", war: "Galwan Valley Clash, 2020", award: "Maha Vir Chakra", note: "Led his unit at the forward post during the confrontation and was killed defending Indian positions." },
];

const BRANCH_LABEL = { army: "Indian Army", navy: "Indian Navy", airforce: "Indian Air Force" };

function initials(name) {
  return name
    .replace(/^(Major|Naik|Company Havildar Major|Captain|Subedar|Brigadier|CQMH|Lt Col|Lance Naik|2nd Lt|Flying Officer|Colonel)\s+/, "")
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function renderMemoriam() {
  const grid = document.getElementById("memoriamGrid");
  if (!grid) return;
  grid.innerHTML = FALLEN.map(h => `
    <article class="memoriam-card">
      <div class="memoriam-medallion branch-${h.branch}" aria-hidden="true">
        <span>${initials(h.name)}</span>
      </div>
      <h3>${h.name}</h3>
      <div class="memoriam-meta">${h.unit} · ${BRANCH_LABEL[h.branch]}</div>
      <div class="memoriam-tags">
        <span class="tag tag-war">${h.war}</span>
        <span class="tag tag-award">${h.award}</span>
      </div>
      <p class="memoriam-note">${h.note}</p>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderMemoriam);