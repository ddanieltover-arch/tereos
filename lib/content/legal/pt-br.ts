import { LEGAL_ENTITY } from './constants';
import type { LegalDocument } from './types';

const { name, address, registration, website, emails, hostingProvider, publicationDirector } =
  LEGAL_ENTITY;

export const privacyPolicyPtBr: LegalDocument = {
  title: 'Política de Privacidade',
  description:
    'Como a Tereos Açúcar e Energia S.A. coleta, utiliza, armazena e protege dados pessoais quando você visita tereosa.com ou interage conosco.',
  lastUpdated: 'Última atualização',
  contactLabel: 'Contato de proteção de dados',
  contactEmail: emails.privacy,
  sections: [
    {
      id: 'introduction',
      title: '1. Introdução',
      paragraphs: [
        `A ${name} ("Tereos", "nós" ou "nosso") respeita sua privacidade e está comprometida com a proteção dos seus dados pessoais. Esta Política de Privacidade explica como tratamos informações pessoais quando você navega em ${website}, assina comunicações, baixa documentos, envia formulários de contato ou interage de outra forma com nossos serviços digitais.`,
        'Esta política se aplica a visitantes e usuários em todo o mundo. Dependendo da sua localização, direitos adicionais podem ser aplicáveis nos termos das leis de proteção de dados vigentes, incluindo o Regulamento Geral de Proteção de Dados da UE (GDPR), o UK GDPR, a Lei Geral de Proteção de Dados do Brasil (LGPD) e a Lei de Proteção de Dados Pessoais da Tailândia (PDPA).',
      ],
    },
    {
      id: 'controller',
      title: '2. Controlador de Dados',
      paragraphs: [
        `O controlador de dados responsável pelos dados pessoais tratados por meio deste site é a ${name}, ${address}. ${registration}.`,
        `Para dúvidas relacionadas à privacidade, solicitações de titulares de dados ou reclamações, entre em contato conosco em [${emails.privacy}](mailto:${emails.privacy}) ou escreva para o endereço acima, com a menção "Proteção de Dados".`,
      ],
    },
    {
      id: 'data-collected',
      title: '3. Dados Pessoais que Coletamos',
      paragraphs: ['Podemos coletar as seguintes categorias de dados pessoais:'],
      listItems: [
        'Dados de identificação e contato: nome, endereço de e-mail, número de telefone, empresa, cargo e país.',
        'Dados de comunicação: mensagens, metadados de anexos e correspondências enviadas por meio de formulários de contato ou e-mail.',
        'Dados de assinatura: endereço de e-mail e preferências de comunicação para newsletters ou alertas a investidores.',
        'Dados de download e acesso restrito: endereço de e-mail e registros de acesso a documentos quando você solicita arquivos com acesso controlado.',
        'Dados técnicos e de uso: endereço IP, tipo de navegador, identificadores de dispositivo, páginas visualizadas, URLs de referência e localização aproximada derivada do IP.',
        'Dados de cookies e consentimento: identificadores de cookies e sua escolha de consentimento para analytics armazenados localmente no seu navegador.',
      ],
    },
    {
      id: 'sources',
      title: '4. Como Coletamos os Dados',
      paragraphs: [
        'Coletamos dados pessoais diretamente de você quando você preenche formulários, assina atualizações, solicita downloads ou entra em contato conosco. Coletamos dados técnicos automaticamente por meio de cookies, logs de servidor e ferramentas de analytics quando você navega no site. Não adquirimos dados pessoais de corretores de dados para este site.',
      ],
    },
    {
      id: 'purposes',
      title: '5. Finalidades e Bases Legais',
      paragraphs: ['Utilizamos dados pessoais para as seguintes finalidades:'],
      listItems: [
        'Responder a solicitações e prestar suporte a clientes ou partes interessadas (interesses legítimos / execução de contrato).',
        'Enviar newsletters e comunicações corporativas quando você tiver optado por recebê-las (consentimento).',
        'Fornecer acesso a documentos com acesso controlado que você solicitar (interesses legítimos / execução de contrato).',
        'Operar, proteger e aprimorar nosso site, incluindo analytics agregados (consentimento para analytics não essenciais; interesses legítimos para segurança).',
        'Cumprir obrigações legais, solicitações regulatórias e defender reivindicações legais (obrigação legal / interesses legítimos).',
        'Gerenciar solicitações de recrutamento enviadas por canais de carreiras (interesses legítimos / etapas pré-contratuais).',
      ],
    },
    {
      id: 'cookies',
      title: '6. Cookies e Tecnologias Semelhantes',
      paragraphs: [
        'Utilizamos cookies e tecnologias semelhantes para habilitar funcionalidades essenciais do site, lembrar suas preferências de cookies e — somente com o seu consentimento — medir o tráfego e o desempenho do site. Para informações detalhadas sobre os cookies que utilizamos e como gerenciá-los, consulte nossa [Política de Cookies](/legal/cookies).',
      ],
    },
    {
      id: 'sharing',
      title: '7. Compartilhamento e Operadores',
      paragraphs: [
        'Não vendemos seus dados pessoais. Podemos compartilhar dados com prestadores de serviços de confiança que tratam informações em nosso nome sob salvaguardas contratuais, incluindo:',
        'Hospedagem de site e entrega de conteúdo (por exemplo, Vercel); provedores de analytics (Google Analytics / Google Tag Manager), somente se você aceitar cookies de analytics; plataformas de e-mail e comunicação; e consultores profissionais ou autoridades quando exigido por lei.',
        'Quando os dados são transferidos para fora do seu país, implementamos salvaguardas adequadas, como cláusulas contratuais padrão ou mecanismos equivalentes exigidos pela legislação aplicável.',
      ],
      listItems: [
        'Hospedagem de site e entrega de conteúdo (por exemplo, Vercel).',
        'Provedores de analytics (Google Analytics / Google Tag Manager), somente se você aceitar cookies de analytics.',
        'Plataformas de e-mail e comunicação utilizadas para responder a solicitações ou enviar conteúdo assinado.',
        'Consultores profissionais, auditores ou autoridades quando exigido por lei.',
      ],
    },
    {
      id: 'retention',
      title: '8. Retenção de Dados',
      paragraphs: [
        'Retemos dados pessoais apenas pelo tempo necessário para as finalidades descritas nesta política, inclusive para atender a requisitos legais, contábeis ou de relatórios. Envios por formulários de contato são normalmente retidos por até 24 meses, salvo se um período mais longo for necessário para correspondência em andamento. Dados de newsletter são retidos até que você cancele a assinatura. Logs de servidor são retidos por até 12 meses. A retenção de dados de analytics segue as configurações definidas em nossas ferramentas de analytics.',
      ],
    },
    {
      id: 'rights',
      title: '9. Seus Direitos',
      paragraphs: [
        'Dependendo da sua jurisdição, você pode ter o direito de acessar, retificar, excluir, restringir ou se opor ao tratamento dos seus dados pessoais, à portabilidade dos dados e de retirar o consentimento a qualquer momento quando o tratamento for baseado em consentimento. Você também pode apresentar reclamação à autoridade de proteção de dados local.',
        `Para exercer seus direitos, envie um e-mail para [${emails.privacy}](mailto:${emails.privacy}). Podemos precisar verificar sua identidade antes de atender a uma solicitação. Nosso objetivo é responder em até 30 dias, ou no prazo exigido pela legislação aplicável.`,
      ],
    },
    {
      id: 'security',
      title: '10. Segurança',
      paragraphs: [
        'Implementamos medidas técnicas e organizacionais adequadas para proteger dados pessoais contra acesso, alteração, divulgação ou destruição não autorizados. Isso inclui criptografia HTTPS, controles de acesso, limitação de taxa em formulários públicos e revisões periódicas de segurança. Nenhum método de transmissão pela Internet é totalmente seguro; não podemos garantir segurança absoluta.',
      ],
    },
    {
      id: 'children',
      title: '11. Crianças',
      paragraphs: [
        'Este site é destinado a públicos empresariais e gerais e não é direcionado a crianças menores de 16 anos. Não coletamos intencionalmente dados pessoais de crianças. Se você acredita que coletamos dados de uma criança, entre em contato conosco para que possamos excluí-los prontamente.',
      ],
    },
    {
      id: 'changes',
      title: '12. Alterações nesta Política',
      paragraphs: [
        'Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas, tecnologias ou requisitos legais. A data de "Última atualização" na parte inferior desta página indica quando a política foi revisada pela última vez. Alterações relevantes serão destacadas nesta página.',
      ],
    },
  ],
};

