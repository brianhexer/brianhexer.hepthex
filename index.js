/* ==========================================================================
   FUTURISTIC LIQUID CURSOR WITH LERP (LINEAR INTERPOLATION)
   ========================================================================== */
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Linear interpolation coefficient for smooth lag follow
const LERP_FACTOR = 0.08;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Instant follow for the inner dot
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  // LERP calculation: targetPos - currentPos * factor
  cursorX += (mouseX - cursorX) * LERP_FACTOR;
  cursorY += (mouseY - cursorY) * LERP_FACTOR;
  
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Custom cursor hover expansions
const interactiveElements = document.querySelectorAll('a, button, .copy-card, .category-block, input, textarea');

interactiveElements.forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
  });
  elem.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
  });
});

window.addEventListener('mousedown', () => {
  cursor.classList.add('click');
});
window.addEventListener('mouseup', () => {
  cursor.classList.remove('click');
});


/* ==========================================================================
   TECHNICAL CONSOLE BOOT PRELOADER
   ========================================================================== */
const preloaderLog = document.getElementById('preloader-log');
const preloaderBar = document.getElementById('preloader-bar');
const preloaderPct = document.getElementById('preloader-pct');
const preloader = document.getElementById('preloader');

const bootLogs = [
  { text: "guest@brianhexer:~$ systemctl start HEPTHEX_CORE.service", delay: 100 },
  { text: "INITIALIZING BOOT SECTOR CORRELATIONS...", delay: 200 },
  { text: "[OK] MOUNTING HARDWARE INTERFACES: VLSI_SIMULATOR (UVM_OK)", delay: 150, ok: true },
  { text: "[OK] COMPILING AI METRIC NODES: YOLO_NET / DEEPFAKE_VIGILANT", delay: 200, ok: true },
  { text: "[OK] CACHING GEOLOCATION SPEC: COIMBATORE, TAMIL NADU, INDIA", delay: 100, ok: true },
  { text: "[OK] ESTABLISHING NATIONAL DONG HWA UNIVERSITY (TAIWAN) TELEMETRY", delay: 220, ok: true },
  { text: "[OK] RESOLVING SYSTEM OBJECTIVES: SEEKING NEXT-GEN INNOVATIONS", delay: 120, ok: true },
  { text: "[OK] PARSING RESEARCH SCHOLARSHIPS: ICCSICE'24 / RTES'23", delay: 180, ok: true },
  { text: "[OK] SPINNING AGENCY GATEWAY: HEPTHEX [hepthex.com]", delay: 100, ok: true },
  { text: "guest@brianhexer:~$ ./launch_portfolio --user='DEEPAN P' --alias='BRIAN HEXER'", delay: 100 },
  { text: "COMPILING WEB INTERACTIVE GRAPHICS... SUCCESS.", delay: 250, ok: true },
  { text: "[SUCCESS] PORTFOLIO HANDSHAKE COMPLETE. DEEPAN P IS ONLINE.", delay: 150, ok: true }
];

async function executePreloaderBoot() {
  let logIndex = 0;
  let pct = 0;
  
  // Dynamic typing of boot logs
  for (let log of bootLogs) {
    await new Promise(resolve => setTimeout(resolve, log.delay));
    
    const p = document.createElement('p');
    p.textContent = log.text;
    if (log.ok) p.className = 'sys-ok';
    preloaderLog.appendChild(p);
    
    // Auto-scroll preloader terminal
    preloaderLog.scrollTop = preloaderLog.scrollHeight;
    
    // Increment percentages realistic-looking
    pct += Math.floor(100 / bootLogs.length);
    if (pct > 100) pct = 100;
    preloaderBar.style.width = `${pct}%`;
    preloaderPct.textContent = `${pct}%`;
  }
  
  // Fill remaining bar if any rounding errors
  preloaderBar.style.width = '100%';
  preloaderPct.textContent = '100%';
  
  // Let it settle for a moment
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Complete loader
  preloader.classList.add('loaded');
  
  // Launch Stats and canvas loop
  initializeStatsNumbers();
}

window.addEventListener('load', () => {
  executePreloaderBoot();
});


/* ==========================================================================
   QUANTUM CONNECTION PARTICLE CANVAS BACKGROUND
   ========================================================================== */
const canvas = document.getElementById('canvas-quantum');
const ctx = canvas.getContext('2d');

let particles = [];
let maxParticles = 65;

