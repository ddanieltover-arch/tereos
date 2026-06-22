import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
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
          <Section style={logoSection}>
            <Img
              src="https://tereosa.com/images/tereosa-logo.png" 
              width="120"
              height="auto"
              alt="Tereos"
              style={logo}
            />
          </Section>
          
          <Heading style={h1}>{translations.thankYou}</Heading>
          
          <Text style={text}>
            {translations.dear}
          </Text>
          <Text style={text} dangerouslySetInnerHTML={{ __html: translations.received }} />
          
          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>{translations.yourMessage}</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Tereos Açúcar e Energia S.A.<br />
            {translations.globalOperations}<br />
            <Link href="https://tereosa.com" style={footerLink}>tereosa.com</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default UserAcknowledgmentEmail;

const main = {
  backgroundColor: '#f4f7f6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '40px',
  borderRadius: '8px',
  borderTop: '4px solid #14B8A6',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const logoSection = {
  marginBottom: '24px',
};

const logo = {
  margin: '0 auto',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const h1 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const h2 = {
  color: '#374151',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '12px',
};

const section = {
  margin: '20px 0',
};

const text = {
  color: '#4B5563',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '10px 0',
};

const messageText = {
  color: '#6B7280',
  fontSize: '15px',
  lineHeight: '24px',
  fontStyle: 'italic',
  borderLeft: '4px solid #E5E7EB',
  paddingLeft: '16px',
  margin: '10px 0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  color: '#9CA3AF',
  fontSize: '13px',
  lineHeight: '22px',
  textAlign: 'center' as const,
  marginTop: '32px',
};

const footerLink = {
  color: '#14B8A6',
  textDecoration: 'none',
};
