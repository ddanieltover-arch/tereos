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
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface InternalNotificationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  subject: string;
  message: string;
}

export const InternalNotificationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  department,
  subject,
  message,
}: InternalNotificationEmailProps) => {
  const previewText = `New submission: ${subject}`;

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
            <Heading style={h1}>New Contact Inquiry</Heading>
            <Text style={subtitle}>A new message has been submitted via the contact form.</Text>
            
            <Section style={infoCard}>
              <Row>
                <Column style={labelColumn}><Text style={label}>Department</Text></Column>
                <Column><Text style={value}>{department}</Text></Column>
              </Row>
              <Row>
                <Column style={labelColumn}><Text style={label}>Subject</Text></Column>
                <Column><Text style={value}>{subject}</Text></Column>
              </Row>
            </Section>

            <Section style={infoCard}>
              <Heading style={h2}>Sender Information</Heading>
              <Row>
                <Column style={labelColumn}><Text style={label}>Name</Text></Column>
                <Column><Text style={value}>{firstName} {lastName}</Text></Column>
              </Row>
              <Row>
                <Column style={labelColumn}><Text style={label}>Email</Text></Column>
                <Column><Link href={`mailto:${email}`} style={link}>{email}</Link></Column>
              </Row>
              {phone && (
                <Row>
                  <Column style={labelColumn}><Text style={label}>Phone</Text></Column>
                  <Column><Text style={value}>{phone}</Text></Column>
                </Row>
              )}
            </Section>

            <Section style={messageCard}>
              <Heading style={h2}>Message</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Tereosa. All rights reserved.<br />
              This is an automated notification from the Tereosa corporate website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default InternalNotificationEmail;

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
  margin: '0 0 8px 0',
  letterSpacing: '-0.5px',
};

const subtitle = {
  color: '#64748b',
  fontSize: '16px',
  margin: '0 0 32px 0',
};

const h2 = {
  color: '#334155',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const infoCard = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  border: '1px solid #e2e8f0',
};

const messageCard = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  border: '1px solid #e2e8f0',
};

const labelColumn = {
  width: '120px',
  verticalAlign: 'top',
};

const label = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0 0 12px 0',
  fontWeight: '500',
};

const value = {
  color: '#0f172a',
  fontSize: '15px',
  margin: '0 0 12px 0',
  fontWeight: '500',
};

const link = {
  color: '#2563eb',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: '500',
  margin: '0 0 12px 0',
  display: 'block',
};

const messageText = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
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
  lineHeight: '20px',
  margin: '0',
};
