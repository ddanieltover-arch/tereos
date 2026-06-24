import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Img,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface UserAcknowledgmentEmailProps {
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
  translations: {
    previewText: string;
    thankYou: string;
    dear: string;
    received: string;
    yourMessage: string;
    globalOperations: string;
  };
}

export const UserAcknowledgmentEmail = ({
  firstName,
  lastName,
  subject,
  message,
  translations,
}: UserAcknowledgmentEmailProps) => {
  const previewText = translations.previewText;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://tereosa.com/images/tereosa-logo.png" 
              width="140"
              height="auto"
              alt="Tereosa"
              style={logo}
            />
          </Section>
          
          <Section style={content}>
            <Heading style={h1}>{translations.thankYou}</Heading>
            
            <Section style={textSection}>
              <Text style={text}>
                {translations.dear}
              </Text>
              <Text style={text} dangerouslySetInnerHTML={{ __html: translations.received }} />
            </Section>

            <Section style={messageCard}>
              <Heading style={h2}>{translations.yourMessage}</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              Tereos Açúcar e Energia S.A.<br />
              {translations.globalOperations}<br /><br />
              © {new Date().getFullYear()} Tereosa. All rights reserved.<br />
              <Link href="https://tereosa.com" style={footerLink}>tereosa.com</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UserAcknowledgmentEmail;

const main = {
  backgroundColor: '#f3f4f6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  borderRadius: '12px',
  overflow: 'hidden',
  maxWidth: '600px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
};

const header = {
  backgroundColor: '#f8fafc',
  padding: '32px 40px',
  borderBottom: '1px solid #e2e8f0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '40px',
};

const h1 = {
  color: '#0f172a',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 24px 0',
  letterSpacing: '-0.5px',
};

const textSection = {
  marginBottom: '32px',
};

const text = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px 0',
};

const messageCard = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e2e8f0',
};

const h2 = {
  color: '#334155',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const messageText = {
  color: '#475569',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  backgroundColor: '#0f172a',
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#94a3b8',
  fontSize: '13px',
  lineHeight: '22px',
  margin: '0',
};

const footerLink = {
  color: '#38bdf8',
  textDecoration: 'none',
  fontWeight: '500',
};
