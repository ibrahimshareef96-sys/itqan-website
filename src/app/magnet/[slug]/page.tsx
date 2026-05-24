import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findItqanMagnetBySlug } from "@/lib/magnet-lookup";
import { MagnetLanding } from "@/components/magnet/MagnetLanding";

// Always fetch fresh from Notion (magnets are edited in Notion, we want
// the latest text on every visit). For a production-scale site we would
// add ISR with a 60-300 sec revalidate, but for now full dynamic works.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const magnet = await findItqanMagnetBySlug(slug);
  if (!magnet) {
    return {
      title: "Guide not found · Itqan Studio",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${magnet.title} · Free Guide by Itqan Studio`,
    description: magnet.landingTeaser
      .slice(0, 160)
      .replace(/[#*\n]+/g, " ")
      .trim(),
    openGraph: {
      title: magnet.title,
      description: magnet.landingTeaser
        .slice(0, 200)
        .replace(/[#*\n]+/g, " ")
        .trim(),
      type: "article",
    },
  };
}

export default async function MagnetPage({ params }: Props) {
  const { slug } = await params;
  const magnet = await findItqanMagnetBySlug(slug);
  if (!magnet) notFound();
  return <MagnetLanding magnet={magnet} />;
}
