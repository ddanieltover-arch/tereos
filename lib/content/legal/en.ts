import { LEGAL_ENTITY } from './constants';
import type { LegalDocument } from './types';

const { name, address, registration, website, emails, hostingProvider, publicationDirector } =
  LEGAL_ENTITY;

export const privacyPolicyEn: LegalDocument = {
  title: 'Privacy Policy',
  description:
    'How Tereos Açúcar e Energia S.A. collects, uses, stores, and protects personal data when you visit tereosa.com or interact with us.',
  lastUpdated: 'Last updated',
  contactLabel: 'Data protection contact',
  contactEmail: emails.privacy,
  sections: [
    {
      id: 'introduction',
      title: '1. Introduction',
      paragraphs: [
        `${name} ("Tereos", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we process personal information when you browse ${website}, subscribe to communications, download documents, submit contact forms, or otherwise interact with our digital services.`,
        'This policy applies to visitors and users worldwide. Depending on your location, additional rights may apply under applicable data protection laws, including the EU General Data Protection Regulation (GDPR), the UK GDPR, Brazil\'s Lei Geral de Proteção de Dados (LGPD), and Thailand\'s Personal Data Protection Act (PDPA).',
      ],
    },
    {
      id: 'controller',
      title: '2. Data Controller',
      paragraphs: [
        `The data controller responsible for personal data processed through this website is ${name}, ${address}. ${registration}.`,
        `For privacy-related enquiries, data subject requests, or complaints, contact us at [${emails.privacy}](mailto:${emails.privacy}) or write to the address above, marked "Data Protection".`,
      ],
    },
    {
      id: 'data-collected',
      title: '3. Personal Data We Collect',
      paragraphs: ['We may collect the following categories of personal data:'],
      listItems: [
        'Identity and contact data: name, email address, phone number, company, job title, and country.',
        'Communication data: messages, attachments metadata, and correspondence sent through contact forms or email.',
        'Subscription data: email address and communication preferences for newsletters or investor alerts.',
        'Download and gating data: email address and document access records when you request gated files.',
        'Technical and usage data: IP address, browser type, device identifiers, pages viewed, referral URLs, and approximate location derived from IP.',
        'Cookie and consent data: cookie identifiers and your analytics consent choice stored locally in your browser.',
      ],
    },
    {
      id: 'sources',
      title: '4. How We Collect Data',
      paragraphs: [
        'We collect personal data directly from you when you fill in forms, subscribe to updates, request downloads, or contact us. We collect technical data automatically through cookies, server logs, and analytics tools when you browse the site. We do not purchase personal data from data brokers for this website.',
      ],
    },
    {
      id: 'purposes',
      title: '5. Purposes and Legal Bases',
      paragraphs: ['We use personal data for the following purposes:'],
      listItems: [
        'Responding to enquiries and providing customer or stakeholder support (legitimate interests / contract performance).',
        'Sending newsletters and corporate communications where you have opted in (consent).',
        'Providing access to gated documents you request (legitimate interests / contract performance).',
        'Operating, securing, and improving our website, including aggregated analytics (consent for non-essential analytics; legitimate interests for security).',
        'Complying with legal obligations, regulatory requests, and defending legal claims (legal obligation / legitimate interests).',
        'Managing recruitment enquiries submitted through careers channels (legitimate interests / pre-contractual steps).',
      ],
    },
    {
      id: 'cookies',
      title: '6. Cookies and Similar Technologies',
      paragraphs: [
        'We use cookies and similar technologies to enable core site functionality, remember your cookie preferences, and—only with your consent—measure website traffic and performance. For detailed information on the cookies we use and how to manage them, see our [Cookie Policy](/legal/cookies).',
      ],
    },
    {
      id: 'sharing',
      title: '7. Sharing and Processors',
      paragraphs: [
        'We do not sell your personal data. We may share data with trusted service providers who process information on our behalf under contractual safeguards, including:',
        'Where data is transferred outside your country, we implement appropriate safeguards such as standard contractual clauses or equivalent mechanisms required by applicable law.',
      ],
      listItems: [
        'Website hosting and content delivery (e.g. Vercel).',
        'Analytics providers (Google Analytics / Google Tag Manager), only if you accept analytics cookies.',
        'Email and communication platforms used to respond to enquiries or send subscribed content.',
        'Professional advisers, auditors, or authorities where required by law.',
      ],
    },
    {
      id: 'retention',
      title: '8. Data Retention',
      paragraphs: [
        'We retain personal data only for as long as necessary for the purposes described in this policy, including to satisfy legal, accounting, or reporting requirements. Contact form submissions are typically retained for up to 24 months unless a longer period is required for ongoing correspondence. Newsletter data is retained until you unsubscribe. Server logs are retained for up to 12 months. Analytics data retention follows the settings configured in our analytics tools.',
      ],
    },
    {
      id: 'rights',
      title: '9. Your Rights',
      paragraphs: [
        'Depending on your jurisdiction, you may have the right to access, rectify, erase, restrict, or object to processing of your personal data, to data portability, and to withdraw consent at any time where processing is based on consent. You may also lodge a complaint with your local data protection authority.',
        `To exercise your rights, email [${emails.privacy}](mailto:${emails.privacy}). We may need to verify your identity before fulfilling a request. We aim to respond within 30 days, or within the timeframe required by applicable law.`,
      ],
    },
    {
      id: 'security',
      title: '10. Security',
      paragraphs: [
        'We implement appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction. These include HTTPS encryption, access controls, rate limiting on public forms, and regular security reviews. No method of transmission over the Internet is completely secure; we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'children',
      title: '11. Children',
      paragraphs: [
        'This website is intended for business and general audiences and is not directed at children under 16. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us so we can delete it promptly.',
      ],
    },
    {
      id: 'changes',
      title: '12. Changes to This Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. The "Last updated" date at the bottom of this page indicates when the policy was last revised. Material changes will be highlighted on this page.',
      ],
    },
  ],
};