// Handle canvas resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle Model
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = Math.random() * 2 + 1;
    this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(157, 78, 221, 0.45)';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Boundaries bounce
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mouse gravity distortion
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.hypot(dx, dy);
    
    if (dist < 150) {
      // Subtle push away or pull towards based on mouse
      const force = (150 - dist) / 1500;
      this.x -= dx * force;
      this.y -= dy * force;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Generate Particle field
function initParticles() {
  particles = [];
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }
}
initParticles();

// Render loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw particles
  for (let p of particles) {
    p.update();
    p.draw();
  }

  // Draw connecting quantum lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        // Fade lines dynamically based on distance threshold
        const opacity = (100 - dist) / 100 * 0.12;
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);


/* ==========================================================================
   HORIZONTAL SCROLL SYSTEM (DESKTOP SCROLL LOCK PINNING)
   ========================================================================== */
const workSection = document.getElementById('work');
const horizontalWrapper = document.getElementById('horizontal-wrapper');
const HORIZONTAL_SCROLL_BREAKPOINT = 1024;

let workSectionTop = 0;
let workContainerWidth = 0;
let horizontalScrollProgress = 0;
let horizontalWheelLocked = false;
let horizontalScrollFrame = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setupHorizontalScroll() {
  if (!workSection || !horizontalWrapper) return;

  if (window.innerWidth <= HORIZONTAL_SCROLL_BREAKPOINT) {
    workSection.style.height = 'auto';
    horizontalWrapper.style.transform = 'none';
    horizontalWheelLocked = false;
    horizontalScrollProgress = 0;
    return;
  }

  workSectionTop = workSection.getBoundingClientRect().top + window.scrollY;
  workContainerWidth = Math.max(horizontalWrapper.scrollWidth - window.innerWidth, 0);
  horizontalScrollProgress = clamp(window.scrollY - workSectionTop, 0, workContainerWidth);

  workSection.style.height = `${window.innerHeight + workContainerWidth}px`;
  horizontalWrapper.style.transform = 'translate3d(0px, 0, 0)';
}

function updateHorizontalScroll() {
  horizontalScrollFrame = 0;

  if (!workSection || !horizontalWrapper) return;

  if (window.innerWidth <= HORIZONTAL_SCROLL_BREAKPOINT) {
    horizontalWrapper.style.transform = 'none';
    return;
  }

  if (!horizontalWheelLocked) {
    horizontalScrollProgress = clamp(window.scrollY - workSectionTop, 0, workContainerWidth);
  }

  horizontalWrapper.style.transform = `translate3d(-${horizontalScrollProgress}px, 0, 0)`;
}

function requestHorizontalScrollUpdate() {
  if (horizontalScrollFrame) return;
  horizontalScrollFrame = window.requestAnimationFrame(updateHorizontalScroll);
}

function handleHorizontalWheel(event) {
  if (!workSection || !horizontalWrapper) return;
  if (window.innerWidth <= HORIZONTAL_SCROLL_BREAKPOINT) return;

  const scrollTop = window.scrollY;
  const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  const enteringShowcase = delta > 0 && scrollTop < workSectionTop && scrollTop + window.innerHeight >= workSectionTop;
  const inHorizontalZone = scrollTop >= workSectionTop && scrollTop <= workSectionTop + workContainerWidth;

  if (!delta || (!inHorizontalZone && !enteringShowcase)) return;

  const direction = Math.sign(delta);

  if (direction > 0) {
    if (horizontalScrollProgress >= workContainerWidth) return;

    event.preventDefault();
    horizontalWheelLocked = true;

    if (enteringShowcase) {
      window.scrollTo(0, workSectionTop);
    }

    horizontalScrollProgress = clamp(horizontalScrollProgress + Math.max(Math.abs(delta), 24), 0, workContainerWidth);
    requestHorizontalScrollUpdate();

    if (horizontalScrollProgress >= workContainerWidth) {
      horizontalWheelLocked = false;
      window.scrollTo(0, workSectionTop + workContainerWidth);
    }

    return;
  }

  if (direction < 0) {
    if (horizontalScrollProgress <= 0) return;

    event.preventDefault();
    horizontalWheelLocked = true;
    horizontalScrollProgress = clamp(horizontalScrollProgress - Math.max(Math.abs(delta), 24), 0, workContainerWidth);
    requestHorizontalScrollUpdate();

    if (horizontalScrollProgress <= 0) {
      horizontalWheelLocked = false;
      window.scrollTo(0, workSectionTop);
    }
  }
}

