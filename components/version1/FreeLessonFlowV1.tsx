"use client";

import { useState } from "react";
import SignUpPrompt from "@/components/SignUpPrompt";
import SneakPeekLessonV1 from "@/components/version1/SneakPeekLessonV1";

type View = "lesson" | "signup";

export default function FreeLessonFlowV1() {
  const [view, setView] = useState<View>("lesson");

  if (view === "signup") {
    return <SignUpPrompt onBack={() => setView("lesson")} />;
  }

  return <SneakPeekLessonV1 onComplete={() => setView("signup")} />;
}
