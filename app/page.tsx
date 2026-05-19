"use client";

import React, { useMemo, useState } from "react";

type LangMode = "both" | "en" | "hi";

type PageId =
  | "home"
  | "manifesto"
  | "about"
  | "constitution"
  | "student"
  | "antiCorruption"
  | "contact"
  | "privacy";

type I18n = {
  en: string;
  hi: string;
};

type ManifestoSection = {
  id: string;
  icon: string;
  title: I18n;
  goal: I18n;
  points: I18n[];
};

const INSTAGRAM_URL =
  "https://www.instagram.com/cockroachindiaparty_?igsh=ZTA2ejhxbDFrdXR2&utm_source=qr";

const navItems: { id: PageId; label: I18n }[] = [
  { id: "home", label: { en: "Home", hi: "होम" } },
  { id: "manifesto", label: { en: "Manifesto", hi: "घोषणापत्र" } },
  { id: "about", label: { en: "About", hi: "परिचय" } },
  { id: "constitution", label: { en: "Constitution", hi: "संविधान" } },
  { id: "student", label: { en: "Student First", hi: "छात्र प्रथम" } },
  { id: "antiCorruption", label: { en: "Anti-Corruption", hi: "भ्रष्टाचार विरोध" } },
  { id: "contact", label: { en: "Join", hi: "जुड़ें" } },
];

