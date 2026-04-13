import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
      <div className="mx-auto w-full max-w-lg text-center">
        <div className="mb-10 flex justify-center">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-[#0072ce]" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl">SpeakEstonian</h1>
        <p className="mb-12 text-base text-black/60 sm:text-lg">
          Choose a version to try the free lesson.
        </p>
        <nav className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/original"
            className="flex min-h-[52px] items-center justify-center rounded-xl border-2 border-black/10 bg-white px-8 py-3 font-semibold text-black shadow-sm transition hover:border-[#0072ce]/40 hover:bg-[#0072ce]/5"
          >
            Original Version
          </Link>
          <Link
            href="/improved"
            className="flex min-h-[52px] items-center justify-center rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3]"
          >
            Improved Version
          </Link>
        </nav>
      </div>
    </div>
  );
}
