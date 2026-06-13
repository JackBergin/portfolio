import { Project, Role, SkillGroup, Accent } from '../types';

const ACCENTS: Accent[] = ['a1', 'a2', 'a3', 'a4'];

/** Cycle accents so a list of cards stays visually varied. */
export const cycleAccent = (i: number): Accent => ACCENTS[i % ACCENTS.length];

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */
export const about = {
  name: 'Jack Bergin',
  title: 'Full Stack Software Engineer',
  tagline: 'IoT · Data Infrastructure · AI Tooling',
  location: 'Cambridge, MA',
  blurb: `Full Stack Software Engineer who ships customer-facing apps, internal analytics dashboards, data infrastructure, and IoT systems end to end. I take ownership across product, backend, deployment, and support — translating customer and manufacturing workflows into dashboards, APIs, telemetry pipelines, and scalable architecture. Robotics engineer by training, I'm at my best where software meets hardware.`,
  resumeUrl:
    'https://github.com/JackBergin/portfolio/raw/main/context/Jack_Bergin_Full_Stack_Engineer_Resume.docx.md',
};

export const contact = {
  email: 'jack.christopher.bergin@gmail.com',
  linkedin: 'https://linkedin.com/in/jackcbergin',
  github: 'https://github.com/JackBergin',
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */
export const experience: Role[] = [
  {
    title: 'Full Stack Software Engineer, IoT Systems',
    company: 'Aquatic Labs',
    period: 'Jan. 2026 – Present',
    accent: 'a1',
    points: [
      'Own product features across customer applications, internal dashboards, backend APIs, database schemas, CI/CD, and IoT infrastructure for sensor deployments.',
      'Built a customer-facing sensor platform in React, JavaScript, Python, and Supabase for issue tracking, historical data, real-time data, REST API access, and webhook delivery.',
      'Implemented Redis caching for internal dashboards receiving 10Hz sensor data, cutting 15-minute multi-session view loads from ~20s to ~2s.',
      'Rebuilt a TimescaleDB hypertabled Postgres architecture targeting scale from ~20 to 500 sensors with 2 months of hot storage.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Symbotic',
    period: 'June 2023 – 2026',
    accent: 'a2',
    points: [
      'Developed full stack applications supporting robotics testing, resource tracking, predictive analytics, and internal engineering workflows.',
      'Built REST APIs, dashboards, and data pipelines with Python, React/NextJS, Express, Node.js, MongoDB, Postgres, Snowflake, Docker, and Kubernetes.',
      'Created predictive robot-health tools that transformed Snowflake and sensor data into anomaly findings surfaced through NextJS dashboards.',
      'Deployed internal apps with Docker, ProGet, Kubernetes, and CentOS VMs while presenting projects across teams for adoption.',
    ],
  },
  {
    title: 'Robotics Engineer',
    company: 'Symbotic',
    period: 'Oct. 2022 – June 2023',
    accent: 'a3',
    points: [
      'Developed test frameworks for robot vision, teleoperation, maintenance systems, drive components, and hardware fault-injection workflows.',
      'Reviewed merge requests, maintained testing standards, designed fixtures, and worked across Scrum and Kanban teams supporting robotic system validation.',
    ],
  },
  {
    title: 'Experience Engineer',
    company: 'PTC',
    period: 'May 2020 – Aug. 2022',
    accent: 'a4',
    points: [
      'Completed four internships and one co-op building AR, IoT, CAD, robotics, and customer demonstration systems for PTC’s Corporate Experience Center.',
      'Presented technical demos to sales teams and prospective customers across manufacturing and industrial technology audiences.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */
export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    accent: 'a1',
    items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'Bash', 'PowerShell'],
  },
  {
    title: 'Frontend',
    accent: 'a2',
    items: ['React', 'NextJS', 'Gatsby', 'Create React App', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    title: 'Backend / Data',
    accent: 'a3',
    items: [
      'FastAPI',
      'Express',
      'Node.js',
      'Supabase',
      'Postgres',
      'TimescaleDB',
      'Redis',
      'Snowflake',
      'MongoDB',
    ],
  },
  {
    title: 'DevOps / Infra',
    accent: 'a4',
    items: [
      'GitHub Actions',
      'Self-hosted Runners',
      'Docker',
      'Kubernetes',
      'NGINX',
      'AWS',
      'Tailscale',
      'RAID',
      'Linux Servers',
    ],
  },
  {
    title: 'AI Tools',
    accent: 'a1',
    items: ['Cursor', 'Claude Code', 'ChatGPT', 'GitHub Copilot', 'OpenAI Codex', 'MCP', 'Agents'],
  },
  {
    title: 'Customer / Product',
    accent: 'a2',
    items: ['Dashboards', 'Analytics', 'REST APIs', 'Webhooks', 'Technical Demos', 'Support'],
  },
];

/* ------------------------------------------------------------------ */
/* Professional projects                                               */
/* ------------------------------------------------------------------ */
export const professionalProjects: Project[] = [
  {
    title: 'Customer-Facing Sensor Data Platform & API',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a1',
    featured: true,
    tags: ['Full Stack', 'IoT', 'Featured'],
    summary:
      'Rebuilt an early GitHub Pages dashboard into a full stack sensor platform with REST + webhook access.',
    bullets: [
      'Developed customer assignment workflows linking users to sensors, issue tracking, historical, and real-time data views.',
      'Built headless data access via REST API and webhook integrations so customers consume production data directly.',
      'Implemented with React, JavaScript, Python, npm, and Supabase.',
      'Improved sensor-performance visibility while reducing manual reporting and expanding external access.',
    ],
  },
  {
    title: 'Agentic Debugging Extension for VSCode + MCP',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a2',
    featured: true,
    tags: ['AI Tooling', 'Featured'],
    summary:
      'TypeScript VSCode extension + MCP server that pipes live debugger context into agent sessions.',
    bullets: [
      'Passed call stack, local variables, breakpoints, launch config, and file context into agent sessions.',
      'Enabled agents to run launch.json, set breakpoints, and reason through poorly documented legacy code live.',
      'Built for Cursor, GitHub Copilot, and other VSCode-compatible agent workflows.',
      'Reduced manual context transfer and accelerated debugging across large internal repositories.',
    ],
  },
  {
    title: 'Embedded C++ On-Device Alkalinity Algorithm',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a3',
    featured: true,
    tags: ['Embedded', 'Featured'],
    summary:
      'Ported a cloud Python alkalinity algorithm to embedded C++ for secure on-device execution.',
    bullets: [
      'Moved computation onto the embedded controller for offline deployments and to protect proprietary cloud logic.',
      'Optimized memory by replacing dynamic vectors/maps with statically typed arrays and constrained structures.',
      'Validated parity against Python outputs within decimal-percentage tolerances.',
      'Enabled encrypted on-device execution of core sensor computation logic.',
    ],
  },
  {
    title: 'Real-Time Sensor Dashboard with Redis Caching',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a4',
    tags: ['Full Stack', 'Data Infra', 'IoT'],
    summary: 'Redis caching + broadcast fanout for high-frequency telemetry across internal sessions.',
    bullets: [
      'Cached 10Hz sensor data from multiple devices publishing across several tables.',
      'Implemented an hour-long Redis holding layer with broadcast fanout to serve internal users efficiently.',
      'Cut multi-session 15-minute view loads from ~20s to ~2s while lowering database pressure.',
    ],
  },
  {
    title: 'Scalable TimescaleDB Hypertable Architecture',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a1',
    tags: ['Data Infra', 'IoT'],
    summary:
      'Redesigned hypertabled Postgres schemas, indexing, and compression for sensor telemetry at scale.',
    bullets: [
      'Designed schemas for sensor readings, aggregate computations, and calibration metrics.',
      'Implemented table abstraction, indexing, and compression to support larger fleets.',
      'Expanded hot-store from ~20 sensors / 2 months toward 500 sensors / 2 months of history.',
    ],
  },
  {
    title: 'Schema-Driven Firmware Data Model (Protobuf)',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a2',
    tags: ['Data Infra', 'Embedded'],
    summary:
      'Rolled out v2 firmware messaging across sensor, controller, and Raspberry Pi using Protobuf versioning.',
    bullets: [
      'Refactored high-cardinality tables into focused schemas to improve delivery and reduce column growth.',
      'Coordinated schema changes across firmware, backend, frontend, Python pipelines, and algorithm repos.',
      'Built schema-driven frontend/backend components to reduce cross-repo migration friction.',
    ],
  },
  {
    title: 'Native EEPROM Flashing App (Electron)',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a3',
    tags: ['Embedded', 'Full Stack'],
    summary:
      'Cross-platform Electron app wrapping a Python flasher for safe EEPROM programming on the embedded controller.',
    bullets: [
      'Built for MacOS and Windows so non-engineering users and external manufacturers can flash safely.',
      'Integrated the flashing workflow with the internal database to reduce manual device-entry errors.',
      'Standardized EEPROM flashing and metadata registration to cut device-setup friction.',
    ],
  },
  {
    title: 'AI Tooling Adoption & Agentic Workflows',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a4',
    tags: ['AI Tooling'],
    summary: 'Led team-wide AI tool adoption and standardized agentic development practices.',
    bullets: [
      'Drove adoption of Cursor, Claude Code, ChatGPT, GitHub Copilot, MCP, and internal agent tooling.',
      'Wrote best-practice docs and ran a lunch-and-learn on effective AI-assisted workflows.',
      'Built reusable context folders, rules, hooks, commands, skills, and agent plans into repos.',
    ],
  },
  {
    title: 'Cross-Project CI/CD & Repo Ownership',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a1',
    tags: ['DevOps'],
    summary:
      'Owned lifecycle across six repos with GitHub Actions, self-hosted runners, and blue-green deploys.',
    bullets: [
      'Primary developer across architecture, docs, code review, release management, and CI/CD.',
      'Stood up pipelines for build, lint, test, type-check, package, and deploy on self-hosted runners.',
      'Added Makefiles to standardize commands and blue-green deploys to reduce downtime.',
    ],
  },
  {
    title: 'On-Prem Server & Tailscale Mesh Infrastructure',
    company: 'Aquatic Labs',
    period: '2026 – Present',
    accent: 'a2',
    tags: ['DevOps', 'Infrastructure'],
    summary:
      'Stood up four RAID-backed on-prem servers and a Tailscale mesh for remote internal access.',
    bullets: [
      'Flashed OSes and configured RAID 1 across CI/CD, dev/analytics, GPU research, and file-sharing servers.',
      'Built Tailscale across local servers, AWS, laptops, and devices with subnet routing and DNS.',
      'Enabled remote incident response and access to internal apps without a traditional VPN.',
    ],
  },
  {
    title: 'Predictive Bot-Health Modeling',
    company: 'Symbotic',
    period: 'Apr. 2024 – June 2024',
    accent: 'a3',
    tags: ['Full Stack', 'Robotics'],
    summary:
      'Full stack app turning Snowflake + sensor data into robot-failure anomaly findings on a NextJS dashboard.',
    bullets: [
      'Built a REST API to serve Snowflake data into anomaly-detection algorithms.',
      'Developed algorithms to parse and model sensor data for hardware anomalies; stored results in Postgres.',
      'Surfaced current and historical findings in a NextJS dashboard shared cross-organizationally.',
    ],
  },
  {
    title: 'Robot Resource Tracker',
    company: 'Symbotic',
    period: 'Feb. 2024 – Apr. 2024',
    accent: 'a4',
    tags: ['Full Stack', 'Robotics'],
    summary:
      'App to track, reserve, and update resources at Symbotic’s testing facility, deployed on CentOS VMs.',
    bullets: [
      'Built the frontend with Create React App and the backend in Express, Node.js, and MongoDB.',
      'Dockerized and released client and server on ProGet for CentOS VM deployment.',
    ],
  },
  {
    title: 'System Test Toolbox',
    company: 'Symbotic',
    period: 'June 2023 – Nov. 2023',
    accent: 'a1',
    tags: ['Full Stack', 'Robotics'],
    summary:
      'Replaced CLI commands and Python scripts with an app showing real-time robot path planning and fault injection.',
    bullets: [
      'Server side interfaces with the robot’s routing and state queues over RabbitMQ.',
      'Client side visualized the robotic system running and path planning in real time.',
      'Enabled injecting test failures on real bots for HW and SW stress testing.',
    ],
  },
  {
    title: 'Robot Test Framework Development',
    company: 'Symbotic',
    accent: 'a2',
    tags: ['Robotics'],
    summary:
      'Framework for rigorous testing of bot system and drive components with fault-injection tooling.',
    bullets: [
      'Implemented a singleton pattern in RVIZ simulation code to optimize overnight testing.',
      'Built a Python GUI supporting fault-injection testing for edge-case scenarios.',
      'Built a regression suite for new robot features and documented tests in TestRail.',
    ],
  },
  {
    title: 'AR / IoT / CAD Co-Op Capstone',
    company: 'PTC',
    period: 'Feb. 2022 – Aug. 2022',
    accent: 'a3',
    tags: ['IoT/AR', 'Robotics'],
    summary:
      'AR/IoT/CAD demo for PTC’s Corporate Experience Center built on Raspberry Pi + ThingWorx.',
    bullets: [
      'Prototyped a Raspberry Pi + Sense HAT case for optimal sensor readings; designed in Onshape, printed SLA/FDM.',
      'Built a pipeline storing RPi data to a Kepware DB via pyModbusTCP.',
      'Created traditional and AR UIs on ThingWorx and Vuforia to display the IoT data.',
    ],
  },
  {
    title: 'Dyson Air Purifier IoT Application',
    company: 'PTC',
    period: 'Dec. 2021 – Jan. 2022',
    accent: 'a4',
    tags: ['IoT/AR'],
    summary:
      'Full stack IoT app to monitor and control room air quality across networked Dyson purifiers.',
    bullets: [
      'Developed a Python API using the MQTT protocol to get and serve Dyson data.',
      'Built a Kepware/ThingWorx dashboard to show and control the Dysons in real time.',
    ],
  },
  {
    title: 'Robotic Arm Battery Cell Station',
    company: 'PTC',
    period: 'July 2021 – Aug. 2021',
    accent: 'a1',
    tags: ['Robotics', 'IoT/AR'],
    summary:
      'Demo assembling reusable batteries with a Universal Robots arm and PTC’s DPM software.',
    bullets: [
      'Earned the CB3 Universal Robotics certification to operate and program the arm.',
      'Assembled the housing, wired PLCs, and programmed the arm’s movement.',
      'Integrated and tested PTC’s Digital Performance Management software with the demo.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Personal projects                                                  */
/* ------------------------------------------------------------------ */
export const personalProjects: Project[] = [
  {
    title: 'EnvoyAI — Agentic Workflow Platform',
    company: 'Personal',
    period: '2024 – Present',
    accent: 'a1',
    featured: true,
    tags: ['AI', 'Full Stack', 'Featured'],
    link: 'https://github.com/EnvoyAI-Org',
    summary:
      'A platform where multiple LLMs interact as agents to solve problems round-robin or step by step.',
    bullets: [
      'Backend agents hosted on a Uvicorn server exposed through a FastAPI endpoint.',
      'Frontend built in TypeScript with Gatsby for static UI components.',
      'SSO via Kinde and payments via Stripe; MongoDB/Node/Express auth server.',
    ],
  },
  {
    title: 'LLM Cloud Pipeline',
    company: 'Personal',
    accent: 'a2',
    tags: ['AI', 'Infrastructure'],
    summary: 'Pipeline for running HuggingFace LLMs on cloud GPUs via AWS SageMaker.',
    bullets: [
      'Connected the HuggingFace LLM library to AWS SageMaker.',
      'Built an endpoint from SageMaker using Lambda functions and S3 buckets.',
      'Served it for local development of the EnvoyAI agentic workflow platform.',
    ],
  },
  {
    title: 'Media Newsletter Generator',
    company: 'Personal',
    accent: 'a3',
    tags: ['AI'],
    link: 'https://github.com/JackBergin/newsletter-generation',
    summary: 'Turn any subreddit and YouTube video into a generated newsletter.',
  },
  {
    title: 'Horizon AR',
    company: 'Personal',
    accent: 'a4',
    tags: ['IoT/AR'],
    link: 'https://github.com/JackBergin/horizon-ar/',
    summary: 'Augmented reality for marketing and sales — take a brand to the next level.',
  },
  {
    title: 'LLM Chrome Extension',
    company: 'Personal',
    accent: 'a1',
    tags: ['AI'],
    link: 'https://github.com/JackBergin/llm-chrome-plugin',
    summary: 'A Chrome extension that lets you chat with any website using an LLM.',
  },
  {
    title: 'BCI with Medical Application',
    company: 'Startup Project',
    accent: 'a2',
    tags: ['Hardware'],
    summary: 'Brain-computer interface hardware with WiFi/BLE transmission for EEG signal testing.',
    bullets: [
      'Fabricated BCI hardware and integrated a protoboard for WiFi/BLE transmission.',
      'Used an open-source BCI library to test EEG signal viability.',
      'Established headset-to-protoboard communication over UART.',
    ],
  },
  {
    title: 'Smart Thermostat System',
    company: 'Startup Project',
    accent: 'a3',
    tags: ['Hardware', 'IoT/AR'],
    summary: 'Smart thermostat for electric baseboard heating built from servos, Arduinos, and BLE.',
    bullets: [
      'Designed a network of servo motors, Arduino Nanos, temperature sensors, and BLE modules.',
      'Tested multiple prototypes and refactored based on outcomes.',
      'Ideated the system and identified minimal viable products with the team.',
    ],
  },
  {
    title: 'Low-Cost Marina Cleaner',
    company: 'Startup Project',
    accent: 'a4',
    tags: ['Hardware'],
    summary:
      'A low-cost device that filters trash, oil, and microplastics from the ocean. Led a team of three.',
    bullets: [
      'Designed a low-cost alternative to existing marina-cleaning devices.',
      'Demoed the working prototype to non-profit Seaside Sustainability and handed off designs.',
    ],
  },
  {
    title: 'Lung Ultrasound Projection Mapping (MQP)',
    company: 'WPI',
    period: 'Mar. 2022 – Oct. 2022',
    accent: 'a1',
    tags: ['Robotics', 'Hardware'],
    summary:
      'Capstone prototype using 3D projection mapping for lung-ultrasound instruction. Lead developer & first author.',
    bullets: [
      'Integrated and tuned a DNN model to segment a patient’s torso in the camera frame.',
      'Calculated transform matrices composing the calibration sequence.',
      'Built calibration/segmentation pipelines to dynamically map graphics onto patients.',
    ],
  },
];

/** All category filters available, derived so they stay in sync with data. */
export const collectTags = (projects: Project[]): string[] => {
  const set = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
  // Surface "Featured" first if present, then alphabetical.
  const tags = Array.from(set).sort();
  return tags.sort((a, b) =>
    a === 'Featured' ? -1 : b === 'Featured' ? 1 : a.localeCompare(b)
  );
};