if (workSection && horizontalWrapper) {
  window.addEventListener('scroll', requestHorizontalScrollUpdate, { passive: true });
  window.addEventListener('wheel', handleHorizontalWheel, { passive: false });

  window.addEventListener('load', () => {
    setupHorizontalScroll();
    requestHorizontalScrollUpdate();

    // Safe multi-phase measurement for dynamic images/fonts layout settling
    setTimeout(() => {
      setupHorizontalScroll();
      requestHorizontalScrollUpdate();
    }, 300);

    setTimeout(() => {
      setupHorizontalScroll();
      requestHorizontalScrollUpdate();
    }, 1000);
  });

  window.addEventListener('resize', () => {
    setupHorizontalScroll();
    requestHorizontalScrollUpdate();

    setTimeout(() => {
      setupHorizontalScroll();
      requestHorizontalScrollUpdate();
    }, 100);
  });

  if ('ResizeObserver' in window) {
    const horizontalResizeObserver = new ResizeObserver(() => {
      setupHorizontalScroll();
      requestHorizontalScrollUpdate();
    });

    horizontalResizeObserver.observe(horizontalWrapper);
  }

  horizontalWrapper.querySelectorAll('img').forEach((image) => {
    if (image.complete) return;
    image.addEventListener('load', () => {
      setupHorizontalScroll();
      requestHorizontalScrollUpdate();
    }, { once: true });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      setupHorizontalScroll();
      requestHorizontalScrollUpdate();
    });
  }

  setupHorizontalScroll();
  requestHorizontalScrollUpdate();
}


/* ==========================================================================
   INTERACTIVE SKILL CONSTELLATION DISPLAY
   ========================================================================== */
const skillsOutput = document.getElementById('skills-output');
const skillCategories = document.querySelectorAll('.category-block');

const skillsData = {
  vlsi: {
    command: "./dump_core --vlsi_systems",
    intro: "Compiling hardware description modules and verification testbenches...",
    details: [
      { name: "Verilog / SystemVerilog", icon: "fa-microchip" },
      { name: "UVM Framework", icon: "fa-shield-halved" },
      { name: "ModelSim Sim", icon: "fa-chart-line" },
      { name: "Quartus Prime", icon: "fa-laptop-code" },
      { name: "Digital Arch Design", icon: "fa-network-wired" },
      { name: "EDA Playground", icon: "fa-puzzle-piece" }
    ],
    info: "Extensive experience modeling synchronous and asynchronous state machines, testing logic bounds, writing layered verification systems, and mapping layouts for synthesizable targets."
  },
  aiml: {
    command: "./fetch_heuristics --ai_ml_models",
    intro: "Booting neural network model weights and image matrix processing...",
    details: [
      { name: "Python Engineering", icon: "fa-brands fa-python" },
      { name: "TensorFlow & PyTorch", icon: "fa-brain" },
      { name: "YOLO Computer Vision", icon: "fa-eye" },
      { name: "CNN / GAN / ELA", icon: "fa-network-wired" },
      { name: "Edge AI Pipelines", icon: "fa-server" },
      { name: "Video Forensics Heuristics", icon: "fa-magnifying-glass" }
    ],
    info: "Specialize in custom convolution nodes, ELA manipulation checking, and YOLO tracking on micro-processor cards (macaque recognition yields 98% accuracy)."
  },
  web: {
    command: "./init_services --fullstack_agency",
    intro: "Mounting database pools, express routers, and PWA manifest assets...",
    details: [
      { name: "React.js Framework", icon: "fa-brands fa-react" },
      { name: "Node.js & Express", icon: "fa-brands fa-node-js" },
      { name: "Flask & Django API", icon: "fa-gears" },
      { name: "MongoDB & Basic SQL", icon: "fa-database" },
      { name: "Responsive Layouts", icon: "fa-mobile-screen" },
      { name: "PWA Offline Caches", icon: "fa-cloud-arrow-down" }
    ],
    info: "Managing complete websites for companies and executing web solutions. Founding member of HEPTHEX digital agency ensuring responsive interfaces and secure REST API orchestration."
  },
  embedded: {
    command: "./mount_peripherals --robotics_iot",
    intro: "Initializing telemetry streams and feedback-control sensor pins...",
    details: [
      { name: "Embedded Systems & IoT", icon: "fa-satellite-dish" },
      { name: "Autonomous Path Navigation", icon: "fa-route" },
      { name: "Sensor Integration Arrays", icon: "fa-compass" },
      { name: "ROBOMIRACLE Workflows", icon: "fa-industry" },
      { name: "Microcontroller Programming", icon: "fa-microchip" },
      { name: "Feedback Control Systems", icon: "fa-gauge-high" }
    ],
    info: "Prototyped SIH recognized grid energy monitors. Specialized in autonomous robotics, sensor matrix mapping, and support for automated robotic system configurations."
  }
};