const manifesto: ManifestoSection[] = [
  {
    id: "zero-corruption",
    icon: "🛡️",
    title: { en: "Zero Corruption Governance", hi: "शून्य भ्रष्टाचार शासन" },
    goal: {
      en: "Make public money fully visible, public offices fully accountable, and corruption politically impossible.",
      hi: "जनता का पैसा पूरी तरह दिखाई दे, पद जवाबदेह हों और भ्रष्टाचार असंभव बने।",
    },
    points: [
      {
        en: "Every government expense must be visible publicly in real time through a simple digital dashboard.",
        hi: "हर सरकारी खर्च रियल टाइम डिजिटल डैशबोर्ड पर जनता को दिखे।",
      },
      {
        en: "Fast-track anti-corruption courts must decide proven corruption cases within 6 months.",
        hi: "साबित भ्रष्टाचार मामलों का फैसला 6 महीने में हो।",
      },
      {
        en: "All government tenders must be digital, transparent, searchable, and monitored by AI systems.",
        hi: "सभी सरकारी टेंडर डिजिटल, पारदर्शी और AI निगरानी में हों।",
      },
      {
        en: "Every minister and senior public official must publish yearly performance reports.",
        hi: "हर मंत्री और वरिष्ठ अधिकारी सालाना प्रदर्शन रिपोर्ट सार्वजनिक करे।",
      },
      {
        en: "Any public representative convicted in corruption must face a lifetime political ban.",
        hi: "भ्रष्टाचार में दोषी जनप्रतिनिधि को राजनीति से आजीवन प्रतिबंध मिले।",
      },
    ],
  },
  {
    id: "asset-verification",
    icon: "⚖️",
    title: {
      en: "Leader Asset Verification & Anti-Corruption Punishment",
      hi: "नेताओं की संपत्ति जांच और कठोर सजा",
    },
    goal: {
      en: "Every political leader and senior official must face strict asset verification and real punishment for corruption.",
      hi: "हर नेता और अधिकारी की संपत्ति जांच हो और भ्रष्टाचार पर वास्तविक सजा मिले।",
    },
    points: [
      {
        en: "All leaders of every political party must submit yearly public asset declarations.",
        hi: "हर दल के नेता अपनी सालाना सार्वजनिक संपत्ति घोषणा करें।",
      },
      {
        en: "A CID-led asset verification unit must investigate suspicious income growth and benami property.",
        hi: "CID आधारित संपत्ति जांच इकाई संदिग्ध आय और बेनामी संपत्ति की जांच करे।",
      },
      {
        en: "After due legal process, corruption conviction must include minimum 10 years of jail.",
        hi: "कानूनी प्रक्रिया के बाद भ्रष्टाचार में दोषी को न्यूनतम 10 साल जेल मिले।",
      },
      {
        en: "Assets earned through corruption must be seized, including assets transferred to relatives or associates.",
        hi: "भ्रष्टाचार से कमाई संपत्ति और रिश्तेदारों को दी गई संपत्ति जब्त हो।",
      },
      {
        en: "A convicted person must face a lifetime ban from elections, party posts, and government contracts.",
        hi: "दोषी व्यक्ति चुनाव, पार्टी पद और सरकारी ठेकों से आजीवन प्रतिबंधित हो।",
      },
    ],
  },
  {
    id: "student-first",
    icon: "🎓",
    title: { en: "Student First Government", hi: "छात्र प्रथम सरकार" },
    goal: {
      en: "Treat students, youth, and future generations as the first priority of national development.",
      hi: "छात्र, युवा और भविष्य की पीढ़ी राष्ट्रीय विकास की पहली प्राथमिकता हों।",
    },
    points: [
      {
        en: "Every major policy must be evaluated on how it improves the future of students.",
        hi: "हर नीति को छात्रों के भविष्य पर प्रभाव के आधार पर परखा जाए।",
      },
      {
        en: "Student First Councils must be created at national, state, and district level.",
        hi: "राष्ट्रीय, राज्य और जिला स्तर पर Student First Council बने।",
      },
      {
        en: "Exam delays, paper leaks, and unfair recruitment delays must be treated as governance failures.",
        hi: "पेपर लीक, परीक्षा देरी और भर्ती देरी को शासन की विफलता माना जाए।",
      },
      {
        en: "Public universities and colleges must become innovation and startup hubs.",
        hi: "सरकारी कॉलेज और विश्वविद्यालय इनोवेशन और स्टार्टअप हब बनें।",
      },
      {
        en: "Education, skills, research, sports, mental health, and youth employment must get budget priority.",
        hi: "शिक्षा, कौशल, रिसर्च, खेल, मानसिक स्वास्थ्य और युवा रोजगार को बजट प्राथमिकता मिले।",
      },
    ],
  },
  {
    id: "education",
    icon: "📚",
    title: { en: "Education Revolution", hi: "शिक्षा क्रांति" },
    goal: {
      en: "Make India the smartest, most skilled, and most employable workforce in the world.",
      hi: "भारत को दुनिया की सबसे शिक्षित, कुशल और रोजगार योग्य शक्ति बनाना।",
    },
    points: [
      {
        en: "Free high-quality education from KG to graduation must be available for deserving students.",
        hi: "योग्य छात्रों को KG से ग्रेजुएशन तक मुफ्त उच्च गुणवत्ता शिक्षा मिले।",
      },
      {
        en: "AI, coding, finance, robotics, communication, and problem-solving must start from Class 6.",
        hi: "कक्षा 6 से AI, कोडिंग, वित्त, रोबोटिक्स और समस्या समाधान सिखाया जाए।",
      },
      {
        en: "Every student must become fluent in English plus one regional language.",
        hi: "हर छात्र अंग्रेजी और एक क्षेत्रीय भाषा में दक्ष बने।",
      },
      {
        en: "Every district must get one world-class government university or skill campus.",
        hi: "हर जिले में विश्वस्तरीय सरकारी विश्वविद्यालय या कौशल कैंपस बने।",
      },
      {
        en: "Education must move from rote memorization to projects, internships, and real-world problem solving.",
        hi: "शिक्षा रटने से हटकर प्रोजेक्ट, इंटर्नशिप और वास्तविक समस्या समाधान पर आधारित हो।",
      },
    ],
  },
  {
    id: "jobs-economy",
    icon: "🏭",
    title: { en: "Jobs & Economy", hi: "रोजगार और अर्थव्यवस्था" },
    goal: {
      en: "Create 100 million high-paying jobs and make India a global production and innovation powerhouse.",
      hi: "10 करोड़ उच्च वेतन वाली नौकरियां और भारत को उत्पादन व नवाचार शक्ति बनाना।",
    },
    points: [
      {
        en: "India must launch a massive manufacturing push in electronics, chips, EVs, defense, robotics, and clean energy.",
        hi: "इलेक्ट्रॉनिक्स, चिप्स, EV, रक्षा और रोबोटिक्स में मजबूत मैन्युफैक्चरिंग नीति बने।",
      },
      {
        en: "Companies creating verified jobs must receive tax benefits and faster approvals.",
        hi: "वास्तविक नौकरियां बनाने वाली कंपनियों को टैक्स लाभ और तेज अनुमतियां मिले।",
      },
      {
        en: "Youth startup funding must be available without collateral for serious founders.",
        hi: "गंभीर युवा उद्यमियों को बिना गारंटी स्टार्टअप फंडिंग मिले।",
      },
      {
        en: "Business registration and compliance must be simplified so small businesses can start within 24 hours.",
        hi: "छोटे व्यवसाय 24 घंटे में कानूनी रूप से शुरू हो सकें।",
      },
      {
        en: "A government-backed apprenticeship program must connect freshers with companies.",
        hi: "सरकारी अप्रेंटिसशिप प्रोग्राम फ्रेशर्स को कंपनियों से जोड़े।",
      },
    ],
  },
  {
    id: "worker-rights",
    icon: "👥",
    title: { en: "Private Sector Jobs & Worker Rights", hi: "निजी क्षेत्र रोजगार और कर्मचारी अधिकार" },
    goal: {
      en: "Protect private employees from exploitation, unpaid overtime, and unhealthy work culture.",
      hi: "निजी कर्मचारियों को शोषण, बिना भुगतान ओवरटाइम और खराब कार्य संस्कृति से बचाना।",
    },
    points: [
      {
        en: "A 5-day work week must become the standard across every sector and company.",
        hi: "हर सेक्टर और हर कंपनी में 5 दिन का कार्य सप्ताह मानक बने।",
      },
      {
        en: "Employees working beyond legal hours must receive overtime pay or legally approved time-off.",
        hi: "कानूनी समय से अधिक काम पर ओवरटाइम या वैध टाइम-ऑफ मिले।",
      },
      {
        en: "Labour law action teams must verify compliance through audits and anonymous complaints.",
        hi: "श्रम कानून टीम ऑडिट और गुमनाम शिकायतों से अनुपालन जांचे।",
      },
      {
        en: "A fast complaint system must protect employees facing unpaid overtime or forced extra hours.",
        hi: "तेज शिकायत प्रणाली बिना भुगतान ओवरटाइम और जबरन अतिरिक्त काम से बचाए।",
      },
      {
        en: "Companies repeatedly violating employee rights must face penalties and public compliance ratings.",
        hi: "बार-बार अधिकार तोड़ने वाली कंपनियों पर जुर्माना और सार्वजनिक रेटिंग हो।",
      },
    ],
  },
  {
    id: "ai-tech",
    icon: "🤖",
    title: { en: "AI & Technology Superpower", hi: "AI और तकनीक महाशक्ति" },
    goal: {
      en: "Make India the global AI capital and build trusted Indian technology platforms.",
      hi: "भारत को वैश्विक AI राजधानी और भारतीय तकनीकी शक्ति बनाना।",
    },
    points: [
      {
        en: "A National AI Mission must operate in every university with labs, computing access, and research grants.",
        hi: "हर विश्वविद्यालय में AI मिशन, लैब, कंप्यूटिंग और रिसर्च ग्रांट हो।",
      },
      {
        en: "India must build domestic alternatives to foreign AI tools, cloud platforms, and cybersecurity products.",
        hi: "भारत विदेशी AI टूल, क्लाउड और साइबर सुरक्षा के भारतीय विकल्प बनाए।",
      },
      {
        en: "Students, researchers, and startups must get cheap internet, cloud credits, and GPU access.",
        hi: "छात्रों, शोधकर्ताओं और स्टार्टअप को इंटरनेट, क्लाउड और GPU सुविधा मिले।",
      },
      {
        en: "Government AI labs must solve Indian problems in healthcare, farming, education, law, and defense.",
        hi: "सरकारी AI लैब स्वास्थ्य, खेती, शिक्षा, कानून और रक्षा की समस्याएं हल करें।",
      },
      {
        en: "Semiconductor, robotics, drone, battery, EV, and electronics zones must be built.",
        hi: "सेमीकंडक्टर, रोबोटिक्स, ड्रोन, बैटरी, EV और इलेक्ट्रॉनिक्स जोन बनें।",
      },
    ],
  },
  {
    id: "justice",
    icon: "🏛️",
    title: { en: "Law, Order & Justice", hi: "कानून, व्यवस्था और न्याय" },
    goal: {
      en: "Create fear for criminals, safety for citizens, and fast justice for victims.",
      hi: "अपराधियों में डर, नागरिकों को सुरक्षा और पीड़ितों को तेज न्याय।",
    },
    points: [
      {
        en: "Fast-track courts must handle rape, murder, corruption, scams, and serious violence with strict timelines.",
        hi: "गंभीर अपराधों के लिए समयबद्ध फास्ट-ट्रैक कोर्ट हों।",
      },
      {
        en: "Police modernization must include body cameras, digital case records, forensic labs, and better training.",
        hi: "पुलिस में बॉडी कैमरा, डिजिटल केस, फॉरेंसिक लैब और बेहतर प्रशिक्षण हो।",
      },
      {
        en: "Organized crime, political violence, extortion, land mafia, and cyber fraud must face strict punishment.",
        hi: "संगठित अपराध, राजनीतिक हिंसा, जमीन माफिया और साइबर फ्रॉड पर कठोर कार्रवाई हो।",
      },
      {
        en: "Every city must have a women safety task force and safe transport monitoring.",
        hi: "हर शहर में महिला सुरक्षा टास्क फोर्स और सुरक्षित परिवहन निगरानी हो।",
      },
      {
        en: "VIP culture, police pressure, and criminal protection must end through independent oversight.",
        hi: "VIP संस्कृति, पुलिस पर दबाव और अपराधियों को संरक्षण समाप्त हो।",
      },
    ],
  },
  {
    id: "healthcare",
    icon: "🏥",
    title: { en: "Healthcare for Every Indian", hi: "हर भारतीय के लिए स्वास्थ्य सेवा" },
    goal: {
      en: "Make essential healthcare accessible, affordable, digital, and fast for every citizen.",
      hi: "जरूरी स्वास्थ्य सेवा हर नागरिक के लिए सुलभ, सस्ती, डिजिटल और तेज हो।",
    },
    points: [
      {
        en: "Free emergency healthcare must be available in all government hospitals.",
        hi: "हर सरकारी अस्पताल में मुफ्त आपातकालीन इलाज मिले।",
      },
      {
        en: "Every citizen must have one privacy-protected AI-powered health record.",
        hi: "हर नागरिक का गोपनीय AI स्वास्थ्य रिकॉर्ड हो।",
      },
      {
        en: "More medical colleges, rural hospitals, mobile clinics, and telemedicine centers must be created.",
        hi: "मेडिकल कॉलेज, ग्रामीण अस्पताल, मोबाइल क्लिनिक और टेलीमेडिसिन केंद्र बढ़ें।",
      },
      {
        en: "Essential medicines, diagnostic tests, and basic hospital services must have price controls.",
        hi: "जरूरी दवाओं, जांच और अस्पताल सेवाओं पर मूल्य नियंत्रण हो।",
      },
      {
        en: "Mental health support must be available in schools, colleges, workplaces, and public hospitals.",
        hi: "स्कूल, कॉलेज, कार्यस्थल और अस्पतालों में मानसिक स्वास्थ्य सहायता मिले।",
      },
    ],
  },
  {
    id: "digital-government",
    icon: "📱",
    title: { en: "Digital Government", hi: "डिजिटल सरकार" },
    goal: {
      en: "Make government services simple, paperless, fast, transparent, and citizen-friendly.",
      hi: "सरकारी सेवाएं सरल, पेपरलेस, तेज, पारदर्शी और नागरिक-अनुकूल बनाना।",
    },
    points: [
      {
        en: "One national citizen app must provide government services, documents, schemes, and complaint tracking.",
        hi: "एक नागरिक ऐप में सेवाएं, दस्तावेज, योजनाएं और शिकायत ट्रैकिंग हो।",
      },
      {
        en: "Government offices must become paperless with digital approvals and file tracking.",
        hi: "सरकारी कार्यालय डिजिटल मंजूरी और फाइल ट्रैकिंग के साथ पेपरलेस हों।",
      },
      {
        en: "AI chat support must help citizens understand schemes and file complaints in local languages.",
        hi: "AI चैट नागरिकों को योजनाएं समझाए और स्थानीय भाषा में शिकायत दर्ज कराए।",
      },
      {
        en: "Most citizen complaints must be resolved within 7 days with escalation rules.",
        hi: "अधिकांश शिकायतें 7 दिन में हल हों और एस्केलेशन नियम हों।",
      },
      {
        en: "Digital governance must reduce middlemen, corruption, repeated documents, and office visits.",
        hi: "डिजिटल शासन बिचौलियों, भ्रष्टाचार और दफ्तर चक्कर कम करे।",
      },
    ],
  },
  {
    id: "foreign-policy",
    icon: "🌍",
    title: { en: "Foreign Policy", hi: "विदेश नीति" },
    goal: {
      en: "Build an India respected globally and powerful in trade, technology, defense, and diplomacy.",
      hi: "विश्व में सम्मानित और व्यापार, तकनीक, रक्षा व कूटनीति में शक्तिशाली भारत।",
    },
    points: [
      {
        en: "India must sign trade deals focused on Indian jobs, exports, manufacturing, and technology transfer.",
        hi: "भारत ऐसे व्यापार समझौते करे जो नौकरियों, निर्यात और तकनीक हस्तांतरण को मजबूत करें।",
      },
      {
        en: "India must build global influence in AI, defense, manufacturing, space, education, and digital infrastructure.",
        hi: "AI, रक्षा, निर्माण, अंतरिक्ष, शिक्षा और डिजिटल इंफ्रा में भारत प्रभाव बनाए।",
      },
      {
        en: "Indians abroad must receive stronger diplomatic support, legal assistance, and emergency help.",
        hi: "विदेश में भारतीयों को कूटनीतिक, कानूनी और आपात सहायता मिले।",
      },
      {
        en: "India must become a top 3 economy through productivity, exports, innovation, and infrastructure.",
        hi: "उत्पादकता, निर्यात, नवाचार और इंफ्रास्ट्रक्चर से भारत शीर्ष 3 अर्थव्यवस्था बने।",
      },
      {
        en: "Foreign policy must be independent, confident, India-first, and strategically autonomous.",
        hi: "विदेश नीति स्वतंत्र, आत्मविश्वासी, India-first और रणनीतिक रूप से स्वायत्त हो।",
      },
    ],
  },
];

