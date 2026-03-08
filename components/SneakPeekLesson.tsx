"use client";

import { useState } from "react";
import {
  HelloIcon,
  MorningIcon,
  NightIcon,
  HowAreYouIcon,
  IAmGoodIcon,
  ThankYouIcon,
  PleaseIcon,
  GoodbyeIcon,
  NiceToMeetYouIcon,
} from "./LessonIllustrations";

type QuestionType = "multiple_choice" | "type" | "word_blocks";

interface LessonPhrase {
  id: string;
  estonian: string;
  english: string;
  pronunciation: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  sentenceEstonian: string;
  sentenceEnglish: string;
  multipleChoiceOptions: string[];
  wordBlocks: string[];
}

const LESSON_PHRASES: LessonPhrase[] = [
  {
    id: "hello",
    estonian: "Tere",
    english: "Hello",
    pronunciation: "TEH-reh",
    Icon: HelloIcon,
    sentenceEstonian: "Tere! Kuidas läheb?",
    sentenceEnglish: "Hello! How are you?",
    multipleChoiceOptions: ["Tere", "Jah", "Ei", "Palun"],
    wordBlocks: ["Tere", "!", "Kuidas", "läheb", "?"],
  },
  {
    id: "morning",
    estonian: "Tere hommikust",
    english: "Good morning",
    pronunciation: "TEH-reh HOHM-mee-koost",
    Icon: MorningIcon,
    sentenceEstonian: "Tere hommikust! Head hommikut.",
    sentenceEnglish: "Good morning! Have a good morning.",
    multipleChoiceOptions: ["Tere hommikust", "Tere õhtust", "Head aega", "Tere"],
    wordBlocks: ["Tere", "hommikust", "!", "Head", "hommikut", "."],
  },
  {
    id: "night",
    estonian: "Tere õhtust",
    english: "Good evening",
    pronunciation: "TEH-reh OHKH-toost",
    Icon: NightIcon,
    sentenceEstonian: "Tere õhtust! Ilus õhtu.",
    sentenceEnglish: "Good evening! Beautiful evening.",
    multipleChoiceOptions: ["Tere õhtust", "Tere hommikust", "Head aega", "Tänan"],
    wordBlocks: ["Tere", "õhtust", "!", "Ilus", "õhtu", "."],
  },
  {
    id: "howAreYou",
    estonian: "Kuidas läheb?",
    english: "How are you?",
    pronunciation: "KOO-ee-dahs LAE-hehb",
    Icon: HowAreYouIcon,
    sentenceEstonian: "Tere! Kuidas läheb?",
    sentenceEnglish: "Hello! How are you?",
    multipleChoiceOptions: ["Kuidas läheb?", "Mul läheb hästi", "Tänan", "Palun"],
    wordBlocks: ["Kuidas", "läheb", "?"],
  },
  {
    id: "iAmGood",
    estonian: "Mul läheb hästi",
    english: "I am good",
    pronunciation: "mool LAE-hehb HAESH-tee",
    Icon: IAmGoodIcon,
    sentenceEstonian: "Kuidas läheb? Mul läheb hästi.",
    sentenceEnglish: "How are you? I am good.",
    multipleChoiceOptions: ["Mul läheb hästi", "Kuidas läheb?", "Tänan", "Ei"],
    wordBlocks: ["Kuidas", "läheb", "?", "Mul", "läheb", "hästi", "."],
  },
  {
    id: "thankYou",
    estonian: "Tänan",
    english: "Thank you",
    pronunciation: "TAE-nahn",
    Icon: ThankYouIcon,
    sentenceEstonian: "Tänan! Palun.",
    sentenceEnglish: "Thank you! You're welcome.",
    multipleChoiceOptions: ["Tänan", "Palun", "Jah", "Ei"],
    wordBlocks: ["Tänan", "!", "Palun", "."],
  },
  {
    id: "please",
    estonian: "Palun",
    english: "Please / You're welcome",
    pronunciation: "PAH-loon",
    Icon: PleaseIcon,
    sentenceEstonian: "Palun, aitäh!",
    sentenceEnglish: "Please, thank you!",
    multipleChoiceOptions: ["Palun", "Tänan", "Jah", "Head aega"],
    wordBlocks: ["Palun", ",", "aitäh", "!"],
  },
  {
    id: "goodbye",
    estonian: "Head aega",
    english: "Goodbye",
    pronunciation: "HEH-ahd AH-eh-gah",
    Icon: GoodbyeIcon,
    sentenceEstonian: "Head aega! Nägemist.",
    sentenceEnglish: "Goodbye! See you.",
    multipleChoiceOptions: ["Head aega", "Tere", "Tere hommikust", "Palun"],
    wordBlocks: ["Head", "aega", "!"],
  },
  {
    id: "niceToMeetYou",
    estonian: "Meeldiv tutvuda",
    english: "Nice to meet you",
    pronunciation: "MAYL-deev TOOT-voo-dah",
    Icon: NiceToMeetYouIcon,
    sentenceEstonian: "Tere! Meeldiv tutvuda.",
    sentenceEnglish: "Hello! Nice to meet you.",
    multipleChoiceOptions: ["Meeldiv tutvuda", "Head aega", "Tänan", "Palun"],
    wordBlocks: ["Meeldiv", "tutvuda", "."],
  },
];

