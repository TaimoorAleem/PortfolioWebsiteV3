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

/** One image in a slideshow or gallery; without `src` it renders as a labelled placeholder. */
export interface SlideData { src?: string; label: string }

export type ProjectGroup = 'personal' | 'academic' | 'hackathons';

export interface Project {
  id: string;
  name: string;
  short: string;
  /** Shows in the Featured tab and gets the gold corner. */
  featured?: boolean;
  isNew?: boolean;
  /** Which of the Personal / Academic / Hackathons tabs it appears in. */
  groups: ProjectGroup[];
  gold: string;
  blue: string;
  desc: Seg[];
  cards: [string, string][];
  stats: Stat[];
  stack: string[];
  /** Buttons appear only for links that are set. Awards are listed from AWARDS (by `project`). */
  links: { github?: string; devpost?: string; article?: string; demo?: string; video?: string; report?: string };
  /** Placeholder caption, and alt text for the images. */
  media: string;
  /** Slideshow images, e.g. ['/media/projects/ember-1.jpg', '/media/projects/ember-2.jpg']. Landscape, 16:9 works best. */
  images?: string[];
}

export const GH = 'https://github.com/TaimoorAleem';
export const EMAIL = 'taimooraleem01@gmail.com';
/** Google Drive file id of the résumé. The site always shows the file's current version. */
const RESUME_DRIVE_ID = '1ih7eesc2ERyomhJ1jvsg87G3FWbXinxY'; // also in api/resume-source.js

/**
 * Site-wide images. Drop files in /public/media and set the path here ('' = show the placeholder).
 * Paths are from the site root, e.g. '/media/portrait.jpg'.
 */
