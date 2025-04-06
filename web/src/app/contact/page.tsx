import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact - AMO Platform',
  description: 'Get in touch with the AMO Platform team',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <ContactForm />
    </div>
  );
} 