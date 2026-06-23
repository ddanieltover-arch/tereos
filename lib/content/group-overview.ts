export interface GroupStat {
  value: string;
  label: string;
}

export const groupEnvironment = {
  title: 'A constantly changing environment',
  description:
    'In 2050, there will be 10 billion human beings on Earth. The world population will have increased fivefold in the space of a century, bringing with it new challenges in terms of food and energy. Our response must therefore be up to the task, based on renewable resources and ethical production models that offer positive solutions for our territories and our agricultural sectors. Against this backdrop, Tereos has given itself the mission of developing plant resources to sustainably meet essential daily needs in food, renewable energy, pharmaceutical needs and care.',
};

export const groupPartner = {
  title: 'A leading partner',
  description:
    'As a cooperative group, Tereos brings together more than 10,300 grower partners and has recognized know-how in the processing of sugar beet, sugar cane, wheat, corn and alfalfa. The Group is a leader in the sugar, alcohol and starch markets and guarantees the traceability, competitiveness and sustainability of its products to its customers. Its desire to innovate and broad range of complementary products enable it to meet the diverse expectations of consumers from one continent to another.',
  stats: [
    { value: '2nd', label: 'largest global producer of sugar' },
    { value: '2nd', label: 'largest global producer of wheat proteins' },
    { value: '2nd', label: 'largest European producer of ethanol' },
    { value: '3rd', label: 'largest European producer of starch products' },
  ] satisfies GroupStat[],
};

export const groupAgriculture = {
  title: 'Creating a link between the agricultural world and society',
  description:
    'Tereos maintains a close link with the agricultural world by considering the interests of all stakeholders in the sector and providing them with long-term visibility. The Group supports its growers in increasing the value of their raw materials, as well as in the development of efficient and sustainable agricultural practices. Its business model involves creating a complete value chain from field to fork, in order to offer its customers high-quality, certified products and therefore meet society’s expectations as much as possible.',
};
