// ============================================
// UAA Ambassador Form — Script
// ============================================

const LEOTARDS = [
  // Florals & Nature
  { id: 'black-white-flora', name: 'Black & White Flora', image: 'leotards/01-black-white-flora.jpg', category: 'florals' },
  { id: 'flower-magenta', name: 'Flower Magenta', image: 'leotards/02-flower-magenta.jpg', category: 'florals' },
  { id: 'spring-flowers-crystal-bow', name: 'Spring Flowers Crystal Bow', image: 'leotards/03-spring-flowers-crystal-bow.jpg', category: 'florals' },
  { id: 'turquoise-flower-open-back', name: 'Turquoise Flower Open Back', image: 'leotards/04-turquoise-flower-open-back.jpg', category: 'florals' },
  { id: 'turquoise-flower-crystal', name: 'Turquoise Flower Crystal', image: 'leotards/05-turquoise-flower-crystal.jpg', category: 'florals' },
  { id: 'charcoal-garden', name: 'Charcoal Garden', image: 'leotards/06-charcoal-garden.jpg', category: 'florals' },
  { id: 'teal-meadow-green', name: 'Teal Meadow Green', image: 'leotards/07-teal-meadow-green.jpg', category: 'florals' },
  { id: 'vintage-floral', name: 'Vintage Floral', image: 'leotards/08-vintage-floral.jpg', category: 'florals' },
  { id: 'symmetrical-floral', name: 'Symmetrical Floral', image: 'leotards/09-symmetrical-floral.jpg', category: 'florals' },
  { id: 'paisley-black', name: 'Paisley Black', image: 'leotards/10-paisley-black.jpg', category: 'florals' },
  { id: 'rose-ombre-open-back', name: 'Rose Ombre Open Back', image: 'leotards/11-rose-ombre-open-back.jpg', category: 'florals' },
  { id: 'rose-ombre-crystal', name: 'Rose Ombre Crystal', image: 'leotards/12-rose-ombre-crystal.jpg', category: 'florals' },
  { id: 'pastel-crystal-lace', name: 'Pastel Crystal Lace', image: 'leotards/13-pastel-crystal-lace.jpg', category: 'florals' },
  { id: 'cardinal-pink-grey', name: 'Cardinal Pink & Grey', image: 'leotards/14-cardinal-pink-grey.jpg', category: 'florals' },

  // Bold & Vibrant
  { id: 'rainbow-ombre-fade', name: 'Rainbow Ombre Fade', image: 'leotards/01-rainbow-ombre-fade.jpg', category: 'bold' },
  { id: 'royal-ombre', name: 'Royal Ombre', image: 'leotards/02-royal-ombre.jpg', category: 'bold' },
  { id: 'ombre-skyblue-rose', name: 'Ombre Sky Blue & Rose', image: 'leotards/03-ombre-skyblue-rose.jpg', category: 'bold' },
  { id: 'polynesian-red-ombre', name: 'Polynesian Red Ombre', image: 'leotards/04-polynesian-red-ombre.jpg', category: 'bold' },
  { id: 'neon-mix-colors', name: 'Neon Mix Colors', image: 'leotards/05-neon-mix-colors.jpg', category: 'bold' },
  { id: 'asymmetrical-mix-colors', name: 'Asymmetrical Mix Colors', image: 'leotards/06-asymmetrical-mix-colors.jpg', category: 'bold' },
  { id: 'multi-colored-abstract', name: 'Multi-Colored Abstract', image: 'leotards/07-multi-colored-abstract.jpg', category: 'bold' },
  { id: 'multicolored-abstract-lines', name: 'Multicolored Abstract Lines', image: 'leotards/08-multicolored-abstract-lines.jpg', category: 'bold' },
  { id: 'geometric-black-mystique', name: 'Geometric Black Mystique', image: 'leotards/09-geometric-black-mystique.jpg', category: 'bold' },
  { id: 'grunge-datamoshing', name: 'Grunge Datamoshing', image: 'leotards/10-grunge-datamoshing.jpg', category: 'bold' },
  { id: 'open-back-geometric', name: 'Open Back Geometric', image: 'leotards/11-open-back-geometric.jpg', category: 'bold' },
  { id: 'blue-purple-lace', name: 'Blue & Purple Lace', image: 'leotards/12-blue-purple-lace.jpg', category: 'bold' },
  { id: 'black-and-pastel', name: 'Black & Pastel', image: 'leotards/13-black-and-pastel.jpg', category: 'bold' },
  { id: 'colorful-abstract', name: 'Colorful Abstract', image: 'leotards/14-303-colorful.jpg', category: 'bold' },

  // Elegant & Classic
  { id: 'fuchsia-skyblue-crystal', name: 'Fuchsia & Sky Blue Crystal', image: 'leotards/01-fuchsia-skyblue-crystal.jpg', category: 'elegant' },
  { id: 'black-and-silver', name: 'Black & Silver', image: 'leotards/02-black-and-silver.jpg', category: 'elegant' },
  { id: 'black-magenta', name: 'Black & Magenta', image: 'leotards/03-black-magenta.jpg', category: 'elegant' },
  { id: 'black-print-open-back', name: 'Black Print Open Back', image: 'leotards/04-black-print-open-back.jpg', category: 'elegant' },
  { id: 'paris-open-back', name: 'Paris Open Back', image: 'leotards/05-paris-open-back.jpg', category: 'elegant' },
  { id: 'polynesian-black-white', name: 'Polynesian Black & White', image: 'leotards/06-polynesian-black-white.jpg', category: 'elegant' },
  { id: 'unique-asymmetrical', name: 'Unique Asymmetrical', image: 'leotards/07-unique-asymmetrical.jpg', category: 'elegant' },
  { id: 'american-flag', name: 'American Flag', image: 'leotards/08-american-flag.jpg', category: 'elegant' },
  { id: 'american-stars-stripes', name: 'American Stars & Stripes', image: 'leotards/09-american-stars-stripes.jpg', category: 'elegant' },
  { id: 'turquoise-pink-camo', name: 'Turquoise Pink Camo', image: 'leotards/10-turquoise-pink-camo.jpg', category: 'elegant' },
  { id: 'black-silver-stripe', name: 'Black & Silver Stripe', image: 'leotards/11-608-black-silver-stripe.jpg', category: 'elegant' },
  { id: 'open-back-camo', name: 'Open Back Camo', image: 'leotards/12-open-back-camo.jpg', category: 'elegant' },
  { id: 'velvet-rhinestone', name: 'Velvet Rhinestone', image: 'leotards/13-velvet-rhinestone-440.jpg', category: 'elegant' },
];