export const MEDIA = {
  /** Profile portrait. */
  portrait: '/media/portrait/avatar.jpg',
  /** Desktop home "LATEST" card (Ember team photo). */
  latest: '/media/projects/ember/google-office-group.jpg',
  /** Desktop home tile: BearHacks 2026. */
  bearhacks: '/media/linkedin/bearhacks/2026-recap-02-ceremony-crowd.jpg',
  /** Desktop home tile: AI Cricket Coach. */
  cricket: '/media/projects/cricket/title-slide.jpg',
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

/** Medium post about AI Cricket Coach (also on the Blogs page). */
export const CAPSTONE_POST = 'https://medium.com/@taimooraleem01/my-capstones-journey-from-eoi-to-the-first-place-award-3cf3036c84ad';

export const PROJECTS: Project[] = [
  {
    id: 'ember', name: 'Ember (IgnisXR)', short: 'Ember', featured: true,
    gold: 'XR FIREFIGHTER HELMET', blue: 'Edge ML and sensor fusion',
    desc: [
      { t: 'A helmet system that lets firefighters see through smoke, and lets their commander see what they see. Built with the ' },
      { t: 'IgnisXR', hl: true },
      { t: ' team at Hack Canada; we now run detection on a Coral Edge TPU at 70 FPS.' },
    ],
    cards: [
      ['LIVE HELMET FEED', "A phone on the helmet streams video to the commander's HUD over WebRTC, with stream health on screen."],
      ['OBJECT DETECTION', 'Detections are drawn over the feed and ranked by priority: people first, then vehicles and obstacles.'],
      ['VITALS FROM THE WRIST', 'A Kotlin Wear OS app streams heart rate, SpO2, skin temperature and heading to the HUD over WebSocket.'],
      ['WAY BACK OUT', 'Compass guidance and a Three.js return path help the firefighter retrace their route out of a room.'],
    ],
    stats: [
      { label: 'Inference', value: '7×', caption: '10 to 70 FPS', tech: ['Coral', 'OpenCV', 'Linux'] },
      { label: 'Sensors', value: '3', caption: 'depth, thermal, vision', tech: ['C++', 'Python'] },
      { label: 'Wearable', value: '1 Hz', caption: 'biometric stream', tech: ['Kotlin', 'Wear OS'] },
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'WebRTC', 'Three.js', 'Kotlin', 'Wear OS', 'Coral'],
    links: { github: `${GH}/Ember`, devpost: 'https://devpost.com/software/ember-xwdyzl' },
    media: 'Ember', groups: ['hackathons'], images: ['/media/projects/ember/gsc-nyc-helmet.jpg', '/media/projects/ember/gsc-nyc-demo.jpg', '/media/projects/ember/google-office-group.jpg', '/media/projects/ember/helmet-rig.jpg', '/media/projects/ember/hud-lidar.jpg', '/media/projects/ember/hud-thermal.jpg', '/media/projects/ember/demo-headset.jpg', '/media/projects/ember/demo-laptop.jpg', '/media/projects/ember/wearos-biometrics.jpg', '/media/projects/ember/command-dashboard.jpg', '/media/linkedin/hackathons/hack-canada/01-helmet-prototype.jpg', '/media/linkedin/hackathons/hack-canada/03-testing.jpg', '/media/linkedin/gsc/top3-03-helmet.jpg', '/media/linkedin/gsc/win-07-hud.jpg', '/media/linkedin/ember/fire-station-01-team.jpg', '/media/linkedin/ember/fire-station-10-trying-prototype.jpg'],
  },
  {
    id: 'proprio', name: 'Proprio', short: 'Proprio', isNew: true, featured: true,
    gold: 'ML PIPELINE', blue: 'MLOps and sensor ML',
    desc: [
      { t: 'Recognizes barbell exercises and counts reps from a smartwatch on your wrist. ' }
    ],
    cards: [
      ['EXERCISE RECOGNITION', 'Tells bench press, squat, deadlift, overhead press and row apart: 96 to 99% of sets right on people it never saw.'],
      ['REP COUNTING', 'Counts reps from the same accelerometer and gyroscope stream the watch records.'],
      ['WATCH AND PHONE APPS', 'A Wear OS recorder logs whole sessions at 50 Hz with zero gaps; the phone app labels sets and uploads them.'],
      ['ANY WATCH, ANY ANGLE', "A shared sensor format converts other watches' data with no accuracy loss, and still works with the watch 15° off."],
    ],
    stats: [
      { label: 'Accuracy', value: '96.3%', caption: 'honest LOOCV, from 99.9%', tech: ['scikit learn', 'PyTorch'] },
      { label: 'Benchmark', value: '98.6%', caption: '7,360 windows', tech: ['Python'] },
      { label: 'Robustness', value: '7×', caption: 'misalignment tolerance', tech: ['PyTorch'] },
    ],
    stack: ['Python', 'PyTorch', 'scikit learn', 'MLflow', 'DVC', 'Kotlin', 'Wear OS', 'Spring Boot', 'RabbitMQ', 'PostgreSQL'],
    links: { github: `${GH}/Proprio` },
    media: 'Proprio', groups: ['personal'], images: ['/media/projects/proprio/exercises.jpg', '/media/projects/proprio/rotation-sensitivity.png'],
  },
  {
    id: 'mercato', name: 'Mercato', short: 'Mercato',
    gold: 'DISTRIBUTED COMMERCE PLATFORM', blue: 'Microservices platform',
    desc: [{ t: 'An online store built as an Angular storefront in front of five Spring Boot services: gateway, products, orders, inventory and notifications.' }],
    cards: [
      ['SIGN IN ONCE', 'Keycloak login in the storefront; the gateway checks every token, so the services never handle auth themselves.'],
      ['STOCK-CHECKED ORDERS', 'An order is only accepted after a live inventory check, guarded by a circuit breaker, retries and a time limit.'],
      ['HONEST FAILURES', 'Out of stock and inventory down come back as different errors (409 vs 503) instead of one misleading "no".'],
      ['ORDER EMAILS', 'Each order publishes an Avro event on Kafka, which a notification service turns into a confirmation email.'],
    ],
    stats: [
      { label: 'Gateway', value: 'JWT', caption: 'Keycloak and OIDC', tech: ['Spring Boot', 'Keycloak'] },
      { label: 'Events', value: 'Kafka', caption: 'async between services', tech: ['Kafka'] },
      { label: 'Services', value: '5', caption: 'behind one gateway', tech: ['Spring Boot', 'Docker'] },
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Keycloak', 'Angular', 'MySQL', 'MongoDB', 'Docker'],
    links: { github: `${GH}/Mercato` },
    media: 'Mercato', groups: ['personal'], images: ['/media/projects/mercato/architecture.png'],
  },
  {
    id: 'rocky', name: 'Rocky', short: 'Rocky',
    gold: 'DEERHACKS, 2ND PLACE', blue: 'Real time child safety monitor',
    desc: [{ t: 'A wearable concept that looks out for kids: it picks up bullying, a fall or a panic spike, and tells the parent what happened and what to do next.' }],
    cards: [
      ['LISTENS FOR TROUBLE', 'Audio is transcribed in 30 second chunks and screened against 180+ distress phrases; clean audio is thrown away.'],
      ['PRIVATE AI REVIEW', 'Flagged moments go to a self-hosted Mixtral 8x22B on Vultr, with heart rate, motion and location, for a severity call.'],
      ['PARENT ALERTS', 'Gemini writes a plain-language report with next steps, pushed to the dashboard and the OS the moment it lands.'],
      ['SIMULATION STUDIO', "No wearable yet, so a studio uses your laptop's mic and location plus simulated falls to run the whole pipeline."],
    ],
    stats: [
      { label: 'Placement', value: '2nd', caption: 'DeerHacks, UofT', tech: ['Next.js'] },
      { label: 'Phrases', value: '180+', caption: 'distress keyword filter', tech: ['ElevenLabs'] },
      { label: 'Model', value: '8x22B', caption: 'Mixtral on Vultr', tech: ['Ollama', 'Vultr'] },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'ElevenLabs', 'Ollama', 'Vultr', 'Gemini API'],
    links: { github: `${GH}/Rocky`, devpost: 'https://devpost.com/software/lumo-2hd6ka' },
    media: 'Rocky', groups: ['hackathons'], images: ['/media/linkedin/hackathons/deerhacks/01-rocky-device.jpg', '/media/linkedin/hackathons/deerhacks/03-wear-os-app.jpg', '/media/projects/rocky/dashboard.jpg', '/media/projects/rocky/watch-home.jpg', '/media/projects/rocky/watch-vitals.jpg', '/media/projects/rocky/alerts.jpg', '/media/projects/rocky/analytics.jpg', '/media/projects/rocky/simulation-studio.jpg', '/media/projects/rocky/landing.jpg', '/media/projects/rocky/wearable-concept.jpg'],
  },
  {
    id: 'prismarine', name: 'Prismarine', short: 'Prismarine',
    gold: 'YORKU HACKATHON, 5TH OF 60', blue: 'AI research discovery tool',
    desc: [{ t: 'A visual search engine for research: it finds papers related by meaning across arXiv, PubMed Central and Semantic Scholar, and lays them out in 3D.' }],
    cards: [
      ['3D PAPER UNIVERSE', 'Explore related papers as an interactive 3D graph you can zoom, rotate and click through.'],
      ['RELATED BY MEANING', 'Links papers by Gemini embeddings and nearest neighbours, so it finds connections citations miss.'],
      ['LISTEN TO PAPERS', 'ElevenLabs reads paper summaries aloud.'],
      ['PLAIN LANGUAGE', 'Snowflake Cortex rewrites jargon into everyday or code-mixed language, like Hinglish, keeping key terms.'],
    ],
    stats: [
      { label: 'Placement', value: '5th', caption: 'of 60 teams', tech: ['FastAPI'] },
      { label: 'Sources', value: '3', caption: 'arXiv, PMC, Semantic Scholar', tech: ['Gemini API', 'Snowflake'] },
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'Three.js', 'Gemini API', 'Snowflake', 'ElevenLabs', 'MongoDB'],
    links: { github: `${GH}/Prismarine`, devpost: 'https://devpost.com/software/prismarine', demo: 'https://prismarine.yvesdonato.com/' },
    media: 'Prismarine', groups: ['hackathons'], images: ['/media/projects/prismarine/graph-3d.png', '/media/projects/prismarine/graph-2d.png', '/media/projects/prismarine/expanding.png', '/media/projects/prismarine/after-expansion.png', '/media/projects/prismarine/pdf-viewer.png', '/media/projects/prismarine/landing.png'],
  },
  {
    id: 'voxel', name: 'Voxel', short: 'Voxel',
    gold: 'BEST AI HACK USING IBM TECH', blue: 'AR and generative AI for learning',
    desc: [{ t: 'An AR learning headset concept: students explore 3D models in the room around them instead of on a textbook page. Built with my team at GenAI Genesis, UofT.' }],
    cards: [
      ['TEXT TO 3D', 'Describe an object and the app generates a 3D model you can place on a real surface in AR.'],
      ['SATURN V EXPLORER', 'Place a full Saturn V in the room, learn what each stage does, then watch it launch.'],
      ['LABELLED AR DIAGRAM', 'Floating cards point to each part of the rocket, so students learn by walking around it.'],
      ['KEYS STAY SAFE', "A small Dart server runs the 3D generation steps, so the API key never ships on the phone."],
    ],
    stats: [
      { label: 'Award', value: 'IBM', caption: 'Best AI Hack', tech: ['Flutter'] },
      { label: 'Modes', value: '3', caption: 'generate, explore, diagram', tech: ['Flutter', 'Dart'] },
    ],
    stack: ['Flutter', 'Dart', 'ARCore', 'ARKit', 'Meshy API'],
    links: { github: `${GH}/Voxel`, devpost: 'https://devpost.com/software/voxel-pnxmlc' },
    media: 'Voxel', groups: ['hackathons'], images: ['/media/linkedin/hackathons/genai-genesis/11-voxel-award.jpg', '/media/projects/voxel/saturn-v-labels.jpg', '/media/projects/voxel/saturn-v-diagram.jpg', '/media/projects/voxel/plane-detection.jpg', '/media/projects/voxel/rocket-launch.jpg', '/media/projects/voxel/rocket-launch-2.jpg', '/media/projects/voxel/landing.png'],
  },
  {
    id: 'cricket', name: 'AI Cricket Coach', short: 'AI Cricket Coach', featured: true,
    gold: 'CAPSTONE, FIRST PLACE', blue: 'Computer vision coaching app',
    desc: [{ t: 'A mobile app that watches a practice delivery and tells the batter which shot to play. I led our team of four as project lead and lead mobile developer.' }],
    cards: [
      ['VIDEO UPLOAD', "Players record practice deliveries from the umpire's view and upload them straight from the app."],
      ['BALL TRAJECTORY', 'Computer vision pulls out ball speed, line, length and batter position from each video.'],
      ['IDEAL SHOT', 'A trained Random Forest model recommends the best shot for each delivery.'],
      ['PROGRESS AND COACHING', 'Players track shot quality and ball speed across sessions; coaches leave feedback on each delivery.'],
    ],
    stats: [
      { label: 'Ball tracking', value: '0.995', caption: 'YOLOv8 mAP@50', tech: ['Python', 'OpenCV'] },
      { label: 'Shot model', value: '87.9%', caption: '23 shot classes', tech: ['Python'] },
      { label: 'Latency', value: '<10 s', caption: 'end to end', tech: ['Flutter', 'GCP'] },
    ],
    stack: ['Flutter', 'Dart', 'Python', 'OpenCV', 'scikit learn', 'GCP', 'Cloud Run', 'Firestore'],
    links: {
      github: `${GH}/AICricketCoach_CapstoneProject`,
      article: CAPSTONE_POST,
      video: 'https://www.youtube.com/watch?v=KgE6Eg26K0g',
      report: 'https://drive.google.com/file/d/16nV_F1458UqtXBYLwEqJtoV6RG1xtwq-/view?usp=sharing',
    },
    media: 'AI Cricket Coach', groups: ['academic'], images: ['/media/projects/cricket/title-slide.jpg', '/media/projects/cricket/delivery-details.jpg', '/media/projects/cricket/session-details.jpg', '/media/projects/cricket/performance-analytics.jpg', '/media/projects/cricket/upload-video.jpg', '/media/projects/cricket/user-profile.jpg', '/media/projects/cricket/trajectory-mapping.png', '/media/projects/cricket/yolo-training-batch.jpg'],
  },
];

/** Tabs on the Projects page and under PROJECTS on the home menu. */
export const PROJECT_TABS = [
  { id: 'featured', label: 'Featured' },
  { id: 'personal', label: 'Personal' },
  { id: 'academic', label: 'Academic' },
  { id: 'hackathons', label: 'Hackathons' },
] as const;

export const allIds = () => PROJECTS.map((p) => p.id);
export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);

/** Project ids in a tab (index into PROJECT_TABS). */
export function tabIds(tab: number): string[] {
  const id = PROJECT_TABS[tab]?.id ?? 'featured';
  return PROJECTS.filter((p) => (id === 'featured' ? p.featured : p.groups.includes(id))).map((p) => p.id);
}

/** Best tab for a project: the current one if it's there, otherwise the first that has it. */
export function tabFor(id: string, current = 0): number {
  if (tabIds(current).includes(id)) return current;
  const i = PROJECT_TABS.findIndex((_, t) => tabIds(t).includes(id));
  return i < 0 ? 0 : i;
}

/** Link buttons for a project, in display order; only links that are set. */
export function projectLinks(p: Project): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  if (p.links.github) out.push({ label: 'GITHUB', href: p.links.github });
  if (p.links.devpost) out.push({ label: 'DEVPOST', href: p.links.devpost });
  if (p.links.article) out.push({ label: 'READ ARTICLE', href: p.links.article });
  if (p.links.demo) out.push({ label: 'LIVE DEMO', href: p.links.demo });
  if (p.links.video) out.push({ label: 'WATCH DEMO', href: p.links.video });
  if (p.links.report) out.push({ label: 'PROJECT REPORT', href: p.links.report });
  return out;
}

