// Portfolio content. Ported from the Claude Design project (Portfolio.dc.html)
// so the mobile site and the desktop design share one source of truth.

export interface Seg {
  t: string;
  /** Highlighted in link blue (prize tracks, orgs). */
  hl?: boolean;
}

export interface Stat {
  label: string;
  value: string;
  caption: string;
  tech: string[];
}

export interface ActionLink {
  label: string;
  /** Missing href renders the button disabled until a real link exists. */
  href?: string;
}

export interface Project {
  id: string;
  name: string;
  short: string;
  featured?: boolean;
  isNew?: boolean;
  gold: string;
  blue: string;
  desc: Seg[];
  cards: [string, string][];
  stats: Stat[];
  stack: string[];
  awards?: string[];
  perks?: string[];
  btns: ActionLink[];
  /** Placeholder caption, and alt text once an image is set. */
  media: string;
  /** Landscape screenshot/photo, e.g. '/media/projects/ember.jpg'. Used on mobile, the briefing hero and archive tiles. */
  image?: string;
  /** Optional tall or transparent PNG for the desktop Projects screen (300 × 540 frame). Falls back to `image`. */
  cutout?: string;
  /** Indexes into CATS. */
  cats: number[];
}

export const GH = 'https://github.com/TaimoorAleem';
export const EMAIL = 'taimooraleem01@gmail.com';
export const RESUME_HREF = '/resume.pdf';

/**
 * Site-wide images. Drop files in /public/media and set the path here ('' = show the placeholder).
 * Paths are from the site root, e.g. '/media/portrait.jpg'.
 */
export const MEDIA = {
  /** Contact "INCOMING TRANSMISSION" portrait. Rendered with a red duotone filter. */
  portrait: '',
  /** Desktop home "LATEST" card (Ember team photo). */
  latest: '',
  /** Desktop home tile: BearHacks 2026. */
  bearhacks: '',
  /** Desktop home tile: AI Cricket Coach. */
  cricket: '',
};

export const CODE: Record<string, string> = {
  Coral: 'TPU', OpenCV: 'CV', Linux: 'LNX', 'C++': 'C++', Python: 'PY', Kotlin: 'KT', 'Wear OS': 'WOS',
  PyTorch: 'PT', 'scikit learn': 'SKL', MLflow: 'MLF', DVC: 'DVC', Flutter: 'FLT', GCP: 'GCP', Terraform: 'TF',
  Kafka: 'KFK', 'Spring Boot': 'SPR', Keycloak: 'KC', Prometheus: 'PRM', 'Next.js': 'NXT', Ollama: 'OLM',
  Vultr: 'VLT', FastAPI: 'API', Snowflake: 'SNF', Langflow: 'LF', watsonx: 'WX', Db2: 'DB2', Angular: 'NG',
  Docker: 'DKR', Kubernetes: 'K8S', TypeScript: 'TS', 'Gemini API': 'GEM', ElevenLabs: '11L', Supabase: 'SB',
  RabbitMQ: 'RMQ', PostgreSQL: 'PG', MySQL: 'SQL', MongoDB: 'MDB', Java: 'JV', YOLOv8: 'YLO', Mixtral: 'MIX',
};

export const techCode = (n: string) => CODE[n] ?? n.slice(0, 3).toUpperCase();

const gh = (label = 'VIEW ON GITHUB'): ActionLink => ({ label, href: GH });

