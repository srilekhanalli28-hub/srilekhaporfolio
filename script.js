/* ============================================================
   SRILEKHA N — PORTFOLIO JAVASCRIPT
   File: script.js
   ============================================================ */

/* ─── 1. CURSOR GLOW ─── */
const glow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});


/* ─── 2. FLOATING PARTICLES ─── */
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 28;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left            = Math.random() * 100 + '%';
  p.style.width           = (Math.random() * 2 + 1) + 'px';
  p.style.height          = p.style.width;
  p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  p.style.animationDuration = (Math.random() * 8 + 6) + 's';
  p.style.animationDelay    = (Math.random() * 10) + 's';
  particleContainer.appendChild(p);
}


/* ─── 3. PROJECT CARD MOUSE GLOW ─── */
function trackMouse(el, e) {
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width  * 100) + '%');
  el.style.setProperty('--my', ((e.clientY - rect.top)  / rect.height * 100) + '%');
}


/* ─── 4. SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));


/* ─── 5. CONTACT FORM SUBMISSION ─── */

// Inject shake keyframe once
const shakeStyle = document.createElement('style');
shakeStyle.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }';
document.head.appendChild(shakeStyle);

function submitForm() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value.trim();
  const btn     = document.getElementById('cf-btn');
  const btnText = document.getElementById('cf-btn-text');
  const success = document.getElementById('cf-success');

  // Validate — shake empty fields
  if (!name || !email || !subject || !message) {
    ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = 'rgba(192,57,43,0.9)';
        el.style.animation   = 'shake 0.35s ease';
        setTimeout(() => { el.style.animation = ''; }, 400);
      }
    });
    return;
  }

  // Simulate send
  btnText.textContent = 'Transmitting…';
  btn.disabled        = true;
  btn.style.opacity   = '0.6';

  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('show');

    // Reset fields
    ['cf-name', 'cf-email', 'cf-message'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('cf-subject').value = '';
  }, 1600);
}


/* ─── 6. DOWNLOAD RESUME ─── */
function downloadResume(e) {
  e.preventDefault();

  const btn    = e.currentTarget;
  const textEl = btn.querySelector('.btn-download-text');
  const svgEl  = btn.querySelector('svg');

  // Loading state
  btn.classList.add('downloading');
  textEl.textContent     = 'Preparing…';
  svgEl.style.animation  = 'spin-dl 0.7s linear infinite';

  const spinStyle    = document.createElement('style');
  spinStyle.id       = 'spin-style';
  spinStyle.textContent = '@keyframes spin-dl { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }';
  document.head.appendChild(spinStyle);

  setTimeout(() => {
    // ── Resume content ──
    const resumeText = `SRILEKHA N — DATA ANALYST
+91-6309412039  |  srilekhanalli12@gmail.com
linkedin.com/in/srilekha-nalli  |  github.com/srilekhanalli28-hub

══════════════════════════════════════════════════
PROFESSIONAL SUMMARY
══════════════════════════════════════════════════
Detail-oriented and analytical Data Analyst fresher with a solid background
in SQL, Python, Power BI, and Advanced Excel. Practical experience in data
cleaning, EDA, ETL operations, and dashboard creation. Proficient in
transforming raw data into actionable insights for business decisions.

══════════════════════════════════════════════════
EDUCATION
══════════════════════════════════════════════════
Bachelor of Computer Science                                2024
Adhikavi Nannaya University                         CGPA: 7.46 / 10

Intermediate (MPC)                                          2018
Heavens Junior College                               CGPA: 6.5 / 10

Secondary Education (10th Grade)                           2016
Santhinikethan English Medium High School            CGPA: 7.3 / 10

══════════════════════════════════════════════════
PROJECTS
══════════════════════════════════════════════════
Sales Dashboard — Power BI                                  2026
• Processed and cleaned 75,000+ sales records using Python (Pandas) and SQL.
• Built interactive Power BI dashboard: revenue, profit margin, region-wise
  performance, and customer segmentation.
• Identified underperforming regions → simulated 20% revenue improvement.

Customer Churn Prediction Model                             2026
• Performed EDA on telecom dataset with 50,000+ records.
• Implemented Logistic Regression & Random Forest — achieved 87% accuracy.
• Identified high-risk segments; provided actionable business insights.

HR Analytics and Attrition Dashboard                        2026
• Designed Excel & Power BI dashboards for attrition, retention & performance.
• Automated monthly HR reporting, reducing manual effort by 40%.

══════════════════════════════════════════════════
TECHNICAL SKILLS
══════════════════════════════════════════════════
Programming   : Python (Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn)
Databases     : MySQL
Visualization : Power BI, Tableau, Advanced Excel
Tools         : Jupyter Notebook, Google Colab, MS Excel, Google Sheets

══════════════════════════════════════════════════
ACHIEVEMENTS
══════════════════════════════════════════════════
• Data Analytics Virtual Experience Program — Deloitte (Forage), 2026
• Data Visualization Virtual Experience Program — Tata Group (Forage), 2026
`;

    // Trigger download
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = 'Srilekha_N_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Done state
    btn.classList.remove('downloading');
    btn.classList.add('done');
    svgEl.style.animation = '';
    document.getElementById('spin-style')?.remove();
    svgEl.innerHTML    = '<polyline points="20 6 9 17 4 12" stroke-width="2.5"/>';
    textEl.textContent = 'Downloaded!';

    // Reset after 3 seconds
    setTimeout(() => {
      btn.classList.remove('done');
      svgEl.innerHTML    = '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>';
      textEl.textContent = 'Download Resume';
    }, 3000);

  }, 900);
}

function submitForm() {

  const form = document.getElementById("contact-form");

  // Check if form is valid
  if (!form.checkValidity()) {

    form.reportValidity(); // shows browser validation messages
    return;

  }

  const data = new FormData(form);

  fetch("https://formspree.io/f/mykbodad", {

    method: "POST",

    body: data,

    headers: {
      'Accept': 'application/json'
    }

  })

  .then(response => {

    if (response.ok) {

      form.reset();

      document.getElementById("cf-success").style.display = "block";

    }

    else {

      alert("Message failed to send.");

    }

  })

  .catch(error => {

    alert("Something went wrong.");

  });

}