/** Slides for a project: its images, or one placeholder until images are added. */
export const projectSlides = (p: Project): SlideData[] =>
  p.images?.length ? p.images.map((src, i) => ({ src, label: `${p.media} ${i + 1}` })) : [{ label: p.media }];

export interface Chapter {
  name: string;
  num: string;
  company: string;
  meta: string;
  section: string;
  cards: [string, string][];
  extra?: string;
  btn?: ActionLink;
  /** Gallery photos, e.g. ['/media/experience/dayforce-1.jpg']. Placeholders show until set. */
  images?: string[];
  /** Square logo shown left of the name; a monogram shows when unset. */
  logo?: string;
  /** Second column: events organized, newest first. */
  events?: { name: string; date: string; note?: string; href?: string }[];
}

/** Gallery slides for a chapter (four placeholders until images are added). */
export const chapterSlides = (c: Chapter): SlideData[] =>
  c.images?.length
    ? c.images.map((src, i) => ({ src, label: `${c.name} ${i + 1}` }))
    : [1, 2, 3, 4].map((n) => ({ label: `${c.company.toLowerCase()} photo ${n}` }));

export const EXPERIENCE: Chapter[] = [
  {
    logo: '/media/logos/ignisxr.png',
    name: 'Chapter 3 · IgnisXR', num: '03', company: 'IGNISXR', section: 'MISSION LOG',
    meta: 'Founding Engineer · Mar 2026 to Present · Toronto, ON',
    cards: [
      ['EDGE TPU', 'Integrated a Google Coral Edge TPU: 7× faster inference, from 10 to 70 FPS.'],
      ['TOF DETECTION', 'ToF person and door detection at 32 FPS with distance and bearing.'],
      ['VISION AND THERMAL', 'MobileNet SSD detections validated against live depth, plus thermal victim detection on an MLX90640 array.'],
      ['SENSOR FUSION', 'Multi threaded sensor fusion on Linux.'],
    ],
    images: ['/media/linkedin/ignisxr/may-recap-01-demo.jpg', '/media/linkedin/ignisxr/may-recap-05-hardware.jpg', '/media/linkedin/ignisxr/may-recap-03-cutc-booth.jpg', '/media/linkedin/ignisxr/stan-demo-03-ignisxr-pitch.jpg', '/media/linkedin/ignisxr/stan-demo-04-ignisxr.jpg', '/media/linkedin/gsc/top3-12-winning-3-slide.jpg', '/media/linkedin/gsc/nyc-11-ember-demo.jpg', '/media/linkedin/ember/fire-station-10-trying-prototype.jpg'],
  },
  {
    logo: '/media/logos/dayforce.png',
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
    images: ['/media/linkedin/dayforce/dayforce-logo.jpg', '/media/linkedin/gdg/dayforce-tech-interview-workshop-01.jpg', '/media/linkedin/datathon/2025-media-04-dayforce-workshop.jpg', '/media/linkedin/datathon/article-19-dayforce-booth.jpg'],
  },
  {
    logo: '/media/logos/skillsquirrel.png',
    name: 'Chapter 1 · Skill Squirrel', num: '01', company: 'SKILL SQUIRREL', section: 'MISSION LOG',
    meta: 'Jr. Software Developer · May 2024 to Nov 2024 · Mississauga, ON',
    cards: [
      ['GENAI PIPELINE', 'Python GenAI pipeline with Azure AI Vision and Azure OpenAI for badge enhancement via OCR and image generation.'],
      ['BADGE MAKER UI', 'React and TypeScript Badge Maker UI with live previews and state driven customization.'],
    ],
    images: ['/media/linkedin/skillsquirrel/skill-squirrel-logo.jpg'],
  },
  {
    name: 'Prologue · Sheridan College', num: '00', company: 'SHERIDAN COLLEGE', section: 'PROLOGUE',
    meta: 'Honours Bachelor of Computer Science, Data Analytics · Sep 2021 to Apr 2026 · Oakville, ON',
    cards: [
      ['DEGREE', 'Honours Bachelor of Computer Science, Data Analytics.'],
      ['HONOURS', "Valedictorian Nominee, Batch of '26."],
      ['LEADERSHIP AWARDS', '2026 Student Leadership Award and Bruno Team Leadership Award nominee.'],
    ],
    images: ['/media/linkedin/profile/profile-photo.jpg', '/media/linkedin/capstone/capstone-poster-abstract.jpg', '/media/linkedin/bearhacks/2026-bruno-award-nominees-poster.jpg'],
  },
];