export const PROJECTS: Project[] = [
  {
    id: 'ember', name: 'Ember (IgnisXR)', short: 'Ember', featured: true,
    gold: 'XR FIREFIGHTER HELMET', blue: 'Edge ML and sensor fusion',
    desc: [
      { t: 'Built with the IgnisXR team. A helmet system that fuses depth, thermal and vision on device so firefighters can see through smoke. Won the ' },
      { t: 'Google', hl: true }, { t: ' and ' }, { t: 'SPUR', hl: true },
      { t: ' prize tracks at Hack Canada, placed Top 3 in North America at the ' },
      { t: 'Google Solution Challenge', hl: true },
      { t: ', and was presented to Google engineers in New York City.' },
    ],
    cards: [
      ['EDGE INFERENCE', 'Integrated a Google Coral Edge TPU, taking person detection from 10 to 70 FPS.'],
      ['SENSOR FUSION', 'Multi threaded Linux pipeline fusing ToF depth, I2C thermal and Coral inference.'],
      ['HUD COMPOSITING', 'C++ and OpenCV layer compositing three sensor streams in real time.'],
      ['BIOMETRIC STREAM', 'Kotlin Wear OS app streaming vitals over WebSocket at about 1 Hz.'],
    ],
    stats: [
      { label: 'Inference', value: '7×', caption: '10 to 70 FPS', tech: ['Coral', 'OpenCV', 'Linux'] },
      { label: 'Sensors', value: '3', caption: 'depth, thermal, vision', tech: ['C++', 'Python'] },
      { label: 'Wearable', value: '1 Hz', caption: 'biometric stream', tech: ['Kotlin', 'Wear OS'] },
    ],
    stack: ['C++', 'Python', 'OpenCV', 'Coral', 'Linux', 'Kotlin', 'Wear OS'],
    awards: ['Google Build With AI', 'SPUR'], perks: ['Hack Canada', 'Google Solution Challenge', 'NYC Demo'],
    btns: [{ label: 'READ ARTICLE' }, gh()], media: 'Ember prototype photo', cats: [1, 2, 3],
  },
  {
    id: 'proprio', name: 'Proprio', short: 'Proprio', isNew: true,
    gold: 'ML PIPELINE, HONEST EVALUATION', blue: 'MLOps and sensor ML',
    desc: [{ t: 'Grew out of my AI Workout Detector project. Rebuilt the evaluation of a model that claimed 99.9% accuracy.' }],
    cards: [
      ['LEAK HUNT', 'Found 5 data leaks and rebuilt evaluation with LOOCV, correcting 99.9% to 96.3%.'],
      ['BENCHMARK', 'Raised set accuracy to 98.6% across 20 feature and model combinations on 7,360 windows.'],
      ['ROBUSTNESS', 'Made the model 7× more tolerant of sensor misalignment, 2° to 15°, with rotation augmentation.'],
      ['PIPELINE', 'Event driven ingestion with S3, RabbitMQ and PostgreSQL, tracked with MLflow, DVC and GitHub Actions.'],
    ],
    stats: [
      { label: 'Accuracy', value: '96.3%', caption: 'honest LOOCV, from 99.9%', tech: ['scikit learn', 'PyTorch'] },
      { label: 'Benchmark', value: '98.6%', caption: '7,360 windows', tech: ['Python'] },
      { label: 'Robustness', value: '7×', caption: 'misalignment tolerance', tech: ['PyTorch'] },
    ],
    stack: ['Python', 'PyTorch', 'scikit learn', 'MLflow', 'Spring Boot', 'RabbitMQ', 'PostgreSQL', 'Docker'],
    btns: [gh()], media: 'Proprio sensor rig photo', cats: [1, 3, 4],
  },
  {
    id: 'mercato', name: 'Mercato', short: 'Mercato',
    gold: 'DISTRIBUTED COMMERCE PLATFORM', blue: 'Microservices platform',
    desc: [{ t: 'A full stack store built as Spring Boot microservices with Kafka and an Angular front end.' }],
    cards: [
      ['RESILIENCE', 'Circuit breakers, bounded retries and request timeouts across service calls.'],
      ['SECURITY', 'Spring Cloud Gateway with Keycloak JWT validation and OIDC silent token renewal.'],
      ['ORCHESTRATION', 'Containerized with Docker and orchestrated on Kubernetes.'],
      ['OBSERVABILITY', 'Prometheus, Grafana, Loki and Tempo for metrics, logs and traces.'],
    ],
    stats: [
      { label: 'Gateway', value: 'JWT', caption: 'Keycloak and OIDC', tech: ['Spring Boot', 'Keycloak'] },
      { label: 'Events', value: 'Kafka', caption: 'async between services', tech: ['Kafka'] },
      { label: 'Signals', value: '4', caption: 'metrics, logs, traces', tech: ['Prometheus', 'Kubernetes'] },
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Angular', 'MySQL', 'MongoDB'],
    btns: [gh()], media: 'Mercato storefront screenshot', cats: [4, 5],
  },
  {
    id: 'rocky', name: 'Rocky', short: 'Rocky',
    gold: 'DEERHACKS, 2ND PLACE', blue: 'Real time child safety monitor',
    desc: [{ t: 'Built with my DeerHacks team. Also won Best Use of Vultr.' }],
    cards: [
      ['LLM PIPELINE', 'Multi stage LLM pipeline for real time incident detection.'],
      ['DASHBOARD', 'Responsive Next.js parent dashboard with sub second alerts.'],
      ['SELF HOSTED MODEL', 'Mixtral 8x22B served through Ollama on Vultr.'],
      ['DETECTION', '85% precision on audio based bullying detection.'],
    ],
    stats: [
      { label: 'Placement', value: '2nd', caption: 'DeerHacks, UofT', tech: ['Next.js'] },
      { label: 'Precision', value: '85%', caption: 'audio bullying detection', tech: ['Gemini API'] },
      { label: 'Model', value: '8x22B', caption: 'Mixtral on Vultr', tech: ['Ollama', 'Vultr'] },
    ],
    stack: ['Next.js', 'TypeScript', 'Kotlin', 'Supabase', 'PostgreSQL', 'Gemini API'],
    btns: [gh()], media: 'Rocky dashboard screenshot', cats: [2, 3, 5],
  },
  {
    id: 'prismarine', name: 'Prismarine', short: 'Prismarine',
    gold: 'YORKU HACKATHON, 5TH OF 60', blue: 'AI research discovery tool',
    desc: [{ t: 'Built with my team to make literature discovery faster and easier to read.' }],
    cards: [
      ['3D PAPER GRAPH', 'Maps papers from 3 sources into an interactive 3D graph.'],
      ['TRANSLATION', 'Snowflake Cortex translation and simplification that keeps technical terms.'],
      ['AUDIO SUMMARIES', 'ElevenLabs speech synthesis of paper summaries.'],
      ['STACK', 'FastAPI back end with a Next.js and TypeScript front end.'],
    ],
    stats: [
      { label: 'Placement', value: '5th', caption: 'of 60 teams', tech: ['FastAPI'] },
      { label: 'Sources', value: '3', caption: 'papers in a 3D graph', tech: ['Snowflake', 'ElevenLabs'] },
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'Gemini API', 'Snowflake', 'ElevenLabs'],
    btns: [gh()], media: 'Prismarine 3D graph screenshot', cats: [2, 3, 5],
  },
  {
    id: 'voxel', name: 'Voxel', short: 'Voxel',
    gold: 'BEST AI HACK BY IBM', blue: 'Agentic 3D research pipeline',
    desc: [{ t: 'Built with my team at the GenAI Genesis hackathon at UofT.' }],
    cards: [
      ['ORCHESTRATION', 'Agent orchestration in IBM Langflow.'],
      ['PROMPTING', 'Prompt refinement with watsonx.'],
      ['STORAGE', 'Db2 storage for rendered 3D assets.'],
      ['RESULT', 'Best AI Hack award from IBM.'],
    ],
    stats: [
      { label: 'Award', value: 'IBM', caption: 'Best AI Hack', tech: ['watsonx'] },
      { label: 'Agents', value: 'Langflow', caption: 'watsonx prompting', tech: ['Langflow', 'Db2'] },
    ],
    stack: ['Langflow', 'watsonx', 'Db2'],
    btns: [gh()], media: 'Voxel render output', cats: [2, 3],
  },
  {
    id: 'cricket', name: 'AI Cricket Coach', short: 'AI Cricket Coach', featured: true,
    gold: 'CAPSTONE, FIRST PLACE', blue: 'Computer vision coaching app',
    desc: [{ t: 'Led our capstone team to first place with a mobile app that tracks ball trajectory and recommends the ideal shot.' }],
    cards: [
      ['BALL TRACKING', 'YOLOv8 detector at 0.995 precision, 1.0 recall and 0.995 mAP@50.'],
      ['PITCH MAPPING', 'RANSAC homography onto a top down pitch, classifying 5 lengths and 4 lines.'],
      ['SHOT MODEL', 'Random Forest at 87.9% accuracy on 10,000 simulated deliveries across 23 shot classes.'],
      ['FIELD TESTED', '22 test cases with the client and under 10 seconds end to end processing.'],
    ],
    stats: [
      { label: 'Ball tracking', value: '0.995', caption: 'YOLOv8 mAP@50', tech: ['Python', 'OpenCV'] },
      { label: 'Shot model', value: '87.9%', caption: '23 shot classes', tech: ['Python'] },
      { label: 'Latency', value: '<10 s', caption: 'end to end', tech: ['Flutter', 'GCP'] },
    ],
    stack: ['Python', 'OpenCV', 'Flutter', 'GCP', 'Terraform'],
    btns: [gh()], media: 'AI Cricket Coach app screens', cats: [2, 3],
  },
];

export const CATS = ['ALL PROJECTS', 'NEW RELEASES', 'HACKATHON WINS', 'ML AND AI', 'BACKEND SYSTEMS', 'FULL STACK'];

export const allIds = () => PROJECTS.map((p) => p.id);
export const catIds = (i: number) => (i === 0 ? allIds() : PROJECTS.filter((p) => p.cats.includes(i)).map((p) => p.id));
export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);

