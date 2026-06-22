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
  const previewText = `New contact form submission from ${firstName} ${lastName}`;

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

          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={section}>
            <Text style={text}>
              <strong>Department:</strong> {department}
            </Text>
            <Text style={text}>
              <strong>Subject:</strong> {subject}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Sender Details</Heading>
            <Text style={text}>
              <strong>Name:</strong> {firstName} {lastName}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link>
            </Text>
            {phone && (
              <Text style={text}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Hr style={hr} />
          <Text style={footer}>
            Tereos Corporate Website — Auto-generated notification
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default InternalNotificationEmail;

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
  color: '#444',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 10px 0',
};

const section = {
  margin: '10px 0',
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
