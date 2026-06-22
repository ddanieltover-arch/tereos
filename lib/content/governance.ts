import { LEADERSHIP_PHOTOS } from '@/lib/content/photography';

export interface GovernanceCommittee {
  id: string;
  title: string;
  aim: string;
  responsibilities: string[];
}

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const governanceIntro = [
  'Tereos Açúcar e Energia S.A. operates within the governance framework of the Tereos Group — one of the world\'s largest sugar, starch, and bioenergy cooperatives, with more than 10,300 cooperative members.',
  'Tereos\' governance places cooperative members at the heart of strategy, combining operational efficiency with proximity to growers. A clear division of responsibilities between elected representatives and management supports long-term value for farmers, employees, and stakeholders across Thailand and Southeast Asia.',
  'The Board of Directors, Cooperative Board, and Management Committee structure described below reflects the official Tereos Group governance model, as published in the Group\'s annual report and investor disclosures.',
];

export const boardIntro =
  'The Board of Directors manages all agricultural, industrial, commercial, and financial activities of the Tereos Group. It sets operational guidelines and strategy, and establishes remuneration for cooperative members on recommendation from the Cooperative Board. The Board comprises nine members elected from among Tereos\' cooperative members, and may include up to two permanent independent directors with full participatory rights in an advisory capacity.';

export const boardChairman: LeaderProfile = {
  id: 'chairman',
  name: 'Gérard Clay',
  role: 'Chairman of the Board of Directors',
  bio: 'Gérard Clay was elected Chairman of the Tereos Board of Directors on 23 June 2022, and re-elected in June 2023, 2024, and 2025. He had been Chairman of the Supervisory Board since December 2020. A key figure in the 2006 merger of Sucreries Distilleries des Hauts de France (SDHF) with Tereos, he is a sugar-beet grower in Bryas (Pas-de-Calais, France). His farm — producing sugar beet, potatoes, canned peas, and cereals — is affiliated with the Tereos sugar factory in Lilliers.',
  image: LEADERSHIP_PHOTOS.gerardClay,
};

export const boardCommittees: GovernanceCommittee[] = [
  {
    id: 'compensation',
    title: 'Compensation, Nomination & Evaluation Committee',
    aim: 'Advises the Board on compensation policy, succession planning, director appointments, and elected-member training.',
    responsibilities: [
      'Overall compensation policy for the Tereos Group, including the Managing Director and Management Committee',
      'Allowances for Board members and elected cooperative representatives, and monitoring attendance',
      'Succession plans for the Board of Directors, Cooperative Board, and Management Committee',
      'Selection of independent directors and their compensation terms',
      'Training programmes for elected members',
    ],
  },
  {
    id: 'ethics',
    title: 'Ethics and CSR Committee',
    aim: 'Ensures communication between the Board of Directors and operational teams on ethics, CSR, and compliance.',
    responsibilities: [
      'Funding, planning, and implementation of measures required by law and regulations',
      'Monitoring of ethics, CSR, and compliance projects (internal standards, investigations, risk mapping)',
      'Analysis of possible conflicts of interest regarding elected members',
    ],
  },
  {
    id: 'finance',
    title: 'Finance Committee',
    aim: 'Reviews and recommends budget, funding, and financial policy to the Board of Directors.',
    responsibilities: [
      'Annual budget and multi-year financial planning',
      'Capital allocation and investment priorities',
      'Funding strategy and banking relationships',
      'Financial performance monitoring against targets',
    ],
  },
  {
    id: 'audit',
    title: 'Audit Committee',
    aim: 'Monitors the preparation of financial information and the work of external auditors.',
    responsibilities: [
      'Oversight of Group financial reporting and internal controls',
      'Appointment and performance assessment of external auditors',
      'Review of interim and annual accounts before Board approval',
    ],
  },
  {
    id: 'risk',
    title: 'Risk Committee',
    aim: 'Identifies and assesses major risks and monitors prevention action plans.',
    responsibilities: [
      'Enterprise risk mapping across operational, financial, and ESG dimensions',
      'Monitoring of action plans to mitigate identified risks',
      'Reporting to the Board on emerging risks and crisis preparedness',
    ],
  },
  {
    id: 'diversification',
    title: 'Diversification Committee',
    aim: 'Monitors diversification assets and explores new opportunities for Tereos products.',
    responsibilities: [
      'Forward-looking research on new markets and product applications',
      'Assessment of planned diversification and investment projects',
      'Recommendations on bioenergy, green chemistry, and food ingredient expansion',
    ],
  },
];

