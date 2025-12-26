/* =========================
   STATIC SLIDES
   ========================= */

let staticSlides = document.querySelectorAll(".slide");
let current = 0;

/* Move through static slides */
function next() {
  staticSlides[current].classList.remove("active");
  current++;
  staticSlides[current].classList.add("active");
}

/* =========================
   DYNAMIC SLIDES
   ========================= */

let dynamicSlides = [];
let dynIndex = 0;

/* Start merging after input */
function startMerge() {
  const l1 = document.getElementById("list1").value
    .split(",")
    .map(v => Number(v.trim()))
    .filter(v => !isNaN(v));

  const l2 = document.getElementById("list2").value
    .split(",")
    .map(v => Number(v.trim()))
    .filter(v => !isNaN(v));

  if (!l1.length || !l2.length) {
    alert("Please enter valid values in both lists");
    return;
  }

  staticSlides[current].classList.remove("active");
  generateMergeSlides(l1, l2);
  showDynamicSlide(0);
}

/* =========================
   GENERATE ALL MERGE STEPS
   ========================= */

function generateMergeSlides(list1, list2) {
  const container = document.getElementById("dynamicSlides");
  container.innerHTML = "";
  dynamicSlides = [];
  dynIndex = 0;

  let i = 0, j = 0;
  let merged = [];

  /* Step-by-step merge */
  while (i < list1.length && j < list2.length) {
    dynamicSlides.push(createSlide(
      `Compare ${list1[i]} and ${list2[j]}`,
      merged
    ));

    if (list1[i] <= list2[j]) {
      merged.push(list1[i]);
      dynamicSlides.push(createSlide(
        `Add ${list1[i]} to merged list`,
        merged,
        true
      ));
      i++;
    } else {
      merged.push(list2[j]);
      dynamicSlides.push(createSlide(
        `Add ${list2[j]} to merged list`,
        merged,
        true
      ));
      j++;
    }
  }

  /* Remaining nodes */
  while (i < list1.length) {
    merged.push(list1[i]);
    dynamicSlides.push(createSlide(
      `List 2 finished → add ${list1[i]}`,
      merged,
      true
    ));
    i++;
  }

  while (j < list2.length) {
    merged.push(list2[j]);
    dynamicSlides.push(createSlide(
      `List 1 finished → add ${list2[j]}`,
      merged,
      true
    ));
    j++;
  }

  /* Final merged list */
  dynamicSlides.push(createSlide(
    "Final Merged Linked List",
    merged,
    true,
    true
  ));

  /* ✅ Time & Space Complexity (LAST SLIDE) */
  dynamicSlides.push(createComplexitySlide());

  dynamicSlides.forEach(slide => container.appendChild(slide));
}

/* =========================
   SLIDE TEMPLATE
   ========================= */

function createSlide(title, merged, done = false, final = false) {
  const div = document.createElement("div");
  div.className = "slide";

  div.innerHTML = `
    <h2>${title}</h2>
    ${renderList(merged, done, final)}
    ${
      !final
        ? `<button onclick="nextDynamic()">Next ➡</button>`
        : "<h3>This is the final sorted linked list</h3>"
    }
  `;

  return div;
}

/* =========================
   RENDER LINKED LIST
   ========================= */

function renderList(arr, done, final) {
  if (!arr.length) {
    return "<p>Merged list is empty</p>";
  }

  return `
    <div class="line">
      ${arr.map(value =>
        `<div class="node ${final ? "final" : done ? "done" : ""}">
          ${value}
        </div> →`
      ).join("")}
      null
    </div>
  `;
}

/* =========================
   TIME & SPACE COMPLEXITY
   ========================= */

function createComplexitySlide() {
  const div = document.createElement("div");
  div.className = "slide";

  div.innerHTML = `
    <h2>Time & Space Complexity</h2>

    <p><b>Time Complexity:</b> O(n + m)</p>
    <p>
      Each node of both linked lists is visited exactly once.
    </p>

    <p><b>Space Complexity:</b> O(n + m)</p>
    <p>
      A new linked list is created to store the merged result.
    </p>

    <h3>✔ Two-pointer efficient approach</h3>
  `;

  return div;
}

/* =========================
   DYNAMIC NAVIGATION
   ========================= */

function showDynamicSlide(i) {
  dynamicSlides[i].classList.add("active");
}

function nextDynamic() {
  dynamicSlides[dynIndex].classList.remove("active");
  dynIndex++;
  if (dynIndex < dynamicSlides.length) {
    dynamicSlides[dynIndex].classList.add("active");
  }
}
