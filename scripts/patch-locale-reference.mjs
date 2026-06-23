#!/usr/bin/env node
/**
 * Patch locale files with reference-content i18n keys added in en.json.
 * Run: node scripts/patch-locale-reference.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const messagesDir = join(root, 'messages');

const patches = {
  th: {
    home: {
      overview: {
        title: 'กลุ่มสหกรณ์ชั้นนำ',
        description:
          'Tereos แปรรูปหัวบีท อ้อย ข้าวสาลี ข้าวโพด และอัลฟาฟาเป็นผลิตภัณฑ์ที่จำเป็นสำหรับอาหาร พลังงานหมุนเวียน และอุตสาหกรรม — มีสมาชิกเกษตรกรกว่า 10,300 รายทั่วโลก',
        stats: {
          sugarValue: 'อันดับ 2',
          sugar: 'ผู้ผลิตน้ำตาลรายใหญ่ที่สุดในโลก',
          countriesValue: '14',
          countries: 'ประเทศที่ดำเนินงาน',
          employeesValue: '15,800',
          employees: 'พนักงานทั่วโลก',
          revenueValue: '€7.1bn',
          revenue: 'รายได้ (2023/24)',
        },
      },
      global: {
        description: 'สำรวจสำนักงาน โรงงาน และพันธมิตรใน 14 ประเทศบนแผนที่แบบโต้ตอบ',
      },
      contactCta: {
        eyebrow: 'ติดต่อเรา',
        title: 'ติดต่อ Tereos',
        description: 'สำหรับการขาย พันธมิตร นักลงทุน หรือสื่อมวลชน ทีมของเราพร้อมให้บริการ',
        cta: 'ติดต่อเรา',
        email: 'อีเมล',
        press: 'สื่อมวลชน',
        office: 'สำนักงานใหญ่',
        officeValue: 'Tereos Europe Campus, Seine-et-Marne, France',
        inquiry: 'สอบถาม',
        inquiryValue: 'ส่งข้อความ',
      },
    },
    pages: {
      about: {
        groupEnvironment: 'สภาพแวดล้อมที่เปลี่ยนแปลงอย่างต่อเนื่อง',
        groupPartner: 'พันธมิตรชั้นนำ',
        groupAgriculture: 'เชื่อมโยงโลกเกษตรกับสังคม',
        governanceCtaDescription:
          'เรียนรู้ว่าคณะกรรมการ คณะอนุกรรมการ และคณะบริหารรักษาความโปร่งใสและความรับผิดชอบของกลุ่มสหกรณ์',
      },
      sustainability: {
        introTitle: 'เราดำเนินการอย่างยั่งยืน',
        pillarsTitle: 'แผนงาน CSR ของเรา',
      },
      ir: {
        statGrowers: 'สมาชิกสหกรณ์เกษตรกร',
        statRevenue: 'รายได้ (2023/24)',
        statCountries: 'ประเทศที่ดำเนินงาน',
        statEmployees: 'พนักงานทั่วโลก',
      },
      careers: {
        statGrowers: 'สมาชิกสหกรณ์เกษตรกร',
        statSites: 'โรงงานอุตสาหกรรมทั่วโลก',
        statTurnover: 'รายได้ (2023/24)',
      },
    },
    navigation: {
      navDesc: { global: 'สำนักงานและการดำเนินงานใน 14 ประเทศ' },
    },
  },
  'pt-br': {
    home: {
      overview: {
        title: 'Um grupo cooperativo de referência',
        description:
          'A Tereos transforma beterraba, cana, trigo, milho e alfafa em produtos essenciais para alimentação, energia renovável e indústria — com mais de 10.300 cooperados em todo o mundo.',
        stats: {
          sugarValue: '2º',
          sugar: 'Maior produtor mundial de açúcar',
          countriesValue: '14',
          countries: 'Países de atuação',
          employeesValue: '15.800',
          employees: 'Colaboradores no mundo',
          revenueValue: '€7,1bi',
          revenue: 'Faturamento (2023/24)',
        },
      },
      global: {
        description: 'Explore escritórios, fábricas e parceiros em 14 países no mapa interativo.',
      },
      contactCta: {
        eyebrow: 'Entre em contato',
        title: 'Seus contatos na Tereos',
        description: 'Para vendas, parcerias, relações com investidores ou imprensa, nossas equipes estão à disposição.',
        cta: 'Fale conosco',
        email: 'E-mail',
        press: 'Imprensa',
        office: 'Sede',
        officeValue: 'Tereos Europe Campus, Seine-et-Marne, França',
        inquiry: 'Consulta',
        inquiryValue: 'Enviar mensagem',
      },
    },
    pages: {
      about: {
        groupEnvironment: 'Um ambiente em constante mudança',
        groupPartner: 'Um parceiro de referência',
        groupAgriculture: 'Criar a ligação entre o mundo agrícola e a sociedade',
        governanceCtaDescription:
          'Saiba como o Conselho, os comités e a Direção garantem transparência e responsabilidade no grupo cooperativo.',
      },
      sustainability: {
        introTitle: 'Agimos de forma sustentável',
        pillarsTitle: 'Nossa rota CSR',
      },
      ir: {
        statGrowers: 'Cooperados agricultores',
        statRevenue: 'Faturamento (2023/24)',
        statCountries: 'Países de atuação',
        statEmployees: 'Colaboradores no mundo',
      },
      careers: {
        statGrowers: 'Cooperados agricultores',
        statSites: 'Unidades industriais no mundo',
        statTurnover: 'Faturamento (2023/24)',
      },
    },
    navigation: {
      navDesc: { global: 'Escritórios e operações em 14 países' },
    },
  },
  fr: {
    home: {
      overview: {
        title: 'Un groupe coopératif de référence',
        description:
          'Tereos transforme betterave, canne, blé, maïs et luzerne en produits essentiels pour l\'alimentation, l\'énergie renouvelable et l\'industrie — avec plus de 10 300 coopérateurs dans le monde.',
        stats: {
          sugarValue: '2e',
          sugar: 'Producteur mondial de sucre',
          countriesValue: '14',
          countries: 'Pays d\'implantation',
          employeesValue: '15 800',
          employees: 'Collaborateurs dans le monde',
          revenueValue: '7,1 Md€',
          revenue: 'Chiffre d\'affaires (2023/24)',
        },
      },
      contactCta: {
        eyebrow: 'Contact',
        title: 'Vos contacts chez Tereos',
        description: 'Pour les ventes, partenariats, relations investisseurs ou presse, nos équipes sont à votre écoute.',
        cta: 'Nous contacter',
        email: 'E-mail',
        press: 'Presse',
        office: 'Siège',
        officeValue: 'Tereos Europe Campus, Seine-et-Marne, France',
        inquiry: 'Demande',
        inquiryValue: 'Envoyer un message',
      },
    },
    pages: {
      about: {
        groupEnvironment: 'Un environnement en constante évolution',
        groupPartner: 'Un partenaire de référence',
        groupAgriculture: 'Créer le lien entre le monde agricole et la société',
        governanceCtaDescription:
          'Découvrez comment le Conseil, les comités et la Direction garantissent transparence et responsabilité au sein du groupe coopératif.',
      },
      sustainability: { introTitle: 'Nous agissons durablement', pillarsTitle: 'Notre feuille de route RSE' },
      ir: {
        statGrowers: 'Coopérateurs agriculteurs',
        statRevenue: 'Chiffre d\'affaires (2023/24)',
        statCountries: 'Pays d\'implantation',
        statEmployees: 'Collaborateurs dans le monde',
      },
      careers: {
        statGrowers: 'Coopérateurs agriculteurs',
        statSites: 'Sites industriels dans le monde',
        statTurnover: 'Chiffre d\'affaires (2023/24)',
      },
    },
    navigation: { navDesc: { global: 'Bureaux et opérations dans 14 pays' } },
  },
  cs: {
    home: {
      overview: {
        stats: {
          sugarValue: '2.',
          sugar: 'Největší světový producent cukru',
          countriesValue: '14',
          countries: 'Zemí působnosti',
          employeesValue: '15 800',
          employees: 'Zaměstnanců celosvětově',
          revenueValue: '7,1 mld. €',
          revenue: 'Obrat (2023/24)',
        },
      },
      contactCta: {
        eyebrow: 'Kontakt',
        title: 'Vaše kontakty v Tereos',
        cta: 'Kontaktujte nás',
        email: 'E-mail',
        press: 'Tisk',
        office: 'Sídlo',
        officeValue: 'Tereos Europe Campus, Seine-et-Marne, Francie',
        inquiry: 'Dotaz',
        inquiryValue: 'Poslat zprávu',
      },
    },
    pages: {
      about: {
        groupEnvironment: 'Neustále se měnící prostředí',
        groupPartner: 'Přední partner',
        groupAgriculture: 'Propojení zemědělství a společnosti',
      },
      sustainability: { introTitle: 'Jednáme udržitelně', pillarsTitle: 'Naše CSR roadmapa' },
      ir: { statGrowers: 'Družstevních pěstitelů' },
      careers: {
        statGrowers: 'Družstevních pěstitelů',
        statSites: 'Průmyslových závodů',
        statTurnover: 'Obrat (2023/24)',
      },
    },
  },
  id: {
    home: {
      overview: {
        stats: {
          sugarValue: 'Ke-2',
          sugar: 'Produsen gula terbesar di dunia',
          countriesValue: '14',
          countries: 'Negara operasi',
          employeesValue: '15.800',
          employees: 'Karyawan di seluruh dunia',
          revenueValue: '€7,1 miliar',
          revenue: 'Omzet (2023/24)',
        },
      },
      contactCta: {
        eyebrow: 'Hubungi kami',
        title: 'Kontak Anda di Tereos',
        cta: 'Hubungi kami',
        email: 'Email',
        press: 'Pers',
        office: 'Kantor pusat',
        inquiry: 'Pertanyaan',
        inquiryValue: 'Kirim pesan',
      },
    },
    pages: {
      about: {
        groupEnvironment: 'Lingkungan yang terus berubah',
        groupPartner: 'Mitra terkemuka',
        groupAgriculture: 'Menghubungkan dunia pertanian dan masyarakat',
      },
      sustainability: { introTitle: 'Kami bertindak berkelanjutan', pillarsTitle: 'Peta jalan CSR kami' },
      ir: { statGrowers: 'Anggota koperasi petani' },
      careers: {
        statGrowers: 'Anggota koperasi petani',
        statSites: 'Situs industri di seluruh dunia',
        statTurnover: 'Omzet (2023/24)',
      },
    },
  },
};

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

for (const [locale, patch] of Object.entries(patches)) {
  const file = join(messagesDir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  deepMerge(data, patch);
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Patched messages/${locale}.json`);
}
