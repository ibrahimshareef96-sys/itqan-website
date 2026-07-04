import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { ContactForm } from '@/components/contact/ContactForm';
import { FadeUp } from '@/components/ui/FadeUp';
import { TextReveal } from '@/components/ui/TextReveal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { testimonials } from '@/data/testimonials';
import { ChatCircle } from '@phosphor-icons/react/dist/ssr';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact — Book a Call With Our Dubai Studio',
  description:
    'Book a discovery call with Itqan Studio — a Dubai design and AI agency covering brand, web, SEO, AI visibility (GEO), hosting and automation — or send a message. We respond within 24 hours.',
  alternates: { canonical: '/contact' },
};

interface IntentCopy {
  label: string;
  heading: string;
  subheading: string;
  body: string;
}

const INTENT_COPY: Record<string, IntentCopy> = {
  audit: {
    label: '$497 Brand Audit',
    heading: 'Book your $497 Brand Audit.',
    subheading: '1 hour. Diagnostic report. 3 specific fixes.',
    body: 'Tell us about your company and what you want clarity on. We respond within 24 hours and book the call from there.',
  },
  'identity-sprint': {
    label: 'Identity Sprint',
    heading: 'Start the Identity Sprint.',
    subheading: '14 days. Strategy + visual system + content positioning.',
    body: 'Share a bit about your business and the deadline. We schedule a discovery call to confirm fit before kickoff.',
  },
  'system-automation': {
    label: 'System + Automation',
    heading: 'Build the system + automation.',
    subheading: '60 days. For founders whose brand is already strong.',
    body: 'Tell us where you are with your brand and what manual work is eating your week.',
  },
  'founder-os-core': {
    label: 'Founder OS Core',
    heading: 'Book a Founder OS discovery call.',
    subheading: 'The full 90-day program. Identity → System → Automation.',
    body: "Tell us about your company and where you are today. We'll confirm fit on the call.",
  },
  'founder-os-quarterly': {
    label: 'Founder OS Quarterly+',
    heading: 'Founder OS + 90 days of support.',
    subheading: 'For founders who want runway after the build.',
    body: 'Share your context. We schedule a call to talk through scope and timing.',
  },
};

const DEFAULT_COPY: IntentCopy = {
  label: 'Start a conversation',
  heading: 'Start a conversation.',
  subheading: 'Private. Senior. No sales team.',
  body: "Tell us what you're deciding. You'll hear back from a principal — not a bot, not a junior — within 24 hours.",
};

interface Props {
  searchParams: { intent?: string };
}

export default function ContactPage({ searchParams }: Props) {
  const intent = typeof searchParams.intent === 'string' ? searchParams.intent : undefined;
  const copy = (intent && INTENT_COPY[intent]) || DEFAULT_COPY;

  return (
    <section className="bg-brand-cream dark:bg-[#1f1420] min-h-[100dvh] pt-10 md:pt-16 pb-20 sm:pb-24">
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <div>
            <FadeUp>
              <SectionLabel icon={<ChatCircle size={13} />} label={copy.label} />
            </FadeUp>

            <TextReveal direction="up" delay={0.08} className="mt-6">
              <h1 className="font-sans font-semibold text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl text-text-primary dark:text-brand-cream leading-tight tracking-[-0.02em]">
                {copy.heading}
              </h1>
              <p className="font-sans font-normal text-[1.25rem] sm:text-2xl text-text-secondary dark:text-brand-cream/65 leading-relaxed mt-3">
                {copy.subheading}
              </p>
            </TextReveal>

            <FadeUp delay={0.16}>
              <p className="mt-7 text-text-secondary dark:text-brand-cream/60 text-base leading-relaxed max-w-[50ch]">
                {copy.body}
              </p>
            </FadeUp>

            {/* AI-moment — buyers now ask AI who to hire (in-voice, honest) */}
            <FadeUp delay={0.2}>
              <p className="mt-6 text-[0.9375rem] sm:text-base leading-relaxed max-w-[46ch] text-text-primary dark:text-brand-cream/85">
                You found us.{' '}
                <span
                  className="text-brand-accent-on-light dark:text-brand-accent"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
                >
                  Your buyers
                </span>{' '}
                should find you the same way.
              </p>
            </FadeUp>

            <ScrollReveal direction="left" distance={28} delay={0.26} className="mt-12">
              <TestimonialCarousel testimonials={testimonials} variant="card" />
            </ScrollReveal>
          </div>

          {/* Right column — form */}
          <ScrollReveal direction="right" distance={28} delay={0.14} className="lg:pt-2">
            <div className="rounded-2xl bg-white dark:bg-[#241626] border border-black/[0.08] dark:border-brand-cream/[0.12] shadow-[0_2px_12px_rgba(47,28,44,0.06)] dark:shadow-none p-8">
              <p className="font-semibold text-text-primary dark:text-brand-cream text-lg mb-6">Send us a message</p>
              <ContactForm intent={intent} />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
