"use client";

import React, { useEffect, useRef, useState } from "react";

type LangMode = "both" | "en" | "hi";

type PageId =
  | "home"
  | "manifesto"
  | "about"
  | "constitution"
  | "student"
  | "antiCorruption"
  | "noVip"
  | "greatIndia"
  | "contact"
  | "oath"
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


const navItems: { id: PageId; icon: string; label: I18n }[] = [
  { id: "home", icon: "🏠", label: { en: "Home", hi: "होम" } },
  { id: "manifesto", icon: "📜", label: { en: "Manifesto", hi: "घोषणापत्र" } },
  { id: "constitution", icon: "🚀", label: { en: "Vision", hi: "दृष्टि" } },
  { id: "antiCorruption", icon: "🛡️", label: { en: "Anti-Corruption", hi: "भ्रष्टाचार विरोध" } },
  { id: "noVip", icon: "🚫", label: { en: "No VIP Culture", hi: "VIP संस्कृति बंद" } },
  { id: "greatIndia", icon: "🇮🇳", label: { en: "India Mission", hi: "भारत मिशन" } },
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

const publicAccountabilityIssues: { title: I18n; explanation: I18n }[] = [
  {
    title: { en: "Ethanol Blending & Fuel Price Transparency", hi: "एथेनॉल ब्लेंडिंग और ईंधन मूल्य पारदर्शिता" },
    explanation: {
      en: "Citizens deserve a transparent audit of ethanol blending, petrol pricing, mileage impact, tax collection, farmer benefit, oil company benefit, and whether consumers actually received fair savings.",
      hi: "नागरिकों को एथेनॉल ब्लेंडिंग, पेट्रोल कीमत, माइलेज प्रभाव, टैक्स, किसान लाभ, तेल कंपनी लाभ और उपभोक्ता बचत की पारदर्शी जांच मिलनी चाहिए।",
    },
  },
  {
    title: { en: "Paper Leak, Exam Delay & Recruitment Scam Audit", hi: "पेपर लीक, परीक्षा देरी और भर्ती घोटाला जांच" },
    explanation: {
      en: "Every paper leak, delayed exam, cancelled recruitment, and repeated re-exam must be audited publicly. Students lose years of life, money, confidence, and career opportunities because of system failure.",
      hi: "हर पेपर लीक, परीक्षा देरी, रद्द भर्ती और बार-बार री-एग्जाम का सार्वजनिक ऑडिट हो। सिस्टम की विफलता से छात्रों का समय, पैसा, भरोसा और करियर अवसर बर्बाद होते हैं।",
    },
  },
  {
    title: { en: "Berozgari & Fake Job Creation Data Audit", hi: "बेरोजगारी और फर्जी रोजगार डेटा जांच" },
    explanation: {
      en: "Government job claims, private job creation claims, skill program outcomes, placement numbers, and unemployment data must be audited publicly so youth get real jobs, not fake promises.",
      hi: "सरकारी नौकरी दावे, निजी रोजगार दावे, स्किल प्रोग्राम परिणाम, प्लेसमेंट नंबर और बेरोजगारी डेटा का सार्वजनिक ऑडिट हो ताकि युवाओं को असली रोजगार मिले, सिर्फ वादे नहीं।",
    },
  },
  {
    title: { en: "Private Job Exploitation & Unpaid Overtime Audit", hi: "निजी नौकरी शोषण और बिना भुगतान ओवरटाइम जांच" },
    explanation: {
      en: "Private employees deserve an audit of unpaid overtime, forced weekend work, toxic work culture, fake internship work, delayed salaries, sudden layoffs, and labour law violations.",
      hi: "निजी कर्मचारियों के बिना भुगतान ओवरटाइम, जबरन वीकेंड काम, टॉक्सिक वर्क कल्चर, फर्जी इंटर्नशिप, सैलरी देरी, अचानक छंटनी और श्रम कानून उल्लंघन की जांच हो।",
    },
  },
  {
    title: { en: "Education Fees, Coaching & Student Loan Audit", hi: "शिक्षा फीस, कोचिंग और स्टूडेंट लोन जांच" },
    explanation: {
      en: "College fees, coaching fees, exam fees, application fees, student loans, hostel charges, and placement promises must be audited so education does not become a debt trap for middle-class families.",
      hi: "कॉलेज फीस, कोचिंग फीस, परीक्षा फीस, आवेदन फीस, स्टूडेंट लोन, हॉस्टल चार्ज और प्लेसमेंट वादों का ऑडिट हो ताकि शिक्षा मिडिल क्लास परिवारों के लिए कर्ज का जाल न बने।",
    },
  },
];

const politicianLifestylePromises: I18n[] = [
  {
    en: "Every elected representative must publicly disclose salary, allowances, assets, vehicles, bungalows, security expense, foreign travel, gifts, staff expense, and family-linked business interests every year.",
    hi: "हर जनप्रतिनिधि हर साल वेतन, भत्ता, संपत्ति, गाड़ी, बंगला, सुरक्षा खर्च, विदेश यात्रा, उपहार, स्टाफ खर्च और पारिवारिक व्यापारिक हित सार्वजनिक करे।",
  },
  {
    en: "Luxury lifestyle growth must be compared with declared income, tax records, election affidavits, public contracts, land records, company ownership, and benami property indicators.",
    hi: "लग्जरी जीवनशैली की तुलना घोषित आय, टैक्स रिकॉर्ड, चुनावी शपथपत्र, सरकारी ठेके, जमीन रिकॉर्ड, कंपनी मालिकाना हक और बेनामी संपत्ति संकेतों से हो।",
  },
  {
    en: "If a leader's lifestyle rises faster than legal income, an automatic independent lifestyle audit must begin with due legal process and public status tracking.",
    hi: "अगर किसी नेता की जीवनशैली कानूनी आय से तेज बढ़ती है, तो कानूनी प्रक्रिया के साथ स्वतः स्वतंत्र lifestyle audit शुरू हो और उसकी स्थिति सार्वजनिक हो।",
  },
  {
    en: "Public office must not become a route to royal living. Politics must be treated as service, not a shortcut to wealth, power, contract networks, and family privilege.",
    hi: "सार्वजनिक पद शाही जीवन का रास्ता नहीं होना चाहिए। राजनीति सेवा हो, धन, शक्ति, ठेका नेटवर्क और पारिवारिक विशेषाधिकार का शॉर्टकट नहीं।",
  },
  {
    en: "Government homes, cars, security, travel, and office facilities must have clear public limits. Any misuse must be recoverable from the leader's personal funds after verification.",
    hi: "सरकारी घर, गाड़ी, सुरक्षा, यात्रा और कार्यालय सुविधाओं की सार्वजनिक सीमा हो। दुरुपयोग साबित होने पर राशि नेता के निजी धन से वसूल हो।",
  },
  {
    en: "Relatives, associates, shell companies, trusts, NGOs, and contractors linked to leaders must be checked when sudden wealth, repeated contracts, or unusual asset transfers appear.",
    hi: "अचानक संपत्ति, बार-बार ठेके या संदिग्ध संपत्ति ट्रांसफर दिखने पर नेताओं से जुड़े रिश्तेदार, सहयोगी, शेल कंपनियां, ट्रस्ट, NGO और ठेकेदार जांचे जाएं।",
  },
];

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
    <div className="reveal-card micro-lift shine-card apple-clean-card group rounded-[3rem] bg-white/76 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl transition group-hover:scale-105">
          {section.icon}
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Promise {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-3xl font-black leading-[0.98] tracking-[-0.055em] text-black md:text-4xl">
            <BilingualText value={section.title} mode={mode} hiClassName="text-base leading-5 tracking-normal text-black/55" />
          </h3>
        </div>
      </div>

      <div className="mt-7 rounded-[2.25rem] bg-black p-6 text-white shadow-xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">Goal</p>
        <p className="mt-3 text-lg font-black leading-7 tracking-[-0.035em] text-white md:text-xl">
          <BilingualText value={section.goal} mode={mode} hiClassName="text-xs leading-4 text-white/35" />
        </p>
      </div>

      <ul className="mt-7 grid gap-3">
        {section.points.map((point) => (
          <li key={point.en} className="flex gap-3 rounded-[1.65rem] bg-white/72 p-4 text-sm font-bold leading-6 text-black/75 shadow-[0_10px_30px_rgba(0,0,0,0.035)] backdrop-blur-xl">
            <span className="manifesto-bullet mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
            <span>
              <BilingualText value={point} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function JoinEligibilitySection({ mode, scrollToJoin }: { mode: LangMode; scrollToJoin: () => void }) {
  const eligibilityCards: I18n[] = [
    {
      en: "Your degree is ready but your job is still loading.",
      hi: "डिग्री तैयार है लेकिन नौकरी अभी भी loading है।",
    },
    {
      en: "You are tired of paper leaks, delayed exams, fake job data, and unpaid overtime.",
      hi: "आप पेपर लीक, परीक्षा देरी, फर्जी रोजगार डेटा और बिना भुगतान ओवरटाइम से थक चुके हैं।",
    },
    {
      en: "You believe बेरोजगारी is not youth failure — it is governance failure.",
      hi: "आप मानते हैं कि बेरोजगारी युवाओं की विफलता नहीं — शासन की विफलता है।",
    },
    {
      en: "You want clean politics without hate, caste drama, fake news, or paid propaganda.",
      hi: "आप नफरत, जाति ड्रामा, फेक न्यूज़ और पेड प्रोपेगैंडा के बिना साफ राजनीति चाहते हैं।",
    },
  ];

  const movingWords = [
    "No VIP Connection Needed",
    "No Political Family Needed",
    "No Fake Promise Needed",
    "Only One Qualification",
    "Care About India",
    "Question Power",
    "I Survived The System",
    "Yes, I Am Eligible",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="eligibility-section apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Join Now Eligibility", hi: "जुड़ने की योग्यता" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "If your degree is ready but your job is still loading, you are eligible.",
                  hi: "अगर डिग्री तैयार है लेकिन नौकरी अभी भी loading है, तो आप eligible हैं।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
              />
            </h2>
          </div>

          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-2xl font-black leading-9 tracking-[-0.04em] text-black md:text-4xl md:leading-[3rem]">
              <BilingualText
                value={{
                  en: "No caste certificate. No VIP connection. No political background.",
                  hi: "कोई जाति प्रमाणपत्र नहीं। कोई VIP connection नहीं। कोई political background नहीं।"
                }}
                mode={mode}
                hiClassName="text-base leading-5 text-black/55 md:text-xl"
              />
            </p>
            <p className="mt-5 text-base font-black leading-7 text-black/68">
              <BilingualText
                value={{
                  en: "Only one qualification: you care about India and you are ready to question power.",
                  hi: "सिर्फ एक योग्यता: आपको भारत की चिंता है और आप सत्ता से सवाल करने के लिए तैयार हैं।"
                }}
                mode={mode}
                hiClassName="text-xs leading-4 text-black/55"
              />
            </p>
          </div>
        </div>

        <div className="eligibility-marquee apple-clean-pill mt-10 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
          <div className="eligibility-marquee-track">
            {[...movingWords, ...movingWords, ...movingWords].map((word, index) => (
              <span key={`${word}-${index}`} className="eligibility-pill">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {eligibilityCards.map((card) => (
            <div
              key={card.en}
              className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/75 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <p className="text-xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={card} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>

        <div className="apple-borderless mt-10 flex flex-col items-center justify-between gap-5 rounded-[2.75rem] bg-black p-6 text-white md:flex-row">
          <p className="text-2xl font-black leading-8 tracking-[-0.04em] md:text-4xl">
            <BilingualText
              value={{ en: "I survived the system.", hi: "मैंने सिस्टम survive किया है।" }}
              mode={mode}
              hiClassName="text-sm leading-5 text-white/35 md:text-lg"
            />
          </p>
          <button
            onClick={scrollToJoin}
            className="premium-toggle premium-toggle-light rounded-full px-8 py-4 text-base font-black transition-all duration-300"
          >
            Yes, I Am Eligible
          </button>
        </div>
      </div>
    </section>
  );
}

function RunningCockroachEffect() {
  const runners = Array.from({ length: 24 });

  return (
    <div className="running-cockroach-layer" aria-hidden="true">
      {runners.map((_, index) => (
        <span
          key={index}
          className="running-cockroach"
          style={{
            top: `${4 + ((index * 7) % 92)}%`,
            animationDelay: `${-(index * 1.7)}s`,
            animationDuration: `${10 + (index % 12) * 1.4}s`,
            opacity: 0.12 + (index % 5) * 0.035,
            transform: `scale(${0.42 + (index % 6) * 0.1})`,
          }}
        >
          <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8 C7 -8, -7 -12, -22 -12" className="runner-antenna" />
            <path d="M26 7 C20 -10, 8 -19, -5 -24" className="runner-antenna" />
            <ellipse cx="39" cy="24" rx="24" ry="13" fill="currentColor" />
            <circle cx="17" cy="22" r="9" fill="currentColor" />
            <path d="M32 12 C40 19, 40 29, 32 36" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 13 L27 2" className="runner-leg runner-leg-a" />
            <path d="M42 13 L47 1" className="runner-leg runner-leg-b" />
            <path d="M49 16 L64 7" className="runner-leg runner-leg-a" />
            <path d="M34 35 L26 46" className="runner-leg runner-leg-b" />
            <path d="M43 36 L48 48" className="runner-leg runner-leg-a" />
            <path d="M50 32 L66 42" className="runner-leg runner-leg-b" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function TrustBadgesSection({ mode }: { mode: LangMode }) {
  const badges: I18n[] = [
    { en: "No Hate Politics", hi: "नफरत की राजनीति नहीं" },
    { en: "No Fake News", hi: "फेक न्यूज़ नहीं" },
    { en: "No Violence", hi: "हिंसा नहीं" },
    { en: "Evidence First", hi: "पहले प्रमाण" },
    { en: "Public Accountability", hi: "सार्वजनिक जवाबदेही" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="apple-clean-pill flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/78 p-3 backdrop-blur-xl">
        {badges.map((badge) => (
          <span key={badge.en} className="rounded-full bg-black px-5 py-3 text-sm font-black text-[#B6FF00] shadow-sm">
            <BilingualText value={badge} mode={mode} hiClassName="text-[10px] leading-3 text-white/50" />
          </span>
        ))}
      </div>
    </section>
  );
}

function CommandCenterSection({ mode }: { mode: LangMode }) {
  const metrics: { value: string; label: I18n }[] = [
    { value: "000", label: { en: "Reports", hi: "रिपोर्ट" } },
    { value: "000", label: { en: "Districts", hi: "जिले" } },
    { value: "000", label: { en: "Volunteers", hi: "स्वयंसेवक" } },
    { value: "005", label: { en: "Public Audits", hi: "जन ऑडिट" } },
  ];

  const description: I18n = {
    en: "The movement will track reports, districts, volunteers, and public audits like a civic product — not like a poster campaign.",
    hi: "Movement reports, districts, volunteers और public audits को civic product की तरह track करेगा — poster campaign की तरह नहीं।",
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="command-center apple-borderless overflow-hidden rounded-[3.75rem] bg-black p-8 text-white md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Janata Command Center", hi: "जनता कमांड सेंटर" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
              <BilingualText
                value={{ en: "Every issue should become visible.", hi: "हर समस्या visible होनी चाहिए।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-8 tracking-normal text-white/72 md:text-4xl"
              />
            </h2>
          </div>

          <div className="rounded-[2.75rem] bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-white md:text-3xl md:leading-10">
              <BilingualText value={description} mode={mode} hiClassName="text-sm leading-5 text-white/35 md:text-lg" />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label.en} className="command-metric rounded-[2.5rem] bg-white/10 p-7 text-center backdrop-blur-xl">
              <p className="text-6xl font-black leading-none tracking-[-0.08em] text-[#B6FF00] md:text-8xl">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-white/55">
                <BilingualText value={metric.label} mode={mode} hiClassName="text-xs leading-5 text-white/45" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CinematicStickyStorySection({ mode }: { mode: LangMode }) {
  const statements: I18n[] = [
    { en: "No hate politics.", hi: "नफरत की राजनीति नहीं।" },
    { en: "No hidden wealth.", hi: "छिपी संपत्ति नहीं।" },
    { en: "No paper leaks.", hi: "पेपर लीक नहीं।" },
    { en: "No unpaid overtime.", hi: "बिना भुगतान ओवरटाइम नहीं।" },
    { en: "No luxury politics.", hi: "विलासिता वाली राजनीति नहीं।" },
    { en: "Only public accountability.", hi: "केवल सार्वजनिक जवाबदेही।" },
  ];

  return (
    <section className="cinematic-story mx-auto max-w-7xl px-6 py-16">
      <div className="sticky top-24 rounded-[3.75rem] bg-white/76 p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:p-12">
        <PageEyebrow value={{ en: "Cinematic Story", hi: "मुख्य विचार" }} mode={mode} />
        <div className="mx-auto mt-7 max-w-6xl space-y-1 text-5xl font-black uppercase leading-[0.86] tracking-[-0.075em] text-black md:text-7xl lg:text-8xl">
          {statements.map((statement, index) => (
            <p key={statement.en} className={index % 2 === 0 ? "" : "text-black/42"}>
              <BilingualText value={statement} mode={mode} hiClassName="text-base leading-5 tracking-normal text-black/40 md:text-xl" />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({
  mode,
  setPage,
  scrollToJoin,
}: {
  mode: LangMode;
  setPage: (page: PageId) => void;
  scrollToJoin: () => void;
}) {
  return (
    <>
      <RunningCockroachEffect />
      <section className="hero-cinematic mx-auto max-w-7xl px-6 pb-20 pt-0 md:pb-28 md:pt-1">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex flex-col items-center gap-1 magnetic-btn rounded-full apple-clean-pill apple-gradient-bg px-6 py-3 text-sm font-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span>India 2047 Movement</span>
            {mode !== "en" && <HindiShadow text="भारत 2047 आंदोलन" className="text-[10px] leading-3" />}
          </div>

          <h1 className="text-6xl font-black leading-[0.86] tracking-[-0.08em] md:text-8xl lg:text-9xl">
            <span className="hero-accountability-underline">
              <WordRevealText
                value={{
                  en: "Ordinary Indians deserve extraordinary accountability.",
                  hi: "आम भारतीयों को असाधारण जवाबदेही चाहिए।",
                }}
                mode={mode}
                hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/45 md:text-4xl"
              />
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "Students. Workers. Farmers. Taxpayers. Families. One movement against corruption, berozgari, paper leaks, and political luxury.",
                hi: "छात्र। कर्मचारी। किसान। टैक्सपेयर। परिवार। भ्रष्टाचार, बेरोजगारी, पेपर लीक और राजनीतिक विलासिता के खिलाफ एक आंदोलन।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setPage("contact")}
              className="premium-toggle premium-toggle-dark rounded-full px-9 py-5 text-base font-black transition-all duration-300 ease-out"
            >
              Join / Report
            </button>
            <button
              onClick={() => setPage("manifesto")}
              className="magnetic-btn rounded-full bg-white/80 px-9 py-5 text-base font-black text-black shadow-[0_18px_55px_rgba(0,0,0,0.07)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
            >
              Read Manifesto
            </button>
          </div>
        </div>
      </section>

      <TrustBadgesSection mode={mode} />
      <PremiumSlidingStatement mode={mode} />
      <NotMemeMovementSection mode={mode} />
      <HowItWorksSection mode={mode} />
      <SlidingTextBanner
        variant="dark"
        speed="slow"
        items={[
          "NO PAPER LEAKS",
          "NO HIDDEN WEALTH",
          "NO UNPAID OVERTIME",
          "NO LUXURY POLITICS",
          "STUDENT FIRST",
          "POWER ACCOUNTABLE",
        ]}
      />
      <CommandCenterSection mode={mode} />
      <PublicIssueMapSection mode={mode} />
      <CitizenReportCategoriesSection mode={mode} />
      <CandidateStandardSection mode={mode} />
      <SlidingTextBanner
        variant="green"
        speed="normal"
        items={[
          "DEGREE READY. JOB LOADING.",
          "EXAM DELAYED. FUTURE DELAYED.",
          "PAPER LEAK IS CAREER MURDER.",
          "UNPAID OVERTIME IS THEFT.",
        ]}
      />
      <JoinEligibilitySection mode={mode} scrollToJoin={scrollToJoin} />
      <BerozgariEmergencySection mode={mode} />
      <FAQAccordionSection mode={mode} />
    </>
  );
}

function ManifestoPage({ mode }: { mode: LangMode }) {
  const manifestoWords = [
    "India First",
    "Citizens First",
    "Jobs",
    "Education",
    "Zero Corruption",
    "Student First",
    "Worker Rights",
    "AI Superpower",
    "Fast Justice",
    "Digital Government",
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <div className="mx-auto max-w-6xl">
            <PageEyebrow value={{ en: "Detailed Manifesto", hi: "विस्तृत घोषणापत्र" }} mode={mode} />
            <h1 className="mt-6 text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
              <WordRevealText
                value={{ en: "India First. Citizens First.", hi: "भारत प्रथम। नागरिक प्रथम।" }}
                mode={mode}
                hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
              />
            </h1>
            <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
              <BilingualText
                value={{
                  en: "A simple, measurable, voter-friendly manifesto for jobs, education, technology, justice, healthcare, anti-corruption, students, workers, and India 2047.",
                  hi: "रोजगार, शिक्षा, तकनीक, न्याय, स्वास्थ्य, भ्रष्टाचार विरोध, छात्रों, कर्मचारियों और भारत 2047 के लिए सरल और मापने योग्य घोषणापत्र।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/45 md:text-base"
              />
            </p>
          </div>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...manifestoWords, ...manifestoWords, ...manifestoWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { en: "10+ Core Sectors", hi: "10+ मुख्य सेक्टर" },
            { en: "Student First", hi: "छात्र प्रथम" },
            { en: "Worker Rights", hi: "कर्मचारी अधिकार" },
            { en: "India 2047", hi: "भारत 2047" },
          ].map((item) => (
            <div key={item.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "All Manifesto Promises", hi: "सभी घोषणापत्र वादे" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{ en: "Big promises. Clear actions.", hi: "बड़े वादे। साफ कार्रवाई।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Every promise is written as a governance direction, not a slogan.",
                  hi: "हर वादा नारे की तरह नहीं, शासन दिशा की तरह लिखा गया है।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {manifesto.map((section, index) => (
            <ManifestoCard key={section.id} section={section} index={index} mode={mode} />
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage({ mode }: { mode: LangMode }) {
  const aboutWords = [
    "Citizen Accountability",
    "No Hate Politics",
    "No Dynasty Politics",
    "Student First",
    "Worker Dignity",
    "Public Service",
    "Clean Governance",
    "India 2047",
    "We Rebuild",
    "We Rise",
  ];

  const whoWeAre: { icon: string; title: I18n; body: I18n }[] = [
    {
      icon: "👥",
      title: { en: "Who We Are", hi: "हम कौन हैं" },
      body: {
        en: "We are ordinary Indians who believe politics must return to public service. This movement belongs to students, private employees, farmers, small business owners, creators, workers, taxpayers, and families who want clean governance, fair opportunity, and national progress.",
        hi: "हम आम भारतीय हैं जो मानते हैं कि राजनीति को सार्वजनिक सेवा में लौटना चाहिए। यह आंदोलन छात्रों, निजी कर्मचारियों, किसानों, छोटे व्यापारियों, creators, workers, taxpayers और परिवारों का है जो साफ शासन, निष्पक्ष अवसर और राष्ट्रीय प्रगति चाहते हैं।",
      },
    },
    {
      icon: "🚦",
      title: { en: "People Who Keep India Running", hi: "जो भारत को चलाते हैं" },
      body: {
        en: "We represent the people who stand in exam lines, job lines, hospital lines, government office lines, traffic lines, and still keep the country running every day.",
        hi: "हम उन लोगों का प्रतिनिधित्व करते हैं जो exam lines, job lines, hospital lines, government office lines और traffic lines में खड़े रहते हैं, फिर भी हर दिन देश चलाते हैं।",
      },
    },
    {
      icon: "🛡️",
      title: { en: "What We Are Here For", hi: "हम क्यों आए हैं" },
      body: {
        en: "We are not here to look powerful. We are here to make power accountable through public audits, student-first governance, worker rights, anti-corruption systems, and the Indian Dream for every citizen.",
        hi: "हम शक्तिशाली दिखने नहीं आए हैं। हम सत्ता को public audits, student-first governance, worker rights, anti-corruption systems और हर नागरिक के Indian Dream से जवाबदेह बनाने आए हैं।",
      },
    },
  ];

  const whyCockroach: I18n[] = [
    { en: "It survives pressure.", hi: "यह दबाव में survive करता है।" },
    { en: "It adapts.", hi: "यह adapt करता है।" },
    { en: "It refuses to disappear.", hi: "यह मिटने से इनकार करता है।" },
    { en: "That is the story of ordinary Indians.", hi: "यही आम भारतीयों की कहानी है।" },
  ];

  const rejectItems: I18n[] = [
    { en: "Hate politics", hi: "नफरत की राजनीति" },
    { en: "Caste drama", hi: "जाति ड्रामा" },
    { en: "Fake news", hi: "फेक न्यूज़" },
    { en: "Paid propaganda", hi: "पेड प्रोपेगैंडा" },
    { en: "VIP culture", hi: "VIP संस्कृति" },
    { en: "Politics as family business", hi: "राजनीति को पारिवारिक व्यापार बनाना" },
  ];

  const standForItems: I18n[] = [
    { en: "Student First governance", hi: "छात्र प्रथम शासन" },
    { en: "Jobs with dignity", hi: "सम्मान के साथ रोजगार" },
    { en: "5-day work week", hi: "5 दिन का कार्य सप्ताह" },
    { en: "Paid overtime", hi: "भुगतान वाला ओवरटाइम" },
    { en: "Public money transparency", hi: "जनता के पैसे की पारदर्शिता" },
    { en: "CID asset checks for leaders", hi: "नेताओं की CID संपत्ति जांच" },
    { en: "Fast justice", hi: "तेज न्याय" },
    { en: "AI and technology leadership", hi: "AI और तकनीक नेतृत्व" },
    { en: "The Indian Dream for every citizen", hi: "हर नागरिक के लिए Indian Dream" },
  ];

  const disciplineCode: I18n[] = [
    { en: "No violence.", hi: "हिंसा नहीं।" },
    { en: "No community targeting.", hi: "किसी समुदाय को निशाना नहीं।" },
    { en: "No fake claims.", hi: "फर्जी दावे नहीं।" },
    { en: "Evidence before outrage.", hi: "गुस्से से पहले प्रमाण।" },
    { en: "Public service before power.", hi: "सत्ता से पहले सार्वजनिक सेवा।" },
    { en: "India First. Citizens First.", hi: "भारत प्रथम। नागरिक प्रथम।" },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "About the Movement", hi: "आंदोलन का परिचय" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "We are here to make power accountable.",
                hi: "हम सत्ता को जवाबदेह बनाने आए हैं।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "Cockroach India Party is a citizen-first political movement for students, workers, taxpayers, farmers, small business owners, and ordinary families who survive broken systems every day.",
                hi: "कॉकरोच इंडिया पार्टी छात्रों, कर्मचारियों, टैक्सपेयर्स, किसानों, छोटे व्यापारियों और उन आम परिवारों का citizen-first राजनीतिक आंदोलन है जो हर दिन टूटे सिस्टम को survive करते हैं।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...aboutWords, ...aboutWords, ...aboutWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "What This Movement Is", hi: "यह आंदोलन क्या है" }} mode={mode} />
          <div className="mx-auto mt-7 max-w-6xl space-y-0.5 text-5xl font-black uppercase leading-[0.82] tracking-[-0.08em] text-black md:text-7xl lg:text-8xl">
            <p>Not a caste movement.</p>
            <p className="text-black/42">Not a hate movement.</p>
            <p>Not a dynasty movement.</p>
            <p className="text-black/42">A citizen accountability movement.</p>
          </div>
          {mode !== "en" ? (
            <HindiShadow
              text="जाति आंदोलन नहीं। नफरत आंदोलन नहीं। वंशवाद आंदोलन नहीं। नागरिक जवाबदेही आंदोलन।"
              className="mx-auto mt-6 max-w-4xl text-sm leading-5 text-black/45"
            />
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Who We Are", hi: "हम कौन हैं" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Ordinary people. Serious accountability.",
                  hi: "आम लोग। गंभीर जवाबदेही।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "This is not a party of powerful people. This is a movement of people who refuse to disappear.",
                  hi: "यह शक्तिशाली लोगों की पार्टी नहीं है। यह उन लोगों का आंदोलन है जो मिटने से इनकार करते हैं।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {whoWeAre.map((item, index) => (
            <div key={item.title.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[3rem] bg-white/76 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">About {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.05em] text-black md:text-3xl">
                    <BilingualText value={item.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold leading-6 text-black/68">
                <BilingualText value={item.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <PageEyebrow value={{ en: "Why Cockroach?", hi: "कॉकरोच क्यों?" }} mode={mode} />
              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
                <BilingualText
                  value={{
                    en: "The cockroach is not weakness.",
                    hi: "कॉकरोच कमजोरी नहीं है।",
                  }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
                />
              </h2>
            </div>
            <div className="apple-clean-card rounded-[2.75rem] bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
                <BilingualText
                  value={{
                    en: "We survive inflation, corruption, paper leaks, toxic offices, bad roads, failed promises, and still keep moving. Now survival must become political power.",
                    hi: "हम महंगाई, भ्रष्टाचार, पेपर लीक, toxic offices, खराब सड़क और टूटे वादों को survive करते हैं, फिर भी आगे बढ़ते हैं। अब survival को political power बनना होगा।",
                  }}
                  mode={mode}
                  hiClassName="text-sm leading-5 text-black/55 md:text-lg"
                />
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {whyCockroach.map((item) => (
              <div key={item.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/75 p-6 text-center backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
                <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                  <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-10">
            <PageEyebrow value={{ en: "What We Reject", hi: "हम क्या अस्वीकार करते हैं" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-7xl">
              <BilingualText
                value={{ en: "No politics of division.", hi: "विभाजन की राजनीति नहीं।" }}
                mode={mode}
                hiClassName="mt-4 text-xl leading-6 tracking-normal text-white/35 md:text-3xl"
              />
            </h2>
            <div className="mt-10 grid gap-3">
              {rejectItems.map((item) => (
                <div key={item.en} className="rounded-[1.75rem] bg-white/8 p-4 text-lg font-black text-white/82">
                  ✕ <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4 text-white/35" />
                </div>
              ))}
            </div>
          </div>

          <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 md:p-10">
            <PageEyebrow value={{ en: "What We Stand For", hi: "हम किसके लिए खड़े हैं" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-7xl">
              <BilingualText
                value={{ en: "Clean power. Fair opportunity.", hi: "साफ सत्ता। निष्पक्ष अवसर।" }}
                mode={mode}
                hiClassName="mt-4 text-xl leading-6 tracking-normal text-black/55 md:text-3xl"
              />
            </h2>
            <div className="mt-10 grid gap-3">
              {standForItems.map((item) => (
                <div key={item.en} className="apple-clean-card rounded-[1.75rem] bg-white/72 p-4 text-lg font-black text-black/82 backdrop-blur-xl">
                  ✓ <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Our Discipline Code", hi: "हमारा अनुशासन कोड" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Discipline before politics.",
                  hi: "राजनीति से पहले अनुशासन।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Anger must become organization. Pain must become policy. Survival must become public power.",
                  hi: "गुस्सा संगठन बने। पीड़ा नीति बने। Survival public power बने।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {disciplineCode.map((item) => (
            <div key={item.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Legal-Safe Note", hi: "कानूनी सूचना" }} mode={mode} />
          <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
            <BilingualText
              value={{
                en: "Movement first. Registration details after legal completion.",
                hi: "पहले आंदोलन। कानूनी प्रक्रिया के बाद पंजीकरण विवरण।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
            />
          </h2>
          <p className="mt-8 max-w-4xl text-base font-bold leading-7 text-white/62">
            <BilingualText
              value={{
                en: "This is a public political movement website. Official political party registration details will be updated after completion of legal registration. Any icon or mark shown here should not be described as an official election symbol unless allotted under applicable election rules.",
                hi: "यह सार्वजनिक राजनीतिक आंदोलन वेबसाइट है। कानूनी पंजीकरण पूरा होने के बाद आधिकारिक राजनीतिक पार्टी विवरण अपडेट किए जाएंगे। यहां दिखाया गया कोई भी icon या mark आधिकारिक चुनाव चिन्ह नहीं कहा जाना चाहिए जब तक लागू चुनाव नियमों के तहत आवंटित न हो।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4 text-white/35"
            />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 text-center md:p-12">
          <PageEyebrow value={{ en: "Final Line", hi: "अंतिम बात" }} mode={mode} />
          <h2 className="mx-auto mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
            <BilingualText
              value={{
                en: "We survive. We rebuild. We rise.",
                hi: "हम survive करते हैं। हम rebuild करते हैं। हम rise करते हैं।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
            />
          </h2>
        </div>
      </section>
    </>
  );
}

function ConstitutionPage({ mode }: { mode: LangMode }) {
  const visionWords = [
    "The Indian Dream",
    "Opportunity Nation",
    "World-Class Universities",
    "Innovation Economy",
    "Rule of Law",
    "Manufacturing Superpower",
    "Respect for Talent",
    "Strong States",
    "Dignity of Work",
    "Global Leadership",
  ];

  const visionPillars: { icon: string; title: I18n; body: I18n }[] = [
    {
      icon: "🇮🇳",
      title: { en: "The Indian Dream", hi: "द इंडियन ड्रीम" },
      body: {
        en: "Every Indian child must believe: if I study, work hard, build skills, start a business, or solve a problem, India will give me a fair chance to rise.",
        hi: "हर भारतीय बच्चे को विश्वास होना चाहिए: अगर मैं पढ़ूं, मेहनत करूं, कौशल बनाऊं, व्यवसाय शुरू करूं या समस्या हल करूं, तो भारत मुझे आगे बढ़ने का निष्पक्ष मौका देगा।",
      },
    },
    {
      icon: "🎓",
      title: { en: "World-Class Universities", hi: "विश्वस्तरीय विश्वविद्यालय" },
      body: {
        en: "India needs universities that compete with Harvard, MIT, Stanford, Oxford, and Cambridge, with research depth in AI, medicine, manufacturing, defense, agriculture, law, climate, and entrepreneurship.",
        hi: "भारत को Harvard, MIT, Stanford, Oxford और Cambridge जैसी प्रतिस्पर्धी विश्वविद्यालय व्यवस्था चाहिए, जिसमें AI, medicine, manufacturing, defense, agriculture, law, climate और entrepreneurship में गहरी research हो।",
      },
    },
    {
      icon: "🚀",
      title: { en: "Innovation Economy", hi: "इनोवेशन अर्थव्यवस्था" },
      body: {
        en: "India should not only consume technology. India should build the next Google, Apple, Tesla, Nvidia, SpaceX, OpenAI, and Samsung-style companies from Indian soil.",
        hi: "भारत केवल technology consume न करे। भारत अपनी जमीन से Google, Apple, Tesla, Nvidia, SpaceX, OpenAI और Samsung जैसी कंपनियां बनाए।",
      },
    },
    {
      icon: "⚖️",
      title: { en: "Zero Corruption, Fast Decisions", hi: "शून्य भ्रष्टाचार, तेज फैसले" },
      body: {
        en: "India must make government approvals fast, courts faster, contracts enforceable, and corruption risky so business, research, investment, and citizens can trust the system.",
        hi: "भारत को सरकारी approval तेज, court तेज, contracts enforceable और corruption risky बनाना होगा ताकि business, research, investment और citizens system पर भरोसा कर सकें।",
      },
    },
    {
      icon: "🏭",
      title: { en: "Manufacturing Superpower", hi: "मैन्युफैक्चरिंग महाशक्ति" },
      body: {
        en: "India must become the factory of the democratic world in electronics, chips, EVs, batteries, defense, drones, robotics, pharma, clean energy, and high-end machinery.",
        hi: "भारत electronics, chips, EV, batteries, defense, drones, robotics, pharma, clean energy और high-end machinery में democratic world की factory बने।",
      },
    },
    {
      icon: "🧠",
      title: { en: "Respect for Talent", hi: "प्रतिभा का सम्मान" },
      body: {
        en: "No talented Indian should feel forced to leave India for respect, salary, research, or opportunity. India must become a country where talent returns, not escapes.",
        hi: "कोई प्रतिभाशाली भारतीय respect, salary, research या opportunity के लिए भारत छोड़ने को मजबूर न हो। भारत ऐसा देश बने जहां talent लौटे, भागे नहीं।",
      },
    },
    {
      icon: "🏙️",
      title: { en: "Strong States, Strong Nation", hi: "मजबूत राज्य, मजबूत राष्ट्र" },
      body: {
        en: "States should compete like startup ecosystems: best education state, best jobs state, best safety state, best manufacturing state, best AI state, and best clean city state.",
        hi: "राज्य startup ecosystems की तरह compete करें: best education state, best jobs state, best safety state, best manufacturing state, best AI state और best clean city state।",
      },
    },
    {
      icon: "🛡️",
      title: { en: "Rule of Law", hi: "कानून का राज" },
      body: {
        en: "A great country is not built by fear. It is built by law. Police, courts, contracts, property rights, women safety, business safety, and citizen rights must work equally for rich and poor.",
        hi: "महान देश डर से नहीं बनता। कानून से बनता है। Police, courts, contracts, property rights, women safety, business safety और citizen rights अमीर-गरीब सबके लिए बराबर काम करें।",
      },
    },
    {
      icon: "🧰",
      title: { en: "Dignity of Work", hi: "काम का सम्मान" },
      body: {
        en: "Engineer, farmer, soldier, teacher, nurse, driver, factory worker, coder, creator, and shopkeeper — every worker deserves dignity, safety, fair pay, and respect.",
        hi: "Engineer, farmer, soldier, teacher, nurse, driver, factory worker, coder, creator और shopkeeper — हर worker को dignity, safety, fair pay और respect मिले।",
      },
    },
    {
      icon: "🌍",
      title: { en: "India as Global Leader", hi: "वैश्विक नेतृत्व वाला भारत" },
      body: {
        en: "India should not follow the world. India should help design the future of AI rules, digital public infrastructure, climate technology, defense, education, medicine, and peace diplomacy.",
        hi: "भारत दुनिया को follow न करे। भारत AI rules, digital public infrastructure, climate technology, defense, education, medicine और peace diplomacy का भविष्य design करे।",
      },
    },
  ];

  const dreamPromises: I18n[] = [
    { en: "Students do not fear paper leaks.", hi: "छात्र पेपर लीक से न डरें।" },
    { en: "Workers do not fear exploitation.", hi: "कर्मचारी शोषण से न डरें।" },
    { en: "Businesses do not fear corruption.", hi: "व्यवसाय भ्रष्टाचार से न डरें।" },
    { en: "Women do not fear unsafe streets.", hi: "महिलाएं असुरक्षित सड़कों से न डरें।" },
    { en: "Farmers do not fear middlemen.", hi: "किसान बिचौलियों से न डरें।" },
    { en: "Talent does not fear leaving India.", hi: "प्रतिभा भारत छोड़ने को मजबूर न हो।" },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "Vision 2047", hi: "दृष्टि 2047" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "Build the Indian Dream.",
                hi: "द इंडियन ड्रीम बनाओ।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "India must become the world's greatest opportunity nation — a fair chance for every Indian to rise through education, work, enterprise, innovation, and rule of law.",
                hi: "भारत दुनिया का सबसे बड़ा अवसर राष्ट्र बने — हर भारतीय को शिक्षा, काम, उद्यम, innovation और कानून के राज से आगे बढ़ने का निष्पक्ष मौका मिले।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...visionWords, ...visionWords, ...visionWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SlidingTextBanner
        variant="green"
        speed="slow"
        items={[
          "THE INDIAN DREAM",
          "OPPORTUNITY NATION",
          "WORLD-CLASS UNIVERSITIES",
          "INNOVATION ECONOMY",
          "RULE OF LAW",
          "GLOBAL LEADERSHIP",
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Opportunity Nation", hi: "अवसर राष्ट्र" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Not just survival. The Indian Dream.",
                  hi: "सिर्फ survival नहीं। The Indian Dream.",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Like America became powerful by attracting talent, building companies, funding research, protecting enterprise, and rewarding ambition, India must build its own Indian Dream.",
                  hi: "जैसे अमेरिका talent attract करके, companies बनाकर, research fund करके, enterprise protect करके और ambition reward करके शक्तिशाली बना, वैसे भारत को अपना Indian Dream बनाना होगा।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { en: "Productive Population", hi: "उत्पादक जनसंख्या" },
            { en: "World-Class Skills", hi: "विश्वस्तरीय कौशल" },
            { en: "Institutions That Work", hi: "काम करने वाली संस्थाएं" },
            { en: "A Fair Chance", hi: "निष्पक्ष अवसर" },
          ].map((item) => (
            <div key={item.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Big National Statement", hi: "बड़ा राष्ट्रीय विचार" }} mode={mode} />
          <div className="mt-6 grid gap-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl lg:text-8xl">
            <p>Not just a big population.</p>
            <p className="text-white/45">A productive population.</p>
            <p>Not just degrees.</p>
            <p className="text-white/45">World-class skills.</p>
            <p>Not just slogans.</p>
            <p className="text-white/45">Institutions that work.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Vision Pillars", hi: "दृष्टि स्तंभ" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Build a country where talent rises.",
                  hi: "ऐसा देश बनाओ जहां talent आगे बढ़े।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "India should not export talent. India should attract talent.",
                  hi: "भारत talent export न करे। भारत talent attract करे।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {visionPillars.map((pillar, index) => (
            <div key={pillar.title.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[3rem] bg-white/76 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl">
                  {pillar.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Vision {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.05em] text-black md:text-3xl">
                    <BilingualText value={pillar.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold leading-6 text-black/68">
                <BilingualText value={pillar.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <PageEyebrow value={{ en: "The Indian Dream", hi: "द इंडियन ड्रीम" }} mode={mode} />
              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
                <BilingualText
                  value={{
                    en: "A fair chance for every Indian.",
                    hi: "हर भारतीय के लिए निष्पक्ष अवसर।",
                  }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
                />
              </h2>
            </div>
            <div className="apple-clean-card rounded-[2.75rem] bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
                <BilingualText
                  value={{
                    en: "This is the India we must build. Not by hate. Not by caste politics. Not by slogans. By education, jobs, technology, justice, discipline, and accountability.",
                    hi: "यही भारत हमें बनाना है। नफरत से नहीं। जाति राजनीति से नहीं। नारों से नहीं। शिक्षा, रोजगार, तकनीक, न्याय, अनुशासन और जवाबदेही से।",
                  }}
                  mode={mode}
                  hiClassName="text-sm leading-5 text-black/55 md:text-lg"
                />
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {dreamPromises.map((promise) => (
              <div key={promise.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/75 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
                <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                  <BilingualText value={promise} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Final Vision", hi: "अंतिम दृष्टि" }} mode={mode} />
          <h2 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
            <BilingualText
              value={{
                en: "From survival nation to superpower nation.",
                hi: "survival nation से superpower nation तक।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
            />
          </h2>
          <p className="mt-8 max-w-4xl text-base font-bold leading-7 text-white/62">
            <BilingualText
              value={{
                en: "Make India the world's opportunity capital — a country where ambition is protected, talent is respected, work is rewarded, and institutions work for citizens.",
                hi: "भारत को दुनिया की opportunity capital बनाओ — जहां ambition protected हो, talent respected हो, काम rewarded हो और institutions citizens के लिए काम करें।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4 text-white/35"
            />
          </p>
        </div>
      </section>
    </>
  );
}

function StudentFirstDetailedPage({ mode }: { mode: LangMode }) {
  const studentWords = [
    "Student First",
    "Nation First",
    "No Paper Leaks",
    "No Exam Delays",
    "Paid Internships",
    "Skill + Degree",
    "Mental Health",
    "Startup Fund",
    "Student Councils",
    "No Future Left Behind",
  ];

  const studentPolicies: { icon: string; title: I18n; body: I18n }[] = [
    {
      icon: "🏛️",
      title: { en: "Student First Council in Every District", hi: "हर जिले में Student First Council" },
      body: {
        en: "Elected student councils at district, state, and national level will report education problems, exam delays, college issues, skill gaps, hostel problems, mental health concerns, and student employment needs.",
        hi: "जिला, राज्य और राष्ट्रीय स्तर पर चुनी हुई छात्र परिषद शिक्षा समस्याएं, परीक्षा देरी, कॉलेज मुद्दे, कौशल अंतर, हॉस्टल समस्या, मानसिक स्वास्थ्य और छात्र रोजगार जरूरतें उठाएगी।",
      },
    },
    {
      icon: "💰",
      title: { en: "Student Budget Guarantee", hi: "छात्र बजट गारंटी" },
      body: {
        en: "A fixed share of development budget must go to education, skills, internships, research, sports, libraries, labs, and student mental health. Student budget cannot be diverted silently.",
        hi: "विकास बजट का तय हिस्सा शिक्षा, कौशल, इंटर्नशिप, रिसर्च, खेल, लाइब्रेरी, लैब और छात्र मानसिक स्वास्थ्य पर खर्च होगा। छात्र बजट चुपचाप डायवर्ट नहीं होगा।",
      },
    },
    {
      icon: "🚫",
      title: { en: "Anti Paper Leak Law", hi: "पेपर लीक विरोधी कानून" },
      body: {
        en: "Paper leak must be treated as an attack on student future: fast investigation, decision within 6 months, strict punishment, free re-exam timeline, and compensation for affected students.",
        hi: "पेपर लीक को छात्र भविष्य पर हमला माना जाएगा: तेज जांच, 6 महीने में फैसला, कठोर सजा, तय समय में मुफ्त री-एग्जाम और प्रभावित छात्रों को मुआवजा।",
      },
    },
    {
      icon: "📅",
      title: { en: "National Exam Calendar", hi: "राष्ट्रीय परीक्षा कैलेंडर" },
      body: {
        en: "Every exam must publish notification date, form date, admit card date, exam date, result date, joining date, delay reason, and responsible officer on a public dashboard.",
        hi: "हर परीक्षा की notification date, form date, admit card date, exam date, result date, joining date, delay reason और responsible officer सार्वजनिक डैशबोर्ड पर दिखेंगे।",
      },
    },
    {
      icon: "🧑‍💻",
      title: { en: "Student Internship Guarantee", hi: "छात्र इंटर्नशिप गारंटी" },
      body: {
        en: "Final-year students must get access to government, private, startup, local industry, and apprenticeship opportunities. If a student works like an employee, the student must be paid.",
        hi: "फाइनल ईयर छात्रों को सरकारी, निजी, स्टार्टअप, लोकल इंडस्ट्री और अप्रेंटिसशिप अवसर मिलेंगे। अगर छात्र कर्मचारी जैसा काम करे, तो भुगतान अनिवार्य होगा।",
      },
    },
    {
      icon: "🧠",
      title: { en: "Skill + Degree Model", hi: "Skill + Degree Model" },
      body: {
        en: "Students must learn AI, coding, finance, English communication, public speaking, sales, digital skills, manufacturing skills, entrepreneurship, legal awareness, and civic responsibility.",
        hi: "छात्र AI, coding, finance, English communication, public speaking, sales, digital skills, manufacturing skills, entrepreneurship, legal awareness और civic responsibility सीखेंगे।",
      },
    },
    {
      icon: "⚖️",
      title: { en: "Student Legal Protection Cell", hi: "छात्र कानूनी सुरक्षा सेल" },
      body: {
        en: "Students need protection from fee fraud, fake placements, coaching scams, paper leak damage, college harassment, hostel exploitation, exam delay loss, and fake internship work.",
        hi: "छात्रों को fee fraud, fake placement, coaching scam, paper leak damage, college harassment, hostel exploitation, exam delay loss और fake internship work से सुरक्षा मिलेगी।",
      },
    },
    {
      icon: "🪪",
      title: { en: "One Student Digital ID", hi: "एक Student Digital ID" },
      body: {
        en: "One privacy-safe education-career profile will store records, skills, internships, projects, certifications, scholarships, exam applications, job applications, and apprenticeship history.",
        hi: "एक privacy-safe education-career profile में records, skills, internships, projects, certifications, scholarships, exam applications, job applications और apprenticeship history होगी।",
      },
    },
    {
      icon: "🚀",
      title: { en: "Student Startup Fund", hi: "छात्र स्टार्टअप फंड" },
      body: {
        en: "Serious student founders should get seed support, mentors, legal help, company registration support, and government pilot opportunities in AI, agriculture, clean energy, healthcare, education, and manufacturing.",
        hi: "गंभीर छात्र founders को seed support, mentors, legal help, company registration support और government pilot opportunities मिलेंगी — AI, agriculture, clean energy, healthcare, education और manufacturing में।",
      },
    },
    {
      icon: "❤️",
      title: { en: "Student Mental Health Mission", hi: "छात्र मानसिक स्वास्थ्य मिशन" },
      body: {
        en: "Every district must have free counselling centers, college mental health officers, exam stress helplines, career confusion support, suicide prevention, and anonymous help systems.",
        hi: "हर जिले में free counselling centers, college mental health officers, exam stress helplines, career confusion support, suicide prevention और anonymous help systems होंगे।",
      },
    },
    {
      icon: "🗳️",
      title: { en: "No Policy About Students Without Students", hi: "छात्रों पर नीति बिना छात्रों के नहीं" },
      body: {
        en: "Before any education, jobs, exam, fee, scholarship, skill, or youth policy is finalized, student consultation must be mandatory and documented publicly.",
        hi: "Education, jobs, exam, fee, scholarship, skill या youth policy final करने से पहले student consultation अनिवार्य और publicly documented होगा।",
      },
    },
    {
      icon: "🌱",
      title: { en: "Student to Leader Pipeline", hi: "Student to Leader Pipeline" },
      body: {
        en: "A clean path from student volunteer to campus coordinator, district youth policy fellow, public problem researcher, governance trainee, and future candidate — with no violence, no hate, and no fake news.",
        hi: "Student volunteer से campus coordinator, district youth policy fellow, public problem researcher, governance trainee और future candidate तक साफ रास्ता — बिना हिंसा, बिना नफरत और बिना फेक न्यूज़।",
      },
    },
  ];

  const promises: I18n[] = [
    { en: "No paper leaks.", hi: "पेपर लीक नहीं।" },
    { en: "No exam delays.", hi: "परीक्षा देरी नहीं।" },
    { en: "No fake placement dreams.", hi: "फर्जी प्लेसमेंट सपने नहीं।" },
    { en: "No unpaid student labour.", hi: "बिना वेतन छात्र श्रम नहीं।" },
    { en: "No education debt trap.", hi: "शिक्षा को कर्ज का जाल नहीं बनने देंगे।" },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "Student First Government", hi: "छात्र प्रथम सरकार" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "Students are the backbone of the nation.",
                hi: "छात्र राष्ट्र की रीढ़ हैं।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "A country that ignores students destroys its own future. Student First is not a slogan. It is the operating system of New India.",
                hi: "जो देश छात्रों को नजरअंदाज करता है, वह अपना भविष्य कमजोर करता है। Student First सिर्फ नारा नहीं, नए भारत का operating system है।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...studentWords, ...studentWords, ...studentWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SlidingTextBanner
        variant="green"
        speed="slow"
        items={[
          "NO PAPER LEAKS",
          "NO EXAM DELAYS",
          "PAID INTERNSHIPS",
          "SKILL + DEGREE",
          "STUDENT COUNCILS",
          "NO FUTURE LEFT BEHIND",
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-5">
          {promises.map((promise) => (
            <div key={promise.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={promise} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Student First Governance Model", hi: "छात्र प्रथम शासन मॉडल" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Real power. Real budget. Real protection.",
                  hi: "वास्तविक शक्ति। वास्तविक बजट। वास्तविक सुरक्षा।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Student is not just a voter. Student is the future workforce, taxpayer, innovator, soldier, farmer, entrepreneur, and leader.",
                  hi: "छात्र सिर्फ voter नहीं। छात्र भविष्य का workforce, taxpayer, innovator, soldier, farmer, entrepreneur और leader है।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {studentPolicies.map((policy, index) => (
            <div key={policy.title.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[3rem] bg-white/76 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl">
                  {policy.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Policy {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.05em] text-black md:text-3xl">
                    <BilingualText value={policy.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold leading-6 text-black/68">
                <BilingualText value={policy.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Final Promise", hi: "अंतिम वादा" }} mode={mode} />
          <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
            <BilingualText
              value={{
                en: "No student left behind. No future left behind.",
                hi: "कोई छात्र पीछे नहीं। कोई भविष्य पीछे नहीं।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
            />
          </h2>
          <p className="mt-8 max-w-4xl text-base font-bold leading-7 text-white/62">
            <BilingualText
              value={{
                en: "Students must sit at the center of governance, budget, jobs, technology, and national planning. Student First. Nation First.",
                hi: "छात्र शासन, बजट, रोजगार, तकनीक और राष्ट्रीय योजना के केंद्र में होंगे। Student First. Nation First.",
              }}
              mode={mode}
              hiClassName="text-xs leading-4 text-white/35"
            />
          </p>
        </div>
      </section>
    </>
  );
}

function AntiCorruptionDetailedPage({ mode }: { mode: LangMode }) {
  const auditWords = [
    "Asset Check",
    "CID Verification",
    "Public Dashboard",
    "10 Years Jail",
    "Asset Seizure",
    "No Luxury Politics",
    "No Benami Wealth",
    "Public Money Visible",
    "Fast Courts",
    "Lifetime Ban",
  ];

  const antiPromises: { icon: string; title: I18n; body: I18n }[] = [
    {
      icon: "🧾",
      title: { en: "Yearly Public Asset Declaration", hi: "हर साल सार्वजनिक संपत्ति घोषणा" },
      body: {
        en: "Every leader of every political party must publish income, assets, liabilities, business interests, spouse and dependent assets, and major gifts in a simple public format.",
        hi: "हर राजनीतिक दल के नेता अपनी आय, संपत्ति, देनदारी, व्यापारिक हित, spouse/dependent assets और बड़े उपहार सरल सार्वजनिक format में प्रकाशित करें।",
      },
    },
    {
      icon: "🔍",
      title: { en: "CID-Led Asset Verification", hi: "CID आधारित संपत्ति जांच" },
      body: {
        en: "A dedicated CID-led unit must verify suspicious income growth, benami property, shell company links, land deals, contract benefits, and sudden luxury lifestyle upgrades.",
        hi: "CID आधारित विशेष इकाई संदिग्ध आय वृद्धि, बेनामी संपत्ति, शेल कंपनी लिंक, जमीन सौदे, ठेका लाभ और अचानक लग्जरी जीवनशैली की जांच करे।",
      },
    },
    {
      icon: "⚖️",
      title: { en: "Fast Courts and 10-Year Jail", hi: "फास्ट कोर्ट और 10 साल जेल" },
      body: {
        en: "After due legal process and conviction, serious corruption must bring minimum 10 years of jail, lifetime ban from elections, and removal from party/government posts.",
        hi: "कानूनी प्रक्रिया और दोष सिद्ध होने के बाद गंभीर भ्रष्टाचार पर न्यूनतम 10 साल जेल, आजीवन चुनाव प्रतिबंध और पार्टी/सरकारी पद से हटाना अनिवार्य हो।",
      },
    },
    {
      icon: "🏦",
      title: { en: "Asset Seizure and Recovery", hi: "संपत्ति जब्ती और वसूली" },
      body: {
        en: "Illegal wealth must be seized, including assets transferred to relatives, associates, shell companies, trusts, contractors, or proxies after proper investigation.",
        hi: "उचित जांच के बाद रिश्तेदारों, सहयोगियों, शेल कंपनियों, ट्रस्ट, ठेकेदारों या proxy के नाम पर गई अवैध संपत्ति जब्त हो।",
      },
    },
    {
      icon: "📊",
      title: { en: "Public Money Dashboard", hi: "जनता के पैसे का डैशबोर्ड" },
      body: {
        en: "Every major government expense, tender, project cost, delay, contractor name, and payment milestone must be visible through a citizen-friendly public dashboard.",
        hi: "हर बड़ा सरकारी खर्च, टेंडर, project cost, delay, contractor name और payment milestone नागरिक-friendly public dashboard पर दिखे।",
      },
    },
    {
      icon: "🚫",
      title: { en: "No Royal Politics Rule", hi: "शाही राजनीति बंद नियम" },
      body: {
        en: "Public office is service, not private luxury. Government homes, cars, security, staff, travel, and allowances must have strict public limits and yearly disclosure.",
        hi: "सार्वजनिक पद सेवा है, निजी विलासिता नहीं। सरकारी घर, गाड़ी, सुरक्षा, स्टाफ, यात्रा और भत्तों की सार्वजनिक सीमा और सालाना खुलासा हो।",
      },
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "Anti-Corruption Guarantee", hi: "भ्रष्टाचार विरोध गारंटी" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "Public office is service, not luxury.",
                hi: "सार्वजनिक पद सेवा है, विलासिता नहीं।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "If leaders become richer while citizens struggle, the system must investigate, explain, recover, and punish through due legal process.",
                hi: "अगर जनता संघर्ष करे और नेता अमीर होते जाएं, तो सिस्टम को कानूनी प्रक्रिया से जांच, जवाब, वसूली और सजा करनी होगी।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...auditWords, ...auditWords, ...auditWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SlidingTextBanner
        variant="dark"
        speed="slow"
        items={[
          "ASSET CHECK",
          "CID VERIFICATION",
          "PUBLIC DASHBOARD",
          "10 YEARS JAIL",
          "ASSET SEIZURE",
          "LIFETIME BAN",
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { en: "CID Asset Check", hi: "CID संपत्ति जांच" },
            { en: "10 Years Jail", hi: "10 साल जेल" },
            { en: "Asset Seizure", hi: "संपत्ति जब्ती" },
            { en: "Lifetime Ban", hi: "आजीवन प्रतिबंध" },
          ].map((item) => (
            <div key={item.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Clean Politics Operating System", hi: "साफ राजनीति operating system" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "No hidden wealth. No royal lifestyle. No escape.",
                  hi: "छिपी संपत्ति नहीं। शाही जीवनशैली नहीं। बच निकलना नहीं।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Corruption is not only a bribe. It is unexplained wealth, luxury from public office, fake contracts, benami property, and family privilege built from public power.",
                  hi: "भ्रष्टाचार सिर्फ रिश्वत नहीं। यह अघोषित संपत्ति, सार्वजनिक पद से विलासिता, फर्जी ठेके, बेनामी संपत्ति और सत्ता से बना पारिवारिक privilege भी है।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {antiPromises.map((policy, index) => (
            <div key={policy.title.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[3rem] bg-white/76 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl">
                  {policy.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Audit {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.05em] text-black md:text-3xl">
                    <BilingualText value={policy.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold leading-6 text-black/68">
                <BilingualText value={policy.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <PoliticianLifestyleSection mode={mode} />
      <PublicAccountabilitySection mode={mode} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Final Guarantee", hi: "अंतिम गारंटी" }} mode={mode} />
          <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
            <BilingualText
              value={{
                en: "Power will be audited. Wealth will be explained.",
                hi: "सत्ता का ऑडिट होगा। संपत्ति का जवाब होगा।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
            />
          </h2>
          <p className="mt-8 max-w-4xl text-base font-bold leading-7 text-white/62">
            <BilingualText
              value={{
                en: "No leader, no party, no contractor network, and no family privilege should be above public accountability.",
                hi: "कोई नेता, कोई पार्टी, कोई ठेकेदार नेटवर्क और कोई पारिवारिक privilege सार्वजनिक जवाबदेही से ऊपर नहीं होगा।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4 text-white/35"
            />
          </p>
        </div>
      </section>
    </>
  );
}

function NoVIPCulturePage({ mode }: { mode: LangMode }) {
  const noVipWords = [
    "NO VIP ROADS",
    "NO ROYAL CONVOYS",
    "NO LUXURY POLITICS",
    "PUBLIC TRANSPORT FIRST",
    "LEADERS USE PUBLIC SYSTEMS",
    "2 YEAR FIX DEADLINE",
  ];

  const noVipLines: I18n[] = [
    { en: "No VIP roads.", hi: "VIP roads नहीं।" },
    { en: "No royal convoys.", hi: "शाही convoy नहीं।" },
    { en: "No luxury politics.", hi: "Luxury politics नहीं।" },
    { en: "No public money for personal comfort.", hi: "Personal comfort के लिए public money नहीं।" },
  ];

  const publicSystems: I18n[] = [
    { en: "Government hospitals", hi: "सरकारी अस्पताल" },
    { en: "Government schools", hi: "सरकारी स्कूल" },
    { en: "Public transport", hi: "सार्वजनिक परिवहन" },
    { en: "Public offices", hi: "सरकारी दफ्तर" },
    { en: "Public roads", hi: "सार्वजनिक सड़कें" },
    { en: "Complaint systems", hi: "शिकायत प्रणाली" },
  ];

  const publicTransportItems: I18n[] = [
    { en: "Metro", hi: "Metro" },
    { en: "Bus", hi: "Bus" },
    { en: "Train", hi: "Train" },
    { en: "Government transport", hi: "Government transport" },
    { en: "Walking inspection", hi: "Walking inspection" },
    { en: "Cycling inspection", hi: "Cycling inspection" },
  ];

  const rules: { title: I18n; body: I18n }[] = [
    {
      title: { en: "Same System Rule", hi: "Same System Rule" },
      body: {
        en: "After election, every party MLA, MP, minister, and senior office holder must use and inspect the same public systems citizens use: government hospitals, government schools, public transport, public offices, public roads, and complaint systems. Security-sensitive cases can have limited written exceptions.",
        hi: "चुनाव के बाद हर MLA, MP, minister और senior office holder वही public systems use और inspect करेगा जो citizens use करते हैं: government hospitals, government schools, public transport, public offices, public roads और complaint systems। Security-sensitive cases में limited written exceptions हो सकते हैं।",
      },
    },
    {
      title: { en: "Two-Year Fix Deadline", hi: "Two-Year Fix Deadline" },
      body: {
        en: "Elected members get 2 years to make basic public services in their area usable for common citizens and party members. If a leader cannot use the public hospital, public school, public road, public transport, or public office after 2 years, they have failed the people.",
        hi: "Elected members को 2 साल मिलेंगे ताकि उनके area की basic public services common citizens और party members के use लायक बनें। अगर 2 साल बाद leader public hospital, public school, public road, public transport या public office use नहीं कर सकता, तो वह जनता के लिए fail हुआ।",
      },
    },
    {
      title: { en: "Public Transport Rule", hi: "Public Transport Rule" },
      body: {
        en: "Party members must regularly use metro, bus, train, government transport, walking inspection, and cycling inspection so they experience heat, crowding, delays, unsafe routes, bad last-mile connectivity, dirty stations, and broken roads directly.",
        hi: "Party members को regularly metro, bus, train, government transport, walking inspection और cycling inspection use करना होगा ताकि वे heat, crowding, delays, unsafe routes, bad last-mile connectivity, dirty stations और broken roads खुद experience करें।",
      },
    },
    {
      title: { en: "No Luxury Politics Rule", hi: "No Luxury Politics Rule" },
      body: {
        en: "No unnecessary convoy, no luxury cars from public money, no expensive office renovation, no VIP road blocking, no misuse of security, and no public money for personal comfort.",
        hi: "Unnecessary convoy नहीं, public money से luxury cars नहीं, expensive office renovation नहीं, VIP road blocking नहीं, security misuse नहीं और personal comfort के लिए public money नहीं।",
      },
    },
    {
      title: { en: "Public Service Audit", hi: "Public Service Audit" },
      body: {
        en: "Every elected member must publish a yearly report showing how many times they used public transport, how many government hospitals and schools they inspected, how many public complaints they solved, and how much public money was spent on office, travel, security, car, and bungalow.",
        hi: "हर elected member yearly report publish करेगा जिसमें public transport usage, government hospital और school inspections, solved complaints और office, travel, security, car, bungalow पर खर्च public money दिखेगा।",
      },
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "No VIP Culture Rule", hi: "VIP संस्कृति बंद नियम" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "End VIP Culture. Make leaders use the system they control.",
                hi: "VIP संस्कृति बंद। नेता वही सिस्टम use करें जिसे वे control करते हैं।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "If public services are not good enough for leaders, they are not good enough for citizens.",
                hi: "अगर public services leaders के लिए अच्छी नहीं हैं, तो वे citizens के लिए भी अच्छी नहीं हैं।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...noVipWords, ...noVipWords, ...noVipWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Core Rule", hi: "मुख्य नियम" }} mode={mode} />
          <div className="mt-6 grid gap-4 text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-7xl lg:text-8xl">
            {noVipLines.map((line, index) => (
              <p key={line.en} className={index % 2 === 0 ? "text-white" : "text-white/45"}>
                <BilingualText value={line} mode={mode} hiClassName="text-lg leading-6 tracking-normal text-white/35 md:text-2xl" />
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Same System Rule", hi: "Same System Rule" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Leaders should not escape broken systems. They should fix them.",
                  hi: "Leaders को broken systems से भागना नहीं चाहिए। उन्हें उन्हें fix करना चाहिए।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "If public transport, hospitals, schools, roads, offices, buses, trains, and complaint systems are broken, leaders must fix them — not escape them through VIP privilege.",
                  hi: "अगर public transport, hospitals, schools, roads, offices, buses, trains और complaint systems broken हैं, तो leaders को उन्हें fix करना होगा — VIP privilege से escape नहीं करना होगा।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {publicSystems.map((system) => (
            <div key={system.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={system} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="rounded-[3rem] bg-black p-8 text-white md:p-10">
              <PageEyebrow value={{ en: "2-Year Fix Deadline", hi: "2 साल की deadline" }} mode={mode} />
              <p className="mt-8 text-[7rem] font-black leading-none tracking-[-0.1em] text-[#B6FF00] md:text-[10rem]">02</p>
              <p className="mt-4 text-3xl font-black leading-9 tracking-[-0.05em] text-white md:text-5xl md:leading-[3.4rem]">
                <BilingualText
                  value={{ en: "Years to fix basic public services.", hi: "Basic public services fix करने के लिए साल।" }}
                  mode={mode}
                  hiClassName="text-sm leading-5 text-white/35 md:text-lg"
                />
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {rules.map((rule, index) => (
                <article key={rule.title.en} className="reveal-card micro-lift apple-clean-card rounded-[2.5rem] bg-white/76 p-6 backdrop-blur-xl">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Rule {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-black leading-[1.02] tracking-[-0.055em] text-black md:text-3xl">
                    <BilingualText value={rule.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                  <p className="mt-4 text-sm font-bold leading-6 text-black/66">
                    <BilingualText value={rule.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <PageEyebrow value={{ en: "Public Transport Rule", hi: "Public Transport Rule" }} mode={mode} />
              <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
                <BilingualText
                  value={{
                    en: "Use the same route. Feel the same pain. Fix the same system.",
                    hi: "Same route use करो। Same pain feel करो। Same system fix करो।",
                  }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
                />
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {publicTransportItems.map((item) => (
                <div key={item.en} className="rounded-[1.75rem] bg-white/10 p-4 text-lg font-black text-white/82">
                  <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4 text-white/35" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 text-center md:p-12">
          <PageEyebrow value={{ en: "Final Line", hi: "अंतिम बात" }} mode={mode} />
          <h2 className="mx-auto mt-5 max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
            <BilingualText
              value={{
                en: "Leaders should not rise above the people. Leaders should raise the system for the people.",
                hi: "Leaders को जनता से ऊपर नहीं उठना चाहिए। Leaders को जनता के लिए system उठाना चाहिए।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
            />
          </h2>
          <p className="mx-auto mt-8 max-w-4xl text-xl font-black leading-8 text-black/62">
            <BilingualText
              value={{
                en: "Public office is not a shortcut to luxury. Public office is duty.",
                hi: "Public office luxury का shortcut नहीं है। Public office duty है।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45"
            />
          </p>
        </div>
      </section>
    </>
  );
}

function GreatIndiaMissionPage({ mode }: { mode: LangMode }) {
  const missionWords = [
    "Middle Class First",
    "Farmer to Founder",
    "Women Safety",
    "Small Business Freedom",
    "Indian Family Protection",
    "Clean City Clean Village",
    "Climate Heat Pollution",
    "Tree Survival Audit",
    "Police Reform",
    "Taxpayer Dashboard",
    "Indian Product Mission",
    "National Character",
  ];

  const missionTopics: { icon: string; title: I18n; line: I18n; points: I18n[] }[] = [
    {
      icon: "🏠",
      title: { en: "Middle Class First", hi: "मिडिल क्लास प्रथम" },
      line: { en: "Middle class pays the bill. Middle class deserves respect.", hi: "मिडिल क्लास बिल भरता है। मिडिल क्लास सम्मान deserve करता है।" },
      points: [
        { en: "Lower tax burden on honest earners.", hi: "ईमानदार earners पर कम tax burden." },
        { en: "Transparent use of taxpayer money.", hi: "Taxpayer money का transparent use." },
        { en: "Affordable education, healthcare, housing, and rent protection.", hi: "Affordable education, healthcare, housing और rent protection." },
        { en: "No harassment for small compliance mistakes.", hi: "छोटी compliance mistakes पर harassment नहीं." },
      ],
    },
    {
      icon: "🌾",
      title: { en: "Farmer to Founder Mission", hi: "Farmer to Founder Mission" },
      line: { en: "Farmers should not just survive harvests. Farmers should build wealth.", hi: "किसान सिर्फ harvest survive न करें। किसान wealth build करें।" },
      points: [
        { en: "Agri processing units and cold storage in every district.", hi: "हर जिले में agri processing units और cold storage." },
        { en: "Direct farmer-to-consumer platforms.", hi: "Direct farmer-to-consumer platforms." },
        { en: "Farm tourism, medicinal crops, and solar income for farmers.", hi: "Farm tourism, medicinal crops और farmers के लिए solar income." },
        { en: "AI-based crop advisory and market intelligence.", hi: "AI-based crop advisory और market intelligence." },
      ],
    },
    {
      icon: "🛡️",
      title: { en: "Women Safety and Economic Freedom", hi: "महिला सुरक्षा और आर्थिक स्वतंत्रता" },
      line: { en: "A country is not developed until women feel free after sunset.", hi: "देश तब तक developed नहीं जब तक महिलाएं sunset के बाद free feel न करें।" },
      points: [
        { en: "Safe transport and fast crime response.", hi: "Safe transport और fast crime response." },
        { en: "Women police units and workplace safety systems.", hi: "Women police units और workplace safety systems." },
        { en: "Skill and business grants for women.", hi: "महिलाओं के लिए skill और business grants." },
        { en: "Hostel and rental safety standards.", hi: "Hostel और rental safety standards." },
      ],
    },
    {
      icon: "🏪",
      title: { en: "Small Business Freedom", hi: "छोटे व्यवसाय की स्वतंत्रता" },
      line: { en: "Small businesses create jobs. Government should not create fear.", hi: "Small businesses jobs बनाते हैं। Government fear नहीं बनाए।" },
      points: [
        { en: "24-hour business registration and simple GST support.", hi: "24-hour business registration और simple GST support." },
        { en: "No inspector harassment.", hi: "Inspector harassment नहीं." },
        { en: "Digital loan access and local manufacturing clusters.", hi: "Digital loan access और local manufacturing clusters." },
        { en: "Street vendor dignity and small shop digital upgrade.", hi: "Street vendor dignity और small shop digital upgrade." },
      ],
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: { en: "Indian Family Protection", hi: "भारतीय परिवार सुरक्षा" },
      line: { en: "Every policy must protect the Indian family.", hi: "हर policy भारतीय परिवार को protect करे।" },
      points: [
        { en: "Affordable school fees and medical treatment.", hi: "Affordable school fees और medical treatment." },
        { en: "Old age care and housing access.", hi: "Old age care और housing access." },
        { en: "Food quality and mental health support.", hi: "Food quality और mental health support." },
        { en: "Family income stability.", hi: "Family income stability." },
      ],
    },
    {
      icon: "🏙️",
      title: { en: "Clean City, Clean Village Mission", hi: "स्वच्छ शहर, स्वच्छ गांव मिशन" },
      line: { en: "No Indian should live between garbage, dust, bad roads, and broken drains.", hi: "कोई भारतीय garbage, dust, bad roads और broken drains के बीच न रहे।" },
      points: [
        { en: "Garbage tracking dashboard and drainage audit.", hi: "Garbage tracking dashboard और drainage audit." },
        { en: "Road quality audit and public toilet maintenance.", hi: "Road quality audit और public toilet maintenance." },
        { en: "Clean water guarantee.", hi: "Clean water guarantee." },
        { en: "Ward-level public scorecard and contractor accountability.", hi: "Ward-level public scorecard और contractor accountability." },
      ],
    },
    {
      icon: "🌳",
      title: { en: "Climate, Heat & Pollution Mission", hi: "जलवायु, गर्मी और प्रदूषण मिशन" },
      line: { en: "No Indian should lose health, income, or life because of heat, pollution, and broken urban planning.", hi: "गर्मी, प्रदूषण और खराब urban planning के कारण कोई भारतीय health, income या life न खोए।" },
      points: [
        { en: "Heat Action Plan for every district with heat shelters, drinking water points, shaded bus stops, emergency medical response, school timing rules, and worker safety rules during heat waves.", hi: "हर जिले में heat shelters, drinking water points, shaded bus stops, emergency medical response, school timing rules और heat wave में worker safety rules." },
        { en: "Tree Canopy Mission with yearly targets for every city and village: planted, survived, dead, and replaced trees must be tracked publicly.", hi: "हर city और village के लिए yearly tree canopy targets: planted, survived, dead और replaced trees publicly tracked हों." },
        { en: "Native Tree Plantation focused on shade, biodiversity, water retention, and long-term survival instead of decorative plants.", hi: "Decorative plants की जगह shade, biodiversity, water retention और long-term survival वाले native trees." },
        { en: "Urban Shade Rule for footpaths, bus stops, school routes, hospital routes, market areas, and metro or railway access roads.", hi: "Footpaths, bus stops, school routes, hospital routes, market areas और metro/railway access roads के लिए Urban Shade Rule." },
        { en: "Pollution Accountability Dashboard for ward-wise air quality, dust, garbage burning, industrial pollution, construction dust, and traffic pollution.", hi: "Ward-wise air quality, dust, garbage burning, industrial pollution, construction dust और traffic pollution के लिए dashboard." },
        { en: "Construction Dust Control using green nets, water spraying, covered material transport, and penalties for violations.", hi: "Green nets, water spraying, covered material transport और violations पर penalty के साथ construction dust control." },
        { en: "Clean Public Transport Mission with electric buses, better bus frequency, shaded bus stops, last-mile e-rickshaw integration, and safe cycling lanes.", hi: "Electric buses, better frequency, shaded bus stops, last-mile e-rickshaw integration और safe cycling lanes." },
        { en: "Cool Roof Mission for low-income homes, schools, anganwadis, hospitals, and public buildings with heat-reflective coating.", hi: "Low-income homes, schools, anganwadis, hospitals और public buildings के लिए cool roofs या heat-reflective coating." },
        { en: "Water Body Revival for lakes, ponds, drains, and wetlands to reduce heat, flooding, and water shortage.", hi: "Heat, flooding और water shortage कम करने के लिए lakes, ponds, drains और wetlands revival." },
        { en: "Worker Heat Safety Law for delivery workers, construction workers, traffic police, street vendors, sanitation workers, and outdoor labourers with water, shade, rest breaks, and heat-risk protection.", hi: "Delivery workers, construction workers, traffic police, street vendors, sanitation workers और outdoor labourers के लिए water, shade, rest breaks और heat-risk protection." },
      ],
    },
    {
      icon: "⚖️",
      title: { en: "Police and Court Reform", hi: "पुलिस और कोर्ट सुधार" },
      line: { en: "Justice delayed is democracy denied.", hi: "Justice delayed is democracy denied." },
      points: [
        { en: "Time-bound case tracking and digital FIR.", hi: "Time-bound case tracking और digital FIR." },
        { en: "Police body cameras and modern forensic labs.", hi: "Police body cameras और modern forensic labs." },
        { en: "Fast courts and witness protection.", hi: "Fast courts और witness protection." },
        { en: "Legal aid for poor citizens.", hi: "Poor citizens के लिए legal aid." },
      ],
    },
    {
      icon: "🛰️",
      title: { en: "Indian Product Mission", hi: "भारतीय प्रोडक्ट मिशन" },
      line: { en: "India should not only buy the future. India should build the future.", hi: "भारत सिर्फ future खरीदे नहीं। भारत future बनाए।" },
      points: [
        { en: "Indian apps, AI tools, and cloud platforms.", hi: "Indian apps, AI tools और cloud platforms." },
        { en: "Indian chips, EVs, drones, and defense tech.", hi: "Indian chips, EVs, drones और defense tech." },
        { en: "Indian operating systems for government.", hi: "Government के लिए Indian operating systems." },
        { en: "Public procurement preference for high-quality Indian products.", hi: "High-quality Indian products के लिए public procurement preference." },
      ],
    },
    {
      icon: "📊",
      title: { en: "Taxpayer Dashboard", hi: "Taxpayer Dashboard" },
      line: { en: "Every rupee taken from citizens must be visible to citizens.", hi: "Citizens से लिया हर रुपया citizens को visible होना चाहिए।" },
      points: [
        { en: "Where tax money went and project cost.", hi: "Tax money कहां गया और project cost." },
        { en: "Contractor name and delay reason.", hi: "Contractor name और delay reason." },
        { en: "Completion status and officer responsible.", hi: "Completion status और responsible officer." },
        { en: "Citizen rating for public projects.", hi: "Public projects के लिए citizen rating." },
      ],
    },
    {
      icon: "🧭",
      title: { en: "National Character Mission", hi: "राष्ट्रीय चरित्र मिशन" },
      line: { en: "A great country needs great systems and great character.", hi: "महान देश को महान systems और महान character चाहिए।" },
      points: [
        { en: "Discipline and clean public behaviour.", hi: "Discipline और clean public behaviour." },
        { en: "No bribery culture and truth before propaganda.", hi: "No bribery culture और truth before propaganda." },
        { en: "Respect for women, workers, and public property.", hi: "Women, workers और public property का respect." },
        { en: "Civic duty as a national habit.", hi: "Civic duty as national habit." },
      ],
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "India Mission", hi: "भारत मिशन" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black leading-[0.86] tracking-[-0.08em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "Make India the opportunity nation for every family.",
                hi: "हर परिवार के लिए भारत को opportunity nation बनाओ।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "A practical national mission for middle class families, farmers, women, small businesses, taxpayers, clean cities, clean air, heat protection, tree survival, justice, Indian products, and national character.",
                hi: "Middle class families, farmers, women, small businesses, taxpayers, clean cities, clean air, heat protection, tree survival, justice, Indian products और national character के लिए practical national mission.",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>

          <div className="eligibility-marquee apple-clean-pill mt-12 rounded-full bg-white/70 py-4 backdrop-blur-xl" aria-hidden="true">
            <div className="eligibility-marquee-track">
              {[...missionWords, ...missionWords, ...missionWords].map((word, index) => (
                <span key={`${word}-${index}`} className="eligibility-pill">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SlidingTextBanner
        variant="green"
        speed="slow"
        items={[
          "MIDDLE CLASS FIRST",
          "FARMER TO FOUNDER",
          "WOMEN SAFETY",
          "SMALL BUSINESS FREEDOM",
          "TAXPAYER DASHBOARD",
          "CLIMATE HEAT POLLUTION",
          "TREE SURVIVAL AUDIT",
          "NATIONAL CHARACTER",
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Big National Frame", hi: "बड़ा राष्ट्रीय विचार" }} mode={mode} />
          <div className="mt-6 grid gap-4 text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-7xl lg:text-8xl">
            <p>Every family must rise.</p>
            <p className="text-white/45">Every rupee must be visible.</p>
            <p>Every city must work.</p>
            <p className="text-white/45">Every citizen must breathe clean air.</p>
            <p>Every tree planted must survive.</p>
            <p className="text-white/45">Every citizen must feel safe.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "11 Missions", hi: "11 मिशन" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{ en: "Daily-life problems need system-level solutions.", hi: "Daily-life problems को system-level solutions चाहिए।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "This page expands the movement beyond politics into household security, income, dignity, safety, clean air, heat protection, tree survival, justice, and national discipline.",
                  hi: "यह page movement को politics से आगे household security, income, dignity, safety, clean air, heat protection, tree survival, justice और national discipline तक ले जाता है।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {missionTopics.map((topic, index) => (
            <article key={topic.title.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[3rem] bg-white/76 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl">
                  {topic.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Mission {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.05em] text-black md:text-3xl">
                    <BilingualText value={topic.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-[2.25rem] bg-black p-6 text-white shadow-xl">
                <p className="text-lg font-black leading-7 tracking-[-0.035em] text-white md:text-xl">
                  <BilingualText value={topic.line} mode={mode} hiClassName="text-xs leading-4 text-white/35" />
                </p>
              </div>

              <ul className="mt-6 grid gap-3">
                {topic.points.map((point) => (
                  <li key={point.en} className="flex gap-3 rounded-[1.65rem] bg-white/72 p-4 text-sm font-bold leading-6 text-black/75 shadow-[0_10px_30px_rgba(0,0,0,0.035)] backdrop-blur-xl">
                    <span className="manifesto-bullet mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                    <span>
                      <BilingualText value={point} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <PageEyebrow value={{ en: "Climate Reality Lines", hi: "जलवायु सच्चाई" }} mode={mode} />
              <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
                <BilingualText
                  value={{ en: "Clean air should not be a luxury product.", hi: "Clean air luxury product नहीं होना चाहिए।" }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
                />
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { en: "AC is not climate policy.", hi: "AC climate policy नहीं है।" },
                { en: "A city without trees is a heat trap.", hi: "पेड़ों के बिना शहर heat trap है।" },
                { en: "Pollution is silent violence.", hi: "Pollution silent violence है।" },
                { en: "Tree plantation without survival tracking is just a photo shoot.", hi: "Survival tracking के बिना tree plantation सिर्फ photo shoot है।" },
                { en: "Heat wave deaths are policy failures.", hi: "Heat wave deaths policy failures हैं।" },
                { en: "Concrete cities are cooking citizens.", hi: "Concrete cities citizens को पका रही हैं।" },
              ].map((line) => (
                <div key={line.en} className="rounded-[1.75rem] bg-white/10 p-4 text-lg font-black text-white/82">
                  <BilingualText value={line} mode={mode} hiClassName="text-[11px] leading-4 text-white/35" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="rounded-[3rem] bg-black p-8 text-white md:p-10">
              <PageEyebrow value={{ en: "Tree Plantation Survival Audit", hi: "वृक्षारोपण survival audit" }} mode={mode} />
              <p className="mt-8 text-[6rem] font-black leading-none tracking-[-0.1em] text-[#B6FF00] md:text-[9rem]">12</p>
              <p className="mt-4 text-3xl font-black leading-9 tracking-[-0.05em] text-white md:text-5xl md:leading-[3.4rem]">
                <BilingualText
                  value={{ en: "Months of survival tracking after every plantation drive.", hi: "हर plantation drive के बाद survival tracking के महीने।" }}
                  mode={mode}
                  hiClassName="text-sm leading-5 text-white/35 md:text-lg"
                />
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { en: "Trees planted", hi: "कितने trees planted" },
                { en: "Tree species", hi: "Tree species" },
                { en: "Location", hi: "Location" },
                { en: "Contractor or department", hi: "Contractor या department" },
                { en: "Cost", hi: "Cost" },
                { en: "Survival after 6 months", hi: "6 months survival" },
                { en: "Survival after 1 year", hi: "1 year survival" },
                { en: "Replacement status", hi: "Replacement status" },
              ].map((audit, index) => (
                <article key={audit.en} className="reveal-card micro-lift apple-clean-card rounded-[2.5rem] bg-white/76 p-6 backdrop-blur-xl">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Audit Field {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-black leading-[1.02] tracking-[-0.055em] text-black md:text-3xl">
                    <BilingualText value={audit} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 text-center md:p-12">
          <PageEyebrow value={{ en: "Final Mission", hi: "अंतिम मिशन" }} mode={mode} />
          <h2 className="mx-auto mt-5 max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
            <BilingualText
              value={{
                en: "Make India work for the honest, the hardworking, and the ordinary.",
                hi: "भारत को honest, hardworking और ordinary लोगों के लिए काम करने वाला बनाओ।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
            />
          </h2>
        </div>
      </section>
    </>
  );
}

function ActionHubPage({ mode }: { mode: LangMode }) {
  return (
    <>
      <ContactPage mode={mode} />
      <JantaOathJoinSection mode={mode} />
      <CitizenReportCategoriesSection mode={mode} />
      <VolunteerRolesSection mode={mode} />
    </>
  );
}

function JantaOathJoinSection({ mode }: { mode: LangMode }) {
  const oathLines: I18n[] = [
    {
      en: "I will not sell my vote for biryani, bottle, caste drama, fear, fake promises, or last-minute cash.",
      hi: "मैं अपना vote biryani, bottle, caste drama, डर, fake promises या last-minute cash के लिए नहीं बेचूंगा।",
    },
    {
      en: "I will ask: paisa gaya kahan, job aayi kahan, road bani kahan, tree bacha kahan, leader ka report card kahan?",
      hi: "मैं पूछूंगा: पैसा गया कहां, job आई कहां, road बनी कहां, tree बचा कहां, leader का report card कहां?",
    },
    {
      en: "I will not spread hate, fake news, personal abuse, or violence. I will spread proof, questions, reports, and accountability.",
      hi: "मैं hate, fake news, personal abuse या violence नहीं फैलाऊंगा। मैं proof, questions, reports और accountability फैलाऊंगा।",
    },
    {
      en: "I am not an insect. I am a citizen who survived the system. Now I will organize to fix it.",
      hi: "मैं insect नहीं। मैं citizen हूं जिसने system survive किया। अब मैं इसे fix करने के लिए organize करूंगा।",
    },
  ];

  const membershipLevels: { level: string; title: I18n; body: I18n }[] = [
    { level: "01", title: { en: "Silent Survivor", hi: "Silent Survivor" }, body: { en: "Suffered the system quietly. Now converts pain into public pressure.", hi: "System quietly सहा। अब pain को public pressure बनाता है।" } },
    { level: "02", title: { en: "Question Poochne Wala", hi: "Question Poochne Wala" }, body: { en: "Asks source kya hai, deadline kya hai, budget kahan hai, zimmedar kaun hai?", hi: "पूछता है source क्या है, deadline क्या है, budget कहां है, जिम्मेदार कौन है?" } },
    { level: "03", title: { en: "Receipt Collector", hi: "Receipt Collector" }, body: { en: "Wants proof of every rupee, tender, road, plantation, and public promise.", hi: "हर रुपया, tender, road, plantation और public promise का proof चाहता है।" } },
    { level: "04", title: { en: "Booth Cockroach", hi: "Booth Cockroach" }, body: { en: "Keeps the movement alive in mohalla, campus, office, and ward.", hi: "Mohalla, campus, office और ward में movement alive रखता है।" } },
    { level: "05", title: { en: "System Ka Auditor", hi: "System Ka Auditor" }, body: { en: "Tracks promises, delays, excuses, corruption, asset growth, and failures.", hi: "Promises, delays, excuses, corruption, asset growth और failures track करता है।" } },
  ];

  const rules: I18n[] = [
    { en: "No hate. Only audit.", hi: "Hate नहीं। सिर्फ audit।" },
    { en: "No fake news. Only proof.", hi: "Fake news नहीं। सिर्फ proof।" },
    { en: "No VIP worship. Public service only.", hi: "VIP worship नहीं। सिर्फ public service।" },
    { en: "No excuse accepted without deadline.", hi: "Deadline के बिना कोई excuse accepted नहीं।" },
    { en: "If leader gets luxury, citizen gets report card.", hi: "Leader को luxury मिले तो citizen को report card मिले।" },
  ];

  const translations: { official: I18n; janta: I18n }[] = [
    { official: { en: "Process is ongoing.", hi: "Process चल रहा है।" }, janta: { en: "Nothing happened yet.", hi: "अभी कुछ हुआ नहीं।" } },
    { official: { en: "Investigation is underway.", hi: "Investigation चल रही है।" }, janta: { en: "Wait till people forget.", hi: "लोग भूलें तब तक wait करो।" } },
    { official: { en: "Technical issue.", hi: "Technical issue।" }, janta: { en: "System failed again.", hi: "System फिर fail हुआ।" } },
    { official: { en: "Youth are our future.", hi: "Youth हमारा future हैं।" }, janta: { en: "Exam date still missing.", hi: "Exam date अभी भी missing है।" } },
  ];

  return (
    <section id="janta-oath" className="mx-auto max-w-7xl px-6 py-16">
      <div className="overflow-hidden glass-card rounded-[3.25rem] border border-black/10 shadow-sm transition-all duration-500 ease-out hover:shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <PageEyebrow value={{ en: "Cockroach Janta Oath", hi: "कॉकरोच जंता शपथ" }} mode={mode} />
            <PageTitle value={{ en: "Take the oath. Then join or report.", hi: "शपथ लें। फिर जुड़ें या रिपोर्ट करें।" }} mode={mode} />
            <p className="mt-6 text-base font-bold leading-7 text-black/65">
              <BilingualText
                value={{
                  en: "The Join / Report page now includes the oath, membership levels, rules, and excuse translation. One action hub. No separate oath page needed.",
                  hi: "Join / Report page में अब oath, membership levels, rules और excuse translation सब हैं। एक action hub। अलग oath page की जरूरत नहीं।",
                }}
                mode={mode}
                hiClassName="text-xs leading-4"
              />
            </p>

            <div className="mt-8 grid gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="premium-toggle premium-toggle-dark inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-base font-black transition-all duration-300 ease-out">
                I Took the Oath — Join Now
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="premium-toggle premium-toggle-light inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-base font-black transition-all duration-300 ease-out">
                Send Issue After Oath
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#fafafa] p-8 md:p-12">
            <div className="join-oath-card rounded-[2.25rem] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-black text-[#B6FF00] shadow-xl">
                  <CockroachIcon className="h-9 w-9" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Oath Card</p>
                  <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-black">Janta First. Evidence First.</h3>
                </div>
              </div>
              <div className="grid gap-3">
                {oathLines.map((line, index) => (
                  <div key={line.en} className="join-oath-line rounded-[1.65rem] bg-black/[0.035] p-4">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p><BilingualText value={line} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 bg-white/55 p-8 md:p-12">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="rounded-[2.5rem] bg-black p-7 text-white shadow-xl">
              <PageEyebrow value={{ en: "Janta Membership Levels", hi: "Janta Membership Levels" }} mode={mode} />
              <p className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] text-white md:text-6xl">From survivor to system auditor.</p>
              <p className="mt-5 text-sm font-bold leading-6 text-white/58">
                <BilingualText value={{ en: "Start small. Stay disciplined. Grow the movement.", hi: "छोटा शुरू करें। Disciplined रहें। Movement grow करें।" }} mode={mode} hiClassName="text-xs leading-5 text-white/45" />
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {membershipLevels.map((item) => (
                <article key={item.title.en} className="join-oath-mini-card rounded-[1.65rem] bg-white p-5 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Level {item.level}</p>
                  <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-black"><BilingualText value={item.title} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-black/62"><BilingualText value={item.body} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid border-t border-black/10 md:grid-cols-2">
          <div className="join-rules-black-box bg-black p-8 text-white md:p-12">
            <PageEyebrow value={{ en: "Cockroach Janta Rules", hi: "कॉकरोच जंता नियम" }} mode={mode} />
            <h2 className="join-rules-heading mt-5 font-black tracking-[-0.06em] text-white">
              <BilingualText
                value={{ en: "Rules should be simple enough to remember.", hi: "Rules इतने simple हों कि याद रह जाएं।" }}
                mode={mode}
                hiClassName="text-xl leading-7 tracking-normal text-white/55 md:text-3xl md:leading-10"
              />
            </h2>
            <div className="join-rules-grid mt-8">
              {rules.map((rule, index) => (
                <div key={rule.en} className="join-rules-big-pill">
                  <span className="join-rules-number">{String(index + 1).padStart(2, "0")}</span>
                  <p>
                    <BilingualText value={rule} mode={mode} hiClassName="text-base leading-7 text-white/60 md:text-lg md:leading-8" />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 md:p-12">
            <PageEyebrow value={{ en: "Excuse Translation", hi: "Excuse Translation" }} mode={mode} />
            <div className="oath-translation-list mt-8">
              {translations.map((row) => (
                <article key={row.official.en} className="oath-translation-card">
                  <div>
                    <p className="oath-label">Official says</p>
                    <h4><BilingualText value={row.official} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></h4>
                  </div>
                  <div>
                    <p className="oath-label">Janta translation</p>
                    <h4><BilingualText value={row.janta} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage({ mode }: { mode: LangMode }) {
  return (
    <section id="join" className="mx-auto max-w-7xl px-6 py-20">
      <div className="overflow-hidden glass-card rounded-[3.25rem] border border-black/10 shadow-sm transition-all duration-500 ease-out hover:shadow-2xl">
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
            <div className="rounded-[2.25rem] border border-black/10 bg-white p-8 text-center shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-5xl">📸</p>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">
                <BilingualText
                  value={{ en: "Cockroach India Party", hi: "कॉकरोच इंडिया पार्टी" }}
                  mode={mode}
                  hiClassName="text-sm leading-5 tracking-normal"
                />
              </h3>
              <p className="mt-3 text-sm font-bold text-black/50">@cockroachindiaparty_</p>

              <div className="mt-8 grid gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-toggle premium-toggle-dark inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-base font-black transition-all duration-300 ease-out"
                >
                  Follow on Instagram
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-toggle premium-toggle-light inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-base font-black transition-all duration-300 ease-out"
                >
                  Send Issue / Corruption Video
                </a>
              </div>

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

function WordRevealText({
  value,
  mode,
  hiClassName = "text-lg leading-6 tracking-normal text-black/45 md:text-2xl",
}: {
  value: I18n;
  mode: LangMode;
  hiClassName?: string;
}) {
  const words = mode === "hi" ? value.hi.split(" ") : value.en.split(" ");

  return (
    <>
      <span className="word-reveal" aria-label={mode === "hi" ? value.hi : value.en}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="word-reveal-word"
            style={{ animationDelay: `${index * 0.055}s` }}
          >
            {word}&nbsp;
          </span>
        ))}
      </span>
      {mode === "both" && <HindiShadow text={value.hi} className={hiClassName} />}
    </>
  );
}

function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed left-0 top-0 z-[90] h-1 w-full bg-black/5" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-[#0B8F36] via-[#B6FF00] to-[#64E986] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function FloatingJoinNowButton({ mode, onClick }: { mode: LangMode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="floating-join-toggle" aria-label="Join the movement">
      <span className="floating-join-icon">
        <CockroachIcon className="h-5 w-5" />
      </span>
      <span className="floating-join-text">
        {mode === "hi" ? "जुड़ें / रिपोर्ट" : "Join / Report"}
      </span>
    </button>
  );
}

function CockroachJantaOathPage({ mode }: { mode: LangMode }) {
  const oathLines: I18n[] = [
    {
      en: "I will not sell my vote for biryani, bottle, caste drama, fear, fake promises, or last-minute cash.",
      hi: "मैं अपना vote biryani, bottle, caste drama, डर, fake promises या last-minute cash के लिए नहीं बेचूंगा।",
    },
    {
      en: "I will ask: paisa gaya kahan, job aayi kahan, road bani kahan, tree bacha kahan, leader ka report card kahan?",
      hi: "मैं पूछूंगा: पैसा गया कहां, job आई कहां, road बनी कहां, tree बचा कहां, leader का report card कहां?",
    },
    {
      en: "I will not spread hate, fake news, personal abuse, or violence. I will spread proof, questions, reports, and accountability.",
      hi: "मैं hate, fake news, personal abuse या violence नहीं फैलाऊंगा। मैं proof, questions, reports और accountability फैलाऊंगा।",
    },
    {
      en: "I will laugh at excuses, save screenshots, collect receipts, and help ordinary citizens become visible.",
      hi: "मैं excuses पर हंसूंगा, screenshots बचाऊंगा, receipts collect करूंगा और ordinary citizens को visible बनाने में मदद करूंगा।",
    },
    {
      en: "I am not an insect. I am a citizen who survived the system. Now I will organize to fix it.",
      hi: "मैं insect नहीं। मैं citizen हूं जिसने system survive किया। अब मैं इसे fix करने के लिए organize करूंगा।",
    },
  ];

  const membershipLevels: { level: string; title: I18n; body: I18n }[] = [
    { level: "01", title: { en: "Silent Survivor", hi: "Silent Survivor" }, body: { en: "For people who suffered the system quietly but now want their pain converted into public pressure.", hi: "उन लोगों के लिए जिन्होंने system quietly सहा, लेकिन अब pain को public pressure बनाना चाहते हैं।" } },
    { level: "02", title: { en: "Question Poochne Wala", hi: "Question Poochne Wala" }, body: { en: "For citizens who ask source kya hai, deadline kya hai, budget kahan hai, aur zimmedar kaun hai?", hi: "उन citizens के लिए जो पूछते हैं source क्या है, deadline क्या है, budget कहां है और जिम्मेदार कौन है?" } },
    { level: "03", title: { en: "Receipt Collector", hi: "Receipt Collector" }, body: { en: "For taxpayers who want proof of every rupee, every tender, every road, every plantation, and every public promise.", hi: "Taxpayers के लिए जिन्हें हर रुपया, tender, road, plantation और public promise का proof चाहिए।" } },
    { level: "04", title: { en: "Booth Cockroach", hi: "Booth Cockroach" }, body: { en: "For local citizens who refuse to disappear and keep the movement alive in mohalla, campus, office, and ward.", hi: "Local citizens के लिए जो disappear होने से मना करते हैं और mohalla, campus, office और ward में movement alive रखते हैं।" } },
    { level: "05", title: { en: "System Ka Auditor", hi: "System Ka Auditor" }, body: { en: "For people who track promises, delays, corruption, excuses, asset growth, and public service failure with discipline.", hi: "उन लोगों के लिए जो promises, delays, corruption, excuses, asset growth और public service failure को discipline से track करते हैं।" } },
  ];

  const rules: I18n[] = [
    { en: "No hate. Only audit.", hi: "Hate नहीं। सिर्फ audit।" },
    { en: "No fake news. Only proof.", hi: "Fake news नहीं। सिर्फ proof।" },
    { en: "No VIP worship. Public service only.", hi: "VIP worship नहीं। सिर्फ public service।" },
    { en: "No paper leak sympathy. Student future first.", hi: "Paper leak sympathy नहीं। Student future first।" },
    { en: "No excuse accepted without deadline.", hi: "Deadline के बिना कोई excuse accepted नहीं।" },
    { en: "If leader gets luxury, citizen gets report card.", hi: "Leader को luxury मिले तो citizen को report card मिले।" },
  ];

  const translations: { official: I18n; janta: I18n }[] = [
    { official: { en: "Process is ongoing.", hi: "Process चल रहा है।" }, janta: { en: "Nothing happened yet.", hi: "अभी कुछ हुआ नहीं।" } },
    { official: { en: "Investigation is underway.", hi: "Investigation चल रही है।" }, janta: { en: "Wait till people forget.", hi: "लोग भूलें तब तक wait करो।" } },
    { official: { en: "Technical issue.", hi: "Technical issue।" }, janta: { en: "System failed again.", hi: "System फिर fail हुआ।" } },
    { official: { en: "Development is coming.", hi: "Development आ रहा है।" }, janta: { en: "Road still broken.", hi: "Road अभी भी broken है।" } },
    { official: { en: "Youth are our future.", hi: "Youth हमारा future हैं।" }, janta: { en: "Exam date still missing.", hi: "Exam date अभी भी missing है।" } },
  ];

  const complaints: I18n[] = [
    { en: "My road has become adventure sports.", hi: "मेरी road adventure sports बन चुकी है।" },
    { en: "My exam calendar is more mysterious than a thriller series.", hi: "मेरा exam calendar thriller series से ज्यादा mysterious है।" },
    { en: "My salary is full-time. My workload is unlimited-time.", hi: "Salary full-time है। Workload unlimited-time है।" },
    { en: "My tax is deducted instantly. My service is pending forever.", hi: "Tax instantly deduct होता है। Service forever pending रहती है।" },
    { en: "My city has more dust than oxygen.", hi: "मेरे city में oxygen से ज्यादा dust है।" },
    { en: "My leader’s car changed. My road did not.", hi: "Leader की car बदल गई। मेरी road नहीं।" },
  ];

  const reportCard: I18n[] = [
    { en: "Leader attendance", hi: "Leader attendance" },
    { en: "Public money usage", hi: "Public money usage" },
    { en: "Promise completion", hi: "Promise completion" },
    { en: "Local problem solving", hi: "Local problem solving" },
    { en: "Public transport usage", hi: "Public transport usage" },
    { en: "Asset growth", hi: "Asset growth" },
    { en: "Debate participation", hi: "Debate participation" },
    { en: "Complaint response time", hi: "Complaint response time" },
  ];

  const wantedExcuses = ["File is moving", "Approval is pending", "Budget is coming", "Committee is formed", "Portal is down", "Data is being collected", "Matter is under review", "Development is in progress"];

  const departments: { icon: string; title: I18n; body: I18n }[] = [
    { icon: "🎤", title: { en: "Excuse Translation Department", hi: "Excuse Translation Department" }, body: { en: "Turns official excuses into plain citizen language so nobody gets confused by polished delay.", hi: "Official excuses को plain citizen language में बदलता है ताकि polished delay से कोई confuse न हो।" } },
    { icon: "🧾", title: { en: "Receipt Hunter Squad", hi: "Receipt Hunter Squad" }, body: { en: "Tracks where public money went, who got the contract, why it was delayed, and what citizens actually received.", hi: "Public money कहां गया, contract किसे मिला, delay क्यों हुआ और citizens को क्या मिला — यह track करता है।" } },
    { icon: "📄", title: { en: "Paper Leak Detective Unit", hi: "Paper Leak Detective Unit" }, body: { en: "Follows exam delays, leaked papers, cancelled recruitments, and youth career damage with evidence.", hi: "Exam delays, leaked papers, cancelled recruitments और youth career damage को evidence के साथ follow करता है।" } },
    { icon: "🚨", title: { en: "VIP Siren Blocker Team", hi: "VIP Siren Blocker Team" }, body: { en: "Reminds leaders that public roads, public systems, and public money belong to citizens first.", hi: "Leaders को याद दिलाता है कि public roads, public systems और public money पहले citizens की है।" } },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 text-center md:p-14">
          <PageEyebrow value={{ en: "Cockroach Janta Oath", hi: "कॉकरोच जंता शपथ" }} mode={mode} />
          <h1 className="mx-auto mt-6 max-w-6xl text-6xl font-black leading-[0.9] tracking-[-0.07em] text-black md:text-8xl lg:text-9xl">
            <WordRevealText
              value={{
                en: "System ignored us. Janta saved the screenshot.",
                hi: "System ने ignore किया। Janta ने screenshot बचा लिया।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/50 md:text-4xl"
            />
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-xl font-black leading-9 tracking-[-0.03em] text-black/65 md:text-2xl md:leading-10">
            <BilingualText
              value={{
                en: "We are not insects. We are citizens who survived the system. Now humour becomes organization and accountability.",
                hi: "हम insects नहीं। हम citizens हैं जिन्होंने system survive किया। अब humour organization और accountability बनेगा।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/45 md:text-base"
            />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 md:p-12">
          <PageEyebrow value={{ en: "The Oath", hi: "शपथ" }} mode={mode} />
          <div className="mt-8 grid gap-4">
            {oathLines.map((line, index) => (
              <div key={line.en} className="oath-line-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p><BilingualText value={line} mode={mode} hiClassName="text-xs leading-4 text-black/45" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-5">
          {membershipLevels.map((item) => (
            <article key={item.title.en} className="oath-mini-card apple-clean-card">
              <p className="oath-card-index">Level {item.level}</p>
              <h3><BilingualText value={item.title} mode={mode} hiClassName="text-xs leading-4 text-black/45" /></h3>
              <p><BilingualText value={item.body} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
          <PageEyebrow value={{ en: "Cockroach Janta Rules", hi: "कॉकरोच जंता नियम" }} mode={mode} />
          <div className="oath-rule-grid mt-8">
            {rules.map((rule) => (
              <div key={rule.en} className="oath-rule-pill">
                <BilingualText value={rule} mode={mode} hiClassName="text-xs leading-5 text-white/55" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 md:p-12">
          <PageEyebrow value={{ en: "Excuse Translation Department", hi: "Excuse Translation Department" }} mode={mode} />
          <div className="oath-translation-list mt-8">
            {translations.map((row) => (
              <article key={row.official.en} className="oath-translation-card">
                <div>
                  <p className="oath-label">Official says</p>
                  <h4><BilingualText value={row.official} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></h4>
                </div>
                <div>
                  <p className="oath-label">Janta translation</p>
                  <h4><BilingualText value={row.janta} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 md:p-12">
            <PageEyebrow value={{ en: "Cockroach Janta Complaints", hi: "Cockroach Janta Complaints" }} mode={mode} />
            <div className="oath-grid mt-8">
              {complaints.map((complaint) => (
                <div key={complaint.en} className="oath-complaint-card">
                  <BilingualText value={complaint} mode={mode} hiClassName="text-xs leading-5 text-black/55" />
                </div>
              ))}
            </div>
          </div>

          <div className="apple-borderless rounded-[3.75rem] bg-black p-8 text-white md:p-12">
            <PageEyebrow value={{ en: "Most Wanted Excuses", hi: "Most Wanted Excuses" }} mode={mode} />
            <div className="oath-chip-grid mt-8">
              {wantedExcuses.map((item) => (
                <span key={item} className="oath-dark-chip">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 md:p-12">
          <PageEyebrow value={{ en: "Janta Report Card", hi: "Janta Report Card" }} mode={mode} />
          <div className="oath-chip-grid mt-8">
            {reportCard.map((item) => (
              <span key={item.en} className="oath-chip"><BilingualText value={item} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-4">
          {departments.map((dept) => (
            <article key={dept.title.en} className="oath-mini-card oath-dept-card apple-clean-card">
              <div className="oath-dept-icon">{dept.icon}</div>
              <h3><BilingualText value={dept.title} mode={mode} hiClassName="text-xs leading-4 text-black/45" /></h3>
              <p><BilingualText value={dept.body} mode={mode} hiClassName="text-xs leading-5 text-black/55" /></p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function PremiumPageLoader() {
  return (
    <div className="premium-loader" aria-hidden="true">
      <div className="premium-loader-card">
        <div className="premium-loader-mark">
          <CockroachIcon className="h-8 w-8" />
        </div>
        <h1>Cockroach India Party</h1>
        <p>We survive. We rebuild. We rise.</p>
      </div>
    </div>
  );
}

function MobileMenuOverlay({
  open,
  mode,
  activePage,
  onOpen,
  onClose,
  onNavigate,
}: {
  open: boolean;
  mode: LangMode;
  activePage: PageId;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}) {
  return (
    <>
      <button type="button" onClick={onOpen} className="mobile-menu-hint" aria-label="Open movement menu">
        Movement
      </button>

      <div className={`mobile-menu-panel ${open ? "mobile-menu-panel-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-card">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-black/35">Movement Menu</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-black">Navigate</h2>
            </div>
            <button type="button" onClick={onClose} className="premium-toggle premium-toggle-light rounded-full px-5 py-3 text-sm font-black">
              Close
            </button>
          </div>

          <div className="grid gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`mobile-menu-link ${activePage === item.id ? "mobile-menu-link-active" : ""}`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{mode === "hi" ? item.label.hi : item.label.en}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-toggle premium-toggle-dark flex w-full rounded-full px-8 py-4 text-base font-black"
            >
              Follow on Instagram
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-toggle premium-toggle-light flex w-full rounded-full px-8 py-4 text-base font-black"
            >
              Send Issue / Corruption Video
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function FinalCinematicCTA({ mode, onShare }: { mode: LangMode; onShare?: () => void }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg rounded-[3.75rem] p-8 text-center md:p-14">
        <PageEyebrow value={{ en: "Join the Movement", hi: "आंदोलन से जुड़ें" }} mode={mode} />
        <h2 className="mx-auto mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] text-black md:text-8xl">
          <BilingualText
            value={{
              en: "India does not need more excuses. India needs accountability.",
              hi: "भारत को और बहाने नहीं। भारत को जवाबदेही चाहिए।",
            }}
            mode={mode}
            hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
          />
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-toggle premium-toggle-dark inline-flex rounded-full px-9 py-5 text-base font-black"
          >
            Follow on Instagram
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-toggle premium-toggle-light inline-flex rounded-full px-9 py-5 text-base font-black"
          >
            Send Issue / Corruption Video
          </a>
          {onShare ? (
            <button
              type="button"
              onClick={onShare}
              className="premium-toggle premium-toggle-light inline-flex rounded-full px-9 py-5 text-base font-black"
            >
              Share Movement
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FAQAccordionSection({ mode }: { mode: LangMode }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const faqs: { question: I18n; answer: I18n }[] = [
    {
      question: { en: "Is Cockroach India Party officially registered?", hi: "क्या Cockroach India Party officially registered है?" },
      answer: { en: "Official registration details will be updated after legal registration is completed. Until then, this website represents a citizen-first political movement.", hi: "कानूनी पंजीकरण पूरा होने के बाद official registration details अपडेट होंगे। तब तक यह वेबसाइट citizen-first political movement को represent करती है।" },
    },
    {
      question: { en: "Why the name Cockroach?", hi: "नाम Cockroach क्यों?" },
      answer: { en: "It symbolizes survival, adaptability, discipline, and refusal to disappear — the story of ordinary Indians who survive broken systems every day.", hi: "यह survival, adaptability, discipline और मिटने से इनकार का प्रतीक है — उन आम भारतीयों की कहानी जो हर दिन टूटे सिस्टम को survive करते हैं।" },
    },
    {
      question: { en: "What does the movement stand for?", hi: "यह movement किसके लिए है?" },
      answer: { en: "Student-first governance, jobs, anti-corruption, worker rights, public accountability, clean politics, and the Indian Dream for every citizen.", hi: "Student-first governance, jobs, anti-corruption, worker rights, public accountability, clean politics और हर citizen के Indian Dream के लिए।" },
    },
    {
      question: { en: "How can students join?", hi: "Students कैसे join कर सकते हैं?" },
      answer: { en: "Students can follow the Instagram page, join as campus volunteers, report education problems, and help build student-first issue campaigns.", hi: "Students Instagram page follow करके, campus volunteer बनकर, education problems report करके और student-first issue campaigns बनाकर join कर सकते हैं।" },
    },
    {
      question: { en: "How can I report corruption or local problems?", hi: "मैं corruption या local problem कैसे report करूं?" },
      answer: { en: "Send location, date, short description, and video/photo proof on Instagram. Do not risk your safety or record illegally.", hi: "Location, date, short description और video/photo proof Instagram पर भेजें। अपनी safety risk में न डालें और illegal recording न करें।" },
    },
    {
      question: { en: "Do you support hate politics?", hi: "क्या आप hate politics support करते हैं?" },
      answer: { en: "No. The movement rejects hate politics, caste or religion targeting, fake news, paid propaganda, and violence.", hi: "नहीं। यह movement hate politics, caste/religion targeting, fake news, paid propaganda और violence को reject करता है।" },
    },
    {
      question: { en: "Can private employees join?", hi: "क्या private employees join कर सकते हैं?" },
      answer: { en: "Yes. Private employees are nation builders. The movement supports 5-day work week, paid overtime, labour law audits, and protection from toxic work culture.", hi: "हाँ। Private employees nation builders हैं। Movement 5-day work week, paid overtime, labour law audits और toxic work culture से protection support करता है।" },
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <PageEyebrow value={{ en: "FAQ", hi: "सवाल-जवाब" }} mode={mode} />
          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
            <BilingualText value={{ en: "Clear answers. No confusion.", hi: "साफ जवाब। कोई confusion नहीं।" }} mode={mode} hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/50 md:text-4xl" />
          </h2>
        </div>
        <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
          <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
            <BilingualText value={{ en: "A serious movement must explain itself clearly.", hi: "एक serious movement को खुद को साफ समझाना चाहिए।" }} mode={mode} hiClassName="text-sm leading-5 text-black/55 md:text-lg" />
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question.en} className={`faq-accordion-item ${isOpen ? "faq-accordion-open" : ""}`}>
              <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="faq-accordion-button">
                <span>
                  <BilingualText value={faq.question} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                </span>
                <span className="faq-accordion-icon">{isOpen ? "−" : "+"}</span>
              </button>
              <div className="faq-accordion-answer">
                <p>
                  <BilingualText value={faq.answer} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SlidingTextBanner({
  items,
  variant = "light",
  speed = "normal",
}: {
  items: string[];
  variant?: "light" | "dark" | "green";
  speed?: "slow" | "normal" | "fast";
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className={`auto-slide-banner auto-slide-${variant}`}>
        <div className={`auto-slide-track auto-slide-${speed}`}>
          {[...items, ...items, ...items].map((item, index) => (
            <span key={`${item}-${index}`} className="auto-slide-word">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PremiumSlidingStatement({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="premium-statement-banner apple-borderless overflow-hidden rounded-[3.75rem] bg-white/78 p-8 text-center backdrop-blur-2xl md:p-12">
        <div className="premium-statement-line premium-statement-line-one">
          <span>India does not need more excuses. India needs accountability.</span>
          <span>India does not need more excuses. India needs accountability.</span>
          <span>India does not need more excuses. India needs accountability.</span>
        </div>
        <div className="premium-statement-line premium-statement-line-two mt-4">
          <span>Students first. Workers respected. Public money visible. Power audited.</span>
          <span>Students first. Workers respected. Public money visible. Power audited.</span>
          <span>Students first. Workers respected. Public money visible. Power audited.</span>
        </div>
        {mode !== "en" ? (
          <HindiShadow
            text="भारत को और बहाने नहीं, जवाबदेही चाहिए। छात्र प्रथम। कर्मचारी सम्मानित। जनता का पैसा visible। सत्ता audited।"
            className="mx-auto mt-6 max-w-4xl text-sm leading-5 text-black/45"
          />
        ) : null}
      </div>
    </section>
  );
}

function NotMemeMovementSection({ mode }: { mode: LangMode }) {
  const lines: I18n[] = [
    { en: "Funny name.", hi: "नाम funny है।" },
    { en: "Serious mission.", hi: "Mission serious है।" },
    { en: "Sarcastic voice.", hi: "Voice sarcastic है।" },
    { en: "Clean politics.", hi: "Politics clean है।" },
    { en: "Evidence-first movement.", hi: "Movement evidence-first है।" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Not a Meme. A Movement.", hi: "Meme नहीं। Movement." }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{ en: "Humour catches attention. Accountability builds the nation.", hi: "Humour attention पकड़ता है। Accountability राष्ट्र बनाती है।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
              />
            </h2>
          </div>
          <div className="rounded-[2.75rem] bg-black p-6 text-white shadow-2xl">
            <p className="text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl md:leading-[3rem]">
              <BilingualText
                value={{
                  en: "The cockroach identity is a satire on survival. The mission is serious: public accountability, student-first politics, clean governance, and ordinary citizens becoming visible.",
                  hi: "Cockroach identity survival पर satire है। Mission serious है: public accountability, student-first politics, clean governance और ordinary citizens को visible बनाना।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-white/35 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {lines.map((line) => (
            <article key={line.en} className="reveal-card micro-lift apple-clean-card rounded-[2.5rem] bg-white/76 p-6 text-center backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-2xl font-black leading-7 tracking-[-0.045em] text-black">
                <BilingualText value={line} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection({ mode }: { mode: LangMode }) {
  const steps: { title: I18n; body: I18n }[] = [
    { title: { en: "Citizen reports issue", hi: "Citizen issue report करता है" }, body: { en: "Road, drain, paper leak, corruption, pollution, heat risk, public office problem, or local failure is reported safely.", hi: "Road, drain, paper leak, corruption, pollution, heat risk, public office problem या local failure safely report होता है।" } },
    { title: { en: "Evidence is checked", hi: "Evidence check होता है" }, body: { en: "Only factual, lawful, safe, and evidence-based reports should move forward. No rumours. No personal abuse.", hi: "सिर्फ factual, lawful, safe और evidence-based reports आगे बढ़ें। Rumours नहीं। Personal abuse नहीं।" } },
    { title: { en: "Issue becomes public", hi: "Issue public बनता है" }, body: { en: "Verified issues can be added to a public accountability dashboard or civic issue map when the system is ready.", hi: "Verified issues public accountability dashboard या civic issue map में add हो सकते हैं जब system ready होगा।" } },
    { title: { en: "Authority is tagged", hi: "Authority tag होती है" }, body: { en: "The responsible department, officer, contractor, or representative should be identified and tagged for public response.", hi: "Responsible department, officer, contractor या representative identify और public response के लिए tag किया जाए।" } },
    { title: { en: "Public pressure is created", hi: "Public pressure बनता है" }, body: { en: "Citizens amplify the issue peacefully with screenshots, documents, location, timelines, and clean language.", hi: "Citizens screenshots, documents, location, timelines और clean language से issue peacefully amplify करते हैं।" } },
    { title: { en: "Status is tracked", hi: "Status track होता है" }, body: { en: "Reported, verified, forwarded, public audit, and resolved status makes complaints visible instead of forgotten.", hi: "Reported, verified, forwarded, public audit और resolved status complaints को forgotten होने से बचाता है।" } },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless overflow-hidden rounded-[3.75rem] bg-black p-8 text-white md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "How It Works", hi: "कैसे काम करेगा" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white md:text-8xl">
              <BilingualText
                value={{ en: "From complaint to public pressure.", hi: "Complaint से public pressure तक।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
              />
            </h2>
          </div>
          <div className="rounded-[2.75rem] bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-white md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Proposed public accountability model: clean reports, verified evidence, visible status, and peaceful citizen pressure.",
                  hi: "Proposed public accountability model: clean reports, verified evidence, visible status और peaceful citizen pressure।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-white/35 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title.en} className="how-step-card reveal-card micro-lift rounded-[2.5rem] bg-white p-6 text-black shadow-[0_22px_70px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_34px_95px_rgba(182,255,0,0.16)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-[#B6FF00] text-xl font-black text-black shadow-xl">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-black leading-[1.05] tracking-[-0.045em] text-black md:text-3xl">
                <BilingualText value={step.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
              </h3>
              <p className="mt-4 text-sm font-bold leading-6 text-black/66">
                <BilingualText value={step.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegalSafetyBarSection({ mode }: { mode: LangMode }) {
  const items: I18n[] = [
    { en: "No hate", hi: "Hate नहीं" },
    { en: "No violence", hi: "Violence नहीं" },
    { en: "No fake news", hi: "Fake news नहीं" },
    { en: "No illegal recording", hi: "Illegal recording नहीं" },
    { en: "No personal targeting", hi: "Personal targeting नहीं" },
    { en: "Evidence first", hi: "Evidence first" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="legal-safety-bar apple-borderless rounded-[3.25rem] bg-black p-7 text-white md:p-9">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase leading-5 tracking-[0.2em] text-[#B6FF00]">Legal & Safety Code</p>
            <p className="mt-3 max-w-3xl text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl md:leading-[2.9rem]">
              <BilingualText
                value={{
                  en: "Clean movement. Safe reporting. Evidence-first accountability.",
                  hi: "Clean movement. Safe reporting. Evidence-first accountability।",
                }}
                mode={mode}
                hiClassName="text-sm leading-6 text-white/55 md:text-base md:leading-7"
              />
            </p>
          </div>

          <div className="legal-safety-chip-grid">
            {items.map((item) => (
              <div key={item.en} className="legal-safety-chip">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-5 text-white/55" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BerozgariEmergencySection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg rounded-[3.25rem] p-8 md:p-12">
        <div className="max-w-5xl">
          <PageEyebrow value={{ en: "Berozgari Emergency", hi: "बेरोजगारी आपातकाल" }} mode={mode} />
          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
            <BilingualText
              value={{
                en: "Berozgari is a national emergency.",
                hi: "बेरोजगारी राष्ट्रीय आपातकाल है।",
              }}
              mode={mode}
              hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
            />
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {[
            { en: "Paper leaks", hi: "पेपर लीक" },
            { en: "Delayed exams", hi: "परीक्षा में देरी" },
            { en: "Unpaid internships", hi: "बिना वेतन इंटर्नशिप" },
            { en: "Low salaries", hi: "कम सैलरी" },
            { en: "No job security", hi: "नौकरी की असुरक्षा" },
          ].map((item) => (
            <div key={item.en} className="shine-card rounded-[2.25rem] border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
              <p className="text-xl font-black leading-7 tracking-[-0.04em] text-black">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <p className="text-2xl font-black leading-9 tracking-[-0.035em] text-black md:text-4xl md:leading-[3rem]">
            <BilingualText
              value={{
                en: "This is not the failure of Indian youth. This is the failure of governance.",
                hi: "यह भारतीय युवाओं की विफलता नहीं है। यह शासन व्यवस्था की विफलता है।",
              }}
              mode={mode}
              hiClassName="text-base leading-5 text-black/55 md:text-xl"
            />
          </p>
          <p className="text-base font-bold leading-7 text-black/70">
            <BilingualText
              value={{
                en: "Our mission is simple: fair exams, skill-based education, apprenticeships, local manufacturing, startup support, private job protection, and real employment.",
                hi: "हमारा मिशन साफ है: निष्पक्ष परीक्षा, कौशल आधारित शिक्षा, अप्रेंटिसशिप, स्थानीय मैन्युफैक्चरिंग, स्टार्टअप समर्थन, निजी नौकरी सुरक्षा और वास्तविक रोजगार।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4 text-black/55"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

function VolunteerRolesSection({ mode }: { mode: LangMode }) {
  const roles: { icon: string; title: I18n; body: I18n; tag: string }[] = [
    {
      icon: "🎤",
      title: { en: "Excuse Translator", hi: "Excuse Translator" },
      body: {
        en: "Translates official lines like ‘process is ongoing’ into simple janta language: kaam abhi hua nahi.",
        hi: "‘Process चल रहा है’ को simple janta language में translate करता है: काम अभी हुआ नहीं।",
      },
      tag: "Excuse Dept",
    },
    {
      icon: "🧾",
      title: { en: "Receipt Hunter", hi: "Receipt Hunter" },
      body: {
        en: "Asks the most dangerous democratic question: paisa gaya kahan, tender kisko mila, result kya nikla?",
        hi: "सबसे dangerous democratic question पूछता है: पैसा गया कहां, tender किसको मिला, result क्या निकला?",
      },
      tag: "Audit Squad",
    },
    {
      icon: "📝",
      title: { en: "Paper Leak Detective", hi: "Paper Leak Detective" },
      body: {
        en: "Tracks exam delay, paper leak, cancelled recruitment, and the mysterious disappearance of student future.",
        hi: "Exam delay, paper leak, cancelled recruitment और student future के mysterious disappearance को track करता है।",
      },
      tag: "Student Wing",
    },
    {
      icon: "🚨",
      title: { en: "VIP Siren Blocker", hi: "VIP Siren Blocker" },
      body: {
        en: "Reminds leaders that public roads are not private red carpets and citizens are not traffic decoration.",
        hi: "Leaders को याद दिलाता है कि public roads private red carpet नहीं और citizens traffic decoration नहीं।",
      },
      tag: "No VIP",
    },
    {
      icon: "🕳️",
      title: { en: "Gaddha Reporter", hi: "Gaddha Reporter" },
      body: {
        en: "Reports roads that have become adventure sports zones before politicians arrive for ribbon-cutting photos.",
        hi: "उन roads को report करता है जो ribbon-cutting photos से पहले adventure sports zone बन चुकी हैं।",
      },
      tag: "Road Watch",
    },
    {
      icon: "🦟",
      title: { en: "Nali Drama Spotter", hi: "Nali Drama Spotter" },
      body: {
        en: "Finds blocked drains, garbage mountains, mosquito kingdoms, and development that exists only in posters.",
        hi: "Blocked drains, garbage mountains, mosquito kingdoms और सिर्फ posters में मौजूद development को पकड़ता है।",
      },
      tag: "Local Issue",
    },
    {
      icon: "📸",
      title: { en: "Screenshot Sainik", hi: "Screenshot Sainik" },
      body: {
        en: "Saves promises, deadlines, claims, speeches, and deletes-proof-before-election moments with discipline.",
        hi: "Promises, deadlines, claims, speeches और election से पहले delete होने वाले proof को discipline से save करता है।",
      },
      tag: "Proof Team",
    },
    {
      icon: "🪳",
      title: { en: "Booth Cockroach", hi: "Booth Cockroach" },
      body: {
        en: "Keeps the movement alive in mohalla, campus, office, market, and ward without hate, violence, or fake news.",
        hi: "Mohalla, campus, office, market और ward में movement alive रखता है — बिना hate, violence या fake news।",
      },
      tag: "Ground Unit",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="classic-section-card apple-borderless rounded-[3.25rem] bg-black p-8 text-white md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="classic-side-card flex flex-col justify-between rounded-[3rem] bg-white/8 p-7 backdrop-blur-xl md:p-9">
            <div>
              <PageEyebrow value={{ en: "Sarcastic Volunteer Roles", hi: "Sarcastic Volunteer Roles" }} mode={mode} />
              <h2 className="mt-5 text-5xl font-black leading-[0.86] tracking-[-0.075em] text-white md:text-8xl">
                <BilingualText
                  value={{ en: "Not jobs. Janta roles for system repair.", hi: "Jobs नहीं। System repair के लिए janta roles।" }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
                />
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[2.5rem] bg-[#B6FF00] p-6 text-black shadow-[0_24px_80px_rgba(182,255,0,0.18)]">
                <p className="text-[7rem] font-black leading-none tracking-[-0.1em] md:text-[9rem]">08</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.22em] text-black/55">Janta roles</p>
              </div>
              <div className="rounded-[2.5rem] bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl md:leading-[3rem]">
                  <BilingualText
                    value={{
                      en: "Pick a role. Bring proof. Ask questions. Make excuses uncomfortable.",
                      hi: "Role चुनो। Proof लाओ। सवाल पूछो। Excuses को uncomfortable बनाओ।",
                    }}
                    mode={mode}
                    hiClassName="text-sm leading-5 text-white/35 md:text-lg"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role, index) => (
              <article
                key={role.title.en}
                className="reveal-card micro-lift group rounded-[2.75rem] bg-white p-5 text-black shadow-[0_22px_70px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_34px_95px_rgba(182,255,0,0.16)] md:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.65rem] bg-black text-3xl text-white shadow-2xl transition duration-500 group-hover:bg-[#B6FF00] group-hover:text-black">
                    {role.icon}
                  </div>
                  <span className="rounded-full bg-black/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black/45">
                    {role.tag}
                  </span>
                </div>
                <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-black/35">Role {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.055em] text-black md:text-3xl">
                  <BilingualText value={role.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                </h3>
                <p className="mt-4 text-sm font-bold leading-6 text-black/66 md:text-base md:leading-7">
                  <BilingualText value={role.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[2.75rem] bg-white/10 p-6 backdrop-blur-xl md:flex-row">
          <p className="text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl">
            <BilingualText
              value={{ en: "No hate. No violence. Only receipts, screenshots, and public pressure.", hi: "Hate नहीं। Violence नहीं। सिर्फ receipts, screenshots और public pressure।" }}
              mode={mode}
              hiClassName="text-sm leading-5 text-white/35 md:text-lg"
            />
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-toggle premium-toggle-light inline-flex rounded-full px-8 py-4 text-base font-black"
          >
            Choose Your Janta Role
          </a>
        </div>
      </div>
    </section>
  );
}

function ReportFormatSection({ mode }: { mode: LangMode }) {
  const reportItems: { icon: string; title: I18n; body: I18n }[] = [
    { icon: "📍", title: { en: "Location", hi: "स्थान" }, body: { en: "City, district, road, college, office, hospital, or exact place if safe to share.", hi: "City, district, road, college, office, hospital या exact place अगर share करना safe हो।" } },
    { icon: "📅", title: { en: "Date", hi: "तारीख" }, body: { en: "Mention when it happened or when the video/photo was captured.", hi: "कब हुआ या video/photo कब capture हुआ, यह लिखें।" } },
    { icon: "📝", title: { en: "Short Description", hi: "छोटी जानकारी" }, body: { en: "Write the issue in 2–3 lines. Keep it factual, clean, and direct.", hi: "Issue को 2–3 lines में लिखें। Factual, clean और direct रखें।" } },
    { icon: "🎥", title: { en: "Video or Photo Proof", hi: "वीडियो या फोटो प्रमाण" }, body: { en: "Send clear proof only if it is lawful and safe to capture.", hi: "Clear proof भेजें, लेकिन तभी जब capture करना legal और safe हो।" } },
    { icon: "🏢", title: { en: "Department / Person", hi: "विभाग / व्यक्ति" }, body: { en: "Mention the department, office, contractor, or person involved if you know.", hi: "अगर पता हो तो department, office, contractor या involved person लिखें।" } },
    { icon: "🔒", title: { en: "Contact Optional", hi: "Contact Optional" }, body: { en: "Your contact is optional. Do not share private details publicly.", hi: "आपका contact optional है। Private details publicly share न करें।" } },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[3rem] bg-white/70 p-7 backdrop-blur-xl md:p-9">
            <div>
              <PageEyebrow value={{ en: "Report Format", hi: "Report Format" }} mode={mode} />
              <h2 className="mt-5 text-5xl font-black leading-[0.86] tracking-[-0.075em] text-black md:text-8xl">
                <BilingualText
                  value={{ en: "Send proof, not rumours.", hi: "अफवाह नहीं, प्रमाण भेजें।" }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
                />
              </h2>
            </div>

            <div className="mt-10 rounded-[2.5rem] bg-black p-6 text-white shadow-2xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#B6FF00]">Safety rule</p>
              <p className="mt-4 text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl md:leading-[3rem]">
                <BilingualText
                  value={{
                    en: "Do not risk your safety. Do not record illegally. Send only truthful and lawful information.",
                    hi: "अपनी safety risk में न डालें। Illegal recording न करें। केवल truthful और lawful information भेजें।",
                  }}
                  mode={mode}
                  hiClassName="text-sm leading-5 text-white/35 md:text-lg"
                />
              </p>
            </div>
          </div>

          <div className="relative rounded-[3rem] bg-black p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)] md:p-7">
            <div className="absolute bottom-10 left-12 top-10 hidden w-px bg-gradient-to-b from-[#B6FF00] via-white/20 to-transparent md:block" aria-hidden="true" />
            <div className="grid gap-4">
              {reportItems.map((item, index) => (
                <article
                  key={item.title.en}
                  className="reveal-card micro-lift group grid gap-4 rounded-[2.4rem] bg-white p-5 text-black shadow-[0_18px_55px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(182,255,0,0.18)] md:grid-cols-[4.5rem_1fr] md:items-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[1.55rem] bg-[#B6FF00] text-3xl text-black shadow-xl transition duration-500 group-hover:scale-105 group-hover:bg-black group-hover:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#B6FF00]">
                        Step {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-black/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black/45">
                        Evidence Protocol
                      </span>
                    </div>
                    <h3 className="text-2xl font-black leading-[1.02] tracking-[-0.055em] text-black md:text-3xl">
                      <BilingualText value={item.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-black/66">
                      <BilingualText value={item.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2.75rem] bg-white/72 p-6 text-center backdrop-blur-xl">
          <p className="text-2xl font-black leading-8 tracking-[-0.04em] text-black md:text-4xl md:leading-[3rem]">
            <BilingualText
              value={{
                en: "Clean reports create public pressure. Fake reports damage the movement.",
                hi: "Clean reports public pressure बनाती हैं। Fake reports movement को नुकसान पहुंचाती हैं।",
              }}
              mode={mode}
              hiClassName="text-sm leading-5 text-black/55 md:text-lg"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

function CitizenReportCategoriesSection({ mode }: { mode: LangMode }) {
  const categories: { icon: string; title: I18n }[] = [
    { icon: "🛡️", title: { en: "Corruption", hi: "भ्रष्टाचार" } },
    { icon: "📝", title: { en: "Paper Leak", hi: "पेपर लीक" } },
    { icon: "⏱️", title: { en: "Unpaid Overtime", hi: "बिना भुगतान ओवरटाइम" } },
    { icon: "🛣️", title: { en: "Bad Road", hi: "खराब सड़क" } },
    { icon: "🗑️", title: { en: "Garbage", hi: "कचरा" } },
    { icon: "💧", title: { en: "Water Problem", hi: "पानी की समस्या" } },
    { icon: "🌫️", title: { en: "Pollution", hi: "प्रदूषण" } },
    { icon: "🌳", title: { en: "Tree Cutting", hi: "पेड़ कटाई" } },
    { icon: "🏢", title: { en: "Office Harassment", hi: "ऑफिस उत्पीड़न" } },
    { icon: "🏥", title: { en: "Hospital Problem", hi: "अस्पताल समस्या" } },
    { icon: "🎓", title: { en: "School / College Issue", hi: "स्कूल / कॉलेज समस्या" } },
    { icon: "🔥", title: { en: "Heat Risk", hi: "गर्मी जोखिम" } },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Citizen Report Categories", hi: "नागरिक रिपोर्ट श्रेणियां" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black leading-[0.88] tracking-[-0.075em] text-black md:text-8xl">
              <BilingualText
                value={{ en: "If it hurts citizens, it can be reported.", hi: "अगर यह नागरिकों को नुकसान पहुंचाता है, तो इसे report किया जा सकता है।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/72 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "Reports should be factual, lawful, safe, and evidence-based. No fake claims. No personal abuse. No hate.",
                  hi: "Reports factual, lawful, safe और evidence-based होनी चाहिए। Fake claims नहीं। Personal abuse नहीं। Hate नहीं।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article key={category.title.en} className="category-report-card reveal-card micro-lift apple-clean-card rounded-[2.5rem] bg-white/76 p-5 text-center backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="category-report-icon mx-auto flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-black text-2xl text-white shadow-xl">
                {category.icon}
              </div>
              <p className="category-report-meta mt-4 font-black uppercase text-black/35">Report {String(index + 1).padStart(2, "0")}</p>
              <p className="category-report-title mt-2 font-black text-black">
                <BilingualText value={category.title} mode={mode} hiClassName="text-xs leading-4 tracking-normal text-black/55" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicIssueMapSection({ mode }: { mode: LangMode }) {
  const issues: { icon: string; title: I18n }[] = [
    { icon: "🛣️", title: { en: "Road broken", hi: "सड़क टूटी" } },
    { icon: "🚧", title: { en: "Drain blocked", hi: "नाली बंद" } },
    { icon: "📝", title: { en: "Paper leaked", hi: "पेपर लीक" } },
    { icon: "🏥", title: { en: "Hospital failed", hi: "अस्पताल विफल" } },
    { icon: "🧾", title: { en: "Corruption reported", hi: "भ्रष्टाचार रिपोर्ट" } },
    { icon: "🌳", title: { en: "Tree plantation failed", hi: "पेड़ survival failed" } },
  ];

  const statuses: { value: I18n; label: I18n }[] = [
    { value: { en: "Reported", hi: "Reported" }, label: { en: "Citizen sends issue", hi: "Citizen issue भेजता है" } },
    { value: { en: "Verified", hi: "Verified" }, label: { en: "Evidence checked", hi: "Evidence check" } },
    { value: { en: "Forwarded", hi: "Forwarded" }, label: { en: "Sent to authority", hi: "Authority को भेजा" } },
    { value: { en: "Public Audit", hi: "Public Audit" }, label: { en: "Tracked publicly", hi: "Publicly track" } },
    { value: { en: "Resolved", hi: "Resolved" }, label: { en: "Closure proof", hi: "Closure proof" } },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless overflow-hidden rounded-[3.75rem] bg-black p-8 text-white md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[3rem] bg-white/8 p-7 backdrop-blur-xl md:p-9">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="text-base font-black uppercase tracking-[0.22em] text-[#B6FF00]">
                  <BilingualText value={{ en: "India Public Issue Map", hi: "भारत Public Issue Map" }} mode={mode} hiClassName="text-xs leading-4 tracking-normal text-white/70" />
                </p>
                <span className="rounded-full bg-[#B6FF00] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">Coming Soon</span>
                <span className="rounded-full bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/82">Public Beta</span>
              </div>
              <h2 className="mt-5 text-5xl font-black leading-[0.86] tracking-[-0.075em] text-white md:text-8xl">
                <BilingualText
                  value={{ en: "Every local problem should become visible.", hi: "हर local problem visible होनी चाहिए।" }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
                />
              </h2>
            </div>
            <div className="mt-10 rounded-[2.5rem] bg-[#B6FF00] p-6 text-black shadow-[0_24px_80px_rgba(182,255,0,0.18)]">
              <p className="text-[5rem] font-black leading-none tracking-[-0.1em] md:text-[8rem]">MAP</p>
              <p className="mt-4 text-2xl font-black leading-8 tracking-[-0.04em] text-black md:text-3xl">
                <BilingualText
                  value={{ en: "A proposed civic dashboard for public pressure, not a complaint black hole.", hi: "Public pressure के लिए proposed civic dashboard, complaint black hole नहीं।" }}
                  mode={mode}
                  hiClassName="text-sm leading-5 text-black/55"
                />
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              {issues.map((issue) => (
                <div key={issue.title.en} className="public-map-issue-card rounded-[2rem] bg-white/12 p-5 text-xl font-black tracking-[-0.04em] text-white backdrop-blur-xl">
                  <span className="public-map-issue-icon" aria-hidden="true">{issue.icon}</span>
                  <span className="public-map-issue-title">
                    <BilingualText value={issue.title} mode={mode} hiClassName="text-xs leading-5 text-white/72" />
                  </span>
                </div>
              ))}
            </div>

            <div className="status-system-panel rounded-[2.75rem] bg-white p-5 text-black shadow-[0_22px_70px_rgba(0,0,0,0.18)] md:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-black/35">Report Status System</p>
                  <p className="mt-2 text-xl font-black leading-6 tracking-[-0.035em] text-black md:text-2xl">
                    From report to closure proof.
                  </p>
                </div>
                <span className="rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#B6FF00]">5 Steps</span>
              </div>

              <div className="status-system-flow">
                {statuses.map((status, index) => (
                  <div key={status.value.en} className="status-step-card rounded-[1.65rem] bg-black p-4 text-white">
                    <div className="status-step-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="status-step-copy">
                      <p className="status-step-title font-black tracking-[-0.025em] text-white">
                        <BilingualText value={status.value} mode={mode} hiClassName="text-xs leading-5 text-white/55" />
                      </p>
                      <p className="status-step-label mt-1 font-bold text-white/70">
                        <BilingualText value={status.label} mode={mode} hiClassName="text-xs leading-5 text-white/55" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CandidateStandardSection({ mode }: { mode: LangMode }) {
  const standards: { icon: string; title: I18n; body: I18n }[] = [
    { icon: "🧾", title: { en: "Public Asset Disclosure", hi: "Public asset disclosure" }, body: { en: "Candidates must publish assets, liabilities, income sources, and conflict-of-interest details.", hi: "Candidates assets, liabilities, income sources और conflict-of-interest details publish करें।" } },
    { icon: "⚖️", title: { en: "Clean Background Screening", hi: "Clean background screening" }, body: { en: "No serious criminal background and no hate politics history.", hi: "Serious criminal background और hate politics history नहीं।" } },
    { icon: "📍", title: { en: "Local Problem Knowledge", hi: "Local problem knowledge" }, body: { en: "Every candidate must know ward, district, student, worker, farmer, and local business problems.", hi: "हर candidate ward, district, student, worker, farmer और local business problems जाने।" } },
    { icon: "📊", title: { en: "Performance Report", hi: "Performance report" }, body: { en: "Elected representatives must publish yearly performance and public money usage reports.", hi: "Elected representatives yearly performance और public money usage reports publish करें।" } },
    { icon: "🎤", title: { en: "Public Debate Mandatory", hi: "Public debate mandatory" }, body: { en: "Candidates must face public questions before asking for public votes.", hi: "Public votes मांगने से पहले candidates public questions face करें।" } },
    { icon: "🚫", title: { en: "No Dynasty Shortcut", hi: "No dynasty shortcut" }, body: { en: "Ticket should be based on competence, public trust, and service record, not family power.", hi: "Ticket competence, public trust और service record पर हो, family power पर नहीं।" } },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Candidate Standard", hi: "उम्मीदवार मानक" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black leading-[0.88] tracking-[-0.075em] text-black md:text-8xl">
              <BilingualText
                value={{ en: "Public power needs public standards.", hi: "Public power को public standards चाहिए।" }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
              />
            </h2>
          </div>
          <div className="rounded-[2.75rem] bg-black p-6 text-white shadow-2xl">
            <p className="text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl md:leading-[3rem]">
              <BilingualText
                value={{ en: "A ticket should not be inherited. It should be earned through service, honesty, competence, and local accountability.", hi: "Ticket विरासत में नहीं मिलना चाहिए। Ticket service, honesty, competence और local accountability से earn होना चाहिए।" }}
                mode={mode}
                hiClassName="text-sm leading-5 text-white/35 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {standards.map((standard, index) => (
            <article key={standard.title.en} className="reveal-card micro-lift apple-clean-card rounded-[2.75rem] bg-white/76 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.55rem] bg-black text-3xl text-white shadow-2xl">
                  {standard.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-black/35">Standard {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-0.055em] text-black md:text-3xl">
                    <BilingualText value={standard.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                </div>
              </div>
              <p className="mt-5 text-sm font-bold leading-6 text-black/66">
                <BilingualText value={standard.body} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicAccountabilitySection({ mode }: { mode: LangMode }) {
  const auditIcons = ["⛽", "📝", "💼", "🧑‍💻", "🎓"];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="public-audits-section apple-borderless overflow-hidden rounded-[3.75rem] bg-black p-8 text-white md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="public-audits-left flex flex-col justify-between rounded-[3rem] bg-white/12 p-7 backdrop-blur-xl md:p-9">
            <div>
              <p className="public-audit-eyebrow text-base font-black uppercase tracking-[0.22em] text-[#B6FF00]">
                <BilingualText
                  value={{ en: "Top 5 Public Accountability Audits", hi: "शीर्ष 5 सार्वजनिक जवाबदेही जांच" }}
                  mode={mode}
                  hiClassName="text-xs leading-4 tracking-normal text-white/78"
                />
              </p>
              <h2 className="mt-5 text-5xl font-black leading-[0.86] tracking-[-0.075em] text-white md:text-8xl">
                <BilingualText
                  value={{
                    en: "Power must answer when people suffer.",
                    hi: "जनता कष्ट झेले तो सत्ता जवाब दे।",
                  }}
                  mode={mode}
                  hiClassName="mt-4 text-2xl leading-7 tracking-normal text-white/35 md:text-4xl"
                />
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[2.5rem] bg-[#B6FF00] p-6 text-black shadow-[0_24px_80px_rgba(182,255,0,0.18)]">
                <p className="text-[7rem] font-black leading-none tracking-[-0.1em] md:text-[9rem]">05</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.22em] text-black/55">Citizen audits</p>
              </div>
              <div className="rounded-[2.5rem] bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-2xl font-black leading-8 tracking-[-0.04em] text-white md:text-4xl md:leading-[3rem]">
                  <BilingualText
                    value={{
                      en: "Not slogans. Not excuses. Public data, documents, hearings, and due process.",
                      hi: "नारे नहीं। बहाने नहीं। सार्वजनिक डेटा, दस्तावेज, सुनवाई और कानूनी प्रक्रिया।",
                    }}
                    mode={mode}
                    hiClassName="text-sm leading-5 text-white/35 md:text-lg"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {publicAccountabilityIssues.map((issue, index) => (
              <article
                key={issue.title.en}
                className="reveal-card micro-lift group grid gap-5 rounded-[2.75rem] bg-white p-5 text-black shadow-[0_22px_70px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_34px_95px_rgba(182,255,0,0.16)] md:grid-cols-[5.5rem_1fr] md:items-center md:p-6"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-black text-3xl text-white shadow-2xl transition duration-500 group-hover:scale-105 group-hover:bg-[#B6FF00] group-hover:text-black">
                  {auditIcons[index] ?? "🔎"}
                </div>
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#B6FF00]">
                      Audit {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-black/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black/45">
                      Public Review
                    </span>
                  </div>
                  <h3 className="text-2xl font-black leading-[1.02] tracking-[-0.055em] text-black md:text-4xl">
                    <BilingualText value={issue.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
                  </h3>
                  <p className="mt-4 text-sm font-bold leading-6 text-black/66 md:text-base md:leading-7">
                    <BilingualText value={issue.explanation} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PoliticianLifestyleSection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Rich Life of Politicians Audit", hi: "नेताओं की अमीर जीवनशैली जांच" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "If politics becomes luxury, democracy becomes weak.",
                  hi: "अगर राजनीति विलासिता बने, तो लोकतंत्र कमजोर होता है।",
                }}
                mode={mode}
                hiClassName="mt-4 text-2xl leading-7 tracking-normal text-black/55 md:text-4xl"
              />
            </h2>
          </div>
          <div className="apple-clean-card rounded-[2.75rem] bg-white/70 p-6 backdrop-blur-xl">
            <p className="text-xl font-black leading-8 tracking-[-0.035em] text-black md:text-3xl md:leading-10">
              <BilingualText
                value={{
                  en: "A leader's lifestyle must match legal income, not public suspicion.",
                  hi: "नेता की जीवनशैली कानूनी आय से मेल खानी चाहिए, जनता के शक से नहीं।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {politicianLifestylePromises.map((item, index) => (
            <div key={item.en} className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.75rem] bg-white/75 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-black text-xl font-black text-white shadow-xl">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-sm font-bold leading-6 text-black/72">
                <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </div>
          ))}
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
            className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
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

export default function CockroachIndiaParty() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [mode, setMode] = useState<LangMode>("en");
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem("cip-loader-seen") !== "true";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Cockroach India Party | Student First, Anti-Corruption & India 2047 Movement";

    const description =
      "Cockroach India Party is a citizen-first political movement focused on students, jobs, anti-corruption, worker rights, public accountability, and the Indian Dream by 2047.";

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = document.title;

    let ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = description;
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const currentScroll = window.scrollY || 0;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        setScrollY(currentScroll);
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100)));
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".micro-lift"));

    const handleMove = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty("--tilt-x", `${-y * 5.5}deg`);
      target.style.setProperty("--tilt-y", `${x * 5.5}deg`);
      target.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
    };

    const resetTilt = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", resetTilt);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", resetTilt);
      });
    };
  }, [activePage]);

  useEffect(() => {
    if (!showLoader) return;
    window.sessionStorage.setItem("cip-loader-seen", "true");
    const timer = window.setTimeout(() => setShowLoader(false), 950);
    return () => window.clearTimeout(timer);
  }, [showLoader]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToPage = (page: PageId) => {
    setActivePage(page);
    setTimeout(scrollToTop, 50);
  };

  const scrollToJoin = () => {
    setActivePage("contact");
    setTimeout(() => {
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const shareMovement = async () => {
    type BrowserNavigatorWithShare = Navigator & {
      share?: (data: { title: string; text: string; url: string }) => Promise<void>;
      clipboard?: {
        writeText?: (text: string) => Promise<void>;
      };
    };

    const shareData = {
      title: "Cockroach India Party",
      text: "Student First. Public Accountability. India 2047 Movement.",
      url: INSTAGRAM_URL,
    };

    const browserNavigator: BrowserNavigatorWithShare | null =
      typeof window !== "undefined" ? (window.navigator as BrowserNavigatorWithShare) : null;

    try {
      if (browserNavigator?.share) {
        await browserNavigator.share(shareData);
        return;
      }

      if (browserNavigator?.clipboard?.writeText) {
        await browserNavigator.clipboard.writeText(INSTAGRAM_URL);
        window.alert("Movement link copied.");
      }
    } catch {
      // User cancelled sharing or browser blocked it.
    }
  };

    return (
    <main
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] tracking-[-0.018em]"
      style={{
        fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, "Noto Sans Devanagari", sans-serif',
        "--scroll-y": `${scrollY}px`,
      } as React.CSSProperties}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        html, body {
          margin: 0;
          padding: 0;
          font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, "Noto Sans Devanagari", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          background: #f5f5f7;
        }
        @keyframes premiumSectionReveal {
          from { opacity: 0; transform: translateY(46px) scale(0.965); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes pageTransitionIn {
          from { opacity: 0; transform: translateY(24px) scale(0.985); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes wordRevealUp {
          from { opacity: 0; transform: translateY(38px) rotateX(18deg); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
        }
        @keyframes counterGlow {
          0%, 100% { text-shadow: 0 0 0 rgba(182,255,0,0); }
          50% { text-shadow: 0 0 28px rgba(182,255,0,0.42); }
        }
        .page-transition {
          animation: pageTransitionIn 0.52s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .word-reveal {
          display: inline-block;
          perspective: 900px;
        }
        .word-reveal-word {
          display: inline-block;
          opacity: 0;
          transform-origin: bottom center;
          animation: wordRevealUp 0.78s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
        .hero-accountability-underline {
          position: relative;
          display: inline;
          isolation: isolate;
        }
        .hero-accountability-underline::after {
          content: "";
          position: absolute;
          left: 2%;
          right: 2%;
          bottom: 0.05em;
          z-index: -1;
          height: 0.12em;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(7,17,7,0.06), rgba(7,17,7,0.25), rgba(182,255,0,0.68), rgba(7,17,7,0.10));
          background-size: 220% 100%;
          transform-origin: left center;
          animation: underlineSweep 4.8s ease-in-out infinite;
        }
        .animated-counter {
          animation: counterPop 520ms cubic-bezier(0.16, 1, 0.3, 1) both, counterGlow 2.6s ease-in-out infinite;
        }
        .counter-number {
          display: block;
          font-size: clamp(3rem, 7vw, 6.5rem);
          line-height: 0.85;
          font-weight: 1000;
          letter-spacing: -0.08em;
          color: #071107;
          animation: counterGlow 2.6s ease-in-out infinite;
        }
        @keyframes cockroachRunAcross {
          from { left: -12vw; }
          to { left: 112vw; }
        }
        @keyframes runnerLegMoveA {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes runnerLegMoveB {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(-18deg); }
        }
        @keyframes runnerFeelersMove {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(9deg); }
        }
        .running-cockroach-layer {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          mix-blend-mode: multiply;
        }
        .running-cockroach {
          position: absolute;
          left: -12vw;
          width: 76px;
          height: 46px;
          color: #071107;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.20)) drop-shadow(0 0 12px rgba(182,255,0,0.30));
          animation-name: cockroachRunAcross;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: left;
        }
        .running-cockroach svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .runner-antenna {
          stroke: currentColor;
          stroke-width: 3;
          stroke-linecap: round;
          transform-box: fill-box;
          transform-origin: 20px 10px;
          animation: runnerFeelersMove 0.55s ease-in-out infinite;
        }
        .runner-leg {
          stroke: currentColor;
          stroke-width: 4;
          stroke-linecap: round;
          transform-box: fill-box;
          transform-origin: center;
        }
        .runner-leg-a { animation: runnerLegMoveA 0.24s ease-in-out infinite; }
        .runner-leg-b { animation: runnerLegMoveB 0.24s ease-in-out infinite; }
        @media (max-width: 768px) {
          .running-cockroach { width: 48px; height: 30px; opacity: 0.04 !important; }
        }
        @supports (animation-timeline: view()) {
          section {
            animation: premiumSectionReveal linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 24%;
          }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes softScale {
          from { opacity: 0; transform: scale(0.985); }
          to { opacity: 1; transform: scale(1); }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.08);
        }
        .clay-card {
          background: #ffffff;
          box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.08), 0 18px 50px rgba(0, 0, 0, 0.08);
        }
        .soft-gradient-glow {
          box-shadow: 0 0 0 1px rgba(88, 255, 120, 0.24), 0 24px 80px rgba(182, 255, 0, 0.28), 0 16px 60px rgba(0, 210, 120, 0.18);
        }
        .apple-gradient-bg {
          background:
            radial-gradient(circle at 18% 16%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.62) 20%, transparent 42%),
            radial-gradient(circle at 82% 20%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.34) 22%, transparent 44%),
            linear-gradient(135deg, #f7fff4 0%, #d8ff8a 34%, #b6ff00 58%, #eaffc7 78%, #ffffff 100%);
          background-size: 170% 170%;
          color: #1d1d1f;
        }
        .apple-gradient-soft {
          background:
            radial-gradient(circle at 20% 10%, rgba(255,255,255,0.88), transparent 30%),
            linear-gradient(135deg, rgba(233,255,232,0.92), rgba(182,255,0,0.28), rgba(124,255,107,0.24), rgba(216,255,122,0.28), rgba(246,255,232,0.88));
        }
        .apple-gradient-text {
          background: linear-gradient(135deg, #0B8F36 0%, #35D94A 32%, #B6FF00 66%, #64E986 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .apple-rounded {
          border-radius: 28px;
        }
        .apple-borderless {
          border-color: transparent !important;
          box-shadow: 0 36px 110px rgba(0,0,0,0.08);
        }
        .apple-clean-card {
          border-color: transparent !important;
          background: rgba(255,255,255,0.74);
          box-shadow: 0 22px 70px rgba(0,0,0,0.06);
        }
        .apple-clean-pill {
          border-color: transparent !important;
          background: rgba(255,255,255,0.76);
          box-shadow: 0 12px 34px rgba(0,0,0,0.055);
        }
        .shine-card { position: relative; overflow: hidden; }
        .shine-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.55) 45%, transparent 65%);
          transform: translateX(-120%);
          transition: transform 700ms ease;
          pointer-events: none;
        }
        .shine-card:hover::before { transform: translateX(120%); }
        @keyframes iconWiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-4deg) scale(1.05); }
          75% { transform: rotate(4deg) scale(1.05); }
        }
        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(88, 255, 120, 0.0); }
          50% { box-shadow: 0 0 0 8px rgba(88, 255, 120, 0.16); }
        }
        .micro-lift {
          transform-style: preserve-3d;
          transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(0) scale(1);
          transition: transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease, background-color 260ms ease;
          will-change: transform;
        }
        .micro-lift:hover {
          transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(-8px) scale(1.012);
          border-color: rgba(0, 0, 0, 0.18);
        }
        .micro-lift:active { transform: perspective(900px) rotateX(0deg) rotateY(0deg) translateY(-2px) scale(0.995); }
        @keyframes smoothTogglePress {
          0% { transform: translateY(0) scale(1); }
          45% { transform: translateY(1px) scale(0.96); }
          100% { transform: translateY(-2px) scale(1.01); }
        }
        @keyframes smoothToggleGlow {
          0% { box-shadow: 0 0 0 0 rgba(182,255,0,0.34); }
          100% { box-shadow: 0 0 0 10px rgba(182,255,0,0); }
        }
        @keyframes buttonRipple {
          from { transform: translate(-50%, -50%) scale(0); opacity: 0.24; }
          to { transform: translate(-50%, -50%) scale(9); opacity: 0; }
        }
        @keyframes underlineSweep {
          0% { background-position: 0% 50%; transform: scaleX(0.58); opacity: 0.55; }
          50% { background-position: 100% 50%; transform: scaleX(1); opacity: 0.95; }
          100% { background-position: 200% 50%; transform: scaleX(0.82); opacity: 0.65; }
        }
        @keyframes counterPop {
          from { transform: translateY(10px) scale(0.96); opacity: 0; filter: blur(6px); }
          to { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
        }
        .magnetic-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border: 1px solid rgba(0,0,0,0.10);
          transform: translateY(0) scale(1);
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease, background-color 240ms ease, color 240ms ease, border-color 240ms ease;
        }
        .magnetic-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.36) 48%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 620ms ease;
          pointer-events: none;
        }
        .magnetic-btn:hover {
          transform: translateY(-3px) scale(1.025);
          box-shadow: 0 20px 55px rgba(0,0,0,0.12) !important;
        }
        .magnetic-btn:hover::after { transform: translateX(120%); }
        .magnetic-btn:active {
          animation: smoothTogglePress 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
          box-shadow: 0 10px 26px rgba(0,0,0,0.12) !important;
        }
        .sticker-chip {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.10) !important;
          box-shadow: 0 10px 28px rgba(0,0,0,0.055) !important;
          transform: translateY(0) scale(1);
          transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease, background-color 220ms ease, color 220ms ease, border-color 220ms ease;
        }
        .sticker-chip:hover {
          transform: translateY(-2px) scale(1.015);
          box-shadow: 0 18px 42px rgba(0,0,0,0.09) !important;
        }
        .sticker-chip:active {
          animation: smoothTogglePress 260ms cubic-bezier(0.16, 1, 0.3, 1) both, smoothToggleGlow 520ms ease-out both;
        }
        .premium-toggle {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          min-height: 44px;
          border: 1px solid rgba(7,17,7,0.10) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.52), 0 18px 48px rgba(0,0,0,0.10) !important;
          transform: translateY(0) scale(1);
          white-space: nowrap;
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease, background 240ms ease, color 240ms ease, border-color 240ms ease;
        }
        .premium-toggle::before {
          content: "";
          height: 0.78rem;
          width: 0.78rem;
          flex: 0 0 auto;
          border-radius: 9999px;
          background: #B6FF00;
          box-shadow: 0 0 0 5px rgba(182,255,0,0.16), 0 0 22px rgba(182,255,0,0.74);
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), background 260ms ease, box-shadow 260ms ease;
        }
        .premium-toggle::after {
          content: "";
          position: absolute;
          inset: 2px;
          z-index: -1;
          border-radius: inherit;
          background: radial-gradient(circle at 30% 15%, rgba(255,255,255,0.56), transparent 36%), linear-gradient(120deg, transparent 22%, rgba(255,255,255,0.24) 48%, transparent 70%);
          transform: translateX(-115%);
          transition: transform 680ms ease;
          pointer-events: none;
        }
        .premium-toggle:hover {
          transform: translateY(-3px) scale(1.025);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.58), 0 24px 62px rgba(0,0,0,0.14) !important;
        }
        .premium-toggle:hover::before {
          transform: translateX(4px) scale(1.16);
        }
        .premium-toggle:hover::after { transform: translateX(115%); }
        .premium-toggle:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 28px rgba(0,0,0,0.12) !important;
        }
        .premium-toggle:active::after,
        .magnetic-btn:active::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          inset: auto;
          z-index: -1;
          height: 28px;
          width: 28px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.72);
          animation: buttonRipple 520ms ease-out;
        }
        .premium-toggle-dark {
          background: #071107 !important;
          color: #ffffff !important;
        }
        .premium-toggle-dark:hover,
        .premium-toggle-dark:focus-visible {
          background: linear-gradient(135deg, #E9FFE8 0%, #B6FF00 45%, #64E986 100%) !important;
          color: #071107 !important;
        }
        .premium-toggle-dark:hover::before,
        .premium-toggle-dark:focus-visible::before {
          background: #071107;
          box-shadow: 0 0 0 5px rgba(7,17,7,0.12), 0 0 20px rgba(7,17,7,0.34);
        }
        .premium-toggle-light {
          background: rgba(255,255,255,0.86) !important;
          color: #071107 !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .premium-toggle-light:hover,
        .premium-toggle-light:focus-visible {
          background: linear-gradient(135deg, #ffffff 0%, #E9FFE8 48%, #B6FF00 100%) !important;
          color: #071107 !important;
        }
        .top-nav-segment {
          border-radius: 9999px;
          background: transparent;
          padding: 0;
          box-shadow: none;
        }
        .nav-link {
          position: relative;
          border-radius: 9999px;
          padding: 0.52rem 0.72rem 0.72rem;
          background: transparent;
          color: rgba(29,29,31,0.58);
          font-weight: 900;
          letter-spacing: -0.02em;
          transition: color 220ms ease, transform 220ms ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0.72rem;
          right: 0.72rem;
          bottom: 0.26rem;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #0B8F36, #B6FF00, #64E986);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 240ms ease, opacity 220ms ease;
          opacity: 0;
        }
        .nav-link:hover {
          color: #071107;
          transform: translateY(-1px);
        }
        .nav-link:hover::after,
        .nav-link-active::after {
          transform: scaleX(1);
          opacity: 1;
        }
        .nav-link:active {
          animation: smoothTogglePress 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .icon-bump { transition: transform 260ms ease, box-shadow 260ms ease; }
        .icon-bump:hover { animation: iconWiggle 520ms ease; box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
        .manifesto-bullet { animation: softPulse 2.6s ease-in-out infinite; }
        .hero-emblem-card {
          isolation: isolate;
        }
        .hero-emblem-card::after {
          content: "";
          position: absolute;
          inset: 16px;
          z-index: -1;
          border-radius: 3rem;
          background: radial-gradient(circle, rgba(182,255,0,0.24), transparent 62%);
          filter: blur(18px);
        }
        @keyframes eligibilityMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes premiumAutoSlide {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes premiumAutoSlideReverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .auto-slide-banner {
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          border-radius: 9999px;
          padding: 1rem 0;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          box-shadow: 0 24px 80px rgba(0,0,0,0.075);
        }
        .auto-slide-track {
          display: inline-flex;
          width: max-content;
          align-items: center;
          gap: 1rem;
          animation: premiumAutoSlide 36s linear infinite;
          will-change: transform;
        }
        .auto-slide-slow { animation-duration: 52s; }
        .auto-slide-normal { animation-duration: 38s; }
        .auto-slide-fast { animation-duration: 26s; }
        .auto-slide-banner:hover .auto-slide-track { animation-play-state: paused; }
        .auto-slide-word {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 0.9rem 1.35rem;
          font-size: clamp(1rem, 2.2vw, 2rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 1;
        }
        .auto-slide-dark {
          background: #050805;
          color: #B6FF00;
        }
        .auto-slide-dark .auto-slide-word {
          background: rgba(182,255,0,0.08);
          border: 1px solid rgba(182,255,0,0.18);
          text-shadow: 0 0 24px rgba(182,255,0,0.28);
        }
        .auto-slide-light {
          background: rgba(255,255,255,0.78);
          color: #1d1d1f;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .auto-slide-light .auto-slide-word {
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .auto-slide-green {
          background: linear-gradient(135deg, #f7fff4 0%, #d8ff8a 34%, #b6ff00 58%, #eaffc7 78%, #ffffff 100%);
          color: #071107;
        }
        .auto-slide-green .auto-slide-word {
          background: rgba(255,255,255,0.66);
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .premium-statement-banner {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
        }
        .premium-statement-line {
          display: inline-flex;
          width: max-content;
          gap: 4rem;
          font-size: clamp(2rem, 5.8vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.075em;
          line-height: 0.9;
          color: #1d1d1f;
          will-change: transform;
        }
        .premium-statement-line span {
          white-space: nowrap;
        }
        .premium-statement-line-one {
          animation: premiumAutoSlide 56s linear infinite;
        }
        .premium-statement-line-two {
          animation: premiumAutoSlideReverse 62s linear infinite;
          color: rgba(29,29,31,0.46);
        }
        .premium-statement-banner:hover .premium-statement-line {
          animation-play-state: paused;
        }
        .eligibility-section {
          position: relative;
          isolation: isolate;
        }
        .eligibility-section::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 18px;
          z-index: -1;
          border-radius: 3.25rem;
          background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.72), transparent 35%), radial-gradient(circle at 80% 80%, rgba(182,255,0,0.22), transparent 42%);
          filter: blur(12px);
        }
        .eligibility-marquee {
          overflow: hidden;
          white-space: nowrap;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
        .eligibility-marquee-track {
          display: inline-flex;
          width: max-content;
          gap: 14px;
          animation: eligibilityMarquee 42s linear infinite;
          will-change: transform;
        }
        .eligibility-marquee:hover .eligibility-marquee-track {
          animation-play-state: paused;
        }
        .eligibility-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid rgba(0,0,0,0.1);
          background: rgba(255,255,255,0.78);
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 1000;
          letter-spacing: -0.03em;
          color: #071107;
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
        }
        @keyframes svgDashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -260; }
        }
        @keyframes svgFloatNode {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.55; }
          50% { transform: translateY(-18px) scale(1.22); opacity: 0.9; }
        }
        @keyframes svgSlowRotate {
          from { transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.012), 0) rotate(0deg); }
          to { transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.012), 0) rotate(1deg); }
        }
        .svg-animated-background {
          pointer-events: none;
          position: fixed;
          inset: -8vh -8vw;
          z-index: 0;
          width: 116vw;
          height: 116vh;
          opacity: 0.38;
          filter: blur(0.2px);
          animation: svgSlowRotate 16s ease-in-out infinite alternate;
        }
        .svg-flow-line {
          fill: none;
          stroke: url(#svgFlowGradient);
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-dasharray: 18 24;
          filter: url(#svgSoftGlow);
          animation: svgDashMove 11s linear infinite;
        }
        .svg-flow-line-two {
          stroke-width: 2.5;
          opacity: 0.72;
          animation-duration: 14s;
          animation-direction: reverse;
        }
        .svg-flow-line-three {
          stroke-width: 2;
          opacity: 0.6;
          animation-duration: 18s;
        }
        .svg-floating-node {
          fill: #B6FF00;
          stroke: rgba(255,255,255,0.9);
          stroke-width: 4;
          filter: url(#svgSoftGlow);
          transform-origin: center;
          animation: svgFloatNode 4s ease-in-out infinite;
        }
        .svg-delay-1 { animation-delay: 0.2s; }
        .svg-delay-2 { animation-delay: 0.8s; }
        .svg-delay-3 { animation-delay: 1.3s; }
        .svg-delay-4 { animation-delay: 1.9s; }
        @keyframes artworkFloat {
          0%, 100% { transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.018), 0) scale(1); }
          50% { transform: translate3d(0, calc(-18px + var(--scroll-y, 0px) * -0.018), 0) scale(1.012); }
        }
        @keyframes cockroachHover {
          0%, 100% { transform: translate(990px, 270px) rotate(-14deg) translateY(0); }
          50% { transform: translate(990px, 270px) rotate(-10deg) translateY(-22px); }
        }
        @keyframes handBreath {
          0%, 100% { transform: translate(840px, 480px) scale(1); }
          50% { transform: translate(840px, 482px) scale(1.006); }
        }
        @keyframes trailFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -180; }
        }
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.32; transform: scale(1); }
          50% { opacity: 0.78; transform: scale(1.14); }
        }
        .cockroach-artwork-background {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          width: 100vw;
          height: 100vh;
          opacity: 0.24;
          animation: artworkFloat 9s ease-in-out infinite;
        }
        .artwork-hand path {
          fill: none;
          stroke: rgba(0,0,0,0.66);
          stroke-width: 7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .artwork-hand { animation: handBreath 5.5s ease-in-out infinite; }
        .artwork-cockroach { animation: cockroachHover 3.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .artwork-dark-line { stroke: #050505; stroke-width: 6; stroke-linecap: round; fill: none; }
        .artwork-motion-trails path {
          fill: none;
          stroke: url(#cockroachMotionGradient);
          stroke-width: 4;
          stroke-linecap: round;
          stroke-dasharray: 22 18;
          filter: url(#cockroachArtworkGlow);
          animation: trailFlow 7s linear infinite;
        }
        .artwork-soft-waves path {
          fill: none;
          stroke: rgba(80, 190, 90, 0.28);
          stroke-width: 2;
          stroke-linecap: round;
        }
        .artwork-sparkles path,
        .artwork-sparkles circle {
          fill: rgba(70, 190, 85, 0.72);
          stroke: rgba(255,255,255,0.8);
          stroke-width: 2;
          filter: url(#cockroachArtworkGlow);
          animation: sparklePulse 3.6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @media (max-width: 768px) {
          .cockroach-artwork-background {
            opacity: 0.16;
            width: 160vw;
            height: 120vh;
            left: -46vw;
          }
        }
        @keyframes parallaxDriftOne {
          0% { transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.035), 0) scale(1); }
          50% { transform: translate3d(38px, calc(-32px + var(--scroll-y, 0px) * -0.035), 0) scale(1.08); }
          100% { transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.035), 0) scale(1); }
        }
        @keyframes parallaxDriftTwo {
          0% { transform: translate3d(0, calc(var(--scroll-y, 0px) * 0.028), 0) scale(1); }
          50% { transform: translate3d(-44px, calc(36px + var(--scroll-y, 0px) * 0.028), 0) scale(1.06); }
          100% { transform: translate3d(0, calc(var(--scroll-y, 0px) * 0.028), 0) scale(1); }
        }
        @keyframes gridMove {
          from { background-position: 0 0; transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.018), 0); }
          to { background-position: 64px 64px; transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.018), 0); }
        }
        
        .premium-soft-background {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 20% 8%, rgba(182,255,0,0.22), transparent 26%),
            radial-gradient(circle at 80% 24%, rgba(124,255,107,0.18), transparent 30%),
            radial-gradient(circle at 50% 92%, rgba(233,255,232,0.72), transparent 32%),
            linear-gradient(180deg, #ffffff 0%, #fbfff7 46%, #ffffff 100%);
        }
        .webgl-background {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          opacity: 0.85;
          mix-blend-mode: multiply;
        }
        @media (max-width: 768px) {
          .webgl-background { opacity: 0.65; }
        }
        .parallax-background {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 10%, rgba(210, 255, 210, 0.58), transparent 28%),
            radial-gradient(circle at 82% 18%, rgba(182, 255, 0, 0.28), transparent 26%),
            radial-gradient(circle at 50% 86%, rgba(124, 255, 107, 0.34), transparent 30%),
            #ffffff;
        }
        .parallax-grid {
          position: absolute;
          inset: -80px;
          opacity: 0.16;
          background-image: linear-gradient(rgba(42,140,62,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(42,140,62,0.08) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: gridMove 18s linear infinite;
        }
        .parallax-orb-one,
        .parallax-orb-two,
        .parallax-orb-three {
          position: absolute;
          border-radius: 9999px;
          filter: blur(18px);
          opacity: 0.48;
        }
        .parallax-orb-one {
          left: 7%;
          top: 18%;
          height: 260px;
          width: 260px;
          background: rgba(182, 255, 0, 0.48);
          animation: parallaxDriftOne 10s ease-in-out infinite;
        }
        .parallax-orb-two {
          right: 6%;
          top: 42%;
          height: 320px;
          width: 320px;
          background: rgba(124, 255, 107, 0.42);
          animation: parallaxDriftTwo 13s ease-in-out infinite;
        }
        .parallax-orb-three {
          left: 36%;
          bottom: 8%;
          height: 220px;
          width: 220px;
          background: rgba(210, 255, 210, 0.52);
          animation: parallaxDriftTwo 16s ease-in-out infinite reverse;
        }
        @media (prefers-reduced-motion: reduce) {
          .parallax-grid,
          .parallax-orb-one,
          .parallax-orb-two,
          .parallax-orb-three,
          .svg-animated-background,
          .svg-flow-line,
          .svg-floating-node,
          .cockroach-artwork-background,
          .artwork-hand,
          .artwork-cockroach,
          .artwork-motion-trails path,
          .artwork-sparkles path,
          .artwork-sparkles circle { animation: none; }
        }
        section, nav, footer, .page-layer { position: relative; z-index: 1; }
        section { animation: softScale 0.45s ease-out both; content-visibility: auto; contain-intrinsic-size: 900px; }
        .reveal-card { animation: fadeUp 0.7s ease-out both; }
        button, select, input, textarea, a {
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
        }
        button:hover, select:hover, input:focus, textarea:focus, a:hover { transform: translateY(-1px); }
        .magnetic-btn:hover { transform: translateY(-3px) scale(1.025); }
        .sticker-chip:hover { transform: translateY(-2px) scale(1.015); }


        .premium-loader {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245,245,247,0.92);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          animation: loaderFade 1s ease both;
        }
        @keyframes loaderFade {
          0%, 72% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        .premium-loader-card {
          text-align: center;
          animation: heroEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .premium-loader-mark {
          margin: 0 auto 18px;
          display: flex;
          height: 72px;
          width: 72px;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          background: #071107;
          color: #B6FF00;
          box-shadow: 0 24px 80px rgba(0,0,0,0.16);
        }
        .premium-loader-card h1 {
          font-size: clamp(2rem, 5vw, 5rem) !important;
          line-height: 0.9 !important;
        }
        .premium-loader-card p {
          margin-top: 14px;
          font-size: 1rem;
          font-weight: 900 !important;
          color: rgba(0,0,0,0.55);
        }
        .floating-join-toggle {
          position: fixed;
          right: 18px;
          bottom: 22px;
          z-index: 92;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          border-radius: 9999px;
          border: 1px solid rgba(182,255,0,0.35);
          background: #071107;
          color: #B6FF00;
          padding: 0.7rem 1rem 0.7rem 0.75rem;
          font-size: 0.82rem;
          font-weight: 1000;
          letter-spacing: -0.02em;
          box-shadow: 0 18px 52px rgba(0,0,0,0.22), 0 0 34px rgba(182,255,0,0.18);
          transform: translateZ(0);
          transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease, background 220ms ease, color 220ms ease;
        }
        .floating-join-toggle:hover {
          transform: translateY(-3px) scale(1.035);
          background: linear-gradient(135deg, #071107 0%, #12320f 55%, #B6FF00 160%);
          box-shadow: 0 24px 70px rgba(0,0,0,0.26), 0 0 44px rgba(182,255,0,0.32);
        }
        .floating-join-toggle:active {
          transform: translateY(0) scale(0.98);
        }
        .floating-join-icon {
          display: inline-flex;
          height: 2rem;
          width: 2rem;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #B6FF00;
          color: #071107;
          box-shadow: 0 0 0 6px rgba(182,255,0,0.14);
        }
        .floating-join-text {
          white-space: nowrap;
        }
        .oath-overlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          pointer-events: none;
          opacity: 0;
          background: rgba(245,245,247,0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: opacity 260ms ease;
        }
        .oath-overlay-open {
          pointer-events: auto;
          opacity: 1;
        }
        .oath-panel {
          position: absolute;
          inset: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 2.75rem;
          background: #f5f5f7;
          box-shadow: 0 40px 120px rgba(0,0,0,0.22);
          transform: translateY(18px) scale(0.985);
          transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .oath-overlay-open .oath-panel { transform: translateY(0) scale(1); }
        .oath-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.86);
          padding: 1.1rem 1.35rem;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .oath-kicker {
          font-size: 0.72rem !important;
          font-weight: 1000 !important;
          line-height: 1.1 !important;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(7,17,7,0.46);
        }
        .oath-title {
          margin-top: 0.2rem;
          font-size: clamp(1.7rem, 4vw, 3.6rem) !important;
          line-height: 0.95 !important;
          letter-spacing: -0.06em !important;
          color: #071107;
        }
        .oath-close {
          border-radius: 9999px;
          background: #071107;
          color: #B6FF00;
          padding: 0.8rem 1.05rem;
          font-size: 0.8rem;
          font-weight: 1000;
        }
        .oath-scroll {
          overflow-y: auto;
          padding: 1.2rem;
        }
        .oath-hero-card,
        .oath-block {
          margin: 0 auto 1.1rem;
          max-width: 1280px;
          border-radius: 2rem;
          background: rgba(255,255,255,0.78);
          padding: 1.25rem;
          box-shadow: 0 18px 54px rgba(0,0,0,0.07);
        }
        .oath-hero-card {
          background: linear-gradient(135deg, #071107 0%, #12320f 52%, #B6FF00 145%);
          color: white;
        }
        .oath-big-line {
          max-width: 980px;
          font-size: clamp(2rem, 5vw, 5.8rem) !important;
          font-weight: 1000 !important;
          line-height: 0.95 !important;
          letter-spacing: -0.07em !important;
          color: #ffffff;
        }
        .oath-sub-line {
          margin-top: 1rem;
          max-width: 720px;
          font-size: clamp(1rem, 2vw, 1.4rem) !important;
          font-weight: 900 !important;
          color: rgba(255,255,255,0.68);
        }
        .oath-block h3 {
          margin-bottom: 1rem;
          font-size: clamp(1.55rem, 3.2vw, 3.2rem) !important;
          line-height: 1.02 !important;
          letter-spacing: -0.055em !important;
        }
        .oath-paper {
          background: linear-gradient(135deg, #ffffff 0%, #efffe7 54%, #ffffff 100%);
        }
        .oath-black-block {
          background: #071107;
          color: white;
        }
        .oath-black-block h3 { color: white; }
        .oath-lines,
        .oath-translation-list {
          display: grid;
          gap: 0.75rem;
        }
        .oath-line-card,
        .oath-translation-card {
          display: grid;
          gap: 0.85rem;
          border-radius: 1.45rem;
          background: rgba(255,255,255,0.72);
          padding: 1rem;
          box-shadow: 0 10px 28px rgba(0,0,0,0.045);
        }
        .oath-line-card { grid-template-columns: 3rem 1fr; align-items: start; }
        .oath-line-card span {
          display: inline-flex;
          height: 2.35rem;
          width: 2.35rem;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #071107;
          color: #B6FF00;
          font-size: 0.8rem;
          font-weight: 1000;
        }
        .oath-line-card p,
        .oath-mini-card p,
        .oath-complaint-card,
        .oath-translation-card p {
          font-size: 0.92rem !important;
          font-weight: 750 !important;
          line-height: 1.45 !important;
          color: rgba(7,17,7,0.68);
        }
        .oath-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.85rem;
        }
        .oath-grid-five { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        .oath-grid-four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .oath-mini-card,
        .oath-complaint-card {
          border-radius: 1.55rem;
          background: rgba(255,255,255,0.76);
          padding: 1rem;
          box-shadow: 0 12px 34px rgba(0,0,0,0.055);
        }
        .oath-card-index,
        .oath-label {
          margin-bottom: 0.45rem;
          font-size: 0.65rem !important;
          font-weight: 1000 !important;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(7,17,7,0.38) !important;
        }
        .oath-mini-card h4,
        .oath-translation-card h4 {
          margin: 0.2rem 0 0.45rem;
          font-size: 1.1rem !important;
          font-weight: 1000 !important;
          line-height: 1.1 !important;
          letter-spacing: -0.035em;
          color: #071107;
        }
        .oath-rule-grid,
        .oath-chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }
        .oath-rule-pill,
        .oath-chip,
        .oath-dark-chip {
          border-radius: 9999px;
          padding: 0.78rem 1rem;
          font-size: 0.82rem !important;
          font-weight: 1000 !important;
          line-height: 1.1 !important;
        }
        .oath-rule-pill,
        .oath-dark-chip {
          background: rgba(255,255,255,0.10);
          color: #B6FF00;
          border: 1px solid rgba(182,255,0,0.18);
        }
        .oath-chip {
          background: #071107;
          color: #B6FF00;
        }
        .oath-translation-card {
          grid-template-columns: 1fr 1fr;
          background: rgba(255,255,255,0.82);
        }
        .oath-dept-icon {
          display: flex;
          height: 3rem;
          width: 3rem;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          background: #071107;
          color: #B6FF00;
          font-size: 1.4rem;
          margin-bottom: 0.8rem;
        }
        .join-oath-card {
          overflow: visible !important;
        }
        .join-oath-line {
          display: grid;
          grid-template-columns: 2.6rem minmax(0, 1fr);
          align-items: flex-start;
          gap: 0.95rem;
          min-height: auto;
          overflow: visible !important;
        }
        .join-oath-line > span:first-child {
          display: inline-flex;
          height: 2.15rem;
          width: 2.15rem;
          min-width: 2.15rem;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #071107;
          color: #B6FF00;
          font-size: 0.72rem;
          font-weight: 1000;
          line-height: 1 !important;
        }
        .join-oath-line p {
          min-width: 0;
          margin: 0;
          font-size: clamp(0.88rem, 1vw, 1rem) !important;
          font-weight: 780 !important;
          line-height: 1.58 !important;
          letter-spacing: -0.012em !important;
          color: rgba(7,17,7,0.70);
          overflow-wrap: anywhere !important;
          word-break: normal !important;
        }
        .join-oath-line .bilingual-stack {
          gap: 0.42rem;
        }
        .join-oath-line .bilingual-hi {
          font-size: clamp(0.8rem, 0.95vw, 0.94rem) !important;
          line-height: 1.65 !important;
          color: rgba(7,17,7,0.58) !important;
        }
        .join-oath-mini-card {
          min-height: 150px;
          overflow: visible !important;
        }
        .join-rules-black-box {
          overflow: hidden;
          border-radius: 3.25rem !important;
          background:
            radial-gradient(circle at 15% 8%, rgba(182,255,0,0.16), transparent 34%),
            radial-gradient(circle at 88% 92%, rgba(182,255,0,0.10), transparent 38%),
            #071107 !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 28px 90px rgba(0,0,0,0.20);
        }
        .join-rules-heading {
          font-size: clamp(2.35rem, 4.8vw, 5.7rem) !important;
          line-height: 1.02 !important;
          letter-spacing: -0.06em !important;
          max-width: 720px;
        }
        .join-rules-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .join-rules-big-pill {
          display: grid;
          grid-template-columns: 3.8rem minmax(0, 1fr);
          align-items: center;
          gap: 1rem;
          min-height: 104px;
          border-radius: 2.25rem;
          border: 1px solid rgba(182,255,0,0.18);
          background: rgba(255,255,255,0.10);
          padding: 1.1rem 1.25rem;
          color: #ffffff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 46px rgba(0,0,0,0.18);
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), background 240ms ease, box-shadow 240ms ease;
        }
        .join-rules-big-pill:hover {
          transform: translateY(-3px);
          background: rgba(182,255,0,0.13);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 22px 60px rgba(182,255,0,0.12);
        }
        .join-rules-number {
          display: inline-flex;
          height: 3.35rem;
          width: 3.35rem;
          align-items: center;
          justify-content: center;
          border-radius: 1.25rem;
          background: #B6FF00;
          color: #071107;
          font-size: 1rem;
          font-weight: 1000;
          line-height: 1;
          box-shadow: 0 12px 34px rgba(182,255,0,0.22);
        }
        .join-rules-big-pill p {
          margin: 0;
          font-size: clamp(1.35rem, 2.15vw, 2.25rem) !important;
          font-weight: 1000 !important;
          line-height: 1.12 !important;
          letter-spacing: -0.045em !important;
          color: #ffffff !important;
        }
        .join-rules-big-pill .bilingual-stack {
          gap: 0.35rem;
        }
        .join-rules-big-pill .bilingual-hi {
          font-size: clamp(1rem, 1.35vw, 1.35rem) !important;
          line-height: 1.45 !important;
          color: rgba(255,255,255,0.62) !important;
          letter-spacing: 0 !important;
        }
        @media (max-width: 768px) {
          .join-rules-black-box {
            border-radius: 1.8rem !important;
            padding: 1.25rem !important;
          }
          .join-rules-heading {
            font-size: clamp(1.85rem, 8.2vw, 2.65rem) !important;
            line-height: 1.08 !important;
          }
          .join-rules-big-pill {
            grid-template-columns: 2.8rem minmax(0, 1fr);
            min-height: 86px;
            gap: 0.75rem;
            border-radius: 1.55rem;
            padding: 0.95rem;
          }
          .join-rules-number {
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 0.9rem;
            font-size: 0.82rem;
          }
          .join-rules-big-pill p {
            font-size: 1.12rem !important;
            line-height: 1.22 !important;
            letter-spacing: -0.03em !important;
          }
          .join-rules-big-pill .bilingual-hi {
            font-size: 0.86rem !important;
            line-height: 1.55 !important;
          }
        }
        .mobile-menu-hint {
          display: none;
        }
        .mobile-menu-panel {
          position: fixed;
          inset: 0;
          z-index: 95;
          pointer-events: none;
          opacity: 0;
          background: rgba(245,245,247,0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transition: opacity 260ms ease;
        }
        .mobile-menu-panel-open {
          pointer-events: auto;
          opacity: 1;
        }
        .mobile-menu-card {
          margin: 16px;
          min-height: calc(100vh - 32px);
          border-radius: 2.25rem;
          background: rgba(255,255,255,0.82);
          padding: 24px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.14);
          transform: translateY(18px) scale(0.98);
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu-panel-open .mobile-menu-card {
          transform: translateY(0) scale(1);
        }
        .mobile-menu-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          border-radius: 1.5rem;
          background: rgba(0,0,0,0.04);
          padding: 16px 18px;
          text-align: left;
          font-size: 1.5rem;
          font-weight: 1000;
          letter-spacing: -0.05em;
          color: #1d1d1f;
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
        }
        .mobile-menu-link-active,
        .mobile-menu-link:hover {
          background: #071107;
          color: #B6FF00;
          transform: translateY(-2px);
        }
        .faq-accordion-item {
          overflow: hidden;
          border-radius: 2rem;
          background: rgba(255,255,255,0.78);
          box-shadow: 0 18px 55px rgba(0,0,0,0.055);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: box-shadow 220ms ease, transform 220ms ease;
        }
        .faq-accordion-open {
          box-shadow: 0 28px 85px rgba(0,0,0,0.09);
        }
        .faq-accordion-button {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 24px 28px;
          text-align: left;
          font-size: clamp(1.2rem, 2.2vw, 2rem);
          font-weight: 1000;
          line-height: 1.05;
          letter-spacing: -0.05em;
          color: #1d1d1f;
        }
        .faq-accordion-icon {
          display: flex;
          height: 42px;
          width: 42px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #071107;
          color: #B6FF00;
          font-size: 1.35rem;
          transition: transform 220ms ease;
        }
        .faq-accordion-open .faq-accordion-icon {
          transform: rotate(180deg);
        }
        .faq-accordion-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-accordion-answer p {
          overflow: hidden;
          padding: 0 28px;
          font-size: 0.98rem;
          font-weight: 750 !important;
          line-height: 1.65 !important;
          color: rgba(0,0,0,0.66);
        }
        .faq-accordion-open .faq-accordion-answer {
          grid-template-rows: 1fr;
        }
        .faq-accordion-open .faq-accordion-answer p {
          padding-bottom: 26px;
        }
        @media (max-width: 768px) {
          .running-cockroach { display: none !important; }
          .floating-join-toggle {
            right: 12px;
            bottom: 14px;
            padding: 0.62rem 0.86rem 0.62rem 0.64rem;
            font-size: 0.76rem;
          }
          .floating-join-icon {
            height: 1.8rem;
            width: 1.8rem;
          }
          .floating-oath-toggle {
            left: 12px;
            bottom: 14px;
            padding: 0.62rem 0.78rem 0.62rem 0.64rem;
            font-size: 0.72rem;
          }
          .floating-oath-icon {
            height: 1.8rem;
            width: 1.8rem;
          }
          .oath-panel {
            inset: 10px;
            border-radius: 1.5rem;
          }
          .oath-panel-head {
            padding: 0.9rem;
          }
          .oath-scroll {
            padding: 0.75rem;
          }
          .oath-hero-card,
          .oath-block {
            border-radius: 1.4rem;
            padding: 1rem;
          }
          .oath-big-line {
            font-size: clamp(1.8rem, 10vw, 3.2rem) !important;
            line-height: 1.02 !important;
          }
          .oath-line-card,
          .oath-translation-card {
            grid-template-columns: 1fr;
          }
          .oath-grid,
          .oath-grid-five,
          .oath-grid-four {
            grid-template-columns: 1fr;
          }
          .mobile-menu-hint {
            display: inline-flex;
            position: fixed;
            right: 14px;
            bottom: 72px;
            z-index: 94;
            border-radius: 9999px;
            background: #071107;
            color: #B6FF00;
            padding: 13px 18px;
            font-size: 13px;
            font-weight: 1000;
            box-shadow: 0 16px 44px rgba(0,0,0,0.18);
          }
        }
        .category-report-card {
          min-height: 170px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          overflow: visible;
        }
        .category-report-icon {
          flex: 0 0 auto;
        }
        .category-report-meta {
          font-size: 0.68rem !important;
          line-height: 1.25 !important;
          letter-spacing: 0.14em !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
        }
        .category-report-title {
          font-size: clamp(1.15rem, 1.45vw, 1.55rem) !important;
          line-height: 1.16 !important;
          letter-spacing: -0.025em !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          text-wrap: balance;
          max-width: 100%;
        }
        @media (max-width: 768px) {
          .category-report-card {
            min-height: 145px;
            padding: 1.05rem !important;
          }
          .category-report-title {
            font-size: 1.1rem !important;
            line-height: 1.2 !important;
          }
          .category-report-meta {
            font-size: 0.62rem !important;
            letter-spacing: 0.12em !important;
          }
        }
        .how-step-card {
          min-height: 260px;
        }
        .legal-safety-bar {
          overflow: hidden;
          border-radius: 3.25rem !important;
        }
        .legal-safety-bar .bilingual-stack {
          display: flex;
          align-items: flex-start;
          gap: 0.35rem;
        }
        .legal-safety-bar .bilingual-en,
        .legal-safety-bar .bilingual-hi,
        .legal-safety-bar .bilingual-en-only,
        .legal-safety-bar .bilingual-hi-only {
          white-space: normal !important;
          overflow-wrap: anywhere !important;
          word-break: normal !important;
        }
        .legal-safety-chip-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
        }
        .legal-safety-chip {
          min-width: 0;
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.10);
          padding: 0.9rem 1rem;
          text-align: center;
          font-size: 0.78rem !important;
          font-weight: 1000 !important;
          line-height: 1.2 !important;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          color: rgba(255,255,255,0.84);
          overflow: visible;
        }
        .legal-safety-chip .bilingual-stack {
          align-items: center;
          gap: 0.25rem;
        }
        @media (max-width: 768px) {
          .how-step-card {
            min-height: auto;
          }
          .legal-safety-bar {
            border-radius: 1.65rem !important;
            padding: 1.25rem !important;
          }
          .legal-safety-chip-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.55rem;
          }
          .legal-safety-chip {
            min-height: 66px;
            border-radius: 1.35rem;
            padding: 0.75rem 0.7rem;
            font-size: 0.68rem !important;
            line-height: 1.25 !important;
            letter-spacing: 0.07em;
          }
        }
        .public-map-issue-card {
          min-height: 106px;
          display: grid;
          grid-template-columns: 3.25rem minmax(0, 1fr);
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(255,255,255,0.12);
          color: #ffffff !important;
        }
        .public-map-issue-icon {
          display: inline-flex;
          height: 3.1rem;
          width: 3.1rem;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          background: transparent;
          color: inherit;
          font-size: 2rem;
          box-shadow: none;
          line-height: 1;
        }
        .public-map-issue-title {
          min-width: 0;
          font-size: clamp(1.2rem, 1.65vw, 1.7rem) !important;
          line-height: 1.08 !important;
          color: #ffffff !important;
        }
        @media (max-width: 768px) {
          .public-map-issue-card {
            min-height: 86px;
            grid-template-columns: 2.65rem minmax(0, 1fr);
            border-radius: 1.45rem !important;
            padding: 1rem !important;
          }
          .public-map-issue-icon {
            height: 2.45rem;
            width: 2.45rem;
            border-radius: 0;
            font-size: 1.55rem;
          }
          .public-map-issue-title {
            font-size: 1.08rem !important;
          }
        }
        .status-system-panel {
          overflow: visible;
        }
        .status-system-flow {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        .status-step-card {
          min-width: 0;
          min-height: 82px;
          display: grid;
          grid-template-columns: 3.05rem minmax(0, 1fr);
          align-items: center;
          gap: 0.9rem;
          overflow: visible;
          padding: 0.95rem !important;
        }
        .status-step-number {
          display: inline-flex;
          height: 2.8rem;
          width: 2.8rem;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #B6FF00;
          color: #071107;
          font-size: 0.88rem;
          font-weight: 1000;
          line-height: 1;
          box-shadow: none;
        }
        .status-step-copy {
          min-width: 0;
        }
        .status-step-title {
          margin: 0;
          font-size: clamp(1.12rem, 1.55vw, 1.55rem) !important;
          line-height: 1.12 !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          color: #ffffff !important;
        }
        .status-step-label {
          margin: 0;
          font-size: 0.9rem !important;
          line-height: 1.35 !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          color: rgba(255,255,255,0.70) !important;
        }
        @media (min-width: 1180px) {
          .status-system-flow {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
          .status-step-card {
            min-height: 178px;
            grid-template-columns: 1fr;
            align-items: start;
            align-content: start;
            gap: 0.75rem;
            padding: 1rem !important;
          }
          .status-step-title {
            font-size: clamp(1rem, 1.05vw, 1.18rem) !important;
            line-height: 1.18 !important;
          }
          .status-step-label {
            font-size: 0.76rem !important;
            line-height: 1.4 !important;
          }
        }
        @media (max-width: 768px) {
          .status-system-panel {
            border-radius: 1.65rem !important;
            padding: 1rem !important;
          }
          .status-step-card {
            min-height: 76px;
            grid-template-columns: 2.55rem minmax(0, 1fr);
            gap: 0.75rem;
            border-radius: 1.25rem !important;
            padding: 0.85rem !important;
          }
          .status-step-number {
            height: 2.25rem;
            width: 2.25rem;
            font-size: 0.74rem;
          }
          .status-step-title {
            font-size: 1rem !important;
            line-height: 1.2 !important;
          }
          .status-step-label {
            font-size: 0.75rem !important;
            line-height: 1.35 !important;
          }
        }
        .public-audits-section {
          overflow: visible !important;
        }
        .public-audits-left {
          overflow: visible !important;
          min-width: 0;
        }
        .public-audit-eyebrow {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          color: #B6FF00 !important;
          line-height: 1.35 !important;
          text-shadow: none !important;
        }
        .public-audit-eyebrow span {
          display: block;
          color: rgba(255,255,255,0.78) !important;
          font-size: 0.86rem !important;
          line-height: 1.55 !important;
          letter-spacing: 0 !important;
          text-transform: none !important;
          font-weight: 900 !important;
        }
        .public-audits-section h2 {
          overflow: visible !important;
          padding-bottom: 0.12em;
          color: #ffffff !important;
          text-shadow: none !important;
        }
        .public-audits-section h2 span,
        .public-audits-section h2 [lang="hi"] {
          color: rgba(255,255,255,0.78) !important;
        }
        .public-audits-section [class*="text-white/"] {
          color: rgba(255,255,255,0.76) !important;
        }
        @media (max-width: 768px) {
          .public-audits-section {
            border-radius: 1.65rem !important;
            padding: 1.1rem !important;
          }
          .public-audits-left {
            border-radius: 1.45rem !important;
            padding: 1.1rem !important;
          }
          .public-audit-eyebrow {
            font-size: 0.82rem !important;
            letter-spacing: 0.14em !important;
          }
        }
        .quick-section-dots {
          position: fixed;
          right: 18px;
          top: 50%;
          z-index: 70;
          display: flex;
          transform: translateY(-50%);
          flex-direction: column;
          gap: 10px;
        }
        .quick-section-dot {
          position: relative;
          height: 11px;
          width: 11px;
          border-radius: 9999px;
          background: rgba(7,17,7,0.22);
          border: 1px solid rgba(255,255,255,0.75);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          transition: transform 180ms ease, background 180ms ease;
        }
        .quick-section-dot:hover,
        .quick-section-dot-active {
          background: #B6FF00;
          transform: scale(1.35);
        }
        .quick-section-dot::after {
          content: attr(data-label);
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          border-radius: 9999px;
          background: rgba(7,17,7,0.92);
          color: #B6FF00;
          padding: 7px 12px;
          font-size: 11px;
          font-weight: 1000;
          letter-spacing: -0.02em;
          transition: opacity 180ms ease, transform 180ms ease;
        }
        .quick-section-dot:hover::after {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        @media (max-width: 1024px) {
          .quick-section-dots { display: none; }
        }

        /* FULL-WIDTH STRIPE LAYOUT PATCH - ACTIVE */
        .max-w-7xl,
        .max-w-6xl,
        .max-w-5xl,
        .max-w-4xl,
        .max-w-3xl,
        .max-w-2xl {
          max-width: min(1760px, calc(100vw - 48px)) !important;
        }

        section.mx-auto,
        nav .mx-auto,
        footer .mx-auto,
        .page-transition > section,
        .page-transition > div {
          width: min(1760px, calc(100vw - 48px)) !important;
          max-width: min(1760px, calc(100vw - 48px)) !important;
        }

        section.mx-auto {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        nav .mx-auto {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }

        .hero-cinematic > div,
        .hero-cinematic h1,
        .hero-cinematic p,
        section h1,
        section h2,
        section p.max-w-4xl,
        section p.max-w-5xl,
        section p.max-w-6xl {
          max-width: none !important;
        }

        .hero-cinematic > div {
          width: 100% !important;
        }

        .hero-cinematic h1 {
          max-width: 1280px !important;
        }

        .hero-cinematic p {
          max-width: 980px !important;
        }

        .apple-borderless,
        .apple-gradient-bg,
        .glass-card,
        .classic-section-card,
        .command-center,
        .public-audits-section {
          width: 100% !important;
        }

        .grid.lg\:grid-cols-\[0\.95fr_1\.05fr\],
        .grid.lg\:grid-cols-\[0\.9fr_1\.1fr\],
        .grid.lg\:grid-cols-\[0\.92fr_1\.08fr\],
        .grid.lg\:grid-cols-\[0\.88fr_1\.12fr\] {
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr) !important;
        }

        .grid.lg\:grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }

        .grid.lg\:grid-cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

        .grid.lg\:grid-cols-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        }

        .grid.lg\:grid-cols-5 {
          grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
        }

        @media (min-width: 1536px) {
          .grid.lg\:grid-cols-2 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }

          .grid.lg\:grid-cols-3 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }

          .grid.lg\:grid-cols-4 {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          }

          .grid.md\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }

          .grid.md\:grid-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          }
        }

        @media (min-width: 1800px) {
          .max-w-7xl,
          section.mx-auto,
          nav .mx-auto,
          footer .mx-auto {
            max-width: min(1880px, calc(100vw - 64px)) !important;
            width: min(1880px, calc(100vw - 64px)) !important;
          }
        }

        @media (max-width: 768px) {
          .max-w-7xl,
          .max-w-6xl,
          .max-w-5xl,
          .max-w-4xl,
          .max-w-3xl,
          .max-w-2xl,
          section.mx-auto,
          nav .mx-auto,
          footer .mx-auto {
            width: calc(100vw - 24px) !important;
            max-width: calc(100vw - 24px) !important;
          }

          nav .mx-auto {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
        }

        /* COCKROACH JANTA RULES LABEL ONLY PATCH */
        .join-rules-black-box > p:first-child {
          color: #ffffff !important;
          font-size: clamp(1.05rem, 1.25vw, 1.4rem) !important;
          line-height: 1.35 !important;
          font-weight: 1000 !important;
          letter-spacing: 0.14em !important;
          text-shadow: none !important;
        }

        .join-rules-black-box > p:first-child span,
        .join-rules-black-box > p:first-child [lang="hi"] {
          color: #ffffff !important;
          font-weight: 1000 !important;
          line-height: 1.4 !important;
        }

        @media (max-width: 768px) {
          .join-rules-black-box > p:first-child {
            font-size: 0.95rem !important;
            letter-spacing: 0.1em !important;
          }
        }

        /* COCKROACH JANTA RULE TILES COMPACT PATCH */
        .join-rules-grid {
          gap: 0.6rem !important;
        }

        .join-rules-big-pill {
          grid-template-columns: 2.7rem minmax(0, 1fr) !important;
          min-height: 66px !important;
          border-radius: 1.45rem !important;
          padding: 0.7rem 0.85rem !important;
          gap: 0.7rem !important;
        }

        .join-rules-number {
          height: 2.25rem !important;
          width: 2.25rem !important;
          border-radius: 0.85rem !important;
          font-size: 0.72rem !important;
        }

        .join-rules-big-pill p {
          font-size: clamp(0.92rem, 1.15vw, 1.18rem) !important;
          line-height: 1.22 !important;
          letter-spacing: -0.025em !important;
          font-weight: 900 !important;
        }

        .join-rules-big-pill .bilingual-hi,
        .join-rules-big-pill [lang="hi"] {
          font-size: clamp(0.72rem, 0.9vw, 0.9rem) !important;
          line-height: 1.45 !important;
          font-weight: 850 !important;
        }

        @media (max-width: 768px) {
          .join-rules-grid {
            gap: 0.5rem !important;
          }

          .join-rules-big-pill {
            grid-template-columns: 2.2rem minmax(0, 1fr) !important;
            min-height: 58px !important;
            border-radius: 1.1rem !important;
            padding: 0.65rem !important;
            gap: 0.55rem !important;
          }

          .join-rules-number {
            height: 1.9rem !important;
            width: 1.9rem !important;
            border-radius: 0.65rem !important;
            font-size: 0.62rem !important;
          }

          .join-rules-big-pill p {
            font-size: 0.86rem !important;
            line-height: 1.25 !important;
          }

          .join-rules-big-pill .bilingual-hi,
          .join-rules-big-pill [lang="hi"] {
            font-size: 0.68rem !important;
            line-height: 1.42 !important;
          }
        }
      `}</style>
      {showLoader ? <PremiumPageLoader /> : null}
      <ScrollProgressBar progress={scrollProgress} />
      <div className="premium-soft-background" aria-hidden="true" />
      <MobileMenuOverlay
        open={mobileMenuOpen}
        mode={mode}
        activePage={activePage}
        onOpen={() => setMobileMenuOpen(true)}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={navigateToPage}
      />
      <FloatingJoinNowButton mode={mode} onClick={() => navigateToPage("contact")} />

      <div className="quick-section-dots" aria-label="Quick page navigation">
        {[
          { id: "home" as PageId, label: "Home" },
          { id: "manifesto" as PageId, label: "Manifesto" },
          { id: "antiCorruption" as PageId, label: "Anti-Corruption" },
          { id: "noVip" as PageId, label: "No VIP" },
          { id: "constitution" as PageId, label: "Vision" },
          { id: "greatIndia" as PageId, label: "India Mission" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigateToPage(item.id)}
            className={`quick-section-dot ${activePage === item.id ? "quick-section-dot-active" : ""}`}
            title={item.label}
            aria-label={item.label}
            data-label={item.label}
          />
        ))}
      </div>

      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5">
          <button onClick={() => navigateToPage("home")} className="flex items-center gap-3 text-left">
            <div className="icon-bump flex h-11 w-11 items-center justify-center rounded-3xl bg-black text-white shadow-sm">
              <CockroachIcon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">Cockroach India Party</p>
              {mode !== "en" && <HindiShadow text="कॉकरोच इंडिया पार्टी" className="text-xs leading-3" />}
              <p className="text-xs font-bold text-black/50">India First. Citizens First.</p>
            </div>
          </button>

          <div className="top-nav-segment hidden items-center gap-2 text-sm font-bold text-black/60 xl:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`nav-link hover:text-black ${activePage === item.id ? "nav-link-active text-black" : ""}`}
              >
                <BilingualText value={item.label} mode={mode} hiClassName="text-[10px] leading-3" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value as LangMode)}
              className="magnetic-btn rounded-full bg-white px-4 py-3 text-sm font-black outline-none"
              aria-label="Language mode"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="both">English + हिंदी</option>
            </select>
            <button
              onClick={() => navigateToPage("contact")}
              className="premium-toggle premium-toggle-dark rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ease-out"
            >
              Join / Report
            </button>
          </div>
        </div>

      </nav>

      <div key={activePage} className="page-transition">
        {activePage === "home" && <HomePage mode={mode} setPage={navigateToPage} scrollToJoin={scrollToJoin} />}
        {activePage === "manifesto" && (
          <>
            <ManifestoPage mode={mode} />
            <StudentFirstDetailedPage mode={mode} />
          </>
        )}
        {activePage === "about" && <AboutPage mode={mode} />}
        {activePage === "constitution" && <ConstitutionPage mode={mode} />}
        {activePage === "student" && (
          <>
            <ManifestoPage mode={mode} />
            <StudentFirstDetailedPage mode={mode} />
          </>
        )}
        {activePage === "antiCorruption" && <AntiCorruptionDetailedPage mode={mode} />}
        {activePage === "noVip" && <NoVIPCulturePage mode={mode} />}
        {activePage === "greatIndia" && <GreatIndiaMissionPage mode={mode} />}
        {activePage === "contact" && <ActionHubPage mode={mode} />}
        {activePage === "oath" && <ActionHubPage mode={mode} />}
        {activePage === "privacy" && <PrivacyPage mode={mode} />}
      </div>


      <LegalSafetyBarSection mode={mode} />
      <FinalCinematicCTA mode={mode} onShare={shareMovement} />

      <footer className="border-t border-black/10 px-6 py-14 pb-28 text-center text-sm font-bold text-black/45 md:pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-black text-white shadow-2xl">
              <CockroachIcon className="h-9 w-9" />
            </div>
            <h2 className="apple-gradient-text text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Cockroach India Party
            </h2>
            <p className="max-w-2xl text-xl font-black leading-8 text-black">
              We survive. We rebuild. We rise.
            </p>
            <p className="max-w-2xl text-base font-black text-black/65">
              Public office is service, not luxury.
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-4xl rounded-[2rem] bg-black px-6 py-5 text-center text-sm font-black leading-6 text-white/68">
            Citizen-first political movement website. Official party registration, election symbol, office address, and legal documents will be updated after legal completion.
            {mode !== "en" ? (
              <HindiShadow
                text="यह citizen-first राजनीतिक आंदोलन वेबसाइट है। आधिकारिक पंजीकरण, चुनाव चिन्ह, कार्यालय पता और कानूनी दस्तावेज कानूनी प्रक्रिया पूरी होने के बाद अपडेट होंगे।"
                className="text-[10px] text-white/35"
              />
            ) : null}
          </div>

          <div className="mx-auto mb-8 flex max-w-7xl flex-wrap justify-center gap-3">
            {[
              ...navItems,
              { id: "contact" as PageId, label: { en: "Join / Report", hi: "जुड़ें / रिपोर्ट करें" } },
              { id: "about" as PageId, label: { en: "About", hi: "परिचय" } },
              { id: "privacy" as PageId, label: { en: "Privacy", hi: "गोपनीयता" } },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className="magnetic-btn rounded-full border border-black/10 bg-white/70 px-4 py-2 hover:bg-black hover:text-white"
              >
                {mode === "hi" ? item.label.hi : item.label.en}
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-toggle premium-toggle-dark inline-flex rounded-full px-8 py-4 text-base font-black"
            >
              Follow on Instagram
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-toggle premium-toggle-light inline-flex rounded-full px-8 py-4 text-base font-black"
            >
              Send Issue / Corruption Video
            </a>
          </div>

          <div className="mt-8">
            <span>
              © 2026 Cockroach India Party. Official registration and election symbol details will be updated after legal completion.
            </span>
            {mode !== "en" ? (
              <HindiShadow
                text="© 2026 कॉकरोच इंडिया पार्टी। आधिकारिक पंजीकरण और चुनाव चिन्ह विवरण कानूनी प्रक्रिया पूरी होने के बाद अपडेट होंगे।"
                className="text-[10px]"
              />
            ) : null}
          </div>
        </div>
      </footer>
    </main>
  );
}
