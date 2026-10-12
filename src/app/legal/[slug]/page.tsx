import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lastUpdated, legalDocs } from "@/content/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.description, alternates: { canonical: `/legal/${doc.slug}/` } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <article className="container-site pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[44rem]">
        <p className="eyebrow mb-5">Legal</p>
        <h1 className="h2">{doc.title}</h1>
        <p className="mt-5 text-[14px] text-muted">Last updated {lastUpdated}</p>
        <div className="mt-12 space-y-12">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[20px] font-medium tracking-tight">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-ivory/70">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