const QUESTION_TYPES: QuestionType[] = ["multiple_choice", "type", "word_blocks"];

interface SneakPeekLessonProps {
  onComplete: () => void;
  onBack?: () => void;
}

type StepType = "sentence" | "flashcard" | "question";

interface LessonStep {
  phraseIndex: number;
  stepType: StepType;
  questionType?: QuestionType;
}

function buildLessonSteps(): LessonStep[] {
  const steps: LessonStep[] = [];
  for (let i = 0; i < LESSON_PHRASES.length; i++) {
    steps.push({ phraseIndex: i, stepType: "sentence" });
    steps.push({ phraseIndex: i, stepType: "flashcard" });
    steps.push({
      phraseIndex: i,
      stepType: "question",
      questionType: QUESTION_TYPES[i % QUESTION_TYPES.length],
    });
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
  const Icon = phrase.Icon;

  const handleClick = () => {
    setIsFlipped((f) => !f);
  };

  return (
    <div className="w-full perspective-[1000px]">
      <div
        className={`relative h-[420px] cursor-pointer transform-3d transition-transform duration-500 ${
          isFlipped ? "transform-[rotateY(180deg)]" : ""
        }`}
        onClick={handleClick}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white shadow-xl backface-hidden">
          <div>
            <Icon size={300} />
          </div>
          <p className="text-2xl font-bold text-black sm:text-3xl">
            {phrase.estonian}
          </p>
          <p className="mt-1 text-sm text-black/50">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-[#0072ce]/5 shadow-xl backface-hidden transform-[rotateY(180deg)]">
          <p className="text-2xl font-bold text-black sm:text-3xl">
            {phrase.english}
          </p>
          <p className="mt-2 text-sm text-black/60">{phrase.pronunciation}</p>
          <p className="mt-2 text-sm text-black/50">Tap to flip back</p>
        </div>
      </div>
      <button
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

function MultipleChoiceQuestion({
  phrase,
  onCorrect,
}: {
  phrase: LessonPhrase;
  onCorrect: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [options] = useState(() =>
    [...phrase.multipleChoiceOptions].sort(() => Math.random() - 0.5)
  );

  const handleSelect = (opt: string) => {
    if (isCorrect === true) return;
    setSelected(opt);
    const correct = opt === phrase.estonian;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <p className="mb-6 text-center text-lg text-black/70">
        What does &quot;{phrase.english}&quot; mean in Estonian?
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const chosen = selected === opt;
          const correct = opt === phrase.estonian;
          let bg = "bg-white border-black/20 hover:bg-black/5";
          if (chosen) {
            bg = correct
              ? "bg-green-500/20 border-green-500"
              : "bg-red-500/20 border-red-500";
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={isCorrect === true}
              className={`min-h-[56px] rounded-xl border-2 px-4 py-3 text-left font-medium transition ${bg}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {isCorrect === false && (
        <p className="mt-4 text-center text-sm text-red-600">
          Try again! The correct answer is &quot;{phrase.estonian}&quot;
        </p>
      )}
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

  const normalizedAnswer = phrase.estonian.toLowerCase().trim();
  const normalizedInput = input.toLowerCase().trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrect === true) return;
    const correct = normalizedInput === normalizedAnswer;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <p className="mb-6 text-center text-lg text-black/70">
        Type the Estonian for &quot;{phrase.english}&quot;:
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

function WordBlocksQuestion({
  phrase,
  onCorrect,
}: {
  phrase: LessonPhrase;
  onCorrect: () => void;
}) {
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [remainingBlocks, setRemainingBlocks] = useState<string[]>(() =>
    [...phrase.wordBlocks].sort(() => Math.random() - 0.5)
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const targetOrder = phrase.wordBlocks;
  const userAnswer = selectedBlocks.join(" ").replace(/\s+/g, " ").trim();
  const correctAnswer = targetOrder.join(" ").replace(/\s+/g, " ").trim();

  const addBlock = (block: string, index: number) => {
    if (isCorrect === true) return;
    setSelectedBlocks((prev) => [...prev, block]);
    setRemainingBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeBlock = (index: number) => {
    if (isCorrect === true) return;
    const block = selectedBlocks[index];
    setSelectedBlocks((prev) => prev.filter((_, i) => i !== index));
    setRemainingBlocks((prev) => [...prev, block].sort(() => Math.random() - 0.5));
  };

  const handleCheck = () => {
    if (isCorrect === true) return;
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 600);
    }
  };

  return (
    <div>
      <p className="mb-4 text-center text-lg text-black/70">
        Arrange the words to translate: &quot;{phrase.sentenceEnglish}&quot;
      </p>
      <div className="mb-6 min-h-[56px] rounded-xl border-2 border-dashed border-black/20 bg-black/5 p-4">
        <div className="flex flex-wrap gap-2">
          {selectedBlocks.map((block, i) => (
            <button
              key={`${block}-${i}`}
              onClick={() => removeBlock(i)}
              disabled={isCorrect === true}
              className="rounded-lg bg-white px-4 py-2 text-base font-medium shadow-sm transition hover:bg-black/5 disabled:opacity-70"
            >
              {block}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {remainingBlocks.map((block, i) => (
          <button
            key={`${block}-${i}`}
            onClick={() => addBlock(block, i)}
            disabled={isCorrect === true}
            className="rounded-lg border-2 border-black/20 bg-white px-4 py-2 text-base font-medium transition hover:bg-black/5 disabled:opacity-70"
          >
            {block}
          </button>
        ))}
      </div>
      <button
        onClick={handleCheck}
        disabled={selectedBlocks.length === 0 || isCorrect === true}
        className="w-full min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] disabled:opacity-50"
      >
        Check
      </button>
      {isCorrect === false && (
        <p className="mt-4 text-center text-sm text-red-600">
          Correct order: &quot;{correctAnswer}&quot;
        </p>
      )}
    </div>
  );
}

export default function SneakPeekLesson({ onComplete, onBack }: SneakPeekLessonProps) {
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

  const Icon = phrase.Icon;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
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
                <div className="flex justify-center">
                  <Icon size={300} className="sm:hidden" />
                  <Icon size={300} className="hidden sm:block" />
                </div>
                <p className="mb-4 text-center text-2xl font-bold text-black sm:text-3xl">
                  {phrase.sentenceEstonian}
                </p>
                <p className="mb-8 text-center text-lg text-black/60 sm:text-xl">
                  {phrase.sentenceEnglish}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full min-h-[48px] rounded-xl bg-[#0072ce] px-8 py-3 font-semibold text-white transition hover:bg-[#0060b3] active:scale-[0.98]"
                >
                  Continue
                </button>
              </>
            )}

            {step.stepType === "question" && step.questionType === "multiple_choice" && (
              <>
                <div className="flex justify-center">
                  <Icon size={300} />
                </div>
                <MultipleChoiceQuestion phrase={phrase} onCorrect={handleNext} />
              </>
            )}

            {step.stepType === "question" && step.questionType === "type" && (
              <>
                <div className="flex justify-center">
                  <Icon size={300} />
                </div>
                <TypeQuestion phrase={phrase} onCorrect={handleNext} />
              </>
            )}

            {step.stepType === "question" && step.questionType === "word_blocks" && (
              <>
                <div className="flex justify-center">
                  <Icon size={300} />
                </div>
                <WordBlocksQuestion phrase={phrase} onCorrect={handleNext} />
              </>
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

export { LESSON_PHRASES };
