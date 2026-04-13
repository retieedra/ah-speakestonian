"use client";

import { useState } from "react";

interface LessonPhrase {
  id: string;
  estonian: string;
  english: string;
  sentenceEstonian: string;
  sentenceEnglish: string;
}

const LESSON_PHRASES: LessonPhrase[] = [
  {
    id: "hello",
    estonian: "Tere",
    english: "Hello",
    sentenceEstonian: "Tere! Kuidas läheb?",
    sentenceEnglish: "Hello! How are you?",
  },
  {
    id: "morning",
    estonian: "Tere hommikust",
    english: "Good morning",
    sentenceEstonian: "Tere hommikust! Head hommikut.",
    sentenceEnglish: "Good morning! Have a good morning.",
  },
  {
    id: "night",
    estonian: "Tere õhtust",
    english: "Good evening",
    sentenceEstonian: "Tere õhtust! Ilus õhtu.",
    sentenceEnglish: "Good evening! Beautiful evening.",
  },
  {
    id: "howAreYou",
    estonian: "Kuidas läheb?",
    english: "How are you?",
    sentenceEstonian: "Tere! Kuidas läheb?",
    sentenceEnglish: "Hello! How are you?",
  },
  {
    id: "iAmGood",
    estonian: "Mul läheb hästi",
    english: "I am good",
    sentenceEstonian: "Kuidas läheb? Mul läheb hästi.",
    sentenceEnglish: "How are you? I am good.",
  },
  {
    id: "thankYou",
    estonian: "Tänan",
    english: "Thank you",
    sentenceEstonian: "Tänan! Palun.",
    sentenceEnglish: "Thank you! You're welcome.",
  },
  {
    id: "please",
    estonian: "Palun",
    english: "Please / You're welcome",
    sentenceEstonian: "Palun, aitäh!",
    sentenceEnglish: "Please, thank you!",
  },
  {
    id: "goodbye",
    estonian: "Head aega",
    english: "Goodbye",
    sentenceEstonian: "Head aega! Nägemist.",
    sentenceEnglish: "Goodbye! See you.",
  },
  {
    id: "niceToMeetYou",
    estonian: "Meeldiv tutvuda",
    english: "Nice to meet you",
    sentenceEstonian: "Tere! Meeldiv tutvuda.",
    sentenceEnglish: "Hello! Nice to meet you.",
  },
];

interface SneakPeekLessonV1Props {
  onComplete: () => void;
  onBack?: () => void;
}

type StepType = "sentence" | "flashcard" | "type";

interface LessonStep {
  phraseIndex: number;
  stepType: StepType;
}

function buildLessonSteps(): LessonStep[] {
  const steps: LessonStep[] = [];
  for (let i = 0; i < LESSON_PHRASES.length; i++) {
    steps.push({ phraseIndex: i, stepType: "sentence" });
    steps.push({ phraseIndex: i, stepType: "flashcard" });
    steps.push({ phraseIndex: i, stepType: "type" });
  }
  return steps;
}

const LESSON_STEPS = buildLessonSteps();

function FlippableFlashcard({
  phrase,
  onFlip,
}: {
  phrase: LessonPhrase;
  onFlip: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((f) => !f);
  };

  return (
    <div className="w-full perspective-[1000px]">
      <div
        className={`relative min-h-[280px] cursor-pointer transform-3d transition-transform duration-500 sm:min-h-[320px] ${
          isFlipped ? "transform-[rotateY(180deg)]" : ""
        }`}
        onClick={handleClick}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white p-8 shadow-xl backface-hidden">
          <p className="text-center text-2xl font-bold text-black sm:text-3xl">
            {phrase.estonian}
          </p>
          <p className="mt-3 text-sm text-black/50">Tap to reveal</p>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-[#0072ce]/5 p-8 shadow-xl backface-hidden transform-[rotateY(180deg)]">
          <p className="text-center text-2xl font-bold text-black sm:text-3xl">
            {phrase.english}
          </p>
          <p className="mt-4 text-sm text-black/50">Tap to flip back</p>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
        className="mt-6 w-full min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  );
}

function TypeQuestion({
  phrase,
  onCorrect,
}: {
  phrase: LessonPhrase;
  onCorrect: () => void;
}) {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const expected = phrase.estonian.trim();
  const answer = input.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrect === true) return;
    const correct = answer === expected;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <p className="mb-2 text-center text-lg text-black/70">
        Type the Estonian for &quot;{phrase.english}&quot;:
      </p>
      <p className="mb-6 text-center text-sm text-black/45">
        Capitalization must match the correct Estonian phrase.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isCorrect === true}
          placeholder="Type your answer..."
          className={`min-h-[56px] rounded-xl border-2 px-4 py-3 text-center text-lg ${
            isCorrect === true
              ? "border-green-500 bg-green-500/10"
              : isCorrect === false
                ? "border-red-500 bg-red-500/10"
                : "border-black/20"
          }`}
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim() || isCorrect === true}
          className="min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] disabled:opacity-50"
        >
          Check
        </button>
      </form>
      {isCorrect === false && (
        <p className="mt-4 text-center text-sm text-red-600">
          The correct answer is &quot;{phrase.estonian}&quot;
        </p>
      )}
    </div>
  );
}

export default function SneakPeekLessonV1({ onComplete, onBack }: SneakPeekLessonV1Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const step = LESSON_STEPS[currentStepIndex];
  const phrase = LESSON_PHRASES[step.phraseIndex];
  const isLast = currentStepIndex === LESSON_STEPS.length - 1;
  const progress = ((currentStepIndex + 1) / LESSON_STEPS.length) * 100;

  const handleNext = () => {
    if (isLast) {
      setIsComplete(true);
      onComplete();
    } else {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur-sm sm:px-8">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
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
        <span className="text-sm text-black/50">Free lesson</span>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-8 sm:px-8">
        <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-[#0072ce] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          {step.stepType === "flashcard" ? (
            <div className="w-full">
              <FlippableFlashcard phrase={phrase} onFlip={handleNext} />
            </div>
          ) : (
            <div className="w-full rounded-2xl border border-black/10 bg-white p-8 shadow-xl sm:p-10">
              {step.stepType === "sentence" && (
                <>
                  <p className="mb-4 text-center text-2xl font-bold text-black sm:text-3xl">
                    {phrase.sentenceEstonian}
                  </p>
                  <p className="mb-8 text-center text-lg text-black/60 sm:text-xl">
                    {phrase.sentenceEnglish}
                  </p>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] active:scale-[0.98]"
                  >
                    Continue
                  </button>
                </>
              )}

              {step.stepType === "type" && (
                <TypeQuestion phrase={phrase} onCorrect={handleNext} />
              )}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-black/50">
            {currentStepIndex + 1} of {LESSON_STEPS.length}
          </p>
        </div>
      </main>
    </div>
  );
}
