"use client";

import Link from "next/link";
import FreeLessonFlowV2 from "@/components/version2/FreeLessonFlowV2";

export default function VersionLessonShellV2() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-20 flex items-center border-b border-black/10 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-[#0072ce] transition hover:underline"
        >
          ← Back to home
        </Link>
      </header>
      <FreeLessonFlowV2 />
    </div>
  );
}
