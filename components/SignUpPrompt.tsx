"use client";

const WAITLIST_URL = "https://www.speakestonian.com/#waitlist";

interface SignUpPromptProps {
  onBack?: () => void;
}

export default function SignUpPrompt({ onBack }: SignUpPromptProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      {/* Header - matches landing page */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur-sm sm:px-8">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-lg px-3 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black"
              aria-label="Back to home"
            >
              ← Back
            </button>
          )}
          <div className="h-6 w-6 shrink-0 rounded-md bg-[#0072ce]" />
          <span className="font-bold text-black">SpeakEstonian</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-2xl border border-black/10 bg-white p-8 shadow-xl sm:p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-black sm:text-3xl">
            Tubli töö!
          </h2>
          <p className="mb-8 text-center text-base leading-relaxed text-black/60 sm:text-lg">
            We are currently building the curriculum. Join the waitlist to receive
            updates and be the first to know when we launch.
          </p>

          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] active:scale-[0.98] sm:w-auto"
          >
            Sign up
          </a>
        </div>
      </main>
    </div>
  );
}
