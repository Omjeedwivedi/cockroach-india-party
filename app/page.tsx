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

const recommendedMetadata = {
  title: "Cockroach India Party | India First, Citizens First",
  description:
    "Cockroach India Party is a future-first political movement focused on jobs, education, technology, justice, anti-corruption, student-first governance, worker rights, and India 2047.",
  ogImage: "/party-icon.jpeg",
};

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
        en: "Every government expense must be visible publicly in real time through a simple digital dashboard, so citizens can see where tax money is going and which department is responsible for each rupee spent.",
        hi: "हर सरकारी खर्च रियल टाइम डिजिटल डैशबोर्ड पर जनता को दिखे ताकि नागरिक जान सकें टैक्स का पैसा कहां जा रहा है।",
      },
      {
        en: "Fast-track anti-corruption courts must decide proven corruption cases within 6 months, with no endless delays, political protection, or misuse of procedure.",
        hi: "साबित भ्रष्टाचार मामलों का फैसला 6 महीने में हो, बिना देरी, संरक्षण या प्रक्रिया के दुरुपयोग के।",
      },
      {
        en: "All government tenders must be digital, transparent, searchable, and monitored by AI systems that flag unusual pricing, favoritism, repeated vendors, and suspicious contract patterns.",
        hi: "सभी टेंडर डिजिटल, पारदर्शी और AI निगरानी में हों ताकि गड़बड़ी और पक्षपात पकड़े जा सकें।",
      },
      {
        en: "Every minister and senior public official must publish yearly performance reports with targets, budgets, delays, delivery status, and citizen impact in simple language.",
        hi: "हर मंत्री और वरिष्ठ अधिकारी लक्ष्य, बजट, देरी और नागरिक प्रभाव सहित सालाना रिपोर्ट सार्वजनिक करे।",
      },
      {
        en: "Any public representative convicted in a proven corruption case must face a lifetime ban from active politics, government contracts, and public office responsibilities.",
        hi: "भ्रष्टाचार में दोषी जनप्रतिनिधि को राजनीति, सरकारी ठेकों और सार्वजनिक पदों से आजीवन प्रतिबंध मिले।",
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
      en: "Every political leader, minister, senior official, and party office-bearer must face strict asset verification and real punishment for corruption.",
      hi: "हर नेता, मंत्री और अधिकारी की संपत्ति जांच हो और भ्रष्टाचार पर वास्तविक सजा मिले।",
    },
    points: [
      {
        en: "All leaders of every political party must submit yearly public asset declarations covering personal assets, family-linked assets, business interests, land, companies, trusts, and major transactions.",
        hi: "हर दल के नेता अपनी निजी, पारिवारिक, व्यापारिक, जमीन, कंपनी, ट्रस्ट और बड़े लेनदेन की सालाना घोषणा करें।",
      },
      {
        en: "A dedicated CID-led asset verification unit must investigate suspicious income growth, benami property, unexplained wealth, shell companies, tender links, and political-business connections.",
        hi: "CID आधारित संपत्ति जांच इकाई संदिग्ध आय, बेनामी संपत्ति, शेल कंपनी और टेंडर लिंक की जांच करे।",
      },
      {
        en: "If any leader, minister, party official, or government-linked person is convicted in a corruption case after due legal process, the minimum punishment must include 10 years of jail.",
        hi: "कानूनी प्रक्रिया के बाद भ्रष्टाचार में दोषी नेता या अधिकारी को न्यूनतम 10 साल जेल की सजा मिले।",
      },
      {
        en: "Assets earned through corruption must be seized, including benami assets, linked business holdings, illegal land, cash, luxury properties, and assets transferred to relatives or associates.",
        hi: "भ्रष्टाचार से कमाई बेनामी संपत्ति, कारोबार, जमीन, नकद, लग्जरी संपत्ति और रिश्तेदारों को दी गई संपत्ति जब्त हो।",
      },
      {
        en: "Any person convicted of corruption must face a lifetime ban from contesting elections, holding party posts, receiving government contracts, or influencing public appointments.",
        hi: "भ्रष्टाचार में दोषी व्यक्ति चुनाव, पार्टी पद, सरकारी ठेका और सार्वजनिक नियुक्तियों से आजीवन प्रतिबंधित हो।",
      },
    ],
  },
  {
    id: "student-first",
    icon: "🎓",
    title: { en: "Student First Government", hi: "छात्र प्रथम सरकार" },
    goal: {
      en: "Build a government where students, youth, and future generations are treated as the first priority of national development.",
      hi: "ऐसी सरकार बने जहां छात्र, युवा और भविष्य की पीढ़ी राष्ट्रीय विकास की पहली प्राथमिकता हों।",
    },
    points: [
      {
        en: "Every major policy must be evaluated on how it improves the future of students, including education quality, employability, affordability, safety, mental health, and access to technology.",
        hi: "हर नीति को इस आधार पर परखा जाए कि वह छात्रों की शिक्षा, रोजगार, सुरक्षा और तकनीकी पहुंच कैसे सुधारती है।",
      },
      {
        en: "A Student First Council must be created at national, state, and district level where students can directly raise problems related to colleges, exams, skills, hostels, fees, internships, and jobs.",
        hi: "राष्ट्रीय, राज्य और जिला स्तर पर Student First Council बने जहां छात्र अपनी समस्याएं सीधे उठा सकें।",
      },
      {
        en: "Exam delays, paper leaks, unfair recruitment delays, fake colleges, poor teaching quality, and harassment must be treated as governance failures with fixed accountability.",
        hi: "पेपर लीक, परीक्षा देरी, भर्ती देरी, फर्जी कॉलेज और खराब पढ़ाई को शासन की विफलता माना जाए।",
      },
      {
        en: "Public universities and colleges must become innovation hubs where students can build startups, research projects, social impact solutions, and local problem-solving platforms.",
        hi: "सरकारी कॉलेज और विश्वविद्यालय इनोवेशन हब बनें जहां छात्र स्टार्टअप और रिसर्च प्रोजेक्ट बना सकें।",
      },
      {
        en: "The budget must prioritize education, skills, research, sports, mental health, digital access, and youth employment before unnecessary political spending.",
        hi: "बजट में शिक्षा, कौशल, रिसर्च, खेल, मानसिक स्वास्थ्य, डिजिटल पहुंच और युवा रोजगार को प्राथमिकता मिले।",
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
        en: "Free high-quality education from KG to graduation must be available for deserving students, especially poor and lower-middle-class families who lose opportunities due to cost.",
        hi: "योग्य छात्रों को KG से ग्रेजुएशन तक मुफ्त उच्च गुणवत्ता शिक्षा मिले, खासकर गरीब और निम्न मध्यम वर्ग को।",
      },
      {
        en: "AI, coding, finance, robotics, communication skills, public speaking, and problem-solving must start from Class 6, so children learn future skills early.",
        hi: "कक्षा 6 से AI, कोडिंग, वित्त, रोबोटिक्स, संवाद कौशल और समस्या समाधान सिखाया जाए।",
      },
      {
        en: "Every student must become fluent in English plus one regional language, giving them both global employability and strong cultural identity.",
        hi: "हर छात्र अंग्रेजी और एक क्षेत्रीय भाषा में दक्ष बने ताकि रोजगार और सांस्कृतिक पहचान दोनों मजबूत हों।",
      },
      {
        en: "Every district must get one world-class government university or skill campus with modern labs, digital libraries, industry partnerships, and career-oriented programs.",
        hi: "हर जिले में आधुनिक लैब, डिजिटल लाइब्रेरी और उद्योग साझेदारी वाला विश्वस्तरीय सरकारी विश्वविद्यालय या कौशल कैंपस बने।",
      },
      {
        en: "The education system must move from rote memorization to skill-based learning with projects, internships, vocational training, portfolios, and real-world problem solving.",
        hi: "शिक्षा रटने से हटकर प्रोजेक्ट, इंटर्नशिप, कौशल और वास्तविक समस्या समाधान पर आधारित हो।",
      },
    ],
  },
  {
    id: "jobs-economy",
    icon: "🏭",
    title: { en: "Jobs & Economy", hi: "रोजगार और अर्थव्यवस्था" },
    goal: {
      en: "Create 100 million high-paying jobs and make India a global production, services, and innovation powerhouse.",
      hi: "10 करोड़ उच्च वेतन वाली नौकरियां और भारत को उत्पादन, सेवा और नवाचार शक्ति बनाना।",
    },
    points: [
      {
        en: "India must launch a massive manufacturing push focused on electronics, chips, EVs, defense, robotics, renewable energy, medical devices, and export-ready industrial clusters.",
        hi: "इलेक्ट्रॉनिक्स, चिप्स, EV, रक्षा, रोबोटिक्स और निर्यात क्लस्टर पर मजबूत मैन्युफैक्चरिंग नीति बने।",
      },
      {
        en: "Companies that create verified jobs in India must receive tax benefits, faster approvals, infrastructure support, and hiring incentives linked to employment generation.",
        hi: "भारत में वास्तविक नौकरियां बनाने वाली कंपनियों को टैक्स लाभ, तेज अनुमतियां और भर्ती प्रोत्साहन मिले।",
      },
      {
        en: "Youth startup funding must be available without collateral for serious founders, with mentorship, market access, public procurement opportunities, and transparent funding stages.",
        hi: "गंभीर युवा उद्यमियों को बिना गारंटी स्टार्टअप फंडिंग, मेंटरशिप और बाजार पहुंच मिले।",
      },
      {
        en: "GST filing, business registration, licenses, and basic compliance must be simplified so a small business can legally start operations within 24 hours.",
        hi: "GST, रजिस्ट्रेशन और लाइसेंस इतने सरल हों कि छोटा व्यवसाय 24 घंटे में कानूनी रूप से शुरू हो सके।",
      },
      {
        en: "A government-backed apprenticeship program must connect freshers with companies, pay a basic stipend, and convert practical work experience into full-time jobs.",
        hi: "सरकारी अप्रेंटिसशिप प्रोग्राम फ्रेशर्स को कंपनियों से जोड़े और अनुभव को नौकरी में बदले।",
      },
    ],
  },
  {
    id: "worker-rights",
    icon: "👥",
    title: { en: "Private Sector Jobs & Worker Rights", hi: "निजी क्षेत्र रोजगार और कर्मचारी अधिकार" },
    goal: {
      en: "Protect private employees from exploitation, unpaid overtime, unhealthy work culture, and weak labour law enforcement.",
      hi: "निजी कर्मचारियों को शोषण, बिना भुगतान ओवरटाइम और कमजोर श्रम कानून से बचाना।",
    },
    points: [
      {
        en: "A 5-day work week must become the standard across every sector and every company, with exceptions only for essential services where employees receive proper rotation and compensation.",
        hi: "हर सेक्टर और हर कंपनी में 5 दिन का कार्य सप्ताह मानक बने, आवश्यक सेवाओं में रोटेशन और मुआवजा मिले।",
      },
      {
        en: "If employees work beyond legal working hours, companies must provide extra compensation, overtime pay, or legally approved time-off benefits as per labour law.",
        hi: "कानूनी समय से अधिक काम पर कंपनी श्रम कानून के अनुसार ओवरटाइम या वैध टाइम-ऑफ दे।",
      },
      {
        en: "Dedicated labour law action teams must verify company compliance through audits, employee feedback, digital attendance checks, salary records, and anonymous complaints.",
        hi: "विशेष श्रम कानून टीम ऑडिट, फीडबैक, डिजिटल अटेंडेंस और गुमनाम शिकायतों से अनुपालन जांचे।",
      },
      {
        en: "A fast complaint system must protect employees facing unpaid overtime, forced extra hours, illegal weekend work, salary delay, toxic managers, and pressure to work without written approval.",
        hi: "तेज शिकायत प्रणाली बिना भुगतान ओवरटाइम, अवैध वीकेंड काम और दबाव से कर्मचारियों को बचाए।",
      },
      {
        en: "Companies repeatedly violating employee rights must face strict penalties, public compliance ratings, contract restrictions, and stronger legal action.",
        hi: "बार-बार अधिकार तोड़ने वाली कंपनियों पर जुर्माना, सार्वजनिक रेटिंग, ठेका प्रतिबंध और कानूनी कार्रवाई हो।",
      },
    ],
  },
  {
    id: "ai-tech",
    icon: "🤖",
    title: { en: "AI & Technology Superpower", hi: "AI और तकनीक महाशक्ति" },
    goal: {
      en: "Make India the global AI capital and build technology platforms owned, trusted, and led by Indians.",
      hi: "भारत को वैश्विक AI राजधानी और भारतीय नेतृत्व वाली तकनीकी शक्ति बनाना।",
    },
    points: [
      {
        en: "A National AI Mission must operate in every university with practical labs, AI computing access, research grants, open datasets, student projects, and industry challenges.",
        hi: "हर विश्वविद्यालय में AI लैब, कंप्यूटिंग, रिसर्च ग्रांट, ओपन डेटा और उद्योग चुनौतियों वाला मिशन हो।",
      },
      {
        en: "India must build strong domestic alternatives to foreign AI tools, cloud platforms, operating systems, cybersecurity products, payment infrastructure, and public digital services.",
        hi: "भारत विदेशी AI टूल, क्लाउड, OS, साइबर सुरक्षा, पेमेंट और डिजिटल सेवाओं के भारतीय विकल्प बनाए।",
      },
      {
        en: "Students, researchers, startups, and small businesses must get cheap internet, cloud credits, GPU access, and public innovation infrastructure to build world-class products.",
        hi: "छात्रों, शोधकर्ताओं और स्टार्टअप को सस्ता इंटरनेट, क्लाउड क्रेडिट, GPU और इनोवेशन सुविधा मिले।",
      },
      {
        en: "Government AI labs must solve real Indian problems in healthcare, farming, education, law, logistics, defense, disaster response, traffic, and public services.",
        hi: "सरकारी AI लैब स्वास्थ्य, खेती, शिक्षा, कानून, रक्षा, आपदा, ट्रैफिक और सेवा समस्याएं हल करें।",
      },
      {
        en: "Semiconductor, robotics, drone, battery, EV, and electronics manufacturing zones must be built with long-term policy support and skilled workforce pipelines.",
        hi: "सेमीकंडक्टर, रोबोटिक्स, ड्रोन, बैटरी, EV और इलेक्ट्रॉनिक्स जोन दीर्घकालीन नीति के साथ बनें।",
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
        en: "Fast-track courts must handle rape, murder, corruption, scams, organized crime, and serious violence with strict timelines so victims do not wait for decades.",
        hi: "गंभीर अपराधों के लिए समयबद्ध फास्ट-ट्रैक कोर्ट हों ताकि पीड़ित दशकों तक इंतजार न करें।",
      },
      {
        en: "Police modernization must include body cameras, digital case records, forensic labs, emergency response systems, AI-supported investigation tools, and better training.",
        hi: "पुलिस में बॉडी कैमरा, डिजिटल केस, फॉरेंसिक लैब, आपात प्रतिक्रिया और AI जांच उपकरण शामिल हों।",
      },
      {
        en: "Organized crime, political violence, extortion, land mafia, cyber fraud, and gang networks must face strict punishment without political protection.",
        hi: "संगठित अपराध, राजनीतिक हिंसा, वसूली, जमीन माफिया और साइबर फ्रॉड पर कठोर कार्रवाई हो।",
      },
      {
        en: "Every city must have a women safety task force with emergency teams, safe transport monitoring, street lighting audits, and fast action on harassment complaints.",
        hi: "हर शहर में महिला सुरक्षा टास्क फोर्स, सुरक्षित परिवहन निगरानी और तेज कार्रवाई व्यवस्था हो।",
      },
      {
        en: "VIP culture, political pressure on police, illegal protection for criminals, and misuse of power must end through independent oversight and public accountability.",
        hi: "VIP संस्कृति, पुलिस पर दबाव और अपराधियों को संरक्षण स्वतंत्र निगरानी से समाप्त हो।",
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
        en: "Free emergency healthcare must be available in all government hospitals, so no citizen is denied urgent treatment because of money, paperwork, or location.",
        hi: "हर सरकारी अस्पताल में मुफ्त आपातकालीन इलाज मिले ताकि पैसे या कागज के कारण उपचार न रुके।",
      },
      {
        en: "Every citizen must have one privacy-protected AI-powered health record for medical history, prescriptions, test results, allergies, and emergency information.",
        hi: "हर नागरिक का गोपनीय AI स्वास्थ्य रिकॉर्ड हो जिसमें रिपोर्ट, दवा और आपात जानकारी सुरक्षित रहे।",
      },
      {
        en: "More medical colleges, nursing institutes, rural hospitals, mobile clinics, and specialist telemedicine centers must reduce the healthcare gap between cities and villages.",
        hi: "मेडिकल कॉलेज, नर्सिंग संस्थान, ग्रामीण अस्पताल और टेलीमेडिसिन केंद्र बढ़ें।",
      },
      {
        en: "Essential medicines, diagnostic tests, life-saving procedures, and basic hospital services must have price controls and transparent billing.",
        hi: "जरूरी दवाओं, जांच और अस्पताल सेवाओं पर मूल्य नियंत्रण और पारदर्शी बिलिंग हो।",
      },
      {
        en: "Mental health support must be available in schools, colleges, workplaces, and public hospitals with trained counsellors, helplines, and awareness programs.",
        hi: "स्कूल, कॉलेज, कार्यस्थल और अस्पतालों में मानसिक स्वास्थ्य सहायता और काउंसलर उपलब्ध हों।",
      },
    ],
  },
  {
    id: "infrastructure",
    icon: "🌆",
    title: { en: "Infrastructure & Cities", hi: "इंफ्रास्ट्रक्चर और शहर" },
    goal: {
      en: "Build Indian cities and districts better than global standards with clean, safe, and reliable public systems.",
      hi: "भारतीय शहरों और जिलों को स्वच्छ, सुरक्षित और विश्वस्तरीय सार्वजनिक प्रणालियों से बनाना।",
    },
    points: [
      {
        en: "Every city must have clean roads, proper drainage, public toilets, footpaths, street lighting, and zero garbage zones maintained through municipal dashboards.",
        hi: "हर शहर में साफ सड़क, ड्रेनेज, सार्वजनिक शौचालय, फुटपाथ, स्ट्रीट लाइट और कचरा-मुक्त क्षेत्र हों।",
      },
      {
        en: "High-speed rail, metro networks, electric buses, safer roads, and modern public transport must reduce travel time, pollution, fuel costs, and daily stress.",
        hi: "हाई-स्पीड रेल, मेट्रो और इलेक्ट्रिक बस यात्रा समय, प्रदूषण और तनाव घटाएं।",
      },
      {
        en: "Every district must receive 24/7 electricity, reliable water supply, sewage treatment, digital connectivity, and climate-resilient infrastructure.",
        hi: "हर जिले में 24/7 बिजली, भरोसेमंद पानी, सीवेज ट्रीटमेंट और डिजिटल कनेक्टिविटी हो।",
      },
      {
        en: "Smart city surveillance must improve safety, traffic management, emergency response, and public order while protecting citizen privacy.",
        hi: "स्मार्ट निगरानी सुरक्षा और ट्रैफिक सुधारे लेकिन नागरिक गोपनीयता सुरक्षित रखे।",
      },
      {
        en: "Affordable housing must be expanded through transparent allotment, rental housing models, better urban planning, and faster construction approvals.",
        hi: "किफायती घर पारदर्शी आवंटन, किराया मॉडल और तेज निर्माण मंजूरी से बढ़ें।",
      },
    ],
  },
  {
    id: "agriculture",
    icon: "🌾",
    title: { en: "Agriculture & Villages", hi: "कृषि और गांव" },
    goal: {
      en: "Make farmers rich, villages productive, and rural India a center of enterprise, not dependency.",
      hi: "किसानों को समृद्ध और गांवों को उद्यम का केंद्र बनाना।",
    },
    points: [
      {
        en: "Direct farmer payments must reach farmers without middlemen, leakage, political favoritism, or paperwork delays through transparent digital systems.",
        hi: "किसानों को भुगतान बिना बिचौलियों और लीकेज के सीधे डिजिटल प्रणाली से मिले।",
      },
      {
        en: "AI and drone-based farming support must help farmers with soil health, pest detection, irrigation planning, crop prediction, fertilizer use, and weather decisions.",
        hi: "AI और ड्रोन खेती में मिट्टी, कीट, सिंचाई, फसल अनुमान और मौसम निर्णय में मदद करें।",
      },
      {
        en: "Cold storage, processing, logistics, warehouses, and market access must be available in every farming district to reduce wastage and increase income.",
        hi: "हर कृषि जिले में कोल्ड स्टोरेज, प्रोसेसिंग, लॉजिस्टिक्स और बाजार पहुंच हो।",
      },
      {
        en: "Rural startup hubs must support food processing, handicrafts, agri-tech, digital services, local manufacturing, and women-led enterprises.",
        hi: "ग्रामीण स्टार्टअप हब फूड प्रोसेसिंग, एग्री-टेक, लोकल निर्माण और महिला उद्यम को समर्थन दें।",
      },
      {
        en: "MSP transparency, crop insurance, disaster relief, and market price information must improve so farmers can plan better and avoid debt traps.",
        hi: "MSP पारदर्शिता, बीमा, आपदा राहत और बाजार मूल्य जानकारी किसानों को कर्ज जाल से बचाए।",
      },
    ],
  },
  {
    id: "defense",
    icon: "🛰️",
    title: { en: "National Security & Defense", hi: "राष्ट्रीय सुरक्षा और रक्षा" },
    goal: {
      en: "Protect India physically, digitally, economically, and strategically with strong domestic capability.",
      hi: "भारत की भौतिक, डिजिटल, आर्थिक और रणनीतिक सुरक्षा को घरेलू क्षमता से मजबूत करना।",
    },
    points: [
      {
        en: "India must build the strongest border infrastructure in Asia with roads, tunnels, surveillance systems, logistics hubs, communication networks, and rapid response capacity.",
        hi: "भारत एशिया का सबसे मजबूत सीमा इंफ्रास्ट्रक्चर सड़क, सुरंग, निगरानी और तेज प्रतिक्रिया क्षमता से बनाए।",
      },
      {
        en: "Domestic defense manufacturing must increase through Indian companies, startups, research labs, and public-private partnerships for drones, missiles, cybersecurity, sensors, and weapons.",
        hi: "ड्रोन, मिसाइल, साइबर सुरक्षा और हथियारों में घरेलू रक्षा निर्माण बढ़े।",
      },
      {
        en: "A national cybersecurity command must protect banking, power grids, defense networks, citizen data, government services, and critical infrastructure.",
        hi: "राष्ट्रीय साइबर सुरक्षा कमांड बैंकिंग, बिजली ग्रिड, रक्षा नेटवर्क और नागरिक डेटा की रक्षा करे।",
      },
      {
        en: "Mandatory disaster and defense awareness training in colleges must prepare youth for emergencies, cyber safety, first aid, civil defense, and national service.",
        hi: "कॉलेजों में आपदा और रक्षा जागरूकता प्रशिक्षण युवाओं को आपात स्थिति और नागरिक रक्षा के लिए तैयार करे।",
      },
      {
        en: "Veterans and military families must receive stronger support in healthcare, housing, education, employment, pension services, and rehabilitation.",
        hi: "पूर्व सैनिकों और सैन्य परिवारों को स्वास्थ्य, घर, शिक्षा, रोजगार और पेंशन में मजबूत समर्थन मिले।",
      },
    ],
  },
  {
    id: "clean-india",
    icon: "🌱",
    title: { en: "Clean India Mission 2.0", hi: "स्वच्छ भारत मिशन 2.0" },
    goal: {
      en: "Make cleanliness, pollution control, river protection, and sustainability measurable at city and village level.",
      hi: "स्वच्छता, प्रदूषण नियंत्रण, नदी संरक्षण और स्थिरता को मापने योग्य बनाना।",
    },
    points: [
      {
        en: "Heavy penalties must be enforced for littering, illegal dumping, industrial pollution, burning waste, and repeated violation of city cleanliness rules.",
        hi: "कचरा फैलाने, अवैध डंपिंग, प्रदूषण और नियम तोड़ने पर भारी जुर्माना लगे।",
      },
      {
        en: "River-cleaning projects must be monitored publicly with dashboards showing budget usage, pollution levels, sewage treatment progress, and responsible agencies.",
        hi: "नदी सफाई परियोजनाएं बजट, प्रदूषण स्तर और जिम्मेदार एजेंसी सहित सार्वजनिक डैशबोर्ड पर दिखें।",
      },
      {
        en: "Electric buses, renewable energy, rooftop solar, clean fuel adoption, and pollution-control systems must expand rapidly in cities and industrial zones.",
        hi: "इलेक्ट्रिक बस, नवीकरणीय ऊर्जा, रूफटॉप सोलर और प्रदूषण नियंत्रण तेजी से बढ़े।",
      },
      {
        en: "Tree plantation drives must focus on survival rate, native species, urban heat reduction, public parks, roadside greenery, and long-term maintenance.",
        hi: "पेड़ लगाने में जीवित रहने की दर, देशी प्रजाति, गर्मी घटाने और रखरखाव पर ध्यान हो।",
      },
      {
        en: "Waste recycling industries must receive incentives for plastic recycling, e-waste processing, composting, circular economy models, and clean jobs.",
        hi: "रीसाइक्लिंग उद्योग को प्लास्टिक, ई-वेस्ट, कंपोस्टिंग और स्वच्छ रोजगार के लिए प्रोत्साहन मिले।",
      },
    ],
  },
  {
    id: "youth-sports",
    icon: "🏆",
    title: { en: "Youth & Sports", hi: "युवा और खेल" },
    goal: {
      en: "Build a confident, healthy, skilled, disciplined, and creative generation ready to lead India.",
      hi: "आत्मविश्वासी, स्वस्थ, कुशल और रचनात्मक पीढ़ी बनाना।",
    },
    points: [
      {
        en: "Sports infrastructure must be built in every district with playgrounds, coaching centers, indoor facilities, athletics tracks, and access for girls and rural youth.",
        hi: "हर जिले में मैदान, कोचिंग केंद्र, इंडोर सुविधाएं और लड़कियों व ग्रामीण युवाओं के लिए खेल ढांचा बने।",
      },
      {
        en: "Schools must include fitness, nutrition, discipline, sports science, mental strength, and health awareness as serious parts of education.",
        hi: "स्कूलों में फिटनेस, पोषण, अनुशासन, स्पोर्ट्स साइंस और मानसिक शक्ति शिक्षा का हिस्सा हों।",
      },
      {
        en: "International-level athlete training centers must identify talent early, support coaches, provide sports medicine, fund equipment, and create global competition pathways.",
        hi: "अंतरराष्ट्रीय प्रशिक्षण केंद्र प्रतिभा पहचानें, कोच समर्थन दें और वैश्विक प्रतियोगिता मार्ग बनाएं।",
      },
      {
        en: "Youth parliament, innovation competitions, debate platforms, hackathons, and leadership programs must train young people to solve problems responsibly.",
        hi: "युवा संसद, इनोवेशन प्रतियोगिता, हैकाथॉन और नेतृत्व कार्यक्रम युवाओं को समस्या समाधान सिखाएं।",
      },
      {
        en: "Creators, filmmakers, designers, gamers, digital entrepreneurs, and artists must receive policy support, skill access, IP protection, and global platforms.",
        hi: "क्रिएटर, फिल्ममेकर, डिजाइनर, गेमर और कलाकारों को नीति समर्थन, कौशल और वैश्विक मंच मिले।",
      },
    ],
  },
  {
    id: "equal-opportunity",
    icon: "🤝",
    title: { en: "Equal Opportunity India", hi: "समान अवसर भारत" },
    goal: {
      en: "Move beyond vote-bank politics and focus on dignity, merit, poverty reduction, and real opportunity.",
      hi: "वोट-बैंक राजनीति से आगे बढ़कर सम्मान, योग्यता और वास्तविक अवसर पर ध्यान।",
    },
    points: [
      {
        en: "Politics must not be based on religion or caste hatred; national unity, constitutional values, and citizen dignity must be above divisive strategies.",
        hi: "राजनीति धर्म या जाति घृणा पर नहीं, राष्ट्रीय एकता और नागरिक सम्मान पर आधारित हो।",
      },
      {
        en: "Government support must focus on poverty, education, health, housing, employment, and opportunity so help reaches people who genuinely need it.",
        hi: "सरकारी सहायता गरीबी, शिक्षा, स्वास्थ्य, घर, रोजगार और अवसर पर केंद्रित हो।",
      },
      {
        en: "Merit must be respected while truly disadvantaged citizens receive strong support through scholarships, skill training, mentoring, nutrition, and digital access.",
        hi: "योग्यता का सम्मान हो और वंचित नागरिकों को छात्रवृत्ति, कौशल और डिजिटल पहुंच मिले।",
      },
      {
        en: "National unity must be placed above identity-based hate, misinformation, political violence, and campaigns that divide citizens for short-term electoral gains.",
        hi: "राष्ट्रीय एकता को नफरत, गलत सूचना, राजनीतिक हिंसा और विभाजनकारी अभियानों से ऊपर रखा जाए।",
      },
      {
        en: "Every Indian must feel protected, respected, and included in the nation's growth story regardless of region, language, caste, religion, gender, or income.",
        hi: "हर भारतीय भाषा, जाति, धर्म, लिंग या आय से परे सुरक्षित और सम्मानित महसूस करे।",
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
        en: "One national citizen app must provide all government services, documents, schemes, complaints, certificates, payments, appointments, and status tracking in one place.",
        hi: "एक नागरिक ऐप में सेवाएं, दस्तावेज, योजनाएं, शिकायत, प्रमाणपत्र और स्टेटस ट्रैकिंग हो।",
      },
      {
        en: "Government offices must become paperless with digital approvals, file tracking, e-signatures, citizen notifications, and strict deadlines for every request.",
        hi: "सरकारी कार्यालय डिजिटल मंजूरी, फाइल ट्रैकिंग, ई-सिग्नेचर और समय सीमा के साथ पेपरलेस हों।",
      },
      {
        en: "AI chat support must help citizens understand schemes, file complaints, track applications, access documents, and receive guidance in local languages.",
        hi: "AI चैट नागरिकों को योजनाएं समझाने, शिकायत करने और स्थानीय भाषा में मार्गदर्शन दे।",
      },
      {
        en: "Most citizen complaints must be resolved within 7 days, with escalation rules, responsible officer names, service ratings, and public reporting.",
        hi: "अधिकांश शिकायतें 7 दिन में हल हों और जिम्मेदार अधिकारी व रिपोर्टिंग सार्वजनिक हो।",
      },
      {
        en: "Digital governance must reduce middlemen, corruption, repeated document submission, unnecessary office visits, and harassment of ordinary citizens.",
        hi: "डिजिटल शासन बिचौलियों, भ्रष्टाचार, बार-बार दस्तावेज और दफ्तर चक्कर कम करे।",
      },
    ],
  },
  {
    id: "foreign-policy",
    icon: "🌍",
    title: { en: "Foreign Policy", hi: "विदेश नीति" },
    goal: {
      en: "Build an India respected globally, dependent on nobody, and powerful in trade, technology, defense, and diplomacy.",
      hi: "विश्व में सम्मानित, आत्मनिर्भर और व्यापार, तकनीक, रक्षा व कूटनीति में शक्तिशाली भारत।",
    },
    points: [
      {
        en: "India must sign trade deals focused on Indian jobs, exports, manufacturing growth, technology transfer, startup expansion, and strategic interests.",
        hi: "भारत ऐसे व्यापार समझौते करे जो भारतीय नौकरियों, निर्यात, निर्माण और तकनीक हस्तांतरण को मजबूत करें।",
      },
      {
        en: "India must build global influence in AI, defense, manufacturing, pharmaceuticals, climate technology, space, education, and digital public infrastructure.",
        hi: "AI, रक्षा, निर्माण, फार्मा, जलवायु तकनीक, अंतरिक्ष और डिजिटल इंफ्रा में भारत वैश्विक प्रभाव बनाए।",
      },
      {
        en: "Indian workers, students, founders, and professionals abroad must receive stronger diplomatic support, legal assistance, emergency help, and protection from exploitation.",
        hi: "विदेश में भारतीय कामगारों, छात्रों और पेशेवरों को कूटनीतिक, कानूनी और आपात सहायता मिले।",
      },
      {
        en: "India must become a top 3 economy by GDP through productivity, exports, innovation, industrial growth, skilled workforce development, and infrastructure.",
        hi: "उत्पादकता, निर्यात, नवाचार, उद्योग और इंफ्रास्ट्रक्चर से भारत शीर्ष 3 अर्थव्यवस्था बने।",
      },
      {
        en: "Foreign policy must be independent, confident, and India-first, building partnerships with major powers while protecting strategic autonomy.",
        hi: "विदेश नीति स्वतंत्र, आत्मविश्वासी और India-first हो, रणनीतिक स्वायत्तता सुरक्षित रखे।",
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
  { en: "All donations must be recorded transparently and published through a public donation ledger.", hi: "सभी दान पारदर्शी रूप से दर्ज होकर सार्वजनिक दान रजिस्टर में दिखेंगे।" },
  { en: "No hate politics based on religion, caste, language, gender, or region.", hi: "धर्म, जाति, भाषा, लिंग या क्षेत्र के आधार पर नफरत की राजनीति नहीं होगी।" },
  { en: "Party leaders must disclose assets yearly and face disciplinary action for false reporting.", hi: "पार्टी नेता हर साल संपत्ति घोषित करेंगे और गलत रिपोर्टिंग पर कार्रवाई होगी।" },
  { en: "Minister selection must be performance-based, not dynasty-based.", hi: "मंत्री चयन प्रदर्शन के आधार पर होगा, वंशवाद के आधार पर नहीं।" },
];

const professions = ["Student", "Working Professional", "Business Owner", "Farmer", "Creator", "Teacher", "Other"];
const joinRoles = ["Volunteer", "Core Team", "Digital Support", "Local Coordinator", "Policy Research", "Campus Chapter"];

function runSelfTests() {
  return {
    hasEnoughManifestoSections: manifesto.length >= 16,
    hasAssetVerification: manifesto.some((item) => item.id === "asset-verification"),
    hasStudentFirst: manifesto.some((item) => item.id === "student-first"),
    hasWorkerRights: manifesto.some((item) => item.id === "worker-rights"),
    allSectionsHaveHindi: manifesto.every((item) => item.title.hi && item.goal.hi && item.points.every((point) => point.hi)),
    allSectionsHaveFivePoints: manifesto.every((item) => item.points.length >= 5),
    hasSeoMetadata: recommendedMetadata.title.length > 20 && recommendedMetadata.description.length > 80,
    hasConstitution: constitutionItems.length >= 6,
  };
}

function HindiShadow({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`mt-1 block font-black text-black/20 drop-shadow-[0_1px_0_rgba(0,0,0,0.18)] ${className}`} lang="hi">
      {text}
    </span>
  );
}

function BilingualText({ value, mode, hiClassName = "text-sm leading-4" }: { value: I18n; mode: LangMode; hiClassName?: string }) {
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
    <p className="text-xl font-black uppercase tracking-[0.22em] text-black/45">
      <BilingualText value={value} mode={mode} hiClassName="text-sm leading-4 tracking-normal" />
    </p>
  );
}

