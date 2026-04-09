import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Palette,
  Lightning,
  PencilSimpleLine,
  Code,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { TextReveal } from '@/components/ui/TextReveal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Services — Brand Design, UI/UX, Web Development & Automation',
  description:
    'Itqan Studio offers brand identity design, UI/UX research, custom web and mobile app development, CRM systems, and workflow automation. Crafted for founders who value detail and distinction.',
};

const capabilities = [
  'Web Development',
  'Integrations',
  'Prototyping',
  'Design System',
  'UI & UX Strategy',
  'Copywriting',
  'Branding',
  'SEO',
  'Content Creation Strategy',
  'Funnel Architecture',
  'Automation',
  'Custom CRM Development',
  'Native Mobile Apps',
  'Internal Tools',
  'System Architecture',
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark py-36 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_60%,rgba(204,164,194,0.13),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(209,194,165,0.05),transparent)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-0">
          <FadeUp delay={0.1}>
            <SectionLabel icon={<Palette size={13} />} label="Services" light />
          </FadeUp>

          <TextReveal direction="left" delay={0.2} className="mt-7">
            <h1 className="font-sans font-bold text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl text-brand-cream leading-tight tracking-tight">
              Our Services
            </h1>
            <p className="font-serif italic text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl text-brand-accent leading-tight tracking-tight mt-1">
              Excellence in every detail.
            </p>
          </TextReveal>

          <FadeUp delay={0.32}>
            <p className="mt-8 text-brand-cream/60 text-base md:text-lg leading-relaxed max-w-[54ch]">
              Purpose-led brand strategy, refined design systems, bespoke websites, and seamless
              digital execution — crafted for founders who value detail, direction, and distinction.
            </p>
          </FadeUp>

          <FadeUp delay={0.44}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-accent text-brand-dark px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
              >
                Book a meeting
                <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Brand Identity & Strategy ────────────────────────── */}
      <section className="bg-brand-cream py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal direction="left" distance={28}>
              <div>
                <Palette size={28} className="text-brand-accent-on-light mb-6" />
                <h2 className="font-sans font-bold text-[1.875rem] sm:text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight">
                  Brand Identity
                  <br />
                  <span className="font-serif font-normal italic text-brand-accent-on-light">
                    &amp; Strategy
                  </span>
                </h2>
                <p className="mt-6 text-text-secondary text-base leading-relaxed">
                  We transform your vision into a cohesive, unforgettable digital identity
                  architected from the ground up and built to scale. From brand positioning and
                  visual identity to messaging frameworks and style guides, we craft brands that
                  resonate, differentiate, and endure.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    'Brand Strategy & Positioning',
                    'Visual Identity Design (Logo, Colors, Typography)',
                    'Brand Guidelines & Style Guide',
                    'Messaging Framework & Tone of Voice',
                    'Brand Collateral Design',
                    'Creative Direction',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle size={17} weight="fill" className="text-brand-accent-on-light shrink-0" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
                  >
                    Start your brand project
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" distance={28} delay={0.16} className="grid grid-cols-2 gap-4">
              {[
                '/images/portfolio/shareefico/cover.png',
                '/images/portfolio/oud-closet/cover.png',
                '/images/portfolio/shareefico/mockup-1.png',
                '/images/portfolio/oud-closet/mockup-1.png',
              ].map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Automation & Systems ─────────────────────────────── */}
      <section className="bg-brand-accent/[0.12] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal direction="left" distance={28} delay={0.16} className="order-last lg:order-first relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/portfolio/nexilink/cover.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>

            <ScrollReveal direction="right" distance={28}>
              <div>
                <Lightning size={28} className="text-brand-accent-on-light mb-6" />
                <h2 className="font-sans font-bold text-[1.875rem] sm:text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight">
                  Automation &amp;
                  <br />
                  <span className="font-serif font-normal italic text-brand-accent-on-light">
                    Systems Setup
                  </span>
                </h2>
                <p className="mt-6 text-text-secondary text-base leading-relaxed">
                  We create seamless workflows, automation systems, and integrated platforms that
                  save time, reduce friction, and scale your operations. From CRM setups to content
                  dashboards to custom workflows, your business becomes effortlessly efficient.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    'CRM Setup & Configuration',
                    'Workflow Automation',
                    'Content Management Systems',
                    'Integration Architecture',
                    'Dashboard & Reporting Setup',
                    'Process Documentation',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle size={17} weight="fill" className="text-brand-accent-on-light shrink-0" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
                  >
                    Automate your workflow
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── UI/UX Design & Research ──────────────────────────── */}
      <section className="bg-brand-cream py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal direction="left" distance={28}>
              <div>
                <PencilSimpleLine size={28} className="text-brand-accent-on-light mb-6" />
                <h2 className="font-sans font-bold text-[1.875rem] sm:text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight">
                  UI/UX Design
                  <br />
                  <span className="font-serif font-normal italic text-brand-accent-on-light">
                    &amp; Research
                  </span>
                </h2>
                <p className="mt-6 text-text-secondary text-base leading-relaxed">
                  We design user-centered digital experiences rooted in research, clarity, and
                  usability. From wireframes to high-fidelity prototypes, every decision is informed
                  by user behavior and crafted to deliver frictionless interaction.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    'UX Research & User Interviews',
                    'User Persona Development',
                    'Wireframing & Information Architecture',
                    'High-Fidelity UI Design',
                    'Usability Testing',
                    'Interactive Prototyping',
                    'Design Systems',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle size={17} weight="fill" className="text-brand-accent-on-light shrink-0" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
                  >
                    Start your design project
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" distance={28} delay={0.16} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/portfolio/medacs/cover.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Systems & Development ──────────────────────────── */}
      <section className="bg-brand-accent/[0.12] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal direction="left" distance={28} delay={0.16} className="order-last lg:order-first relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/itqan-crm.png"
                alt="Itqan Studio custom CRM dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>

            <ScrollReveal direction="right" distance={28}>
              <div>
                <Code size={28} className="text-brand-accent-on-light mb-6" />
                <h2 className="font-sans font-bold text-[1.875rem] sm:text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight">
                  Systems &amp;
                  <br />
                  <span className="font-serif font-normal italic text-brand-accent-on-light">
                    Development
                  </span>
                </h2>
                <p className="mt-4 mb-2 font-serif italic text-base text-brand-accent-on-light">
                  Built to fit your brand — not borrowed from a template.
                </p>
                <p className="mt-4 text-text-secondary text-base leading-relaxed">
                  From custom CRM systems to web and native applications, we build the digital
                  products your business actually needs. Every system is designed and developed
                  in-house — so your product looks, feels, and functions like an extension of your
                  brand, not an afterthought bolted on top of it.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    'Custom CRM Development',
                    'Web Applications',
                    'Native Mobile Apps',
                    'Internal Tools',
                    'Brand-Aligned UI',
                    'System Architecture',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle size={17} weight="fill" className="text-brand-accent-on-light shrink-0" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-xs text-text-secondary tracking-wide uppercase">
                  Typical delivery: 4–12 weeks
                </p>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
                  >
                    Start your project
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Additional Capabilities ──────────────────────────── */}
      <section className="bg-brand-accent/[0.12] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-brand-dark leading-tight tracking-tight">
              Additional Capabilities
            </h2>
            <p className="mt-4 text-text-secondary text-base leading-relaxed max-w-[60ch]">
              Beyond our core services, we offer a full range of digital capabilities to support
              your brand&apos;s growth.
            </p>
          </FadeUp>
          <StaggerContainer stagger={0.03} delay={0.1} className="mt-10 flex flex-wrap gap-3">
            {capabilities.map((tag) => (
              <StaggerItem key={tag}>
                <span className="px-4 py-2.5 rounded-full border border-brand-dark/18 bg-brand-cream text-[11px] font-medium text-brand-dark tracking-wide">
                  {tag}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-brand-dark py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_50%,rgba(204,164,194,0.12),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <FadeUp delay={0.1}>
            <h2 className="font-sans font-bold text-[1.875rem] sm:text-4xl md:text-5xl text-brand-cream leading-tight tracking-tight">
              Ready to start your project?
            </h2>
            <p className="font-serif italic text-[1.875rem] sm:text-4xl md:text-5xl text-brand-accent leading-tight tracking-tight mt-2">
              Let&apos;s build something excellent together.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-accent text-brand-dark px-8 py-4 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
              >
                Book a meeting
                <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