export const cookiePolicyEn: LegalDocument = {
  title: 'Cookie Policy',
  description:
    'Information about how tereosa.com uses cookies and similar technologies, and how you can manage your preferences.',
  lastUpdated: 'Last updated',
  contactLabel: 'Contact',
  contactEmail: emails.privacy,
  sections: [
    {
      id: 'what-are-cookies',
      title: '1. What Are Cookies?',
      paragraphs: [
        'Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, keep sessions secure, and understand how pages are used. Similar technologies include local storage, session storage, and pixels.',
      ],
    },
    {
      id: 'how-we-use',
      title: '2. How We Use Cookies',
      paragraphs: [
        `${name} uses cookies on ${website} to provide essential functionality, remember your cookie consent choice, and—only if you accept—measure traffic and improve user experience. Non-essential analytics cookies are not placed until you click "Accept" on our cookie banner.`,
      ],
    },
    {
      id: 'categories',
      title: '3. Cookie Categories',
      paragraphs: [],
      subsections: [
        {
          title: 'Strictly necessary cookies',
          paragraphs: [
            'These cookies are required for the website to function and cannot be switched off in our systems. They are usually set in response to actions you take, such as setting privacy preferences or filling in forms.',
          ],
          listItems: [
            'tereosa-cookie-consent — stores your analytics consent choice (accepted / declined). Duration: persistent until cleared.',
            'NEXT_LOCALE — remembers your selected language preference. Duration: session / persistent depending on configuration.',
          ],
        },
        {
          title: 'Analytics cookies (consent required)',
          paragraphs: [
            'These cookies help us understand how visitors interact with the website by collecting information anonymously or in pseudonymous form. They are only activated if you accept analytics cookies.',
          ],
          listItems: [
            '_ga, _ga_* — Google Analytics identifiers used to distinguish users and sessions. Provider: Google LLC. Duration: up to 24 months.',
            '_gid — Google Analytics session identifier. Duration: 24 hours.',
            'Google Tag Manager containers — may set additional technical cookies to load analytics tags. Provider: Google LLC.',
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: '4. Third-Party Cookies',
      paragraphs: [
        'Some cookies are set by third-party services that appear on our pages, such as embedded maps or video players. We do not control these cookies. Please refer to the relevant third party\'s privacy policy for more information.',
      ],
    },
    {
      id: 'manage',
      title: '5. Managing Your Preferences',
      paragraphs: [
        'When you first visit the site, you can accept or decline analytics cookies via the cookie banner. You can change your choice at any time by clearing site data in your browser and revisiting the site, or by adjusting your browser settings to block or delete cookies.',
        'Most browsers allow you to refuse cookies or alert you when a cookie is being sent. Disabling strictly necessary cookies may affect site functionality. For guidance, visit your browser\'s help pages (Chrome, Firefox, Safari, Edge).',
        'To opt out of Google Analytics across websites, you may install the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).',
      ],
    },
    {
      id: 'legal-basis',
      title: '6. Legal Basis',
      paragraphs: [
        'Strictly necessary cookies are used based on our legitimate interest in operating a secure, functional website. Analytics cookies are used only with your consent, in line with the ePrivacy Directive, GDPR, LGPD, and PDPA requirements where applicable.',
      ],
    },
    {
      id: 'updates',
      title: '7. Updates',
      paragraphs: [
        'We may update this Cookie Policy when we change the cookies or tracking technologies we use. Please review this page periodically. For broader information about how we process personal data, see our [Privacy Policy](/legal/privacy).',
      ],
    },
  ],
};

export const legalNoticeEn: LegalDocument = {
  title: 'Legal Notice',
  description:
    'Legal information about the publisher of tereosa.com, hosting, intellectual property, and terms governing use of this website.',
  lastUpdated: 'Last updated',
  contactLabel: 'Legal contact',
  contactEmail: emails.legal,
  sections: [
    {
      id: 'publisher',
      title: '1. Website Publisher',
      paragraphs: [
        `This website (${website}) is published by ${name}, a company engaged in sugar production, bioenergy, agricultural services, and related industrial activities.`,
        `Registered office: ${address}. ${registration}.`,
        `General enquiries: [${emails.info}](mailto:${emails.info})`,
      ],
    },
    {
      id: 'publication',
      title: '2. Publication Director',
      paragraphs: [
        `The publication director responsible for editorial content on this website is the ${publicationDirector} of ${name}.`,
        'Press and media enquiries: [sales@tereosa.com](mailto:sales@tereosa.com)',
      ],
    },
    {
      id: 'hosting',
      title: '3. Hosting Provider',
      paragraphs: [`This website is hosted by ${hostingProvider}.`],
    },
    {
      id: 'ip',
      title: '4. Intellectual Property',
      paragraphs: [
        `All content on this website—including text, graphics, logos, icons, images, audio clips, video, data compilations, and software—is the property of ${name} or its licensors and is protected by copyright, trademark, and other intellectual property laws.`,
        'The Tereos name, logo, and related marks are registered or pending trademarks. Unauthorised reproduction, distribution, modification, or public display of any site content without prior written consent is prohibited, except for personal, non-commercial viewing or as permitted by mandatory law.',
      ],
    },
    {
      id: 'liability',
      title: '5. Limitation of Liability',
      paragraphs: [
        `${name} endeavours to ensure that information on this website is accurate and up to date. However, content is provided for general information purposes only and does not constitute professional, financial, legal, or investment advice.`,
        'We make no warranty, express or implied, regarding the completeness, reliability, or availability of the website or its content. To the fullest extent permitted by law, Tereos shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website or reliance on its content.',
        'The website may contain forward-looking statements about business plans and market conditions. Actual results may differ materially. We undertake no obligation to update such statements.',
      ],
    },
    {
      id: 'links',
      title: '6. External Links',
      paragraphs: [
        'This website may contain links to third-party websites for your convenience. Tereos does not control and is not responsible for the content, privacy practices, or availability of external sites. Inclusion of a link does not imply endorsement.',
      ],
    },
    {
      id: 'terms-of-use',
      title: '7. Terms of Use',
      paragraphs: [
        'By accessing and using this website, you agree to the following terms:',
        'You may view and download content for personal, non-commercial use only, unless otherwise stated for specific downloads.',
        'We reserve the right to suspend or restrict access to the website at any time for maintenance, security, or legal reasons.',
      ],
      listItems: [
        'You must not attempt to gain unauthorised access to our systems, introduce malware, scrape content at scale, or interfere with the proper functioning of the site.',
        'You must not use the site in any way that violates applicable laws or infringes the rights of others.',
        'Information submitted through forms must be accurate and must not contain unlawful, offensive, or confidential third-party data without authorisation.',
      ],
    },
    {
      id: 'privacy-reference',
      title: '8. Privacy and Cookies',
      paragraphs: [
        'Personal data collected through this website is processed in accordance with our [Privacy Policy](/legal/privacy). Cookies and similar technologies are described in our [Cookie Policy](/legal/cookies).',
      ],
    },
    {
      id: 'law',
      title: '9. Applicable Law and Jurisdiction',
      paragraphs: [
        'This Legal Notice and your use of the website are governed by the laws of Thailand, without regard to conflict-of-law principles. Subject to mandatory consumer protection rules in your country of residence, any dispute relating to this website shall be submitted to the exclusive jurisdiction of the courts of Bangkok, Thailand.',
        'If you access this site from outside Thailand, you are responsible for compliance with local laws.',
      ],
    },
    {
      id: 'changes',
      title: '10. Changes',
      paragraphs: [
        'Tereos may revise this Legal Notice at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms. The date of the latest revision appears at the bottom of this page.',
      ],
    },
  ],
};

export const accessibilityStatementEn: LegalDocument = {
  title: 'Accessibility Statement',
  description:
    'Our commitment to making tereosa.com accessible to all users in line with WCAG 2.1 Level AA.',
  lastUpdated: 'Last updated',
  contactLabel: 'Accessibility contact',
  contactEmail: emails.accessibility,
  sections: [
    {
      id: 'commitment',
      title: '1. Our Commitment',
      paragraphs: [
        `${name} is committed to ensuring digital accessibility for people with disabilities. We want everyone who visits ${website} to be able to perceive, understand, navigate, and interact with our content and services.`,
        'We treat accessibility as an ongoing effort. As we add pages, features, and third-party integrations, we review new work against established accessibility criteria before release.',
      ],
    },
    {
      id: 'standard',
      title: '2. Conformance Status',
      paragraphs: [
        'This website aims to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.',
        'We assess conformance using a combination of automated testing (Lighthouse, axe-core), manual keyboard navigation reviews, screen reader spot checks, and responsive layout testing at up to 200% zoom.',
        'Automated axe and Lighthouse accessibility checks run in our continuous integration pipeline on key public pages before each production release.',
        'Partial conformance may apply to archived PDF documents or third-party embedded content that we do not fully control. Where we identify gaps, we document them below and work to remediate or provide alternatives.',
      ],
    },
    {
      id: 'features',
      title: '3. Accessibility Features',
      paragraphs: ['The tereosa.com experience includes the following accessibility features:'],
      listItems: [
        'Skip-to-content link on every page to bypass repeated navigation.',
        'Semantic HTML5 landmarks (header, main, footer, nav) for screen reader navigation.',
        'Keyboard-navigable menus, filters, modals, and interactive map controls.',
        'Visible focus indicators on links, buttons, and form fields.',
        'Support for prefers-reduced-motion to limit non-essential animation.',
        'Alternative text on informative images and ARIA labels on icon-only controls.',
        'Sufficient colour contrast for body text (minimum 4.5:1 where applicable).',
        'Responsive layouts that reflow without loss of content up to 200% browser zoom.',
        'Form labels, error messages, and dialog roles on cookie consent and download gates.',
      ],
    },
    {
      id: 'compatibility',
      title: '4. Browser and Assistive Technology Support',
      paragraphs: [
        'This site is designed to work with current versions of major browsers including Chrome, Firefox, Safari, and Edge on desktop and mobile devices.',
        'We test with common assistive technologies such as NVDA and VoiceOver. Older browsers or unsupported assistive technology combinations may not provide the full intended experience.',
      ],
    },
    {
      id: 'limitations',
      title: '5. Known Limitations',
      paragraphs: ['Despite our efforts, some areas may not yet be fully accessible:'],
      listItems: [
        'Some downloadable PDF reports may not be fully tagged for screen readers until updated editions are published.',
        'Third-party maps or analytics scripts may introduce temporary focus or contrast issues outside our direct control.',
        'Very old PDFs linked from the news archive may lack accessible structure.',
      ],
    },
    {
      id: 'feedback',
      title: '6. Feedback and Assistance',
      paragraphs: [
        `If you encounter an accessibility barrier on ${website}, or need information in an alternative format, please contact us. We aim to acknowledge your message within two business days and provide a substantive response within five business days.`,
        `Email [${emails.accessibility}](mailto:${emails.accessibility}) with the page URL, a description of the issue, and your preferred contact method. Where possible, include the browser and assistive technology you are using.`,
        'You may also reach us through our [Contact page](/contact) by selecting a relevant department.',
      ],
    },
    {
      id: 'enforcement',
      title: '7. Enforcement Procedure (European Union)',
      paragraphs: [
        'This section applies to users in the European Union and European Economic Area who wish to enforce their rights under the EU Web Accessibility Directive (Directive (EU) 2016/2102), the European Accessibility Act (Directive (EU) 2019/882) where applicable, and transposing national laws.',
        'If you submit an accessibility complaint under section 6 and are not satisfied with our response within the stated timeframe, you may escalate the matter to the competent enforcement body or equality body in your EU Member State.',
        'National contact points vary by country. The European Commission maintains a list of web accessibility enforcement procedures and monitoring bodies in Member States at [https://digital-strategy.ec.europa.eu/en/policies/web-accessibility](https://digital-strategy.ec.europa.eu/en/policies/web-accessibility).',
        'When contacting an enforcement body, please provide the page URL, a description of the barrier, the date of your complaint to us, and our reference or response if available. We cooperate in good faith with competent authorities.',
      ],
    },
    {
      id: 'related-policies',
      title: '8. Related Policies',
      paragraphs: [
        'Privacy and cookie practices that may affect your experience are described in our [Privacy Policy](/legal/privacy) and [Cookie Policy](/legal/cookies).',
      ],
    },
  ],
};

export const legalDocumentsEn = {
  privacy: privacyPolicyEn,
  cookies: cookiePolicyEn,
  terms: legalNoticeEn,
  accessibility: accessibilityStatementEn,
} as const;
