"use client";

import { useState } from "react";
import SignUpPrompt from "@/components/SignUpPrompt";
import SneakPeekLessonV3 from "@/components/version3/SneakPeekLessonV3";

type View = "lesson" | "signup";

export default function FreeLessonFlowV3() {
  const [view, setView] = useState<View>("lesson");

  if (view === "signup") {
    return <SignUpPrompt onBack={() => setView("lesson")} />;
  }

  return <SneakPeekLessonV3 onComplete={() => setView("signup")} />;
}
