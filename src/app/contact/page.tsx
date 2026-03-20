import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { ContactForm } from '@/components/contact/ContactForm';
import { FadeUp } from '@/components/ui/FadeUp';
import { testimonials } from '@/data/testimonials';
import { ChatCircle } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a call with Itqan Studio and let\'s work together on your next project.',
};

export default function ContactPage() {
  return (
    <section className="bg-brand-cream min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <div>
            <FadeUp>
              <SectionLabel icon={<ChatCircle size={13} />} label="Let's Chat" />
            </FadeUp>

            <FadeUp delay={0.08} className="mt-6">
              <h1 className="font-sans font-bold text-5xl md:text-6xl text-brand-dark leading-tight tracking-tight">
                Book A Call with Us.
              </h1>
              <p className="font-serif italic text-5xl md:text-6xl text-brand-accent-on-light leading-tight tracking-tight mt-1">
                And Let&apos;s Work Together.
              </p>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-7 text-text-secondary text-base leading-relaxed max-w-[50ch]">
                Ready to discuss your project? Book a call with our experts to explore how we can
                help you achieve your vision.
              </p>
            </FadeUp>

            <FadeUp delay={0.26} className="mt-12">
              <TestimonialCarousel testimonials={testimonials} variant="card" />
            </FadeUp>
          </div>

          {/* Right column — form */}
          <FadeUp delay={0.14} className="lg:pt-2">
            <div className="bg-brand-cream/50 rounded-2xl border border-brand-accent/15 p-8 shadow-[0_8px_40px_rgba(47,28,44,0.05)]">
              <p className="font-semibold text-brand-dark text-lg mb-6">Send us a message</p>
              <ContactForm />
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