export interface Chapter {
  name: string;
  num: string;
  company: string;
  meta: string;
  section: string;
  cards: [string, string][];
  extra?: string;
  btn?: ActionLink;
}

export const EXPERIENCE: Chapter[] = [
  {
    name: 'Chapter 3 · IgnisXR', num: '03', company: 'IGNISXR', section: 'MISSION LOG',
    meta: 'Founding Engineer · Mar 2026 to Present · Toronto, ON',
    cards: [
      ['EDGE TPU', 'Integrated a Google Coral Edge TPU: 7× faster inference, from 10 to 70 FPS.'],
      ['TOF DETECTION', 'ToF person and door detection at 32 FPS with distance and bearing.'],
      ['VISION AND THERMAL', 'MobileNet SSD detections validated against live depth, plus thermal victim detection on an MLX90640 array.'],
      ['SENSOR FUSION', 'Multi threaded sensor fusion on Linux.'],
    ],
  },
  {
    name: 'Chapter 2 · Dayforce', num: '02', company: 'DAYFORCE', section: 'MISSION LOG',
    meta: 'Software Developer Intern · Jan 2025 to Dec 2025 · Toronto, ON',
    cards: [
      ['REST APIS', 'Optimized C#/.NET REST APIs for Wallet Gateway microservices with Azure DevOps CI/CD.'],
      ['KAFKA ETL', 'Maintained event driven Kafka ETL pipelines for live POS tips on a platform with $5B+ in disbursements.'],
      ['FAILURE RECOVERY', 'Cut failed tip transactions by 90% with retries, timeouts and Kafka re queuing.'],
      ['AUTOMATION', 'Cut manual recovery by 80% with Azure Functions automation.'],
    ],
    extra: 'Demoed features to 50+ senior engineers and managers; ran Agile ceremonies in Jira and Confluence.',
    btn: { label: 'LETTER OF RECOMMENDATION' },
  },
  {
    name: 'Chapter 1 · Skill Squirrel', num: '01', company: 'SKILL SQUIRREL', section: 'MISSION LOG',
    meta: 'Jr. Software Developer · May 2024 to Nov 2024 · Mississauga, ON',
    cards: [
      ['GENAI PIPELINE', 'Python GenAI pipeline with Azure AI Vision and Azure OpenAI for badge enhancement via OCR and image generation.'],
      ['BADGE MAKER UI', 'React and TypeScript Badge Maker UI with live previews and state driven customization.'],
    ],
  },
  {
    name: 'Prologue · Sheridan College', num: '00', company: 'SHERIDAN COLLEGE', section: 'PROLOGUE',
    meta: 'Honours Bachelor of Computer Science, Data Analytics · Sep 2021 to Apr 2026 · Oakville, ON',
    cards: [
      ['DEGREE', 'Honours Bachelor of Computer Science, Data Analytics.'],
      ['HONOURS', "Valedictorian Nominee, Batch of '26."],
    ],
  },
];

