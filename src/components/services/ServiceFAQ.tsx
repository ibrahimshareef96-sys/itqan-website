import { Plus } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import type { FaqItem } from '@/lib/seo';

/**
 * Common founder questions. Written GEO-first: each answer leads with a direct,
 * objective, factual sentence (lower model "perplexity" → higher LLM-citation
 * odds) and is grounded in real case-study outcomes. Exported so the page can
 * emit matching FAQPage JSON-LD. Native <details> keeps every answer in the
 * server-rendered HTML — fully crawlable by Google and AI bots even collapsed.
 */
export const SERVICE_FAQ: readonly FaqItem[] = [
  {
    question: 'What does Itqan Studio do?',
    answer:
      'Itqan Studio is a Dubai-based design, automation and AI agency. We build four things as one connected system: brand identity, UI/UX and web design, custom web and app development, and agentic AI automation — so founders launch with a brand, a working product, and an operating system that runs without them.',
  },
  {
    question: 'Is Itqan Studio a Dubai agency, and do you work with clients outside the UAE?',
    answer:
      'Yes. Itqan Studio operates from Dubai, United Arab Emirates, and works with founders across the UAE, the wider GCC, and globally. Most work is delivered remotely, so location is rarely a constraint. The team works in both English and Arabic.',
  },
  {
    question: 'What makes Itqan different from a typical design or marketing agency in Dubai?',
    answer:
      'Most agencies hand off disconnected deliverables — a logo here, a website there, automation later. Itqan ships brand, system and automation as one operating system in 90 days, designed and engineered in-house. We build our own products, like Mutqin and Project You, the same way — so the method is proven before we sell it.',
  },
  {
    question: 'What is the 90-Day Founder Operating System?',
    answer:
      'It is Itqan’s core program, delivered in three phases. Identity (days 1–30) builds the brand and positioning. System (days 31–60) assembles the tooling and workflows. Automation (days 61–90) adds an agentic layer you can run from Telegram. Each phase ships working assets, not slide decks.',
  },
  {
    question: 'Do you build AI automation and agentic systems?',
    answer:
      'Yes. We design and build agentic AI automation — lead capture and qualification, content distribution, and reporting — that runs your operations with a human in control. Recent builds include the AI product Mutqin and a Claude-powered coach inside Project You.',
  },
  {
    question: 'How fast can you deliver a brand and website?',
    answer:
      'Fast. Itqan delivered a full brand and investor-ready product in 3 weeks for Nexilink, and a brand plus custom CMS in under 30 days for Shareefico — against industry averages of 8 to 24 weeks for comparable scope.',
  },
  {
    question: 'How much does it cost to work with Itqan Studio?',
    answer:
      'Engagements start with a $497 Brand Audit — a one-hour diagnostic with three specific fixes — and scale up to the full 90-Day Founder Operating System. Pricing depends on scope; the fastest way to a quote is to book a discovery call.',
  },
  {
    question: 'How do I start a project with Itqan Studio?',
    answer:
      'Book a discovery call or send a message from the contact page. Itqan responds within 24 hours and confirms fit before any engagement begins.',
  },
];

export function ServiceFAQ() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="faq-heading">
      <div className="max-w-[900px] mx-auto px-5 md:px-8">
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            Common questions
          </p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2
            id="faq-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', maxWidth: '20ch' }}
          >
            Questions founders <span className="accent-italic">ask.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="mt-12 md:mt-16 divide-y divide-brand-cream/[0.1] border-t border-brand-cream/[0.1]">
            {SERVICE_FAQ.map((item, i) => (
              <details key={item.question} className="group py-5 md:py-6" open={i === 0}>
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans font-semibold text-brand-cream text-[1.0625rem] md:text-[1.1875rem] leading-[1.4]">
                    {item.question}
                  </h3>
                  <Plus
                    size={22}
                    weight="bold"
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 text-brand-accent transition-transform duration-200 ease-out group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 text-brand-cream/70 text-[0.9375rem] md:text-[1.0625rem] leading-[1.7] max-w-[68ch]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
