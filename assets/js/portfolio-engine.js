/**
 * B1TW1Z PORTFOLIO DYNAMIC RENDERING ENGINE
 * ============================================
 * 
 * Houses the layout logic to compile window.portfolioData into
 * the broadsheet templates inside index.html. Handles active cursors,
 * scrolls, dark-mode themes, and API telemetry logs.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Anti-Clickjacking Frame-Busting Security Layer
  if (window.top !== window.self) {
    window.top.location.replace(window.self.location.href);
  }

  const data = window.portfolioData;
  if (!data) {
    console.error("Critical: portfolio-data.js did not load correctly or is missing.");
    return;
  }

  // --- Increment local secure session visits ---
  let visits = parseInt(localStorage.getItem("b1tw1z_visits") || "0") + 1;
  localStorage.setItem("b1tw1z_visits", visits);

  let token = localStorage.getItem("b1tw1z_session");
  if (!token) {
    token = "b1t_" + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    localStorage.setItem("b1tw1z_session", token);
  }

  // Log Security Protocol Warnings to DevTools Console
  console.log(
    "%cSECURITY PROTOCOL ACTIVE",
    "color: #e04416; font-size: 18px; font-weight: bold; font-family: monospace;"
  );
  console.log(
    `%cSession initialized: ${token}\nVisits: ${visits}\nAnti-Clickjacking Framebuster: ACTIVE\nXSS Input Filter: COMPLIANT\nUnauthorized injections are logged and monitored.\n\n[ACCESS_POINT]: Type 'system_override()' here to decrypt restricted operations files.`,
    "color: #8a8880; font-size: 11px; font-family: monospace; line-height: 1.5;"
  );

  // --- Initialize GTM & SEO ---
  initializeSEOAndAnalytics(data);

  // --- Initialize Layout Theme ---
  initializeTheme(data);

  // --- Hydrate Broadsheet Components ---
  hydrateNavigation(data);
  hydrateMastheadAndHero(data);
  hydrateDossier(data);
  hydrateEducation(data);
  hydrateCredentials(data);
  hydrateProjects(data);
  hydrateExperience(data);
  hydrateArsenal(data);
  hydrateResearch(data);
  hydrateCodingStats(data);
  hydrateTestimonials(data);
  hydrateDeadDrop(data);

  // --- Micro-interactions & Mouse Handlers ---
  initializeCursor();
  initializeScrollspy();
  initializeRedactedHandlers();
});

// ============================================
// Core Hydration Handlers
// ============================================

function initializeSEOAndAnalytics(data) {
  // Title and basic SEO
  document.title = `${data.personal.name} (${data.personal.handle.toLowerCase()}) // Cybersecurity`;
  const canonicalNode = document.querySelector('link[rel="canonical"]');
  if (canonicalNode) canonicalNode.setAttribute("href", data.config.canonicalUrl);

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", `${data.personal.name} (${data.personal.handle}) — Cyber Security Researcher & Low-Level Systems Builder portfolio. Explore low-level compilers, BitTorrent networks, honeypots, and ML intrusion detection models.`);
  }

  // Inject Google Tag Manager dynamically if configured
  if (data.config.gtmId) {
    const gtmScript = document.getElementById("gtmScript");
    if (gtmScript) {
      gtmScript.textContent = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${data.config.gtmId}');
      `;
    }
    const gtmNoscript = document.getElementById("gtmNoscript");
    if (gtmNoscript) {
      gtmNoscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${data.config.gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
    }
  }
}

function initializeTheme(data) {
  const toggleContainer = document.getElementById("themeToggleContainer");
  if (!data.config.showThemeToggle || !toggleContainer) return;

  // Retrieve saved preference or default from config
  const savedTheme = localStorage.getItem("b1tw1z-theme") || data.config.theme;
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Build the Neobrutalist tactile theme button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "theme-toggle-btn cursor-hover";
  toggleBtn.id = "themeToggleBtn";
  updateThemeButtonLabel(toggleBtn, savedTheme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("b1tw1z-theme", nextTheme);
    updateThemeButtonLabel(toggleBtn, nextTheme);

    // Update LinkedIn Badge Theme dynamically if present
    const badge = document.querySelector(".LI-profile-badge");
    if (badge) {
      badge.removeAttribute("data-rendered");
      badge.removeAttribute("data-uid");
      badge.setAttribute("data-theme", nextTheme);
      badge.innerHTML = getLinkedInFallbackHTML();
      observeLinkedInBadge(badge);
      if (window.LIRenderAll) {
        window.LIRenderAll();
      }
    }
  });

  toggleContainer.appendChild(toggleBtn);
}

function observeLinkedInBadge(badge) {
  if (!badge) return;
  const existingIframe = badge.querySelector("iframe");
  const existingFallback = badge.querySelector(".linkedin-custom-badge");
  if (existingIframe && existingFallback) {
    existingFallback.style.display = "none";
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        const iframe = mutation.target.querySelector("iframe");
        const fallback = mutation.target.querySelector(".linkedin-custom-badge");
        if (iframe && fallback) {
          fallback.style.display = "none";
        }
      }
    });
  });
  observer.observe(badge, { childList: true });
}

function getLinkedInFallbackHTML() {
  return `
    <!-- Custom Retro-Neobrutalist LinkedIn Badge -->
    <div class="linkedin-custom-badge" style="display: flex; flex-direction: column; width: 100%; height: 100%; padding: 18px; font-family: var(--font-mono); font-size: 11px; line-height: 1.5; color: var(--ink); box-sizing: border-box; justify-content: space-between;">
      
      <!-- Top Row: Avatar and Identity -->
      <div style="display: flex; gap: 14px; align-items: center; border-bottom: 1px dashed var(--ink); padding-bottom: 12px; margin-bottom: 10px; width: 100%;">
        <div style="width: 50px; height: 50px; border: var(--border-width) solid var(--ink); overflow: hidden; background-color: var(--cream); flex-shrink: 0;">
          <img src="assets/image.png" alt="Abhinav Patel" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.2);">
        </div>
        <div style="flex-grow: 1;">
          <div style="font-family: var(--font-display); font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.2;">Abhinav Patel</div>
          <div style="font-size: 9px; color: var(--red); font-weight: bold; margin-top: 2px;">in/abhinav-io</div>
          <div style="font-size: 8px; opacity: 0.7; margin-top: 1px;">OFFLINE DOSSIER</div>
        </div>
      </div>

      <!-- Middle Section: Meta Info -->
      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 6px; margin-bottom: 10px; width: 100%;">
        <div style="text-align: left;"><span style="color: var(--red); font-weight: bold; margin-right: 6px;">[ROLE]</span> Cybersecurity Intern & Systems SDE</div>
        <div style="text-align: left;"><span style="color: var(--red); font-weight: bold; margin-right: 6px;">[CORP]</span> Indian Space Research Organisation (ISRO)</div>
        <div style="text-align: left;"><span style="color: var(--red); font-weight: bold; margin-right: 6px;">[ALMA]</span> UPES Dehradun (CS & Forensics)</div>
      </div>

      <!-- Bottom Row: Status bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 8px; border-top: 1px solid var(--ink); padding-top: 8px; opacity: 0.8; width: 100%;">
        <div>FALLBACK CHANNEL: ACTIVE</div>
        <div style="color: var(--red); font-weight: bold; animation: blink 1.5s step-start infinite;">● ESTABLISH_CONN</div>
      </div>

    </div>
  `;
}

function updateThemeButtonLabel(btn, theme) {
  btn.textContent = theme === "dark" ? "[ LIGHT THEME ]" : "[ DARK THEME ]";
}

function hydrateNavigation(data) {
  const navLinks = document.getElementById("navLinks");
  const navLogo = document.getElementById("navLogo");
  if (!navLinks) return;

  if (navLogo) navLogo.textContent = data.personal.handle;

  // Build minimal nav anchors dynamically
  const menuItems = [
    { label: "/about", target: "section-about" },
    { label: "/academic", target: "section-education" },
    { label: "/credentials", target: "section-credentials" },
    { label: "/projects", target: "section-projects" },
    { label: "/logs", target: "section-experience" },
    { label: "/arsenal", target: "section-arsenal" },
    { label: "/research", target: "section-research" },
    { label: "/telemetry", target: "section-stats" },
    { label: "/dead drop", target: "section-contact" }
  ];

  menuItems.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${item.target}`;
    a.className = "cursor-hover";
    a.textContent = item.label;

    // Smooth scrolling
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const targetNode = document.getElementById(item.target);
      if (targetNode) {
        window.scrollTo({
          top: targetNode.offsetTop - 70, // Offsets sticky header boundary
          behavior: "smooth"
        });
      }
    });

    li.appendChild(a);
    navLinks.appendChild(li);
  });

  // Append premium Neobrutalist Resume download link to the sticky nav
  if (data.resume && data.resume.pdfLink) {
    const resumeLi = document.createElement("li");
    const resumeA = document.createElement("a");
    resumeA.href = data.resume.pdfLink;
    resumeA.download = data.resume.filename || "Abhinav_Patel_Resume.pdf";
    resumeA.className = "nav-resume-btn cursor-hover";
    resumeA.innerHTML = `<i class="ri-download-fill"></i> RESUME`;
    resumeLi.appendChild(resumeA);
    navLinks.appendChild(resumeLi);
  }
}

function hydrateMastheadAndHero(data) {
  const mlLogo = document.getElementById("mastheadLogo");
  const mlSub = document.getElementById("mastheadSub");
  const dateline = document.getElementById("datelineStrip");
  const lede = document.getElementById("heroLede");
  const bio = document.getElementById("heroBio");
  const stats = document.getElementById("heroStatsBox");
  const indexList = document.getElementById("heroIndexList");
  const ticker = document.getElementById("tickerTape");

  if (mlLogo) mlLogo.textContent = data.personal.name;
  if (mlSub) {
    const year = new Date().getFullYear();
    mlSub.textContent = data.personal.mastheadSub || `OFFENSIVE SECURITY & SYSTEMS JOURNAL · SHADOW INTEL DISPATCHES · EST. ${year}`;
  }

  // Compile Dynamic Dateline
  if (dateline) {
    dateline.innerHTML = `
      <span>TRANSMISSION: SECURE SOCKET LAYER</span>
      <span>CLASSIFICATION: LEVEL-5 DECLASSIFIED</span>
      <span>DISPATCH KEY: B1TW1Z_1337</span>
    `;
  }

  if (lede) lede.innerHTML = `"${data.personal.tagline}"`;

  // Hydrate Bio Column
  if (bio) {
    bio.innerHTML = `
      <p><span class="hero-bio-lead-in">W</span>elcome to my incident report file. I construct low-level compilation pipelines, map custom network protocol traps, and analyze digital anomalies. The systems displayed represent physical outcomes of logic built to execute without compromise.</p>
      <p>I operate at the intersection of security research and systems engineering, specializing in Rust and Python execution. Every dispatch item in this log is backed by functional code in local workspaces. Take a look at the dossiers below.</p>
    `;
  }

  // Hydrate Stat Items
  if (stats) {
    stats.innerHTML = "";
    data.personal.quickStats.forEach(stat => {
      const item = document.createElement("div");
      item.className = "hero-stat-item";
      item.innerHTML = `
        <div class="hero-stat-value">${stat.value}</div>
        <div class="hero-stat-label">${stat.label}</div>
      `;
      stats.appendChild(item);
    });
  }

  // Hydrate Index listings
  if (indexList) {
    indexList.innerHTML = "";
    const indexAnchors = [
      { num: "01", label: "SUBJECT DOSSIER", target: "section-about" },
      { num: "02", label: "ACADEMIC RECORDS", target: "section-education" },
      { num: "03", label: "CREDENTIALS & OPERATIONS", target: "section-credentials" },
      { num: "04", label: "FIELD REPORTS (PROJECTS)", target: "section-projects" },
      { num: "05", label: "SERVICE RECORD (LOGS)", target: "section-experience" },
      { num: "06", label: "THE ARSENAL (SKILLS)", target: "section-arsenal" },
      { num: "07", label: "RESEARCH DISPATCHES", target: "section-research" },
      { num: "08", label: "LIVE API INTEL", target: "section-stats" },
      { num: "09", label: "SECURE DEAD DROP", target: "section-contact" }
    ];
    indexAnchors.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span style="font-family:var(--font-display);color:var(--red);font-size:16px;">${item.num}</span>
        <a href="#${item.target}" class="cursor-hover">${item.label}</a>
      `;
      // Scroll handling for index anchors
      li.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        const targetNode = document.getElementById(item.target);
        if (targetNode) {
          window.scrollTo({
            top: targetNode.offsetTop - 70,
            behavior: "smooth"
          });
        }
      });
      indexList.appendChild(li);
    });
  }

  // Ticker Tape Scrolling list (duplicates list elements to form smooth endless loops)
  if (ticker) {
    ticker.innerHTML = "";
    const repeated = [...data.marqueeTicker, ...data.marqueeTicker];
    repeated.forEach(item => {
      const span = document.createElement("span");
      span.className = "ticker-item";
      span.textContent = item;
      ticker.appendChild(span);
    });
  }
}

function hydrateDossier(data) {
  const dImage = document.getElementById("dossierMugshot");
  const dStamp = document.getElementById("dossierStamp");
  const dRows = document.getElementById("dossierRows");
  const dRedacted = document.getElementById("dossierRedactedBox");

  if (dImage) dImage.src = data.personal.avatar;
  if (dStamp) {
    dStamp.textContent = data.dossier.stamp;
    // Set color based on value
    if (data.dossier.stamp.toUpperCase() === "TOP SECRET") {
      dStamp.style.borderColor = "var(--red)";
      dStamp.style.color = "var(--red)";
    }
  }

  // Hydrate fields key-values
  if (dRows) {
    dRows.innerHTML = "";
    data.dossier.fields.forEach(field => {
      const row = document.createElement("div");
      row.className = "dossier-row";
      row.innerHTML = `
        <div class="dossier-key">${field.key}</div>
        <div class="dossier-val">${field.val}</div>
      `;
      dRows.appendChild(row);
    });
  }

  // Redacted details hover reveal interaction
  if (dRedacted) {
    // Generate text where specific words or portions are redacted in black tags
    dRedacted.innerHTML = `
      <strong>ADDENDUM REPORT:</strong> <br>
      Subject has completed multi-service honeypot simulations and compiled x86 pipelines. 
      Active threat records show <span class="redacted-text cursor-hover">NO SECURITY EXPLOIT SEVERITIES DETECTED</span>. 
      Education logged at <span class="redacted-text cursor-hover">UPES DEHRADUN, DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</span>. 
      Timeline coordinates verified. <br>
      <span style="color:var(--red)">WARNING:</span> ${data.dossier.redactedNote}
    `;
  }
}

function hydrateEducation(data) {
  const layout = document.getElementById("educationLayout");
  if (!layout || !data.education) return;

  const edu = data.education;
  const bulletsHTML = edu.bullets.map(b => `<li>${b}</li>`).join("");

  layout.innerHTML = `
    <div class="library-card">
      <div class="library-card-header">
        <span>CARD CATALOG NO: CSE-CSF-2027</span>
        <span>LOCATION: ${edu.institution}</span>
        <span>INDEX REF: ${edu.timeline}</span>
      </div>
      <div class="library-card-stamp">CYBER FORENSICS DEPT</div>
      <h3 class="library-card-title">${edu.institution}</h3>
      <div class="library-card-degree">${edu.degree}</div>
      <ul class="library-card-bullets">
        ${bulletsHTML}
      </ul>
    </div>
  `;
}

function hydrateCredentials(data) {
  const certsGrid = document.getElementById("certsGrid");
  const ctfMonitor = document.getElementById("ctfMonitor");

  // Hydrate Certifications
  if (certsGrid && data.certifications) {
    certsGrid.innerHTML = "";
    data.certifications.forEach(cert => {
      const card = document.createElement("div");
      card.className = "cert-card";
      card.innerHTML = `
        <div>
          <div class="cert-card-header">
            <span>${cert.issuer}</span>
            <span>${cert.dateString}</span>
          </div>
          <h3 class="cert-title">${cert.title}</h3>
          <div class="cert-meta">CREDENTIAL ID: <code style="color:var(--red); font-weight:bold;">${cert.credentialId}</code></div>
        </div>
        <a href="${cert.verifyUrl}" target="_blank" class="cert-verify-btn cursor-hover">VERIFY CREDENTIAL ↗</a>
      `;
      certsGrid.appendChild(card);
    });
  }

  // Hydrate CTF Operations Monitor
  if (ctfMonitor && data.ctfLogs) {
    const ctf = data.ctfLogs;

    // Format wargames competitive events
    const eventsHTML = ctf.competitiveEvents.map(ev => `
      <div class="crt-line">
        <span class="crt-green-badge">OPERATION</span>
        <span>${ev.name} — <strong class="crt-glow-text">${ev.rank}</strong></span>
      </div>
    `).join("");

    ctfMonitor.innerHTML = `
      <div class="crt-header">
        <span>TELETYPE_OPERATIONS_LOG</span>
        <span>DISPATCH // TELEPRINTER</span>
      </div>
      <div class="crt-line" style="margin-bottom: 14px;">
        <span>OPERATOR COORDINATES: <strong class="crt-glow-text">@${ctf.handle}</strong></span>
      </div>
      
      <div class="crt-line">
        <span class="crt-green-badge">PLATFORM</span>
        <span class="crt-wargame-title"><a href="${ctf.tryHackMe.profileUrl}" target="_blank" style="color: inherit; text-decoration: underline;" class="cursor-hover">TryHackMe</a></span>
      </div>
      <div class="crt-line" style="padding-left: 16px;">
        <span>RANK: <strong class="crt-glow-text">${ctf.tryHackMe.rank}</strong> // STATUS: <strong>${ctf.tryHackMe.badge}</strong> // SOLVED: <strong>${ctf.tryHackMe.solvedCount}</strong></span>
      </div>
      
      <div class="crt-line" style="margin-top: 12px;">
        <span class="crt-green-badge">PLATFORM</span>
        <span class="crt-wargame-title"><a href="${ctf.cyLabAcademy.profileUrl}" target="_blank" style="color: inherit; text-decoration: underline;" class="cursor-hover">CyLab Academy</a></span>
      </div>
      <div class="crt-line" style="padding-left: 16px; margin-bottom: 16px;">
        <span>RANK: <strong class="crt-glow-text">${ctf.cyLabAcademy.rank}</strong> // STATUS: <strong>${ctf.cyLabAcademy.status}</strong> // USER: <strong>abhinav327</strong></span>
      </div>

      <div style="border-top:1px dashed var(--ink); margin:12px 0 10px 0; opacity:0.35;"></div>
      
      ${eventsHTML}
      
      <div style="margin-top: 16px; font-size: 9px; opacity: 0.7; text-align: center; color: var(--red); animation: blink 1.5s step-start infinite;">
        &gt;&gt; TELEPRINTER_ONLINE // AWAITING_LOG_STREAM_
      </div>
    `;
  }
}

function hydrateProjects(data) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  // Scramble Decrypt Matrix micro-interaction (Snappy & stabilized to completely prevent layout jitter/shakes)
  function scrambleDecryptEffect(element, originalText) {
    if (element.isDecrypting) return; // Prevent interval spamming when cursor moves inside the card
    element.isDecrypting = true;

    const chars = "0101010101XX%&?#_@[]+=<>";
    let iteration = 0;
    clearInterval(element.scrambleInterval);

    element.scrambleInterval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((char, index) => {
          // Preserve spaces exactly so word boundaries and line-wrapping remain constant,
          // which mathematically stabilizes the height of the element and stops hover shaking/jitter.
          if (char === " ") {
            return " ";
          }
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(element.scrambleInterval);
        element.innerText = originalText; // Guarantee perfect clean restore of the original text
        element.isDecrypting = false; // Reset security state guard
      }
      iteration += 2.5; // Snapshot decryption over 15-20 quick, high-performance frames
    }, 30);
  }

  grid.innerHTML = "";
  data.projects.forEach((proj, idx) => {
    const card = document.createElement("article");
    const isTopSecret = proj.classification.toUpperCase() === "TOP SECRET";
    
    // Showcase top 6 by default, hide the rest
    const isHiddenByDefault = idx >= 6;
    card.className = `project-card ${isTopSecret ? 'top-secret' : ''} ${isHiddenByDefault ? 'hidden-project' : ''}`;

    const tagsHTML = proj.tags.map(t => `<span class="project-tag">${t}</span>`).join("");

    card.innerHTML = `
      <div>
        <div class="project-meta-strip">
          <span>${proj.reportingNo}</span>
          <span class="project-meta-class">${proj.classification}</span>
        </div>
        <h3 class="project-title" data-original="${proj.title}">${proj.title}</h3>
        <div class="project-oneliner">"${proj.oneLiner}"</div>
        <p class="project-desc">${proj.description}</p>
      </div>
      <div>
        <div class="project-tags">
          ${tagsHTML}
        </div>
        <a href="${proj.viewSource}" target="_blank" class="project-cta cursor-hover">EXHIBIT CODEBASE ↗</a>
      </div>
    `;

    // Attach scramble event listener
    const titleEl = card.querySelector(".project-title");
    card.addEventListener("mouseenter", () => {
      scrambleDecryptEffect(titleEl, proj.title);
    });

    grid.appendChild(card);
  });

  // Handle See More Toggle Button
  const seeMoreBtn = document.getElementById("seeMoreProjectsBtn");
  const seeMoreWrap = seeMoreBtn ? seeMoreBtn.parentElement : null;

  if (seeMoreBtn && seeMoreWrap) {
    if (data.projects.length <= 6) {
      seeMoreWrap.style.display = "none";
    } else {
      seeMoreWrap.style.display = "block";
      
      // Clear any previous event listeners by cloning
      const newBtn = seeMoreBtn.cloneNode(true);
      seeMoreBtn.parentNode.replaceChild(newBtn, seeMoreBtn);

      let expanded = false;
      newBtn.addEventListener("click", () => {
        expanded = !expanded;
        const hiddenCards = grid.querySelectorAll(".project-card");
        
        hiddenCards.forEach((card, idx) => {
          if (idx >= 6) {
            if (expanded) {
              card.classList.remove("hidden-project");
              // Micro-animation reveal
              card.style.opacity = "0";
              card.style.transform = "translateY(15px)";
              setTimeout(() => {
                card.style.transition = "opacity 0.25s ease-out, transform 0.25s ease-out, box-shadow 80ms ease-out";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, (idx - 6) * 50);
            } else {
              card.classList.add("hidden-project");
            }
          }
        });

        if (expanded) {
          newBtn.textContent = "ENCRYPT RECORDS [▲]";
        } else {
          newBtn.textContent = "DECRYPT EXTENDED RECORDS [▼]";
          // Smooth scroll back to section header
          const sectionHeader = document.getElementById("section-projects");
          if (sectionHeader) {
            window.scrollTo({
              top: sectionHeader.offsetTop - 70,
              behavior: "smooth"
            });
          }
        }
      });
    }
  }
}

function hydrateExperience(data) {
  const timeline = document.getElementById("experienceTimeline");
  if (!timeline) return;

  timeline.innerHTML = "";
  data.experience.forEach(exp => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    const bulletsHTML = exp.bullets.map(b => `<li>${b}</li>`).join("");
    const tagsHTML = exp.tags.map(t => `<span class="timeline-tag">${t}</span>`).join("");

    item.innerHTML = `
      <div class="timeline-tick"></div>
      <div class="timeline-date">${exp.year}</div>
      <h3 class="timeline-header">${exp.company}</h3>
      <div class="timeline-role">${exp.role}</div>
      <ul class="timeline-bullets">
        ${bulletsHTML}
      </ul>
      <div class="timeline-tags">
        ${tagsHTML}
      </div>
    `;
    timeline.appendChild(item);
  });
}

function hydrateArsenal(data) {
  const categoriesNode = document.getElementById("arsenalCategories");
  const methodNode = document.getElementById("arsenalMethodBox");

  if (categoriesNode) {
    categoriesNode.innerHTML = "";
    data.arsenal.categories.forEach(cat => {
      const catBox = document.createElement("div");

      const tagsHTML = cat.skills.map(skill => `<span class="arsenal-tag cursor-hover">${skill}</span>`).join("");

      catBox.innerHTML = `
        <h3 class="arsenal-cat-title">${cat.name}</h3>
        <div class="arsenal-cloud">
          ${tagsHTML}
        </div>
        <div style="height: 16px;"></div>
      `;
      categoriesNode.appendChild(catBox);
    });
  }

  if (methodNode) {
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    methodNode.innerHTML = `
      <div class="method-letter">
        <div class="method-letter-header">
          <div class="letter-meta-row"><strong>CLASSIFICATION:</strong> LEVEL 5 // THREAT INTEL SYSTEM REPORT</div>
          <div class="letter-meta-row"><strong>DATE:</strong> ${dateStr}</div>
          <div class="letter-meta-row"><strong>FROM:</strong> Abhinav Patel (B1TW1Z)</div>
          <div class="letter-meta-row"><strong>TO:</strong> RECRUITING LEAD // SYSTEMS AUDITOR // DEAR READER</div>
        </div>
        <div class="method-letter-rule"></div>
        <div class="method-letter-salutation">DEAR RECRUITING OFFICER,</div>
        <div class="method-letter-body">
          <p>${data.arsenal.methodStatement}</p>
        </div>
        <div class="method-letter-closing">
          <p>SINCERELY SUBMITTED,</p>
          <div class="method-letter-signature">B1TW1Z</div>
        </div>
        <div style="margin-top: 32px; text-align: center;">
          <a href="${data.resume.pdfLink}" download class="stats-cta-btn cursor-hover" style="display:inline-block; font-size:11px;">
            <i class="ri-download-fill" style="margin-right: 6px;"></i> DOWNLOAD COMPLETE RESUME (PDF)
          </a>
        </div>
      </div>
    `;
  }
}

function hydrateResearch(data) {
  const layout = document.getElementById("researchLayout");
  if (!layout) return;

  layout.innerHTML = "";
  data.research.forEach(paper => {
    const entry = document.createElement("div");
    entry.className = "research-entry";

    const tagsHTML = paper.tags.map(t => `<span class="research-tag">${t}</span>`).join("");

    entry.innerHTML = `
      <div class="research-vol">${paper.volIssue}</div>
      <h3 class="research-title">${paper.title}</h3>
      <div class="research-byline">${paper.byline}</div>
      <p class="research-abstract"><strong>ABSTRACT:</strong> ${paper.abstract}</p>
      <div class="research-tags">${tagsHTML}</div>
      <a href="${paper.url}" target="_blank" class="project-cta cursor-hover">REQUEST FULL DISPATCH ↗</a>
    `;
    layout.appendChild(entry);
  });
}

function hydrateCodingStats(data) {
  const layout = document.getElementById("statsLayout");
  if (!layout) return;

  const ghUsername = data.personal.socials.github.split("/").pop();
  const lcUsername = data.personal.socials.leetcode.split("/").pop() || "b1tw1z";

  const savedTheme = localStorage.getItem("b1tw1z-theme") || data.config.theme;

  layout.innerHTML = `
    <!-- GITHUB PROFILE STATS -->
    <div class="stats-card">
      <div class="stats-card-header">
        <i class="ri-github-fill stats-card-icon"></i>
        <h3 class="stats-card-title">GitHub Telemetry</h3>
      </div>
      
      <div class="stats-data-grid">
        <div class="stat-metric-box">
          <div class="stat-metric-label">Repositories</div>
          <div class="stat-metric-val" id="gh-repos">--</div>
        </div>
        <div class="stat-metric-box">
          <div class="stat-metric-label">Followers</div>
          <div class="stat-metric-val" id="gh-followers">--</div>
        </div>
      </div>

      <div class="stats-visual-box">
        <img src="https://ghchart.rshah.org/d4380d/${ghUsername}" alt="GitHub Contribution Matrix" class="stats-visual-img" id="gh-matrix-chart">
      </div>

      <div class="stats-card-footer">
        <span class="stats-cli-prompt">gh --telemetry</span>
        <a href="${data.personal.socials.github}" target="_blank" class="stats-cta-btn cursor-hover">Open Channel ↗</a>
      </div>
    </div>

    <!-- LEETCODE PROFILE STATS -->
    <div class="stats-card">
      <div class="stats-card-header">
        <i class="ri-code-box-fill stats-card-icon"></i>
        <h3 class="stats-card-title">LeetCode Logs</h3>
      </div>

      <div class="stats-visual-box" style="flex: 1; min-height: 160px; margin-bottom: 20px;">
        <img src="https://leetcard.jacoblin.cool/${lcUsername}?theme=transparent&font=Battambang&ext=heatmap" alt="LeetCode Solve Statistics" class="stats-visual-img" style="max-height: 140px; object-fit: contain;">
      </div>

      <div class="stats-card-footer" style="margin-top: auto;">
        <span class="stats-cli-prompt">leetcode --profile</span>
        <a href="${data.personal.socials.leetcode}" target="_blank" class="stats-cta-btn cursor-hover">Open Channel ↗</a>
      </div>
    </div>

    <!-- LINKEDIN PROFILE BADGE -->
    <div class="stats-card">
      <div class="stats-card-header">
        <i class="ri-linkedin-box-fill stats-card-icon"></i>
        <h3 class="stats-card-title">LinkedIn Dispatch</h3>
      </div>
      
      <div class="stats-visual-box" style="flex: 1; min-height: 290px; margin-bottom: 20px; display: flex; justify-content: center; align-items: center; background-color: var(--paper); border: var(--border-width) solid var(--ink); overflow: hidden;">
        <!-- LinkedIn Badge Container -->
        <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="${savedTheme}" data-type="VERTICAL" data-vanity="abhinav-io" data-version="v1" style="transform: scale(0.95); transform-origin: center; width: 100%; height: 100%;">
          ${getLinkedInFallbackHTML()}
        </div>
      </div>

      <div class="stats-card-footer" style="margin-top: auto;">
        <span class="stats-cli-prompt">linkedin --connect</span>
        <a href="${data.personal.socials.linkedin}" target="_blank" class="stats-cta-btn cursor-hover">Open Channel ↗</a>
      </div>
    </div>
  `;

  // Trigger rendering if LinkedIn script is already active
  const badge = document.querySelector(".LI-profile-badge");
  observeLinkedInBadge(badge);

  if (window.LIRenderAll) {
    window.LIRenderAll();
  }

  // Dynamic API Fetch details for GitHub
  fetchGitHubTelemetry(ghUsername);
}

async function fetchGitHubTelemetry(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("HTTP connection failed");
    const resData = await response.json();

    const reposNode = document.getElementById("gh-repos");
    const followersNode = document.getElementById("gh-followers");

    if (reposNode) reposNode.textContent = resData.public_repos ?? "0";
    if (followersNode) followersNode.textContent = resData.followers ?? "0";
  } catch (error) {
    console.error("Telemetry channel failed to pull active logs:", error);
    const reposNode = document.getElementById("gh-repos");
    const followersNode = document.getElementById("gh-followers");
    if (reposNode) reposNode.textContent = "ERR";
    if (followersNode) followersNode.textContent = "ERR";
  }
}

function hydrateTestimonials(data) {
  const marquee = document.getElementById("testimonialsMarquee");
  if (!marquee) return;

  marquee.innerHTML = "";
  // Duplicate array objects to generate smooth seamless marquee loops
  const repeated = [...data.testimonials, ...data.testimonials];

  repeated.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "testimonial-log-card";

    // Rating star counts
    const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);

    card.innerHTML = `
      <div class="tlog-header">
        <span>${item.filename}</span>
        <span>INDEX #${index.toString().padStart(3, '0')}</span>
      </div>
      <div class="tlog-from">FROM: ${item.from}</div>
      <p class="tlog-quote">"${item.quote}"</p>
      <div class="tlog-rating">${stars}</div>
    `;
    marquee.appendChild(card);
  });
}

function hydrateDeadDrop(data) {
  const info = document.getElementById("deaddropInfo");
  if (!info) return;

  info.innerHTML = `
    <h3>Secure Dead Drop</h3>
    <p>Transmit encrypted queries, project requests, or security audit coordinates safely. All channels logged on secure off-grid coordinates. Communications are strictly monitored.</p>
    <div class="deaddrop-channels">
      <div class="deaddrop-channel-item">
        <div class="dd-icon-box"><i class="ri-mail-line"></i></div>
        <a href="mailto:${data.personal.email}" class="dd-link cursor-hover">${data.personal.email}</a>
      </div>
      <div class="deaddrop-channel-item">
        <div class="dd-icon-box"><i class="ri-github-line"></i></div>
        <a href="${data.personal.socials.github}" target="_blank" class="dd-link cursor-hover">b1tw1z</a>
      </div>
      <div class="deaddrop-channel-item">
        <div class="dd-icon-box"><i class="ri-linkedin-line"></i></div>
        <a href="${data.personal.socials.linkedin}" target="_blank" class="dd-link cursor-hover">Abhinav Patel</a>
      </div>
    </div>
  `;

  // Hydrate footer
  const footer = document.getElementById("broadsheetFooter");
  if (footer) {
    const year = new Date().getFullYear();
    const kofiLink = (data.personal.socials && data.personal.socials.kofi) || "https://ko-fi.com/b1tw1z";
    footer.innerHTML = `
      <div style="margin-bottom: 24px;">
        <a href="${kofiLink}" target="_blank" class="bmc-btn cursor-hover">
          <i class="ri-cup-fill" style="margin-right: 6px; color: var(--red);"></i> SUPPORT ON KO-FI
        </a>
      </div>
      <p>© ${year} ${data.personal.name} // ${data.personal.handle} // SYSTEM_TELEMETRY_CLOSED</p>
      <div style="font-size: 8px; margin-top: 8px; opacity: 0.5;">git init</div>
    `;
  }
}

// Dead Drop form transmission triggers
window.handleDeadDropSubmit = function (event) {
  event.preventDefault();
  const form = document.getElementById("deaddropForm");
  if (!form) return;

  const submitBtn = document.getElementById("ddSubmitBtn");
  if (submitBtn) {
    submitBtn.textContent = "TRANSMITTING DATA...";
    submitBtn.disabled = true;
  }

  // Convert FormData to structured JSON for maximum cross-origin compatibility
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // Send AJAX fetch request to Web3Forms
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: json
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        form.innerHTML = `
        <div style="padding: 40px 10px; text-align: center; color: var(--red); font-family: var(--font-mono);">
          <i class="ri-checkbox-circle-fill" style="font-size: 48px; display: block; margin-bottom: 12px;"></i>
          <h4 style="font-family: var(--font-display); font-size: 24px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Transmission Complete</h4>
          <p style="font-size: 11px; line-height: 1.5; color: var(--ink);">Data packet routed safely to dead-drop relays. Decryption will trigger at destination. Stand by for coordinates.</p>
        </div>
      `;
      } else {
        throw new Error(data.message || "Relay failure");
      }
    })
    .catch(error => {
      if (submitBtn) {
        submitBtn.textContent = "TRANSMISSION FAILED. RETRY?";
        submitBtn.disabled = false;
      }
      console.error("Secure transmission error:", error);
      alert("Secure transmission interrupted: " + error.message);
    });
};

// ============================================
// Micro-interactions & Special Effects
// ============================================

function initializeCursor() {
  const cursor = document.getElementById("customCursor");
  const hud = document.getElementById("cursorHud");
  if (!cursor) return;

  let currentAction = "";

  // Track cursor offsets
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    if (hud && !currentAction) {
      hud.textContent = `[X: ${String(e.clientX).padStart(4, '0')} // Y: ${String(e.clientY).padStart(4, '0')}]`;
    }
  });

  // Track hover enlargements dynamically
  document.addEventListener("mouseover", (e) => {
    let action = "";
    if (e.target.closest("a")) action = "NAVIGATE";
    else if (e.target.closest("button") || e.target.closest(".stats-cta-btn")) action = "EXECUTE";
    else if (e.target.closest(".redacted-text")) action = "DECRYPT";
    else if (e.target.closest(".project-card")) action = "EXHIBIT";
    else if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") action = "INPUT";

    if (action) {
      currentAction = action;
      if (hud) {
        hud.innerHTML = `<span style="font-weight:bold;">[ACT: ${action}]</span>`;
      }
      cursor.classList.add("active");
    }
  });

  document.addEventListener("mouseout", (e) => {
    let action = "";
    if (e.target.closest("a")) action = "NAVIGATE";
    else if (e.target.closest("button") || e.target.closest(".stats-cta-btn")) action = "EXECUTE";
    else if (e.target.closest(".redacted-text")) action = "DECRYPT";
    else if (e.target.closest(".project-card")) action = "EXHIBIT";
    else if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") action = "INPUT";

    if (action) {
      currentAction = "";
      cursor.classList.remove("active");
    }
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("clicking");
  });
  document.addEventListener("mouseup", () => {
    cursor.classList.remove("clicking");
  });
}

function initializeScrollspy() {
  const sections = [
    document.getElementById("section-about"),
    document.getElementById("section-education"),
    document.getElementById("section-credentials"),
    document.getElementById("section-projects"),
    document.getElementById("section-experience"),
    document.getElementById("section-arsenal"),
    document.getElementById("section-research"),
    document.getElementById("section-stats"),
    document.getElementById("section-contact")
  ].filter(Boolean);

  const navAnchors = document.querySelectorAll(".nav-links a");
  const morseNode = document.getElementById("morseCode");
  const bttContainer = document.getElementById("backToTopContainer");

  const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': ' '
  };

  function translateToMorse(text) {
    return text.toUpperCase().split('').map(char => morseMap[char] || '').join(' ');
  }

  window.addEventListener("scroll", () => {
    let activeSectionId = "";
    const scrollPos = window.scrollY + 120; // Triggers highlight slightly earlier

    // Toggle Back to Top Button visibility
    if (bttContainer) {
      if (window.scrollY > 500) {
        bttContainer.classList.add("visible");
      } else {
        bttContainer.classList.remove("visible");
      }
    }

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        activeSectionId = section.id;
      }
    });

    navAnchors.forEach(a => {
      const href = a.getAttribute("href").substring(1);
      if (href === activeSectionId) {
        a.classList.add("active");
        if (morseNode) {
          const sectionName = activeSectionId.replace("section-", "").toUpperCase();
          morseNode.textContent = translateToMorse(sectionName);
        }
      } else {
        a.classList.remove("active");
      }
    });
  });
}

window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

function initializeRedactedHandlers() {
  document.addEventListener("click", (e) => {
    const redacted = e.target.closest(".redacted-text");
    if (redacted) {
      redacted.classList.toggle("unredacted");
      return;
    }

    // Do not place physical ink stamps on interactive elements
    if (e.target.closest("a") || 
        e.target.closest("button") || 
        e.target.closest(".stats-cta-btn") || 
        e.target.closest(".theme-toggle-btn") || 
        e.target.tagName === "INPUT" || 
        e.target.tagName === "TEXTAREA") {
      return;
    }

    // Generate physical broadsheet ink stamp at coordinate click
    const stamp = document.createElement("div");
    stamp.className = "ink-stamp";
    const labels = ["DECLASSIFIED", "APPROVED", "SECURE", "ODIN_1337", "READ_ONLY"];
    const randomLabel = labels[Math.floor(Math.random() * labels.length)];
    stamp.textContent = randomLabel;

    // Slight random rotation between -12 and +12 degrees
    const rotation = Math.floor(Math.random() * 24) - 12;
    stamp.style.left = `${e.pageX}px`;
    stamp.style.top = `${e.pageY}px`;
    stamp.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(2.0)`;
    stamp.style.opacity = "0";

    document.body.appendChild(stamp);

    // Dynamic scale-down snap (simulating real mechanical stamping action)
    requestAnimationFrame(() => {
      stamp.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1.0)`;
      stamp.style.opacity = "0.7";
    });

    // Ink fade decay after 1.5s
    setTimeout(() => {
      stamp.style.opacity = "0";
      setTimeout(() => stamp.remove(), 500);
    }, 1500);
  });
}

window.system_override = function() {
  const isOverride = document.body.classList.toggle("matrix-override");
  
  if (isOverride) {
    console.log(
      "%c\n=========================================\n[!] SYSTEM OVERRIDE ACTIVE [!]\nACCESS LEVEL: LEVEL-6 (ARCHITECT)\n=========================================\n",
      "color: #00ff66; font-family: monospace; font-weight: bold; font-size: 13px;"
    );
    console.log(
      "%cDECRYPTING LEDGER RELAYS:\n> B1TW1Z_KEYLOADER_V2 ... DECRYPTED [100%]\n> ISRO_SECURE_PAYLOAD_MAP ... DECRYPTED [100%]\n> CLASSIFIED_DISPATCH_LEDGER_09 ... DECLASSIFIED [OK]\n\nRecruiter Dispatch:\n'Looking for a Systems & Security Engineer who can build compilers, secure low-level networks, and engineer premium UIs? You have successfully breached the dispatcher. Contact Abhinav at recontact@coordinates.com to initiate onboard protocol.'",
      "color: #a6ffa6; font-family: monospace; font-size: 11px; line-height: 1.5;"
    );
    alert("SYSTEM OVERRIDE DETECTED: DECLASSIFYING RESTRICTED ARCHIVES...");
  } else {
    console.log(
      "%c\n=========================================\n[-] OVERRIDE RETRACTED [-]\nACCESS LEVEL: STANDARD COMPLIANCE\n=========================================\n",
      "color: #e04416; font-family: monospace; font-weight: bold; font-size: 13px;"
    );
  }
  return "LEDGER_PROTOCOL_STATE_MUTATED";
};