const targets: I18n[] = [
  { en: "Developed nation by 2047", hi: "2047 तक विकसित राष्ट्र" },
  { en: "World's largest AI talent hub", hi: "दुनिया का सबसे बड़ा AI प्रतिभा केंद्र" },
  { en: "Top 3 economy globally", hi: "विश्व की शीर्ष 3 अर्थव्यवस्था" },
  { en: "100% literacy", hi: "100% साक्षरता" },
  { en: "World-class infrastructure", hi: "विश्वस्तरीय इंफ्रास्ट्रक्चर" },
  { en: "Lowest corruption in Asia", hi: "एशिया में सबसे कम भ्रष्टाचार" },
  { en: "Safest country for women and businesses", hi: "महिलाओं और व्यवसायों के लिए सबसे सुरक्षित देश" },
  { en: "Indian passport among world's strongest", hi: "दुनिया के सबसे मजबूत पासपोर्ट में भारतीय पासपोर्ट" },
];

const constitutionItems: I18n[] = [
  { en: "Internal party elections must be mandatory at fixed intervals.", hi: "निश्चित समय पर पार्टी के भीतर चुनाव अनिवार्य होंगे।" },
  { en: "Candidates must pass public background, asset, criminal-record, and performance screening.", hi: "उम्मीदवारों की पृष्ठभूमि, संपत्ति, आपराधिक रिकॉर्ड और प्रदर्शन जांच होगी।" },
  { en: "All donations must be recorded transparently and published through a public donation ledger.", hi: "सभी दान पारदर्शी रूप से सार्वजनिक दान रजिस्टर में दिखेंगे।" },
  { en: "No hate politics based on religion, caste, language, gender, or region.", hi: "धर्म, जाति, भाषा, लिंग या क्षेत्र के आधार पर नफरत की राजनीति नहीं होगी।" },
  { en: "Party leaders must disclose assets yearly and face disciplinary action for false reporting.", hi: "पार्टी नेता हर साल संपत्ति घोषित करेंगे और गलत रिपोर्टिंग पर कार्रवाई होगी।" },
  { en: "Minister selection must be performance-based, not dynasty-based.", hi: "मंत्री चयन प्रदर्शन के आधार पर होगा, वंशवाद के आधार पर नहीं।" },
];

