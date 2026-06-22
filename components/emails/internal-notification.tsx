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
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 40px 40px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  paddingTop: '32px',
  paddingBottom: '16px',
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
  color: '#555',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '4px 0',
};

const messageText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '24px',
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginTop: '20px',
};