export interface Award {
  event: string;
  result: string;
  team: string;
  year: string;
  /** Shown when the row is expanded. */
  details: string;
  /** Project id: links the row to that project and lists the award on the project. */
  project?: string;
  /** Photos, e.g. ['/media/awards/capstone-1.jpg']. Click to view them in an overlay. Placeholder until set. */
  images?: string[];
}

/** One row per award; an event with two prizes gets two rows. */
export const AWARDS: Award[] = [
  {
    event: 'CS Capstone, Sheridan', result: 'First Place', team: 'Capstone team', year: '2025', project: 'cricket',
    details: 'AI Cricket Coach ranked first among all 2025 CS capstones at Sheridan, across Data Analytics, Cloud Computing and Game Engineering, by student votes and faculty evaluation.',
    images: ['/media/linkedin/capstone/capstone-poster-abstract.jpg', '/media/projects/cricket/title-slide.jpg', '/media/projects/cricket/delivery-details.jpg'],
  },
  {
    event: 'Google Solution Challenge', result: 'Top 3, North America', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: 'Ember, our XR firefighter helmet, placed in the top 3 in North America: the only Canadian team and the only hardware project in the top three. Google flew us to Google NYC on August 21, 2026 to demo it.',
    images: ['/media/linkedin/gsc/top3-12-winning-3-slide.jpg', '/media/linkedin/gsc/win-01-welcoming-top3.jpg', '/media/projects/ember/google-office-group.jpg', '/media/projects/ember/gsc-nyc-demo.jpg', '/media/projects/ember/gsc-nyc-helmet.jpg', '/media/projects/ember/gsc-nyc-presentation.jpg', '/media/projects/ember/google-nyc-team.jpg', '/media/projects/ember/gsc-nyc-photobooth.jpg', '/media/projects/ember/nyc-trip-airport.jpg', '/media/linkedin/gsc/top10-04-finalist-email.jpg', '/media/linkedin/gsc/top10-05-cutc-demo-booth.jpg'],
  },
  {
    event: 'Hack Canada', result: 'Google Build With AI track', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: "Ember won Google's Build With AI prize track.",
    images: ['/media/linkedin/hackathons/hack-canada/07-winners.jpg', '/media/linkedin/hackathons/hack-canada/01-helmet-prototype.jpg', '/media/linkedin/hackathons/hack-canada/04-laptop-detection.jpg', '/media/projects/ember/demo-headset.jpg', '/media/projects/ember/demo-laptop.jpg', '/media/projects/ember/helmet-rig.jpg'],
  },
  {
    event: 'Hack Canada', result: 'SPUR startup track', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: 'Ember also won the Build a Real Canadian Startup track, sponsored by the SPUR Innovation Center, out of 600+ hackers.',
    images: ['/media/linkedin/hackathons/hack-canada/07-winners.jpg', '/media/projects/ember/demo-laptop.jpg', '/media/projects/ember/hud-thermal.jpg'],
  },
  {
    event: 'DeerHacks, UofT', result: '2nd Place', team: 'Rocky team', year: '2026', project: 'rocky',
    details: 'Rocky, a real time child safety monitor, took 2nd place overall.',
    images: ['/media/linkedin/hackathons/deerhacks/02-team-prizes.jpg', '/media/awards/deerhacks-2026-team.jpg', '/media/projects/rocky/dashboard.jpg'],
  },
  {
    event: 'DeerHacks, UofT', result: 'Best Use of Vultr', team: 'Rocky team', year: '2026', project: 'rocky',
    details: "Rocky's private AI review runs Mixtral 8x22B on our own Vultr server, which won Best Use of Vultr.",
    images: ['/media/linkedin/hackathons/deerhacks/02-team-prizes.jpg', '/media/awards/deerhacks-2026-team.jpg', '/media/projects/rocky/simulation-studio.jpg'],
  },
  {
    event: 'GenAI Genesis, UofT', result: 'Best AI Hack using IBM Tech', team: 'Voxel team', year: '2026', project: 'voxel',
    details: 'Voxel, an AR learning headset concept with generative 3D models, won Best AI Hack using IBM Tech. The prize was a tour of IBM’s Markham office.',
    images: ['/media/linkedin/hackathons/genai-genesis/11-voxel-award.jpg', '/media/linkedin/hackathons/genai-genesis/02-ibm-prize.jpg', '/media/linkedin/hackathons/genai-genesis/12-team-ibm-box.jpg', '/media/linkedin/hackathons/genai-genesis/ibm-tour-07-group.jpg', '/media/projects/voxel/saturn-v-labels.jpg', '/media/projects/voxel/plane-detection.jpg'],
  },
  {
    event: 'CTRL+HACK+DEL 2.0, YorkU', result: '5th of 60', team: 'Prismarine team', year: '2026', project: 'prismarine',
    details: 'Prismarine, a 3D visual search engine for research papers, placed 5th of 60 teams.',
    images: ['/media/linkedin/hackathons/ctrl-hack-del/02-hall.jpg', '/media/projects/prismarine/graph-3d.png', '/media/projects/prismarine/graph-2d.png'],
  },
  {
    event: 'Hackville', result: 'Best UI Design', team: 'BuddyFinder team', year: '2024',
    details: 'Won Best UI Design (valued at $400, sponsored by Tempo Labs) with BuddyFinder, as the team\'s only front-end developer.',
    images: ['/media/linkedin/hackville/2024-best-ui-team.jpg', '/media/linkedin/hackville/2024-closing-ceremony.jpg', '/media/awards/hackville-2024-team.jpg', '/media/projects/buddyfinder/welcome.jpg', '/media/projects/buddyfinder/home.jpg', '/media/projects/buddyfinder/edit-profile.jpg'],
  },
];

/** Awards won by a project, in AWARDS order. */
export const projectAwards = (id: string) => AWARDS.filter((a) => a.project === id);