function runSelfTests() {
  return {
    hasEnoughManifestoSections: manifesto.length >= 10,
    hasAssetVerification: manifesto.some((item) => item.id === "asset-verification"),
    hasStudentFirst: manifesto.some((item) => item.id === "student-first"),
    hasWorkerRights: manifesto.some((item) => item.id === "worker-rights"),
    allSectionsHaveHindi: manifesto.every(
      (item) => item.title.hi && item.goal.hi && item.points.every((point) => point.hi),
    ),
    allSectionsHaveFivePoints: manifesto.every((item) => item.points.length >= 5),
    hasConstitution: constitutionItems.length >= 6,
  };
}

function CockroachIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20 19C14 12 8 10 4 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 19C50 12 56 10 60 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 18C22 12 26 8 32 8C38 8 42 12 42 18" stroke="currentColor" strokeWidth="3" />
      <path
        d="M18 32C18 20 24 14 32 14C40 14 46 20 46 32C46 45 40 56 32 56C24 56 18 45 18 32Z"
        fill="currentColor"
      />
      <path d="M32 15V56" stroke="white" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 28H8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 28H56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 38L8 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 38L56 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 48L12 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 48L52 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="27" cy="18" r="2" fill="white" />
      <circle cx="37" cy="18" r="2" fill="white" />
    </svg>
  );
}