const SIZES = ['CS', 'CM', 'CL', 'AXS', 'AS', 'AM', 'AL'];
const MAX_SELECTIONS = 2;

let selected = []; // Array of { id, name, image, size }

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  renderGrid('all');
  setupFilters();
  setupForm();
  setupModals();
});

// ---- Render Leotard Grid ----
function renderGrid(filter) {
  const grid = document.getElementById('leotardGrid');
  const filtered = filter === 'all' ? LEOTARDS : LEOTARDS.filter(l => l.category === filter);

  grid.innerHTML = filtered.map(leo => {
    const isSelected = selected.some(s => s.id === leo.id);
    const isDisabled = !isSelected && selected.length >= MAX_SELECTIONS;
    const classes = ['leo-card'];
    if (isSelected) classes.push('selected');
    if (isDisabled) classes.push('disabled');

    return `
      <div class="${classes.join(' ')}" data-id="${leo.id}" onclick="toggleSelect('${leo.id}')">
        <div class="check-overlay">&#10003;</div>
        <img src="${leo.image}" alt="${leo.name}" loading="lazy">
        <div class="leo-name">${leo.name}</div>
      </div>
    `;
  }).join('');
}

// ---- Toggle Leotard Selection ----
function toggleSelect(id) {
  const existing = selected.findIndex(s => s.id === id);

  if (existing !== -1) {
    selected.splice(existing, 1);
  } else {
    if (selected.length >= MAX_SELECTIONS) return;
    const leo = LEOTARDS.find(l => l.id === id);
    selected.push({ id: leo.id, name: leo.name, image: leo.image, size: '' });
  }

  // Re-render
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  renderGrid(activeFilter);
  renderSelections();
}

