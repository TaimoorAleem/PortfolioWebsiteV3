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
    links: { github: `${GH}/Ember` },
    media: 'Ember prototype photo', groups: ['hackathons'], images: [],
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
    media: 'Proprio sensor rig photo', groups: ['personal'], images: [],
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
    media: 'Mercato storefront screenshot', groups: ['personal'], images: [],
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
    links: { github: `${GH}/Rocky` },
    media: 'Rocky dashboard screenshot', groups: ['hackathons'], images: [],
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
    links: { github: `${GH}/Prismarine`, demo: 'https://prismarine.yvesdonato.com/' },
    media: 'Prismarine 3D graph screenshot', groups: ['hackathons'], images: [],
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
    links: { github: `${GH}/Voxel` },
    media: 'Voxel AR screenshot', groups: ['hackathons'], images: [],
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
    media: 'AI Cricket Coach app screens', groups: ['academic'], images: [],
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
}

/** Gallery slides for a chapter (four placeholders until images are added). */
export const chapterSlides = (c: Chapter): SlideData[] =>
  c.images?.length
    ? c.images.map((src, i) => ({ src, label: `${c.name} ${i + 1}` }))
    : [1, 2, 3, 4].map((n) => ({ label: `${c.company.toLowerCase()} photo ${n}` }));

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
  /** Project id: links the row to that project and lists the award on the project. */
  project?: string;
  /** Photos, e.g. ['/media/awards/capstone-1.jpg']. Click to view them in an overlay. Placeholder until set. */
  images?: string[];
}

/** One row per award; an event with two prizes gets two rows. */
export const AWARDS: Award[] = [
  {
    event: 'CS Capstone, Sheridan', result: 'First Place', team: 'Capstone team', year: '2025', project: 'cricket',
    details: 'AI Cricket Coach ranked first among all 2025 CS capstones at Sheridan, across Data Analytics, Cloud Computing and Game Engineering.',
  },
  {
    event: 'Google Solution Challenge', result: 'Top 3, North America', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: 'Ember, our XR firefighter helmet, placed in the top 3 in North America and was presented to Google engineers in New York City.',
  },
  {
    event: 'Hack Canada', result: 'Google Build With AI track', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: "Ember won Google's Build With AI prize track.",
  },
  {
    event: 'Hack Canada', result: 'SPUR Innovation track', team: 'IgnisXR team', year: '2026', project: 'ember',
    details: 'Ember also won the SPUR Innovation prize track.',
  },
  {
    event: 'DeerHacks, UofT', result: '2nd Place', team: 'Rocky team', year: '2026', project: 'rocky',
    details: 'Rocky, a real time child safety monitor, took 2nd place overall.',
  },
  {
    event: 'DeerHacks, UofT', result: 'Best Use of Vultr', team: 'Rocky team', year: '2026', project: 'rocky',
    details: "Rocky's private AI review runs Mixtral 8x22B on our own Vultr server, which won Best Use of Vultr.",
  },
  {
    event: 'GenAI Genesis, UofT', result: 'Best AI Hack using IBM Tech', team: 'Voxel team', year: '2026', project: 'voxel',
    details: 'Voxel, an AR learning headset concept with generative 3D models, won Best AI Hack using IBM Tech.',
  },
  {
    event: 'YorkU Hackathon', result: '5th of 60', team: 'Prismarine team', year: '2026', project: 'prismarine',
    details: 'Prismarine, a 3D visual search engine for research papers, placed 5th of 60 teams.',
  },
  {
    event: 'Hackville', result: 'Best UI Design', team: 'Hackville team', year: 'TBC',
    details: 'Best UI Design award. Details coming soon.',
  },
];

/** Awards won by a project, in AWARDS order. */
export const projectAwards = (id: string) => AWARDS.filter((a) => a.project === id);

/** Slides for an award's photos (placeholder until images are added). */
export const awardSlides = (a: Award): SlideData[] =>
  a.images?.length ? a.images.map((src, i) => ({ src, label: `${a.event} ${i + 1}` })) : [{ label: `${a.event} photo` }];

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
  tags: string[];
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
    id: 'capstone-journey',
    title: 'My Capstone’s Journey from EOI to the First Place Award',
    short: 'Capstone Journey',
    date: '2025-09-10',
    site: 'Medium',
    href: CAPSTONE_POST,
    tags: ['Computer Vision', 'Machine Learning'],
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
    cover: 'https://cdn-images-1.medium.com/max/796/1*Yt9QYGFaLh2eKyN7piY0pw.png',
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
  bio: 'I like building systems that run fast on real hardware.',
  now: {
    title: 'Founding Engineer, IgnisXR',
    text: 'Building Ember, an XR helmet for firefighters: edge AI, multi threaded sensor fusion and a wearable biometric stream.',
  },
  stats: [
    { value: String(AWARDS.length), label: 'Awards', caption: 'mostly hackathons' },
    { value: '21', label: 'Events Organized', caption: 'Google Developer Group - Sheridan' },
    { value: '1000+', label: 'Hackers hosted', caption: 'BearHacks · Datathon · Hackville' },
    { value: '22', label: 'Sponsors closed', caption: 'BearHacks 2026 ' },
  ],
  facts: [
    ['Based in', 'Toronto, ON (GTA)'],
    ['Education', "Hon. BCS, Data Analytics · Sheridan '26"],
    ['Focus', 'Backend Systems · ML · CV'],
    ['Honours', 'Valedictorian Nominee'],
  ] as [string, string][],
};

export const SOCIAL = {
  spotify: '',   // e.g. 'https://open.spotify.com/user/…'
  youtube: '',   // e.g. 'https://www.youtube.com/@…'
};

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
}

/** Profile › Hobbies & interests. */
export const HOBBIES: Hobby[] = [
  { label: 'Piano', images: [] },
  { label: 'Cooking', images: [] },
  { label: 'Running', images: [] },
  { label: 'Music', detail: 'Metal rock · Indie rock', href: SOCIAL.spotify, site: 'Spotify' },
  { label: 'Titanfall 2', href: SOCIAL.youtube, site: 'YouTube' },
  { label: 'Cricket & Squash', images: [] },
];

export const hobbySlides = (h: Hobby): SlideData[] =>
  h.images?.length
    ? h.images.map((src, i) => ({ src, label: `${h.label} ${i + 1}` }))
    : [1, 2, 3].map((n) => ({ label: `${h.label} photo ${n}` }));

export const LINKS: { label: string; value: string; short: string; href: string; gold?: boolean }[] = [
  { label: 'Email', value: EMAIL, short: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/TaimoorAleem', short: 'in/TaimoorAleem', href: 'https://linkedin.com/in/TaimoorAleem' },
  { label: 'GitHub', value: 'github.com/TaimoorAleem', short: 'TaimoorAleem', href: GH },
  { label: 'Résumé', value: 'View and download', short: 'View', href: '#/resume', gold: true },
];

/** Home page "Currently working on" list. `project` opens that project; `leadership` opens that Leadership chapter. */
export const NOW_WORKING: { label: string; project?: string; leadership?: number }[] = [
  { label: 'Ember at IgnisXR: Edge AI for firefighter helmets', project: 'ember' },
  { label: 'Proprio: validating rep counting on a real Galaxy Watch', project: 'proprio' },
  { label: 'BearHacks 2027: advising the organizing team', leadership: 0 },
];
