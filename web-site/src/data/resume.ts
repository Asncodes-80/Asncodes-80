export type LocalizedText = { en: string; fa: string };
export const text = (en: string, fa: string): LocalizedText => ({ en, fa });
export const localize = (value: LocalizedText, locale: string) =>
  locale.startsWith("fa") ? value.fa : value.en;

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: text("Alireza Soltani Neshan", "علیرضا سلطانی نشان"),
  handle: "alirezacodes",
  email: "asn80.asn@gmail.com",
  phone: "+98 919 807 8346",
  location: text("Tehran, Iran", "تهران، ایران"),
  resume: asset("documents/alireza-soltani-neshan-resume.pdf"),
  socials: [
    { label: "GitHub", href: "https://github.com/Asncodes-80" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alirezacodes" },
    { label: "YouTube", href: "https://youtube.com/@alirezacodes" },
    { label: "Instagram", href: "https://instagram.com/alireza.codes" },
    { label: "X", href: "https://x.com/asn80soltani" },
    {
      label: "Stack Overflow",
      href: "https://stackoverflow.com/users/12158825/alireza-soltani-neshan",
    },
  ],
};

export const experiences = [
  {
    id: "paya",
    company: text("Paya Communication Industries", "صنایع ارتباطی پایا"),
    role: text("R&D Software Engineer", "مهندس نرم‌افزار تحقیق و توسعه"),
    period: text("Dec 2020 — Present", "دسامبر ۲۰۲۰ — اکنون"),
    type: text("Contract · Tehran", "قراردادی · تهران"),
    tags: ["React", "Flutter", "Python", "IoT"],
    details: [
      text(
        "Developed Python applications for Modbus IoT data monitoring.",
        "توسعهٔ برنامه‌های پایتون برای پایش داده‌های اینترنت اشیا با Modbus.",
      ),
      text(
        "Built the React application for TCI smart parking and the Flutter application for MCI smart parking.",
        "توسعهٔ برنامهٔ پارکینگ هوشمند مخابرات با React و پارکینگ هوشمند همراه اول با Flutter.",
      ),
      text(
        "Integrated monitoring applications for the gas pipeline from Abadan to Basra, Iraq.",
        "یکپارچه‌سازی برنامه‌های پایش خط لولهٔ گاز آبادان به بصرهٔ عراق.",
      ),
      text(
        "Implemented guest entry and exit tracking for Ayandeh Bank.",
        "پیاده‌سازی سامانهٔ کنترل ورود و خروج مهمانان بانک آینده.",
      ),
    ],
  },
  {
    id: "medlife",
    company: text("MedLife", "مدلایف"),
    role: text("Founder & Indie Developer", "بنیان‌گذار و توسعه‌دهندهٔ مستقل"),
    period: text("Jan 2025 — Sep 2025", "ژانویهٔ ۲۰۲۵ — سپتامبر ۲۰۲۵"),
    type: text("Digital healthcare · Tehran", "سلامت دیجیتال · تهران"),
    tags: ["IoMT", "Flutter", "FreeRTOS", "Python", "AI"],
    details: [
      text(
        "Designed Internet of Medical Things hardware with PCB design, C, FreeRTOS, and Raspberry Pi Pico 1.",
        "طراحی سخت‌افزار اینترنت اشیای پزشکی با طراحی PCB، زبان C، سیستم‌عامل FreeRTOS و Raspberry Pi Pico 1.",
      ),
      text(
        "Implemented cross-platform public-key cryptography with ECDH and ChaCha20-Poly1305.",
        "پیاده‌سازی چندسکویی رمزنگاری کلید عمومی با ECDH و ChaCha20-Poly1305.",
      ),
      text(
        "Developed Flask API microservices and a mobile health application for a closed-loop patient–clinician care and vital-sign monitoring system.",
        "توسعهٔ میکروسرویس‌های Flask API و اپلیکیشن سلامت همراه برای چرخهٔ ارتباطی بیمار و پزشک و پایش علائم حیاتی.",
      ),
      text(
        "Built an XGBoost health-risk classification model and a MedLLaMA-2.0 7B inference service.",
        "ساخت مدل طبقه‌بندی ریسک سلامت با XGBoost و سرویس استنتاج مدل زبانی MedLLaMA-2.0 7B.",
      ),
    ],
  },
  {
    id: "basir",
    company: text("Basir Tech", "فناوری‌های بصیر"),
    role: text(
      "Front-end Desktop Application Developer",
      "توسعه‌دهندهٔ رابط کاربری دسکتاپ",
    ),
    period: text("Dec 2022 — Nov 2024", "دسامبر ۲۰۲۲ — نوامبر ۲۰۲۴"),
    type: text("Contract · Tehran", "قراردادی · تهران"),
    tags: ["Rust", "Tauri", "Desktop"],
    details: [
      text(
        "Implemented the desktop application for Sightence with Rust and Tauri. Sightence is an Iranian body scanner designed as an efficient, lower-cost alternative to the Provision body scanner.",
        "پیاده‌سازی برنامهٔ دسکتاپ پروژهٔ Sightence با Rust و Tauri؛ دستگاه اسکنر بدن ساخت ایران با هدف ارائهٔ جایگزینی کارآمد و کم‌هزینه‌تر برای اسکنر Provision.",
      ),
    ],
  },
  {
    id: "nozhan",
    company: text("AJP / Nozhan Softwares", "AJP / نرم‌افزارهای نوژان"),
    role: text(
      "Front-end Developer & UI/UX Designer",
      "توسعه‌دهندهٔ فرانت‌اند و طراح UI/UX",
    ),
    period: text("Jul 2023 — Nov 2023", "ژوئیهٔ ۲۰۲۳ — نوامبر ۲۰۲۳"),
    type: text("Hybrid · Tehran", "هیبرید · تهران"),
    tags: ["Flutter", "React", "UI/UX"],
    details: [
      text(
        "Designed the UI/UX of Mashinline, a marketplace for new and used industrial and agricultural machinery and spare parts in Iran and the UAE.",
        "طراحی تجربه و رابط کاربری ماشین‌لاین؛ بستری برای خریدوفروش ماشین‌آلات صنعتی و کشاورزی و قطعات نو و دست‌دوم در ایران و امارات.",
      ),
      text(
        "Developed the client application with Flutter and the administration panel with React.",
        "توسعهٔ اپلیکیشن کاربران با Flutter و پنل مدیریت با React.",
      ),
    ],
  },
  {
    id: "bina",
    company: text("Bina", "بینا"),
    role: text("Flutter Developer", "توسعه‌دهندهٔ فلاتر"),
    period: text("Feb 2021 — Apr 2021", "فوریهٔ ۲۰۲۱ — آوریل ۲۰۲۱"),
    type: text("Freelance · Iraq", "فریلنس · عراق"),
    tags: ["Flutter", "Mobile"],
    details: [
      text(
        "Flutter application development for Bina in Iraq.",
        "توسعهٔ اپلیکیشن فلاتر برای بینا در عراق.",
      ),
    ],
  },
  {
    id: "iust",
    company: text(
      "Iran University of Science and Technology",
      "دانشگاه علم و صنعت ایران",
    ),
    role: text("Computer Science Intern", "کارآموز علوم کامپیوتر"),
    period: text("Aug 2017 — Oct 2019", "اوت ۲۰۱۷ — اکتبر ۲۰۱۹"),
    type: text("Internship · Tehran", "کارآموزی · تهران"),
    tags: ["Networking", "Cisco", "Linux"],
    details: [
      text(
        "Worked with networking, Cisco switch configurations, and Linux.",
        "فعالیت در حوزهٔ شبکه، پیکربندی سوئیچ‌های Cisco و لینوکس.",
      ),
    ],
  },
];

