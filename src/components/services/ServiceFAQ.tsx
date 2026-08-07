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
      'Itqan Studio is a Dubai-based design and AI agency, and one partner for the whole growth stack: brand identity and creative direction, websites that convert, content and social media marketing, SEO, AI visibility (GEO), web hosting and infrastructure, and agentic AI automation. Everything is designed, built and run by the same senior team, so the parts fit and the outcome compounds.',
  },
  {
    question: 'Do you do SEO and AI visibility (GEO)?',
    answer:
      'Yes. We do both traditional SEO — the structure, content and technical signals that help buyers find you in search — and AI visibility, also called generative engine optimization (GEO), which works to get your brand named when buyers ask ChatGPT, Claude and Gemini who to hire. We can’t promise a specific ranking or an AI citation — no honest partner can — but we build for it and track how often you show up.',
  },
  {
    question: 'Do you host and run websites after launch?',
    answer:
      'Yes. Web hosting and infrastructure is one of our services. Because we design and build the site, one team can host it, keep it live and stable, and maintain it after launch — so you never hand a finished site to a separate hosting company that didn’t build it.',
  },
  {
    question: 'Do you run content and social media?',
    answer:
      'Yes. We offer content and social media marketing as a content engine that ships every week in your voice — planned, produced and posted across the channels your buyers use. We built the same kind of system for Shareefico, where two brands ship 4+ pieces per week from one custom CMS.',
  },
  {
    question: 'Is Itqan Studio a Dubai agency, and do you work with clients outside the UAE?',
    answer:
      'Yes. Itqan Studio operates from Dubai, United Arab Emirates, and works with founders across the UAE, the wider GCC, and globally. Most work is delivered remotely, so location is rarely a constraint. The team works in both English and Arabic.',
  },
  {
    question: 'What makes Itqan different from a typical design or marketing agency in Dubai?',
    answer:
      'Most companies hand off disconnected deliverables — a logo from one agency, a website from another, SEO and content from a third, hosting from a fourth. Itqan is one partner for the whole stack: brand, web, content, SEO, AI visibility, hosting and automation, designed, built and run in-house. We build our own products, like Mutqin and Project You, the same way — so the method is proven before we sell it.',
  },
  {
    question: 'How does an Itqan engagement work?',
    answer:
      'Itqan works in three connected phases. Identity builds the brand, positioning and voice. System assembles the tooling, workflows and content engine. Automation adds an agentic layer that runs the operation with a human in control. Each phase ships working assets, not slide decks — and one senior team stays to keep it running.',
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
      'Every engagement can start with a free AI Visibility Check — we show you where your brand stands when buyers ask AI, with three fixes. From there, pricing depends on scope, from a single capability to the full brand-to-automation build. The fastest way to a quote is to start a conversation.',
  },
  {
    question: 'How do I start a project with Itqan Studio?',
    answer:
      'Book a discovery call or send a message from the contact page. Itqan responds within 24 hours and confirms fit before any engagement begins.',
  },
];

export function ServiceFAQ() {
  return (
    <section
      className="bg-[#f5efe6] dark:bg-[#1a0f1c] py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              6
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Common questions
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2
            id="faq-heading"
            className="mt-7 sm:mt-8 font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', maxWidth: '20ch' }}
          >
            Questions founders{' '}
            <span
              className="text-brand-accent-on-light dark:text-brand-accent"
              style={{ fontFamily: "var(--font-serif), serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              ask
            </span>
            .
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="mt-12 md:mt-16 divide-y divide-black/[0.1] dark:divide-brand-cream/[0.1] border-t border-black/[0.1] dark:border-brand-cream/[0.1]">
            {SERVICE_FAQ.map((item, i) => (
              <details key={item.question} className="group py-5 md:py-6" open={i === 0}>
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans font-semibold text-text-primary dark:text-brand-cream text-[1.0625rem] md:text-[1.1875rem] leading-[1.4]">
                    {item.question}
                  </h3>
                  <Plus
                    size={22}
                    weight="bold"
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 text-brand-accent-on-light dark:text-brand-accent transition-transform duration-200 ease-out group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 text-text-secondary dark:text-brand-cream/70 text-[0.9375rem] md:text-[1.0625rem] leading-[1.7] max-w-[68ch]">
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
