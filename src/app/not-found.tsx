import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />
      <div className="container-site text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="h1 text-[clamp(2.4rem,5.4vw,4.5rem)]">
          This page drifted from <em className="accent">normal</em>.
        </h1>
        <p className="lede mx-auto mt-6 max-w-[40ch]">The page you were looking for doesn&apos;t exist, or has moved.</p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/ring/" variant="secondary">
            See the ring
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
