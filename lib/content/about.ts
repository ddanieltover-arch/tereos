export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TimelineSection {
  title: string;
  intro?: string;
  events: TimelineEvent[];
}

export interface PurposePillar {
  title: string;
  description: string;
  icon: 'integrity' | 'innovation' | 'sustainability' | 'partnership';
}

export const aboutManifesto = [
  "Cultivating. It's always been our passion. Every day, whatever the weather, we take care of the Earth and its inhabitants.",
  "Cultivating. For Tereos, it's a vital impetus. Reasoned, powerful and collective. The people who grow and transform the plant with pragmatism and high standards. Always looking to the future and to performance. So that we can be proud of our presence in people's daily lives.",
  'Cultivating also means cooperating. From land to factory, from farmer to employee and right up to our customers, we are guided by our know-how and boldness. Together, we are nurturing talent so that tomorrow others can join our adventure.',
  'Last but not least, cultivating means strengthening our ties with Nature by protecting our resources. Because we know what we owe the Earth. Simply because our future depends on it.',
];

export const aboutPurposeStatement =
  'Cultivating a shared future for the Earth and People by meeting essential daily needs';

export const aboutSignature = 'Day by day, cultivating the future.';

export const aboutPurposePillars: PurposePillar[] = [
  {
    title: 'Cultivating',
    description:
      "We cultivate the world's professions. It's a profession of the heart, a mindset and a passion. Cultivating means sowing and harvesting, nurturing talent and preparing for the future. Nature comes first, but it needs cultivation in every aspect. Cultivation is the driving force behind our actions.",
    icon: 'partnership',
  },
  {
    title: 'A shared future',
    description:
      'We cultivate for today… and for tomorrow: our responsible and resilient agricultural practices prepare us to adapt to changes in the climate, consumption patterns and technologies. As a company, we are collectively involved in society.',
    icon: 'innovation',
  },
  {
    title: 'For the Earth and People',
    description:
      'Without the Earth there is no agriculture—no life. Tereos grew up on the Earth. This is where it all began, with our plant-based raw materials. The Earth gave its name to our cooperative: Tereos. The Earth… but also the women and men that inhabit it: our cooperative members, our employees, our stakeholders, our customers and consumers.',
    icon: 'sustainability',
  },
  {
    title: 'By meeting essential daily needs',
    description:
      'Food, energy, animal feed, green chemistry, pharmaceuticals and cosmetics, paper and cardboard… we meet many everyday needs through our know-how and the service we provide directly to consumers.',
    icon: 'integrity',
  },
];

export const aboutHistoryIntro =
  'The starting point of Tereos was the creation of a cooperative distillery by a group of farmers at Origny, in the Aisne department of northern France. The factory processed 400 tonnes of sugar beet per day. 90 years later, the Group has become the world\'s second largest sugar producer with operations in 15 countries.';