export interface Award {
  event: string;
  result: string;
  team: string;
  year: string;
  /** Shown when the row is expanded. */
  details: string;
  /** Project id to link to from the expanded row. */
  project?: string;
  /** Event photo, e.g. '/media/awards/capstone.jpg'. Placeholder until set. */
  image?: string;
}

export const AWARDS: Award[] = [
  {
    event: 'CS Capstone, Sheridan', result: 'First Place', team: 'Capstone team', year: '2025', project: 'cricket',
    details: 'Led our capstone team to first place with AI Cricket Coach, a mobile app that tracks ball trajectory and recommends the ideal shot.',
  },
  {
    event: 'Google Solution Challenge', result: 'Top 3, North America', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: 'Ember, our XR firefighter helmet, placed in the top 3 in North America and was presented to Google engineers in New York City.',
  },
  {
    event: 'Hack Canada', result: 'Google Build With AI and SPUR tracks', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: 'Ember won two prize tracks: Google Build With AI and SPUR.',
  },
  {
    event: 'DeerHacks, UofT', result: '2nd Place and Best Use of Vultr', team: 'Rocky team', year: '2026', project: 'rocky',
    details: 'Rocky, a real time child safety monitor running Mixtral 8x22B on Vultr, took 2nd place overall and Best Use of Vultr.',
  },
  {
    event: 'GenAI Genesis, UofT', result: 'Best AI Hack by IBM', team: 'Voxel team', year: '2026', project: 'voxel',
    details: 'Voxel, an agentic 3D research pipeline built on IBM Langflow and watsonx, won Best AI Hack from IBM.',
  },
  {
    event: 'YorkU Hackathon', result: '5th of 60', team: 'Prismarine team', year: '2026', project: 'prismarine',
    details: 'Prismarine, an AI research discovery tool with a 3D paper graph and audio summaries, placed 5th of 60 teams.',
  },
  {
    event: 'Hackville', result: 'Best UI Design', team: 'Hackville team', year: 'TBC',
    details: 'Best UI Design award. Details coming soon.',
  },
];

