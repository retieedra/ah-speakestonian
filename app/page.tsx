import Image from "next/image";
import Link from "next/link";

const versions = [
  { href: "/version-1", label: "Version 1", variant: "outline" as const },
  { href: "/version-2", label: "Version 2", variant: "outline" as const },
  { href: "/version-3", label: "Version 3", variant: "primary" as const },
] as const;

const outlineClass =
  "flex min-h-[52px] items-center justify-center rounded-xl border-2 border-black/10 bg-white px-8 py-3 font-semibold text-black shadow-sm transition hover:border-[#0072ce]/40 hover:bg-[#0072ce]/5";

const primaryClass =
  "flex min-h-[52px] items-center justify-center rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3]";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
      <div className="mx-auto w-full max-w-lg text-center">
        <div className="relative mb-10 h-40 w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 sm:h-48">
          <Image
            src="/home-hero-tallinn.png"
            alt="Tallinn Old Town and the Estonian flag"
            fill
            className="object-cover object-center"
            sizes="(max-width: 512px) 100vw, 512px"
            priority
          />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl">SpeakEstonian</h1>
        <p className="mb-12 text-base text-black/60 sm:text-lg">
          Choose a version to try the free lesson.
        </p>
        <nav className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          {versions.map(({ href, label, variant }) => (
            <Link
              key={href}
              href={href}
              className={variant === "primary" ? primaryClass : outlineClass}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
