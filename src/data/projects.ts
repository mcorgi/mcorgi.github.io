export type Ownership = "primary" | "team";

export type Feature = {
  name: string;
  description: string;
  ownership: Ownership;
};

export type ProjectLink = {
  label: string;
  href?: string;
  note?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  org?: string;
  role?: string;
  blurb: string;
  description: string;
  problem?: string;
  solution?: string;
  features?: Feature[];
  technicalHighlight?: string;
  outcomes?: string[];
  learnings?: string[];
  architecture?: string;
  stack?: string[];
  tags: string[];
  year: string;
  readTime: string;
  href?: string;
  repo?: string;
  status?: "shipped" | "in-progress" | "research";
  featured?: boolean;
  // Kept for old links, but left out of every project list.
  hidden?: boolean;
  // Image shown in the featured card's "system diagram" panel.
  diagram?: string;
  // Little status tiles under the featured card's diagram.
  statusChips?: { k: string; v: string }[];
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "mini-plane-system",
    title: "Mini Plane System (MPS)",
    subtitle: "Onboard imaging & telemetry pipeline for CUAir's competition aircraft",
    org: "Cornell Unmanned Air Systems (CUAir)",
    role:
      "Point person for the full onboard stack except distance mode and the FastAPI API layer (those were built by teammates).",
    blurb:
      "Onboard Raspberry Pi software that fires a GoPro, pairs each photo with Pixhawk GPS/attitude data on a single clock, and streams geotagged imagery to the ground mid-flight: 1,300+ images per 45-minute flight, flown at SUAS 2026.",
    description:
      "Mini Plane System (MPS) is onboard flight software for CUAir's mini aircraft. It runs on a Raspberry Pi, controls a GoPro Hero 11 over USB, reads telemetry from a Pixhawk flight controller via MAVLink, and uploads each image with a JSON metadata payload (GPS, altitude, yaw, timestamps) to a ground server. I was the point person for the core pipeline: camera capture/download/upload, Pixhawk integration, telemetry buffering and time-alignment, the field CLI, Pi deployment, and operational tooling. Distance mode (geo-fenced capture) and the HTTP API were developed separately by teammates.",
    problem:
      "Competition aircraft need aerial imagery tied to precise position and attitude — not just photos on an SD card to sort through after landing. Manually matching GoPro footage to flight logs is slow, error-prone, and doesn't work when operators need imagery on the ground during or right after a flight.",
    solution:
      "MPS is a modular Python system that runs on a Raspberry Pi aboard the aircraft. It orchestrates three pieces of hardware — a GoPro, a Pixhawk, and the Pi itself — into one asynchronous pipeline that captures photos, downloads new media, pairs each frame with flight telemetry, and uploads image + metadata to a ground server.",
    features: [
      {
        name: "Continuous capture",
        description:
          "Timed GoPro shutter + async download/upload pipeline running on the Pi.",
        ownership: "primary",
      },
      {
        name: "Telemetry pairing",
        description:
          "Match each photo to the nearest Pixhawk GPS/attitude sample by host timestamp.",
        ownership: "primary",
      },
      {
        name: "Ground server upload",
        description:
          "POST image + geotagged JSON to the ground station as soon as pairing succeeds.",
        ownership: "primary",
      },
      {
        name: "Session management",
        description:
          "Flights organized as YYYY-MM-DD/runN with per-image *_gs.json metadata sidecars.",
        ownership: "primary",
      },
      {
        name: "Field CLI",
        description:
          "Interactive `mps` commands: capture, telemetry, sessions, ground-server config, live logs.",
        ownership: "primary",
      },
      {
        name: "Preflight checks",
        description:
          "Shell script verifying USB devices, GoPro reachability, Pixhawk, and ground-server network path.",
        ownership: "primary",
      },
      {
        name: "Pi deployment",
        description:
          "PyInstaller one-file binary plus an ARM64 Docker image for repeatable field installs.",
        ownership: "primary",
      },
      {
        name: "Distance mode",
        description:
          "Geo-fenced auto start/stop of capture when the aircraft enters predefined search polygons.",
        ownership: "team",
      },
      {
        name: "HTTP API",
        description:
          "FastAPI endpoints to start/stop pipelines and control distance mode remotely.",
        ownership: "team",
      },
    ],
    technicalHighlight:
      "The hardest part of MPS is time alignment. The GoPro stores creation timestamps in media metadata, but Pixhawk telemetry arrives on a separate stream with its own timing. My pipeline records a host timestamp at each shutter press, enqueues it, and the download worker pairs each new file with the nearest telemetry sample within a configurable staleness window before building the ground-server JSON. Uploads are skipped when pairing fails, so the ground station never receives images without position data (with an explicit override only for integration testing). The whole system runs on asyncio so capture, download, telemetry polling, and network upload don't block each other — important on a resource-constrained Pi in the field.",
    outcomes: [
      "Flown at SUAS 2026, where I ran it live as the Intelligence operator.",
      "Aligns 1,300+ GoPro images per 45-minute flight to GPS and attitude within 125 ms.",
      "Eliminated manual post-flight sync between GoPro SD cards and flight logs.",
      "Enabled near–real-time geotagged image delivery to the ground server during flight.",
      "Packaged software as a single Pi binary plus Docker image for repeatable deployment.",
      "Added preflight diagnostics so operators can verify hardware and networking before takeoff.",
    ],
    learnings: [
      "Designing async pipelines where camera I/O, serial MAVLink, and HTTP uploads have very different latencies.",
      "Application-level sensor fusion: nearest-neighbor time sync when you can't assume a single hardware clock.",
      "Operational UX matters on embedded systems — session folders, log streaming, and preflight scripts are as important as core algorithms.",
      "Shipping to embedded Linux: PyInstaller path quirks, ARM builds, and field-debugging docs.",
    ],
    architecture: `[Pixhawk] ──USB/MAVLink──┐
                         ▼
                 [Raspberry Pi · mps]  ──POST /api/v1/image──▶  [Rocket ⇄ NanoStation]
                         ▲                                                 │
[GoPro Hero 11] ─USB/HTTP┘                                                 ▼
                                                                     [gs-backend] ──▶ [hawk-ai]`,
    stack: [
      "Python",
      "asyncio",
      "pymavlink",
      "FastAPI",
      "requests",
      "Raspberry Pi",
      "GoPro Open API",
      "PyInstaller",
      "Docker (arm64)",
      "bash",
    ],
    tags: [
      "Embedded",
      "Python",
      "Robotics",
      "Aerospace",
      "IoT",
      "asyncio",
      "MAVLink",
      "Raspberry Pi",
    ],
    year: "2025 — present",
    readTime: "10 min",
    status: "shipped",
    featured: true,
    diagram: "/diagrams/mps-system-architecture.drawio.svg",
    statusChips: [
      { k: "capture", v: "continuous" },
      { k: "telemetry", v: "MAVLink ok" },
      { k: "pairing", v: "nearest-neighbor" },
      { k: "upload", v: "geotagged" },
    ],
    links: [
      {
        label: "GitHub",
        note: "private team repo — CUAir/mini-plane-system",
      },
      {
        label: "Hermes, CUAir's 2026 aircraft",
        href: "https://cuair.org/hermes.html",
        note: "cuair.org/hermes",
      },
      {
        label: "SUAS 2026",
        href: "/suas-2026",
        note: "running this pipeline at competition",
      },
    ],
  },
  {
    slug: "automated-analytics",
    title: "Automated Analytics Platform",
    subtitle: "A serverless service that runs engineers' analysis scripts for them",
    org: "Amazon Leo · Internship",
    role:
      "Flight Dynamics Software Developer Intern. Designed the serverless infrastructure in TypeScript CDK and wrote the Java Lambda handlers for triggering, running, and triaging jobs.",
    blurb:
      "A serverless service that runs engineers' analysis scripts automatically, on a schedule or the moment an upstream event lands, and routes any failure to the right person. Designed, built, and shipped to production during my internship.",
    description:
      "An automated analytics platform: engineers write an analysis script and a small config, and the platform runs it for them on a schedule or in response to events, stores the results, and tickets the right owner when something breaks.",
    stack: [
      "Java",
      "TypeScript",
      "AWS CDK",
      "Step Functions",
      "Lambda",
      "EventBridge",
      "SNS + SQS",
      "AWS Batch",
      "DynamoDB",
      "S3",
    ],
    tags: ["AWS", "Serverless", "Java", "TypeScript", "Infrastructure as Code", "Internship"],
    year: "Summer 2026",
    readTime: "5 min",
    status: "shipped",
    featured: true,
    statusChips: [
      { k: "triggers", v: "events + schedules" },
      { k: "infra", v: "TypeScript CDK" },
      { k: "orchestration", v: "Step Functions" },
      { k: "failures", v: "auto-routed" },
    ],
  },
  {
    slug: "camel-benchmark",
    title: "Camel Benchmark",
    subtitle: "A terminal game suite in OCaml, inspired by Human Benchmark",
    org: "CS 3110 · Cornell University",
    role: "Software engineer on a team of 4. Built Verbal Memory and rebuilt it as a pure state machine; terminal UI and I/O bug fixing across the app.",
    blurb:
      "Five cognitive games that run in the terminal, with logins and a leaderboard. I built Verbal Memory, refactored it into a pure state machine with no Lwt dependency, and wrote 47 tests that play the whole game without a terminal.",
    description:
      "Camel Benchmark is the final project for Cornell's CS 3110 (Functional Programming in OCaml): a typing test, number and verbal memory, a reaction test and a Stroop test, tied together with user logins and a per-game leaderboard.",
    stack: ["OCaml", "Dune", "Lwt", "ANSITerminal", "OUnit2", "Bisect_ppx"],
    tags: ["OCaml", "Functional Programming", "Testing", "Terminal UI", "State Machines"],
    year: "Fall 2025",
    readTime: "6 min",
    status: "shipped",
    links: [
      {
        label: "Watch the demo",
        href: "https://www.youtube.com/watch?v=VpvceHyf-n0",
        note: "youtube",
      },
      {
        label: "Source",
        href: "https://github.coecis.cornell.edu/sd2229/cs3110finalproject",
        note: "Cornell GitHub (Cornell login)",
      },
    ],
  },
  {
    slug: "hao-shi-guang",
    title: "Hao Shi Guang — Restaurant Website",
    subtitle:
      "A website for a Chinese restaurant in Allston, MA — designed and shipped solo.",
    org: "Hao Shi Guang Restaurant · Allston, MA",
    role:
      "Sole designer + developer. My first real-client engagement — scoped, designed, built, and deployed end-to-end.",
    blurb:
      "Built the full website for a family-owned Chinese restaurant in Allston — my first real client project, working directly with the owner.",
    description:
      "I designed and built the entire website for Hao Shi Guang, a Chinese restaurant on Harvard Ave in Allston. Menu pages, gallery, hours, reservations, contact — all of it. The fun part wasn't just the code; it was meeting with the manager, figuring out what they actually needed, and turning those conversations into a real, deployed site. It was the first time I felt like I was building for a real client, and it ended up being one of the most rewarding projects I've done.",
    outcomes: [
      "Live site shipped and in active use by the restaurant.",
      "Designed the full UI and built every page solo — no template, no team.",
      "Worked directly with the owner from scoping through launch and ongoing maintenance.",
    ],
    learnings: [
      "Translating ambiguous client needs into a concrete design.",
      "Communicating with a non-technical stakeholder — when to ask vs. just show a mock.",
      "What it actually takes to ship something real users depend on, every day.",
    ],
    tags: ["Full-stack", "Design", "Client Work", "Restaurant", "Freelance"],
    year: "Jun 2025 — present",
    readTime: "2 min",
    status: "shipped",
    href: "https://www.haoshiguangboston.com",
    links: [
      {
        label: "Live site",
        href: "https://www.haoshiguangboston.com",
        note: "haoshiguangboston.com",
      },
    ],
  },
  {
    slug: "studycentral",
    hidden: true,
    title: "StudyCentral App",
    org: "Cornell AppDev Hack Challenge",
    role: "Backend Lead",
    blurb:
      "An iOS-friendly study companion that helps Cornell students search their classes and keep all the right materials within reach. Built during the Cornell AppDev Hack Challenge.",
    description:
      "Designed and implemented REST APIs and containerized backend services to support repeatable development, testing, and deployment workflows for an iOS study companion built during the Cornell AppDev Hack Challenge.",
    tags: ["REST APIs", "Flask", "Docker", "iOS", "Backend"],
    year: "Dec 2024",
    readTime: "2 min",
    status: "shipped",
  },
  {
    slug: "handwriting-recognition",
    hidden: true,
    title: "Handwriting Recognition Web App",
    org: "Tufts University",
    blurb:
      "End-to-end handwriting recognition system combining numerical data processing, model inference, and API-based serving.",
    description:
      "An end-to-end handwriting recognition system built at Tufts. The pipeline combines numerical data processing, model inference, and an API layer that serves predictions from uploaded images.",
    tags: [
      "TensorFlow",
      "OCR",
      "CRNN",
      "CTC Loss",
      "API",
      "Image Processing",
      "Deep Learning",
    ],
    year: "Jul 2023",
    readTime: "1 min",
    status: "shipped",
  },
  {
    slug: "mice-video-classification",
    title: "Dynamic Stimuli Prediction Model (DSPM)",
    subtitle:
      "Video-to-neural-activity model for mouse primary visual cortex",
    org: "NeurIPS 2023 Sensorium Competition",
    role:
      "Owned the model architecture and training pipeline: adapting a pretrained ViViT backbone with QLoRA fine-tuning, building the temporal reducer, and writing the multi-mouse training loop.",
    blurb:
      "A fine-tuned Video Vision Transformer (ViViT + QLoRA) that predicts the spiking activity of tens of thousands of neurons in mouse V1 from the natural video the mice were watching — built for the NeurIPS 2023 Sensorium Competition.",
    description:
      "A fine-tuned Video Vision Transformer (ViViT) that predicts spiking activity of tens of thousands of neurons in mouse primary visual cortex (V1) from the natural video stimuli the mice were watching. Built as a submission for the NeurIPS 2023 Sensorium Competition.",
    problem:
      "Mouse primary visual cortex (V1) responds to natural video in highly nonlinear ways across tens of thousands of neurons at once, and responses differ from animal to animal. The Sensorium 2023 benchmark asks for a single model that watches the same video the mouse saw and predicts each neuron's response trace through time — across multiple mice with different neuron counts — and it has to generalize to held-out and out-of-distribution clips. Training a video transformer of that scale end-to-end on a normal GPU is not realistic.",
    solution:
      "DSPM wraps a pretrained ViViT (google/vivit-b-16x2-kinetics400) in a custom regression head and fine-tunes it with 4-bit QLoRA so the whole pipeline fits on a single GPU. A learned 1D-conv \"reducer\" compresses ViViT's long patch-token sequence down to a fixed temporal window, and a swappable per-mouse linear head maps that to each animal's neuron count. The model is trained jointly across mice by interleaving their dataloaders and switching the active head per batch.",
    features: [
      {
        name: "ViViT backbone fine-tuning",
        description:
          "Loads google/vivit-b-16x2-kinetics400 in 4-bit (NF4 + double-quant, bf16 compute) via bitsandbytes and attaches LoRA adapters (r=8, α=32) on the attention query/key/value projections — so only a tiny fraction of parameters are trained.",
        ownership: "primary",
      },
      {
        name: "Temporal reducer",
        description:
          "Custom Reducer module pads the ViViT patch-token sequence to a multiple of the target length and applies a strided 1D convolution to collapse it to a fixed 32-step window aligned with the response window.",
        ownership: "primary",
      },
      {
        name: "Per-mouse swappable heads",
        description:
          "Swappable module holds one Linear(768, neurons × window) head per mouse; the forward pass picks the right head by mouse ID, so all 10 animals share a single backbone but keep animal-specific readouts.",
        ownership: "primary",
      },
      {
        name: "Multi-mouse training loop",
        description:
          "concatenate_dataloaders round-robins batches across mice each epoch, normalizes each clip into the ViViT processor's expected range, samples a random 64-frame window (stride 2), and regresses against log(ReLU(responses)+1) with MSE.",
        ownership: "primary",
      },
      {
        name: "Memory-efficient training",
        description:
          "Gradient checkpointing + prepare_model_for_kbit_training + 8-bit paged AdamW from bitsandbytes, enabling fine-tuning of a video transformer on a single consumer GPU.",
        ownership: "primary",
      },
      {
        name: "Experiment tracking & checkpointing",
        description:
          "Per-step train/val loss logging to Weights & Biases, periodic step checkpoints, per-epoch checkpoints, and a best.pt snapshot kept by lowest validation loss on the oracle split.",
        ownership: "primary",
      },
    ],
    technicalHighlight:
      "The hardest part of DSPM is making a 3-D video transformer regress to a different-sized neural population for each mouse, on one GPU. ViViT outputs a long (B, ~3137, 768) patch-token sequence per clip — far longer than the 32-step response window the competition wants — and each mouse has a different number of neurons (tens of thousands), so a single classifier head doesn't fit the task. The pipeline solves this with two pieces: a Reducer that pads the token sequence to a multiple of 32 and uses a strided Conv1d to collapse it into exactly the target window, and a Swappable head that holds one mouse-specific Linear(768, N_neurons × 32) and chooses the right one per batch via the mouse key passed into forward. Combined with 4-bit QLoRA on the attention projections, gradient checkpointing, and an 8-bit paged AdamW optimizer, this lets a billion-parameter-class video model be fine-tuned end-to-end on a single GPU without blowing memory, while still learning per-animal readouts.",
    outcomes: [
      "Built an end-to-end fine-tuning pipeline for the Sensorium 2023 dynamic track — predicting per-neuron responses for ~10 mice from raw video.",
      "Fit a ViViT-scale video transformer onto a single GPU using 4-bit QLoRA, gradient checkpointing, and 8-bit paged optimizers.",
      "Designed a shared-backbone / per-mouse-head architecture that trains jointly across animals instead of one model per mouse.",
      "Integrated with the official sensorium_2023 data loaders, image preprocessing, and correlation-score evaluation.",
    ],
    learnings: [
      "Adapting a pretrained video transformer (ViViT) to a neuroscience regression task instead of action classification.",
      "Practical QLoRA: pairing 4-bit weight quantization with LoRA adapters and a kbit-prepared model so only adapters + heads actually train.",
      "Sequence-length engineering inside transformers — using strided 1D convs to bridge patch-token length and a fixed prediction window.",
      "Multi-task training tricks: swappable per-mouse heads, round-robin dataloader concatenation, and consistent log-domain response targets.",
      "GPU-memory engineering on consumer hardware: gradient checkpointing, paged 8-bit AdamW, and bf16 compute dtype.",
    ],
    architecture: `[Sensorium video clips (10 mice, V1 responses)]
                │
                ▼
   [VivitImageProcessor]  ── normalized 32-frame clips ──▶  [ViViT-B/16x2 backbone]
                                                                │  (4-bit quantized,
                                                                │   LoRA on q/k/v)
                                                                ▼
                                                  [Reducer: Conv1d over tokens]
                                                                │
                                                                ▼
                                       [Swappable per-mouse Linear head]
                                                                │
                                                                ▼
                                           predicted neuron responses
                                              (N_neurons × time)`,
    stack: [
      "Python",
      "PyTorch",
      "HuggingFace Transformers (ViViT)",
      "PEFT / LoRA",
      "bitsandbytes (4-bit QLoRA)",
      "Accelerate",
      "neuralpredictors",
      "Weights & Biases",
      "CUDA",
    ],
    tags: [
      "Computer Vision",
      "PyTorch",
      "ViViT",
      "QLoRA",
      "Neuroscience",
      "Deep Learning",
      "HuggingFace",
      "Research",
    ],
    year: "Summer 2023",
    readTime: "4 min",
    status: "research",
    links: [
      {
        label: "Paper (NeurIPS 2024 D&B)",
        href: "https://openreview.net/forum?id=gViJjwRUlM",
        note: "openreview.net",
      },
      {
        label: "Sensorium Competition",
        href: "https://www.sensorium-competition.net/",
        note: "sensorium-competition.net",
      },
      {
        label: "ViViT backbone",
        href: "https://huggingface.co/google/vivit-b-16x2-kinetics400",
        note: "google/vivit-b-16x2-kinetics400",
      },
    ],
  },
  {
    slug: "red-and-black",
    hidden: true,
    title: "Red & Black Newspaper Website",
    blurb:
      "A modern web home for a student newspaper — articles, opinion pieces, and a layout that actually reads like a newspaper.",
    description:
      "Designed and built the website for the Red & Black student newspaper. Focus on legible typography, clear hierarchy between sections, and a layout that nods to print without feeling stuck in it.",
    tags: ["Next.js", "Design", "Editorial"],
    year: "2024",
    readTime: "2 min",
    status: "shipped",
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);
export const featuredProjects = visibleProjects.filter((p) => p.featured);
export const featuredProject = featuredProjects[0] ?? projects[0];
export const otherProjects = visibleProjects.filter((p) => !p.featured);
