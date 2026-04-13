"use client";

import { useState } from "react";
import SignUpPrompt from "@/components/SignUpPrompt";
import SneakPeekLesson from "@/components/SneakPeekLesson";

type View = "lesson" | "signup";

export default function FreeLessonFlow() {
  const [view, setView] = useState<View>("lesson");

  if (view === "signup") {
    return <SignUpPrompt onBack={() => setView("lesson")} />;
  }

  return <SneakPeekLesson onComplete={() => setView("signup")} />;
}
