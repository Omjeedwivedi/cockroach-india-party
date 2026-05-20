"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

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
  { id: "constitution", label: { en: "Vision", hi: "दृष्टि" } },
  { id: "student", label: { en: "Student First", hi: "छात्र प्रथम" } },
  { id: "antiCorruption", label: { en: "Anti-Corruption", hi: "भ्रष्टाचार विरोध" } },
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
    en: "All elected representatives must publicly disclose salary, allowances, assets, vehicles, bungalows, security expense, foreign travel, gifts, and family-linked business interests every year.",
    hi: "हर जनप्रतिनिधि हर साल वेतन, भत्ता, संपत्ति, गाड़ी, बंगला, सुरक्षा खर्च, विदेश यात्रा, उपहार और पारिवारिक व्यापारिक हित सार्वजनिक करे।",
  },
  {
    en: "Luxury lifestyle growth must be compared with declared income, tax records, election affidavits, and public contracts to detect unexplained wealth.",
    hi: "लग्जरी जीवनशैली की तुलना घोषित आय, टैक्स रिकॉर्ड, चुनावी शपथपत्र और सार्वजनिक ठेकों से की जाए ताकि अघोषित संपत्ति पकड़ी जा सके।",
  },
  {
    en: "Public office must not become a route to royal living. Politics must be treated as service, not a shortcut to wealth, power, and family privilege.",
    hi: "सार्वजनिक पद शाही जीवन का रास्ता नहीं होना चाहिए। राजनीति सेवा हो, धन, शक्ति और पारिवारिक विशेषाधिकार का शॉर्टकट नहीं।",
  },
  {
    en: "If a politician cannot explain sudden wealth, luxury assets, or lifestyle upgrades, an independent inquiry must begin automatically.",
    hi: "अगर कोई नेता अचानक बढ़ी संपत्ति, लग्जरी संपत्ति या जीवनशैली अपग्रेड नहीं समझा पाता, तो स्वतः स्वतंत्र जांच शुरू हो।",
  },
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

