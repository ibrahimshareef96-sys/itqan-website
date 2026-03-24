import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Palette, Lightning, PencilSimpleLine } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { SectionLabel } from '@/components/ui/SectionLabel';

const services = [
  {
    Icon: Palette,
    title: 'Brand Identity & Strategy',
    description:
      'We transform your vision into a cohesive, unforgettable digital identity architected from the ground up and built to scale.',
    images: [
      '/images/portfolio/shareefico/cover.png',
      '/images/portfolio/oud-closet/cover.png',
    ],
  },
  {
    Icon: Lightning,
    title: 'Automation & Systems Setup',
    description:
      'We create seamless workflows, automation systems, and integrated platforms that save time, reduce friction, and scale your operations.',
    images: ['/images/portfolio/nexilink/cover.png'],
  },
  {
    Icon: PencilSimpleLine,
    title: 'UI/UX Design & Research',
    description:
      'We design user-centered digital experiences rooted in research, clarity, and usability. From wireframes to high-fidelity prototypes, every decision is informed by user behavior.',
    images: ['/images/portfolio/medacs/cover.png'],
  },
];

const tags = [
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
];

export function Services() {
  return (
    <section className="bg-brand-accent/[0.18] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <FadeUp>
          <SectionLabel icon={<Palette size={13} />} label="Services" />
        </FadeUp>

        <FadeUp delay={0.08} className="mt-6">
          <h2 className="font-sans font-bold text-3xl md:text-[2.5rem] text-brand-dark leading-tight tracking-tight">
            Where clarity becomes identity.
            <br />
            <span className="font-serif font-normal italic text-brand-accent-on-light">
              Where identity becomes growth.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.16} className="mt-5">
          <p className="text-text-secondary text-base leading-relaxed max-w-[62ch]">
            Purpose-led brand strategy, refined design systems, bespoke websites, and seamless
            digital execution, crafted for founders who value detail, direction, and distinction.
          </p>
        </FadeUp>

        {/* Service cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {services.map(({ Icon, title, description, images }, i) => (
            <FadeUp key={title} delay={0.1 + i * 0.09} className="h-full">
              <div className="bg-brand-cream rounded-2xl p-8 flex flex-col h-full border border-brand-accent/15 shadow-[0_4px_24px_rgba(47,28,44,0.04)] hover:shadow-[0_8px_40px_rgba(47,28,44,0.09)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <Icon size={22} className="text-brand-accent mb-5" />
                <h3 className="font-sans font-semibold text-xl text-brand-dark leading-snug mb-4">
                  {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>

                {/* Portfolio mockup thumbnails */}
                <div className="mt-7 flex gap-2.5">
                  {images.map((src, j) => (
                    <div
                      key={j}
                      className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 15vw"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-7">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-brand-dark text-sm font-semibold group hover:opacity-70 transition-opacity duration-200"
                  >
                    View our services
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Capability tag pills */}
        <FadeUp delay={0.35} className="mt-12">
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-brand-dark/18 bg-brand-cream/50 text-[11px] font-medium text-brand-dark tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
