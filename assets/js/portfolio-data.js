/**
 * B1TW1Z PORTFOLIO DATA CONFIGURATION
 * ============================================
 * 
 * Edit this file to add, remove, or modify your portfolio details.
 * The layout will update automatically without breaking any styling.
 */

window.portfolioData = {
  config: {
    theme: "dark", // Default theme: "light" or "dark"
    showThemeToggle: true,
    gtmId: "GTM-KCQ2FL36",
    canonicalUrl: "https://abhinav.page/"
  },
  personal: {
    name: "Abhinav Patel",
    handle: "B1TW1Z",
    tagline: "Systems Developer, Backend Engineer & Security Researcher.",
    mastheadSub: "SYSTEMS ARCHITECTURE & OFFENSIVE SECURITY JOURNAL · CORE COMPILERS & THREAT INTEL DISPATCHES · EST. 2026",
    location: "Prayagraj, India",
    email: "upesabhinavpatel@gmail.com",
    avatar: "assets/image.png",
    socials: {
      github: "https://github.com/b1tw1z",
      linkedin: "https://www.linkedin.com/in/abhinav-io",
      leetcode: "https://leetcode.com/u/abhinav327",
      kofi: "https://ko-fi.com/b1tw1z"
    },
    quickStats: [
      { value: "140+", label: "THM LABS SOLVED" },
      { value: "03", label: "RESEARCH PAPERS" },
      { value: "14", label: "ENGINEERED PROJECTS" }
    ]
  },
  marqueeTicker: [
    "CYBER FORENSICS", "OFFENSIVE SECURITY", "REVERSE ENGINEERING", "SYSTEMS PROGRAMMING", "MALWARE ANALYSIS", "RUST",
    "PYTHON", "X86-64 ASSEMBLY", "ISC2 CC", "VAPT", "THREAT INTELLIGENCE", "INTRUSION DETECTION",
    "BLUE TEAMING", "RED TEAMING", "PORT SECURITY", "CRYPTOGRAPHY", "KERNEL MITIGATIONS", "DOCKER", "KUBERNETES"
  ],
  dossier: {
    title: "DOSSIER — SUBJECT: B1TW1Z",
    stamp: "DECLASSIFIED", // Red ink stamp overlay
    fields: [
      { key: "DESIGNATION", val: "Security Operations & Automation Intern & Systems Developer" },
      { key: "AFFILIATION", val: "UPES, Dehradun (Cyber Security & Forensics)" },
      { key: "SPECIALIZATION", val: "Offensive Security, ML Threat Detection, Network Engineering" },
      { key: "CURRENT STATUS", val: "Seeking Opportunities / Internships / SDE Roles" },
      { key: "CLEARANCE LEVEL", val: "LEVEL 5 (UNRESTRICTED LOCAL ACCESS)" }
    ],
    redactedNote: "REDACTED SECTION // SUBJECT HAS LOGGED ACTIVE CLEARANCE. ALL CLASSIFIED TRANSMISSIONS GO TO THE DEAD DROP UNDER CODES IN SECTION 09."
  },
  projects: [
    {
      id: "001",
      reportingNo: "REPORT #001 — PROTOCOLS & INTERFACES",
      dateString: "2026.05",
      classification: "TOP SECRET",
      title: "API Nexus: Benchmark Monorepo",
      oneLiner: "A premium Express-React playground testing 7 distinct API architectures.",
      description: "A universal monorepo mapping Express backends and React dashboard interfaces to implement and benchmark RESTful CRUD, GraphQL field projections, persistent WebSocket depth feeds, Server-Sent Events, Webhook receptors, legacy XML SOAP gateways, and binary serialized gRPC Web Protobufs. Renders dynamic live-updating SVG latency comparison bar graphs under concurrent test seeding.",
      tags: ["EXPRESS", "REACT", "WEBSOCKETS", "GRPC", "SSE", "SOAP", "GRAPHQL"],
      viewSource: "https://github.com/b1tw1z/API-Nexus"
    },
    {
      id: "002",
      reportingNo: "REPORT #002 — SYSTEMS & JIT COMPILERS",
      dateString: "2026.04",
      classification: "TOP SECRET",
      title: "x86-64 Brainfuck JIT Compiler",
      oneLiner: "A native machine-code executing compiler written from scratch in Rust.",
      description: "Translates esoteric source files into dynamic x86-64 native assembly instructions at execution time. Employs advanced lexing, tokenization, run-length collapsing optimizations, recursive loop AST nesting, and absolute address libc calls (putchar/getchar). Solves DEP/W^X security boundaries by utilizing raw memory page allocations via mmap/mprotect (Linux) and VirtualAlloc/VirtualProtect (Windows) followed by unsafe function pointer transmutes.",
      tags: ["RUST", "x86-64 ASSEMBLY", "COMPILERS", "MEMORY PROTECTION", "WINDOWS/LINUX"],
      viewSource: "https://github.com/b1tw1z/BF-JIT-COMPILER"
    },
    {
      id: "003",
      reportingNo: "REPORT #003 — ML & STRATEGY PREDICTORS",
      dateString: "2026.05",
      classification: "CONFIDENTIAL",
      title: "Pit Oracle: F1 Predictor Ensemble",
      oneLiner: "LightGBM × XGBoost × CatBoost stacking pipeline with 0.949+ AUC.",
      description: "A high-performance machine learning telemetry pipeline designed for the Kaggle Playground Series S6E5 competition. Engineers 42 advanced temporal lag, rolling mean/std window, and stint-aware features from raw race metrics, feeding a stratified 5-fold cross-validation ensemble of gradient boosters. Implements Level-2 Logistic Regression stacking and pseudo-labeling refinement to predict critical pit stop timings.",
      tags: ["PYTHON", "LIGHTGBM", "XGBOOST", "CATBOOST", "SCIKIT-LEARN", "KAGGLE"],
      viewSource: "https://github.com/b1tw1z/f1-pit-spot-prediction"
    },
    {
      id: "004",
      reportingNo: "REPORT #004 — SECURITY LABS & OFFLINE AI",
      dateString: "2026.05",
      classification: "CONFIDENTIAL",
      title: "Password Strength Analyzer Suite",
      oneLiner: "An offline security suite evaluating passwords with local GGUF models.",
      description: "A secure Flask web console hosting three password validation engines: rule-based, mathematical Shannon entropy bits, and pattern-based zxcvbn dictionary checks. Integrates Server-Sent Events (SSE) to live stream brute-force time estimations. Houses a fully local, offline security chatbot utilizing llama-cpp-python and GGUF quantization weights, running safe diagnostics without external API leaks.",
      tags: ["PYTHON", "FLASK", "LOCAL AI", "LLAMA.CPP", "SSE STREAMING"],
      viewSource: "https://github.com/b1tw1z/Password-Strength-Analyzer"
    },
    {
      id: "005",
      reportingNo: "REPORT #005 — OFFENSIVE SEC & TESTING LABS",
      dateString: "2026.04",
      classification: "TOP SECRET",
      title: "ATLAS VAPT Toolkit",
      oneLiner: "Advanced Testing Lab for Application Security auditing systems.",
      description: "A comprehensive, modular application security framework designed for vulnerability assessments and penetration testing. Automates critical testing profiles across remote web services, assessing endpoints for typical injection risks, transport security flaws, and configuration exposures, presenting highly structured, declassified vulnerability reports.",
      tags: ["PYTHON", "VAPT", "PENTESTING", "NETWORK SECURITY", "WEB AUDITING"],
      viewSource: "https://github.com/b1tw1z/ATLAS"
    },
    {
      id: "006",
      reportingNo: "REPORT #006 — THREAT INTEL & CLASSIFIERS",
      dateString: "2026.03",
      classification: "TOP SECRET",
      title: "DOME Malicious Domain Engine",
      oneLiner: "A deep learning reputation classifier mapping malicious domain anomalies.",
      description: "Engineered a state-of-the-art domain reputation engine employing hybrid deep learning architectures (Bi-LSTM, Random Forest, and XGBoost) to classify malicious network domains, achieving an outstanding validation accuracy of 94%+. Designed an asynchronous FastAPI backend paired with a dynamic React analytics dashboard to enable high-throughput batch domain scans, active DNS resolution logs, and threat landscape visualization.",
      tags: ["FASTAPI", "REACT", "Bi-LSTM", "RANDOM FOREST", "XGBOOST"],
      viewSource: "https://github.com/b1tw1z/DOME"
    },
    {
      id: "007",
      reportingNo: "REPORT #007 — OSINT & DATA RECON",
      dateString: "2026.03",
      classification: "CONFIDENTIAL",
      title: "OSINT Reconnaissance (Argus)",
      oneLiner: "A multi-threaded intelligence aggregator mapping targets WHOIS & DNS.",
      description: "Developed a comprehensive, modular open-source reconnaissance engine designed to query, aggregate, and correlate data across target domains, emails, IP addresses, and user profiles. Automated passive DNS, WHOIS, and leak-database enumeration, successfully cutting manual intelligence-gathering times by 40% in field testing.",
      tags: ["JAVASCRIPT", "OSINT", "AUTOMATION", "RECONNAISSANCE"],
      viewSource: "https://github.com/B1tW1z/ARGUS"
    },
    {
      id: "008",
      reportingNo: "REPORT #008 — PEER WIRE & NETWORKS",
      dateString: "2026.02",
      classification: "CONFIDENTIAL",
      title: "torrentd: Peer-to-Peer Client",
      oneLiner: "An RFC-compliant BitTorrent client implemented in standard Python.",
      description: "Implemented entirely with standard library tools (no external libraries). Encodes and parses complex bencoded metadata, manages asynchronous TCP socket pools, conducts peer wire handshakes, maintains unchoke/choke state machines, handles multi-peer parallel block downloads, calculates rarest-first piece priority matrices, handles endgame mode, queries UDP and HTTP/HTTPS trackers, discovers nodes using DHT protocols, and supports magnet link resolver via PEX and metadata extension exchanges.",
      tags: ["PYTHON", "NETWORKING", "P2P PROTOCOLS", "SOCKETS", "DHT/PEX"],
      viewSource: "https://github.com/B1tW1z/torrentd"
    },
    {
      id: "009",
      reportingNo: "REPORT #009 — THREAT TRAPS & DECEPTION",
      dateString: "2026.02",
      classification: "CONFIDENTIAL",
      title: "Multi-Service TCP Honeypot",
      oneLiner: "A secure network intrusion trap emulating standard service request channels.",
      description: "A secure network intrusion trap emulating standard SSH (8022), FTP (8021), and HTTP (8080) service request channels. Employs multi-threaded network listeners to safely trap connection attempts and logging payloads. Couples with an offensive scanner simulator generating high-intensity sweeps to train classifiers. Includes a live streaming analysis panel built on Streamlit with interactive Plotly visual feeds calculating temporal threat sophistication indexes.",
      tags: ["PYTHON", "STREAMLIT", "NETWORKING", "HONEYPOTS", "THREAT INTELLIGENCE"],
      viewSource: "https://github.com/B1tW1z/honeypot-simulation"
    },
    {
      id: "010",
      reportingNo: "REPORT #010 — CLIMATE TELEMETRY",
      dateString: "2025.01",
      classification: "UNCLASSIFIED",
      title: "Delhi AQI Historical Prediction",
      oneLiner: "Data analysis and prediction of air quality trends using regression models.",
      description: "A detailed exploratory data analysis and prediction framework investigating air quality indices (AQI) in Delhi. Leverages historical pollutant telemetry datasets to train predictive model ensembles, plotting seasonal pollutant densities, monthly trajectories, and forecasting future emission trends using Jupyter notebooks.",
      tags: ["PYTHON", "JUPYTER", "DATA ANALYSIS", "FORECASTING"],
      viewSource: "https://github.com/B1tW1z/DelhiAQI-Analysis"
    },
    {
      id: "011",
      reportingNo: "REPORT #011 — QUANT FINANCE",
      dateString: "2026.01",
      classification: "TOP SECRET",
      title: "Monte Carlo Option Pricer",
      oneLiner: "Web-based option pricing using Black-Scholes and Monte Carlo paths.",
      description: "A web-hosted options pricer evaluating derivatives pricing under Black-Scholes formulas and stochastic Monte Carlo path simulations. Built using a Django backend combined with NumPy and Matplotlib to model asset trajectories and generate convergence charts.",
      tags: ["DJANGO", "NUMPY", "QUANT FINANCE", "MONTE CARLO", "OPTIONS PRICING"],
      viewSource: "https://github.com/B1tW1z/monte_carlo-option-pricer"
    },
    {
      id: "012",
      reportingNo: "REPORT #012 — DEEP VISION MEDICINE",
      dateString: "2026.02",
      classification: "TOP SECRET",
      title: "Retinal Disease Diagnostic CNN",
      oneLiner: "An eye disease classification convolutional neural network with UI interface.",
      description: "Engineered a deep Convolutional Neural Network (CNN) trained on high-fidelity clinical retinal scans to classify and refer early-stage ophthalmology pathologies (retinopathy, glaucoma, macular degeneration). Couples with a clean Python UI interface to process incoming user telemetry files.",
      tags: ["PYTHON", "CNN", "DEEP LEARNING", "COMPUTER VISION", "MEDICAL AI"],
      viewSource: "https://github.com/B1tW1z/Early-Eye-Disease-Detection-Referral-System"
    },
    {
      id: "013",
      reportingNo: "REPORT #013 — WEB METRICS & CRAWLERS",
      dateString: "2026.05",
      classification: "UNCLASSIFIED",
      title: "SEO Diagnostics Auditor (SEO-TOOL)",
      oneLiner: "An interactive SEO auditor assessing page metrics and crawling schemas.",
      description: "Developed an interactive web diagnostics tool that crawls and evaluates pages for core SEO criteria. Audits payload response speeds, keyword distributions, canonical tags accuracy, and structured JSON-LD schema objects, reporting critical visibility indexes in a premium developer dashboard.",
      tags: ["JAVASCRIPT", "SEO", "WEB AUDITING", "CRAWLERS", "VIRTUAL METRICS"],
      viewSource: "https://github.com/B1tW1z/SEO-TOOL"
    },
    {
      id: "014",
      reportingNo: "REPORT #014 — SIGNAL GENETICS & DATA FORENSICS",
      dateString: "2026.04",
      classification: "UNCLASSIFIED",
      title: "TV DNA Lab Analyzer",
      oneLiner: "An exploratory data analysis and digital signal fingerprinting pipeline.",
      description: "Engineered a Jupyter-based signal analytics pipeline designed for deep media profiling and digital media signal DNA identification. Leverages Pandas, NumPy, and Scipy to extract digital signal envelopes, process frequency-domain telemetry distributions, and build robust classifications models that categorize transmission deviations and visual telemetry signatures with high statistical precision.",
      tags: ["PYTHON", "JUPYTER", "SIGNAL PROCESSING", "EXPLORATORY DATA ANALYSIS"],
      viewSource: "https://github.com/B1tW1z/TV-DNA-LAB"
    }
  ],
  experience: [
    {
      year: "2026",
      company: "Indian National Space Promotion and Authorization Centre (IN-SPACe)",
      role: "Security Operations & Automation Intern",
      bullets: [
        "Engineered a Space Sector Incident Response Automation & Threat Correlation Platform using Python and FastAPI, reducing security analyst alert triage and investigation time by 45%.",
        "Developed a centralized timeline reconstruction and threat correlation engine that sequenced security events, parent-child processes, and network connections into comprehensive attack paths.",
        "Integrated multi-source open-source threat intelligence feeds and reputation services for automated file hash, IP, and domain IOC enrichment with contextual risk scoring."
      ],
      tags: ["INCIDENT RESPONSE", "FASTAPI", "THREAT CORRELATION", "MITRE ATT&CK"]
    },
    {
      year: "2025",
      company: "Indian Space Research Organisation (ISRO)",
      role: "Security Engineering Intern",
      bullets: [
        "Engineered an automated cyber range platform orchestrating 7+ MITRE ATT&CK-aligned emulation scenarios, reducing manual security assessment latency by 60% across participating endpoints.",
        "Developed a centralized Command & Control (C2) orchestration engine coordinating tasks across distributed endpoints, enabling concurrent execution of 50+ security validation playbooks.",
        "Designed and integrated automated validation routines for SIEM alerts and EDR detections, reducing manual drill configuration overhead by 70% through scenario-driven pipelines."
      ],
      tags: ["CYBER RANGE", "AUTOMATION", "MITRE ATT&CK", "ENDPOINT TELEMETRY"]
    },
    {
      year: "2026",
      company: "Sentientia Quality AI",
      role: "Cybersecurity Intern",
      bullets: [
        "Developed and optimized robust machine learning model training pipelines utilizing Scikit-learn and TensorFlow for deployment on embedded IoT nodes with strict hardware constraints.",
        "Spearheaded comprehensive VAPT and threat modeling assessments on 5+ critical embedded system products, mitigating vulnerabilities and hardcoding security guidelines into target firmware.",
        "Designed and implemented an automated security testing harness within local CI/CD pipelines, preventing low-level firmware injection flaws and memory corruptions."
      ],
      tags: ["MACHINE LEARNING", "VAPT", "EMBEDDED SYSTEMS", "THREAT MODELING"]
    }
  ],
  education: {
    institution: "UPES, Dehradun",
    degree: "B.Tech in Computer Science & Engineering (Specialization: Cyber Security & Forensics)",
    timeline: "2023 - Present",
    bullets: [
      "Pursuing specialized academic coursework focusing on low-level operating systems kernel programming, secure software construction, malware reverse engineering, and threat mitigation paradigms.",
      "Actively conducting advanced research and independent developer builds across cryptographic networks, dynamic system virtualization, and high-performance machine learning models.",
      "Participating in intensive university wargaming labs, solving over 140+ forensic CTF challenges and security challenges across TryHackMe and HackTheBox."
    ]
  },
  certifications: [
    {
      issuer: "ISC2",
      title: "ISC2 Certified in Cybersecurity (CC)",
      dateString: "2025.10",
      credentialId: "CLASSIFIED // [REDACTED]",
      verifyUrl: "https://drive.google.com/drive/u/1/folders/1AqMU29C_QZzSFEebBDWY96LWhHlVR2Sn"
    },
    {
      issuer: "GOOGLE",
      title: "Google Cybersecurity Professional",
      dateString: "2025.07",
      credentialId: "5DKUR8LJ7EP4",
      verifyUrl: "https://www.coursera.org/account/accomplishments/professional-cert/5DKUR8LJ7EP4"
    },
    {
      issuer: "GOOGLE CLOUD",
      title: "Google Cloud Career Practitioner Pathway",
      dateString: "2024.11",
      credentialId: "CLASSIFIED // [REDACTED]",
      verifyUrl: "https://drive.google.com/drive/u/1/folders/1bgSKWCH1giZ3909fu8qmKQKmbsx0CBVv"
    },
    {
      issuer: "SCALER",
      title: "Node.js Certified Developer",
      dateString: "2024.08",
      credentialId: "CLASSIFIED // [REDACTED]",
      verifyUrl: "https://drive.google.com/drive/u/1/folders/1bgSKWCH1giZ3909fu8qmKQKmbsx0CBVv"
    }
  ],
  ctfLogs: {
    handle: "b1tw1z",
    tryHackMe: {
      rank: "TOP 1%",
      badge: "PRO HACKER",
      solvedCount: "140+ ROOMS",
      profileUrl: "https://tryhackme.com/p/abhinav17ap"
    },
    cyLabAcademy: {
      rank: "CERTIFIED",
      status: "ACTIVE USER",
      profileUrl: "https://learn.cylabacademy.org/users/abhinav327"
    },
    competitiveEvents: [
      { name: "UPES CSI Hackathon", rank: "TOP 10" },
      { name: "Hypervision student chapter", rank: "TECHNICAL HEAD" },
      { name: "TryHackMe Advent of Cyber", rank: "COMPLETED" }
    ]
  },
  research: [
    {
      volIssue: "VOL. 1 — RESEARCH DISPATCH — 2025",
      title: "Machine Learning Classifiers for Real-Time Network Anomaly and Intrusion Threat Detection",
      byline: "BY ABHINAV PATEL · B1TW1Z",
      abstract: "This paper analyzes the deployment of machine learning classifiers (Random Forest, Gradient Boosting, SVM) to detect network anomaly signatures in real-time. By processing over 490,000 data instances from emulation datasets, the proposed Random Forest model achieved a 99.96% categorization accuracy in classifying DoS, Probe, R2L, and U2R intrusions, proving highly effective for live security shield triggers.",
      tags: ["MACHINE LEARNING", "INTRUSION DETECTION", "RANDOM FOREST"],
      url: "https://zenodo.org/records/17556037"
    },
    {
      volIssue: "VOL. 2 — RESEARCH FIELD BRIEF — 2025",
      title: "Palm Vein Biometrics Recognition Using Near-Infrared Imaging and CNN-Based Feature Extraction",
      byline: "BY ABHINAV PATEL · B1TW1Z",
      abstract: "Presents a highly secure biometric access framework leveraging subcutaneous palm vascular patterns captured under near-infrared light spectrum inputs. Custom deep Convolutional Neural Networks (CNNs) were trained to parse vein map arrays and extract unique geometric hashes, demonstrating high resistance to biometrics spoofing attacks and minimizing false-acceptance rates.",
      tags: ["CNN", "BIOMETRICS", "INFRARED IMAGING", "COMPUTER VISION"],
      url: "https://digitalmanuscriptpedia.com/conferences/index.php/DMP-LNMR/article/view/100"
    },
    {
      volIssue: "VOL. 3 — CONFERENCE INQUEST — 2024",
      title: "Architectural Integration and Strategic Risk Management of Post-Quantum Cryptography in Hybrid Enterprise Networks",
      byline: "BY ABHINAV PATEL · B1TW1Z",
      abstract: "Investigates practical migration paths and topological deployments of NIST-selected Post-Quantum Cryptographic (PQC) algorithms within legacy enterprise systems. Evaluates network transmission latencies, payload key-size expansions, and hybrid fallback channels (combining Kyber/Falcon with traditional ECDH) to guard against store-now-decrypt-later harvesting threats.",
      tags: ["POST-QUANTUM CRYPTO", "HYBRID NETWORKS", "ALGORITHMS", "KYBER/FALCON"],
      url: "https://digitalmanuscriptpedia.com/conferences/index.php/DMP-LNMR/article/view/91"
    }
  ],
  testimonials: [
    {
      id: "001",
      filename: "TRANSMISSION_001.log",
      from: "Redacted Team Lead @ ISRO",
      quote: "Subject demonstrated exceptional technical capabilities under intense development timelines, solving complex firmware anomalies with custom low-level structures.",
      rating: 5
    },
    {
      id: "002",
      filename: "TRANSMISSION_002.log",
      from: "Academic Peer @ UPES",
      quote: "Fast, reliable, and actually possesses deep insight in networks, security, and compilers. A rare and memorably capable developer.",
      rating: 5
    },
    {
      id: "003",
      filename: "TRANSMISSION_003.log",
      from: "Systems Lab Auditor",
      quote: "Cleanest, most optimized Rust JIT memory mapping implementation I have audited. Subject is highly proficient in unsafe systems programming.",
      rating: 5
    }
  ],
  arsenal: {
    methodStatement: "I structure offensive tooling and security traps by adhering to absolute RFC and systems guidelines. Every tool, compiler, or script is written from scratch to ensure complete oversight over execution pathways, avoiding bloating dependencies or high-level runtime blackboxes.<br><br>To augment this capability, I implement predictive modeling and advanced intrusion analytics. Each simulation log is treated as an empirical data source, which I process using custom machine learning ensembles to actively uncover network anomalies and identify operational vulnerabilities. Every codebase displayed in this dossier is a functional artifact of this continuous development commitment, validating that theoretical concepts are backed by zero-compromise, engineered execution.",
    categories: [
      {
        name: "LANGUAGES & SYSTEMS",
        skills: ["Rust", "C/C++", "x86-64 Assembly", "Python", "TypeScript / JavaScript", "Go", "Bash / Shell", "SQL"]
      },
      {
        name: "CYBER SECURITY & OFFENSIVE LABS",
        skills: ["VAPT", "Active Directory Security", "Reverse Engineering", "Malware Analysis", "OSINT Reconnaissance", "Network Packet Auditing (Wireshark)", "Metasploit / Burp Suite", "ELK Threat Telemetry", "TCP Deception Honeypots"]
      },
      {
        name: "AI & TELEMETRY SYSTEMS",
        skills: ["Machine Learning", "Deep Learning (Bi-LSTM, CNN)", "Supervised Regression & XGBoost", "FastAPI / React", "TensorFlow / PyTorch", "Pandas / NumPy", "Scikit-Learn", "Natural Language Processing (NLTK)", "Data Analytics"]
      },
      {
        name: "PLATFORMS & ARCHITECTURE",
        skills: ["Docker", "CI/CD Secure Pipes", "Git / Version Control", "MySQL / MongoDB", "PostgreSQL", "Linux", "Kubernetes", "SQLite"]
      }
    ]
  },
  resume: {
    pdfLink: "assets/AbhinavPatel.pdf",
    filename: "Abhinav_Patel_Resume.pdf"
  }
};