export const cookiePolicyPtBr: LegalDocument = {
  title: 'Política de Cookies',
  description:
    'Informações sobre como o tereosa.com utiliza cookies e tecnologias semelhantes, e como você pode gerenciar suas preferências.',
  lastUpdated: 'Última atualização',
  contactLabel: 'Contato',
  contactEmail: emails.privacy,
  sections: [
    {
      id: 'what-are-cookies',
      title: '1. O que são Cookies?',
      paragraphs: [
        'Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a lembrar suas preferências, manter sessões seguras e entender como as páginas são utilizadas. Tecnologias semelhantes incluem armazenamento local, armazenamento de sessão e pixels.',
      ],
    },
    {
      id: 'how-we-use',
      title: '2. Como Utilizamos Cookies',
      paragraphs: [
        `A ${name} utiliza cookies em ${website} para fornecer funcionalidades essenciais, lembrar sua escolha de consentimento de cookies e — somente se você aceitar — medir o tráfego e aprimorar a experiência do usuário. Cookies de analytics não essenciais não são instalados até que você clique em "Aceitar" em nosso banner de cookies.`,
      ],
    },
    {
      id: 'categories',
      title: '3. Categorias de Cookies',
      paragraphs: [],
      subsections: [
        {
          title: 'Cookies estritamente necessários',
          paragraphs: [
            'Esses cookies são necessários para o funcionamento do site e não podem ser desativados em nossos sistemas. Geralmente são definidos em resposta a ações que você realiza, como definir preferências de privacidade ou preencher formulários.',
          ],
          listItems: [
            'tereosa-cookie-consent — armazena sua escolha de consentimento para analytics (aceito / recusado). Duração: persistente até ser limpo.',
            'NEXT_LOCALE — lembra o idioma selecionado. Duração: sessão / persistente, conforme a configuração.',
          ],
        },
        {
          title: 'Cookies de analytics (consentimento necessário)',
          paragraphs: [
            'Esses cookies nos ajudam a entender como os visitantes interagem com o site, coletando informações de forma anônima ou pseudonimizada. São ativados somente se você aceitar cookies de analytics.',
          ],
          listItems: [
            '_ga, _ga_* — identificadores do Google Analytics usados para distinguir usuários e sessões. Provedor: Google LLC. Duração: até 24 meses.',
            '_gid — identificador de sessão do Google Analytics. Duração: 24 horas.',
            'Contêineres do Google Tag Manager — podem definir cookies técnicos adicionais para carregar tags de analytics. Provedor: Google LLC.',
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: '4. Cookies de Terceiros',
      paragraphs: [
        'Alguns cookies são definidos por serviços de terceiros que aparecem em nossas páginas, como mapas incorporados ou players de vídeo. Não controlamos esses cookies. Consulte a política de privacidade do terceiro relevante para mais informações.',
      ],
    },
    {
      id: 'manage',
      title: '5. Gerenciamento das Suas Preferências',
      paragraphs: [
        'Na sua primeira visita ao site, você pode aceitar ou recusar cookies de analytics por meio do banner de cookies. Você pode alterar sua escolha a qualquer momento limpando os dados do site no seu navegador e visitando o site novamente, ou ajustando as configurações do navegador para bloquear ou excluir cookies.',
        'A maioria dos navegadores permite recusar cookies ou alertar quando um cookie está sendo enviado. Desativar cookies estritamente necessários pode afetar o funcionamento do site. Para orientação, consulte as páginas de ajuda do seu navegador (Chrome, Firefox, Safari, Edge).',
        'Para optar por não participar do Google Analytics em sites, você pode instalar o [Complemento de Navegador para Desativação do Google Analytics](https://tools.google.com/dlpage/gaoptout).',
      ],
    },
    {
      id: 'legal-basis',
      title: '6. Base Legal',
      paragraphs: [
        'Cookies estritamente necessários são utilizados com base em nosso interesse legítimo em operar um site seguro e funcional. Cookies de analytics são utilizados somente com o seu consentimento, em conformidade com a Diretiva ePrivacy, o GDPR, a LGPD e os requisitos da PDPA, quando aplicável.',
      ],
    },
    {
      id: 'updates',
      title: '7. Atualizações',
      paragraphs: [
        'Podemos atualizar esta Política de Cookies quando alterarmos os cookies ou tecnologias de rastreamento que utilizamos. Consulte esta página periodicamente. Para informações mais amplas sobre como tratamos dados pessoais, consulte nossa [Política de Privacidade](/legal/privacy).',
      ],
    },
  ],
};

export const legalNoticePtBr: LegalDocument = {
  title: 'Aviso Legal',
  description:
    'Informações legais sobre o editor do tereosa.com, hospedagem, propriedade intelectual e termos que regem o uso deste site.',
  lastUpdated: 'Última atualização',
  contactLabel: 'Contato jurídico',
  contactEmail: emails.legal,
  sections: [
    {
      id: 'publisher',
      title: '1. Editor do Site',
      paragraphs: [
        `Este site (${website}) é publicado pela ${name}, empresa atuante na produção de açúcar, bioenergia, serviços agrícolas e atividades industriais relacionadas.`,
        `Sede: ${address}. ${registration}.`,
        `Consultas gerais: [${emails.info}](mailto:${emails.info})`,
      ],
    },
    {
      id: 'publication',
      title: '2. Diretor de Publicação',
      paragraphs: [
        `O diretor de publicação responsável pelo conteúdo editorial deste site é o ${publicationDirector} da ${name}.`,
        'Consultas de imprensa e mídia: [media@tereosa.com](mailto:media@tereosa.com)',
      ],
    },
    {
      id: 'hosting',
      title: '3. Provedor de Hospedagem',
      paragraphs: [`Este site é hospedado pela ${hostingProvider}.`],
    },
    {
      id: 'ip',
      title: '4. Propriedade Intelectual',
      paragraphs: [
        `Todo o conteúdo deste site — incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, vídeos, compilações de dados e software — é propriedade da ${name} ou de seus licenciadores e está protegido por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.`,
        'O nome Tereos, o logotipo e marcas relacionadas são marcas registradas ou em processo de registro. A reprodução, distribuição, modificação ou exibição pública não autorizada de qualquer conteúdo do site sem consentimento prévio por escrito é proibida, exceto para visualização pessoal e não comercial ou conforme permitido por lei imperativa.',
      ],
    },
    {
      id: 'liability',
      title: '5. Limitação de Responsabilidade',
      paragraphs: [
        `A ${name} se esforça para garantir que as informações neste site sejam precisas e atualizadas. No entanto, o conteúdo é fornecido apenas para fins informativos gerais e não constitui aconselhamento profissional, financeiro, jurídico ou de investimento.`,
        'Não oferecemos garantia, expressa ou implícita, quanto à integridade, confiabilidade ou disponibilidade do site ou de seu conteúdo. Na máxima extensão permitida por lei, a Tereos não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do seu uso, ou da impossibilidade de uso, deste site ou da confiança em seu conteúdo.',
        'O site pode conter declarações prospectivas sobre planos de negócios e condições de mercado. Os resultados reais podem diferir materialmente. Não assumimos obrigação de atualizar tais declarações.',
      ],
    },
    {
      id: 'links',
      title: '6. Links Externos',
      paragraphs: [
        'Este site pode conter links para sites de terceiros para sua conveniência. A Tereos não controla e não se responsabiliza pelo conteúdo, práticas de privacidade ou disponibilidade de sites externos. A inclusão de um link não implica endosso.',
      ],
    },
    {
      id: 'terms-of-use',
      title: '7. Termos de Uso',
      paragraphs: [
        'Ao acessar e utilizar este site, você concorda com os seguintes termos:',
        'Você pode visualizar e baixar conteúdo apenas para uso pessoal e não comercial, salvo indicação em contrário para downloads específicos.',
        'Reservamo-nos o direito de suspender ou restringir o acesso ao site a qualquer momento por motivos de manutenção, segurança ou legais.',
      ],
      listItems: [
        'Você não deve tentar obter acesso não autorizado aos nossos sistemas, introduzir malware, fazer scraping de conteúdo em larga escala ou interferir no funcionamento adequado do site.',
        'Você não deve utilizar o site de forma que viole leis aplicáveis ou infrinja direitos de terceiros.',
        'As informações enviadas por formulários devem ser precisas e não devem conter dados ilegais, ofensivos ou confidenciais de terceiros sem autorização.',
      ],
    },
    {
      id: 'privacy-reference',
      title: '8. Privacidade e Cookies',
      paragraphs: [
        'Os dados pessoais coletados por meio deste site são tratados de acordo com nossa [Política de Privacidade](/legal/privacy). Cookies e tecnologias semelhantes são descritos em nossa [Política de Cookies](/legal/cookies).',
      ],
    },
    {
      id: 'law',
      title: '9. Lei Aplicável e Jurisdição',
      paragraphs: [
        'Este Aviso Legal e o seu uso do site são regidos pelas leis da Tailândia, sem consideração aos princípios de conflito de leis. Sujeito às regras imperativas de proteção ao consumidor no seu país de residência, qualquer disputa relacionada a este site será submetida à jurisdição exclusiva dos tribunais de Bangkok, Tailândia.',
        'Se você acessar este site de fora da Tailândia, é responsável pelo cumprimento das leis locais.',
      ],
    },
    {
      id: 'changes',
      title: '10. Alterações',
      paragraphs: [
        'A Tereos pode revisar este Aviso Legal a qualquer momento. O uso continuado do site após a publicação de alterações constitui aceitação dos termos atualizados. A data da última revisão aparece na parte inferior desta página.',
      ],
    },
  ],
};

export const accessibilityStatementPtBr: LegalDocument = {
  title: 'Declaração de Acessibilidade',
  description:
    'Nosso compromisso em tornar o tereosa.com acessível a todos os usuários, em conformidade com WCAG 2.1 Nível AA.',
  lastUpdated: 'Última atualização',
  contactLabel: 'Contato de acessibilidade',
  contactEmail: emails.accessibility,
  sections: [
    {
      id: 'commitment',
      title: '1. Nosso Compromisso',
      paragraphs: [
        `A ${name} está comprometida em garantir acessibilidade digital para pessoas com deficiência. Queremos que todos possam perceber, compreender, navegar e interagir com ${website}.`,
        'Tratamos a acessibilidade como um esforço contínuo e revisamos novos recursos antes da publicação.',
      ],
    },
    {
      id: 'standard',
      title: '2. Status de Conformidade',
      paragraphs: [
        'Este site visa conformidade com as WCAG 2.1 Nível AA. Avaliamos com testes automatizados (Lighthouse, axe-core), navegação por teclado, leitores de tela e zoom de até 200%.',
        'Verificações automatizadas de acessibilidade com axe e Lighthouse são executadas no pipeline de CI antes de cada release.',
        'PDFs arquivados ou conteúdo de terceiros podem ter conformidade parcial. Documentamos limitações conhecidas e buscamos alternativas.',
      ],
    },
    {
      id: 'features',
      title: '3. Recursos de Acessibilidade',
      paragraphs: ['O site tereosa.com inclui:'],
      listItems: [
        'Link para pular ao conteúdo em todas as páginas.',
        'HTML semântico com landmarks (header, main, footer, nav).',
        'Menus, filtros, modais e mapa interativo navegáveis por teclado.',
        'Indicadores de foco visíveis em elementos interativos.',
        'Suporte a prefers-reduced-motion.',
        'Texto alternativo em imagens e rótulos ARIA em controles somente com ícone.',
        'Contraste de cor suficiente para texto (mínimo 4,5:1).',
        'Layouts responsivos com zoom até 200%.',
      ],
    },
    {
      id: 'compatibility',
      title: '4. Compatibilidade',
      paragraphs: [
        'O site funciona com versões atuais dos principais navegadores. Testamos com NVDA e VoiceOver.',
      ],
    },
    {
      id: 'limitations',
      title: '5. Limitações Conhecidas',
      paragraphs: ['Algumas áreas podem ainda não ser totalmente acessíveis:'],
      listItems: [
        'Alguns PDFs podem não estar totalmente marcados para leitores de tela.',
        'Scripts de terceiros podem afetar temporariamente foco ou contraste.',
      ],
    },
    {
      id: 'feedback',
      title: '6. Feedback e Assistência',
      paragraphs: [
        `Se encontrar barreiras de acessibilidade, contacte [${emails.accessibility}](mailto:${emails.accessibility}) com a URL da página e descrição do problema. Respondemos em até 5 dias úteis.`,
        'Também pode usar a [página de Contato](/contact).',
      ],
    },
    {
      id: 'enforcement',
      title: '7. Procedimento de Fiscalização (União Europeia)',
      paragraphs: [
        'Esta secção aplica-se a utilizadores na União Europeia e no EEE que desejam fazer valer os seus direitos ao abrigo da Diretiva (UE) 2016/2102 sobre acessibilidade dos sítios web e da legislação nacional transposta.',
        'Se não estiver satisfeito com a nossa resposta no prazo indicado na secção 6, pode contactar a entidade de fiscalização ou de igualdade do seu Estado-Membro da UE.',
        'A Comissão Europeia mantém a lista de contactos nacionais em [https://digital-strategy.ec.europa.eu/en/policies/web-accessibility](https://digital-strategy.ec.europa.eu/en/policies/web-accessibility).',
        'Ao contactar uma entidade de fiscalização, indique o URL da página, a descrição da barreira, a data da sua reclamação e a nossa resposta, se disponível.',
      ],
    },
    {
      id: 'related-policies',
      title: '8. Políticas Relacionadas',
      paragraphs: [
        'Consulte nossa [Política de Privacidade](/legal/privacy) e [Política de Cookies](/legal/cookies).',
      ],
    },
  ],
};

export const legalDocumentsPtBr = {
  privacy: privacyPolicyPtBr,
  cookies: cookiePolicyPtBr,
  terms: legalNoticePtBr,
  accessibility: accessibilityStatementPtBr,
} as const;