export const advisoryCouncilIntro =
  'The Cooperative Board prepares decisions for the Board of Directors on agricultural, industrial, commercial, and financial activities related to cooperative members\' crops within Tereos France UCA, Tereos Nutrition Animale UCA, and Tereos Starch & Sweeteners Europe. The Board comprises 18 members chosen from 134 Regional Councillors, supported by five activity commissions.';

export const advisoryCommissions = [
  {
    title: 'Beets',
    description:
      'Agronomic standards, harvest logistics, and supply-chain sustainability for beet production — including operational rules for digging, tarping, and collection.',
  },
  {
    title: 'Potato starch',
    description:
      'Management and development of potato-starch production collections, market outlook, and sustainability projects across the value chain.',
  },
  {
    title: 'Animal feed',
    description:
      'Co-product valorisation, feed-market positioning, and operational rules for animal-nutrition activities within the cooperative perimeter.',
  },
  {
    title: 'Alfalfa',
    description:
      'Agronomic support, collection standards, and development of alfalfa-based products for animal nutrition and export markets.',
  },
  {
    title: "Innov'Action",
    description:
      'Pilot projects on sustainable and low-carbon production, decarbonisation from upstream to downstream, and innovation in cooperative agriculture.',
  },
];

export const regionalGovernanceIntro =
  'Regional Assemblies bring together cooperative members from each region each spring, after the financial year ends and before the Plenary General Meeting. Decisions — mainly on the election of representatives — follow cooperative principles of one member, one vote. Regional Assemblies share information on Tereos activities, financial results, and projects, and elect regional councillors who represent members at the Plenary General Meeting. Six regions elect 134 regional councillors in total, with one third of mandates renewed each year.';

export const managementIntro =
  'The Management Committee implements Board decisions on delegation from the Board of Directors. Led since 19 September 2023 by Olivier Leducq as Managing Director, it ensures the Group\'s strategy is understood and executed by operational and functional teams worldwide — including Tereos Açúcar e Energia\'s activities across Thailand and Southeast Asia.';

export const managementCommittee: LeaderProfile[] = [
  {
    id: 'md',
    name: 'Olivier Leducq',
    role: 'Managing Director',
    bio: 'Olivier Leducq was appointed Managing Director of Tereos in September 2023. A graduate of HEC Paris, he spent much of his career in the metalworking industry at Constellium (formerly Pechiney and Alcan), holding financial, commercial, and industrial leadership roles. He joined Tereos in 2015 as head of Tereos France, then led all European sugar activities from 2019 until his appointment as Managing Director. He is responsible for accelerating the Group\'s agricultural, industrial, and commercial progress plans and defining the strategic roadmap.',
    image: LEADERSHIP_PHOTOS.olivierLeducq,
  },
  {
    id: 'cfo',
    name: 'Gwenaël Elies',
    role: 'Deputy Managing Director & Chief Financial Officer',
    bio: 'Gwenaël Elies is Deputy Managing Director and Group CFO, in charge of finance and information systems. A graduate of Montpellier SupAgro, he joined Tereos in 2009 and has more than 30 years of experience in the agro-food sector. He previously led global business development with a focus on Brazil, supervised the Tereos Internacional IPO, and rebuilt Group-level financial controlling and investor relations before rejoining the Management Committee in 2020.',
    image: LEADERSHIP_PHOTOS.gwenaelElies,
  },
  {
    id: 'europe-ops',
    name: 'Jérôme Verrié',
    role: 'Europe Operations Director',
    bio: 'Jérôme Verrié directs European operations for Tereos, covering starch, sweeteners, and sugar segments. Before joining the Management Committee in 2024, he led Tereos\' Wheat Division. He is a graduate of Arts et Métiers ParisTech and brings extensive industrial operations experience across agro-industry.',
    image: LEADERSHIP_PHOTOS.jeromeVerrie,
  },
  {
    id: 'brazil',
    name: 'Pierre Santoul',
    role: 'Brazilian Activities Director',
    bio: 'Pierre Santoul leads Tereos\' Brazilian activities, encompassing sugar, ethanol, energy, starch, and trading. He joined Tereos in 2014 to lead transformation and operational excellence, became CEO of Guarani S.A. (now Tereos Sugar & Energy Brazil) in 2015, and took over as CEO of Tereos Brazil in 2021. He is a graduate of HEC Paris with experience at Electrolux, McKinsey, and Goodyear.',
  },
  {
    id: 'csr',
    name: 'Kristell Guizouarn',
    role: 'CSR, Communications & Public Affairs Director',
    bio: 'Kristell Guizouarn joined Tereos in 2024 to lead CSR, internal and external communications, and public affairs. An agricultural engineer, she previously shaped CSR policy across 18 countries at the Avril Group (Saipol), led Estérifrance, and directed European affairs and new energy strategy before heading regulatory affairs at Avril.',
  },
  {
    id: 'transformation',
    name: 'Jérôme Bos',
    role: 'Transformation Director',
    bio: 'Jérôme Bos has been Group Transformation Director since 2024. An engineering graduate of École Centrale Paris, he has 30 years of experience in industry and farming. Before joining Tereos, he was General Manager of French activities at Axereal.',
  },
  {
    id: 'secretary-general',
    name: 'David Sergent',
    role: 'General Secretary — Governance, Legal & Cooperative Relations',
    bio: 'David Sergent is Secretary-General of the Group, responsible for governance, cooperative communications, and legal, tax, compliance, and insurance functions. He joined Tereos\' legal department in 2004 and previously led the Cooperators Division before his appointment as Secretary-General in 2018.',
  },
  {
    id: 'hr',
    name: 'Xavier Bourgeois',
    role: 'Human Resources Director',
    bio: 'Xavier Bourgeois has been Group HR Director since 2024, with 27 years of human-resources experience in France and internationally across nuclear energy, automotive, mining, and industrial materials — including 16 years as HR Director at Imerys.',
  },
];