export const aboutTimelineSections: TimelineSection[] = [
  {
    title: 'Birth of a cooperative',
    intro:
      'In 1932, the Origny cooperative distillery was founded in the Aisne department of northern France by a number of farmers under the leadership of Paul Cavenne. About twenty years later, Jean Duval converted the distillery into a sugar factory able to process 900 tonnes of sugar beet per day, and a distillery was inaugurated in Morains to respond to growing needs in alcohol.',
    events: [
      {
        year: '1932',
        title: 'Origny cooperative distillery founded',
        description:
          'A group of farmers in northern France founded the Origny cooperative distillery, processing 400 tonnes of sugar beet per day under the leadership of Paul Cavenne.',
      },
      {
        year: '1950s',
        title: 'Conversion to sugar production',
        description:
          'Managing director Jean Duval converted the distillery into a sugar factory processing 900 tonnes per day. A distillery was inaugurated in Morains (Marne) to meet growing alcohol demand.',
      },
      {
        year: '1990s',
        title: 'SDA formation',
        description:
          'The Origny cooperative merged with Vic-sur-Aisne, operating a sugar plant handling 5,500 tonnes of sugar beet per day. The new entity was named SDA (Sucreries et Distilleries de l\'Aisne) and acquired the Berneuil sugar factory.',
      },
      {
        year: '2002',
        title: 'Tereos is born',
        description:
          'The acquisition of Béghin Say, the leading French sugar producer, marked a turning point. The combination made the new cooperative group a French market leader with 9,500 cooperative growers. Tereos was born.',
      },
      {
        year: '2006',
        title: 'Merger with SDHF',
        description:
          'Tereos merged with the cooperative group SDHF (Sucreries et Distilleries des Hauts de France), extending the Group\'s business and strengthening its leadership on the French market.',
      },
      {
        year: '2016',
        title: 'Expansion into alfalfa',
        description:
          'The Connantre sugar beet cooperative joined forces with APM Déshy, allowing Tereos to expand into alfalfa processing with four dehydration plants in north-eastern France.',
      },
      {
        year: '2018',
        title: 'Tereos SCA created',
        description:
          'All cooperative growers joined a single cooperative. This simplified, modernised organisation strengthened the efficiency of the cooperative group and its ability to respond to changes in its environment.',
      },
    ],
  },
  {
    title: 'Sugar businesses',
    intro:
      'Anticipating and diversifying to meet new needs, Tereos built a global sugar business spanning Europe, the Americas, Africa and the Indian Ocean.',
    events: [
      {
        year: '1992',
        title: 'Czech Republic — TTD',
        description:
          'Tereos established itself in the Czech Republic with the acquisition of TTD, gaining the means to manufacture and market sugar in Central Europe.',
      },
      {
        year: '2002',
        title: 'Brazil — Guarani',
        description:
          'The Group acquired Guarani, composed of two manufacturing plants in the State of São Paulo — the first steps of a division that has since become a major regional leader.',
      },
      {
        year: '2007',
        title: 'Guarani listed on São Paulo stock market',
        description:
          'Tereos doubled capacities in Brazil and acquired new sites in São José, Tanabi and Andrade. Guarani was listed on the São Paulo stock market.',
      },
      {
        year: '2010',
        title: 'Tereos Internacional & Petrobras partnership',
        description:
          'Tereos Internacional expanded operations to include cane sugar production in the Indian Ocean and cereal processing. A strategic partnership with Petrobras strengthened sugar cane processing in Brazil.',
      },
      {
        year: '2011',
        title: 'Renewable energy investment in Brazil',
        description:
          'Tereos confirmed its pioneer role in renewable energies with an investment plan to develop production and cogeneration in Brazil with support from BNDES.',
      },
      {
        year: '2014',
        title: 'Tereos Commodities',
        description:
          'Tereos demonstrated its ambition to become a global leader in white sugar distribution with the creation of Tereos Commodities, specialised in trading and merchandising.',
      },
      {
        year: '2016',
        title: 'Sole shareholder of Guarani',
        description:
          'The Group bought out Petrobras\' stake in Guarani, becoming the sole shareholder and the 3rd leading player in the Brazilian sugar market.',
      },
      {
        year: '2018',
        title: 'Europe Campus & logistics infrastructure',
        description:
          'Tereos founded its Europe Campus near Charles de Gaulle airport and invested with VLI in logistics infrastructure for sustainable, efficient sugar export.',
      },
    ],
  },
  {
    title: 'Starch businesses',
    intro:
      'From wheat ethanol at Origny to global starch operations, Tereos diversified into cereals and became the 3rd largest European starch producer.',
    events: [
      {
        year: '1993',
        title: 'Wheat ethanol at Origny',
        description:
          'The Group made its first investment in cereal processing with a wheat ethanol production unit at Origny.',
      },
      {
        year: '1996',
        title: 'Staral joint venture',
        description:
          'A partnership with Swiss Jungbunzlauer in Marckolsheim, Alsace marked the first steps in sweeteners made from cereals through the Staral JV.',
      },
      {
        year: '2003',
        title: 'Lillebonne wheat ethanol unit',
        description:
          'A second wheat ethanol unit was built at Lillebonne, close to the Rouen grain port. Manufacturing was later expanded to include food production (gluten and dextrose).',
      },
      {
        year: '2007',
        title: 'Tate & Lyle acquisition',
        description:
          'In partnership with cereal cooperatives, Tereos acquired five starch and glucose production facilities from Tate & Lyle in Western Europe, becoming the 3rd largest European starch producer.',
      },
      {
        year: '2011',
        title: 'Halotek & Haussimont',
        description:
          'Tereos acquired Halotek in Brazil, specialised in transforming cassava into starch, and the Haussimont plant in France for starch-potatoes.',
      },
      {
        year: '2013',
        title: 'Palmital corn starch plant',
        description:
          'The Palmital corn starch plant in Brazil began operating, expanding Tereos\' starch product offer for diversifying market needs.',
      },
      {
        year: '2018',
        title: 'R&D centre in Singapore',
        description:
          'Tereos opened its R&D centre in Singapore, enabling the deployment of innovative solutions in the Asia-Pacific region\'s agri-foods sector.',
      },
    ],
  },
];