export const education = [
  {
    degree: text(
      "MSc · Computer Software Engineering",
      "کارشناسی ارشد مهندسی نرم‌افزار کامپیوتر",
    ),
    institution: text(
      "Islamic Azad University, North Tehran",
      "دانشگاه آزاد اسلامی، تهران شمال",
    ),
    period: text("Sep 2023 — May 2026", "سپتامبر ۲۰۲۳ — مهٔ ۲۰۲۶"),
    gpa: "19.14 / 20",
    details: [
      text(
        "Digital healthcare security through blockchain and access control over IoMT networks.",
        "ارتقای امنیت سلامت دیجیتال با بلاک‌چین و روش‌های کنترل دسترسی در شبکهٔ اینترنت اشیای پزشکی.",
      ),
      text(
        "Explainable software systems, from requirements analysis to evaluation.",
        "سیستم‌های نرم‌افزاری توضیح‌پذیر، از تحلیل نیازمندی تا ارزیابی سیستم.",
      ),
      text(
        "Protein interaction pathways and NoSQL misconfiguration security analysis.",
        "مسیرهای تعامل پروتئین و تحلیل امنیتی پیکربندی نادرست NoSQL.",
      ),
    ],
  },
  {
    degree: text(
      "BSc · Computer Software Engineering",
      "کارشناسی مهندسی نرم‌افزار کامپیوتر",
    ),
    institution: text(
      "Shamsipour Technical and Vocational College",
      "دانشکدهٔ فنی و حرفه‌ای شهید شمسی‌پور",
    ),
    period: text("Sep 2019 — Jul 2023", "سپتامبر ۲۰۱۹ — ژوئیهٔ ۲۰۲۳"),
    gpa: "18.92 / 20",
    details: [
      text(
        "Developed Tarjoman with React Native, an application for learning programming languages.",
        "توسعهٔ ترجمان با React Native؛ اپلیکیشنی برای یادگیری زبان‌های برنامه‌نویسی.",
      ),
    ],
  },
  {
    degree: text("Diploma · Computer", "دیپلم کامپیوتر"),
    institution: text(
      "Darolfonoon Technical and Professional Conservatory",
      "هنرستان فنی و حرفه‌ای دارالفنون",
    ),
    period: text("Oct 2016 — Jan 2019", "اکتبر ۲۰۱۶ — ژانویهٔ ۲۰۱۹"),
    gpa: "19.97 / 20",
    details: [],
  },
];

