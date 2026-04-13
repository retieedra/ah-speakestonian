"use client";

import Link from "next/link";
import { ColorBlindModeProvider } from "@/components/version3/ColorBlindModeContext";
import FreeLessonFlowV3 from "@/components/version3/FreeLessonFlowV3";

export default function VersionLessonShellV3() {
  return (
    <ColorBlindModeProvider>
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-20 flex items-center border-b border-black/10 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-[#0072ce] transition hover:underline"
        >
          ← Back to home
        </Link>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        <FreeLessonFlowV3 />
      </div>
    </div>
    </ColorBlindModeProvider>
  );
}