/** Experience › Leadership. Same shape and layout as the professional chapters. */
export const LEADERSHIP: Chapter[] = [
  {
    name: 'BearHacks 2026', num: '04', company: 'BEARHACKS 2026', section: 'COMMAND LOG',
    meta: 'Director · Dec 2025 to Apr 2026 · Mississauga, ON',
    cards: [
      ['EVENT', "Led Mississauga's largest hackathon: 7 teams of 41 organizers, 22 sponsors and $17K in funding, for 300+ participants."],
      ['EVENT SITE', 'Built the event site in React and TypeScript; it reached 12.49k monthly visits across 84 countries.'],
      ['RECOGNITION', 'Nominated for the Bruno Team Leadership Award and the Student Leadership Award.'],
    ],
  },
  {
    name: 'GDG Sheridan', num: '03', company: 'GOOGLE DEVELOPER GROUP SHERIDAN', section: 'COMMAND LOG',
    meta: 'Vice President · Sheridan College',
    cards: [
      ['COMMUNITY', "Helped lead Sheridan's largest tech club, 800+ members, through 21 events."],
      ['WORKSHOPS', 'Ran workshops on DSA and LeetCode with 100+ attendees.'],
      ['GOOGLE I/O', 'Selected by Google to attend I/O in Mountain View.'],
    ],
  },
  {
    name: 'Sheridan Datathon 2025', num: '02', company: 'SHERIDAN DATATHON 2025', section: 'COMMAND LOG',
    meta: 'Founder · 2025', cards: [], extra: 'Details coming soon.',
  },
  {
    name: 'Hackville 2025', num: '01', company: 'HACKVILLE 2025', section: 'COMMAND LOG',
    meta: 'Organizer · 2025', cards: [], extra: 'Details coming soon.',
  },
];

export interface Resume {
  id: string;
  label: string;
  /** Path to the PDF, from the site root. Put the files in /public. */
  file: string;
  note?: string;
  updated?: string;
}

/** Résumé variants. The first one is the main résumé and opens by default. */
export const RESUMES: Resume[] = [
  { id: 'main', label: 'Software and AI', file: RESUME_HREF, note: 'My main résumé, for software and AI engineering roles.' },
  // Add variants below, e.g.:
  // { id: 'ml', label: 'ML Engineering', file: '/resumes/ml.pdf', note: 'Focused on ML and MLOps work.' },
  // { id: 'backend', label: 'Backend Systems', file: '/resumes/backend.pdf' },
];

export const USE: Record<string, string> = {
  Proprio: 'Rebuilt evaluation for a sensor ML model, found 5 data leaks, and built event driven ingestion with S3, RabbitMQ and PostgreSQL tracked in MLflow and DVC.',
  'Cricket Coach': 'YOLOv8 ball tracking, RANSAC pitch mapping and a Random Forest shot model in a Flutter app, deployed on GCP with Terraform.',
  Ember: 'C++ and OpenCV HUD compositing, multi threaded sensor fusion on Linux, and a Kotlin Wear OS biometric stream.',
  Dayforce: 'C#/.NET REST APIs for Wallet Gateway microservices, event driven Kafka ETL pipelines for live tip transactions, and Azure Functions recovery automation.',
  Mercato: 'Spring Boot microservices with Kafka events, Keycloak security, Docker and Kubernetes, and an Angular front end.',
  'BearHacks site': 'Built the BearHacks 2026 event site in React and TypeScript; it reached 12.49k monthly visits across 84 countries.',
  Rocky: 'Next.js and TypeScript parent dashboard with a multi stage LLM pipeline and Mixtral served through Ollama on Vultr.',
  'Skill Squirrel': 'Python GenAI pipeline with Azure AI Vision and Azure OpenAI, plus a React and TypeScript Badge Maker UI.',
  Voxel: 'Agent orchestration in IBM Langflow with watsonx prompt refinement and Db2 storage.',
  Prismarine: 'FastAPI back end with a Next.js front end, Gemini, Snowflake Cortex translation and ElevenLabs audio summaries.',
};

