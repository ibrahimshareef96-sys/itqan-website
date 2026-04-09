import type { Metadata } from 'next';
import { ThankYouClient } from './ThankYouClient';

export const metadata: Metadata = {
  title: 'Message Received',
  description: "We've received your message and will be in touch within 48 hours.",
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