function PageTitle({ value, mode }: { value: I18n; mode: LangMode }) {
  return (
    <h1 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.065em] md:text-[4rem]">
      <BilingualText value={value} mode={mode} hiClassName="text-xl leading-6 tracking-normal md:text-3xl" />
    </h1>
  );
}

function ManifestoCard({ section, index, mode }: { section: ManifestoSection; index: number; mode: LangMode }) {
  return (
    <div className="reveal-card group rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl md:p-8">
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-xl text-white transition group-hover:scale-105">
          {section.icon}
        </div>
        <div>
          <p className="text-base font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 text-3xl font-black tracking-[-0.055em]">
            <BilingualText value={section.title} mode={mode} hiClassName="text-base leading-5 tracking-normal" />
          </h3>
          <p className="mt-3 text-lg font-black leading-6 text-black/70">
            <BilingualText value={{ en: `Goal: ${section.goal.en}`, hi: `लक्ष्य: ${section.goal.hi}` }} mode={mode} hiClassName="text-sm leading-4" />
          </p>
        </div>
      </div>

      <ul className="mt-7 space-y-4 border-t border-black/10 pt-6">
        {section.points.map((point) => (
          <li key={point.en} className="flex gap-3 text-[14px] font-bold leading-6 text-black/75">
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-black" />
            <span>
              <BilingualText value={point} mode={mode} hiClassName="text-sm leading-4" />
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
        <div className="mx-auto max-w-6xl text-center">

          <div className="mx-auto mb-7 inline-flex flex-col items-center gap-1 rounded-full border border-black/10 bg-white px-4 py-2 text-base font-black shadow-sm">
            <span>✓ Vision 2047 Manifesto</span>
            <HindiShadow text="विजन 2047 घोषणापत्र" className="text-xs leading-3" />
          </div>

          <h1 className="text-4xl font-black leading-[0.9] tracking-[-0.075em] md:text-[4.5rem] lg:text-[5.25rem]">
            <BilingualText value={{ en: "India's future-first political movement.", hi: "भारत का भविष्य-प्रथम राजनीतिक आंदोलन।" }} mode={mode} hiClassName="mt-4 text-xl leading-6 tracking-normal md:text-3xl" />
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-2xl font-bold leading-8 text-black/65">
            <BilingualText
              value={{
                en: "A political movement focused on jobs, education, technology, discipline, justice, and national growth - not caste politics, hate, or empty slogans.",
                hi: "रोजगार, शिक्षा, तकनीक, अनुशासन, न्याय और राष्ट्रीय विकास पर केंद्रित आंदोलन - जाति राजनीति, नफरत या खाली नारों पर नहीं।",
              }}
              mode={mode}
              hiClassName="text-lg leading-5"
            />
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={() => setPage("contact")} className="rounded-full bg-black px-8 py-5 text-lg font-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/85 hover:shadow-xl">
              Join the Movement →
            </button>
            <button onClick={() => setPage("manifesto")} className="rounded-full border border-black/15 bg-white px-8 py-5 text-lg font-black transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/5 hover:shadow-xl">
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
            <div key={item.en} className="reveal-card rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-2xl font-black tracking-[-0.045em]">
                <BilingualText value={item} mode={mode} hiClassName="text-sm leading-4" />
              </p>
              <p className="mt-2 text-base font-bold text-black/50">National priority</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <PageEyebrow value={{ en: "India 2047", hi: "भारत 2047" }} mode={mode} />
              <PageTitle value={{ en: "The world's most trusted, educated and powerful nation.", hi: "दुनिया का सबसे विश्वसनीय, शिक्षित और शक्तिशाली राष्ट्र।" }} mode={mode} />
            </div>
            <p className="text-2xl font-bold leading-8 text-black/65">
              <BilingualText
                value={{
                  en: "The goal is not just to win elections. The goal is to build an India that leads the world in trust, talent, technology, safety, economic strength, and citizen dignity.",
                  hi: "लक्ष्य केवल चुनाव जीतना नहीं है। लक्ष्य ऐसा भारत बनाना है जो भरोसे, प्रतिभा, तकनीक, सुरक्षा, आर्थिक शक्ति और नागरिक सम्मान में दुनिया का नेतृत्व करे।",
                }}
                mode={mode}
                hiClassName="text-lg leading-5"
              />
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {targets.map((target) => (
              <div key={target.en} className="reveal-card rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
                <p className="text-xl font-black tracking-[-0.02em]">
                  <BilingualText value={target} mode={mode} hiClassName="text-sm leading-4" />
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
        <p className="max-w-md text-xl font-bold leading-6 text-black/65">
          <BilingualText value={{ en: "A simple, measurable, voter-friendly manifesto covering governance, jobs, education, technology, justice, healthcare, infrastructure, agriculture, national security, and equal opportunity.", hi: "शासन, रोजगार, शिक्षा, तकनीक, न्याय, स्वास्थ्य, इंफ्रास्ट्रक्चर, कृषि, राष्ट्रीय सुरक्षा और समान अवसर पर सरल घोषणापत्र।" }} mode={mode} hiClassName="text-base leading-5" />
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
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div className="rounded-[2rem] border border-black/10 bg-[#fafafa] p-7">
          <p className="text-sm font-black text-black/45">
            <BilingualText value={{ en: "Party Emblem is shown only in the header", hi: "पार्टी प्रतीक केवल हेडर में दिखाया गया है" }} mode={mode} hiClassName="text-[10px]" />
          </p>
        </div>
        <div>
          <PageEyebrow value={{ en: "About the Movement", hi: "आंदोलन का परिचय" }} mode={mode} />
          <PageTitle value={{ en: "Survival, discipline, and nation-building.", hi: "संघर्ष, अनुशासन और राष्ट्र-निर्माण।" }} mode={mode} />
          <p className="mt-8 text-2xl font-bold leading-8 text-black/65">
            <BilingualText value={{ en: "Cockroach India Party is a future-first public political movement built around resilience, transparency, student-first governance, anti-corruption, worker rights, technology leadership, and India 2047.", hi: "कॉकरोच इंडिया पार्टी भविष्य-प्रथम सार्वजनिक राजनीतिक आंदोलन है जो संघर्ष, पारदर्शिता, छात्र-प्रथम शासन, भ्रष्टाचार विरोध, कर्मचारी अधिकार, तकनीकी नेतृत्व और भारत 2047 पर आधारित है।" }} mode={mode} hiClassName="text-lg leading-5" />
          </p>
          <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#fafafa] p-7">
            <p className="text-lg font-black leading-6 text-black/70">
              <BilingualText value={{ en: "Legal-safe disclaimer: This is a public political movement website. Official political party registration details will be updated after completion of legal registration. The emblem shown here is a party/movement emblem and should not be described as an official election symbol unless allotted under applicable election rules.", hi: "कानूनी सूचना: यह सार्वजनिक राजनीतिक आंदोलन वेबसाइट है। कानूनी पंजीकरण पूरा होने के बाद आधिकारिक पार्टी विवरण जोड़े जाएंगे। यहां दिखाया गया प्रतीक पार्टी/आंदोलन प्रतीक है, आधिकारिक चुनाव चिन्ह नहीं।" }} mode={mode} hiClassName="text-sm leading-4" />
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
          <div key={item.en} className="reveal-card rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
            <p className="text-base font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em]">
              <BilingualText value={item} mode={mode} hiClassName="text-sm leading-4" />
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
        <div className="rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-sm">
          <div className="text-3xl">{section.icon}</div>
          <p className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em]">
            <BilingualText value={section.goal} mode={mode} hiClassName="text-base leading-5 text-white/35" />
          </p>
        </div>
        <div className="grid gap-5">
          {section.points.map((point, index) => (
            <div key={point.en} className="reveal-card rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-base font-black text-black/35">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-xl font-bold leading-6 text-black/75">
                <BilingualText value={point} mode={mode} hiClassName="text-sm leading-4" />
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
      <div className="overflow-hidden rounded-[3rem] border border-black/10 bg-white shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <PageEyebrow value={{ en: "Join Us", hi: "हमसे जुड़ें" }} mode={mode} />
            <PageTitle value={{ en: "Help build India's future-first movement.", hi: "भारत के भविष्य-प्रथम आंदोलन को बनाने में मदद करें।" }} mode={mode} />
            <p className="mt-6 text-xl font-bold leading-6 text-black/65">
              <BilingualText value={{ en: "Volunteer, share ideas, organize local conversations, and help build a citizen-led platform for jobs, education, technology, justice, and national growth.", hi: "स्वयंसेवक बनें, विचार साझा करें, स्थानीय संवाद करें और रोजगार, शिक्षा, तकनीक, न्याय व राष्ट्रीय विकास के लिए नागरिक मंच बनाएं।" }} mode={mode} hiClassName="text-base leading-5" />
            </p>
            <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#fafafa] p-6">
              <p className="text-lg font-black">contact@cockroachindiaparty.com</p>
              <p className="mt-3 text-sm font-bold text-black/45">Replace this with your real official email before launch.</p>
            </div>
          </div>

          <div className="bg-[#fafafa] p-8 md:p-12">
            <h3 className="text-3xl font-black tracking-[-0.06em]">
              <BilingualText value={{ en: "Volunteer Interest Form", hi: "स्वयंसेवक रुचि फॉर्म" }} mode={mode} hiClassName="text-base leading-5 tracking-normal" />
            </h3>
            <form action="/api/join" method="post" className="mt-6 grid gap-4">
              <input name="name" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" placeholder="Full name / पूरा नाम" required />
              <input name="mobile" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" placeholder="Mobile number / मोबाइल नंबर" required />
              <input name="email" type="email" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" placeholder="Email / ईमेल" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="city" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" placeholder="City / शहर" required />
                <input name="state" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" placeholder="State / राज्य" required />
              </div>
              <select name="profession" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" defaultValue="">
                <option value="" disabled>Profession / पेशा</option>
                {professions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <select name="joinAs" className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" defaultValue="">
                <option value="" disabled>Want to join as / किस रूप में जुड़ना चाहते हैं</option>
                {joinRoles.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <textarea name="message" className="min-h-36 rounded-2xl border border-black/10 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-black" placeholder="Why do you want to join? / आप क्यों जुड़ना चाहते हैं?" />
              <button type="submit" className="rounded-full bg-black py-6 text-lg font-black text-white hover:bg-black/85">
                Submit Interest
              </button>
            </form>
            <p className="mt-4 text-sm font-bold text-black/45">
              This form is frontend-ready. Create /api/join or connect it to Google Sheets, Airtable, Supabase, or Firebase before launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacyPage({ mode }: { mode: LangMode }) {
  const items: I18n[] = [
    { en: "We collect volunteer details only when users submit the form knowingly.", hi: "हम स्वयंसेवक विवरण केवल तब लेते हैं जब उपयोगकर्ता फॉर्म जानबूझकर जमा करता है।" },
    { en: "Submitted data may be used for volunteer coordination, local events, policy discussions, and communication from the movement.", hi: "जमा डेटा स्वयंसेवक समन्वय, स्थानीय कार्यक्रम, नीति चर्चा और संपर्क के लिए उपयोग हो सकता है।" },
    { en: "We do not sell personal data. Access should be limited to authorized movement administrators.", hi: "हम निजी डेटा नहीं बेचते। पहुंच केवल अधिकृत प्रशासकों तक सीमित होनी चाहिए।" },
    { en: "Users can request correction or deletion of their submitted information through the official contact email.", hi: "उपयोगकर्ता आधिकारिक ईमेल से अपनी जानकारी सुधारने या हटाने का अनुरोध कर सकते हैं।" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <PageEyebrow value={{ en: "Privacy Policy", hi: "गोपनीयता नीति" }} mode={mode} />
      <PageTitle value={{ en: "Simple and transparent data use.", hi: "सरल और पारदर्शी डेटा उपयोग।" }} mode={mode} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.en} className="reveal-card rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
            <p className="text-xl font-bold leading-6 text-black/75">
              <BilingualText value={item} mode={mode} hiClassName="text-sm leading-4" />
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
    { en: "Save emblem as public/party-icon.jpeg", hi: "प्रतीक को public/party-icon.jpeg में सेव करें" },
    { en: "Create favicon from the party emblem", hi: "पार्टी प्रतीक से favicon बनाएं" },
    { en: "Connect join form backend to /api/join", hi: "जॉइन फॉर्म बैकएंड को /api/join से जोड़ें" },
    { en: "Add Google Search Console verification", hi: "Google Search Console verification जोड़ें" },
    { en: "Add Google Analytics or privacy-safe analytics", hi: "Google Analytics या privacy-safe analytics जोड़ें" },
    { en: "Create 1200x630 social share image", hi: "1200x630 social share image बनाएं" },
    { en: "Deploy on Vercel and connect domain DNS", hi: "Vercel पर deploy करें और domain DNS connect करें" },
    { en: "Keep wording as Party Emblem until official symbol allotment", hi: "आधिकारिक चिन्ह आवंटन तक इसे Party Emblem ही लिखें" },
  ];

  return (
    <section className="border-y border-black/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xl font-black uppercase tracking-[0.22em] text-white/45">Launch Checklist</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.065em] md:text-[4rem]">Ready for serious launch.</h2>
            <p className="mt-8 text-lg font-bold leading-6 text-white/55">Internal validation: {passed ? "Passed" : "Needs review"}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {launchItems.map((item) => (
              <div key={item.en} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-black leading-5">
                  ✓ <BilingualText value={item} mode={mode} hiClassName="text-sm leading-4 text-white/30" />
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
        button, select, input, textarea {
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
        }
        button:hover, select:hover, input:focus, textarea:focus { transform: translateY(-1px); }
      `}</style>
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">
          <button onClick={() => setActivePage("home")} className="flex items-center gap-3 text-left"><div>
              <p className="text-2xl font-black tracking-tight">Cockroach India Party</p>
              <HindiShadow text="कॉकरोच इंडिया पार्टी" className="text-sm leading-4" />
              <p className="text-sm font-bold text-black/50">India First. Citizens First.</p>
            </div>
          </button>

          <div className="hidden items-center gap-5 text-sm font-bold text-black/60 xl:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActivePage(item.id)} className={`hover:text-black ${activePage === item.id ? "text-black" : ""}`}>
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
            <button onClick={() => setActivePage("contact")} className="rounded-full bg-black px-6 py-4 text-base font-bold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/85 hover:shadow-xl">
              Join
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 pb-4 xl:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black ${activePage === item.id ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/65"}`}
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

      <footer className="border-t border-black/10 px-6 py-10 text-center text-base font-bold text-black/45">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap justify-center gap-3">
          {[...navItems, { id: "privacy" as PageId, label: { en: "Privacy", hi: "गोपनीयता" } }].map((item) => (
            <button key={item.id} onClick={() => setActivePage(item.id)} className="rounded-full border border-black/10 px-4 py-2 hover:bg-black hover:text-white">
              {mode === "hi" ? item.label.hi : item.label.en}
            </button>
          ))}
        </div>
        <p>
          © 2026 Cockroach India Party. Public movement website draft. Add official registration details only after legal registration.
          <HindiShadow text="© 2026 कॉकरोच इंडिया पार्टी। सार्वजनिक आंदोलन वेबसाइट ड्राफ्ट। कानूनी पंजीकरण के बाद ही आधिकारिक विवरण जोड़ें।" className="text-xs" />
        </p>
      </footer>
    </main>
  );
}