// ---- Render Selections Summary ----
function renderSelections() {
  const box = document.getElementById('selectionsBox');

  if (selected.length === 0) {
    box.classList.remove('visible');
    return;
  }

  box.classList.add('visible');
  const container = document.getElementById('selectionItems');
  container.innerHTML = selected.map((sel, i) => `
    <div class="selection-item">
      <img src="${sel.image}" alt="${sel.name}">
      <div class="sel-info">
        <div class="sel-name">${sel.name}</div>
      </div>
      <select onchange="updateSize(${i}, this.value)" required>
        <option value="">Size</option>
        ${SIZES.map(s => `<option value="${s}" ${sel.size === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <button class="remove-btn" onclick="toggleSelect('${sel.id}')" title="Remove">&times;</button>
    </div>
  `).join('');
}

// ---- Update Size for Selected Leo ----
function updateSize(index, size) {
  if (selected[index]) {
    selected[index].size = size;
  }
}

// ---- Category Filters ----
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.filter);
    });
  });
}

// ---- Form Submission ----
function setupForm() {
  const form = document.getElementById('ambassadorForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate selections
    if (selected.length === 0) {
      showMessage('Please select at least 1 leotard above.', 'error');
      return;
    }

    for (let i = 0; i < selected.length; i++) {
      if (!selected[i].size) {
        showMessage(`Please select a size for "${selected[i].name}".`, 'error');
        return;
      }
    }

    // Validate terms
    if (!document.getElementById('agreeTerms').checked) {
      showMessage('Please agree to the Terms & Conditions and Privacy Policy.', 'error');
      return;
    }

    // Collect form data
    const formData = new FormData(form);

    // Add leotard selections
    formData.append('Leotard 1', `${selected[0].name} — Size: ${selected[0].size}`);
    if (selected[1]) {
      formData.append('Leotard 2', `${selected[1].name} — Size: ${selected[1].size}`);
    }

    // Add subject line for email
    formData.append('_subject', `New Ambassador Application: ${formData.get('Full Name')} (@${formData.get('Instagram Handle')})`);

    const btn = form.querySelector('.submit-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    try {
      const resp = await fetch('https://formsubmit.co/ajax/adam@unitedallaround.com', {
        method: 'POST',
        body: formData,
      });

      const data = await resp.json();

      if (data.success) {
        showMessage("You're in! We got your application and will reach out soon. Check your email!", 'success');
        form.reset();
        selected = [];
        renderGrid('all');
        renderSelections();
      } else {
        showMessage('Something went wrong. Please try again or DM us on Instagram @united_all_around.', 'error');
      }
    } catch (err) {
      showMessage('Something went wrong. Please try again or DM us on Instagram @united_all_around.', 'error');
    }

    btn.classList.remove('loading');
    btn.disabled = false;
  });
}

// ---- Show Message ----
function showMessage(text, type) {
  const msg = document.getElementById('formMessage');
  msg.textContent = text;
  msg.className = 'form-message ' + (type === 'success' ? 'success' : 'error-msg');

  msg.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (type === 'error') {
    setTimeout(() => { msg.style.display = 'none'; msg.className = 'form-message'; }, 5000);
  }
}

// ---- Modals ----
function setupModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ---- US States for dropdown ----
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC'
];

document.addEventListener('DOMContentLoaded', () => {
  const stateSelect = document.getElementById('state');
  if (stateSelect) {
    US_STATES.forEach(st => {
      const opt = document.createElement('option');
      opt.value = st;
      opt.textContent = st;
      stateSelect.appendChild(opt);
    });
  }
});
