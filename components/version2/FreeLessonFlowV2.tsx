"use client";

import { useState } from "react";
import SignUpPrompt from "@/components/SignUpPrompt";
import SneakPeekLessonV2 from "@/components/version2/SneakPeekLessonV2";

type View = "lesson" | "signup";

export default function FreeLessonFlowV2() {
  const [view, setView] = useState<View>("lesson");

  if (view === "signup") {
    return <SignUpPrompt onBack={() => setView("lesson")} />;
  }

  return <SneakPeekLessonV2 onComplete={() => setView("signup")} />;
}
