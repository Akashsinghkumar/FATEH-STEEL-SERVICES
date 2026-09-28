/**
 * FATEH STEEL SERVICES — MASTER JAVASCRIPT & ANIMATION ENGINE
 * Handles: Live Grade Matrix, Weight Calculator, Ember Canvas, Swiper, Lightbox, Magic Cursor, RFQ
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. NAVBAR SCROLL & DROPDOWN EFFECT ---
  const mainNav = document.querySelector('.main-nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      mainNav?.classList.add('scrolled');
    } else {
      mainNav?.classList.remove('scrolled');
    }
  });

  // --- 1B. ROBUST MOBILE OFFCANVAS MENUBAR & INTERACTIVE SUBMENU CONTROLLER ---
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileToggles = document.querySelectorAll('[data-bs-toggle="offcanvas"][data-bs-target="#mobileMenu"], .mobile-menu-toggle');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('show');
    mobileMenu.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';

    let backdrop = document.querySelector('.offcanvas-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'offcanvas-backdrop fade show';
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', closeMobileMenu);
    } else {
      backdrop.classList.add('show');
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('show');
    setTimeout(() => {
      if (!mobileMenu.classList.contains('show')) {
        mobileMenu.style.visibility = 'hidden';
      }
    }, 320);
    document.body.style.overflow = '';

    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) {
      backdrop.classList.remove('show');
      setTimeout(() => {
        backdrop.remove();
      }, 320);
    }
  }

  mobileToggles.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openMobileMenu();
    });
  });

  const closeBtns = mobileMenu?.querySelectorAll('[data-bs-dismiss="offcanvas"], .btn-close');
  closeBtns?.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
    });
  });

  // Mobile Submenu Accordion Toggle
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const parentBox = this.closest('.mobile-submenu-box');
      if (parentBox) {
        parentBox.classList.toggle('open');
      }
    });
  });

  // Close mobile menu when clicking regular navigation links
  const mobileNavLinks = mobileMenu?.querySelectorAll('.mobile-nav-link, .mobile-sub-item');
  mobileNavLinks?.forEach(link => {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // Desktop dropdown hover & touch toggle
  const navDropdown = document.querySelector('.nav-dropdown');
  if (navDropdown) {
    const trigger = navDropdown.querySelector('.nav-link-item');
    trigger?.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        navDropdown.classList.toggle('active');
      }
    });
  }

  // --- 2. WOW.JS & ANIMATION INIT ---
  if (typeof WOW !== 'undefined') {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 60,
      mobile: true,
      live: true
    }).init();
  }

  // --- MAGIC MOUSE CURSOR INIT ---
  if (typeof Cursor !== 'undefined') {
    try {
      new Cursor();
    } catch (e) {
      console.log('Cursor init skipped', e);
    }
  }

  // --- 3. COUNTER UP INIT ---
  if (typeof jQuery !== 'undefined' && jQuery().counterUp) {
    jQuery('.counter').counterUp({
      delay: 10,
      time: 1500
    });
  }

  // --- 4. MAGNIFIC POPUP INIT ---
  if (typeof jQuery !== 'undefined' && jQuery().magnificPopup) {
    jQuery('.popup-gallery').magnificPopup({
      delegate: 'a.popup-link',
      type: 'image',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  // --- 5. SWIPER SLIDER INIT ---
  if (typeof Swiper !== 'undefined') {
    new Swiper('.product-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4500
      },
      pagination: {
        el: '.testi-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 }
      }
    });
  }

  // --- 6. HERO CANVAS EMBER / MOLTEN SPARK SIMULATION ---
  const canvas = document.getElementById('ember-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', function () {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2.6 + 0.8;
        this.speedY = Math.random() * 1.3 + 0.4;
        this.speedX = (Math.random() - 0.5) * 1.0;
        this.opacity = Math.random() * 0.5 + 0.2;
        // FSS Logo Colors: Ocean Blue (205), Lime Green (90), Star Gold (40)
        const rand = Math.random();
        if (rand < 0.45) {
          this.hue = 205; // FSS Blue
          this.sat = 90;
          this.light = 45;
        } else if (rand < 0.8) {
          this.hue = 90;  // FSS Lime Green
          this.sat = 80;
          this.light = 42;
        } else {
          this.hue = 40;  // FSS Star Gold
          this.sat = 95;
          this.light = 50;
        }
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.0025;
        if (this.opacity <= 0 || this.y < -10) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${this.hue}, ${this.sat}%, ${this.light}%)`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 45; i++) {
      const p = new Particle();
      p.y = Math.random() * height; // initial spread
      particles.push(p);
    }

    function animateEmbers() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateEmbers);
    }
    animateEmbers();
  }

  // --- 7. INTERACTIVE STEEL GRADE SEARCH & FILTER MATRIX ---
  const gradeTableBody = document.getElementById('grade-table-body');
  const gradeSearchInput = document.getElementById('grade-search');
  const categoryTabBtns = document.querySelectorAll('.cat-tab-btn');
  const gradeCountBadge = document.getElementById('grade-count-badge');

  let activeCategory = 'All';

  function renderSteelGrades() {
    if (!gradeTableBody || typeof STEEL_DATABASE === 'undefined') return;

    const searchTerm = (gradeSearchInput?.value || '').toLowerCase().trim();

    const filtered = STEEL_DATABASE.filter(item => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.grade.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.applications.toLowerCase().includes(searchTerm) ||
        (item.equivalent && item.equivalent.toLowerCase().includes(searchTerm));
      return matchesCat && matchesSearch;
    });

    if (gradeCountBadge) {
      gradeCountBadge.textContent = `${filtered.length} Grades Found`;
    }

    if (filtered.length === 0) {
      gradeTableBody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-5 text-muted">
            <i class="fas fa-search mb-3" style="font-size: 2rem; color: var(--primary);"></i>
            <p class="m-0">No matching steel grade found for "<strong>${searchTerm}</strong>".<br>Contact us for custom chemical composition forging orders.</p>
          </td>
        </tr>
      `;
      return;
    }

    gradeTableBody.innerHTML = filtered
      .map(
        (g, idx) => `
        <tr>
          <td><span class="grade-name-badge">${g.grade}</span></td>
          <td><span class="fw-bold text-dark">${g.category}</span></td>
          <td><span class="mono fw-bold text-blue">${g.c}</span></td>
          <td><span class="mono text-dark">${g.mn}</span></td>
          <td><span class="mono text-dark">${g.si}</span></td>
          <td><span class="mono text-dark">${g.cr}</span></td>
          <td><span class="mono text-dark">${g.ni}</span></td>
          <td><span class="mono text-dark">${g.mo}</span></td>
          <td><span class="bhn-badge">${g.hardness}</span></td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary view-grade-btn" data-index="${STEEL_DATABASE.indexOf(g)}">
              <i class="fas fa-info-circle me-1"></i> Specs
            </button>
          </td>
        </tr>
      `
      )
      .join('');

    // Attach click event for detail modals
    document.querySelectorAll('.view-grade-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = this.getAttribute('data-index');
        showGradeDetailModal(STEEL_DATABASE[idx]);
      });
    });
  }

  // Category filter tabs
  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      categoryTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeCategory = this.getAttribute('data-category');
      renderSteelGrades();
    });
  });

  // Search input live filtering
  gradeSearchInput?.addEventListener('input', renderSteelGrades);

  // Initial render
  renderSteelGrades();

  // Modal specification viewer (Clean FSS Theme)
  function showGradeDetailModal(gradeObj) {
    if (!gradeObj) return;
    const modalTitle = document.getElementById('specModalTitle');
    const modalBody = document.getElementById('specModalBody');
    if (!modalTitle || !modalBody) return;

    modalTitle.innerHTML = `Grade Specifications: <span class="text-green">${gradeObj.grade}</span>`;
    modalBody.innerHTML = `
      <div class="row g-4">
        <div class="col-md-6">
          <div class="p-3 rounded bg-light border border-secondary border-opacity-25 mb-3">
            <h6 class="text-dark fw-bold mb-2"><i class="fas fa-tag text-blue me-2"></i>Classification</h6>
            <p class="mb-1 text-dark"><strong>Category:</strong> ${gradeObj.category}</p>
            <p class="mb-1 text-dark"><strong>Equivalent Standards:</strong> ${gradeObj.equivalent || 'IS / AISI / DIN'}</p>
            <p class="mb-0 text-dark"><strong>Standard Supply Size:</strong> ${gradeObj.sizeRange || '14mm - 230mm'}</p>
          </div>
          <div class="p-3 rounded bg-light border border-secondary border-opacity-25">
            <h6 class="text-dark fw-bold mb-2"><i class="fas fa-hammer text-blue me-2"></i>Applications</h6>
            <p class="text-muted mb-0 small">${gradeObj.applications}</p>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="text-dark fw-bold mb-3"><i class="fas fa-flask text-blue me-2"></i>Chemical Composition (%)</h6>
          <div class="table-responsive">
            <table class="table table-bordered table-sm mb-3">
              <thead class="table-dark">
                <tr><th>Elem</th><th>Min-Max (%)</th></tr>
              </thead>
              <tbody>
                <tr><td>Carbon (C)</td><td class="text-blue fw-bold font-monospace">${gradeObj.c}</td></tr>
                <tr><td>Manganese (Mn)</td><td class="font-monospace">${gradeObj.mn}</td></tr>
                <tr><td>Silicon (Si)</td><td class="font-monospace">${gradeObj.si}</td></tr>
                <tr><td>Chromium (Cr)</td><td class="font-monospace">${gradeObj.cr}</td></tr>
                <tr><td>Nickel (Ni)</td><td class="font-monospace">${gradeObj.ni}</td></tr>
                <tr><td>Molybdenum (Mo)</td><td class="font-monospace">${gradeObj.mo}</td></tr>
                <tr><td>Vanadium (V)</td><td class="font-monospace">${gradeObj.v || '-'}</td></tr>
                <tr><td>Boron (B)</td><td class="font-monospace">${gradeObj.b || '-'}</td></tr>
              </tbody>
            </table>
          </div>
          <div class="p-2 rounded bg-success bg-opacity-10 border border-success text-dark text-center fw-bold">
            Expected Hardness: <span class="text-green">${gradeObj.hardness}</span>
          </div>
        </div>
      </div>
      <div class="mt-4 pt-3 border-top border-secondary border-opacity-25 text-end">
        <a href="https://wa.me/919876543210?text=Hi%20Fateh%20Steel%20Services,%20I%20need%20a%20quote%20for%20Grade%20${encodeURIComponent(gradeObj.grade)}" target="_blank" class="btn btn-molten">
          <i class="fab fa-whatsapp me-2"></i> Instant Quote for ${gradeObj.grade}
        </a>
      </div>
    `;

    const bsModal = new bootstrap.Modal(document.getElementById('gradeSpecModal'));
    bsModal.show();
  }

  // --- 8. INTERACTIVE STEEL WEIGHT CALCULATOR ---
  const calcShape = document.getElementById('calc-shape');
  const calcDim1 = document.getElementById('calc-dim1');
  const calcDim2 = document.getElementById('calc-dim2');
  const calcDim2Group = document.getElementById('calc-dim2-group');
  const calcLength = document.getElementById('calc-length');
  const calcQty = document.getElementById('calc-qty');
  const calcResultWeight = document.getElementById('calc-result-weight');
  const calcUnitWeight = document.getElementById('calc-unit-weight');
  const dim1Label = document.getElementById('dim1-label');

  function updateCalculatorForm() {
    const shape = calcShape?.value || 'round';
    if (shape === 'round') {
      dim1Label.textContent = 'Diameter (mm):';
      if (calcDim2Group) calcDim2Group.style.display = 'none';
    } else if (shape === 'rcs') {
      dim1Label.textContent = 'Side Width (mm RCS):';
      if (calcDim2Group) calcDim2Group.style.display = 'none';
    } else if (shape === 'hex') {
      dim1Label.textContent = 'Across Flats / HEX (mm):';
      if (calcDim2Group) calcDim2Group.style.display = 'none';
    } else if (shape === 'flat') {
      dim1Label.textContent = 'Width (mm):';
      if (calcDim2Group) calcDim2Group.style.display = 'block';
    }
    calculateSteelWeight();
  }

  function calculateSteelWeight() {
    if (!calcDim1 || !calcLength || !calcResultWeight) return;

    const shape = calcShape.value;
    const d1 = parseFloat(calcDim1.value) || 0;
    const d2 = parseFloat(calcDim2?.value) || 0;
    const len = parseFloat(calcLength.value) || 1; // in meters
    const qty = parseInt(calcQty.value) || 1;

    const density = 0.00785; // kg / (mm2 * m)
    let weightPerMeter = 0;

    if (shape === 'round') {
      // Area = PI * (D/2)^2
      weightPerMeter = (Math.PI / 4) * Math.pow(d1, 2) * density;
    } else if (shape === 'rcs') {
      // RCS (Round Corner Square) - approx 0.985 of sharp square
      weightPerMeter = Math.pow(d1, 2) * density * 0.985;
    } else if (shape === 'hex') {
      // Hexagon weight = 0.006798 * s^2
      weightPerMeter = (Math.sqrt(3) / 2) * Math.pow(d1, 2) * density;
    } else if (shape === 'flat') {
      weightPerMeter = d1 * d2 * density;
    }

    const totalWeight = weightPerMeter * len * qty;

    calcResultWeight.textContent = totalWeight > 0 ? totalWeight.toFixed(2) + ' kg' : '0.00 kg';
    if (calcUnitWeight) {
      calcUnitWeight.textContent = weightPerMeter > 0 ? `(~${weightPerMeter.toFixed(2)} kg/meter)` : '';
    }
  }

  calcShape?.addEventListener('change', updateCalculatorForm);
  calcDim1?.addEventListener('input', calculateSteelWeight);
  calcDim2?.addEventListener('input', calculateSteelWeight);
  calcLength?.addEventListener('input', calculateSteelWeight);
  calcQty?.addEventListener('input', calculateSteelWeight);

  // Initial calculation
  updateCalculatorForm();

  // --- 9. RFQ & PHPMAILER AJAX HANDLER WITH WHATSAPP BACKUP ---
  const rfqForm = document.getElementById('rfq-lead-form');
  rfqForm?.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('rfq-submit-btn') || this.querySelector('button[type="submit"]');
    const statusBox = document.getElementById('rfq-form-status');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry';

    const name = document.getElementById('rfq-name')?.value.trim() || '';
    const company = document.getElementById('rfq-company')?.value.trim() || '';
    const phone = document.getElementById('rfq-phone')?.value.trim() || '';
    const email = document.getElementById('rfq-email')?.value.trim() || '';
    const grade = document.getElementById('rfq-grade')?.value.trim() || '';
    const size = document.getElementById('rfq-size')?.value.trim() || '';
    const qty = document.getElementById('rfq-quantity')?.value.trim() || '';
    const note = document.getElementById('rfq-note')?.value.trim() || '';

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending Inquiry...';
    }
    if (statusBox) {
      statusBox.style.display = 'none';
      statusBox.innerHTML = '';
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('company', company);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('grade', grade);
    formData.append('size', size);
    formData.append('quantity', qty);
    formData.append('note', note);

    try {
      const response = await fetch('send-mail.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success) {
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `
            <div class="alert alert-success border-0 shadow-sm text-start p-3 rounded-3" style="background: #eef9e4; border-left: 4px solid #72be1e !important;">
              <div class="d-flex align-items-center gap-3">
                <i class="fas fa-check-circle fs-3 text-success"></i>
                <div>
                  <h6 class="mb-1 text-dark fw-bold">Inquiry Sent Successfully!</h6>
                  <p class="mb-0 text-muted small">${result.message}</p>
                </div>
              </div>
            </div>`;
        }
        rfqForm.reset();
      } else {
        const errorMsg = (result && result.message) ? result.message : 'Notice: To receive emails via PHPMailer, please ensure send-mail.php is hosted on a PHP server with SMTP configured.';
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `
            <div class="alert alert-warning border-0 shadow-sm text-start p-3 rounded-3">
              <div class="d-flex align-items-center gap-3">
                <i class="fas fa-info-circle fs-3 text-warning"></i>
                <div>
                  <h6 class="mb-1 text-dark fw-bold">Inquiry Notification</h6>
                  <p class="mb-0 text-muted small">${errorMsg}</p>
                </div>
              </div>
            </div>`;
        }
      }
    } catch (err) {
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <div class="alert alert-info border-0 shadow-sm text-start p-3 rounded-3">
            <div class="d-flex align-items-center gap-3">
              <i class="fab fa-whatsapp fs-2 text-success"></i>
              <div>
                <h6 class="mb-1 text-dark fw-bold">Direct WhatsApp Dispatch Ready</h6>
                <p class="mb-2 text-muted small">PHP server unavailable locally. You can send this inquiry directly via WhatsApp:</p>
                <a href="https://wa.me/919876543210?text=${encodeURIComponent('*NEW INQUIRY - FATEH STEEL SERVICES*\n------------------------\n*Name:* ' + name + '\n*Company:* ' + company + '\n*Phone:* ' + phone + '\n*Grade:* ' + grade + '\n*Size:* ' + size + '\n*Quantity:* ' + qty + '\n*Note:* ' + note)}" target="_blank" class="btn btn-sm btn-whatsapp">
                  <i class="fab fa-whatsapp me-1"></i> Send on WhatsApp Now
                </a>
              </div>
            </div>
          </div>`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });

  // --- 10. SMOOTH SCROLL FOR IN-PAGE ANCHORS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