export const boardDirectors: LeaderProfile[] = [
  boardChairman,
  {
    id: 'vice-chair',
    name: 'Alain Carré',
    role: 'Vice Chairman of the Board of Directors',
    bio: 'Alain Carré has been Vice Chairman of the Board since June 2025 and a Board member since June 2022 (re-elected 2023 and 2025). He previously served on the Supervisory Board from 2019. He is also Chairman of the Association Interprofessionnelle de la Betterave et du Sucre.',
  },
  {
    id: 'dir-beaury',
    name: 'François-Xavier Beaury',
    role: 'Director · Chairman, Ethics & CSR Committee',
    bio: 'François-Xavier Beaury has been a Board member since June 2022 (re-elected 2024) and chairs the Ethics & CSR Committee. He previously served on the Supervisory Board from 2013 to 2018.',
  },
  {
    id: 'dir-caudron',
    name: 'Laurent Caudron',
    role: 'Director · Chairman, Audit/Finance Committee',
    bio: 'Laurent Caudron has been a Board member since June 2022 (re-elected 2024 and 2025) and chairs the Audit/Finance Committee. He previously served on the Supervisory Board since 2012.',
  },
  {
    id: 'dir-chovet',
    name: 'Adrien Chovet',
    role: 'Director',
    bio: 'Adrien Chovet was a trainee Board member from June 2024 and was elected as a permanent member in October 2025. He previously served on the Cooperative Council from June 2023 to October 2025.',
  },
  {
    id: 'dir-langlois',
    name: 'Grégoire Langlois-Meurinne',
    role: 'Director · Chairman, Risk Committee',
    bio: 'Grégoire Langlois-Meurinne has been a Board member since June 2022 (re-elected 2024) and chairs the Risk Committee. He previously served on the Supervisory Board from 2019.',
  },
  {
    id: 'dir-lefebvre',
    name: 'Jean-Charles Lefebvre',
    role: 'Director · Diversification Committee',
    bio: 'Jean-Charles Lefebvre has been a Board member since June 2022 (re-elected 2025) and sits on the Diversification Committee. He chaired the Supervisory Board from 2019 to December 2020.',
  },
  {
    id: 'dir-couturier',
    name: 'Rodolphe Couturier',
    role: 'Director · Chairman, Compensation, Nomination & Evaluation Committee',
    bio: 'Rodolphe Couturier has been a Board member since June 2024 and chairs the Compensation, Nomination & Evaluation Committee. He previously served on the Supervisory Board from 2017 to 2020.',
  },
  {
    id: 'dir-rose',
    name: 'Emilien Rose',
    role: 'Director · Chairman, Cooperative Board',
    bio: 'Emilien Rose has been a Board member since June 2023 and chairs the Cooperative Board. He previously served on the Supervisory Board from 2019 to 2022.',
  },
  {
    id: 'dir-billot',
    name: 'Thierry Billot',
    role: 'Independent Member (advisory)',
    bio: 'Thierry Billot has been designated as an independent member of the Board of Directors, participating with full rights in an advisory capacity alongside the nine elected cooperative representatives.',
  },
];