export const OVERRIDE: Record<string, string> = {
  'Kafka|Dayforce': 'Maintained event driven Kafka ETL pipelines for live tip transactions and added retry, timeout and re queue handling that cut failures by 90%.',
  'Kafka|Mercato': 'Kafka for asynchronous events between Spring Boot services.',
};

export const skillUse = (skill: string, where: string) => OVERRIDE[`${skill}|${where}`] ?? USE[where] ?? '';

export const SKILLS: [string, [string, string[]][]][] = [
  ['LANGUAGES', [
    ['Python', ['Proprio', 'Cricket Coach', 'Ember']], ['C# / .NET', ['Dayforce']], ['Java', ['Mercato', 'Proprio']],
    ['TypeScript', ['BearHacks site', 'Rocky', 'Skill Squirrel']], ['C++', ['Ember']], ['Kotlin', ['Ember']], ['SQL', ['Dayforce']],
  ]],
  ['ML AND AI', [
    ['PyTorch', ['Proprio']], ['scikit learn', ['Proprio']], ['OpenCV', ['Ember', 'Cricket Coach']],
    ['MLflow and DVC', ['Proprio']], ['LLM tooling', ['Rocky', 'Voxel', 'Prismarine']],
  ]],
  ['SYSTEMS AND CLOUD', [
    ['Kafka', ['Dayforce', 'Mercato']], ['Spring Boot', ['Mercato', 'Proprio']], ['Docker and Kubernetes', ['Mercato']],
    ['GCP and Terraform', ['Cricket Coach']], ['Azure', ['Dayforce', 'Skill Squirrel']], ['RabbitMQ', ['Proprio']],
  ]],
];

export const PROFILE = {
  name: 'TAIMOOR ALEEM',
  role: 'AI Engineer · Software Developer',
  status: 'Open to new grad roles',
  bio: 'I like building systems that run fast on real hardware, and I care more about honest evaluation than impressive numbers.',
  now: {
    title: 'Founding Engineer, IgnisXR',
    text: 'Building Ember, an XR helmet for firefighters: edge inference on a Coral TPU, multi threaded sensor fusion and a wearable biometric stream.',
  },
  seeking: 'New grad software and AI engineering roles, in the GTA or remote.',
  stats: [
    { value: '7', label: 'Awards', caption: 'mostly hackathons' },
    { value: '21', label: 'Events run', caption: 'GDG Sheridan' },
    { value: '300+', label: 'Hackers hosted', caption: 'BearHacks 2026' },
    { value: '3', label: 'Roles', caption: 'IgnisXR, Dayforce, Skill Squirrel' },
  ],
  facts: [
    ['Based in', 'Toronto, ON (GTA)'],
    ['Education', "Hon. BCS, Data Analytics · Sheridan '26"],
    ['Focus', 'Edge ML · sensor fusion · backend systems'],
    ['Honours', 'Valedictorian Nominee'],
  ] as [string, string][],
  /** Leave empty to show "coming soon". */
  offDuty: [] as string[],
};

export const LINKS: { label: string; value: string; short: string; href: string; gold?: boolean }[] = [
  { label: 'Email', value: EMAIL, short: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/TaimoorAleem', short: 'in/TaimoorAleem', href: 'https://linkedin.com/in/TaimoorAleem' },
  { label: 'GitHub', value: 'github.com/TaimoorAleem', short: 'TaimoorAleem', href: GH },
  { label: 'Résumé', value: 'View and download', short: 'View', href: '#/resume', gold: true },
];

export const NEWS = { lead: 'Ember presented to ', hl: 'Google engineers in NYC', projectId: 'ember' };