/** Slides for an award's photos (placeholder until images are added). */
export const awardSlides = (a: Award): SlideData[] =>
  a.images?.length ? a.images.map((src, i) => ({ src, label: `${a.event} ${i + 1}` })) : [{ label: `${a.event} photo` }];

/** Experience › Leadership. Same shape and layout as the professional chapters. */
/** Index of a Leadership chapter by name (0 if missing), so links survive reordering. */
export const leadershipIndex = (name: string) => Math.max(0, LEADERSHIP.findIndex((c) => c.name === name));

export const LEADERSHIP: Chapter[] = [
  {
    logo: '/media/logos/gdg.png',
    name: 'GDG Sheridan', num: '', company: 'GOOGLE DEVELOPER GROUP SHERIDAN', section: 'COMMAND LOG',
    meta: 'Vice President',
    cards: [],
    btn: { label: 'GDG COMMUNITY PAGE', href: 'https://gdg.community.dev/gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
    events: [
      { name: 'BearHacks 2026', date: 'Apr 2026', note: 'Missisauga\'s Largest Hackathon', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-build-with-ai-bearhacks-2026/' },
      { name: 'Google Solutions Challenge Kick-Off Session', date: 'Mar 2026', note: 'Virtual info session for Google\'s largest regional hackathon.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-google-solutions-challenge-kick-off/' },
      { name: 'Founders Fireside Chat', date: 'Mar 2026', note: 'Fireside chat with founders and speed networking.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-founders-fireside-chat/' },
      { name: 'Hackville 2025', date: 'Jan 2026', note: 'Canada\'s first college-run hackathon.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-hackville-build-with-ai/' },
      { name: 'Intern Fireside Chat', date: 'Jan 2026', note: 'Partnered with SCSC: panel session of current and former student interns.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-intern-fireside-chat/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
      { name: 'DevFest 2025', date: 'Nov 2025', note: 'Partnered with GDG Mississauga.', href: 'https://gdg.community.dev/events/details/google-gdg-mississauga-presents-gdg-mississauga-x-gdg-sheridan-devfest-2025/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
      { name: 'Sheridan Datathon 2025', date: 'Nov 2025', note: 'Founder. 24-hour data science and AI hackathon: 200+ participants, 37 projects.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-sheridan-datathon-2025-build-with-ai/' },
      { name: 'Why Your AI App Breaks at Scale', date: 'Oct 2025', note: 'System Design Workshop paired with \'Social Battery\' networking right after.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-system-design-workshop-why-your-ai-app-breaks-at-scale-and-how-to-fix-it/' },
      { name: 'Design Workshop: Foundations of UI/UX', date: 'Oct 2025', note: 'Hands-on intro to UI/UX design.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-design-workshop-foundations-of-uiux/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
      { name: 'Building Scalable Social Features with Serverless', date: 'Sep 2025', note: 'System Design Workshop.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-building-scalable-social-features-with-serverless-architecture/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
      { name: 'Foundations of Language Processing: Tokens to ASTs', date: 'Jul 2025', note: 'Virtual workshop.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-foundations-of-language-processing-from-tokens-to-asts/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
      { name: 'Intro to Blockchain and Polkadot', date: 'Jun 2025', note: 'Beginner-friendly blockchain workshop.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-blockchain-gdg-on-campus-sheridan-college-presents-intro-to-blockchain-and-polkadot/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
      { name: 'BearHacks 2025', date: 'Mar 2025', note: 'Sheridan\'s first hybrid hackathon. All preparations done within a month.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-build-with-ai-bearhacks-2025/' },
      { name: 'Google Solution Challenge 2025 Info Session', date: 'Mar 2025', note: 'Virtual: forming teams and tackling real-world problems.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-google-solution-challenge-2025-north-america-info-session/' },
      { name: 'Blind LeetCode 75 Jam', date: 'Mar 2025', note: 'Group session on the Blind 75 problems.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-gdg-on-campus-sheridan-college-blind-leetcode-75-jam/' },
      { name: 'March Monthly Meetup: Kaggle Workshop', date: 'Mar 2025', note: 'Hands-on Kaggle AI and ML workshop, then a LeetCode competition.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-gdg-on-campus-sheridan-college-monthly-meetup-build-with-ai-1/' },
      { name: 'Kaggle Week 2: Build with AI', date: 'Feb 2025', note: 'Pandas and intermediate ML, part of the ML Study Jam.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-gdg-on-campus-kaggle-week-2-build-with-ai/' },
      { name: 'February Monthly Meetup: ML Study Jam Kickoff', date: 'Feb 2025', note: 'Kickoff for the ML Study Jam and Kaggle path.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-gdg-on-campus-sheridan-college-monthly-meetup-build-with-ai/' },
      { name: 'Hackville 2025', date: 'Jan 2025', note: 'Organized TensorFlow workshop and crafted Google Cloud prize track.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-build-with-ai-hackville-2025/' },
      { name: 'November Monthly Meetup: Google Cloud Lab', date: 'Nov 2024', note: 'Google Cloud lab and Launchpad insights.', href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada-presents-gdg-on-campus-sheridan-college-monthly-meetup/' },
      { name: 'DevFest 2024', date: 'Nov 2024', note: 'Partnered with GDG Mississauga', href: 'https://gdg.community.dev/events/details/google-gdg-mississauga-presents-gdg-mississauga-x-gdg-sheridan-devfest-2024/cohost-gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/' },
    ],
    images: ['/media/linkedin/gdg/system-design-workshop-01-group.jpg', '/media/linkedin/gdg/system-design-workshop-02-room.jpg', '/media/linkedin/gdg/system-design-workshop-04-speaker.jpg', '/media/linkedin/gdg/system-design-workshop-05-audience.jpg', '/media/linkedin/gdg/dayforce-tech-interview-workshop-01.jpg', '/media/linkedin/gdg/dayforce-tech-interview-workshop-02.jpg', '/media/linkedin/gdg/devfest-2024-talk.jpg', '/media/linkedin/misc/google-io-2026-06-gdg.jpg'],
  },
  {
    name: 'VisionHacks', num: '05', company: 'VISIONHACKS', section: 'COMMAND LOG',
    meta: 'Coming soon',
    cards: [],
    extra: 'Coming soon.',
  },
  {
    logo: '/media/logos/bearhacks.png',
    name: 'BearHacks 2026', num: '04', company: 'BEARHACKS 2026', section: 'COMMAND LOG',
    meta: 'Co-Director',
    cards: [
      ['EVENT', "Co-directed Mississauga's largest hackathon with Imran Yafith, leading 7 teams of 41 organizers: 300+ participants and 65+ projects over 36 hours."],
      ['RECORD TURNOUT', '700+ applications, and 100+ RSVPs within an hour of sending acceptances, a record for hackathons at Sheridan.'],
      ['SPONSORS', '22 sponsors, including the City of Mississauga, Scotiabank, Tangerine, ElevenLabs, siberX and Red Bull, and $10,000 in prizes.'],
      ['RECOGNITION', 'Nominated for the Bruno Team Leadership Award; covered by INSAUGA. No post-event survey rated it below 4 out of 5.'],
    ],
    extra: 'Built the event site in React and TypeScript; it reached 12.49k monthly visits across 84 countries.',
    images: ['/media/linkedin/bearhacks/2026-recap-02-ceremony-crowd.jpg', '/media/linkedin/bearhacks/2026-recap-06-organizer-team.jpg', '/media/linkedin/bearhacks/2026-recap-07-co-directors.jpg', '/media/linkedin/bearhacks/2026-recap-03-atrium-hacking.jpg', '/media/linkedin/bearhacks/2026-recap-05-hacking-room.jpg', '/media/linkedin/bearhacks/2026-recap-04-hardware-hack.jpg', '/media/linkedin/bearhacks/2026-team-01-leadership.jpg', '/media/linkedin/bearhacks/2026-insauga-article.jpg', '/media/linkedin/bearhacks/2026-bruno-award-nomination-certificate.jpg', '/media/linkedin/bearhacks/2026-website.jpg', '/media/linkedin/bearhacks/2026-3d-printed-medal.jpg', '/media/linkedin/bearhacks/2026-recap-01-sunset-window.jpg'],
  },
  {
    logo: '/media/logos/datathon.png',
    name: 'Sheridan Datathon 2025', num: '03', company: 'SHERIDAN DATATHON 2025', section: 'COMMAND LOG',
    meta: 'Founder',
    cards: [
      ['FOUNDED', 'Founded and led the largest event in GDG Sheridan history over eight months. Managed 50+ organizers and volunteers, and handling sponsorships, design, workshops, prize tracks, budget and logistics.'],
      ['TURNOUT', '200+ participants and 37 projects. RSVPs passed 300 and check-ins hit the 200-person venue cap within 2 hours.'],
      ['THEME', 'Data Science for Social Good, built around the 17 UN Sustainable Development Goals.'],
      ['JUDGING', 'Recruited and briefed 12 judges and 8 mentors, and ran 5 workshops and the demos for all 37 teams.'],
    ],
    extra: '',
    btn: { label: 'READ THE BEHIND THE SCENES', href: 'https://www.linkedin.com/pulse/organizing-sheridan-datathon-2025-behind-the-scenes-aleem-dcdwe/' },
    images: ['/media/linkedin/datathon/2025-media-01-opening-ceremony.jpg', '/media/linkedin/datathon/2025-01-founder-badge.jpg', '/media/linkedin/datathon/2025-06-full-room.jpg', '/media/linkedin/datathon/2025-05-co-leads-presenting.jpg', '/media/linkedin/datathon/2025-media-06-judges-briefing.jpg', '/media/linkedin/datathon/2025-media-07-project-demos.jpg', '/media/linkedin/datathon/2025-media-04-dayforce-workshop.jpg', '/media/linkedin/datathon/article-26-google-cloud-prizes.jpg', '/media/linkedin/datathon/2025-02-organizers.jpg', '/media/linkedin/datathon/article-03-official-poster.jpg'],
  },
  {
    logo: '/media/logos/bearhacks.png',
    name: 'BearHacks 2025', num: '02', company: 'BEARHACKS 2025', section: 'COMMAND LOG',
    meta: 'Co-organizer and mentor · GDG Sheridan Outreach Lead · Apr 2025',
    cards: [
      ['GOOGLE SPONSORSHIP', 'Secured $1,750+ from Google and set up the Best Use of TensorFlow prize track and two technical workshops.'],
      ['LOGISTICS', "Ran registrations and participant check-in for 260+ hackers at Sheridan's first hybrid hackathon."],
      ['MENTORING', 'Mentored teams on ASP.NET Core and React.'],
    ],
    extra: 'Co-organized by GDG Sheridan, the Sheridan Computer Science Club and the Pixel Perfect Club, and prepared in a month.',
    images: ['/media/linkedin/bearhacks/2025-07-group-photo.jpg', '/media/linkedin/bearhacks/2025-01-organizer-badges.jpg', '/media/linkedin/bearhacks/2025-03-hall.jpg', '/media/linkedin/bearhacks/2025-04-opening-slide.jpg', '/media/linkedin/bearhacks/2025-05-260-participants-slide.jpg', '/media/linkedin/bearhacks/2025-recap-02-stats.jpg', '/media/linkedin/bearhacks/2025-08-group-photo-2.jpg'],
  },
  {
    logo: '/media/logos/hackville.png',
    name: 'Hackville 2025', num: '01', company: 'HACKVILLE 2025', section: 'COMMAND LOG',
    meta: 'VP of Technology · Sheridan Hackademics Club · Mar 2024 to Jan 2025',
    cards: [
      ['WEBSITE', "On the technology team that built hackville.io for Sheridan's flagship 36-hour hackathon."],
      ['GOOGLE SPONSORSHIP', 'Helped secure Google as a sponsor: a TensorFlow workshop and a Best Use of Google Cloud prize track ($520).'],
      ['SPEAKERS AND JUDGING', 'Created the prize track, recruited and prepped speakers, and assisted the judges.'],
      ['CHECK-IN', 'Checked in participants: 15% more than the year before.'],
    ],
    extra: 'Hackville 2023 participant, 2024 winner, 2025 organizer.',
    images: ['/media/linkedin/hackville/2025-07-team.jpg', '/media/linkedin/hackville/2025-01-organizer-lanyard.jpg', '/media/linkedin/hackville/2025-03-check-in.jpg', '/media/linkedin/hackville/2025-05-hackers.jpg', '/media/linkedin/hackville/2025-06-organizers.jpg', '/media/linkedin/hackville/2025-04-google-cloud-prize-slide.jpg', '/media/linkedin/hackville/2025-vp-technology-banner.jpg'],
  },
];

export interface Blog {
  id: string;
  title: string;
  /** Short name for the post list. */
  short: string;
  /** Publish date, YYYY-MM-DD. */
  date: string;
  /** Where it's published, shown on the read button. */
  site: string;
  href: string;
  /** One line from the post itself, shown as a pull quote. */
  quote?: string;
  summary: string;
  /** The post's section headings, in order. */
  sections: string[];
  /** Cover image. Falls back to the first of `images`, then a placeholder. */
  cover?: string;
  /** Figures from the post, shown as a gallery that opens full screen. */
  images?: SlideData[];
  /** Related project id: adds a button to it, and the project links back. */
  project?: string;
}

/** Blog posts, newest first. Medium images are loaded from Medium's CDN; drop your own in
 *  public/media/blogs/ and point `cover` / `images` at '/media/blogs/<file>' to host them here. */
export const BLOGS: Blog[] = [
  {
    id: 'datathon-behind-the-scenes',
    title: 'Organizing Sheridan Datathon 2025: A Behind-The-Scenes Recap',
    short: 'Datathon Recap',
    date: '2025-12-01',
    site: 'LinkedIn',
    href: 'https://www.linkedin.com/pulse/organizing-sheridan-datathon-2025-behind-the-scenes-aleem-dcdwe/',
    quote: 'Some organizers worked up to 20 hours a week for several months just to bring this 2-day event to you.',
    summary:
      'How Sheridan Datathon 2025 went from an idea on a call in April to the largest event GDG Sheridan has hosted: ' +
      '200+ participants, 37 projects, 50+ organizers and volunteers and $3,750 in prizes. ' +
      'It covers building the team, switching from a hackathon to a datathon, the SD card branding, outreach, ' +
      'sponsorships and catering, both event days, and a judging process that pushed the closing ceremony to 9 PM.',
    sections: [
      'Team Formation', 'Ideation', 'Design', 'Outreach', 'Sponsorships', 'Catering',
      'Marketing', 'Day 1: Saturday', 'Day 2: Sunday', 'Demos and Judging', 'Epilogue',
    ],
    cover: '/media/linkedin/datathon/article-01-cover.jpg',
    images: [{ src: '/media/linkedin/datathon/article-02-logo.jpg', label: 'The SD card logo' }, { src: '/media/linkedin/datathon/article-03-official-poster.jpg', label: 'Official event poster' }, { src: '/media/linkedin/datathon/article-08-judging-criteria.jpg', label: 'Judging criteria' }, { src: '/media/linkedin/datathon/article-10-opening-ceremony.jpg', label: 'Opening ceremony at max capacity' }, { src: '/media/linkedin/datathon/article-11-announcing-theme.jpg', label: 'Announcing the theme' }, { src: '/media/linkedin/datathon/article-23-dayforce-booth.jpg', label: 'Dayforce booth' }, { src: '/media/linkedin/datathon/article-30-demos.jpg', label: 'Project demos' }, { src: '/media/linkedin/datathon/article-34-lead-organizers.jpg', label: 'Lead organizers' }],
  },
  {
    id: 'capstone-journey',
    title: 'My Capstone’s Journey from EOI to the First Place Award',
    short: 'Capstone Journey',
    date: '2025-09-10',
    site: 'Medium',
    href: CAPSTONE_POST,
    quote: '',
    summary:
      'How AI Cricket Coach went from an expression of interest (one of 7 approved out of 30) to first place at Sheridan: ' +
      'swapping a basketball posture hackathon idea for cricket, scoping it around a cloud computing teammate, ' +
      'dropping posture analysis for ideal shot recommendations from ball speed, line and length, ' +
      'tracking the ball with perspective and homography transforms, and testing at a real cricket nets facility. ' +
      'It closes with what I would do differently.',
    sections: [
      'Expression of Interest', 'Ideation', 'Domain Research', 'Software Design',
      'Development', 'Testing', 'Challenges and Areas of Improvement', 'Final Remarks',
    ],
    cover: '/media/projects/cricket/trajectory-mapping.png',
    images: [
      { src: 'https://cdn-images-1.medium.com/max/1024/1*RQnvEcqm2fz9YJa0Qf2EWA.png', label: 'Brainstorming mind map' },
      { src: 'https://cdn-images-1.medium.com/max/960/1*Oca6dm0OQziUvGY69Gf8UQ.gif', label: 'Speed estimation example' },
      { src: 'https://cdn-images-1.medium.com/max/796/1*Yt9QYGFaLh2eKyN7piY0pw.png', label: 'Trajectory mapped onto the pitch' },
      { src: 'https://cdn-images-1.medium.com/max/1024/1*HkrQha-8aOx9ze2uiV8uzA.png', label: 'Ideal shot logic' },
      { src: 'https://cdn-images-1.medium.com/max/1024/1*MaXlrorzw0CK7haIH4Q0MA.gif', label: 'Testing at the nets' },
    ],
    project: 'cricket',
  },
];

export const blogCover = (b: Blog) => b.cover ?? b.images?.[0]?.src;
export const blogSlides = (b: Blog): SlideData[] =>
  b.images?.length ? b.images : [{ src: blogCover(b), label: b.title }];
/** '2025-09-10' → 'SEP 10, 2025' */
export const blogDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

/** The résumé shown on the Résumé page, served from Google Drive (shared as "anyone with the link"). */
export const RESUME = {
  label: '',
  note: '',
  /** Same PDF served from this site (api/resume.js), shown in the browser's PDF viewer at full width on desktop. */
  inline: '/api/resume#view=FitH',
  /** Google Drive's embedded viewer (used on mobile, where browsers can't show PDFs in a frame). */
  preview: `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/preview`,
  /** Opens in Drive. */
  view: `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/view`,
  /** Direct PDF download. */
  download: `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_ID}`,
};

/** What each skill was used for in each project: "<skill>|<project>" → one line. */
export const SKILL_USE: Record<string, string> = {
  'Python|Proprio': 'The workout_ml package: data loading, feature pipelines, leave one person out evaluation, the rep counter and the inference service.',
  'Python|Cricket Coach': 'The computer vision and ML back end: ball tracking, pitch mapping and the shot recommendation model, served on Cloud Run.',
  'Python|Ember': 'Edge inference on a Google Coral TPU: MobileNet SSD detections checked against live depth, plus thermal victim detection.',
  'C# / .NET|Dayforce': 'REST APIs for the Wallet Gateway microservices, with the retry, timeout and re queue handling that cut failed tip transactions by 90%.',
  'Java|Mercato': 'Spring Boot microservices for products, orders, inventory and notifications, behind a Spring Cloud Gateway that validates Keycloak JWTs.',
  'Java|Proprio': 'core-api in Spring Boot: auth, sessions, labels and history, built contract first from an OpenAPI spec.',
  'TypeScript|BearHacks site': 'The BearHacks 2026 event site in React; it reached 12.49k monthly visits across 84 countries.',
  'TypeScript|Rocky': 'The Next.js parent dashboard and the Simulation Studio that drives the alert pipeline from laptop sensors.',
  'TypeScript|Skill Squirrel': 'The React Badge Maker UI with live previews and state driven customization.',
  'C++|Ember': 'HUD compositing over the camera feed with OpenCV, and multi threaded sensor fusion on Linux.',
  'Kotlin|Ember': 'A Wear OS app that streams heart rate, SpO2, skin temperature and heading from the watch to the HUD.',
  'Kotlin|Rocky': 'A Wear OS watch app for heart rate and fall detection.',
  'Kotlin|Proprio': 'The Wear OS recorder and phone app (Jetpack Compose) that capture 50 Hz accelerometer and gyroscope sessions.',
  'SQL|Dayforce': 'Efficient SQL queries behind the Wallet Gateway REST APIs.',
  'PyTorch|Proprio': 'A 1D CNN with on the fly rotation augmentation, exported to ONNX.',
  'scikit learn|Proprio': 'Feature pipelines and classical models, evaluated leave one person out so no lifter leaks between train and test.',
  'scikit learn|Cricket Coach': 'The Random Forest model that recommends the best shot for each delivery.',
  'OpenCV|Ember': 'Compositing detections, vitals and navigation onto the helmet HUD.',
  'OpenCV|Cricket Coach': 'Ball tracking and the perspective transform that maps each delivery onto a top down pitch.',
  'MLflow and DVC|Proprio': 'MLflow tracks runs and models, DVC versions the datasets, and every run records the data hash and git commit.',
  'LLM tooling|Rocky': 'Self hosted Mixtral 8x22B on Vultr through Ollama for private safety analysis, with Gemini writing the parent report.',
  'LLM tooling|Voxel': 'Meshy text to 3D generation through a Dart proxy, placed in AR by the Flutter app.',
  'LLM tooling|Prismarine': 'Gemini embeddings and search grounding, Snowflake Cortex translation and ElevenLabs audio summaries.',
  'Kafka|Dayforce': 'Event driven ETL pipelines for live POS tip transactions.',
  'Kafka|Mercato': 'order-service publishes Avro OrderPlacedEvents that notification-service consumes to send confirmation emails.',
  'Spring Boot|Mercato': 'Four services plus a Spring Cloud Gateway with JWT validation and circuit breaking.',
  'Spring Boot|Proprio': 'core-api for auth, sessions, labels and history.',
  'Docker|Mercato': 'Docker Compose for Keycloak, MongoDB, MySQL, Kafka and the schema registry.',
  'Docker|Proprio': 'A Compose stack for core-api, the inference service, PostgreSQL and RabbitMQ.',
  'GCP and Terraform|Cricket Coach': 'Cloud Run for CV and ML inference, Cloud Storage for videos, and Firestore for users, sessions and feedback.',
  'Azure|Dayforce': 'Azure DevOps CI/CD pipelines, and Azure Functions that cut manual recovery by 80%.',
  'Azure|Skill Squirrel': 'Azure AI Vision OCR and Azure OpenAI image generation for badge enhancement.',
  'RabbitMQ|Proprio': 'Upload to inference events with retries and a dead letter queue.',
};

export const skillUse = (skill: string, where: string) => SKILL_USE[`${skill}|${where}`] ?? '';

export const SKILLS: [string, [string, string[]][]][] = [
  ['LANGUAGES', [
    ['Python', ['Proprio', 'Cricket Coach', 'Ember']], ['C# / .NET', ['Dayforce']], ['Java', ['Mercato', 'Proprio']],
    ['TypeScript', ['BearHacks site', 'Rocky', 'Skill Squirrel']], ['C++', ['Ember']], ['Kotlin', ['Ember', 'Rocky', 'Proprio']], ['SQL', ['Dayforce']],
  ]],
  ['ML AND AI', [
    ['PyTorch', ['Proprio']], ['scikit learn', ['Proprio', 'Cricket Coach']], ['OpenCV', ['Ember', 'Cricket Coach']],
    ['MLflow and DVC', ['Proprio']], ['LLM tooling', ['Rocky', 'Voxel', 'Prismarine']],
  ]],
  ['SYSTEMS AND CLOUD', [
    ['Kafka', ['Dayforce', 'Mercato']], ['Spring Boot', ['Mercato', 'Proprio']], ['Docker', ['Mercato', 'Proprio']],
    ['GCP and Terraform', ['Cricket Coach']], ['Azure', ['Dayforce', 'Skill Squirrel']], ['RabbitMQ', ['Proprio']],
  ]],
];

export const PROFILE = {
  name: 'TAIMOOR ALEEM',
  role: 'AI Engineer · Software Developer',
  status: 'Open to new grad roles',
  bio: '',
  now: {
    title: 'Founding Engineer, IgnisXR',
    text: 'Building Ember, an XR helmet for firefighters: edge AI, multi threaded sensor fusion and a wearable biometric stream.',
  },
  stats: [
    // meter: how many of the 10 bar segments under the tile light up.
    { value: String(AWARDS.length), label: 'Awards', caption: 'mostly hackathons', meter: Math.min(10, AWARDS.length) },
    { value: '21', label: 'Events Organized', caption: 'Google Developer Group - Sheridan', meter: 8 },
    { value: '1000+', label: 'Hackers hosted', caption: 'BearHacks · Datathon · Hackville', meter: 10 },
    { value: '22', label: 'Sponsors closed', caption: 'BearHacks 2026 ', meter: 9 },
  ],
  facts: [
    ['Based in', 'Toronto, ON (GTA)'],
    ['Education', "Hon. BCS, Data Analytics · Sheridan '26"],
    ['Focus', 'Backend Systems · ML · CV'],
    ['Honours', 'Valedictorian Nominee'],
  ] as [string, string][],
};

export const SOCIAL = {
  spotify: 'https://open.spotify.com/user/jrlooyy8uvskrw9b4fqugh32o',
  youtube: 'https://youtube.com/@taimoorrr',
};

/** Icon links under the profile portrait. */
export const PROFILE_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/taimooraleem/' },
  { id: 'github', label: 'GitHub', href: GH },
  { id: 'devpost', label: 'Devpost', href: 'https://devpost.com/TaimoorAleem' },
  { id: 'medium', label: 'Medium', href: 'https://medium.com/@taimooraleem01' },
];

export interface Hobby {
  label: string;
  /** Small line under the label. */
  detail?: string;
  /** Photos for the overlay slideshow. Placeholders show until you add some. */
  images?: string[];
  /** Opens this link instead of a slideshow. */
  href?: string;
  /** Name of the site the link goes to, e.g. 'Spotify'. */
  site?: string;
  /** A list under the label instead of `detail`; an item with `href` links out on its own. */
  items?: { name: string; href?: string; site?: string }[];
}

/** Profile › Hobbies & interests. */
/** Photo slideshows on hobby tiles. Off for now: photo hobbies show as plain tiles. */
export const HOBBY_PHOTOS = false;

export const HOBBIES: Hobby[] = [
  { label: 'Piano', images: [] },
  { label: 'Cooking', images: [] },
  { label: 'Running', images: [] },
  { label: 'Music', detail: 'Indie Rock · Metal Rock', href: SOCIAL.spotify, site: 'Spotify' },
  {
    label: 'Gaming',
    items: [{ name: 'Titanfall 2', href: SOCIAL.youtube, site: 'YouTube' }, { name: 'The Last Of Us' }, { name: 'and more' }],
  },
  { label: 'Sports', detail: 'Cricket · Squash' },
];

export const hobbySlides = (h: Hobby): SlideData[] =>
  h.images?.length
    ? h.images.map((src, i) => ({ src, label: `${h.label} ${i + 1}` }))
    : [1, 2, 3].map((n) => ({ label: `${h.label} photo ${n}` }));

export const LINKS: { label: string; value: string; short: string; href: string; gold?: boolean }[] = [
  { label: 'Email', value: EMAIL, short: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/TaimoorAleem', short: 'in/TaimoorAleem', href: 'https://linkedin.com/in/TaimoorAleem' },
];

/** Home page "Currently working on" list. `project` opens that project; `leadership` opens that Leadership chapter. */
export const NOW_WORKING: { label: string; project?: string; leadership?: number }[] = [
  { label: 'Ember at IgnisXR: Edge AI for firefighter helmets', project: 'ember' },
  { label: 'Proprio: Validating barbell exercise classification in a real gym environment.', project: 'proprio' },
  { label: 'BearHacks 2027: advising the organizing team', leadership: leadershipIndex('BearHacks 2026') },
];
