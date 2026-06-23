#!/usr/bin/env node
/**
 * Write partial locale override files (deep-merged onto en.json at runtime).
 * Run: node scripts/seed-i18n-locales.mjs
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const messagesDir = join(root, 'messages');

const fr = {
  metadata: {
    title: 'Tereos Açúcar e Energia S.A. — Leader mondial du sucre, de la bioénergie et de l\'agriculture',
    description:
      'Tereos Açúcar e Energia S.A. est un leader mondial basé en Thaïlande dans la production de sucre, la bioénergie, l\'innovation agricole et les solutions alimentaires durables. Jour après jour, cultivons l\'avenir.',
  },
  navigation: {
    home: 'Accueil',
    about: 'À propos',
    governance: 'Gouvernance',
    businesses: 'Nos activités',
    products: 'Produits',
    sustainability: 'Durabilité',
    investors: 'Relations investisseurs',
    news: 'Actualités & Médias',
    pressContact: 'Contact presse',
    careers: 'Carrières',
    global: 'Présence mondiale',
    innovation: 'Innovation',
    downloads: 'Centre de téléchargement',
    consumerBrands: 'Marques grand public',
    contact: 'Contact',
    search: 'Rechercher',
    language: 'Langue',
    learnMore: 'En savoir plus',
    contactUs: 'Nous contacter',
    strategy: 'Stratégie',
    history: 'Histoire',
    purpose: 'Notre raison d\'être',
    rawMaterials: 'Matières premières',
    cultivateNetZero: 'Cultivate Net-Zero',
    quality: 'Documents qualité',
    navDesc: {
      about: 'Notre histoire, notre vision et notre stratégie mondiale',
      governance: 'Conseil d\'administration, comités et direction',
      global: 'Bureaux et opérations dans plus de 40 pays',
      innovation: 'R&D et technologies agricoles',
      businessesOverview: 'Vue d\'ensemble des cinq divisions',
      products: 'Catalogue produits et spécifications',
      marketsOverview: 'Tous les marchés que nous servons',
      productLinesOverview: 'Toutes les gammes de produits',
      consumerBrands: 'Marques sucre, bio et protéines',
      news: 'Dernières actualités, communiqués et documents médias',
      pressContact: 'Demandes médias et porte-parole',
      annualResults: 'Rapports financiers trimestriels et annuels',
      regulatedInfo: 'Informations réglementées et documents d\'AG',
      financialCalendar: 'Calendrier des résultats et dividendes',
      irPresentations: 'Présentations investisseurs et conférences',
      strategy: 'Notre modèle coopératif et chaîne de valeur',
      history: 'De 1932 à une coopérative mondiale',
      purpose: 'Cultiver pour la Terre et les Hommes',
      rawMaterials: 'Canne, betterave, blé, maïs et luzerne',
      cultivateNetZero: 'Décarbonation et agriculture régénérative',
      quality: 'Chartes qualité et documentation',
    },
    navBusiness: {
      sugar: 'Sucre',
      bioenergy: 'Bioénergie',
      agriculture: 'Agriculture',
      food: 'Ingrédients alimentaires',
      renewable: 'Solutions renouvelables',
    },
    navMarket: {
      food: 'Alimentation & Boissons',
      energy: 'Énergie & Biocarburants',
      feed: 'Alimentation animale',
      chemicals: 'Chimie verte',
      pharma: 'Pharmaceutique & Cosmétique',
      personalCare: 'Soins personnels',
      paper: 'Papier & Cellulose',
    },
    navProductLine: {
      alcohol: 'Alcool',
      bioethanol: 'Bioéthanol',
      sugarSweeteners: 'Sucre & Édulcorants',
      starches: 'Amidons',
      maltodextrins: 'Maltodextrines',
      organic: 'Produits biologiques',
      dietaryFibres: 'Fibres alimentaires',
      animalFeedFibres: 'Fibres & Alimentation animale',
      proteins: 'Protéines',
    },
    navFeatured: {
      about: {
        title: 'Cultiver l\'avenir',
        description: 'Découvrez notre mission de transformer l\'agriculture durablement.',
      },
      businesses: {
        title: 'Cinq divisions mondiales',
        description: 'Sucre, bioénergie, agriculture et plus encore.',
      },
      products: {
        title: 'Produits de qualité',
        description: 'Explorez notre catalogue de sucre, éthanol et ingrédients spécialisés.',
      },
      sustainability: {
        title: 'Engagement ESG',
        description: 'Réduction carbone, gestion de l\'eau et impact communautaire.',
      },
    },
  },
  home: {
    hero: {
      ctaPrimary: 'Découvrir notre univers',
      ctaSecondary: 'Notre engagement durable',
    },
    overview: {
      title: 'Une force mondiale dans l\'agriculture et l\'énergie',
      description:
        'De la Thaïlande au monde entier, nous transformons les ressources agricoles en produits essentiels qui nourrissent, alimentent et dynamisent les communautés, tout en préservant l\'environnement.',
      stats: {
        sugar: '15 M+ tonnes de sucre/an',
        countries: '40+ pays',
        employees: '25 000+ collaborateurs',
        revenue: '5 Md€+ de chiffre d\'affaires',
      },
    },
    businesses: {
      title: 'Nos divisions',
      description:
        'Des compétences diversifiées, une ambition commune. Découvrez comment nous créons de la valeur sur toute la chaîne agricole.',
      sugar: {
        title: 'Sucre',
        description:
          'Production sucrière de classe mondiale, de la canne au cristal, au service des marchés alimentaires, des boissons et de l\'industrie.',
      },
      bioenergy: {
        title: 'Bioénergie',
        description:
          'Solutions d\'énergie renouvelable : éthanol, biomasse et biocarburants de nouvelle génération.',
      },
      agriculture: {
        title: 'Agriculture',
        description:
          'Pratiques agricoles durables, services aux agriculteurs et programmes de partenariat rural.',
      },
      food: {
        title: 'Ingrédients alimentaires',
        description:
          'Ingrédients spécialisés, édulcorants et solutions fonctionnelles pour l\'industrie alimentaire mondiale.',
      },
      renewable: {
        title: 'Solutions renouvelables',
        description:
          'Innovations d\'économie circulaire valorisant les coproduits agricoles.',
      },
    },
    sustainability: {
      title: 'Notre engagement durable',
      description:
        'Nous réduisons notre empreinte environnementale tout en renforçant notre impact social.',
      metrics: {
        carbon: 'Réduction carbone',
        water: 'Efficacité hydrique',
        energy: 'Énergie renouvelable',
        community: 'Investissement communautaire',
      },
      cta: 'Consulter notre rapport ESG',
    },
    news: {
      title: 'Dernières actualités',
      badge: 'Actualités',
      cta: 'Toutes les actualités',
      readTime: '{minutes} min de lecture',
      demo1: {
        title: 'Tereos annonce une expansion majeure de la bioénergie en Asie du Sud-Est',
        excerpt:
          'Investissement de 200 M€ dans de nouvelles installations de biomasse pour les objectifs énergétiques régionaux.',
        category: 'Communiqué de presse',
      },
      demo2: {
        title: 'Rapport durabilité 2025 : record de réduction carbone',
        excerpt: 'Réduction de 35 % des émissions, objectifs dépassés en avance.',
        category: 'Durabilité',
      },
      demo3: {
        title: 'Partenariat avec les agriculteurs thaïlandais pour une canne durable',
        excerpt: 'Plus de 5 000 familles d\'agriculteurs accompagnées par un nouveau programme coopératif.',
        category: 'Communauté',
      },
    },
    investors: {
      title: 'Relations investisseurs',
      description:
        'Gouvernance transparente, performance financière solide et croissance durable.',
      cta: 'Portail investisseurs',
    },
    careers: {
      title: 'Rejoignez notre équipe mondiale',
      description:
        'Intégrez une organisation engagée qui façonne l\'avenir de l\'agriculture et de l\'énergie.',
      cta: 'Découvrir les carrières',
    },
    global: {
      eyebrow: 'Présence mondiale',
      title: 'À travers les continents, connecter les marchés',
      description:
        'Depuis la Thaïlande, explorez nos sites et partenaires dans plus de 40 pays.',
      cta: 'Explorer notre présence mondiale',
    },
  },
  common: {
    readMore: 'Lire la suite',
    learnMore: 'En savoir plus',
    download: 'Télécharger',
    search: 'Rechercher',
    submit: 'Envoyer',
    cancel: 'Annuler',
    close: 'Fermer',
    next: 'Suivant',
    previous: 'Précédent',
    loading: 'Chargement…',
    error: 'Une erreur s\'est produite. Veuillez réessayer.',
    success: 'Succès !',
    required: 'Obligatoire',
    optional: 'Facultatif',
    allRightsReserved: '© {year} Tereos Açúcar e Energia S.A. Co., Ltd. Tous droits réservés.',
    menu: 'Menu',
    backToTop: 'Retour en haut',
    skipToContent: 'Aller au contenu principal',
    cookieMessage: 'Nous utilisons des cookies et des analyses pour améliorer votre expérience.',
    cookieAccept: 'Accepter',
    cookieDecline: 'Refuser',
    cookiePrivacy: 'Politique de confidentialité',
  },
  footer: {
    company: 'Entreprise',
    businesses: 'Activités',
    resources: 'Ressources',
    legal: 'Mentions légales',
    sitemap: 'Plan du site',
    newsletter: {
      title: 'Restez informé',
      description: 'Abonnez-vous à notre newsletter pour les dernières actualités et rapports.',
      placeholder: 'Votre adresse e-mail',
      button: 'S\'abonner',
      success: 'Merci pour votre inscription !',
      privacy: 'En vous abonnant, vous acceptez notre politique de confidentialité.',
    },
    social: 'Suivez-nous',
    contact: {
      title: 'Nous contacter',
      email: 'sales@tereosa.com',
      phone: '+66 2 XXX XXXX',
    },
  },
};

// Czech and Indonesian — same structure (abbreviated in script for maintainability)
const cs = JSON.parse(JSON.stringify(fr));
Object.assign(cs.metadata, {
  title: 'Tereos Açúcar e Energia S.A. — Světový lídr v cukru, bioenergii a zemědělství',
  description:
    'Tereos Açúcar e Energia S.A. je thajský světový lídr ve výrobě cukru, bioenergii, zemědělských inovacích a udržitelných potravinářských řešeních. Den za dnem pěstujeme budoucnost.',
});
cs.navigation = {
  home: 'Domů',
  about: 'O nás',
  governance: 'Řízení společnosti',
  businesses: 'Naše podnikání',
  products: 'Produkty',
  sustainability: 'Udržitelnost',
  investors: 'Vztahy s investory',
  news: 'Novinky a média',
  pressContact: 'Kontakt pro média',
  careers: 'Kariéra',
  global: 'Globální působnost',
  innovation: 'Inovace',
  downloads: 'Centrum stahování',
  consumerBrands: 'Spotřebitelské značky',
  contact: 'Kontakt',
  search: 'Hledat',
  language: 'Jazyk',
  learnMore: 'Zjistit více',
  contactUs: 'Kontaktujte nás',
  strategy: 'Strategie',
  history: 'Historie',
  purpose: 'Naše poslání',
  rawMaterials: 'Suroviny',
  cultivateNetZero: 'Cultivate Net-Zero',
  quality: 'Dokumenty kvality',
  navDesc: {
    about: 'Naše historie, vize a globální strategie',
    governance: 'Představenstvo, výbory a vedení',
    global: 'Kanceláře a provozy ve více než 40 zemích',
    innovation: 'Výzkum a zemědělské technologie',
    businessesOverview: 'Přehled všech pěti divizí',
    products: 'Kompletní katalog produktů a specifikace',
    marketsOverview: 'Všechny trhy, kterým sloužíme',
    productLinesOverview: 'Všechny produktové řady',
    consumerBrands: 'Maloobchodní značky cukru, bio a proteinů',
    news: 'Nejnovější zprávy, tiskové zprávy a mediální dokumenty',
    pressContact: 'Dotazy médií a mluvčí',
    annualResults: 'Čtvrtletní a výroční finanční zprávy',
    regulatedInfo: 'Regulované informace a materiály valné hromady',
    financialCalendar: 'Kalendář výsledků a dividend',
    irPresentations: 'Prezentace pro investory a konference',
    strategy: 'Naše družstevní model a hodnotový řetězec',
    history: 'Od roku 1932 ke globálnímu družstvu',
    purpose: 'Pěstování pro Zemi a lidi',
    rawMaterials: 'Cukrová třtina, řepa, pšenice, kukuřice a vojtěška',
    cultivateNetZero: 'Dekarbonizace a regenerativní zemědělství',
    quality: 'Charty kvality a dokumentace',
  },
  navBusiness: {
    sugar: 'Cukr',
    bioenergy: 'Bioenergie',
    agriculture: 'Zemědělství',
    food: 'Potravinářské ingredience',
    renewable: 'Obnovitelná řešení',
  },
  navMarket: {
    food: 'Potraviny a nápoje',
    energy: 'Energie a biopaliva',
    feed: 'Krmiva',
    chemicals: 'Zelená chemie',
    pharma: 'Farmaceutika a kosmetika',
    personalCare: 'Osobní péče',
    paper: 'Papír a celulóza',
  },
  navProductLine: {
    alcohol: 'Alkohol',
    bioethanol: 'Bioetanol',
    sugarSweeteners: 'Cukr a sladidla',
    starches: 'Škroby',
    maltodextrins: 'Maltodextriny',
    organic: 'Bio produkty',
    dietaryFibres: 'Vláknina',
    animalFeedFibres: 'Vláknina a krmiva',
    proteins: 'Bílkoviny',
  },
  navFeatured: {
    about: {
      title: 'Pěstujeme budoucnost',
      description: 'Objevte naši misi udržitelně transformovat zemědělství.',
    },
    businesses: {
      title: 'Pět globálních divizí',
      description: 'Cukr, bioenergie, zemědělství a další.',
    },
    products: {
      title: 'Kvalitní produkty',
      description: 'Prozkoumejte náš katalog cukru, ethanolu a specialit.',
    },
    sustainability: {
      title: 'Závazek ESG',
      description: 'Snížení uhlíku, hospodaření s vodou a dopad na komunitu.',
    },
  },
};
cs.home = {
  hero: {
    ctaPrimary: 'Objevte náš svět',
    ctaSecondary: 'Náš závazek k udržitelnosti',
  },
  overview: {
    title: 'Globální síla v zemědělství a energetice',
    description:
      'Z Thajska do světa proměňujeme zemědělské zdroje v produkty, které živí, pohání a podporují komunity při šetrném přístupu k životnímu prostředí.',
    stats: {
      sugar: '15M+ tun cukru/rok',
      countries: '40+ zemí',
      employees: '25 000+ zaměstnanců',
      revenue: '5 mld. €+ tržby',
    },
  },
  businesses: {
    title: 'Naše divize',
    description: 'Různorodé schopnosti, společný účel napříč celým zemědělským řetězcem.',
    sugar: {
      title: 'Cukr',
      description: 'Světová produkce cukru od třtiny po krystal pro globální trhy.',
    },
    bioenergy: {
      title: 'Bioenergie',
      description: 'Obnovitelná energie včetně ethanolu, biomasy a nové generace biopaliv.',
    },
    agriculture: {
      title: 'Zemědělství',
      description: 'Udržitelné zemědělství, služby farmářům a partnerské programy.',
    },
    food: {
      title: 'Potravinářské ingredience',
      description: 'Specializované ingredience a sladidla pro globální potravinářství.',
    },
    renewable: {
      title: 'Obnovitelná řešení',
      description: 'Inovace cirkulární ekonomiky z agronomických vedlejších produktů.',
    },
  },
  sustainability: {
    title: 'Náš závazek k udržitelnosti',
    description: 'Snižujeme environmentální stopu a posilujeme pozitivní sociální dopad.',
    metrics: {
      carbon: 'Snížení uhlíku',
      water: 'Efektivita vody',
      energy: 'Obnovitelná energie',
      community: 'Investice do komunity',
    },
    cta: 'Prozkoumat ESG zprávu',
  },
  news: {
    title: 'Nejnovější zprávy',
    badge: 'Novinky',
    cta: 'Všechny zprávy',
    readTime: '{minutes} min čtení',
    demo1: {
      title: 'Tereos oznamuje velkou expanzi bioenergie v jihovýchodní Asii',
      excerpt: 'Investice 200 mil. € do nových biomasových elektráren.',
      category: 'Tisková zpráva',
    },
    demo2: {
      title: 'Zpráva o udržitelnosti 2025: rekordní snížení emisí',
      excerpt: 'Snížení emisí o 35 % napříč všemi provozy.',
      category: 'Udržitelnost',
    },
    demo3: {
      title: 'Partnerství s thajskými farmáři pro udržitelnou třtinu',
      excerpt: 'Program pro více než 5 000 rodin farmářů.',
      category: 'Komunita',
    },
  },
  investors: {
    title: 'Vztahy s investory',
    description: 'Transparentní řízení a dlouhodobá hodnota pro stakeholdery.',
    cta: 'Portál pro investory',
  },
  careers: {
    title: 'Připojte se k našemu týmu',
    description: 'Buďte součástí organizace formující budoucnost zemědělství a energie.',
    cta: 'Prozkoumat kariéru',
  },
  global: {
    eyebrow: 'Globální působnost',
    title: 'Přes kontinenty, propojujeme trhy',
    description: 'Z Thajska do více než 40 zemí na interaktivní mapě.',
    cta: 'Globální působnost',
  },
};
cs.common = {
  readMore: 'Číst více',
  learnMore: 'Zjistit více',
  download: 'Stáhnout',
  search: 'Hledat',
  submit: 'Odeslat',
  cancel: 'Zrušit',
  close: 'Zavřít',
  next: 'Další',
  previous: 'Předchozí',
  loading: 'Načítání…',
  error: 'Došlo k chybě. Zkuste to prosím znovu.',
  success: 'Úspěch!',
  required: 'Povinné',
  optional: 'Volitelné',
  allRightsReserved: '© {year} Tereos Açúcar e Energia S.A. Co., Ltd. Všechna práva vyhrazena.',
  menu: 'Menu',
  backToTop: 'Zpět nahoru',
  skipToContent: 'Přeskočit na hlavní obsah',
  cookieMessage: 'Používáme cookies a analytiku pro zlepšení vašeho zážitku.',
  cookieAccept: 'Přijmout',
  cookieDecline: 'Odmítnout',
  cookiePrivacy: 'Zásady ochrany osobních údajů',
};
cs.footer = {
  company: 'Společnost',
  businesses: 'Podnikání',
  resources: 'Zdroje',
  legal: 'Právní informace',
  sitemap: 'Mapa webu',
  newsletter: {
    title: 'Zůstaňte informováni',
    description: 'Odebírejte newsletter s novinkami a reporty.',
    placeholder: 'Vaše e-mailová adresa',
    button: 'Odebírat',
    success: 'Děkujeme za přihlášení!',
    privacy: 'Přihlášením souhlasíte se zásadami ochrany osobních údajů.',
  },
  social: 'Sledujte nás',
  contact: {
    title: 'Kontaktujte nás',
    email: 'sales@tereosa.com',
    phone: '+66 2 XXX XXXX',
  },
};

const id = JSON.parse(JSON.stringify(fr));
Object.assign(id.metadata, {
  title: 'Tereos Açúcar e Energia S.A. — Pemimpin Global Gula, Bioenergi & Pertanian',
  description:
    'Tereos Açúcar e Energia S.A. adalah pemimpin global berbasis di Thailand dalam produksi gula, bioenergi, inovasi pertanian, dan solusi pangan berkelanjutan. Hari demi hari, menumbuhkan masa depan.',
});
id.navigation = {
  home: 'Beranda',
  about: 'Tentang Kami',
  governance: 'Tata Kelola',
  businesses: 'Bisnis Kami',
  products: 'Produk',
  sustainability: 'Keberlanjutan',
  investors: 'Hubungan Investor',
  news: 'Berita & Media',
  pressContact: 'Kontak Pers',
  careers: 'Karier',
  global: 'Kehadiran Global',
  innovation: 'Inovasi',
  downloads: 'Pusat Unduhan',
  consumerBrands: 'Merek Konsumen',
  contact: 'Kontak',
  search: 'Cari',
  language: 'Bahasa',
  learnMore: 'Pelajari lebih lanjut',
  contactUs: 'Hubungi Kami',
  strategy: 'Strategi',
  history: 'Sejarah',
  purpose: 'Tujuan Kami',
  rawMaterials: 'Bahan Baku',
  cultivateNetZero: 'Cultivate Net-Zero',
  quality: 'Dokumen Kualitas',
  navDesc: {
    about: 'Sejarah, visi, dan strategi global kami',
    governance: 'Dewan direksi, komite, dan manajemen',
    global: 'Kantor dan operasi di 40+ negara',
    innovation: 'R&D dan teknologi pertanian',
    businessesOverview: 'Ikhtisar kelima divisi',
    products: 'Katalog produk dan spesifikasi lengkap',
    marketsOverview: 'Semua pasar yang kami layani',
    productLinesOverview: 'Semua lini produk',
    consumerBrands: 'Merek gula, organik, dan protein ritel',
    news: 'Berita terbaru, siaran pers, dan dokumen media',
    pressContact: 'Pertanyaan media dan juru bicara',
    annualResults: 'Laporan keuangan triwulanan dan tahunan',
    regulatedInfo: 'Pengungkapan regulasi dan materi RUPS',
    financialCalendar: 'Kalender hasil dan dividen',
    irPresentations: 'Presentasi investor dan konferensi',
    strategy: 'Model koperasi dan rantai nilai kami',
    history: 'Dari 1932 hingga koperasi global',
    purpose: 'Menumbuhkan untuk Bumi dan manusia',
    rawMaterials: 'Tebu, bit, gandum, jagung & alfalfa',
    cultivateNetZero: 'Dekarbonisasi & pertanian regeneratif',
    quality: 'Piagam kualitas dan dokumentasi',
  },
  navBusiness: {
    sugar: 'Gula',
    bioenergy: 'Bioenergi',
    agriculture: 'Pertanian',
    food: 'Bahan Makanan',
    renewable: 'Solusi Terbarukan',
  },
  navMarket: {
    food: 'Makanan & Minuman',
    energy: 'Energi & Biofuel',
    feed: 'Pakan Ternak',
    chemicals: 'Kimia Hijau',
    pharma: 'Farmasi & Kosmetik',
    personalCare: 'Perawatan Pribadi',
    paper: 'Kertas & Selulosa',
  },
  navProductLine: {
    alcohol: 'Alkohol',
    bioethanol: 'Bioetanol',
    sugarSweeteners: 'Gula & Pemanis',
    starches: 'Pati',
    maltodextrins: 'Maltodekstrin',
    organic: 'Produk Organik',
    dietaryFibres: 'Serat Pangan',
    animalFeedFibres: 'Serat & Pakan Ternak',
    proteins: 'Protein',
  },
  navFeatured: {
    about: {
      title: 'Menumbuhkan Masa Depan',
      description: 'Temukan misi kami mentransformasi pertanian secara berkelanjutan.',
    },
    businesses: {
      title: 'Lima Divisi Global',
      description: 'Gula, bioenergi, pertanian, dan lainnya.',
    },
    products: {
      title: 'Produk Berkualitas',
      description: 'Jelajahi katalog gula, etanol, dan bahan khusus kami.',
    },
    sustainability: {
      title: 'Komitmen ESG',
      description: 'Pengurangan karbon, pengelolaan air, dan dampak komunitas.',
    },
  },
};
id.home = {
  hero: {
    ctaPrimary: 'Jelajahi Dunia Kami',
    ctaSecondary: 'Komitmen Keberlanjutan Kami',
  },
  overview: {
    title: 'Kekuatan Global di Pertanian & Energi',
    description:
      'Dari Thailand ke dunia, kami mengubah sumber daya pertanian menjadi produk penting yang memberi makan, bahan bakar, dan energi bagi komunitas secara berkelanjutan.',
    stats: {
      sugar: '15J+ Ton Gula/Tahun',
      countries: '40+ Negara',
      employees: '25.000+ Karyawan',
      revenue: '€5M+ Pendapatan',
    },
  },
  businesses: {
    title: 'Divisi Bisnis Kami',
    description: 'Kapabilitas beragam, tujuan bersatu di seluruh rantai nilai pertanian.',
    sugar: {
      title: 'Gula',
      description: 'Produksi gula kelas dunia dari tebu hingga kristal untuk pasar global.',
    },
    bioenergy: {
      title: 'Bioenergi',
      description: 'Solusi energi terbarukan termasuk etanol, biomassa, dan biofuel generasi baru.',
    },
    agriculture: {
      title: 'Pertanian',
      description: 'Praktik pertanian berkelanjutan, layanan petani, dan program kemitraan.',
    },
    food: {
      title: 'Bahan Makanan',
      description: 'Bahan khusus, pemanis, dan solusi fungsional untuk industri pangan global.',
    },
    renewable: {
      title: 'Solusi Terbarukan',
      description: 'Inovasi ekonomi sirkular dari produk sampingan pertanian.',
    },
  },
  sustainability: {
    title: 'Komitmen Keberlanjutan Kami',
    description: 'Kami mengurangi jejak lingkungan sambil meningkatkan dampak sosial positif.',
    metrics: {
      carbon: 'Pengurangan Karbon',
      water: 'Efisiensi Air',
      energy: 'Energi Terbarukan',
      community: 'Investasi Komunitas',
    },
    cta: 'Jelajahi Laporan ESG Kami',
  },
  news: {
    title: 'Berita Terbaru',
    badge: 'Berita & Pembaruan',
    cta: 'Semua Berita',
    readTime: '{minutes} menit baca',
    demo1: {
      title: 'Tereos Umumkan Ekspansi Besar Bioenergi di Asia Tenggara',
      excerpt: 'Investasi €200 juta untuk fasilitas biomassa baru.',
      category: 'Siaran Pers',
    },
    demo2: {
      title: 'Laporan Keberlanjutan 2025: Rekor Pengurangan Karbon',
      excerpt: 'Pengurangan emisi 35% di semua operasi.',
      category: 'Keberlanjutan',
    },
    demo3: {
      title: 'Kemitraan dengan Petani Thailand untuk Tebu Berkelanjutan',
      excerpt: 'Program koperasi menjangkau 5.000+ keluarga petani.',
      category: 'Komunitas',
    },
  },
  investors: {
    title: 'Hubungan Investor',
    description: 'Tata kelola transparan dan pertumbuhan berkelanjutan untuk pemangku kepentingan.',
    cta: 'Kunjungi Portal IR',
  },
  careers: {
    title: 'Bergabung dengan Tim Global Kami',
    description: 'Jadilah bagian organisasi yang membentuk masa depan pertanian dan energi.',
    cta: 'Jelajahi Karier',
  },
  global: {
    eyebrow: 'Kehadiran Global',
    title: 'Menjangkau Benua, Menghubungkan Pasar',
    description: 'Dari Thailand, jelajahi kantor dan mitra di 40+ negara.',
    cta: 'Jelajahi Kehadiran Global',
  },
};
id.common = {
  readMore: 'Baca Selengkapnya',
  learnMore: 'Pelajari Lebih Lanjut',
  download: 'Unduh',
  search: 'Cari',
  submit: 'Kirim',
  cancel: 'Batal',
  close: 'Tutup',
  next: 'Berikutnya',
  previous: 'Sebelumnya',
  loading: 'Memuat…',
  error: 'Terjadi kesalahan. Silakan coba lagi.',
  success: 'Berhasil!',
  required: 'Wajib',
  optional: 'Opsional',
  allRightsReserved: '© {year} Tereos Açúcar e Energia S.A. Co., Ltd. Hak cipta dilindungi.',
  menu: 'Menu',
  backToTop: 'Kembali ke atas',
  skipToContent: 'Lewati ke konten utama',
  cookieMessage: 'Kami menggunakan cookie dan analitik untuk meningkatkan pengalaman Anda.',
  cookieAccept: 'Terima',
  cookieDecline: 'Tolak',
  cookiePrivacy: 'Kebijakan Privasi',
};
id.footer = {
  company: 'Perusahaan',
  businesses: 'Bisnis',
  resources: 'Sumber Daya',
  legal: 'Hukum',
  sitemap: 'Peta Situs',
  newsletter: {
    title: 'Tetap Terinformasi',
    description: 'Berlangganan newsletter untuk berita dan laporan terbaru.',
    placeholder: 'Masukkan alamat email Anda',
    button: 'Berlangganan',
    success: 'Terima kasih telah berlangganan!',
    privacy: 'Dengan berlangganan, Anda menyetujui Kebijakan Privasi kami.',
  },
  social: 'Ikuti Kami',
  contact: {
    title: 'Hubungi Kami',
    email: 'sales@tereosa.com',
    phone: '+66 2 XXX XXXX',
  },
};

for (const [code, data] of [
  ['fr', fr],
  ['cs', cs],
  ['id', id],
]) {
  const path = join(messagesDir, `${code}.json`);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${path}`);
}