function HindiShadow({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`mt-1 block font-black text-black/20 drop-shadow-[0_1px_0_rgba(0,0,0,0.18)] ${className}`}
      lang="hi"
    >
      {text}
    </span>
  );
}

function BilingualText({
  value,
  mode,
  hiClassName = "text-xs leading-4",
}: {
  value: I18n;
  mode: LangMode;
  hiClassName?: string;
}) {
  if (mode === "en") return <>{value.en}</>;
  if (mode === "hi") return <span lang="hi">{value.hi}</span>;

  return (
    <>
      <span>{value.en}</span>
      <HindiShadow text={value.hi} className={hiClassName} />
    </>
  );
}

function PageEyebrow({ value, mode }: { value: I18n; mode: LangMode }) {
  return (
    <p className="text-base font-black uppercase tracking-[0.22em] text-black/45">
      <BilingualText value={value} mode={mode} hiClassName="text-[10px] leading-3 tracking-normal" />
    </p>
  );
}

function PageTitle({ value, mode }: { value: I18n; mode: LangMode }) {
  return (
    <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
      <BilingualText value={value} mode={mode} hiClassName="text-lg leading-6 tracking-normal md:text-2xl" />
    </h1>
  );
}

function ManifestoCard({ section, index, mode }: { section: ManifestoSection; index: number; mode: LangMode }) {
  return (
    <div className="reveal-card group rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-2xl text-white transition group-hover:scale-105">
          {section.icon}
        </div>
        <div>
          <p className="text-sm font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">
            <BilingualText value={section.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal" />
          </h3>
          <p className="mt-3 text-sm font-black leading-6 text-black/70">
            <BilingualText
              value={{ en: `Goal: ${section.goal.en}`, hi: `लक्ष्य: ${section.goal.hi}` }}
              mode={mode}
              hiClassName="text-[11px] leading-4"
            />
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-3 border-t border-black/10 pt-5">
        {section.points.map((point) => (
          <li key={point.en} className="flex gap-3 text-sm font-bold leading-6 text-black/75">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
            <span>
              <BilingualText value={point} mode={mode} hiClassName="text-[11px] leading-4" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomePage({ mode, setPage }: { mode: LangMode; setPage: (page: PageId) => void }) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-7 inline-flex flex-col items-center gap-1 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span>✓ Vision 2047 Manifesto</span>
            <HindiShadow text="विजन 2047 घोषणापत्र" className="text-[10px] leading-3" />
          </div>

          <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl lg:text-8xl">
            <BilingualText
              value={{ en: "India's future-first political movement.", hi: "भारत का भविष्य-प्रथम राजनीतिक आंदोलन।" }}
              mode={mode}
              hiClassName="mt-4 text-lg leading-6 tracking-normal md:text-2xl"
            />
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg font-bold leading-8 text-black/65">
            <BilingualText
              value={{
                en: "A political movement focused on jobs, education, technology, discipline, justice, and national growth - not caste politics, hate, or empty slogans.",
                hi: "रोजगार, शिक्षा, तकनीक, अनुशासन, न्याय और राष्ट्रीय विकास पर केंद्रित आंदोलन - जाति राजनीति, नफरत या खाली नारों पर नहीं।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5"
            />
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setPage("contact")}
              className="rounded-full bg-black px-8 py-4 text-base font-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/85 hover:shadow-xl"
            >
              Join the Movement →
            </button>
            <button
              onClick={() => setPage("manifesto")}
              className="rounded-full border border-black/15 bg-white px-8 py-4 text-base font-black transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/5 hover:shadow-xl"
            >
              Read Full Manifesto
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {[
            { en: "Jobs", hi: "रोजगार" },
            { en: "Education", hi: "शिक्षा" },
            { en: "Technology", hi: "तकनीक" },
            { en: "Justice", hi: "न्याय" },
          ].map((item) => (
            <div
              key={item.en}
              className="reveal-card rounded-[2rem] border border-black/10 bg-white p-6 text-center shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <p className="text-2xl font-black tracking-[-0.04em]">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4" />
              </p>
              <p className="mt-2 text-xs font-bold text-black/50">National priority</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <PageEyebrow value={{ en: "India 2047", hi: "भारत 2047" }} mode={mode} />
              <PageTitle
                value={{ en: "The world's most trusted, educated and powerful nation.", hi: "दुनिया का सबसे विश्वसनीय, शिक्षित और शक्तिशाली राष्ट्र।" }}
                mode={mode}
              />
            </div>
            <p className="text-lg font-bold leading-8 text-black/65">
              <BilingualText
                value={{
                  en: "The goal is not just to win elections. The goal is to build an India that leads the world in trust, talent, technology, safety, economic strength, and citizen dignity.",
                  hi: "लक्ष्य केवल चुनाव जीतना नहीं है। लक्ष्य ऐसा भारत बनाना है जो भरोसे, प्रतिभा, तकनीक, सुरक्षा, आर्थिक शक्ति और नागरिक सम्मान में दुनिया का नेतृत्व करे।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5"
              />
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {targets.map((target) => (
              <div
                key={target.en}
                className="reveal-card rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <p className="text-base font-black tracking-[-0.02em]">
                  <BilingualText value={target} mode={mode} hiClassName="text-xs leading-4" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LaunchChecklist mode={mode} />
    </>
  );
}

function ManifestoPage({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-4xl">
          <PageEyebrow value={{ en: "Detailed Manifesto", hi: "विस्तृत घोषणापत्र" }} mode={mode} />
          <PageTitle value={{ en: "India First, Citizens First.", hi: "भारत प्रथम, नागरिक प्रथम।" }} mode={mode} />
        </div>
        <p className="max-w-md text-base font-bold leading-7 text-black/65">
          <BilingualText
            value={{
              en: "A simple, measurable, voter-friendly manifesto covering governance, jobs, education, technology, justice, healthcare, national security, and equal opportunity.",
              hi: "शासन, रोजगार, शिक्षा, तकनीक, न्याय, स्वास्थ्य, राष्ट्रीय सुरक्षा और समान अवसर पर सरल घोषणापत्र।",
            }}
            mode={mode}
            hiClassName="text-xs leading-4"
          />
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {manifesto.map((section, index) => (
          <ManifestoCard key={section.id} section={section} index={index} mode={mode} />
        ))}
      </div>
    </section>
  );
}

function AboutPage({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div className="rounded-[2rem] border border-black/10 bg-[#fafafa] p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
          <p className="text-base font-black text-black/45">
            <BilingualText
              value={{ en: "Cockroach icon is used as a movement mark in the header.", hi: "कॉकरोच आइकन हेडर में आंदोलन चिन्ह के रूप में उपयोग है।" }}
              mode={mode}
              hiClassName="text-xs"
            />
          </p>
        </div>
        <div>
          <PageEyebrow value={{ en: "About the Movement", hi: "आंदोलन का परिचय" }} mode={mode} />
          <PageTitle value={{ en: "Survival, discipline, and nation-building.", hi: "संघर्ष, अनुशासन और राष्ट्र-निर्माण।" }} mode={mode} />
          <p className="mt-8 text-lg font-bold leading-8 text-black/65">
            <BilingualText
              value={{
                en: "Cockroach India Party is a future-first public political movement built around resilience, transparency, student-first governance, anti-corruption, worker rights, technology leadership, and India 2047.",
                hi: "कॉकरोच इंडिया पार्टी भविष्य-प्रथम सार्वजनिक राजनीतिक आंदोलन है जो संघर्ष, पारदर्शिता, छात्र-प्रथम शासन, भ्रष्टाचार विरोध, कर्मचारी अधिकार, तकनीकी नेतृत्व और भारत 2047 पर आधारित है।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5"
            />
          </p>
          <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#fafafa] p-7">
            <p className="text-sm font-black leading-6 text-black/70">
              <BilingualText
                value={{
                  en: "Legal-safe disclaimer: This is a public political movement website. Official political party registration details will be updated after completion of legal registration. The icon shown here is a party/movement mark and should not be described as an official election symbol unless allotted under applicable election rules.",
                  hi: "कानूनी सूचना: यह सार्वजनिक राजनीतिक आंदोलन वेबसाइट है। कानूनी पंजीकरण पूरा होने के बाद आधिकारिक पार्टी विवरण जोड़े जाएंगे। यहां दिखाया गया आइकन पार्टी/आंदोलन चिन्ह है, आधिकारिक चुनाव चिन्ह नहीं।",
                }}
                mode={mode}
                hiClassName="text-xs leading-4"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConstitutionPage({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <PageEyebrow value={{ en: "Party Constitution", hi: "पार्टी संविधान" }} mode={mode} />
      <PageTitle value={{ en: "Rules before power.", hi: "सत्ता से पहले नियम।" }} mode={mode} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {constitutionItems.map((item, index) => (
          <div
            key={item.en}
            className="reveal-card rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
          >
            <p className="text-sm font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-4 text-xl font-black leading-7 tracking-[-0.03em]">
              <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FocusPage({ mode, sectionId, eyebrow }: { mode: LangMode; sectionId: string; eyebrow: I18n }) {
  const section = manifesto.find((item) => item.id === sectionId);

  if (!section) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xl font-black">Section not found.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <PageEyebrow value={eyebrow} mode={mode} />
      <PageTitle value={section.title} mode={mode} />
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="text-5xl">{section.icon}</div>
          <p className="mt-8 text-xl font-black leading-7 tracking-[-0.03em]">
            <BilingualText value={section.goal} mode={mode} hiClassName="text-xs leading-4 text-white/35" />
          </p>
        </div>
        <div className="grid gap-5">
          {section.points.map((point, index) => (
            <div
              key={point.en}
              className="reveal-card rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <p className="text-sm font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-base font-bold leading-7 text-black/75">
                <BilingualText value={point} mode={mode} hiClassName="text-xs leading-4" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="overflow-hidden rounded-[3rem] border border-black/10 bg-white shadow-sm transition-all duration-500 ease-out hover:shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <PageEyebrow value={{ en: "Join Now", hi: "अभी जुड़ें" }} mode={mode} />
            <PageTitle value={{ en: "Follow the movement on Instagram.", hi: "Instagram पर आंदोलन को फॉलो करें।" }} mode={mode} />
            <p className="mt-6 text-base font-bold leading-7 text-black/65">
              <BilingualText
                value={{
                  en: "Stay connected with updates, announcements, manifesto ideas, volunteer calls, and public movement content directly through our Instagram page.",
                  hi: "अपडेट, घोषणाएं, घोषणापत्र विचार, स्वयंसेवक कॉल और आंदोलन से जुड़ी जानकारी सीधे हमारे Instagram पेज पर देखें।",
                }}
                mode={mode}
                hiClassName="text-xs leading-4"
              />
            </p>
          </div>

          <div className="flex flex-col justify-center bg-[#fafafa] p-8 md:p-12">
            <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-5xl">📸</p>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">
                <BilingualText
                  value={{ en: "Cockroach India Party", hi: "कॉकरोच इंडिया पार्टी" }}
                  mode={mode}
                  hiClassName="text-sm leading-5 tracking-normal"
                />
              </h3>
              <p className="mt-3 text-sm font-bold text-black/50">@cockroachindiaparty_</p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-base font-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/85 hover:shadow-xl"
              >
                Follow on Instagram →
              </a>

              <p className="mt-5 text-xs font-bold text-black/45">
                <BilingualText
                  value={{ en: "No form. No personal details required.", hi: "कोई फॉर्म नहीं। कोई निजी जानकारी नहीं चाहिए।" }}
                  mode={mode}
                  hiClassName="text-[10px]"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacyPage({ mode }: { mode: LangMode }) {
  const items: I18n[] = [
    { en: "We do not collect personal details on the Join page.", hi: "Join पेज पर हम निजी जानकारी नहीं लेते।" },
    { en: "The Join page redirects users to Instagram for updates and public communication.", hi: "Join पेज उपयोगकर्ताओं को अपडेट के लिए Instagram पर भेजता है।" },
    { en: "Any future form or data collection will require clear consent and a visible privacy notice.", hi: "भविष्य में किसी भी फॉर्म या डेटा संग्रह के लिए स्पष्ट सहमति और गोपनीयता सूचना होगी।" },
    { en: "We do not sell personal data.", hi: "हम निजी डेटा नहीं बेचते।" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <PageEyebrow value={{ en: "Privacy Policy", hi: "गोपनीयता नीति" }} mode={mode} />
      <PageTitle value={{ en: "Simple and transparent data use.", hi: "सरल और पारदर्शी डेटा उपयोग।" }} mode={mode} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.en}
            className="reveal-card rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
          >
            <p className="text-base font-bold leading-7 text-black/75">
              <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LaunchChecklist({ mode }: { mode: LangMode }) {
  const checks = runSelfTests();
  const passed = Object.values(checks).every(Boolean);

  const launchItems: I18n[] = [
    { en: "Update app/layout.tsx metadata", hi: "app/layout.tsx metadata अपडेट करें" },
    { en: "Create favicon from the cockroach icon", hi: "कॉकरोच आइकन से favicon बनाएं" },
    { en: "Add Google Search Console verification", hi: "Google Search Console verification जोड़ें" },
    { en: "Add privacy-safe analytics", hi: "privacy-safe analytics जोड़ें" },
    { en: "Create 1200x630 social share image", hi: "1200x630 social share image बनाएं" },
    { en: "Deploy on Vercel and connect domain DNS", hi: "Vercel पर deploy करें और domain DNS connect करें" },
  ];

  return (
    <section className="border-y border-black/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-base font-black uppercase tracking-[0.22em] text-white/45">Launch Checklist</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
              Ready for serious launch.
            </h2>
            <p className="mt-8 text-base font-bold leading-7 text-white/55">
              Internal validation: {passed ? "Passed" : "Needs review"}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {launchItems.map((item) => (
              <div key={item.en} className="rounded-[2rem] border border-white/10 bg-white/5 p-5 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10">
                <p className="text-sm font-black leading-6">
                  ✓ <BilingualText value={item} mode={mode} hiClassName="text-[10px] leading-3 text-white/30" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CockroachIndiaParty() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [mode, setMode] = useState<LangMode>("both");

  const pageTitle = useMemo(() => {
    if (activePage === "privacy") return { en: "Privacy", hi: "गोपनीयता" };
    const found = navItems.find((item) => item.id === activePage);
    return found?.label ?? { en: "Home", hi: "होम" };
  }, [activePage]);

  return (
    <main
      className="min-h-screen bg-white text-[#0f0f0f] tracking-[-0.01em]"
      style={{ fontFamily: 'Inter, "SF Pro Display", "Segoe UI", Arial, "Noto Sans Devanagari", sans-serif' }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes softScale {
          from { opacity: 0; transform: scale(0.985); }
          to { opacity: 1; transform: scale(1); }
        }
        section { animation: softScale 0.55s ease-out both; }
        .reveal-card { animation: fadeUp 0.7s ease-out both; }
        button, select, input, textarea, a {
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
        }
        button:hover, select:hover, input:focus, textarea:focus, a:hover { transform: translateY(-1px); }
      `}</style>

      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">
          <button onClick={() => setActivePage("home")} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
              <CockroachIcon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">Cockroach India Party</p>
              <HindiShadow text="कॉकरोच इंडिया पार्टी" className="text-xs leading-3" />
              <p className="text-xs font-bold text-black/50">India First. Citizens First.</p>
            </div>
          </button>

          <div className="hidden items-center gap-5 text-sm font-bold text-black/60 xl:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`hover:text-black ${activePage === item.id ? "text-black" : ""}`}
              >
                <BilingualText value={item.label} mode={mode} hiClassName="text-[10px] leading-3" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value as LangMode)}
              className="rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-black outline-none"
              aria-label="Language mode"
            >
              <option value="both">English + हिंदी</option>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            <button
              onClick={() => setActivePage("contact")}
              className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/85 hover:shadow-xl"
            >
              Join
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 pb-4 xl:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black ${activePage === item.id ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/65"}`}
            >
              {mode === "hi" ? item.label.hi : item.label.en}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-b border-black/10 bg-[#fafafa] px-6 py-4 text-center text-sm font-black text-black/45">
        Current page: {pageTitle.en}
        <HindiShadow text={pageTitle.hi} className="text-[10px]" />
      </div>

      {activePage === "home" && <HomePage mode={mode} setPage={setActivePage} />}
      {activePage === "manifesto" && <ManifestoPage mode={mode} />}
      {activePage === "about" && <AboutPage mode={mode} />}
      {activePage === "constitution" && <ConstitutionPage mode={mode} />}
      {activePage === "student" && <FocusPage mode={mode} sectionId="student-first" eyebrow={{ en: "Student First Government", hi: "छात्र प्रथम सरकार" }} />}
      {activePage === "antiCorruption" && <FocusPage mode={mode} sectionId="asset-verification" eyebrow={{ en: "Anti-Corruption Guarantee", hi: "भ्रष्टाचार विरोध गारंटी" }} />}
      {activePage === "contact" && <ContactPage mode={mode} />}
      {activePage === "privacy" && <PrivacyPage mode={mode} />}

      <footer className="border-t border-black/10 px-6 py-10 text-center text-sm font-bold text-black/45">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap justify-center gap-3">
          {[...navItems, { id: "privacy" as PageId, label: { en: "Privacy", hi: "गोपनीयता" } }].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="rounded-full border border-black/10 px-4 py-2 hover:bg-black hover:text-white"
            >
              {mode === "hi" ? item.label.hi : item.label.en}
            </button>
          ))}
        </div>
        <p>
          © 2026 Cockroach India Party. Public movement website draft. Add official registration details only after legal registration.
          <HindiShadow
            text="© 2026 कॉकरोच इंडिया पार्टी। सार्वजनिक आंदोलन वेबसाइट ड्राफ्ट। कानूनी पंजीकरण के बाद ही आधिकारिक विवरण जोड़ें।"
            className="text-[10px]"
          />
        </p>
      </footer>
    </main>
  );
}