function renderSkillCategory(catId) {
  const data = skillsData[catId];
  if (!data) return;

  skillsOutput.innerHTML = `
    <div class="skill-group-container">
      <div class="console-cmd-line">guest@brianhexer:~$ ${data.command}</div>
      <p class="console-intro">${data.intro}</p>
      <div class="skill-list-grid">
        ${data.details.map(item => `
          <div class="skill-node-tag">
            <i class="fa-solid ${item.icon}"></i>
            <span>${item.name}</span>
          </div>
        `).join('')}
      </div>
      <div class="console-meta-info">
        <p><strong>CORE_CAPABILITIES:</strong> ${data.info}</p>
      </div>
    </div>
  `;
}

// Click Trigger for categories
skillCategories.forEach(block => {
  block.addEventListener('click', () => {
    // Remove active state
    skillCategories.forEach(b => b.classList.remove('active'));
    // Add current active
    block.classList.add('active');
    
    const cat = block.getAttribute('data-cat');
    renderSkillCategory(cat);
  });
});

// Load default categories
renderSkillCategory('vlsi');


/* ==========================================================================
   SCROLL REVEAL OBSERVERS & ACTIVE NAV BINDING
   ========================================================================== */
const revealElements = document.querySelectorAll('.scroll-reveal');
const navLinks = document.querySelectorAll('.nav-links a');
const nav = document.querySelector('.floating-nav');
const sections = document.querySelectorAll('section');

// Reveal viewport entrance
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(elem => {
  revealObserver.observe(elem);
});

// Floating Nav hides on scroll down, shows on scroll up
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  if (scrollTop > lastScrollTop && scrollTop > 150) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastScrollTop = scrollTop;

  // Nav link highlight binding based on active section
  let currentSec = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop;
    if (scrollTop >= secTop - 200) {
      currentSec = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSec}`) {
      link.classList.add('active');
    }
  });
});


/* ==========================================================================
   STATS NUMBERS ANIMATIONS
   ========================================================================== */
function initializeStatsNumbers() {
  const statNums = document.querySelectorAll('.stat-num');
  
  statNums.forEach(num => {
    const target = parseInt(num.getAttribute('data-val'));
    const isPercentage = num.innerText.includes('%') || target === 99;
    const isPlus = target === 4 || target === 12;
    
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    
    const interval = setInterval(() => {
      current += 1;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      
      if (isPercentage) {
        num.innerText = `${current}%`;
      } else if (isPlus) {
        num.innerText = `${current}+`;
      } else {
        num.innerText = current;
      }
    }, stepTime);
  });
}


/* ==========================================================================
   CONTACT TRANSMITTER & TERMINAL STREAMING
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const terminalStream = document.getElementById('terminal-stream-log');
const btnTransmit = document.getElementById('btn-transmit');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const msg = document.getElementById('form-msg').value;

  btnTransmit.disabled = true;
  btnTransmit.querySelector('.btn-text').textContent = "EMITTING PACKETS...";
  
  // Clear logs first
  terminalStream.innerHTML = '';
  
  const formLogs = [
    { text: `guest@brianhexer:~$ ./send_message --name="${name}" --email="${email}"`, delay: 100 },
    { text: "PACKETIZING MESSAGE OBJECT FOR EMISSION...", delay: 200 },
    { text: "ENCRYPTING DATA PAYLOAD OVER SECURE SSL TACTICS...", delay: 150 },
    { text: "TRANSMITTING DATA GRAPHS TO HEXER INBOX...", delay: 350 },
    { text: "[OK] HANDSHAKE CONFIRMED AT HEPTHEX NETWORK GATEWAY", delay: 200 },
    { text: "[OK] TELEMETRY PACKET ROUTED TO PORT 8080 SUCCESSFULLY", delay: 100 },
    { text: "[SUCCESS] MESSAGE SENT. DEEPAN P RECEIVED SENDER LOGS.", delay: 200 }
  ];

  for (let log of formLogs) {
    await new Promise(resolve => setTimeout(resolve, log.delay));
    const p = document.createElement('p');
    p.textContent = log.text;
    p.className = 'terminal-log-output sys-ok';
    terminalStream.appendChild(p);
    
    // Auto scroll contact terminal
    const terminalBody = document.getElementById('contact-terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Reset form fields
  contactForm.reset();
  btnTransmit.disabled = false;
  btnTransmit.querySelector('.btn-text').textContent = "EMIT DATA STREAM";
});


/* ==========================================================================
   QUICK CLIPBOARD COPY UTILS
   ========================================================================== */
const copyCards = document.querySelectorAll('.copy-card:not(.no-copy)');
const toast = document.getElementById('toast-notification');

copyCards.forEach(card => {
  card.addEventListener('click', () => {
    const textToCopy = card.getAttribute('data-copy');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Trigger toast
      toast.innerText = `Copied to clipboard: ${textToCopy}`;
      toast.classList.add('active');
      
      setTimeout(() => {
        toast.classList.remove('active');
      }, 2500);
    });
  });
});


/* ==========================================================================
   RESPONSIVE LAYOUT DRAWER
   ========================================================================== */
const navToggle = document.querySelector('.nav-toggle');
const floatingNav = document.querySelector('.floating-nav');
const mobileLinks = document.querySelectorAll('.floating-nav .nav-links a');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  floatingNav.classList.toggle('mobile-active');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    floatingNav.classList.remove('mobile-active');
  });
});

/* ==========================================================================
   SPORTS ATTRIBUTE DYNAMIC DESCRIPTOR
   ========================================================================== */
const sportItems = document.querySelectorAll('.sport-item');
const sportDescPanel = document.getElementById('sport-desc-panel');
const defaultSportText = "Hover over a sport to view team dynamic attributes.";

if (sportItems.length > 0 && sportDescPanel) {
  sportItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const desc = item.getAttribute('data-desc');
      sportDescPanel.textContent = desc;
      sportDescPanel.style.color = "var(--accent-cyan)";
      sportDescPanel.style.borderColor = "rgba(0, 240, 255, 0.25)";
    });

    item.addEventListener('mouseleave', () => {
      sportDescPanel.textContent = defaultSportText;
      sportDescPanel.style.color = "var(--text-muted)";
      sportDescPanel.style.borderColor = "rgba(255, 255, 255, 0.06)";
    });
  });
}

/* ==========================================================================
   ROTARACT TABS SWITCHER
   ========================================================================== */
const rotaractTabBtns = document.querySelectorAll('.rotaract-tab-btn');
const rotaractTabContents = document.querySelectorAll('.rotaract-tab-content');

if (rotaractTabBtns.length > 0) {
  rotaractTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all buttons & contents
      rotaractTabBtns.forEach(b => b.classList.remove('active'));
      rotaractTabContents.forEach(c => c.classList.remove('active'));
      
      // Activate clicked
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(`tab-${tabId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}


