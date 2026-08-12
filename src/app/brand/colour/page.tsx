import type { Metadata } from 'next';
import { CORE_COLOURS, TEXT_COLOURS } from '@/data/brand-spec';
import { ColourGrid } from '@/components/brand/ColourGrid';
import { Callout, PortalPageBody, RuleGrid, Section } from '@/components/brand/primitives';

export const metadata: Metadata = {
  title: 'Colour',
  description:
    'The Itqan Studio palette: a plum ground, warm cream, and an accent that changes cut depending on what it sits on.',
};

export default function ColourPage() {
  return (
    <PortalPageBody href="/brand/colour">
      <Section>
        <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
          The palette alternates: a plum section, then a cream one, then plum
          again. That rhythm is the layout system as much as the colour system —
          it gives long pages a pulse without needing decoration.
        </p>
      </Section>

      <Callout tone="warning" title="One accent, two cuts">
        Mauve and Deep Mauve are the same role, not two colours. Which one you
        use is decided by the surface underneath, never by preference. Mauve on
        cream measures 2.11:1 — a fail so severe the text is barely visible.
      </Callout>

      <Section title="Core" intro="Five colours carry the brand. Click a swatch to copy its hex.">
        <ColourGrid swatches={CORE_COLOURS} />
      </Section>

      <Section title="Text" intro="Three text colours, chosen by the surface rather than by hierarchy.">
        <ColourGrid swatches={TEXT_COLOURS} />
      </Section>

      <Section title="Rules">
        <RuleGrid
          rules={[
            { kind: 'do', text: 'Alternate dark and light sections down a page. It is the rhythm the brand is built on.' },
            { kind: 'do', text: 'Use Mauve #cca4c2 on plum and any dark section — hero, benefits, closing banner.' },
            { kind: 'do', text: 'Use Deep Mauve #6d4a66 on cream, white, and any light-tinted panel.' },
            { kind: 'do', text: 'Keep cream warm. #fffbf5, never pure white.' },
            { kind: 'dont', text: 'Do not put Mauve on a light background. It measures 2.11:1 and fails badly.' },
            { kind: 'dont', text: 'Do not put cream or white text on a mauve fill. Text on mauve is plum.' },
            { kind: 'dont', text: 'Do not introduce a colour outside this page, including tints of these.' },
            { kind: 'dont', text: 'Do not use Sand as body text on light. It is a dark-surface accent.' },
          ]}
        />
      </Section>

      <Callout tone="note" title="In code">
        The two cuts are separate Tailwind tokens on purpose:{' '}
        <code className="font-[family-name:var(--font-mono)] text-[0.8125rem]">
          text-brand-accent
        </code>{' '}
        and{' '}
        <code className="font-[family-name:var(--font-mono)] text-[0.8125rem]">
          text-brand-accent-on-light
        </code>
        . If you find yourself reaching for an opacity to make Mauve work on
        cream, you want the other token.
      </Callout>
    </PortalPageBody>
  );
}
