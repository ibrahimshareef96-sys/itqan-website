import type { Metadata } from 'next';
import { AssetLibrary } from '@/components/brand/AssetLibrary';
import { assetsFor, bundlesFor } from '@/data/brand-library';
import { Callout, PortalPageBody, RuleGrid, Section, SpecTable } from '@/components/brand/primitives';

export const metadata: Metadata = {
  title: 'Call backgrounds',
  description: 'Branded video-call backgrounds for the Itqan Studio team, with the specs that survive compression.',
};

const assets = assetsFor('itqan-studio', ['background']);
const bundles = bundlesFor('itqan-studio', ['background']);

export default function BackgroundsPage() {
  return (
    <PortalPageBody href="/brand/assets/backgrounds">
      <Section>
        <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
          A client call is often the first time someone sees the brand at all.
          These are built to hold up through video compression and to stay
          quiet behind a face — the background is not the presentation.
        </p>
      </Section>

      <Section title="Specs">
        <SpecTable
          columns={['Spec', 'Value', 'Why']}
          rows={[
            ['Resolution', '1920 × 1080', 'What every conferencing tool expects. Higher is downscaled anyway.'],
            ['Safe zone', 'Centre 60%', 'Where the person sits. Keep it empty.'],
            ['Mark placement', 'A corner, small', 'Legible at the thumbnail size a gallery view shrinks you to.'],
            ['Contrast', 'Low, dark', 'Cameras auto-expose for the face; a bright background blows it out.'],
            ['Detail', 'Minimal', 'Fine texture turns to mud through video compression.'],
          ]}
        />
      </Section>

      <AssetLibrary assets={assets} bundles={bundles} categories={['background']} />

      <Section title="Rules">
        <RuleGrid
          rules={[
            { kind: 'do', text: 'Pick a dark background. It flatters camera exposure and matches the brand ground.' },
            { kind: 'do', text: 'Turn OFF background blur when using one. The two together look like an artefact.' },
            { kind: 'do', text: 'Check yourself in gallery view before a client call, not just in speaker view.' },
            { kind: 'dont', text: 'Do not add your name or title to the background. The platform already shows it.' },
            { kind: 'dont', text: 'Do not use a busy or bright background — it pulls focus and wrecks exposure.' },
            { kind: 'dont', text: 'Do not stretch a background to a different aspect ratio. Crop instead.' },
          ]}
        />
      </Section>

      <Callout tone="tip" title="Better than any background">
        A real, tidy, well-lit room beats a virtual background every time.
        These exist for the days that is not available.
      </Callout>
    </PortalPageBody>
  );
}