/* ==========================================================================
   ADVANCED HOLOGRAM 3D CARD TILT DYNAMICS
   ========================================================================== */
const hologramCard = document.querySelector('.hologram-card');

if (hologramCard) {
  hologramCard.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 1024) {
      hologramCard.style.transform = 'none';
      return;
    }
    
    const cardRect = hologramCard.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    // Calculate cursor coordinates relative to card center
    const x = e.clientX - cardRect.left - cardWidth / 2;
    const y = e.clientY - cardRect.top - cardHeight / 2;
    
    // Calculate tilt angles (max 18 degrees)
    const rotateX = -(y / (cardHeight / 2)) * 18;
    const rotateY = (x / (cardWidth / 2)) * 18;
    
    hologramCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });
  
  hologramCard.style.transition = 'transform 0.1s ease';
  
  hologramCard.addEventListener('mouseleave', () => {
    hologramCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    hologramCard.style.transition = 'transform 0.5s ease';
  });
  
  hologramCard.addEventListener('mouseenter', () => {
    hologramCard.style.transition = 'transform 0.1s ease';
  });
}


/* ==========================================================================
   ABOUT PROFILE DUAL LAYER SCROLL PARALLAX
   ========================================================================== */
const profileFrame = document.getElementById('profile-frame');
const layerBack = document.querySelector('.layer-back');
const layerFront = document.querySelector('.layer-front');

if (profileFrame && layerBack && layerFront) {
  window.addEventListener('scroll', () => {
    const frameRect = profileFrame.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if the about profile frame is in the viewport
    if (frameRect.top < windowHeight && frameRect.bottom > 0) {
      // Calculate scroll progress percentage
      const totalDist = windowHeight + frameRect.height;
      const progress = (windowHeight - frameRect.top) / totalDist;
      
      // Horizontal translation bounds: back layer moves left, front layer moves right
      const maxOffset = 30; // pixels
      const backOffset = (progress - 0.5) * -maxOffset;
      const frontOffset = (progress - 0.5) * maxOffset;
      
      layerBack.style.transform = `translateX(${backOffset}px) scale(1.05)`;
      layerFront.style.transform = `translateX(${frontOffset}px) scale(1.02)`;
    }
  });
}