export const skillGroups = [
  {
    name: text("Interfaces & applications", "رابط کاربری و اپلیکیشن"),
    items: [
      "Flutter",
      "React",
      "Next.js",
      "React Native",
      "Provider",
      "Redux Toolkit",
      "RTK Query",
      "Tauri",
    ],
  },
  {
    name: text("Languages & back end", "زبان‌ها و بک‌اند"),
    items: [
      "Dart",
      "TypeScript",
      "JavaScript",
      "Python",
      "Solidity",
      "Express.js",
      "Flask",
      "C",
    ],
  },
  {
    name: text("Infrastructure & security", "زیرساخت و امنیت"),
    items: [
      "Git",
      "Linux / Bash",
      "Docker",
      "CI/CD",
      "Firebase",
      "Android Security",
      "ECDH",
      "ChaCha20-Poly1305",
    ],
  },
  {
    name: text("Research & engineering", "پژوهش و مهندسی"),
    items: [
      "IoT / IoMT",
      "FreeRTOS",
      "Blockchain / Web3",
      "XGBoost",
      "LLM Inference",
      "UML",
      "LaTeX",
      "Documentation",
    ],
  },
];

export type ProjectCategory = "tools" | "research";
export const projects: {
  id: string;
  title: string;
  category: ProjectCategory;
  description: LocalizedText;
  tags: string[];
  repo?: string;
  featured?: boolean;
  visual?: "lamda" | "map" | "sandogh";
  href?: string;
  details?: LocalizedText[];
}[] = [
  {
    id: "sandogh",
    title: "Sandogh / صندوق",
    category: "tools",
    featured: true,
    visual: "sandogh",
    description: text(
      "A gold-market decision assistant for people in Iran, where the rial's weak purchasing power has led many to turn to gold. Sandogh helps users assess when buying, selling, or waiting makes sense through statistics and probability rather than price prediction.",
      "تصمیم‌یار بازار طلا برای مردم ایران؛ جایی که کاهش ارزش ریال، بسیاری را به خرید طلا سوق داده است. صندوق با آمار و احتمالات کمک می‌کند منطق خرید، فروش یا صبر را در شرایط فعلی بسنجیم؛ بدون پیش‌بینی قیمت.",
    ),
    details: [
      text(
        "The analysis brings together conflict and Middle East developments, global gold prices, domestic and international economic conditions, exchange activity, and political news. Suggestions reflect each user's portfolio, including how many grams of gold they have bought or sold.",
        "تحلیل، شرایط جنگی و تحولات خاورمیانه، اونس جهانی طلا، مبادلات و اقتصاد داخل و خارج و اخبار سیاسی را کنار هم قرار می‌دهد. پیشنهاد هر لحظه متناسب با پورتفولیوی هر کاربر، از جمله مقدار طلایی که به گرم خریده یا فروخته، شکل می‌گیرد.",
      ),
      text(
        "The biggest constraint is limited access to gold and dollar price APIs. I am working toward an operational subscription product, using that revenue to strengthen the data access, infrastructure, and analysis.",
        "بزرگ‌ترین محدودیت فعلی، نداشتن دسترسی نامحدود به APIهای قیمت طلا و دلار است. در تلاشم محصول را به مرحلهٔ عملیاتی و فروش اشتراک برسانم تا با درآمد آن، دسترسی به داده‌ها، زیرساخت و تحلیل‌ها را قوی‌تر کنم.",
      ),
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Statistics"],
    href: "https://sandogh-app-rho.vercel.app/",
  },
  {
    id: "lamda",
    title: "Lamda RED",
    category: "tools",
    featured: true,
    visual: "lamda",
    description: text(
      "A text-first tool for requirement engineering diagrams. Turn straightforward syntax into diagrams, without a mouse-heavy workflow. Built with Rust, 2024–present.",
      "ابزاری متن‌محور برای رسم نمودارهای مهندسی نیازمندی؛ تبدیل دستورهای ساده به نمودار بدون نیاز به گردش کاری وابسته به ماوس. توسعه با Rust، از ۲۰۲۴ تاکنون.",
    ),
    tags: ["Rust", "Developer Tools", "Open Source"],
    repo: "lamda_red",
  },
  {
    id: "maps",
    title: "Raster / Vector Map Server",
    category: "tools",
    featured: true,
    visual: "map",
    description: text(
      "A local map service for serving raster and vector maps. Built with Node.js and GIS technologies, 2021–2022.",
      "سرویس محلی ارائهٔ نقشه‌های رستری و وکتوری؛ توسعه با Node.js و فناوری‌های GIS در سال‌های ۲۰۲۱ تا ۲۰۲۲.",
    ),
    tags: ["Node.js", "GIS", "Maps"],
  },
  {
    id: "proteins",
    title: "Protein Interaction Networks",
    category: "research",
    description: text(
      "Exploring protein interaction pathways and network graphs, with research into serotonin modulation and depression treatment.",
      "بررسی مسیرهای تعامل پروتئین و گراف شبکه‌های تعاملی با پژوهش دربارهٔ تعدیل سروتونین و درمان افسردگی.",
    ),
    tags: ["Bioinformatics", "Network Graphs"],
    repo: "protein-interaction-networks-graph",
  },
  {
    id: "explainable",
    title: "Explainable Software Systems",
    category: "research",
    description: text(
      "A report on explainable software systems, from requirements analysis through system evaluation.",
      "گزارشی دربارهٔ سیستم‌های نرم‌افزاری توضیح‌پذیر، از تحلیل نیازمندی‌ها تا ارزیابی سیستم.",
    ),
    tags: ["Software Engineering", "Requirements"],
    repo: "explainable-software-systems-report",
  },
  {
    id: "blockchain",
    title: "Blockchain Papers",
    category: "research",
    description: text(
      "Persian-language papers and notes exploring blockchain networks and secure, decentralized data transfer.",
      "مقاله‌ها و یادداشت‌های فارسی دربارهٔ شبکه‌های بلاک‌چین و انتقال امن و غیرمتمرکز داده.",
    ),
    tags: ["Blockchain", "Security", "Persian"],
    repo: "bc-papers",
  },
  {
    id: "rtos",
    title: "RTOS Terminologies",
    category: "research",
    description: text(
      "Study notes on reliable real-time operating systems for Internet of Things devices.",
      "یادداشت‌های مطالعاتی دربارهٔ سیستم‌عامل‌های بلادرنگ قابل اعتماد برای دستگاه‌های اینترنت اشیا.",
    ),
    tags: ["RTOS", "IoT", "Embedded"],
    repo: "rtos-terminologies",
  },
  {
    id: "nosql",
    title: "NoSQL Breakdown",
    category: "research",
    description: text(
      "A large-scale analysis of misconfigured NoSQL services and their security implications.",
      "تحلیل گستردهٔ سرویس‌های NoSQL با پیکربندی نادرست و پیامدهای امنیتی آن‌ها.",
    ),
    tags: ["NoSQL", "Security"],
    repo: "misconfigured-nosql-breakdown",
  },
  {
    id: "mesh",
    title: "Parallel Addition Mesh",
    category: "tools",
    description: text(
      "A parallel addition mesh algorithm with a sample implementation in Rust.",
      "الگوریتم جمع موازی شبکه‌ای به همراه نمونهٔ پیاده‌سازی با Rust.",
    ),
    tags: ["Rust", "Parallel Computing"],
    repo: "parallel-addition-mesh",
  },
  {
    id: "pegn",
    title: "Parsing Expression Grammar",
    category: "tools",
    description: text(
      "Notes and experiments with Parsing Expression Grammar Notation (PEGN).",
      "یادداشت‌ها و تجربه‌ها با نمادگذاری گرامر عبارت تجزیه یا PEGN.",
    ),
    tags: ["Parsing", "PEGN"],
    repo: "pegn-learn",
  },
  {
    id: "snmp",
    title: "SNMP Client",
    category: "tools",
    description: text(
      "A sample SNMP producer microservice written in Rust.",
      "نمونه‌ای از میکروسرویس تولیدکنندهٔ SNMP نوشته‌شده با Rust.",
    ),
    tags: ["Rust", "SNMP", "Microservices"],
    repo: "open-rsp",
  },
  {
    id: "sparql",
    title: "SPARQL Query Notes",
    category: "tools",
    description: text(
      "A collection of SPARQL queries and learning notes.",
      "مجموعه‌ای از کوئری‌های SPARQL و یادداشت‌های یادگیری.",
    ),
    tags: ["SPARQL", "Semantic Web"],
    repo: "easy-sparql",
  },
];