function PartyEmblem({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 24 });
  const petals = Array.from({ length: 16 });
  const roaches = Array.from({ length: 6 });

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cockroach India Party emblem"
    >
      <defs>
        <radialGradient id="emblemWood" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#E9B07A" />
          <stop offset="45%" stopColor="#8B4D2E" />
          <stop offset="100%" stopColor="#2A1710" />
        </radialGradient>
        <linearGradient id="emblemCopper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE0B4" />
          <stop offset="45%" stopColor="#B4683E" />
          <stop offset="100%" stopColor="#4A2416" />
        </linearGradient>
        <filter id="emblemShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.22" />
        </filter>
      </defs>

      <circle cx="300" cy="300" r="270" fill="url(#emblemWood)" opacity="0.18" filter="url(#emblemShadow)" />

      {petals.map((_, index) => (
        <g key={`petal-${index}`} transform={`rotate(${index * 22.5} 300 300)`}>
          <path
            d="M300 40 C335 102 335 175 300 238 C265 175 265 102 300 40Z"
            fill="url(#emblemCopper)"
            stroke="#102436"
            strokeWidth="7"
            strokeLinejoin="round"
            opacity={index % 2 === 0 ? 0.95 : 0.55}
          />
          <path d="M300 72 C318 124 318 165 300 214 C282 165 282 124 300 72Z" stroke="#F4C18D" strokeWidth="4" opacity="0.65" />
        </g>
      ))}

      <circle cx="300" cy="300" r="178" fill="#1E1714" opacity="0.9" stroke="#102436" strokeWidth="10" />
      <circle cx="300" cy="300" r="143" fill="#F8FAFC" stroke="#0E3C70" strokeWidth="14" />
      <circle cx="300" cy="300" r="103" fill="#ffffff" stroke="#0E3C70" strokeWidth="5" />
      <circle cx="300" cy="300" r="20" fill="#0E3C70" />

      {spokes.map((_, index) => (
        <line
          key={`spoke-${index}`}
          x1="300"
          y1="300"
          x2="300"
          y2="205"
          stroke="#0E3C70"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${index * 15} 300 300)`}
        />
      ))}

      {roaches.map((_, index) => (
        <g key={`roach-${index}`} transform={`rotate(${index * 60} 300 300) translate(300 96)`}>
          <path d="M-42 -12 C-78 -70 -120 -86 -160 -92" stroke="#102436" strokeWidth="8" strokeLinecap="round" />
          <path d="M42 -12 C78 -70 120 -86 160 -92" stroke="#102436" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="0" cy="30" rx="34" ry="72" fill="url(#emblemCopper)" stroke="#102436" strokeWidth="8" />
          <ellipse cx="0" cy="-38" rx="26" ry="23" fill="#D5905E" stroke="#102436" strokeWidth="8" />
          <path d="M0 -24 V92" stroke="#5C2E1E" strokeWidth="5" strokeLinecap="round" />
          <path d="M-30 8 L-78 -12" stroke="#102436" strokeWidth="8" strokeLinecap="round" />
          <path d="M30 8 L78 -12" stroke="#102436" strokeWidth="8" strokeLinecap="round" />
          <path d="M-27 45 L-75 62" stroke="#102436" strokeWidth="8" strokeLinecap="round" />
          <path d="M27 45 L75 62" stroke="#102436" strokeWidth="8" strokeLinecap="round" />
          <circle cx="-10" cy="-42" r="5" fill="#102436" />
          <circle cx="10" cy="-42" r="5" fill="#102436" />
        </g>
      ))}

      <circle cx="300" cy="300" r="151" fill="none" stroke="#ffffff" strokeWidth="8" opacity="0.9" />
      <circle cx="300" cy="300" r="190" fill="none" stroke="#C88654" strokeWidth="7" opacity="0.7" />
    </svg>
  );
}

function CockroachArtworkBackground() {
  return (
    <svg
      className="cockroach-artwork-background"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cockroachMotionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9FFE8" />
          <stop offset="45%" stopColor="#B6FF00" />
          <stop offset="100%" stopColor="#67E66E" />
        </linearGradient>
        <filter id="cockroachArtworkGlow">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="artwork-soft-waves">
        <path d="M-120 560 C 180 430, 340 760, 620 570 S 1050 310, 1360 480 S 1600 710, 1760 520" />
        <path d="M-80 760 C 160 610, 410 760, 640 640 S 1010 490, 1280 620 S 1540 820, 1710 690" />
      </g>

      <g className="artwork-hand" transform="translate(840 480)">
        <path d="M-10 105 C 80 38, 200 25, 360 46 C 468 60, 560 118, 653 199" />
        <path d="M-96 330 C -32 222, 18 154, 84 112" />
        <path d="M92 116 C 65 160, 46 196, 48 235 C 50 282, 86 310, 130 315" />
        <path d="M128 173 C 100 217, 104 266, 145 286 C 174 300, 212 296, 244 276" />
        <path d="M-2 238 C 25 290, 62 336, 120 354 C 174 372, 224 360, 260 330" />
        <path d="M208 256 C 270 220, 342 202, 420 214" />
      </g>

      <g className="artwork-cockroach" transform="translate(990 270) rotate(-14)">
        <ellipse cx="0" cy="0" rx="52" ry="25" fill="#111111" />
        <ellipse cx="-8" cy="0" rx="38" ry="18" fill="#252525" stroke="#050505" strokeWidth="5" />
        <circle cx="45" cy="-4" r="24" fill="#1f1f1f" stroke="#050505" strokeWidth="5" />
        <path d="M55 -24 C 82 -70, 120 -87, 160 -90" className="artwork-dark-line" />
        <path d="M48 -27 C 58 -82, 82 -116, 122 -140" className="artwork-dark-line" />
        <path d="M-10 22 L-32 54" className="artwork-dark-line" />
        <path d="M8 24 L-2 65" className="artwork-dark-line" />
        <path d="M25 18 L34 57" className="artwork-dark-line" />
        <path d="M52 -10 Q60 -2 56 7" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>

      <g className="artwork-motion-trails">
        <path d="M760 350 C 820 290, 890 260, 960 260" />
        <path d="M720 410 C 790 330, 880 300, 965 300" />
        <path d="M690 460 C 770 365, 860 330, 950 340" />
      </g>

      <g className="artwork-sparkles">
        <path d="M1300 220 L1314 250 L1344 264 L1314 278 L1300 308 L1286 278 L1256 264 L1286 250 Z" />
        <circle cx="410" cy="680" r="9" />
        <circle cx="520" cy="355" r="5" />
        <circle cx="1315" cy="590" r="6" />
        <path d="M760 600 L766 612 L778 618 L766 624 L760 636 L754 624 L742 618 L754 612 Z" />
      </g>
    </svg>
  );
}

function SvgAnimatedBackground() {
  return (
    <svg
      className="svg-animated-background"
      viewBox="0 0 1440 1100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="svgFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9FFE8" />
          <stop offset="32%" stopColor="#B6FF00" />
          <stop offset="68%" stopColor="#7CFF6B" />
          <stop offset="100%" stopColor="#F6FFE8" />
        </linearGradient>
        <filter id="svgSoftGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M-80 220 C 160 80, 280 420, 520 260 S 920 20, 1140 250 S 1350 520, 1520 320"
        className="svg-flow-line svg-flow-line-one"
      />
      <path
        d="M-120 620 C 180 450, 330 780, 610 580 S 990 360, 1190 570 S 1370 820, 1540 640"
        className="svg-flow-line svg-flow-line-two"
      />
      <path
        d="M120 1060 C 300 820, 540 1000, 720 780 S 1060 520, 1280 760 S 1470 1030, 1580 860"
        className="svg-flow-line svg-flow-line-three"
      />

      <circle cx="210" cy="250" r="7" className="svg-floating-node svg-delay-1" />
      <circle cx="520" cy="260" r="10" className="svg-floating-node svg-delay-2" />
      <circle cx="930" cy="165" r="8" className="svg-floating-node svg-delay-3" />
      <circle cx="1180" cy="570" r="9" className="svg-floating-node svg-delay-4" />
      <circle cx="720" cy="780" r="8" className="svg-floating-node svg-delay-2" />
    </svg>
  );
}

function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 pointer;

      float circle(vec2 uv, vec2 pos, float radius, float blur) {
        return smoothstep(radius, radius - blur, length(uv - pos));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = pointer;
        float wave = sin((uv.x + time * 0.06) * 8.0) * 0.015 + cos((uv.y - time * 0.05) * 9.0) * 0.015;

        float blue = circle(uv + wave, vec2(0.18, 0.82), 0.42, 0.34);
        float violet = circle(uv - wave, vec2(0.82, 0.22), 0.38, 0.30);
        float pink = circle(uv, vec2(0.72, 0.76), 0.34, 0.28);
        float cursor = circle(uv, p, 0.24, 0.20);

        vec3 color = vec3(1.0);
        color = mix(color, vec3(0.78, 1.0, 0.78), blue * 0.44);
        color = mix(color, vec3(0.58, 1.0, 0.38), violet * 0.38);
        color = mix(color, vec3(0.90, 1.0, 0.58), pink * 0.32);
        color = mix(color, vec3(0.70, 1.0, 0.10), cursor * 0.30);

        float alpha = max(max(blue, violet), max(pink, cursor)) * 0.55;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const timeLocation = gl.getUniformLocation(program, "time");
    const pointerLocation = gl.getUniformLocation(program, "pointer");

    let animationFrame = 0;
    let startTime = performance.now();
    let pointerX = 0.5;
    let pointerY = 0.5;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(window.innerWidth, 1);
      pointerY = 1 - event.clientY / Math.max(window.innerHeight, 1);
    };

    const render = () => {
      const now = performance.now();
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (now - startTime) * 0.001);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl-background" aria-hidden="true" />;
}

function CockroachCursor() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "", visible: true, active: false, moving: false });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const moveTimerRef = useRef<number | null>(null);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const getActionLabel = (element: Element | null) => {
      const interactive = element?.closest("button, a, select");
      if (!interactive) return "";

      const text = (interactive.textContent || "").toLowerCase();
      if (text.includes("join")) return "Join";
      if (text.includes("manifesto")) return "Read";
      if (text.includes("follow")) return "Open";
      if (text.includes("report") || text.includes("issue")) return "Send";
      if (text.includes("privacy")) return "View";
      return "Go";
    };

    const shouldHideOnText = (element: Element | null) => {
      if (!element) return false;
      const isInteractive = element.closest("button, a, select");
      const isCard = element.closest(".micro-lift, .reveal-card, .glass-card, .clay-card");
      const isText = element.closest("p, h1, h2, h3, h4, li, span");
      return Boolean(isText && !isInteractive && !isCard);
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      const label = getActionLabel(target);
      const isCard = Boolean(target?.closest(".micro-lift, .reveal-card, .glass-card, .clay-card"));
      const hideOnText = shouldHideOnText(target);
      const active = Boolean(label || isCard);

      setCursor({
        x: event.clientX,
        y: event.clientY,
        label,
        visible: !hideOnText,
        active,
        moving: true,
      });

      trailIdRef.current += 1;
      const nextDot = { x: event.clientX, y: event.clientY, id: trailIdRef.current };
      setTrail((previous) => [nextDot, ...previous].slice(0, 4));

      if (moveTimerRef.current) window.clearTimeout(moveTimerRef.current);
      moveTimerRef.current = window.setTimeout(() => {
        setCursor((previous) => ({ ...previous, moving: false }));
      }, 140);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (moveTimerRef.current) window.clearTimeout(moveTimerRef.current);
    };
  }, []);

  return (
    <>
      {trail.map((dot, index) => (
        <span
          key={dot.id}
          className="cockroach-trail-dot"
          style={{
            transform: `translate3d(${dot.x - 3}px, ${dot.y - 3}px, 0)`,
            opacity: cursor.visible ? Math.max(0, 0.26 - index * 0.055) : 0,
          }}
          aria-hidden="true"
        />
      ))}

      <div
        className={`cockroach-pointer ${cursor.active ? "cockroach-pointer-active" : ""} ${cursor.moving ? "cockroach-pointer-moving" : ""} ${cursor.visible ? "" : "cockroach-pointer-hidden"}`}
        style={{
          transform: `translate3d(${cursor.x - 7}px, ${cursor.y - 7}px, 0) rotate(-18deg)`,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 120 120"
          className="h-8 w-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cursorBodyShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a1710" />
              <stop offset="48%" stopColor="#111111" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
          </defs>

          <path
            d="M39 34 C28 21, 18 22, 16 36 C14 53, 27 66, 49 66 C47 52, 44 42, 39 34Z"
            fill="#101010"
            stroke="#050505"
            strokeWidth="3"
            className="cursor-wing-left"
          />
          <path
            d="M71 33 C84 19, 96 22, 99 37 C102 54, 87 67, 63 66 C64 51, 67 41, 71 33Z"
            fill="#101010"
            stroke="#050505"
            strokeWidth="3"
            className="cursor-wing-right"
          />

          <ellipse cx="57" cy="58" rx="31" ry="21" fill="url(#cursorBodyShine)" stroke="#050505" strokeWidth="4" />
          <path d="M31 58 C42 50, 72 50, 84 58" stroke="#3a2115" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M34 68 C47 60, 68 60, 80 68" stroke="#3a2115" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M57 38 V78" stroke="#4a2a1c" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />

          <ellipse cx="83" cy="52" rx="15" ry="13" fill="#151515" stroke="#050505" strokeWidth="3" />
          <ellipse cx="94" cy="49" rx="10" ry="9" fill="#111111" stroke="#050505" strokeWidth="3" />
          <circle cx="98" cy="46" r="1.6" fill="#B6FF00" />
          <circle cx="92" cy="51" r="1.2" fill="#B6FF00" />

          <path d="M99 43 C150 5, 210 -24, 285 -34" className="cursor-antenna cursor-antenna-a" />
          <path d="M94 39 C132 -30, 205 -72, 270 -112" className="cursor-antenna cursor-antenna-b" />
          <path d="M96 46 C158 33, 230 18, 310 28" className="cursor-antenna cursor-antenna-c" />

          <path d="M39 48 C27 43, 18 36, 10 27" className="cursor-leg cursor-leg-a" />
          <path d="M35 58 C20 60, 9 65, -1 75" className="cursor-leg cursor-leg-b" />
          <path d="M42 73 C30 85, 20 95, 8 107" className="cursor-leg cursor-leg-c" />
          <path d="M72 47 C82 40, 91 34, 103 27" className="cursor-leg cursor-leg-d" />
          <path d="M76 61 C91 62, 103 68, 115 77" className="cursor-leg cursor-leg-e" />
          <path d="M68 75 C78 89, 88 100, 101 112" className="cursor-leg cursor-leg-f" />

          <g transform="translate(16 70) rotate(-12)">
            <rect x="0" y="0" width="19" height="14" rx="2.5" fill="#B6FF00" stroke="#071107" strokeWidth="2.2" />
            <line x1="9.5" y1="2" x2="9.5" y2="12" stroke="#071107" strokeWidth="1.5" />
            <line x1="3" y1="5" x2="7" y2="5" stroke="#071107" strokeWidth="1.2" />
            <line x1="12" y1="5" x2="16" y2="5" stroke="#071107" strokeWidth="1.2" />
            <line x1="3" y1="8" x2="7" y2="8" stroke="#071107" strokeWidth="1.2" />
            <line x1="12" y1="8" x2="16" y2="8" stroke="#071107" strokeWidth="1.2" />
          </g>
        </svg>

        {cursor.label ? <span className="cursor-action-label">{cursor.label}</span> : null}
      </div>
    </>
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
      hi: "डिग्री तैयार है लेकिन नौकरी अभी भी loading में है।",
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
                  hi: "अगर डिग्री तैयार है लेकिन नौकरी अभी भी loading में है, तो आप eligible हैं।",
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
                  hi: "कोई जाति प्रमाणपत्र नहीं। कोई VIP connection नहीं। कोई राजनीतिक background नहीं।",
                }}
                mode={mode}
                hiClassName="text-base leading-5 text-black/55 md:text-xl"
              />
            </p>
            <p className="mt-5 text-base font-black leading-7 text-black/68">
              <BilingualText
                value={{
                  en: "Only one qualification: you care about India and you are ready to question power.",
                  hi: "सिर्फ एक योग्यता: आपको भारत की चिंता है और आप सत्ता से सवाल करने के लिए तैयार हैं।",
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
            className="magnetic-btn rounded-full bg-white px-8 py-4 text-base font-black text-black transition-all duration-300 hover:apple-gradient-bg hover:text-black"
          >
            Yes, I Am Eligible →
          </button>
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
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8 inline-flex flex-col items-center gap-1 magnetic-btn rounded-full apple-clean-pill apple-gradient-bg px-6 py-3 text-sm font-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span>India 2047 Movement</span>
            {mode !== "en" && <HindiShadow text="भारत 2047 आंदोलन" className="text-[10px] leading-3" />}
          </div>

          <h1 className="text-6xl font-black leading-[0.86] tracking-[-0.08em] md:text-8xl lg:text-9xl">
            <BilingualText
              value={{
                en: "Ordinary Indians deserve extraordinary accountability.",
                hi: "आम भारतीयों को असाधारण जवाबदेही चाहिए।",
              }}
              mode={mode}
              hiClassName="mt-5 text-2xl leading-8 tracking-normal text-black/45 md:text-4xl"
            />
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
              onClick={scrollToJoin}
              className="magnetic-btn rounded-full bg-black px-9 py-5 text-base font-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:apple-gradient-bg hover:text-black hover:shadow-xl"
            >
              Join the Movement →
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

      <JoinEligibilitySection mode={mode} scrollToJoin={scrollToJoin} />
      <BerozgariEmergencySection mode={mode} />
      <PublicAccountabilitySection mode={mode} />
      <WhyCockroachStorySection mode={mode} />
      <ManifestoQuickViewSection mode={mode} setPage={setPage} />
      <BeforeAfterSection mode={mode} />
      <ContactPage mode={mode} />
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
              <BilingualText
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
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div className="rounded-[2.25rem] border border-black/10 bg-[#fafafa] p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
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
          <div className="mt-8 rounded-[2.25rem] border border-black/10 bg-[#fafafa] p-7">
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
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <PageEyebrow value={{ en: "Vision", hi: "दृष्टि" }} mode={mode} />
          <PageTitle value={{ en: "India 2047 Vision.", hi: "भारत 2047 दृष्टि।" }} mode={mode} />
          <p className="mt-6 text-base font-bold leading-7 text-black/65">
            <BilingualText
              value={{
                en: "A movement built to question power, demand transparency, protect students and workers, and make politics answerable to ordinary citizens.",
                hi: "एक ऐसा आंदोलन जो सत्ता से सवाल करे, पारदर्शिता मांगे, छात्रों और कर्मचारियों की रक्षा करे और राजनीति को आम नागरिकों के प्रति जवाबदेह बनाए।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4"
            />
          </p>
        </div>
        <div className="reveal-card rounded-[2.5rem] border border-black/10 bg-black p-8 text-white shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(0,0,0,0.22)]">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/45">Vision Summary</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.055em]">
            India First. Citizens First.
          </h2>
          <p className="mt-6 text-sm font-bold leading-6 text-white/65">
            A clear national direction built on transparency, students, workers, jobs, technology, justice, and accountable leadership.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {constitutionItems.map((item, index) => (
          <div
            key={item.en}
            className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
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
        <div className="rounded-[2.25rem] border border-black/10 bg-black p-8 text-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="text-5xl">{section.icon}</div>
          <p className="mt-8 text-xl font-black leading-7 tracking-[-0.03em]">
            <BilingualText value={section.goal} mode={mode} hiClassName="text-xs leading-4 text-white/35" />
          </p>
        </div>
        <div className="grid gap-5">
          {section.points.map((point, index) => (
            <div
              key={point.en}
              className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
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

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center magnetic-btn rounded-full bg-black px-8 py-4 text-base font-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:apple-gradient-bg hover:text-black hover:shadow-xl"
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

function BigStatementSection({ mode }: { mode: LangMode }) {
  const lines: I18n[] = [
    { en: "No hate politics.", hi: "नफरत की राजनीति नहीं।" },
    { en: "No hidden wealth.", hi: "छिपी संपत्ति नहीं।" },
    { en: "No luxury politics.", hi: "विलासिता वाली राजनीति नहीं।" },
    { en: "Only public accountability.", hi: "केवल सार्वजनिक जवाबदेही।" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="glass-card rounded-[3.25rem] border border-black/10 p-8 text-center md:p-12">
        {lines.map((line) => (
          <h2 key={line.en} className="apple-gradient-text text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-7xl">
            <BilingualText value={line} mode={mode} hiClassName="text-lg leading-6 tracking-normal md:text-2xl" />
          </h2>
        ))}
      </div>
    </section>
  );
}

function WhyCockroachStorySection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <div className="clay-card rounded-[3.25rem] border border-black/10 p-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black text-white shadow-2xl">
            <CockroachIcon className="h-14 w-14" />
          </div>
          <p className="mt-6 text-center text-sm font-black uppercase tracking-[0.22em] text-black/45">
            Movement Symbol
          </p>
        </div>
        <div>
          <PageEyebrow value={{ en: "Why Cockroach?", hi: "कॉकरोच क्यों?" }} mode={mode} />
          <PageTitle value={{ en: "We survive. We rebuild. We rise.", hi: "हम survive करते हैं। हम rebuild करते हैं। हम rise करते हैं।" }} mode={mode} />
          <p className="mt-6 text-base font-bold leading-7 text-black/65">
            <BilingualText
              value={{
                en: "Ordinary people survive everything: inflation, corruption, exams, job pressure, bad roads, toxic offices, and failed promises. The cockroach is survival, adaptability, discipline, and refusal to disappear.",
                hi: "आम लोग सब कुछ झेलते हैं: महंगाई, भ्रष्टाचार, परीक्षा, नौकरी दबाव, खराब सड़क, विषाक्त ऑफिस और टूटे वादे। कॉकरोच संघर्ष, अनुकूलन, अनुशासन और मिटने से इनकार का प्रतीक है।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

function ManifestoQuickViewSection({ mode, setPage }: { mode: LangMode; setPage: (page: PageId) => void }) {
  const quickCards: { title: I18n; body: I18n }[] = [
    { title: { en: "Student First", hi: "छात्र प्रथम" }, body: { en: "Fair exams, no paper leaks, fast results, job-linked education.", hi: "निष्पक्ष परीक्षा, पेपर लीक बंद, तेज परिणाम, नौकरी से जुड़ी शिक्षा।" } },
    { title: { en: "Worker Rights", hi: "कर्मचारी अधिकार" }, body: { en: "5-day work week, paid overtime, labour law audits.", hi: "5 दिन कार्य सप्ताह, भुगतान ओवरटाइम, श्रम कानून ऑडिट।" } },
    { title: { en: "Anti-Corruption", hi: "भ्रष्टाचार विरोध" }, body: { en: "Asset checks, fast courts, seizure of illegal wealth.", hi: "संपत्ति जांच, तेज कोर्ट, अवैध संपत्ति जब्ती।" } },
    { title: { en: "Public Audit", hi: "सार्वजनिक ऑडिट" }, body: { en: "Every major policy must answer with data, not slogans.", hi: "हर बड़ी नीति डेटा से जवाब दे, नारों से नहीं।" } },
    { title: { en: "Jobs", hi: "रोजगार" }, body: { en: "Manufacturing, apprenticeships, startups, local enterprise.", hi: "मैन्युफैक्चरिंग, अप्रेंटिसशिप, स्टार्टअप, लोकल उद्यम।" } },
    { title: { en: "Digital Government", hi: "डिजिटल सरकार" }, body: { en: "One citizen app, 7-day complaint resolution, paperless offices.", hi: "एक नागरिक ऐप, 7 दिन शिकायत समाधान, पेपरलेस ऑफिस।" } },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <PageEyebrow value={{ en: "Manifesto Quick View", hi: "घोषणापत्र संक्षेप" }} mode={mode} />
          <PageTitle value={{ en: "Six promises. One direction.", hi: "छह वादे। एक दिशा।" }} mode={mode} />
        </div>
        <button
          onClick={() => setPage("manifesto")}
          className="magnetic-btn rounded-full bg-black px-8 py-4 text-base font-black text-white hover:apple-gradient-bg hover:text-black"
        >
          Read Full Manifesto →
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {quickCards.map((card) => (
          <div key={card.title.en} className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-6">
            <h3 className="text-2xl font-black tracking-[-0.04em]">
              <BilingualText value={card.title} mode={mode} hiClassName="text-xs leading-4" />
            </h3>
            <p className="mt-4 text-sm font-bold leading-6 text-black/65">
              <BilingualText value={card.body} mode={mode} hiClassName="text-[11px] leading-4" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterSection({ mode }: { mode: LangMode }) {
  const today: I18n[] = [
    { en: "Paper leaks", hi: "पेपर लीक" },
    { en: "Corruption", hi: "भ्रष्टाचार" },
    { en: "Unpaid overtime", hi: "बिना भुगतान ओवरटाइम" },
    { en: "Political luxury", hi: "नेताओं की विलासिता" },
  ];
  const tomorrow: I18n[] = [
    { en: "Fair exams", hi: "निष्पक्ष परीक्षा" },
    { en: "Public audits", hi: "सार्वजनिक ऑडिट" },
    { en: "Paid overtime", hi: "भुगतान वाला ओवरटाइम" },
    { en: "Accountable leaders", hi: "जवाबदेह नेता" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[3.25rem] border border-black/10 bg-white/80 p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-black/40">Today</p>
          <div className="mt-6 grid gap-4">
            {today.map((item) => (
              <p key={item.en} className="text-3xl font-black tracking-[-0.04em] text-black/70">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4" />
              </p>
            ))}
          </div>
        </div>
        <div className="apple-gradient-bg rounded-[3.25rem] border border-black/10 p-8 shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-black/45">Our India</p>
          <div className="mt-6 grid gap-4">
            {tomorrow.map((item) => (
              <p key={item.en} className="text-3xl font-black tracking-[-0.04em] text-black">
                <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnnouncementBar() {
  return (
    <div className="border-b border-black/10 apple-gradient-bg px-6 py-3 text-center text-sm font-black text-black">
      Janata First. Power Accountable. Follow the movement on Instagram.
    </div>
  );
}

function MovementCounterSection({ mode }: { mode: LangMode }) {
  const counters: I18n[] = [
    { en: "0 Rupee Corruption Tolerance", hi: "भ्रष्टाचार पर शून्य सहनशीलता" },
    { en: "5-Day Work Week Demand", hi: "5 दिन कार्य सप्ताह मांग" },
    { en: "100-Day Action Plan", hi: "100 दिन कार्य योजना" },
    { en: "2047 India Vision", hi: "2047 भारत दृष्टि" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-4 md:grid-cols-4">
        {counters.map((item) => (
          <div
            key={item.en}
            className="reveal-card micro-lift shine-card soft-gradient-glow rounded-[2.25rem] border border-black/10 apple-gradient-bg p-6 text-center shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
          >
            <p className="text-xl font-black leading-7 tracking-[-0.04em] text-black">
              <BilingualText value={item} mode={mode} hiClassName="text-xs leading-4 text-black/55" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyMovementExistsSection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <PageEyebrow value={{ en: "Why This Movement Exists", hi: "यह आंदोलन क्यों है" }} mode={mode} />
          <PageTitle value={{ en: "For ordinary Indians who survive pressure every day.", hi: "उन आम भारतीयों के लिए जो हर दिन दबाव झेलते हैं।" }} mode={mode} />
        </div>
        <div className="reveal-card rounded-[2.25rem] border border-black/10 bg-[#fafafa] p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
          <p className="text-base font-bold leading-7 text-black/70">
            <BilingualText
              value={{
                en: "This movement is for students, employees, farmers, small business owners, taxpayers, and families who survive pressure every day. The cockroach symbol means survival, adaptability, discipline, and refusal to disappear. We are not here for hate politics. We are here for accountability, jobs, education, justice, and public dignity.",
                hi: "यह आंदोलन छात्रों, कर्मचारियों, किसानों, छोटे व्यापारियों, टैक्सपेयर्स और परिवारों के लिए है जो हर दिन दबाव झेलते हैं। कॉकरोच प्रतीक संघर्ष, अनुकूलन, अनुशासन और हार न मानने का प्रतीक है। हम नफरत की राजनीति के लिए नहीं, जवाबदेही, रोजगार, शिक्षा, न्याय और जनसम्मान के लिए हैं।",
              }}
              mode={mode}
              hiClassName="text-xs leading-4"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

function JanataPainPointsSection({ mode }: { mode: LangMode }) {
  const painPoints: I18n[] = [
    { en: "Unemployment after education", hi: "पढ़ाई के बाद बेरोजगारी" },
    { en: "Paper leaks and delayed exams", hi: "पेपर लीक और परीक्षा देरी" },
    { en: "Toxic private-sector work culture", hi: "निजी क्षेत्र की विषाक्त कार्य संस्कृति" },
    { en: "Unpaid overtime", hi: "बिना भुगतान ओवरटाइम" },
    { en: "Rising fuel and living costs", hi: "बढ़ती ईंधन और जीवन लागत" },
    { en: "Corruption in local offices", hi: "स्थानीय कार्यालयों में भ्रष्टाचार" },
    { en: "Expensive healthcare", hi: "महंगा स्वास्थ्य इलाज" },
    { en: "Poor roads, drainage, and garbage systems", hi: "खराब सड़क, ड्रेनेज और कचरा व्यवस्था" },
    { en: "Political luxury while citizens struggle", hi: "जनता संघर्ष में, नेता विलासिता में" },
    { en: "No accountability after failed policies", hi: "असफल नीतियों के बाद जवाबदेही नहीं" },
  ];

  return (
    <section className="border-y border-black/10 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-4xl">
          <PageEyebrow value={{ en: "What Ordinary Indians Are Facing", hi: "आम भारतीय क्या झेल रहे हैं" }} mode={mode} />
          <PageTitle value={{ en: "Real problems, not empty slogans.", hi: "वास्तविक समस्याएं, खाली नारे नहीं।" }} mode={mode} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {painPoints.map((item) => (
            <div key={item.en} className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-sm font-black leading-6 text-black/75">
                <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4" />
              </p>
            </div>
          ))}
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

function StudentFirstHomeSection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[3.25rem] border border-black/10 bg-black p-8 text-white shadow-2xl md:p-10">
        <PageEyebrow value={{ en: "Student First Movement", hi: "छात्र प्रथम आंदोलन" }} mode={mode} />
        <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
          <BilingualText
            value={{ en: "No nation becomes powerful by ignoring students.", hi: "छात्रों को नजरअंदाज करके कोई राष्ट्र शक्तिशाली नहीं बनता।" }}
            mode={mode}
            hiClassName="text-lg leading-6 text-white/35 tracking-normal md:text-2xl"
          />
        </h2>
        <p className="mt-8 max-w-4xl text-base font-bold leading-7 text-white/70">
          <BilingualText
            value={{
              en: "Our first government priority will be students: fair exams, no paper leaks, fast results, job-linked education, internships, mental health support, affordable colleges, and direct student councils at district, state, and national level.",
              hi: "हमारी पहली सरकारी प्राथमिकता छात्र होंगे: निष्पक्ष परीक्षा, पेपर लीक बंद, तेज परिणाम, नौकरी से जुड़ी शिक्षा, इंटर्नशिप, मानसिक स्वास्थ्य सहायता, किफायती कॉलेज और जिला, राज्य व राष्ट्रीय स्तर पर छात्र परिषद।",
            }}
            mode={mode}
            hiClassName="text-xs leading-4 text-white/35"
          />
        </p>
      </div>
    </section>
  );
}

function WorkerRightsHomeSection({ mode }: { mode: LangMode }) {
  const demands: I18n[] = [
    { en: "5-day work week", hi: "5 दिन का कार्य सप्ताह" },
    { en: "Paid overtime", hi: "भुगतान वाला ओवरटाइम" },
    { en: "No forced weekend work", hi: "जबरन वीकेंड काम नहीं" },
    { en: "Labour law audits", hi: "श्रम कानून ऑडिट" },
    { en: "Protection from toxic managers", hi: "विषाक्त मैनेजरों से सुरक्षा" },
    { en: "Fast employee complaint system", hi: "तेज कर्मचारी शिकायत प्रणाली" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          <PageEyebrow value={{ en: "Private Employee Rights Movement", hi: "निजी कर्मचारी अधिकार आंदोलन" }} mode={mode} />
          <PageTitle value={{ en: "Private employees are also nation builders.", hi: "निजी कर्मचारी भी राष्ट्र निर्माता हैं।" }} mode={mode} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {demands.map((item) => (
            <div key={item.en} className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-sm font-black leading-6 text-black/75">
                <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovementRulesSection({ mode }: { mode: LangMode }) {
  const rules: I18n[] = [
    { en: "No hate politics", hi: "नफरत की राजनीति नहीं" },
    { en: "No caste or religion targeting", hi: "जाति या धर्म को निशाना नहीं" },
    { en: "No fake news", hi: "फेक न्यूज़ नहीं" },
    { en: "No violence", hi: "हिंसा नहीं" },
    { en: "No paid propaganda", hi: "पेड प्रोपेगैंडा नहीं" },
    { en: "Only citizen issues, evidence, and accountability", hi: "केवल नागरिक मुद्दे, प्रमाण और जवाबदेही" },
  ];

  return (
    <section className="border-y border-black/10 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-4xl">
          <PageEyebrow value={{ en: "Movement Rules", hi: "आंदोलन के नियम" }} mode={mode} />
          <PageTitle value={{ en: "Discipline before politics.", hi: "राजनीति से पहले अनुशासन।" }} mode={mode} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule) => (
            <div key={rule.en} className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-sm font-black leading-6 text-black/75">
                ✓ <BilingualText value={rule} mode={mode} hiClassName="text-[11px] leading-4" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HundredDayPlanSection({ mode }: { mode: LangMode }) {
  const actions: I18n[] = [
    { en: "Public expense dashboard", hi: "सार्वजनिक खर्च डैशबोर्ड" },
    { en: "Leader asset verification", hi: "नेताओं की संपत्ति जांच" },
    { en: "Student paper leak law", hi: "पेपर लीक कानून" },
    { en: "Private overtime complaint portal", hi: "निजी ओवरटाइम शिकायत पोर्टल" },
    { en: "Fuel price audit", hi: "ईंधन मूल्य ऑडिट" },
    { en: "Government recruitment calendar", hi: "सरकारी भर्ती कैलेंडर" },
    { en: "Corruption fast-track courts", hi: "भ्रष्टाचार फास्ट-ट्रैक कोर्ट" },
    { en: "District problem dashboards", hi: "जिला समस्या डैशबोर्ड" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <div>
          <PageEyebrow value={{ en: "First 100 Days If Given Power", hi: "सत्ता मिलने पर पहले 100 दिन" }} mode={mode} />
          <PageTitle value={{ en: "Action, not speeches.", hi: "भाषण नहीं, कार्रवाई।" }} mode={mode} />
        </div>
        <p className="text-base font-bold leading-7 text-black/65">
          <BilingualText
            value={{
              en: "The first 100 days must prove whether politics is serious about accountability, students, workers, jobs, and clean governance.",
              hi: "पहले 100 दिन साबित करेंगे कि राजनीति जवाबदेही, छात्रों, कर्मचारियों, रोजगार और स्वच्छ शासन को लेकर गंभीर है या नहीं।",
            }}
            mode={mode}
            hiClassName="text-xs leading-4"
          />
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => (
          <div key={action.en} className="reveal-card micro-lift shine-card glass-card rounded-[2.25rem] border border-black/10 p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
            <p className="text-sm font-black text-black/35">Day Plan {String(index + 1).padStart(2, "0")}</p>
            <p className="mt-3 text-sm font-black leading-6 text-black/75">
              <BilingualText value={action} mode={mode} hiClassName="text-[11px] leading-4" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReportLocalIssueSection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="glass-card rounded-[3.25rem] border border-black/10 p-8 text-center shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl md:p-10">
        <PageEyebrow value={{ en: "Report Public Problems", hi: "जन समस्याएं भेजें" }} mode={mode} />
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
          <BilingualText
            value={{
              en: "Send issues or corruption videos on Instagram.",
              hi: "समस्याएं या भ्रष्टाचार वीडियो Instagram पर भेजें।",
            }}
            mode={mode}
            hiClassName="text-lg leading-6 tracking-normal md:text-2xl"
          />
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base font-bold leading-7 text-black/65">
          <BilingualText
            value={{
              en: "Bad roads, corruption, drainage, garbage, exam delays, hospital problems, local injustice, public office harassment, or corruption videos — send evidence, location, date, and short details to our Instagram.",
              hi: "खराब सड़क, भ्रष्टाचार, ड्रेनेज, कचरा, परीक्षा देरी, अस्पताल समस्या, स्थानीय अन्याय, सरकारी कार्यालय उत्पीड़न या भ्रष्टाचार वीडियो — प्रमाण, स्थान, तारीख और छोटी जानकारी Instagram पर भेजें।",
            }}
            mode={mode}
            hiClassName="text-xs leading-4"
          />
        </p>
        <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-black/10 apple-gradient-bg p-4 text-left text-xs font-black leading-5 text-black">
          Safety note: Do not put yourself in danger while recording. Share only truthful, lawful, and evidence-based information.
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center magnetic-btn rounded-full bg-black px-8 py-4 text-base font-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:apple-gradient-bg hover:text-black hover:shadow-xl"
          >
            Send Issue or Corruption Video ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function PublicAccountabilitySection({ mode }: { mode: LangMode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="apple-borderless apple-gradient-bg overflow-hidden rounded-[3.75rem] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <PageEyebrow value={{ en: "Top 5 Public Accountability Audits", hi: "शीर्ष 5 सार्वजनिक जवाबदेही जांच" }} mode={mode} />
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              <BilingualText
                value={{
                  en: "Power must answer when people suffer.",
                  hi: "जनता कष्ट झेले तो सत्ता जवाब दे।",
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
                  en: "Not slogans. Not excuses. Public data, legal process, and citizen-first audits.",
                  hi: "नारे नहीं। बहाने नहीं। सार्वजनिक डेटा, कानूनी प्रक्रिया और नागरिक-प्रथम ऑडिट।",
                }}
                mode={mode}
                hiClassName="text-sm leading-5 text-black/55 md:text-lg"
              />
            </p>
            <p className="mt-5 text-sm font-bold leading-6 text-black/65">
              <BilingualText
                value={{
                  en: "Every major policy that affected common citizens must be reviewed with data, documents, public hearings, and due process.",
                  hi: "आम नागरिकों को प्रभावित करने वाली हर बड़ी नीति की डेटा, दस्तावेज, सार्वजनिक सुनवाई और कानूनी प्रक्रिया से समीक्षा हो।",
                }}
                mode={mode}
                hiClassName="text-[11px] leading-4 text-black/55"
              />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {publicAccountabilityIssues.map((issue, index) => (
            <div
              key={issue.title.en}
              className="reveal-card micro-lift shine-card apple-clean-card rounded-[2.75rem] bg-white/75 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-black text-xl font-black text-white shadow-xl">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-black leading-[1.02] tracking-[-0.05em] text-black">
                <BilingualText value={issue.title} mode={mode} hiClassName="text-sm leading-5 tracking-normal text-black/55" />
              </h3>
              <p className="mt-5 text-sm font-bold leading-6 text-black/68">
                <BilingualText value={issue.explanation} mode={mode} hiClassName="text-[11px] leading-4 text-black/55" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PoliticianLifestyleSection({ mode }: { mode: LangMode }) {
  return (
    <section className="border-y border-black/10 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <PageEyebrow value={{ en: "Rich Life of Politicians", hi: "नेताओं की अमीर जीवनशैली" }} mode={mode} />
            <PageTitle value={{ en: "Public service cannot become private luxury.", hi: "जनसेवा निजी विलासिता नहीं बन सकती।" }} mode={mode} />
          </div>
          <div className="grid gap-4">
            {politicianLifestylePromises.map((item, index) => (
              <div key={item.en} className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
                <p className="text-sm font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm font-bold leading-6 text-black/75">
                  <BilingualText value={item} mode={mode} hiClassName="text-[11px] leading-4" />
                </p>
              </div>
            ))}
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
              <div key={item.en} className="rounded-[2.25rem] border border-white/10 bg-white/5 p-5 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10">
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
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToPage = (page: PageId) => {
    setActivePage(page);
    setTimeout(scrollToTop, 50);
  };

  const scrollToJoin = () => {
    setActivePage("home");
    setTimeout(() => {
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const pageTitle = useMemo(() => {
    if (activePage === "privacy") return { en: "Privacy", hi: "गोपनीयता" };
    const found = navItems.find((item) => item.id === activePage);
    return found?.label ?? { en: "Home", hi: "होम" };
  }, [activePage]);

  return (
    <main
      className="min-h-screen bg-white text-[#0f0f0f] tracking-[-0.01em]"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", Arial, "Noto Sans Devanagari", sans-serif',
        "--scroll-y": `${scrollY}px`,
      } as React.CSSProperties}
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
            radial-gradient(circle at 18% 18%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.48) 18%, transparent 38%),
            linear-gradient(135deg, #E9FFE8 0%, #B6FF00 30%, #7CFF6B 58%, #D8FF7A 78%, #F6FFE8 100%);
          background-size: 180% 180%;
          color: #071107;
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
          box-shadow: 0 28px 90px rgba(0,0,0,0.08);
        }
        .apple-clean-card {
          border-color: transparent !important;
          box-shadow: 0 18px 55px rgba(0,0,0,0.055);
        }
        .apple-clean-pill {
          border-color: transparent !important;
          box-shadow: 0 10px 28px rgba(0,0,0,0.055);
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
          transition: transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease, background-color 260ms ease;
        }
        .micro-lift:hover {
          transform: translateY(-8px) scale(1.012) rotateX(1deg);
          border-color: rgba(0, 0, 0, 0.18);
        }
        .micro-lift:active { transform: translateY(-2px) scale(0.995); }
        .magnetic-btn {
          position: relative;
          overflow: hidden;
          transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease, color 220ms ease, border-color 220ms ease;
        }
        .magnetic-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.42) 48%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 520ms ease;
          pointer-events: none;
        }
        .magnetic-btn:hover { transform: translateY(-3px) scale(1.03); }
        .magnetic-btn:hover::after { transform: translateX(120%); }
        .magnetic-btn:active { transform: translateY(0) scale(0.97); }
        .nav-link {
          position: relative;
          padding-bottom: 6px;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #0B8F36, #B6FF00, #64E986);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 240ms ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }
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
        .cockroach-pointer {
          pointer-events: none;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 80;
          height: 32px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.82;
          filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.24));
          transition: transform 45ms linear, opacity 160ms ease, filter 180ms ease;
          transform-origin: 7px 7px;
        }
        .cockroach-pointer-hidden {
          opacity: 0;
        }
        .cockroach-pointer-active {
          opacity: 1;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.28)) drop-shadow(0 0 12px rgba(182,255,0,0.38));
        }
        .cockroach-pointer svg {
          overflow: visible;
        }
        .cursor-antenna {
          stroke: #050505;
          stroke-width: 4;
          stroke-linecap: round;
          fill: none;
          filter: drop-shadow(0 0 7px rgba(182,255,0,0.72));
        }
        .cursor-leg {
          stroke: #050505;
          stroke-width: 9;
          stroke-linecap: round;
          fill: none;
          transform-box: fill-box;
          transform-origin: center;
        }
        .cursor-wing-left,
        .cursor-wing-right {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0.94;
        }
        @keyframes cockroachWalkBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-1.4px) rotate(1.2deg); }
        }
        @keyframes legWalkA {
          0%, 100% { transform: rotate(-24deg) translateY(0) translateX(0); }
          50% { transform: rotate(34deg) translateY(-7px) translateX(4px); }
        }
        @keyframes legWalkB {
          0%, 100% { transform: rotate(28deg) translateY(-3px) translateX(0); }
          50% { transform: rotate(-32deg) translateY(5px) translateX(-4px); }
        }
        @keyframes wingFlutterLeft {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-8deg) translateY(-0.8px); }
        }
        @keyframes wingFlutterRight {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(8deg) translateY(-0.8px); }
        }
        @keyframes cursorFeelers {
          0%, 100% { transform: rotate(-10deg) translateX(0); }
          25% { transform: rotate(18deg) translateX(7px); }
          50% { transform: rotate(-22deg) translateX(-5px); }
          75% { transform: rotate(14deg) translateX(5px); }
        }
        .cockroach-pointer-moving svg {
          animation: cockroachWalkBob 0.38s ease-in-out infinite;
        }
        .cockroach-pointer-moving .cursor-wing-left {
          animation: wingFlutterLeft 0.48s ease-in-out infinite;
        }
        .cockroach-pointer-moving .cursor-wing-right {
          animation: wingFlutterRight 0.48s ease-in-out infinite;
        }
        .cockroach-pointer-moving .cursor-antenna {
          transform-origin: 94px 42px;
          animation: cursorFeelers 0.34s ease-in-out infinite;
        }
        .cockroach-pointer-moving .cursor-antenna-b { animation-delay: 0.08s; }
        .cockroach-pointer-moving .cursor-antenna-c { animation-delay: 0.14s; }
        .cockroach-pointer-moving .cursor-leg-a,
        .cockroach-pointer-moving .cursor-leg-c,
        .cockroach-pointer-moving .cursor-leg-e {
          animation: legWalkA 0.18s ease-in-out infinite;
        }
        .cockroach-pointer-moving .cursor-leg-b,
        .cockroach-pointer-moving .cursor-leg-d,
        .cockroach-pointer-moving .cursor-leg-f {
          animation: legWalkB 0.18s ease-in-out infinite;
        }
        .cockroach-trail-dot {
          pointer-events: none;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 78;
          height: 6px;
          width: 6px;
          border-radius: 9999px;
          background: #B6FF00;
          box-shadow: 0 0 16px rgba(182,255,0,0.75);
          transition: transform 80ms linear, opacity 220ms ease;
        }
        .cursor-action-label {
          position: absolute;
          left: 28px;
          top: -12px;
          border-radius: 9999px;
          background: #071107;
          color: #B6FF00;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 1000;
          letter-spacing: -0.02em;
          box-shadow: 0 14px 34px rgba(0,0,0,0.18);
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .cockroach-pointer,
          .cockroach-trail-dot { display: none; }
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
        section { animation: softScale 0.55s ease-out both; }
        .reveal-card { animation: fadeUp 0.7s ease-out both; }
        button, select, input, textarea, a {
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
        }
        button:hover, select:hover, input:focus, textarea:focus, a:hover { transform: translateY(-1px); }
      `}</style>
      <ScrollProgressBar progress={scrollProgress} />
      <div className="premium-soft-background" aria-hidden="true" />
      <CockroachCursor />

      <AnnouncementBar />

      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">
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

          <div className="hidden items-center gap-5 text-sm font-bold text-black/60 xl:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`nav-link hover:text-black ${activePage === item.id ? "text-black" : ""}`}
              >
                <BilingualText value={item.label} mode={mode} hiClassName="text-[10px] leading-3" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value as LangMode)}
              className="magnetic-btn rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-black outline-none"
              aria-label="Language mode"
            >
              <option value="both">English + हिंदी</option>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            <button
              onClick={scrollToJoin}
              className="magnetic-btn rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:apple-gradient-bg hover:text-black hover:shadow-xl"
            >
              Join
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 pb-4 xl:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateToPage(item.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black ${activePage === item.id ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/65"}`}
            >
              {mode === "hi" ? item.label.hi : item.label.en}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-b border-black/10 bg-[#fafafa] px-6 py-4 text-center text-sm font-black text-black/45">
        Current page: {pageTitle.en}
        {mode !== "en" && <HindiShadow text={pageTitle.hi} className="text-[10px]" />}
      </div>

      {activePage === "home" && <HomePage mode={mode} setPage={navigateToPage} scrollToJoin={scrollToJoin} />}
      {activePage === "manifesto" && <ManifestoPage mode={mode} />}
      {activePage === "about" && <AboutPage mode={mode} />}
      {activePage === "constitution" && <ConstitutionPage mode={mode} />}
      {activePage === "student" && <FocusPage mode={mode} sectionId="student-first" eyebrow={{ en: "Student First Government", hi: "छात्र प्रथम सरकार" }} />}
      {activePage === "antiCorruption" && <FocusPage mode={mode} sectionId="asset-verification" eyebrow={{ en: "Anti-Corruption Guarantee", hi: "भ्रष्टाचार विरोध गारंटी" }} />}
      {activePage === "privacy" && <PrivacyPage mode={mode} />}
      <PoliticianLifestyleSection mode={mode} />

      <footer className="border-t border-black/10 px-6 py-14 text-center text-sm font-bold text-black/45">
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

          <div className="mx-auto mb-8 flex max-w-7xl flex-wrap justify-center gap-3">
            {[...navItems, { id: "privacy" as PageId, label: { en: "Privacy", hi: "गोपनीयता" } }].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className="magnetic-btn rounded-full border border-black/10 bg-white/70 px-4 py-2 hover:bg-black hover:text-white"
              >
                {mode === "hi" ? item.label.hi : item.label.en}
              </button>
            ))}
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex rounded-full bg-black px-8 py-4 text-base font-black text-white hover:apple-gradient-bg hover:text-black"
          >
            Follow / Report Issue →
          </a>

          <div className="mt-8">
            <span>
              © 2026 Cockroach India Party. Public movement website draft. Add official registration details only after legal registration.
            </span>
            {mode !== "en" ? (
              <HindiShadow
                text="© 2026 कॉकरोच इंडिया पार्टी। सार्वजनिक आंदोलन वेबसाइट ड्राफ्ट। कानूनी पंजीकरण के बाद ही आधिकारिक विवरण जोड़ें।"
                className="text-[10px]"
              />
            ) : null}
          </div>
        </div>
      </footer>
    </main>
  );
}
